"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function ProviderList({ slug }: { slug: string }) {
  const [providers, setProviders] = useState<any[]>([]);
  const [bookingMap, setBookingMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);

  const fetchProviders = useCallback(async () => {
    const { data: provData } = await supabase
      .from("providers")
      .select("*, profiles(name)")
      .eq("category", slug)
      .eq("approved", true)
      .order("rating", { ascending: false });

    setProviders(provData || []);

    // For busy providers, get who booked them
    const busyIds = (provData || []).filter((p) => p.is_busy).map((p) => p.id);
    if (busyIds.length > 0) {
      const { data: bkgs } = await supabase
        .from("bookings")
        .select("provider_id, profiles!bookings_customer_id_fkey(name)")
        .in("provider_id", busyIds)
        .in("status", ["accepted", "on_the_way", "arrived", "in_progress"]);

      const map: Record<string, string> = {};
      for (const b of bkgs || []) {
        map[b.provider_id] = (b.profiles as any)?.name || "a customer";
      }
      setBookingMap(map);
    } else {
      setBookingMap({});
    }

    setLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchProviders();

    // Real-time: provider status or bookings change → refresh list
    const channel = supabase
      .channel(`providers-list-${slug}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "providers" }, fetchProviders)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "bookings" }, fetchProviders)
      .subscribe();

    // Ask for user location (for distance display)
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLat(pos.coords.latitude);
          setUserLng(pos.coords.longitude);
        },
        () => {} // silently ignore if denied
      );
    }

    return () => { supabase.removeChannel(channel); };
  }, [slug, fetchProviders]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl h-28 animate-pulse shadow-sm" />
        ))}
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-2">😔</p>
        <p>No providers yet in this category.</p>
        <Link href="/register" className="text-orange-500 underline text-sm mt-2 inline-block">
          Be the first to register!
        </Link>
      </div>
    );
  }

  // Sort: available first, then busy, then offline
  const sorted = [...providers].sort((a, b) => {
    const rank = (p: any) => (!p.available ? 2 : p.is_busy ? 1 : 0);
    return rank(a) - rank(b);
  });

  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-400 text-sm mb-1">{providers.length} providers found in Bhimavaram</p>

      {sorted.map((p) => {
        const isOnline = p.available;
        const isBusy = p.is_busy;
        const bookedBy = bookingMap[p.id];

        let statusBg = "bg-green-100 text-green-700";
        let statusText = "🟢 Available";
        if (!isOnline) {
          statusBg = "bg-gray-100 text-gray-500";
          statusText = "⚫ Offline";
        } else if (isBusy) {
          statusBg = "bg-red-100 text-red-600";
          statusText = bookedBy
            ? `🔴 Busy · ${bookedBy.split(" ")[0]}`
            : "🔴 Busy";
        }

        // Distance
        let distText = "";
        if (userLat && userLng && p.latitude && p.longitude) {
          const km = haversineKm(userLat, userLng, p.latitude, p.longitude);
          distText = km < 1 ? `${Math.round(km * 1000)} m away` : `~${km.toFixed(1)} km away`;
        }

        return (
          <Link
            key={p.id}
            href={`/provider/${p.id}`}
            className={`bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 border-2 border-transparent hover:border-orange-300 hover:shadow-md transition group ${
              !isOnline ? "opacity-60" : ""
            }`}
          >
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-2xl font-bold text-orange-500 shrink-0">
              {(p.profiles?.name || "?")?.[0]?.toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800">{p.profiles?.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                📍 {p.area} · {p.experience}
              </p>
              {distText && (
                <p className="text-xs text-blue-500 font-semibold mt-0.5">📡 {distText}</p>
              )}
              <p className="text-xs text-orange-600 font-medium mt-0.5">{p.price_range}</p>
            </div>

            {/* Right — rating + status */}
            <div className="text-right shrink-0">
              <p className="text-yellow-500 font-semibold text-sm">
                ⭐ {p.rating > 0 ? p.rating : "New"}
              </p>
              <p className="text-xs text-gray-400">{p.total_reviews || 0} reviews</p>
              <span className={`text-xs px-2.5 py-1 rounded-full mt-1.5 inline-block font-semibold ${statusBg}`}>
                {statusText}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function TrackingClient() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking");

  const [booking, setBooking] = useState<any>(null);
  const [provLoc, setProvLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    if (!bookingId) { router.push("/"); return; }

    fetchData();

    // Subscribe to live location updates
    const channel = supabase
      .channel(`track-${bookingId}`)
      .on("postgres_changes", {
        event: "*", schema: "public", table: "provider_locations",
      }, (payload) => {
        const loc = payload.new as any;
        setProvLoc({ lat: loc.latitude, lng: loc.longitude });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, bookingId]);

  async function fetchData() {
    const { data: bk } = await supabase
      .from("bookings")
      .select("*, providers(*, profiles(name, phone))")
      .eq("id", bookingId!)
      .single();
    setBooking(bk);

    if (bk?.provider_id) {
      const { data: loc } = await supabase
        .from("provider_locations")
        .select("*")
        .eq("provider_id", bk.provider_id)
        .single();
      if (loc) setProvLoc({ lat: loc.latitude, lng: loc.longitude });
    }
    setLoading(false);
  }

  // Initialize / update Leaflet map when location changes
  useEffect(() => {
    if (!provLoc || !mapDivRef.current) return;

    if (mapRef.current && markerRef.current) {
      // Just move existing marker
      markerRef.current.setLatLng([provLoc.lat, provLoc.lng]);
      mapRef.current.panTo([provLoc.lat, provLoc.lng]);
      return;
    }

    // First load — init map
    import("leaflet").then((L) => {
      if (mapRef.current) return; // prevent double init

      // Fix Leaflet default icon path in Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapDivRef.current!).setView([provLoc.lat, provLoc.lng], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      // Orange provider icon
      const icon = L.divIcon({
        html: `<div style="background:#f97316;width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.25)">🔧</div>`,
        className: "",
        iconSize: [46, 46],
        iconAnchor: [23, 23],
      });

      const providerName = booking?.providers?.profiles?.name || "Provider";
      const marker = L.marker([provLoc.lat, provLoc.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${providerName}</b><br>On the way to you!`)
        .openPopup();

      mapRef.current = map;
      markerRef.current = marker;
    });
  }, [provLoc, booking]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <div className="text-5xl animate-bounce">🗺️</div>
          <p className="text-gray-500">Loading live tracking...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-16">
          <p className="text-gray-500">Booking not found.</p>
          <Link href="/bookings" className="text-orange-500 underline mt-2 inline-block">
            ← My Bookings
          </Link>
        </div>
      </div>
    );
  }

  const providerName = booking.providers?.profiles?.name || "Provider";
  const providerPhone = booking.providers?.profiles?.phone;
  const providerRating = booking.providers?.rating;
  const providerExp = booking.providers?.experience;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Live status bar */}
      <div className="bg-orange-500 text-white px-4 py-3">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div>
            <p className="font-bold text-sm">🚗 {providerName} is on the way</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
              <p className="text-orange-100 text-xs">Live tracking · auto-updates every 5s</p>
            </div>
          </div>
          {providerPhone && (
            <a
              href={`tel:${providerPhone}`}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold transition"
            >
              📞 Call
            </a>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="relative">
        {!provLoc && (
          <div className="absolute inset-0 z-10 bg-gray-100 flex flex-col items-center justify-center gap-2" style={{ height: "55vh" }}>
            <p className="text-4xl">📍</p>
            <p className="text-gray-600 font-medium text-sm">Waiting for provider to share location</p>
            <p className="text-gray-400 text-xs">Provider shares location when they start moving</p>
          </div>
        )}
        {/* Leaflet CSS */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
        <div ref={mapDivRef} style={{ height: "55vh", width: "100%" }} />
      </div>

      {/* Provider card */}
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl font-bold text-orange-500 shrink-0">
            {providerName[0]}
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-800">{providerName}</p>
            <p className="text-xs text-gray-500">
              ⭐ {providerRating > 0 ? providerRating : "New"} · {providerExp}
            </p>
            {providerPhone && (
              <a href={`tel:${providerPhone}`} className="text-xs text-orange-500 font-semibold">
                📞 {providerPhone}
              </a>
            )}
          </div>
          <span className="text-xs px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-semibold">
            🚗 On The Way
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wide">Service Address</p>
          <p className="text-sm text-gray-700">{booking.address}</p>
          <p className="text-xs text-gray-400 mt-2">
            <span className="font-medium">Problem:</span> {booking.problem_description}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            <span className="font-medium">Scheduled:</span> {booking.scheduled_date} at {booking.scheduled_time}
          </p>
        </div>

        <Link href="/bookings" className="block text-center text-sm text-gray-400 hover:text-orange-500 transition py-2">
          ← Back to My Bookings
        </Link>
      </div>
    </div>
  );
}

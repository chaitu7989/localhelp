"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES } from "@/lib/data";
import Link from "next/link";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  pending:      { label: "Pending",       color: "bg-yellow-100 text-yellow-700", icon: "⏳" },
  accepted:     { label: "Accepted",      color: "bg-blue-100 text-blue-700",     icon: "✅" },
  on_the_way:   { label: "On The Way",    color: "bg-purple-100 text-purple-700", icon: "🚗" },
  arrived:      { label: "Arrived",       color: "bg-indigo-100 text-indigo-700", icon: "📍" },
  in_progress:  { label: "In Progress",   color: "bg-orange-100 text-orange-700", icon: "🔧" },
  completed:    { label: "Completed",     color: "bg-green-100 text-green-700",   icon: "🎉" },
  cancelled:    { label: "Cancelled",     color: "bg-red-100 text-red-700",       icon: "❌" },
};

export default function MyBookingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    fetchBookings();

    // Realtime updates
    const channel = supabase
      .channel("bookings-customer")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "bookings" }, fetchBookings)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  async function fetchBookings() {
    const { data } = await supabase
      .from("bookings")
      .select("*, providers(*, profiles(name, phone))")
      .eq("customer_id", user!.id)
      .order("created_at", { ascending: false });
    setBookings(data || []);
    setLoading(false);
  }

  async function cancelBooking(id: string) {
    await supabase.from("bookings").update({ status: "cancelled" }).eq("id", id);
    fetchBookings();
  }

  return (
    <div>
      <Navbar />
      <div className="bg-orange-500 text-white px-4 py-5 text-center">
        <h1 className="text-xl font-bold">My Bookings</h1>
        <p className="text-orange-100 text-sm">నా బుకింగ్‌లు</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-6 pb-10">
        {loading && (
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-32 animate-pulse" />)}
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-3">📋</p>
            <p className="text-gray-500 font-medium">No bookings yet</p>
            <p className="text-gray-400 text-sm mb-6">మీకు ఇంకా బుకింగ్‌లు లేవు</p>
            <Link href="/" className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
              Book a Service
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {bookings.map((b) => {
            const status = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
            const cat = CATEGORIES.find((c) => c.slug === b.category);
            const providerName = b.providers?.profiles?.name || "Provider";
            const providerPhone = b.providers?.profiles?.phone;

            return (
              <div key={b.id} className="bg-white rounded-2xl shadow p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-800">{cat?.icon} {cat?.name}</p>
                    <p className="text-sm text-gray-500">Provider: {providerName}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${status.color}`}>
                    {status.icon} {status.label}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    {["Pending","Accepted","On Way","Arrived","Done"].map((s, i) => (
                      <span key={s} className={
                        ["pending","accepted","on_the_way","arrived","completed"].indexOf(b.status) >= i
                          ? "text-orange-500 font-semibold" : ""
                      }>{s}</span>
                    ))}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full transition-all" style={{
                      width: `${(["pending","accepted","on_the_way","arrived","completed"].indexOf(b.status) + 1) * 20}%`
                    }} />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-gray-400 text-xs">Date & Time</p>
                    <p className="font-medium text-gray-700">{b.scheduled_date}</p>
                    <p className="text-gray-500 text-xs">{b.scheduled_time}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-gray-400 text-xs">Address</p>
                    <p className="font-medium text-gray-700 text-xs">{b.address}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <p className="text-gray-400 text-xs mb-1">Problem</p>
                  <p className="text-gray-700 text-sm">{b.problem_description}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {providerPhone && (b.status === "accepted" || b.status === "on_the_way") && (
                    <a href={`tel:${providerPhone}`}
                      className="flex-1 bg-orange-500 text-white text-center py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-600 transition">
                      📞 Call Provider
                    </a>
                  )}
                  {b.status === "accepted" || b.status === "on_the_way" ? (
                    <Link href={`/track/${b.id}`}
                      className="flex-1 bg-blue-500 text-white text-center py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition">
                      🗺️ Track Live
                    </Link>
                  ) : null}
                  {b.status === "pending" && (
                    <button onClick={() => cancelBooking(b.id)}
                      className="flex-1 bg-red-50 text-red-500 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-100 transition">
                      Cancel
                    </button>
                  )}
                  {b.status === "completed" && (
                    <Link href={`/review/${b.id}`}
                      className="flex-1 bg-green-500 text-white text-center py-2.5 rounded-xl text-sm font-semibold hover:bg-green-600 transition">
                      ⭐ Leave Review
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

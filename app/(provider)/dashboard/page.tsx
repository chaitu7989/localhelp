"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES } from "@/lib/data";

const STATUS_NEXT: Record<string, string> = {
  pending:     "accepted",
  accepted:    "on_the_way",
  on_the_way:  "arrived",
  arrived:     "in_progress",
  in_progress: "completed",
};

const STATUS_LABEL: Record<string, { label: string; color: string; icon: string }> = {
  pending:      { label: "Pending",      color: "bg-yellow-100 text-yellow-700", icon: "⏳" },
  accepted:     { label: "Accepted",     color: "bg-blue-100 text-blue-700",     icon: "✅" },
  on_the_way:   { label: "On The Way",   color: "bg-purple-100 text-purple-700", icon: "🚗" },
  arrived:      { label: "Arrived",      color: "bg-indigo-100 text-indigo-700", icon: "📍" },
  in_progress:  { label: "In Progress",  color: "bg-orange-100 text-orange-700", icon: "🔧" },
  completed:    { label: "Completed",    color: "bg-green-100 text-green-700",   icon: "🎉" },
  cancelled:    { label: "Cancelled",    color: "bg-red-100 text-red-700",       icon: "❌" },
};

export default function ProviderDashboard() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"active" | "completed">("active");
  const [sharing, setSharing] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    fetchProviderAndBookings();

    const channel = supabase
      .channel("bookings-provider")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, fetchProviderAndBookings)
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
      stopSharingLocation();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function fetchProviderAndBookings() {
    const { data: prov } = await supabase
      .from("providers")
      .select("*")
      .eq("user_id", user!.id)
      .single();
    setProvider(prov);

    if (prov) {
      const { data } = await supabase
        .from("bookings")
        .select("*, profiles!bookings_customer_id_fkey(name, phone)")
        .eq("provider_id", prov.id)
        .order("created_at", { ascending: false });
      setBookings(data || []);
    }
    setLoading(false);
  }

  async function updateStatus(bookingId: string, newStatus: string) {
    await supabase
      .from("bookings")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", bookingId);

    // Manage is_busy on provider
    if (newStatus === "accepted") {
      await supabase.from("providers").update({ is_busy: true }).eq("id", provider.id);
    } else if (newStatus === "completed") {
      await supabase.from("providers").update({ is_busy: false }).eq("id", provider.id);
      stopSharingLocation();
    }

    // Notify customer
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      await supabase.from("notifications").insert({
        user_id: booking.customer_id,
        title: `Booking ${newStatus.replace(/_/g, " ")}`,
        message: `Your service booking status is now: ${newStatus.replace(/_/g, " ")}`,
        type: "booking",
      });
    }
    fetchProviderAndBookings();
  }

  async function rejectBooking(bookingId: string) {
    await supabase.from("bookings").update({ status: "cancelled" }).eq("id", bookingId);
    await supabase.from("providers").update({ is_busy: false }).eq("id", provider.id);
    fetchProviderAndBookings();
  }

  async function toggleAvailability() {
    const next = !provider.available;
    await supabase.from("providers").update({ available: next }).eq("id", provider.id);
    setProvider({ ...provider, available: next });
    if (!next) stopSharingLocation(); // stop GPS if going offline
  }

  // ── Location sharing ────────────────────────────────────────────────────────
  function startSharingLocation() {
    if (!navigator.geolocation) {
      alert("GPS not available on this device.");
      return;
    }
    setSharing(true);
    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        await supabase.from("provider_locations").upsert({
          provider_id: provider.id,
          latitude,
          longitude,
          updated_at: new Date().toISOString(),
        });
        // Also update provider's own coords for distance display on listing
        await supabase
          .from("providers")
          .update({ latitude, longitude })
          .eq("id", provider.id);
      },
      (err) => console.error("GPS error:", err),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
  }

  function stopSharingLocation() {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setSharing(false);
  }
  // ────────────────────────────────────────────────────────────────────────────

  const active = bookings.filter((b) => !["completed", "cancelled"].includes(b.status));
  const completed = bookings.filter((b) => b.status === "completed");
  const earnings = completed.reduce((sum, b) => sum + (b.amount ? b.amount * 0.9 : 0), 0);

  if (!provider && !loading) {
    return (
      <div>
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <p className="text-5xl mb-3">⚠️</p>
          <p className="text-gray-600 font-medium">Provider profile not found.</p>
          <a href="/register" className="mt-4 inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold">
            Register
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-xl font-bold">Provider Dashboard</h1>
              <p className="text-orange-100 text-sm">నమస్కారం, {profile?.name}</p>
            </div>
            <button
              onClick={toggleAvailability}
              className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                provider?.available ? "bg-green-400 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              {provider?.available ? "🟢 Online" : "⚫ Offline"}
            </button>
          </div>

          {/* Location sharing button — show when there's an active on_the_way job */}
          {active.some((b) => ["on_the_way", "in_progress"].includes(b.status)) && (
            <button
              onClick={sharing ? stopSharingLocation : startSharingLocation}
              className={`w-full py-2.5 rounded-xl text-sm font-bold transition mt-1 ${
                sharing
                  ? "bg-red-500/80 text-white animate-pulse"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {sharing ? "📡 Sharing Live Location · Tap to Stop" : "📍 Share My Location with Customer"}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-orange-500">{active.length}</p>
            <p className="text-xs text-gray-500 mt-1">Active Jobs</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-500">{completed.length}</p>
            <p className="text-xs text-gray-500 mt-1">Completed</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-500">₹{earnings.toFixed(0)}</p>
            <p className="text-xs text-gray-500 mt-1">Earnings</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          <button
            onClick={() => setTab("active")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              tab === "active" ? "bg-white text-orange-500 shadow-sm" : "text-gray-500"
            }`}
          >
            Active ({active.length})
          </button>
          <button
            onClick={() => setTab("completed")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              tab === "completed" ? "bg-white text-orange-500 shadow-sm" : "text-gray-500"
            }`}
          >
            Completed ({completed.length})
          </button>
        </div>

        {loading && (
          <div className="space-y-3">
            {[1, 2].map((i) => <div key={i} className="bg-white rounded-2xl h-40 animate-pulse" />)}
          </div>
        )}

        {/* Booking Cards */}
        <div className="space-y-4 pb-10">
          {(tab === "active" ? active : completed).map((b) => {
            const status = STATUS_LABEL[b.status] || STATUS_LABEL.pending;
            const cat = CATEGORIES.find((c) => c.slug === b.category);
            const nextStatus = STATUS_NEXT[b.status];
            const customerName = b.profiles?.name;
            const customerPhone = b.profiles?.phone;

            return (
              <div key={b.id} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-800">{cat?.icon} {cat?.name}</p>
                    {/* Customer info — Swiggy-style "Booked by" */}
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-500">
                        {customerName?.[0] || "?"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{customerName}</p>
                        <p className="text-xs text-gray-400">{customerPhone}</p>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${status.color}`}>
                    {status.icon} {status.label}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 mb-3 space-y-1 text-sm">
                  <p><span className="text-gray-400">Problem:</span> {b.problem_description}</p>
                  <p><span className="text-gray-400">Date:</span> <strong>{b.scheduled_date} at {b.scheduled_time}</strong></p>
                  <p><span className="text-gray-400">Address:</span> {b.address}</p>
                  {b.amount && (
                    <p><span className="text-gray-400">Budget:</span> <strong className="text-orange-500">₹{b.amount}</strong></p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {b.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(b.id, "accepted")}
                        className="flex-1 bg-green-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition"
                      >
                        ✅ Accept
                      </button>
                      <button
                        onClick={() => rejectBooking(b.id)}
                        className="flex-1 bg-red-50 text-red-500 py-2.5 rounded-xl text-sm font-bold hover:bg-red-100 transition"
                      >
                        ❌ Reject
                      </button>
                    </>
                  )}
                  {nextStatus && b.status !== "pending" && (
                    <button
                      onClick={() => updateStatus(b.id, nextStatus)}
                      className="flex-1 bg-orange-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-orange-600 transition"
                    >
                      {nextStatus === "on_the_way"  && "🚗 I'm On The Way"}
                      {nextStatus === "arrived"      && "📍 I've Arrived"}
                      {nextStatus === "in_progress"  && "🔧 Start Job"}
                      {nextStatus === "completed"    && "✅ Mark Complete"}
                    </button>
                  )}
                  {customerPhone && (
                    <a
                      href={`tel:${customerPhone}`}
                      className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
                    >
                      📞
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          {(tab === "active" ? active : completed).length === 0 && !loading && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-2">{tab === "active" ? "🎯" : "📋"}</p>
              <p>{tab === "active" ? "No active bookings right now" : "No completed jobs yet"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

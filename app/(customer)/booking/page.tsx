"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES } from "@/lib/data";

function BookingForm() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("provider");
  const { user, profile } = useAuth();
  const router = useRouter();
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [form, setForm] = useState({
    problem_description: "", scheduled_date: "",
    scheduled_time: "", address: "", amount: "",
  });

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    if (!providerId) { router.push("/"); return; }
    fetchProvider();
  }, [user, providerId]);

  async function fetchProvider() {
    const { data } = await supabase
      .from("providers")
      .select("*, profiles(name, phone)")
      .eq("id", providerId)
      .single();
    setProvider(data);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        customer_id: user!.id,
        provider_id: providerId,
        category: provider?.category,
        problem_description: form.problem_description,
        scheduled_date: form.scheduled_date,
        scheduled_time: form.scheduled_time,
        address: form.address,
        amount: form.amount || null,
        status: "pending",
        payment_status: "unpaid",
      })
      .select()
      .single();

    if (bookingError) { setError(bookingError.message); setLoading(false); return; }

    await supabase.from("notifications").insert({
      user_id: provider?.user_id,
      title: "New Booking Request! 🔔",
      message: `${profile?.name} booked your service on ${form.scheduled_date} at ${form.scheduled_time}`,
      type: "booking",
    });

    setBookingId(data.id);
    setSuccess(true);
    setLoading(false);
  }

  const cat = CATEGORIES.find((c) => c.slug === provider?.category);

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 border border-green-200 rounded-3xl p-8">
          <p className="text-6xl mb-4">🎉</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 text-sm mb-4">బుకింగ్ నిర్థారించబడింది</p>
          <div className="bg-white rounded-2xl p-4 mb-6 text-left space-y-2 text-sm">
            <p className="text-xs text-gray-400 font-medium uppercase">Booking ID</p>
            <p className="font-mono text-xs text-gray-600 break-all">{bookingId}</p>
            <hr />
            <p><span className="text-gray-400">Provider:</span> <strong>{provider?.profiles?.name}</strong></p>
            <p><span className="text-gray-400">Service:</span> <strong>{cat?.name}</strong></p>
            <p><span className="text-gray-400">Date:</span> <strong>{form.scheduled_date} at {form.scheduled_time}</strong></p>
            <p><span className="text-gray-400">Address:</span> <strong>{form.address}</strong></p>
            <p><span className="text-gray-400">Status:</span> <span className="text-yellow-600 font-semibold">⏳ Pending Acceptance</span></p>
          </div>
          <p className="text-gray-400 text-xs mb-6">Provider will accept shortly. Track your booking below.</p>
          <div className="space-y-3">
            <button onClick={() => router.push("/bookings")}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
              📋 Track My Bookings
            </button>
            <button onClick={() => router.push("/")}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 mt-6 pb-10">
      {provider && (
        <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl font-bold text-orange-500">
            {provider?.profiles?.name?.[0]}
          </div>
          <div>
            <p className="font-bold text-gray-800">{provider?.profiles?.name}</p>
            <p className="text-sm text-gray-500">{cat?.icon} {cat?.name} · 📍 {provider?.area}</p>
            {provider?.price_range && <p className="text-xs text-orange-500 font-medium">{provider.price_range}</p>}
          </div>
        </div>
      )}

      {error && <p className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-4">{error}</p>}

      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Describe the Problem *</label>
          <textarea required name="problem_description" value={form.problem_description}
            onChange={handleChange} rows={3}
            placeholder="e.g. Water pipe leaking under bathroom sink..."
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Date *</label>
            <input required type="date" name="scheduled_date" value={form.scheduled_date}
              onChange={handleChange} min={new Date().toISOString().split("T")[0]}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Time *</label>
            <input required type="time" name="scheduled_time" value={form.scheduled_time}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Your Address *</label>
          <input required name="address" value={form.address} onChange={handleChange}
            placeholder="House no, Street, Area, Bhimavaram"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Expected Budget (optional)</label>
          <input type="number" name="amount" value={form.amount} onChange={handleChange}
            placeholder="e.g. 500"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-700">
          ℹ️ Payment collected after job completion. Your money is safe with LocalHelp.
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition disabled:opacity-60">
          {loading ? "Booking..." : "Confirm Booking · బుక్ చేయండి"}
        </button>
      </form>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div>
      <Navbar />
      <div className="bg-orange-500 text-white px-4 py-5 text-center">
        <h1 className="text-xl font-bold">Book Service</h1>
        <p className="text-orange-100 text-sm">సేవను బుక్ చేయండి</p>
      </div>
      <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading...</div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
}

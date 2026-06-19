"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { CATEGORIES } from "@/lib/data";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", password: "",
    category: "", area: "", experience: "", priceRange: "", description: "", upiId: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Create auth account
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name, phone: form.phone } },
    });

    if (signUpError) { setError(signUpError.message); setLoading(false); return; }

    if (data.user) {
      // 2. Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        name: form.name,
        phone: form.phone,
        role: "provider",
      });
      if (profileError) { setError(profileError.message); setLoading(false); return; }

      // 3. Create provider record
      const { error: providerError } = await supabase.from("providers").insert({
        user_id: data.user.id,
        category: form.category,
        area: form.area,
        experience: form.experience,
        price_range: form.priceRange,
        description: form.description,
        upi_id: form.upiId,
        approved: false,
      });
      if (providerError) { setError(providerError.message); setLoading(false); return; }

      setSubmitted(true);
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div>
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <p className="text-6xl mb-4">🎉</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Submitted!</h2>
          <p className="text-gray-500 text-sm">నమోదు విజయవంతమైంది!</p>
          <p className="text-gray-600 mt-4 text-sm">
            Check your email to confirm your account. Your profile goes live after admin approval (within 24 hours).
          </p>
          <a href="/" className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-orange-500 text-white text-center py-6 px-4">
        <h1 className="text-2xl font-bold">Register as Provider</h1>
        <p className="text-orange-200 text-sm mt-1">సేవా నిపుణుడిగా నమోదు చేయండి · Completely Free</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 mt-6 space-y-4 pb-10">
        {error && <p className="bg-red-50 text-red-500 text-sm p-3 rounded-xl">{error}</p>}

        <div>
          <label className="text-sm text-gray-600 font-medium">Full Name *</label>
          <input required name="name" value={form.name} onChange={handleChange}
            placeholder="Your name"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white" />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium">Phone Number *</label>
          <input required name="phone" value={form.phone} onChange={handleChange}
            placeholder="10-digit mobile number" maxLength={10} type="tel"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white" />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium">Email *</label>
          <input required name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="your@email.com"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white" />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium">Create Password *</label>
          <input required name="password" type="password" value={form.password} onChange={handleChange}
            placeholder="Min 6 characters"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white" />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium">Service Category *</label>
          <select required name="category" value={form.category} onChange={handleChange}
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.icon} {c.name} · {c.teluguName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium">Area / Location *</label>
          <input required name="area" value={form.area} onChange={handleChange}
            placeholder="e.g. Bhimavaram, Palakol, Tanuku"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white" />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium">Years of Experience *</label>
          <input required name="experience" value={form.experience} onChange={handleChange}
            placeholder="e.g. 5 years"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white" />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium">Price Range</label>
          <input name="priceRange" value={form.priceRange} onChange={handleChange}
            placeholder="e.g. ₹200 - ₹800"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white" />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium">About Your Service</label>
          <textarea name="description" value={form.description} onChange={handleChange}
            placeholder="Describe your services..."
            rows={3}
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white resize-none" />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium">UPI ID (to receive payments)</label>
          <input name="upiId" value={form.upiId} onChange={handleChange}
            placeholder="yourname@upi"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white" />
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition mt-2 disabled:opacity-60">
          {loading ? "Submitting..." : "Submit Registration · నమోదు చేయండి"}
        </button>
        <p className="text-center text-xs text-gray-400">Free registration. Admin approves within 24 hours.</p>
      </form>
    </div>
  );
}

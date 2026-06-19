"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Logo from "@/components/Logo";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "verify">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name, phone: form.phone } },
    });

    if (signUpError) { setError(signUpError.message); setLoading(false); return; }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        name: form.name,
        phone: form.phone,
        role: "customer",
      });
      setStep("verify");
    }
    setLoading(false);
  }

  if (step === "verify") {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <p className="text-5xl mb-4">📧</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Check your email!</h2>
          <p className="text-gray-500 text-sm mb-4">
            We sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your account.
          </p>
          <Link href="/login" className="block bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="flex flex-col items-center mb-6">
        <Logo size={60} />
        <p className="text-xl font-bold text-orange-500 mt-2">LocalHelp</p>
        <p className="text-xs text-gray-400">భీమవరం · Bhimavaram</p>
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Create Account</h2>
        <p className="text-gray-400 text-sm mb-5">Sign up to book local services</p>

        {error && <p className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 font-medium">Full Name</label>
            <input required name="name" value={form.name} onChange={handleChange}
              placeholder="Your full name"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">Phone Number</label>
            <input required name="phone" value={form.phone} onChange={handleChange}
              placeholder="10-digit mobile number" maxLength={10}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <input required name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="your@email.com"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">Password</label>
            <input required name="password" type="password" value={form.password} onChange={handleChange}
              placeholder="Min 6 characters"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-orange-600 transition disabled:opacity-60">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-500 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}

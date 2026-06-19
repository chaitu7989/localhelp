"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (loginError) { setError(loginError.message); setLoading(false); return; }

    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile?.role === "admin") router.push("/admin");
      else if (profile?.role === "provider") router.push("/dashboard");
      else router.push("/");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex flex-col items-center mb-6">
        <Logo size={60} />
        <p className="text-xl font-bold text-orange-500 mt-2">LocalHelp</p>
        <p className="text-xs text-gray-400">భీమవరం · Bhimavaram</p>
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Welcome Back</h2>
        <p className="text-gray-400 text-sm mb-5">Login to your LocalHelp account</p>

        {error && <p className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <input required name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="your@email.com"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">Password</label>
            <input required name="password" type="password" value={form.password} onChange={handleChange}
              placeholder="Your password"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-orange-600 transition disabled:opacity-60">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 space-y-2 text-center text-sm text-gray-400">
          <p>New customer?{" "}
            <Link href="/signup" className="text-orange-500 font-semibold">Create account</Link>
          </p>
          <p>Service provider?{" "}
            <Link href="/register" className="text-orange-500 font-semibold">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

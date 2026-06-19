"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo size={38} />
          <div>
            <span className="text-xl font-bold text-gray-900">Local</span>
            <span className="text-xl font-bold text-orange-500">Help</span>
            <p className="text-xs text-gray-400 leading-none">భీమవరం · Bhimavaram</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-orange-500 transition">Home</Link>
          <Link href="/#services" className="hover:text-orange-500 transition">Services</Link>
          <Link href="/#how-it-works" className="hover:text-orange-500 transition">How It Works</Link>
          <Link href="/#about" className="hover:text-orange-500 transition">About Us</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-500">Hi, {profile?.name?.split(" ")[0]}</span>
              {profile?.role === "customer" && (
                <Link href="/bookings" className="text-sm text-orange-500 font-semibold hover:underline">My Bookings</Link>
              )}
              {profile?.role === "admin" && (
                <Link href="/admin" className="text-sm text-orange-500 font-semibold hover:underline">Admin</Link>
              )}
              {profile?.role === "provider" && (
                <Link href="/dashboard" className="text-sm text-orange-500 font-semibold hover:underline">Dashboard</Link>
              )}
              <button onClick={handleSignOut}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition">Login</Link>
              <Link href="/register"
                className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition">
                + Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          <Link href="/" className="block text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/#services" className="block text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/#how-it-works" className="block text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link href="/#about" className="block text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>About Us</Link>
          <div className="flex gap-3 pt-2">
            {user ? (
              <button onClick={handleSignOut} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold w-full">Logout</button>
            ) : (
              <>
                <Link href="/login" className="flex-1 text-center border border-orange-500 text-orange-500 py-2 rounded-full text-sm font-semibold">Login</Link>
                <Link href="/register" className="flex-1 text-center bg-orange-500 text-white py-2 rounded-full text-sm font-semibold">+ Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

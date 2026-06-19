"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <nav className="bg-orange-500 text-white px-4 py-2 flex items-center justify-between shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <Logo size={42} />
        <div className="leading-tight">
          <p className="text-lg font-bold tracking-tight">LocalHelp</p>
          <p className="text-xs text-orange-100">భీమవరం · Bhimavaram</p>
        </div>
      </Link>

      <div className="flex items-center gap-2 text-sm font-medium">
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-orange-100 text-xs hidden sm:block">
              Hi, {profile?.name?.split(" ")[0] || "User"}
            </span>
            {profile?.role === "admin" && (
              <Link href="/admin" className="bg-white text-orange-500 px-3 py-1.5 rounded-full font-semibold text-xs">
                Admin
              </Link>
            )}
            {profile?.role === "provider" && (
              <Link href="/dashboard" className="bg-white text-orange-500 px-3 py-1.5 rounded-full font-semibold text-xs">
                Dashboard
              </Link>
            )}
            <button onClick={handleSignOut}
              className="bg-orange-600 text-white px-3 py-1.5 rounded-full font-semibold text-xs hover:bg-orange-700 transition">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="bg-white text-orange-500 px-3 py-1.5 rounded-full hover:bg-orange-100 transition font-semibold">
              Login
            </Link>
            <Link href="/register" className="bg-orange-600 text-white px-3 py-1.5 rounded-full hover:bg-orange-700 transition font-semibold hidden sm:block">
              + Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function FloatingBookBtn() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 450);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-4 z-50 transition-all duration-300 ${
        show ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"
      }`}
    >
      <Link
        href="/#services"
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3.5 rounded-full shadow-xl shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 transition-all text-sm"
      >
        <span>🔧</span>
        Book a Service
      </Link>
    </div>
  );
}

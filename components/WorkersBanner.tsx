"use client";

import { useEffect, useRef, useState } from "react";

export default function WorkersBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-white overflow-hidden pb-0">
      {/* Workers pop-up on scroll — no text, just the characters */}
      <div ref={ref} className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/workers.png"
          alt="LocalHelp Service Professionals"
          className={`w-full max-w-2xl transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
          style={{ mixBlendMode: "multiply" }}
        />
      </div>
    </section>
  );
}

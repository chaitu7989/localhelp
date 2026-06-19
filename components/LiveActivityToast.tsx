"use client";

import { useState, useEffect } from "react";

const ACTIVITIES = [
  { icon: "🔧", msg: "Someone in Bhimavaram just booked a Plumber", time: "just now" },
  { icon: "⚡", msg: "A new Electrician joined LocalHelp today", time: "2 min ago" },
  { icon: "🚗", msg: "Auto booking confirmed near Bhimavaram", time: "4 min ago" },
  { icon: "🍱", msg: "Catering inquiry received for a wedding event", time: "7 min ago" },
  { icon: "🪔", msg: "Purohit booked for housewarming ceremony", time: "10 min ago" },
  { icon: "📷", msg: "Photography package booked in Bhimavaram", time: "13 min ago" },
];

export default function LiveActivityToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // First toast appears after 3 seconds
    const first = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(first);
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Show for 4s, hide, pause 1s, then show next
    const hide = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 1000);
    }, 4500);
    return () => clearTimeout(hide);
  }, [visible, index]);

  const activity = ACTIVITIES[index];

  return (
    <div
      className={`fixed bottom-24 left-4 z-50 transition-all duration-500 ease-out max-w-[290px] ${
        visible
          ? "translate-x-0 opacity-100 scale-100"
          : "-translate-x-8 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-3.5 flex items-start gap-3">
        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
          {activity.icon}
        </div>
        <div className="min-w-0">
          <p className="text-gray-800 text-xs font-semibold leading-snug">{activity.msg}</p>
          <p className="text-gray-400 text-xs mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
            {activity.time} · Bhimavaram
          </p>
        </div>
      </div>
    </div>
  );
}

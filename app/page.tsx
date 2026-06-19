import Link from "next/link";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { CATEGORIES } from "@/lib/data";

export default function HomePage() {
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div className="bg-orange-500 text-white text-center py-10 px-4">
        <div className="flex justify-center mb-3">
          <Logo size={80} />
        </div>
        <h1 className="text-3xl font-bold mb-1">LocalHelp</h1>
        <p className="text-orange-100 text-sm mb-1">భీమవరం స్థానిక సేవలు</p>
        <p className="text-lg mt-2">Find trusted service providers in Bhimavaram</p>
        <p className="text-orange-200 text-sm">West Godavari · Andhra Pradesh</p>
      </div>

      {/* Search bar */}
      <div className="max-w-xl mx-auto px-4 -mt-5">
        <input
          type="text"
          placeholder="Search plumber, electrician, auto... 🔍"
          className="w-full px-4 py-3 rounded-xl shadow-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Categories */}
      <div className="max-w-2xl mx-auto px-4 mt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          సేవలు ఎంచుకోండి · Choose a Service
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-white rounded-2xl shadow p-4 flex flex-col items-center text-center hover:shadow-md hover:border-orange-400 border-2 border-transparent transition"
            >
              <span className="text-4xl mb-2">{cat.icon}</span>
              <p className="font-semibold text-gray-800">{cat.name}</p>
              <p className="text-orange-500 text-xs">{cat.teluguName}</p>
              <p className="text-gray-400 text-xs mt-1">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-xs mt-12 pb-6">
        <p>LocalHelp · Bhimavaram · West Godavari</p>
        <p className="mt-1">
          Are you a service provider?{" "}
          <Link href="/register" className="text-orange-500 underline">
            Register here for free
          </Link>
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CATEGORIES } from "@/lib/data";

const HOW_IT_WORKS = [
  { step: "1", title: "Search Service", desc: "Choose from 6+ categories of local services in Bhimavaram", icon: "🔍" },
  { step: "2", title: "Book Provider", desc: "Pick a verified provider, choose date & time, describe your problem", icon: "📅" },
  { step: "3", title: "Pay Safely", desc: "Pay through the app. Money is held safely until job is done", icon: "💳" },
  { step: "4", title: "Job Done ✅", desc: "Provider arrives, completes the work. Rate and review them", icon: "🏆" },
];

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden" style={{ minHeight: "88vh" }}>
        <div className="flex flex-col md:flex-row" style={{ minHeight: "88vh" }}>

          {/* LEFT — white background, text content */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-14 py-14 md:py-0 z-10">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 w-fit">
              🛡️ Trusted Services. Local People. Better Living.
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-900">
              Find Trusted Service<br />Providers in{" "}
              <span className="text-orange-500">Bhimavaram</span>
            </h1>

            <p className="text-gray-500 text-base mb-8 max-w-md leading-relaxed">
              Plumbers, Electricians, AC Technicians, Carpenters and many more —
              all trusted and verified professionals at your service.
            </p>

            {/* Search bar */}
            <div className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Search plumber, electrician, auto mechanic..."
                  className="w-full pl-9 pr-4 py-3.5 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-sm"
                />
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl font-semibold transition whitespace-nowrap text-sm">
                Search
              </button>
            </div>

            {/* Trust badges — 4 icons with label below */}
            <div className="flex items-start gap-6 mt-8">
              <div className="flex flex-col items-center text-center gap-1">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-gray-700">Verified</p>
                <p className="text-xs text-gray-400">Professionals</p>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-gray-700">Affordable</p>
                <p className="text-xs text-gray-400">Pricing</p>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-gray-700">Quick</p>
                <p className="text-xs text-gray-400">Response</p>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-gray-700">Customer</p>
                <p className="text-xs text-gray-400">Support</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Bhimavaram photo + workers */}
          <div className="relative w-full md:w-[55%] min-h-[420px] md:min-h-full overflow-hidden">
            {/* Photo — full vibrant brightness, warm sunset */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bhimavaram-bg.jpg"
              alt="Bhimavaram — Godavari River, Bridge & Temple"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ filter: "brightness(1.05) saturate(1.15) contrast(1.05)" }}
            />
            {/* Left-edge fade into white left panel */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/55 via-white/5 to-transparent" />
          </div>

        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Popular Services</h2>
          <p className="text-gray-500 mt-2">సేవలు ఎంచుకోండి · Choose from our top categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`}
              className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 border-2 border-transparent hover:border-orange-400 transition-all duration-200 group">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <p className="font-bold text-gray-800 text-sm">{cat.name}</p>
              <p className="text-orange-500 text-xs font-medium">{cat.teluguName}</p>
              <p className="text-gray-400 text-xs mt-1 leading-tight">{cat.description}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/#services"
            className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-full font-semibold transition">
            View All Services →
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-500 mt-2">ఇది ఎలా పని చేస్తుంది · Simple 4-step process</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 text-gray-300 text-2xl z-10">→</div>
                )}
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <p className="text-3xl mb-2">{step.icon}</p>
                <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-14">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-3">Built for Bhimavaram 🏙️</h2>
          <p className="text-orange-100 max-w-2xl mx-auto mb-6">
            LocalHelp is a hyperlocal service marketplace designed specifically for Bhimavaram
            and West Godavari. We connect local customers with trusted service providers in their area.
            భీమవరం మరియు పశ్చిమ గోదావరి కోసం రూపొందించబడిన స్థానిక సేవా వేదిక.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup"
              className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition">
              Book a Service
            </Link>
            <Link href="/register"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-orange-500 transition">
              Join as Provider
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0f172a] text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-white font-bold text-lg">
                Local<span className="text-orange-500">Help</span>
              </p>
              <p className="text-sm">భీమవరం · West Godavari · Andhra Pradesh</p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:text-orange-400 transition">Home</Link>
              <Link href="/#services" className="hover:text-orange-400 transition">Services</Link>
              <Link href="/register" className="hover:text-orange-400 transition">Register</Link>
              <Link href="/login" className="hover:text-orange-400 transition">Login</Link>
              <Link href="/admin" className="hover:text-orange-400 transition">Admin</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs">
            © 2026 LocalHelp · Bhimavaram · Built with ❤️ for West Godavari
          </div>
        </div>
      </footer>
    </div>
  );
}

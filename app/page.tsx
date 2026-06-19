import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CATEGORIES } from "@/lib/data";

const TRUST_BADGES = [
  { icon: "✅", label: "Verified Professionals", sub: "నిర్థారించబడిన నిపుణులు" },
  { icon: "💰", label: "Affordable Pricing", sub: "సాధ్యమైన ధరలు" },
  { icon: "⚡", label: "Quick Response", sub: "వేగవంతమైన సేవ" },
  { icon: "🎧", label: "Customer Support", sub: "24/7 సహాయం" },
];

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
      <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
        {/* Orange glow blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 opacity-10 rounded-full blur-3xl -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 opacity-10 rounded-full blur-3xl translate-y-10 -translate-x-10" />

        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
          {/* Left content */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              ✅ Trusted Services. Local People. Better Living.
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Find Trusted Service<br />Providers in{" "}
              <span className="text-orange-500">Bhimavaram</span>
            </h1>
            <p className="text-gray-300 text-base mb-8 max-w-lg">
              Plumbers, Electricians, AC Technicians, Auto drivers and many more —
              all trusted and verified professionals at your service.
              <span className="block text-sm text-gray-400 mt-1">భీమవరంలో నమ్మకమైన సేవా నిపుణులు</span>
            </p>

            {/* Search bar */}
            <div className="flex gap-2 max-w-lg mx-auto md:mx-0">
              <input
                type="text"
                placeholder="Search plumber, electrician, auto mechanic..."
                className="flex-1 px-4 py-3.5 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-lg"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl font-semibold transition shadow-lg whitespace-nowrap">
                Search
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
              {TRUST_BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="text-lg">{b.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-white">{b.label}</p>
                    <p className="text-xs text-gray-400">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats card */}
          <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full md:w-72">
            {[
              { value: "500+", label: "Happy Customers", sub: "సంతుష్ట కస్టమర్లు" },
              { value: "50+", label: "Verified Providers", sub: "నిర్థారించబడిన నిపుణులు" },
              { value: "6+", label: "Service Categories", sub: "సేవా వర్గాలు" },
              { value: "4.8★", label: "Average Rating", sub: "సగటు రేటింగ్" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-orange-400">{s.value}</p>
                <p className="text-xs text-white font-medium mt-1">{s.label}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            ))}
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

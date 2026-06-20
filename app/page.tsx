import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CATEGORIES } from "@/lib/data";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingBookBtn from "@/components/FloatingBookBtn";
import FooterAccordion from "@/components/FooterAccordion";

// ─── Static data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "🛡️",
    title: "100% Verified",
    desc: "Every professional is background-verified and skill-tested before they join LocalHelp.",
    from: "from-green-50",
    to: "to-emerald-50",
    border: "border-green-100",
    iconBg: "bg-green-100",
  },
  {
    icon: "⚡",
    title: "Quick Response",
    desc: "Get a confirmed booking in under 10 minutes. No endless waiting or callbacks needed.",
    from: "from-amber-50",
    to: "to-yellow-50",
    border: "border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    icon: "💰",
    title: "Upfront Pricing",
    desc: "See the price before you book. Zero hidden charges. Pay only what was quoted.",
    from: "from-blue-50",
    to: "to-sky-50",
    border: "border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: "🎧",
    title: "Always Here",
    desc: "Dedicated support team available every day. We're just a message away.",
    from: "from-purple-50",
    to: "to-violet-50",
    border: "border-purple-100",
    iconBg: "bg-purple-100",
  },
];

const STATS = [
  { value: "6+", label: "Service Categories" },
  { value: "100%", label: "Verified Providers" },
  { value: "Same Day", label: "Quick Booking" },
  { value: "Zero", label: "Hidden Charges" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Search",
    desc: "Choose from 6+ categories of local services in Bhimavaram",
    icon: "🔍",
    accent: "from-blue-500 to-blue-700",
  },
  {
    step: "02",
    title: "Book",
    desc: "Pick a verified provider, select date & time, describe your problem",
    icon: "📅",
    accent: "from-violet-500 to-purple-700",
  },
  {
    step: "03",
    title: "Pay",
    desc: "Secure payment held safely until the job is completely done",
    icon: "💳",
    accent: "from-amber-500 to-orange-600",
  },
  {
    step: "04",
    title: "Done!",
    desc: "Provider completes the work. Rate and review your experience",
    icon: "🏆",
    accent: "from-green-500 to-emerald-700",
  },
];

// Gradient per category — same order as CATEGORIES array
const CAT_GRADIENTS = [
  "from-blue-500 to-blue-700",       // plumber
  "from-amber-500 to-orange-600",    // electrician
  "from-green-500 to-emerald-700",   // auto
  "from-purple-500 to-violet-700",   // purohit
  "from-rose-500 to-pink-700",       // caterer
  "from-indigo-600 to-blue-800",     // photographer
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "88vh" }}>
        {/* Mobile: full-screen photo background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bhimavaram-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center md:hidden"
          style={{ filter: "brightness(0.62) saturate(1.1)" }}
        />
        <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/10 via-black/35 to-black/75" />

        <div className="relative flex flex-col md:flex-row" style={{ minHeight: "88vh" }}>
          {/* LEFT — white bg on desktop, transparent (photo shows) on mobile */}
          <div className="flex-1 flex flex-col justify-center px-6 md:px-14 lg:px-20 py-16 md:py-0 z-10 md:bg-white">
            <div className="flex md:block justify-center">
              <span className="inline-flex items-center gap-2 bg-white/20 md:bg-orange-50 border border-white/40 md:border-orange-200 text-white md:text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm md:backdrop-blur-none">
                🛡️ Trusted Services · Local People · Better Living
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 text-white md:text-gray-900 text-center md:text-left">
              Find Trusted<br />
              Service Providers<br />
              in{" "}
              <span className="text-orange-400 md:text-orange-500">Bhimavaram</span>
            </h1>

            <p className="text-gray-200 md:text-gray-500 text-sm md:text-base mb-7 leading-relaxed text-center md:text-left max-w-md mx-auto md:mx-0">
              Plumbers, Electricians, Auto Services, Caterers and more — all
              verified local professionals, right at your doorstep.
            </p>

            {/* Search bar */}
            <div className="flex gap-2 max-w-md mx-auto md:mx-0 w-full mb-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Search plumber, electrician..."
                  className="w-full pl-9 pr-4 py-3.5 rounded-2xl border border-white/30 md:border-gray-200 bg-white/90 md:bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-md"
                />
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-5 py-3.5 rounded-2xl font-bold transition-colors whitespace-nowrap text-sm shadow-md shadow-orange-500/30">
                Search
              </button>
            </div>

            {/* Quick category pill links below search */}
            <div className="flex flex-wrap gap-2 max-w-md mx-auto md:mx-0 mb-7">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-xs bg-white/20 md:bg-gray-100 text-white md:text-gray-600 px-3 py-1.5 rounded-full hover:bg-white/30 md:hover:bg-orange-50 md:hover:text-orange-600 transition-colors"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
              <Link
                href="/#services"
                className="text-xs bg-white/20 md:bg-gray-100 text-white md:text-gray-600 px-3 py-1.5 rounded-full hover:bg-white/30 md:hover:bg-orange-50 md:hover:text-orange-600 transition-colors"
              >
                + More
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-start justify-center md:justify-start gap-5 flex-wrap">
              {[
                { emoji: "✅", title: "Verified", sub: "Professionals" },
                { emoji: "💰", title: "Affordable", sub: "Pricing" },
                { emoji: "⚡", title: "Quick", sub: "Response" },
                { emoji: "🎧", title: "24/7", sub: "Support" },
              ].map((b) => (
                <div key={b.title} className="flex flex-col items-center gap-1 text-center">
                  <div className="w-10 h-10 bg-white/20 md:bg-orange-50 rounded-full flex items-center justify-center text-lg">
                    {b.emoji}
                  </div>
                  <p className="text-xs font-bold text-white md:text-gray-700">{b.title}</p>
                  <p className="text-xs text-gray-300 md:text-gray-400">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — desktop only photo panel */}
          <div className="hidden md:block relative w-full md:w-[55%] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bhimavaram-bg.jpg"
              alt="Bhimavaram — Godavari River, Bridge and Temple"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ filter: "brightness(1.05) saturate(1.15) contrast(1.05)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ═══════════════════════════════════════════════════════ */}
      <div className="bg-orange-500">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-orange-400/50">
            {STATS.map((s) => (
              <div key={s.label} className="text-center px-4 py-2">
                <p className="text-2xl md:text-4xl font-black text-white leading-none">{s.value}</p>
                <p className="text-orange-100 text-xs mt-1.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SERVICES BENTO GRID ═══════════════════════════════════════════════ */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-20">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
              Everything You Need,{" "}
              <span className="text-orange-500">At Your Doorstep</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm">
              సేవలు ఎంచుకోండి · 6 categories of trusted local professionals
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => {
              const isLarge = i === 0 || i === 5;
              const gradient = CAT_GRADIENTS[i];
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[190px] hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ${
                    isLarge ? "col-span-1 md:col-span-2" : "col-span-1"
                  }`}
                >
                  <div className="relative z-10">
                    <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </span>
                    <h3 className="text-white font-bold text-base md:text-lg leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-white/70 text-xs mt-0.5">{cat.teluguName}</p>
                    {isLarge && (
                      <p className="text-white/60 text-xs mt-2 leading-relaxed hidden md:block">
                        {cat.description}
                      </p>
                    )}
                  </div>
                  <div className="relative z-10 mt-4">
                    <span className="inline-flex items-center gap-1 text-white/90 text-xs font-semibold group-hover:gap-2 transition-all duration-200">
                      Book Now <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </span>
                  </div>
                  {/* Decorative circles */}
                  <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full pointer-events-none" />
                  <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-white/10 rounded-full pointer-events-none" />
                </Link>
              );
            })}
          </div>
        </AnimatedSection>
      </section>

      {/* ══ HOW IT WORKS — dark section with timeline ═════════════════════════ */}
      <section id="how-it-works" className="bg-gray-950 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Simple Process</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
                How LocalHelp Works
              </h2>
              <p className="text-gray-500 mt-3 text-sm">
                ఇది ఎలా పని చేస్తుంది · Get your service done in 4 simple steps
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="relative">
              {/* Connecting dashed line — desktop only */}
              <div
                className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #f97316 0, #f97316 8px, transparent 8px, transparent 20px)",
                  opacity: 0.5,
                }}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {HOW_IT_WORKS.map((step) => (
                  <div key={step.step} className="flex flex-col items-center text-center">
                    <div
                      className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center mb-5 shadow-lg z-10`}
                    >
                      <span className="text-4xl">{step.icon}</span>
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full text-white text-xs font-black flex items-center justify-center shadow-md">
                        {parseInt(step.step)}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ WHY LOCALHELP — feature cards ════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
              Why Bhimavaram Trusts{" "}
              <span className="text-orange-500">LocalHelp</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm">మేము ఎందుకు ప్రత్యేకం · What makes us different</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`bg-gradient-to-br ${f.from} ${f.to} border ${f.border} rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group`}
              >
                <div
                  className={`w-14 h-14 ${f.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ══ PROVIDER CTA ══════════════════════════════════════════════════════ */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-20">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500">
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full pointer-events-none" />
            <div className="absolute -bottom-14 -left-14 w-64 h-64 bg-white/10 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />

            <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-14 items-center">
              {/* Left — text */}
              <div className="text-white">
                <span className="text-orange-200 text-xs font-bold uppercase tracking-widest block mb-3">
                  For Professionals
                </span>
                <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                  Are You a Service<br />Professional?
                </h2>
                <p className="text-orange-100 text-sm mb-1">
                  Join hundreds of providers earning well in Bhimavaram and nearby areas.
                </p>
                <p className="text-orange-200/80 text-xs mb-6">
                  మీరు సేవా నిపుణులా? మాతో చేరండి మరియు ఎక్కువ సంపాదించండి.
                </p>
                <ul className="space-y-2.5 text-sm text-orange-100">
                  {[
                    "Free registration — no monthly fees ever",
                    "Customers come directly to your phone",
                    "You keep 90% of every payment",
                    "Build your reputation with verified reviews",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-orange-200 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — CTA buttons */}
              <div className="flex flex-col gap-4">
                <Link
                  href="/register"
                  className="bg-white text-orange-600 font-black text-center py-4 px-8 rounded-2xl hover:bg-orange-50 transition-colors text-base shadow-2xl shadow-black/20"
                >
                  + Register as Provider
                </Link>
                <Link
                  href="/signup"
                  className="border-2 border-white/60 text-white font-bold text-center py-4 px-8 rounded-2xl hover:bg-white/10 transition-colors text-sm"
                >
                  Book a Service Instead →
                </Link>
                <p className="text-orange-200/60 text-xs text-center">
                  Join today · 100% Free · No hidden charges
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Floating book button — appears on scroll */}
      <FloatingBookBtn />

      {/* ══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer className="bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">

            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <p className="text-white font-black text-2xl mb-1">
                Local<span className="text-orange-500">Help</span>
              </p>
              <p className="text-gray-600 text-xs mb-4">భీమవరం · West Godavari · AP</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Bhimavaram&apos;s trusted hyperlocal service marketplace. Connecting people
                with skilled local professionals since 2026.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center text-sm hover:bg-green-500/30 transition-colors"
                  aria-label="WhatsApp"
                >
                  📱
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center text-sm hover:bg-pink-500/30 transition-colors"
                  aria-label="Instagram"
                >
                  📸
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center text-sm hover:bg-blue-500/30 transition-colors"
                  aria-label="Facebook"
                >
                  📘
                </a>
              </div>
            </div>

            {/* Services column — accordion */}
            <FooterAccordion
              title="Services"
              links={CATEGORIES.map((cat) => ({
                label: cat.name,
                href: `/category/${cat.slug}`,
                icon: cat.icon,
              }))}
            />

            {/* Company column — accordion */}
            <FooterAccordion
              title="Company"
              links={[
                { label: "Home", href: "/" },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Join as Provider", href: "/register" },
                { label: "Login", href: "/login" },
                { label: "Sign Up", href: "/signup" },
                { label: "Admin Panel", href: "/admin" },
              ]}
            />

            {/* Contact column */}
            <div className="col-span-2 md:col-span-1">
              <p className="text-white font-bold text-sm mb-5">Contact</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="mt-0.5 flex-shrink-0">📍</span>
                  <span>Bhimavaram, West Godavari, Andhra Pradesh — 534 201</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <span>📧</span>
                  <span>support@localhelp.in</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <span>📞</span>
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <span>🕐</span>
                  <span>Mon–Sat: 8 AM – 8 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8 text-xs text-gray-600">
            <p>© 2026 LocalHelp · Bhimavaram · Built with ❤️ for West Godavari</p>
            <div className="flex gap-5">
              <Link href="/" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
              <Link href="/" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
              <Link href="/" className="hover:text-orange-400 transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

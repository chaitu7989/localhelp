import Link from "next/link";
import Navbar from "@/components/Navbar";
import { PROVIDERS, CATEGORIES } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROVIDERS.map((p) => ({ id: p.id }));
}

export default async function ProviderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = PROVIDERS.find((p) => p.id === id);
  if (!provider) return notFound();

  const category = CATEGORIES.find((c) => c.slug === provider.category);

  return (
    <div>
      <Navbar />

      {/* Header */}
      <div className="bg-orange-500 text-white px-4 py-6 text-center">
        <div className="w-20 h-20 rounded-full bg-white text-orange-500 text-3xl font-bold flex items-center justify-center mx-auto mb-3">
          {provider.name[0]}
        </div>
        <h1 className="text-2xl font-bold">{provider.name}</h1>
        {provider.teluguName && <p className="text-orange-200 text-sm">{provider.teluguName}</p>}
        <p className="text-orange-100 text-sm mt-1">
          {category?.icon} {category?.name} · 📍 {provider.area}
        </p>
      </div>

      <div className="max-w-xl mx-auto px-4 mt-6 space-y-4">

        {/* Rating + Status */}
        <div className="bg-white rounded-2xl shadow p-4 flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold text-yellow-500">⭐ {provider.rating}</p>
            <p className="text-xs text-gray-400">{provider.totalReviews} reviews</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-700">{provider.experience}</p>
            <p className="text-xs text-gray-400">Experience</p>
          </div>
          <div>
            <p className={`text-lg font-bold ${provider.available ? "text-green-500" : "text-red-400"}`}>
              {provider.available ? "✅ Available" : "❌ Busy"}
            </p>
            <p className="text-xs text-gray-400">Status</p>
          </div>
        </div>

        {/* Price */}
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500 mb-1">Price Range / ధర</p>
          <p className="text-xl font-bold text-orange-500">{provider.priceRange}</p>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm font-semibold text-gray-600 mb-1">About / గురించి</p>
          <p className="text-gray-700 text-sm">{provider.description}</p>
        </div>

        {/* Contact Actions */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-600">Contact / సంప్రదించండి</p>
          <a
            href={`tel:${provider.phone}`}
            className="block w-full bg-orange-500 text-white text-center py-3 rounded-xl font-semibold text-lg hover:bg-orange-600 transition"
          >
            📞 Call Now · {provider.phone}
          </a>
          <a
            href={`https://wa.me/91${provider.phone}?text=Hello, I found you on LocalHelp. I need ${category?.name} service.`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 text-white text-center py-3 rounded-xl font-semibold text-lg hover:bg-green-600 transition"
          >
            💬 WhatsApp
          </a>
          {provider.upiId && (
            <div className="text-center text-sm text-gray-500">
              💰 UPI: <span className="font-medium text-gray-700">{provider.upiId}</span>
            </div>
          )}
        </div>

        <Link href={`/category/${provider.category}`} className="block text-center text-orange-500 underline text-sm pb-8">
          ← Back to {category?.name} list
        </Link>
      </div>
    </div>
  );
}

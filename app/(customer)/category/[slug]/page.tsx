import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CATEGORIES, PROVIDERS } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return notFound();

  const providers = PROVIDERS.filter((p) => p.category === slug && p.approved);

  return (
    <div>
      <Navbar />
      <div className="bg-orange-500 text-white px-4 py-6 text-center">
        <p className="text-4xl mb-1">{category.icon}</p>
        <h1 className="text-2xl font-bold">{category.name}</h1>
        <p className="text-orange-200 text-sm">{category.teluguName}</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-6">
        <p className="text-gray-500 text-sm mb-4">
          {providers.length} providers found in Bhimavaram
        </p>

        {providers.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-2">😔</p>
            <p>No providers yet in this category.</p>
            <Link href="/register" className="text-orange-500 underline text-sm mt-2 inline-block">
              Be the first to register!
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {providers.map((p) => (
            <Link
              key={p.id}
              href={`/provider/${p.id}`}
              className="bg-white rounded-2xl shadow p-4 flex items-center gap-4 hover:shadow-md border-2 border-transparent hover:border-orange-300 transition"
            >
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-2xl font-bold text-orange-500 shrink-0">
                {p.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800">{p.name}</p>
                {p.teluguName && <p className="text-xs text-gray-400">{p.teluguName}</p>}
                <p className="text-xs text-gray-500 mt-0.5">📍 {p.area} · {p.experience}</p>
                <p className="text-xs text-orange-600 font-medium mt-0.5">{p.priceRange}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-yellow-500 font-semibold">⭐ {p.rating}</p>
                <p className="text-xs text-gray-400">{p.totalReviews} reviews</p>
                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${p.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                  {p.available ? "Available" : "Busy"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

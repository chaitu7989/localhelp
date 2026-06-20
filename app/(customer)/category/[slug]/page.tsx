import Navbar from "@/components/Navbar";
import { CATEGORIES } from "@/lib/data";
import { notFound } from "next/navigation";
import ProviderList from "@/components/ProviderList";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Category header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-8 text-center">
        <p className="text-5xl mb-2">{category.icon}</p>
        <h1 className="text-2xl font-bold">{category.name}</h1>
        <p className="text-orange-100 text-sm mt-0.5">{category.teluguName}</p>
        <p className="text-orange-200 text-xs mt-1">{category.description}</p>
      </div>

      {/* Live availability notice */}
      <div className="max-w-2xl mx-auto px-4 mt-4">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 text-xs text-blue-600">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
          Live availability — updates in real time
        </div>
      </div>

      {/* Provider list (client component — fetches from Supabase live) */}
      <div className="max-w-2xl mx-auto px-4 mt-4 pb-10">
        <ProviderList slug={slug} />
      </div>
    </div>
  );
}

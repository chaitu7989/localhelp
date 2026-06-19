import Navbar from "@/components/Navbar";
import { PROVIDERS, CATEGORIES } from "@/lib/data";

export default function AdminPage() {
  const approved = PROVIDERS.filter((p) => p.approved);
  const pending = PROVIDERS.filter((p) => !p.approved);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-800 text-white text-center py-6 px-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-gray-400 text-sm mt-1">LocalHelp · Bhimavaram</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-6 space-y-6 pb-10">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Providers", value: PROVIDERS.length, color: "bg-blue-500" },
            { label: "Approved", value: approved.length, color: "bg-green-500" },
            { label: "Pending", value: pending.length, color: "bg-yellow-500" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} text-white rounded-2xl p-4 text-center shadow`}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs mt-1 opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* By Category */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="font-semibold text-gray-700 mb-3">Providers by Category</h2>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const count = PROVIDERS.filter((p) => p.category === cat.slug && p.approved).length;
              return (
                <div key={cat.slug} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{cat.icon} {cat.name}</span>
                  <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-medium">{count} providers</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Approvals */}
        {pending.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold text-yellow-600 mb-3">⏳ Pending Approvals ({pending.length})</h2>
            <div className="space-y-3">
              {pending.map((p) => (
                <div key={p.id} className="border border-yellow-200 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.phone} · {p.area}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-600">Approve</button>
                    <button className="bg-red-400 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-red-500">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Approved Providers */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="font-semibold text-gray-700 mb-3">✅ All Approved Providers</h2>
          <div className="space-y-3">
            {approved.map((p) => {
              const cat = CATEGORIES.find((c) => c.slug === p.category);
              return (
                <div key={p.id} className="border border-gray-100 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-400">{cat?.icon} {cat?.name} · {p.phone} · {p.area}</p>
                    <p className="text-xs text-yellow-500">⭐ {p.rating} ({p.totalReviews} reviews)</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${p.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-400"}`}>
                    {p.available ? "Active" : "Busy"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

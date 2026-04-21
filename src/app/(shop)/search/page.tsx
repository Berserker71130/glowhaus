"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight text-black">
        Search results for "{query}"
      </h1>

      <div className="flex gap-6 border-b border--gray-100 mt-10 mb-8 overflow-x-auto no-scrollbar">
        {["All", "Hair", "Nails", "Accessories"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab ? "border-b-2 border-black text-black" : "text-gray-300"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="text-center py-32 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
        <Search className="mx-auto text-gray-200 mb-6" size={64} />
        <h2 className="text-2xl font-bold text-black">No products found</h2>
        <p className="text-gray-500 mt-2">
          Try different keywords or browse our categories
        </p>
        <button className="mt-8 px-10 py-4 bg-black text-white rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform">
          Browse All Products
        </button>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={<div className="pt-40 text-center">Loading Search...</div>}
    >
      <SearchResults />
    </Suspense>
  );
}

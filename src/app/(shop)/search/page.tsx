"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import EmptyState from "@/components/ui/EmptyState";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Search Header */}
      <h1 className="text-4xl font-bold tracking-tight text-black">
        Search results for "{query}"
      </h1>

      {/* Category Tabs */}
      <div className="flex gap-6 border-b border-gray-100 mt-10 mb-8 overflow-x-auto no-scrollbar">
        {["All", "Hair", "Nails", "Accessories"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* THE UPGRADED EMPTY STATE: Matches requirement exactly */}
      <EmptyState
        icon="search"
        title={`No results for "${query}"`}
        subtitle={
          <span>
            Try:{" "}
            <span className="text-[#D4AF37] font-bold">Brazilian Hair</span> ·{" "}
            <span className="text-[#D4AF37] font-bold">Press-On Nails</span>
          </span>
        }
        ctaText="Browse All Products"
        ctaLink="/shop"
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-40 text-center font-bold tracking-widest uppercase text-xs">
          Loading Search...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}

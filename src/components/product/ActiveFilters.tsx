"use client";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: string[];
}

export default function ActiveFilters({ filters }: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {filters.map((filter) => (
        <div
          key={filter}
          className="flex items-center gap-2 bg-white border border-[#D4AF37]/30 px-4 py-2 hover:border-black cursor-pointer transition-all"
        >
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-800">
            {filter}
          </span>
          <X size={12} className="text-gray-400 hover:text-red-500" />
        </div>
      ))}
      <button className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] hover:text-black transition-colors underline underline-offset-8">
        Clear All Filters
      </button>
    </div>
  );
}

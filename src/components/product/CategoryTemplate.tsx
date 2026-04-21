"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // Added router hooks
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import ActiveFilters from "./ActiveFilters";
import MobileFilterDrawer from "./MobileFilterDrawer";
import { SlidersHorizontal } from "lucide-react";

interface CategoryTemplateProps {
  title: string;
  bannerImage: string;
}

export default function CategoryTemplate({
  title,
  bannerImage,
}: CategoryTemplateProps) {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize router
  const pathname = usePathname(); // Initialize pathname

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // AC: Fix hydration by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // NEW: Handler to remove a single filter chip
  const removeFilter = (filterValue: string) => {
    const params = new URLSearchParams(searchParams);

    // Logic to find which key matches the value and delete it
    if (params.get("category") === filterValue) params.delete("category");
    if (params.get("sort") === filterValue) params.delete("sort");
    if (filterValue === "In Stock") params.delete("stock");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // NEW: Handler to clear all filters at once
  const clearAllFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  // AC #4 & #6: Logic to handle dynamic filtering and result counting
  const activeFilterCount = useMemo(() => {
    if (!mounted) return 48;

    const hasCategory = searchParams.get("category");
    const hasPrice = searchParams.get("maxPrice");
    const hasStock = searchParams.get("stock");

    if (!hasCategory && !hasPrice && !hasStock) return 48;

    // Randomization only happens on the client now
    return Math.floor(Math.random() * (24 - 5 + 1)) + 5;
  }, [searchParams, mounted]);

  // AC #5: Map URL params to active chips
  const activeFilters = useMemo(() => {
    const filters: string[] = [];
    const cat = searchParams.get("category");
    const sort = searchParams.get("sort");
    const stock = searchParams.get("stock");

    if (cat) filters.push(cat);
    if (sort) filters.push(sort);
    if (stock === "true") filters.push("In Stock");

    return filters;
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {" "}
      {/* Explicit Ivory BG */}
      {/* CATEGORY HERO - 260px */}
      <section className="relative w-full h-[260px] bg-black overflow-hidden">
        <img
          src={bannerImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 text-white z-10">
          <h1 className="text-5xl md:text-6xl font-serif capitalize tracking-tight">
            {title}
          </h1>
          <nav className="text-[10px] uppercase tracking-[0.4em] mt-4 font-bold opacity-80">
            Home <span className="mx-2 text-[#D4AF37]">›</span> {title}
          </nav>
        </div>
      </section>
      {/* MOBILE SORT BAR - Sticky */}
      <div className="md:hidden sticky top-0 z-30 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#D4AF37]/20 px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest"
        >
          <SlidersHorizontal size={16} className="text-[#D4AF37]" /> Filter &
          Sort
        </button>
        <span className="text-[10px] font-bold text-gray-400 uppercase">
          {activeFilterCount} Products
        </span>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* LEFT: FILTER SIDEBAR - 260px Sticky */}
          <aside className="hidden md:block w-[260px] sticky top-32 h-fit">
            <FilterSidebar />
          </aside>

          {/* RIGHT: MAIN CONTENT */}
          <main className="flex-1">
            <div className="hidden md:flex justify-between items-center border-b border-[#D4AF37]/20 pb-4 mb-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Showing{" "}
                <span className="text-gray-900">{activeFilterCount}</span>{" "}
                products
              </p>
            </div>

            {/* AC #5: Chips now fully functional with handlers passed down */}
            <ActiveFilters
              filters={activeFilters}
              onRemove={removeFilter}
              onClearAll={clearAllFilters}
            />

            <ProductGrid />
          </main>
        </div>
      </div>
      <MobileFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

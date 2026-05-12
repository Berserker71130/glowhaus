"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import ActiveFilters from "./ActiveFilters";
import MobileFilterDrawer from "./MobileFilterDrawer";
import { SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EmptyState from "@/components/ui/EmptyState";
import { products } from "@/lib/dummy-data"; // Import products to get real count

interface CategoryTemplateProps {
  title: string;
  bannerImage: string;
}

export default function CategoryTemplate({
  title,
  bannerImage,
}: CategoryTemplateProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const removeFilter = (filterValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get("category") === filterValue) params.delete("category");
    if (params.get("sort") === filterValue) params.delete("sort");
    if (filterValue === "In Stock") params.delete("stock");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  // UPDATED: Now shows the REAL count of products for that category
  const activeFilterCount = useMemo(() => {
    if (!mounted) return 0;

    // Filter the real products array by the page title
    const categoryProducts = products.filter(
      (p: any) => p.category?.toLowerCase() === title.toLowerCase(),
    );

    return categoryProducts.length;
  }, [mounted, title]);

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
    /* Changed bg-white to Ivory and added Dark Mode Noir transition */
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0D0D0D] transition-colors duration-500">
      <section className="relative w-full h-[260px] bg-black overflow-hidden">
        <img
          src={bannerImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-700 dark:opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 text-white z-10">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif capitalize tracking-tight"
          >
            {title}
          </motion.h1>
          <nav className="text-[10px] uppercase tracking-[0.4em] mt-4 font-bold opacity-80">
            Home <span className="mx-2 text-[#D4AF37]">›</span> {title}
          </nav>
        </div>
      </section>

      {/* Mobile Bar: Added dark:bg-noir/90 and updated text colors */}
      <div className="md:hidden sticky top-0 z-30 bg-[#FAF9F6]/90 dark:bg-noir/90 backdrop-blur-md border-b border-[#D4AF37]/20 px-6 py-4 flex justify-between items-center transition-colors duration-500">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-noir dark:text-ivory"
        >
          <SlidersHorizontal size={16} className="text-[#D4AF37]" /> Filter &
          Sort
        </button>
        <span className="text-[10px] font-bold text-gray-400 dark:text-ivory/40 uppercase">
          {activeFilterCount} Products
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebars need dark mode logic inside their own components too */}
          <aside className="hidden md:block w-[260px] sticky top-32 h-fit">
            <FilterSidebar />
          </aside>

          <main className="flex-1">
            <div className="hidden md:flex justify-between items-center border-b border-[#D4AF37]/20 pb-4 mb-6 transition-colors duration-500">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-ivory/40">
                Showing{" "}
                <span className="text-gray-900 dark:text-ivory">
                  {activeFilterCount}
                </span>{" "}
                products
              </p>
            </div>

            <ActiveFilters
              filters={activeFilters}
              onRemove={removeFilter}
              onClearAll={clearAllFilters}
            />

            {/* KEY CHANGE: We are now passing the 'title' to the ProductGrid */}
            {activeFilterCount > 0 ? (
              <ProductGrid categoryTitle={title} />
            ) : (
              <div className="py-20 border-y border-[#D4AF37]/10 mt-8 transition-colors duration-500">
                <EmptyState
                  icon="search"
                  title="We couldn't find anything matching your filters"
                  subtitle={
                    <span className="text-noir/60 dark:text-ivory/60">
                      Try adjusting your selection or clearing your filters to
                      see our full
                      <span className="text-[#D4AF37] italic ml-1">
                        {title}
                      </span>{" "}
                      collection.
                    </span>
                  }
                  ctaText="Clear Filters"
                  onClear={clearAllFilters}
                />
              </div>
            )}
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

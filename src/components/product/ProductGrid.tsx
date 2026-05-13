"use client";

import { useState } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { products } from "@/lib/dummy-data";

interface ProductGridProps {
  categoryTitle?: string;
}

export default function ProductGrid({ categoryTitle }: ProductGridProps) {
  // 1. STATE: To track which product is being "Quick Viewed"
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 2. FILTER LOGIC:
  // If we have a categoryTitle (like "Nails"), we filter the 32 products.
  // If not (like on the Homepage), we show the first 12 products.
  const displayProducts = categoryTitle
    ? products.filter(
        (p: any) => p.category?.toLowerCase() === categoryTitle.toLowerCase(),
      )
    : products.slice(0, 12);

  return (
    <section className="w-full bg-ivory dark:bg-noir transition-colors duration-500">
      {/* 3. THE GRID: 
          - grid-cols-2: Enables the double-column look for mobile 
          - gap-x-3: Tightened horizontal gap for slim mobile cards
          - gap-y-10: Maintains vertical spacing for readability
      */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10 md:gap-x-10 md:gap-y-20 px-4 md:px-0">
        {displayProducts.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setSelectedProduct(p)}
          />
        ))}
      </div>

      {/* 4. THE MODAL: Only opens when selectedProduct is not null */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}

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
    <section className="w-full">
      {/* 3. THE GRID: Responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
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

"use client";

import { useState } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

// 1. MOCK DATA: This simulates products coming from a database
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Luxury Silk Press Wig",
    price: 45000,
    originalPrice: 60000,
    rating: 5,
    reviewsCount: 128,
    image:
      "https://images.unsplash.com/photo-1595476108010-b19086dd12bb?auto=format&fit=crop&w=800&q=80",
    badges: ["SALE", "BESTSELLER"],
    isSoldOut: false,
  },
  {
    id: "2",
    name: "Classic French Tip Set",
    price: 15000,
    rating: 4,
    reviewsCount: 45,
    image:
      "https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=800&q=80",
    badges: ["NEW"],
    isSoldOut: true, // Test grayscale/sold out logic
  },
  {
    id: "3",
    name: "Glow Serum Foundation",
    price: 22000,
    rating: 5,
    reviewsCount: 89,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&w=800&q=80",
    badges: ["LOW STOCK"],
    isSoldOut: false,
  },
  {
    id: "4",
    name: "Velvet Matte Lipstick",
    price: 8500,
    originalPrice: 12000,
    rating: 4,
    reviewsCount: 210,
    image:
      "https://images.unsplash.com/photo-1586790170053-200e352233ce?auto=format&fit=crop&w=800&q=80",
    badges: ["SALE"],
    isSoldOut: false,
  },
];

export default function ProductGrid() {
  // 2. STATE: To track which product is being "Quick Viewed"
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className="w-full">
      {/* 3. THE GRID: Using the standard responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {MOCK_PRODUCTS.map((product) => (
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

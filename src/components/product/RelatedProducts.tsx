"use client";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedProps {
  products: any[]; // Accepts the filtered list from the Page
  category: string;
}

export default function RelatedProducts({ products, category }: RelatedProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold font-serif">You May Also Like</h2>
        <Link
          href={`/shop?category=${category}`}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-pink-600 transition-colors"
        >
          View All {category} <ArrowRight size={16} />
        </Link>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
        {products.map((item) => (
          <div key={item.id} className="w-[280px] flex-shrink-0 snap-start">
            {/* Fix: Added onQuickView to satisfy the ProductCard requirements.
              We also cast 'item' to 'Product' to match your global interface.
            */}
            <ProductCard product={item as Product} onQuickView={() => {}} />
          </div>
        ))}
      </div>
    </section>
  );
}

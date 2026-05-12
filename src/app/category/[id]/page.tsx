"use client";

import React from "react";
import { useParams } from "next/navigation";
import { products } from "@/lib/dummy-data";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const params = useParams();
  // We clean the ID: lowercase it and replace hyphens with spaces for searching
  const id = (params.id as string).toLowerCase();

  // FIX 2: THE MULTI-LAYER FILTER
  const filteredProducts = products.filter((product) => {
    const mainCat = product.category.toLowerCase();
    const subCat = product.subcategory.toLowerCase();

    // This allows the page to show items if the URL matches the
    // main category (Hair) OR the subcategory (Wigs)
    return (
      mainCat === id ||
      subCat === id ||
      // Handles plurals (e.g., 'wigs' matching 'wig' or 'closures' matching 'closure')
      subCat.includes(id.replace(/s$/, "")) ||
      id.includes(subCat)
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-noir pt-32 pb-20 px-6 transition-colors duration-300">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-serif text-4xl md:text-5xl text-gold italic capitalize mb-4"
        >
          {id.replace(/-/g, " ")}
        </motion.h1>
        <p className="text-noir/60 dark:text-ivory/60 text-[10px] uppercase tracking-[0.2em]">
          Showing {filteredProducts.length} Exclusive Pieces
        </p>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={product.id}
              className="group cursor-pointer"
            >
              <Link href={`/product/${product.slug}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-white/5 rounded-sm mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Luxury Sold Out Badge */}
                  {product.isSoldOut && (
                    <div className="absolute top-2 left-2 bg-noir/80 text-ivory text-[8px] px-2 py-1 uppercase tracking-widest">
                      Sold Out
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-[11px] md:text-[13px] uppercase tracking-wider font-bold text-noir dark:text-ivory">
                    {product.name}
                  </h3>
                  <p className="text-gold font-serif italic text-lg">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-noir/40 dark:text-ivory/40 italic font-serif text-xl">
              The {id.replace(/-/g, " ")} collection is arriving soon...
            </p>
            <Link
              href="/"
              className="text-gold text-[10px] uppercase tracking-widest mt-6 inline-block border-b border-gold/40"
            >
              Return to Gallery
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const PRODUCTS = [
  {
    id: 1,
    name: "Brazilian Silk Straight",
    category: "Hair",
    price: "₦145,000",
    isNew: true,
    img: "https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=800",
  },
  {
    id: 2,
    name: "Midnight Chrome Tips",
    category: "Nails",
    price: "₦12,500",
    isNew: true,
    img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800",
  },
  {
    id: 3,
    name: "HD Invisible Lace Front",
    category: "Hair",
    price: "₦185,000",
    isNew: true,
    img: "https://images.unsplash.com/photo-1595475243692-3a99d72ad5d3d?q=80&w=800",
  },
  {
    id: 4,
    name: "Gold Plated Hair Cuff",
    category: "Accessories",
    price: "₦15,000",
    isNew: true,
    img: "https://images.unsplash.com/photo-1554050857-c84a8babb521?q=80&w=800",
  },
];

const TABS = ["All", "Hair", "Nails", "Accessories"];

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = PRODUCTS.filter(
    (p) => p.isNew && (activeTab === "All" || p.category === activeTab),
  );

  return (
    // Section background is Ivory
    <section className="py-24 px-6 lg:px-20 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-display text-noir mb-8 italic">
              New Arrivals
            </h2>
            <div className="flex gap-8 overflow-x-auto pb-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-2 text-xs uppercase tracking-widest font-bold transition-all ${
                    activeTab === tab
                      ? "text-gold"
                      : "text-noir/40 hover:text-noir"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <Link
            href="/shop"
            className="text-gold font-bold text-xs uppercase tracking-widest border-b border-gold pb-1"
          >
            Shop All New Arrivals →
          </Link>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                // THE "POP" FIX:
                // 1. bg-white: Sharp contrast against Ivory
                // 2. border-taupe/20: Defined edge using brand muted color
                // 3. shadow-card: Using your design system's custom card shadow
                // 4. hover:shadow-gold: Using your design system's gold glow
                className="group bg-white p-4 rounded-xl border border-taupe/20 shadow-card hover:shadow-gold hover:border-gold/50 transition-all duration-500"
              >
                <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-lg bg-blush">
                  <img
                    src={product.img}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                    alt={product.name}
                  />
                  {/* Floating Badge to break the image line */}
                  <div className="absolute top-3 left-3 bg-rose-deep text-white text-[9px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest">
                    New
                  </div>
                </div>

                <div className="text-center px-2">
                  <h3 className="font-display italic text-xl text-noir leading-tight mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gold font-bold text-lg">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

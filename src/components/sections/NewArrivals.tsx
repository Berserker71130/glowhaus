"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { showGlowToast } from "@/lib/toast";
import { ShoppingBag, Heart } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    slug: "hd-lace-frontal-13x4",
    name: "HD Lace Frontal 13x4",
    category: "Hair",
    price: "₦145,000",
    isNew: true,
    img: "brazilliansilkstraight.webp",
  },
  {
    id: 2,
    slug: "nail-lamp-uv-led",
    name: "Nail Lamp UV/LED (36W)",
    category: "Nails",
    price: "₦12,500",
    isNew: true,
    img: "/naillamp.jpg",
  },
  {
    id: 3,
    slug: "hd-lace-frontal-13x4",
    name: "HD Invisible Lace Front",
    category: "Hair",
    price: "₦185,000",
    isNew: true,
    img: "/hdlacefrontal.jpg",
  },
  {
    id: 4,
    slug: "jade-roller-set",
    name: "Jade Roller & Gua Sha Set",
    category: "Accessories",
    price: "₦15,000",
    isNew: true,
    img: "/jaderoller.jpg",
  },
];

const TABS = ["All", "Hair", "Nails", "Accessories"];

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState("All");

  // --- STORE CONNECTIONS ---
  const addToCart = useStore((state: any) => state.addToCart);
  const addToWishlist = useStore((state: any) => state.addToWishlist);
  const wishlist = useStore((state: any) => state.wishlist) || [];

  // --- ACTIONS WITH GLOW TOASTS ---
  const handleAddToCart = (product: any) => {
    const rawPrice =
      typeof product.price === "string"
        ? parseInt(product.price.replace(/[^\d]/g, ""), 10)
        : product.price;

    addToCart({
      ...product,
      id: `prod-${product.slug}`,
      price: rawPrice,
      quantity: 1,
    });

    showGlowToast({
      message: "Added to your bag! 🛍️",
      accentColor: "#D4AF37",
      icon: "✨",
    });
  };

  const handleAddToWishlist = (product: any) => {
    const targetId = `prod-${product.slug}`;
    const isAlreadyIn = wishlist.some(
      (item: any) => (item.id || item._id) === targetId,
    );

    if (isAlreadyIn) {
      showGlowToast({
        message: "Already in your wishlist!",
        accentColor: "#3B82F6",
        icon: "💙",
      });
    } else {
      addToWishlist({
        ...product,
        id: targetId,
      });
      showGlowToast({
        message: "Saved to wishlist ❤️",
        accentColor: "#E29595",
        icon: "✨",
      });
    }
  };

  const filteredProducts = PRODUCTS.filter(
    (p) => p.isNew && (activeTab === "All" || p.category === activeTab),
  );

  return (
    /* Added dark:bg-[#0D0D0D] and transition */
    <section className="py-24 px-6 lg:px-20 bg-ivory dark:bg-[#0D0D0D] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-display text-noir dark:text-ivory mb-8 italic transition-colors duration-500">
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
                      : "text-noir/40 dark:text-ivory/40 hover:text-noir dark:hover:text-ivory"
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
            {filteredProducts.map((product) => {
              const targetId = `prod-${product.slug}`;
              const isProductFavorited = wishlist.some(
                (item: any) => (item.id || item._id) === targetId,
              );

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  {/* Converted outer card item to a Next.js Link targeting your description pages */}
                  <Link
                    href={`/product/${product.slug}`}
                    className="group block bg-white dark:bg-zinc-900 p-4 rounded-xl border border-taupe/20 dark:border-white/5 shadow-card hover:shadow-gold hover:border-gold/50 transition-all duration-500"
                  >
                    {/* Updated inner image container bg */}
                    <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-lg bg-blush dark:bg-zinc-800">
                      <img
                        src={product.img}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                        alt={product.name}
                      />
                      <div className="absolute top-3 left-3 bg-rose-deep text-white text-[9px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest">
                        New
                      </div>

                      {/* HOVER ACTION BUTTONS WITH BINDINGS */}
                      <div className="absolute inset-0 bg-noir/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="bg-white dark:bg-zinc-800 p-4 rounded-full text-noir dark:text-ivory hover:bg-gold hover:text-white transition-all shadow-xl translate-y-6 group-hover:translate-y-0 duration-300"
                        >
                          <ShoppingBag size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToWishlist(product);
                          }}
                          className="bg-white dark:bg-zinc-800 p-4 rounded-full text-noir dark:text-ivory hover:bg-gold hover:text-white transition-all shadow-xl translate-y-6 group-hover:translate-y-0 duration-500"
                        >
                          <Heart
                            size={20}
                            fill={isProductFavorited ? "#E29595" : "none"}
                            className={
                              isProductFavorited ? "text-[#E29595]" : ""
                            }
                          />
                        </button>
                      </div>
                    </div>

                    <div className="text-center px-2">
                      {/* Added dark text flip */}
                      <h3 className="font-display italic text-xl text-noir dark:text-ivory leading-tight mb-2 transition-colors duration-500">
                        {product.name}
                      </h3>
                      <p className="text-gold font-bold text-lg">
                        {product.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

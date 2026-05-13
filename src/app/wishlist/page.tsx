"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { showGlowToast } from "@/lib/toast";
import { products as allProducts } from "@/lib/dummy-data/products";
import EmptyState from "@/components/ui/EmptyState";
import { Product } from "@/types"; // Import your standardized type
import {
  ArrowDown,
  BellRing,
  ChevronRight,
  Share2,
  ShoppingBag,
  Trash2,
} from "lucide-react";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToWishlist, addToCart } =
    useStore();

  const [sortBy, setSortBy] = useState("Date Added");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showGlowToast({
      message: "Wishlist link copied to clipboard! 🔗",
      accentColor: "#3B82F6",
      icon: "🌐",
    });
  };

  // FIXED: Added Proper Typing to handleRemove
  const handleRemove = (product: Product) => {
    removeFromWishlist(product.id);
    showGlowToast({
      message: "Removed from wishlist",
      accentColor: "#1A1A1A",
      icon: "🗑️",
      action: {
        label: "Undo",
        fn: () => addToWishlist(product),
      },
    });
  };

  const sortedItems = useMemo(() => {
    const items = [...wishlistItems];
    if (sortBy === "Price Low-High")
      return items.sort((a, b) => a.price - b.price);
    if (sortBy === "Price High-Low")
      return items.sort((a, b) => b.price - a.price);
    return items;
  }, [wishlistItems, sortBy]);

  const recommendations = useMemo(() => {
    // FIXED: Standardized category access
    const favoriteCategory = wishlistItems[0]?.category || "hair";
    return allProducts
      .filter(
        (p) =>
          p.category === favoriteCategory &&
          !wishlistItems.find((w) => w.id === p.id),
      )
      .slice(0, 4);
  }, [wishlistItems]);

  return (
    <div className="min-h-screen pt-32 pb-20 transition-colors duration-500 bg-[#FCF9F2] dark:bg-noir">
      <div className="container mx-auto px-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif text-noir dark:text-ivory mb-2 transition-colors">
              My Wishlist{" "}
              <span className="text-noir/30 dark:text-ivory/30 text-2xl transition-colors">
                ({wishlistItems.length})
              </span>
            </h1>
            <div className="flex items-center gap-2 text-noir/50 dark:text-ivory/40 text-sm tracking-widest uppercase font-light transition-colors">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronRight size={14} />
              <span>Wishlist</span>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-white dark:bg-white/5 border border-noir/10 dark:border-white/10 px-6 py-3 pr-12 text-xs text-noir dark:text-ivory uppercase tracking-widest focus:outline-none focus:border-gold transition-all"
              >
                <option>Date Added</option>
                <option>Price Low-High</option>
                <option>Price High-Low</option>
                <option>Category</option>
              </select>
              <ArrowDown
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-noir/40 dark:text-ivory/40"
              />
            </div>
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-noir/10 dark:border-white/10 rounded-none h-12 text-noir dark:text-ivory hover:bg-noir dark:hover:bg-ivory dark:hover:text-noir transition-all"
            >
              <Share2 size={18} className="mr-2" /> Share
            </Button>
          </div>
        </div>

        {/* WISHLIST GRID */}
        <AnimatePresence mode="popLayout">
          {wishlistItems.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
            >
              {sortedItems.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group relative"
                >
                  {/* FIXED: Aspect Ratio to match ProductCard 16/10 for consistency */}
                  <div className="relative aspect-[16/10] mb-6 overflow-hidden bg-gray-50 dark:bg-zinc-900 border border-noir/5 dark:border-white/5 transition-colors">
                    <img
                      src={product.images[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${product.isSoldOut ? "grayscale" : ""}`}
                    />
                    {product.isSoldOut && (
                      <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-noir dark:bg-ivory text-white dark:text-noir text-[10px] tracking-[0.2em] uppercase px-4 py-2">
                          Sold Out
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => handleRemove(product)}
                      className="absolute top-4 right-4 p-2.5 bg-white dark:bg-noir text-noir dark:text-ivory hover:bg-noir dark:hover:bg-gold hover:text-white transition-all shadow-sm z-10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-noir/40 dark:text-ivory/40 mb-2 transition-colors">
                      {product.category}
                    </p>
                    <h3 className="font-serif text-xl text-noir dark:text-ivory mb-2 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gold font-medium mb-6">
                      ₦{product.price.toLocaleString()}
                    </p>

                    {product.isSoldOut ? (
                      <Button className="w-full rounded-none h-12 bg-transparent border border-noir/20 dark:border-white/20 text-noir dark:text-ivory hover:bg-noir dark:hover:bg-white dark:hover:text-noir text-[10px] uppercase tracking-widest transition-all">
                        <BellRing size={14} className="mr-2" /> Notify Me
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          addToCart(product, {});
                          removeFromWishlist(product.id);
                        }}
                        className="w-full rounded-none h-12 bg-noir dark:bg-white text-white dark:text-black hover:bg-gold transition-all text-[10px] uppercase tracking-widest"
                      >
                        <ShoppingBag size={14} className="mr-2" /> Move to Cart
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-20 border-y border-noir/5 dark:border-white/5 transition-colors">
              <EmptyState
                icon="heart"
                title="Your Wishlist is Empty"
                subtitle={
                  <span className="dark:text-ivory/60">
                    Explore our
                    <span className="text-[#D4AF37] italic ml-1">
                      Luxury Collections
                    </span>{" "}
                    to find your next look.
                  </span>
                }
                ctaText="Browse Our Collections"
                ctaLink="/shop"
              />
            </div>
          )}
        </AnimatePresence>

        {/* RECOMMENDATIONS */}
        {recommendations.length > 0 && (
          <section className="mt-40 transition-all duration-500">
            <div className="flex items-center gap-8 mb-12">
              <h2 className="text-2xl font-serif text-noir dark:text-ivory whitespace-nowrap transition-colors">
                You Might Also Like
              </h2>
              <div className="h-px w-full bg-noir/5 dark:bg-white/10 transition-colors" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommendations.map((p) => (
                <Link
                  href={`/product/${p.id}`}
                  key={p.id}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[16/10] mb-4 bg-gray-50 dark:bg-zinc-900 overflow-hidden border border-transparent dark:border-white/5 transition-colors">
                    <img
                      src={p.images[0] || "/placeholder.jpg"}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      alt={p.name}
                    />
                  </div>
                  <h4 className="font-serif text-lg text-noir dark:text-ivory transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-gold text-sm font-medium">
                    ₦{p.price.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

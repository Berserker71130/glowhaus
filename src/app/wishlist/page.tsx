"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
// 1. Swapped manual toast for the Luxe Engine
import { showGlowToast } from "@/lib/toast";
import { products as allProducts } from "@/lib/dummy-data/products";
import {
  ArrowDown,
  BellRing,
  ChevronRight,
  Heart,
  Share2,
  ShoppingBag,
  Trash2,
} from "lucide-react";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToWishlist, addToCart } =
    useStore();

  const [sortBy, setSortBy] = useState("Date Added");

  // --- TASK: LINK COPIED (Blue) ---
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showGlowToast({
      message: "Wishlist link copied to clipboard! 🔗",
      accentColor: "#3B82F6", // Luxe Blue
      icon: "🌐",
    });
  };

  // --- TASK: REMOVE FROM WISHLIST (Dark with Undo) ---
  const handleRemove = (product: any) => {
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

  // LOGIC: SORTING
  const sortedItems = useMemo(() => {
    const items = [...wishlistItems];
    if (sortBy === "Price Low-High")
      return items.sort((a, b) => a.price - b.price);
    if (sortBy === "Price High-Low")
      return items.sort((a, b) => b.price - a.price);
    return items;
  }, [wishlistItems, sortBy]);

  // LOGIC: RECOMMENDATIONS
  const recommendations = useMemo(() => {
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
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif text-noir mb-2">
              My Wishlist{" "}
              <span className="text-noir/30 text-2xl">
                ({wishlistItems.length})
              </span>
            </h1>
            <div className="flex items-center gap-2 text-noir/50 text-sm tracking-widest uppercase font-light">
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
                className="w-full appearance-none bg-white border border-noir/10 px-6 py-3 pr-12 text-xs uppercase tracking-widest focus:outline-none focus:border-gold"
              >
                <option>Date Added</option>
                <option>Price Low-High</option>
                <option>Price High-Low</option>
                <option>Category</option>
              </select>
              <ArrowDown
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-noir/40"
              />
            </div>
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-noir/10 rounded-none h-12 hover:bg-noir hover:text-white"
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
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${product.isSoldOut ? "grayscale" : ""}`}
                    />
                    {product.isSoldOut && (
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-noir text-white text-[10px] tracking-[0.2em] uppercase px-4 py-2">
                          Sold Out
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => handleRemove(product)}
                      className="absolute top-4 right-4 p-2.5 bg-white text-noir hover:bg-noir hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-noir/40 mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-serif text-xl text-noir mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gold font-medium mb-6">
                      ₦{product.price.toLocaleString()}
                    </p>

                    {product.isSoldOut ? (
                      <Button className="w-full rounded-none h-12 bg-transparent border border-noir/20 text-noir hover:bg-noir hover:text-white text-[10px] uppercase tracking-widest">
                        <BellRing size={14} className="mr-2" /> Notify Me
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          addToCart(product, {});
                          removeFromWishlist(product.id);
                          showGlowToast({
                            message: "Moved to Bag",
                            icon: "🛍️",
                            accentColor: "#C5A059",
                          });
                        }}
                        className="w-full rounded-none h-12 bg-noir text-white hover:bg-gold transition-all text-[10px] uppercase tracking-widest"
                      >
                        <ShoppingBag size={14} className="mr-2" /> Move to Cart
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-32 border-y border-noir/5">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-8"
              >
                <Heart size={80} strokeWidth={0.5} className="text-gold" />
              </motion.div>
              <h2 className="text-3xl font-serif text-noir mb-4">
                Your Wishlist is empty
              </h2>
              <p className="text-noir/40 font-light mb-10 max-w-xs text-center text-sm">
                Sign in to sync your wishlist across all your devices or browse
                our shop to add favorites.
              </p>
              <Link href="/shop">
                <Button className="bg-noir text-white px-12 h-14 rounded-none uppercase tracking-widest text-[10px] hover:bg-gold transition-all shadow-xl">
                  Browse Our Collections
                </Button>
              </Link>
            </div>
          )}
        </AnimatePresence>

        {/* YOU MIGHT ALSO LIKE SECTION */}
        {recommendations.length > 0 && (
          <section className="mt-40">
            <div className="flex items-center gap-8 mb-12">
              <h2 className="text-2xl font-serif text-noir whitespace-nowrap">
                You Might Also Like
              </h2>
              <div className="h-px w-full bg-noir/5" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommendations.map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] mb-4 bg-gray-50 overflow-hidden">
                    <img
                      src={
                        Array.isArray(p.images)
                          ? p.images[0]
                          : p.images || "/placeholder.png"
                      }
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      alt={p.name}
                    />
                  </div>
                  <h4 className="font-serif text-lg">{p.name}</h4>
                  <p className="text-gold text-sm font-medium">
                    ₦{p.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

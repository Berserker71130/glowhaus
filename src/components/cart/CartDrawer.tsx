"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import { showGlowToast } from "@/lib/toast";
// Import your Product type
import { Product } from "@/types";

export default function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    addToCart,
  } = useStore();

  const FREE_DELIVERY_THRESHOLD = 50000;
  const glowPoints = Math.floor(cartTotal / 100);

  // --- FIXED: Added Proper Typing to handleRemove ---
  const handleRemove = (item: { product: Product; selectedOptions?: any }) => {
    const productId = item.product.id;
    const productName = item.product.name;
    const previousItem = { ...item };

    removeFromCart(productId);

    showGlowToast({
      message: `${productName} removed`,
      accentColor: "#1A1A1A",
      icon: "🗑️",
      action: {
        label: "Undo",
        fn: () =>
          addToCart(previousItem.product, previousItem.selectedOptions || {}),
      },
    });
  };

  const handleQtyChange = (id: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty > 0) {
      updateQuantity(id, newQty);
    }
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-noir/60 dark:bg-black/80 z-[100] backdrop-blur-md"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-ivory dark:bg-noir z-[101] shadow-2xl flex flex-col border-l border-gold/20"
          >
            {/* HEADER */}
            <div className="p-8 border-b border-gold/10 flex justify-between items-center bg-white dark:bg-zinc-900">
              <div>
                <h2 className="text-xl font-serif italic font-bold text-gold tracking-tight">
                  My Bag
                </h2>
                <p className="text-[10px] text-noir/50 dark:text-ivory/40 uppercase tracking-[0.2em] font-bold mt-1">
                  ({cartItems.length}{" "}
                  {cartItems.length === 1 ? "Item" : "Items"})
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-gold/10 rounded-full transition-all text-gold group"
              >
                <X
                  size={24}
                  strokeWidth={1.5}
                  className="group-hover:rotate-90 transition-transform"
                />
              </button>
            </div>

            {/* ITEM LIST */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 group p-2 bg-white/50 dark:bg-white/5 border border-transparent hover:border-gold/10 transition-all rounded-sm"
                  >
                    {/* FIXED: Uses images[0] and matches your new 16/10 ratio logic */}
                    <div className="w-20 h-14 flex-shrink-0 bg-white dark:bg-zinc-800 rounded-xs overflow-hidden border border-gold/10 shadow-sm relative">
                      <img
                        src={item.product.images?.[0] || "/placeholder.png"}
                        alt={item.product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-0">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-[10px] font-bold uppercase leading-tight tracking-wider text-noir dark:text-ivory pr-4 truncate">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => handleRemove(item)}
                            className="text-noir/30 dark:text-ivory/20 hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        {/* FIXED: Uses product.category directly */}
                        <p className="text-[8px] text-gold mt-1 uppercase tracking-widest font-black italic">
                          {item.product.category} —{" "}
                          <span className="text-noir/40 dark:text-ivory/40">
                            {item.selectedOptions?.inch || "Standard"}"
                          </span>
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-gold/20 dark:border-white/10 rounded-full px-2 py-0.5 gap-3 bg-white/80 dark:bg-zinc-800 shadow-inner">
                          <button
                            onClick={() =>
                              handleQtyChange(
                                item.product.id,
                                item.quantity,
                                -1,
                              )
                            }
                            className="text-gold hover:text-noir dark:hover:text-ivory transition-colors"
                          >
                            <Minus size={8} />
                          </button>
                          <span className="text-[10px] font-black w-3 text-center text-noir dark:text-ivory">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQtyChange(item.product.id, item.quantity, 1)
                            }
                            className="text-gold hover:text-noir dark:hover:text-ivory transition-colors"
                          >
                            <Plus size={8} />
                          </button>
                        </div>
                        <p className="text-[12px] font-black text-noir dark:text-ivory tracking-tighter">
                          ₦
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center pb-20">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center">
                      <ShoppingBag
                        size={48}
                        className="text-gold"
                        strokeWidth={1}
                      />
                    </div>
                  </div>
                  <h3 className="font-serif italic text-2xl text-noir dark:text-ivory font-bold">
                    Your bag is empty
                  </h3>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-10 px-10 py-4 bg-noir dark:bg-gold text-white dark:text-noir text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gold transition-all shadow-xl"
                  >
                    Start Shopping →
                  </button>
                </div>
              )}
            </div>

            {/* FOOTER - No major logic changes needed here, just ensuring clean flow */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-white dark:bg-zinc-900 border-t border-gold/10 shadow-[0_-15px_50px_rgba(0,0,0,0.05)] space-y-6">
                <div className="flex justify-between items-center pt-2 border-t border-gold/5 dark:border-white/5">
                  <span className="text-[12px] font-black uppercase tracking-[0.3em] text-noir/30 dark:text-ivory/30">
                    Subtotal
                  </span>
                  <span className="text-3xl font-black text-noir dark:text-ivory tracking-tighter">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="w-full bg-gold text-noir text-center py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-noir hover:text-gold transition-all active:scale-[0.98] shadow-lg"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

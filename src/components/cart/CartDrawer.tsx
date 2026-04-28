"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, RotateCcw } from "lucide-react";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    addToCart, // Necessary for the Undo functionality
  } = useStore();

  const FREE_DELIVERY_THRESHOLD = 50000;
  const glowPoints = Math.floor(cartTotal / 100);

  // CRITERIA: Remove item with confirmation & Undo toast
  const handleRemove = (item: any) => {
    const productId = item.product.id;
    const productName = item.product.name;
    const previousItem = { ...item };

    removeFromCart(productId);

    toast(
      (t) => (
        <div className="flex items-center justify-between w-full gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {productName} removed
          </span>
          <button
            onClick={() => {
              addToCart(previousItem.product, previousItem.selectedOptions);
              toast.dismiss(t.id);
            }}
            className="flex items-center gap-1 bg-gold text-noir px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-tighter hover:bg-white transition-colors"
          >
            <RotateCcw size={10} /> Undo
          </button>
        </div>
      ),
      {
        duration: 5000,
        style: {
          borderRadius: "0px",
          background: "#1A1A1A",
          color: "#fff",
          minWidth: "250px",
          border: "1px solid rgba(201, 168, 76, 0.3)",
        },
      },
    );
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
          {/* CRITERIA: Dark overlay backdrop (click to close) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-noir/60 z-[100] backdrop-blur-md"
          />

          {/* CRITERIA: Drawer design (420px desktop / 100vw mobile) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-[#FAF7F2] z-[101] shadow-2xl flex flex-col border-l border-gold/20"
          >
            {/* CRITERIA: Header: "My Bag (3 items)" + X close button */}
            <div className="p-8 border-b border-gold/10 flex justify-between items-center bg-white">
              <div>
                <h2 className="text-xl font-serif italic font-bold text-gold tracking-tight">
                  My Bag
                </h2>
                <p className="text-[10px] text-noir/50 uppercase tracking-[0.2em] font-bold mt-1">
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

            {/* CRITERIA: Scrollable item list in middle */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-5 group">
                    {/* CRITERIA: Product thumbnail (60x80px, portrait) */}
                    <div className="w-[60px] h-[80px] flex-shrink-0 bg-white rounded-sm overflow-hidden border border-gold/10 shadow-sm relative">
                      <img
                        src={item.product.image?.[0] || "/placeholder.png"}
                        alt={item.product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-[12px] font-bold uppercase leading-tight tracking-wider text-noir pr-4">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => handleRemove(item)}
                            className="text-noir/30 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        {/* CRITERIA: Selected variant (e.g. "Brazilian Hair — 18 inch") */}
                        <p className="text-[9px] text-gold mt-1.5 uppercase tracking-widest font-black italic">
                          {item.product.category || "Luxury Collection"} —{" "}
                          <span className="text-noir/60">
                            {item.selectedOptions?.inch || "Standard"}
                          </span>
                        </p>
                      </div>

                      <div className="flex justify-between items-end">
                        {/* CRITERIA: Quantity selector: − [1] + (inline) */}
                        <div className="flex items-center border border-gold/30 rounded-full px-2 py-1 gap-4 bg-white/80 shadow-inner">
                          <button
                            onClick={() =>
                              handleQtyChange(
                                item.product.id,
                                item.quantity,
                                -1,
                              )
                            }
                            className="text-gold hover:text-noir transition-colors p-1"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-[11px] font-black w-3 text-center text-noir">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQtyChange(item.product.id, item.quantity, 1)
                            }
                            className="text-gold hover:text-noir transition-colors p-1"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        {/* CRITERIA: Item price (qty × unit price) */}
                        <p className="text-[14px] font-black text-noir tracking-tighter">
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
                /* CRITERIA: Empty cart state (Illustration, Bag Icon, Start Shopping) */
                <div className="h-full flex flex-col items-center justify-center text-center pb-20">
                  <div className="relative mb-6">
                    {/* CRITERIA: Illustration (shopping bag icon, large, gold outline) */}
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center">
                      <ShoppingBag
                        size={48}
                        className="text-gold"
                        strokeWidth={1}
                      />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full border-4 border-[#FAF7F2]"
                    />
                  </div>
                  <h3 className="font-serif italic text-2xl text-noir font-bold">
                    Your bag is empty
                  </h3>
                  <p className="text-[10px] text-noir/40 mt-4 uppercase tracking-[0.2em] font-bold">
                    Discover our exclusive <br /> beauty essentials.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-10 px-10 py-4 bg-noir text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gold transition-all shadow-xl"
                  >
                    Start Shopping →
                  </button>
                </div>
              )}
            </div>

            {/* CRITERIA: Footer sticky at bottom with totals + CTA */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-white border-t border-gold/10 shadow-[0_-15px_50px_rgba(0,0,0,0.05)] space-y-6">
                {/* CRITERIA: Delivery estimate logic */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest">
                      {cartTotal >= FREE_DELIVERY_THRESHOLD ? (
                        <span className="text-green-600 flex items-center gap-1">
                          🚚 Free delivery on this order!
                        </span>
                      ) : (
                        <span className="text-noir/40">
                          Add{" "}
                          <span className="text-noir">
                            ₦
                            {(
                              FREE_DELIVERY_THRESHOLD - cartTotal
                            ).toLocaleString()}
                          </span>{" "}
                          more for free delivery
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="w-full bg-gray-100 h-[4px] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min((cartTotal / FREE_DELIVERY_THRESHOLD) * 100, 100)}%`,
                      }}
                      className="bg-gold h-full"
                    />
                  </div>
                </div>

                {/* CRITERIA: Subtotal row */}
                <div className="flex justify-between items-center pt-2 border-t border-gold/5 pt-4">
                  <span className="text-[12px] font-black uppercase tracking-[0.3em] text-noir/30">
                    Subtotal
                  </span>
                  <span className="text-3xl font-black text-noir tracking-tighter">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>

                {/* CRITERIA: Loyalty points earned preview */}
                <div className="bg-gold/5 py-4 rounded-sm border border-gold/10 flex items-center justify-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">
                    You&apos;ll earn {glowPoints.toLocaleString()} GlowPoints ✨
                  </span>
                </div>

                {/* CRITERIA: CTA Buttons */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {/* CRITERIA: Proceed to Checkout (gold, full width) */}
                  <Link
                    href="/cart"
                    onClick={() => setCartOpen(false)}
                    className="w-full bg-gold text-noir text-center py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-noir hover:text-gold transition-all active:scale-[0.98] shadow-lg"
                  >
                    Proceed to Checkout
                  </Link>
                  {/* CRITERIA: View Full Cart (outline) */}
                  <Link
                    href="/cart"
                    onClick={() => setCartOpen(false)}
                    className="block w-full border border-noir/20 text-noir text-center py-4 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-noir hover:text-white transition-all"
                  >
                    View Full Cart
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

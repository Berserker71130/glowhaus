"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  X,
  ArrowLeft,
  Heart,
  ShieldCheck,
  RotateCcw,
  Truck,
  Tag,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import { showGlowToast } from "@/lib/toast";
import EmptyState from "@/components/ui/EmptyState";

export default function FullCartPage() {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    addToCart,
    addToWishlist,
  } = useStore();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [appliedCode, setAppliedCode] = useState("");
  const [usePoints, setUsePoints] = useState(false);

  const pointsDiscount = usePoints ? 500 : 0;
  const finalTotal = Math.max(
    0,
    cartTotal - cartTotal * discount - pointsDiscount,
  );

  const validCodes: Record<string, number> = {
    GLOW10: 0.1,
    BEAUTY20: 0.2,
    NAILS15: 0.15,
  };

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (validCodes[code]) {
      setDiscount(validCodes[code]);
      setAppliedCode(code);
      showGlowToast({
        message: `Promo ${code} applied — ${validCodes[code] * 100}% off! 🎉`,
        accentColor: "#4ADE80",
        icon: "🏷️",
      });
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      showGlowToast({
        message: "That code isn't valid. Try again.",
        accentColor: "#EF4444",
        icon: "🚫",
      });
    }
  };

  const handleRemove = (item: any) => {
    const { product, quantity, selectedOptions } = item;
    removeFromCart(product.id);

    showGlowToast({
      message: `${product.name} removed`,
      icon: "🗑️",
      accentColor: "#1A1A1A",
      action: {
        label: "Undo",
        fn: () => (addToCart as any)(product, selectedOptions, quantity),
      },
    });
  };

  const handleSaveForLater = (item: any) => {
    addToWishlist(item.product);
    removeFromCart(item.product.id);
    showGlowToast({
      message: "Saved to wishlist ❤️",
      accentColor: "#E29595",
      icon: "✨",
    });
  };

  useEffect(() => {
    if (usePoints) {
      showGlowToast({
        message: "₦500 off applied from GlowPoints 💎",
        accentColor: "#6B4FBB",
        icon: "✨",
      });
    }
  }, [usePoints]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] dark:bg-noir transition-colors duration-500">
        <EmptyState
          icon="bag"
          title="Your bag is empty"
          subtitle="Looks like you haven't added any luxury pieces to your bag yet. Your next look is just a click away."
          ctaText="Start Shopping"
          ctaLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-noir pt-32 pb-20 px-6 sm:px-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif italic text-4xl text-noir dark:text-ivory mb-12">
          Shopping Bag
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-8 space-y-10">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                /* SLIM FIX: Reduced padding from pb-10 to pb-6 on mobile */
                className="flex gap-4 sm:gap-6 border-b border-gold/10 pb-6 sm:pb-10 group"
              >
                {/* IMAGE: Reduced from 120x160 to 80x100 on mobile for that "slim" look */}
                <div className="w-[80px] h-[100px] sm:w-[120px] sm:h-[160px] flex-shrink-0 bg-white dark:bg-zinc-900 border border-gold/5 rounded-sm overflow-hidden">
                  <img
                    src={item.product.images?.[0] || "/placeholder.png"}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                    alt={item.product.name}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1 sm:py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      {/* TEXT: Reduced sizes on mobile to prevent bulky rows */}
                      <h3 className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-noir dark:text-ivory line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-[9px] text-gold font-black mt-0.5 uppercase italic">
                        {item.selectedOptions?.inch || "18"} Inch — Premium
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-noir/20 hover:text-red-500 transition-colors p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-2 sm:mt-0">
                    <div className="flex items-center gap-4 sm:gap-6">
                      {/* QUANTITY: Slimmed down padding for mobile */}
                      <div className="flex items-center border border-noir/10 dark:border-white/10 rounded-full px-3 py-1 sm:px-4 sm:py-2 gap-4 sm:gap-6 bg-white dark:bg-white/5 shadow-sm">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="text-gold hover:scale-110"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-[10px] sm:text-xs font-black text-noir dark:text-ivory">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="text-gold hover:scale-110"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Hide 'Save for later' text on tiny screens to save space, keep icon */}
                      <button
                        onClick={() => handleSaveForLater(item)}
                        className="flex items-center gap-2 text-[9px] font-bold uppercase text-noir/40 dark:text-ivory/40 hover:text-gold"
                      >
                        <Heart size={14} />{" "}
                        <span className="hidden xs:inline">Save</span>
                      </button>
                    </div>

                    {/* PRICE: Smaller font on mobile */}
                    <p className="text-sm sm:text-lg font-black text-noir dark:text-ivory tracking-tighter">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-noir dark:text-ivory hover:text-gold transition-colors pt-4"
            >
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 space-y-8 bg-white dark:bg-white/[0.03] p-8 border border-gold/10 dark:border-white/10 rounded-sm shadow-sm transition-all">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-noir dark:text-ivory border-b border-gold/5 pb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-noir/40 dark:text-ivory/40">
                  <span>Subtotal</span>
                  <span className="text-noir dark:text-ivory font-black text-sm">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-noir/40 dark:text-ivory/40">
                  <span>Delivery</span>
                  <span className="text-green-600 dark:text-green-400 font-black">
                    {cartTotal >= 50000 ? "FREE" : "Calculated at next step"}
                  </span>
                </div>

                <div className="pt-4">
                  <label className="text-[9px] font-black uppercase tracking-widest text-noir/40 dark:text-ivory/40 mb-2 block">
                    Promo Code
                  </label>
                  <motion.div
                    animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="ENTER CODE"
                      className="flex-1 bg-[#FAF7F2] dark:bg-white/5 border border-gold/10 dark:border-white/10 px-4 py-3 text-[11px] font-bold text-noir dark:text-ivory focus:outline-none focus:border-gold transition-all"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="bg-noir dark:bg-ivory text-white dark:text-noir px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gold dark:hover:bg-gold transition-colors"
                    >
                      Apply
                    </button>
                  </motion.div>
                  {appliedCode && (
                    <p className="text-[9px] text-green-600 dark:text-green-400 mt-2 font-bold uppercase italic tracking-widest">
                      Code Applied: {appliedCode}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 pb-2 border-y border-gold/5">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-noir dark:text-ivory">
                      Redeem 500 GlowPoints
                    </span>
                  </div>
                  <button
                    onClick={() => setUsePoints(!usePoints)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${usePoints ? "bg-gold" : "bg-gray-200 dark:bg-white/10"}`}
                  >
                    <motion.div
                      animate={{ x: usePoints ? 22 : 2 }}
                      className="w-4 h-4 bg-white dark:bg-ivory rounded-full absolute top-0.5 shadow-sm"
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center pt-6">
                  <span className="text-sm font-black uppercase tracking-widest text-noir dark:text-ivory">
                    Total
                  </span>
                  <span className="text-3xl font-black text-gold tracking-tighter">
                    ₦{finalTotal.toLocaleString()}
                  </span>
                </div>

                <Link href="/checkout" className="block w-full mt-8">
                  <button className="w-full bg-gold text-noir py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-noir dark:hover:bg-white hover:text-gold dark:hover:text-noir transition-all shadow-xl group flex items-center justify-center gap-2">
                    <span>Secure Checkout </span>
                    <span className="inline-block transition-transform group-hover:translate-x-2">
                      →
                    </span>
                  </button>
                </Link>

                <div className="flex justify-center gap-4 pt-6 border-t border-gold/5 text-noir dark:text-ivory">
                  {[
                    { icon: ShieldCheck, label: "Secure" },
                    { icon: RotateCcw, label: "Returns" },
                    { icon: Truck, label: "Fast" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1 opacity-40"
                    >
                      <item.icon size={18} />
                      <span className="text-[8px] font-bold uppercase tracking-tighter">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

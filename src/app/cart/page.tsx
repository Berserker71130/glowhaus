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
import { toast } from "react-hot-toast";

export default function FullCartPage() {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    addToWishlist,
  } = useStore();

  // State for Promo Codes
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [appliedCode, setAppliedCode] = useState("");

  // State for Loyalty Points
  const [usePoints, setUsePoints] = useState(false);
  const pointsDiscount = usePoints ? 500 : 0;

  // Final Calculations
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
      toast.success(`Promo Code ${code} Applied!`);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      toast.error("Invalid promo code");
    }
  };

  const handleSaveForLater = (item: any) => {
    addToWishlist(item.product);
    removeFromCart(item.product.id);
    toast.success("Moved to Wishlist ✨");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] p-6">
        <h2 className="font-serif italic text-3xl text-noir">
          Your bag is empty
        </h2>
        <Link
          href="/"
          className="mt-6 flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={14} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-32 pb-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif italic text-4xl text-noir mb-12">
          Shopping Bag
        </h1>

        {/* Layout: 2-column desktop, stacked mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-8 space-y-10">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-6 border-b border-gold/10 pb-10 group"
              >
                <div className="w-[120px] h-[160px] flex-shrink-0 bg-white border border-gold/5 rounded-sm overflow-hidden">
                  <img
                    src={item.product.image?.[0] || "/placeholder.png"}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                    alt={item.product.name}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-noir">
                        {item.product.name}
                      </h3>
                      <p className="text-[10px] text-gold font-black mt-1 uppercase italic">
                        {item.selectedOptions?.inch || "18"} Inch — Premium
                        Quality
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-noir/20 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-6">
                      {/* Qty update with no flash */}
                      <div className="flex items-center border border-noir/10 rounded-full px-4 py-2 gap-6 bg-white shadow-sm">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="text-gold"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="text-gold"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleSaveForLater(item)}
                        className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-tighter text-noir/40 hover:text-gold transition-colors"
                      >
                        <Heart size={14} /> Save for later
                      </button>
                    </div>

                    <p className="text-lg font-black text-noir tracking-tighter">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-noir hover:text-gold transition-colors pt-4"
            >
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* RIGHT: ORDER SUMMARY (Sticky) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 space-y-8 bg-white p-8 border border-gold/10 rounded-sm shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-noir border-b border-gold/5 pb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-noir/40">
                  <span>Subtotal</span>
                  <span className="text-noir font-black text-sm">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-noir/40">
                  <span>Delivery</span>
                  <span className="text-green-600 font-black">
                    {cartTotal >= 50000 ? "FREE" : "Calculated at next step"}
                  </span>
                </div>

                {/* Promo Code Input */}
                <div className="pt-4">
                  <label className="text-[9px] font-black uppercase tracking-widest text-noir/40 mb-2 block">
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
                      className="flex-1 bg-[#FAF7F2] border border-gold/10 px-4 py-3 text-[11px] font-bold focus:outline-none focus:border-gold"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="bg-noir text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-colors"
                    >
                      Apply
                    </button>
                  </motion.div>
                  {appliedCode && (
                    <p className="text-[9px] text-green-600 mt-2 font-bold uppercase italic tracking-widest">
                      Code Applied: {appliedCode}
                    </p>
                  )}
                </div>

                {/* Loyalty Points Redemption Toggle */}
                <div className="flex items-center justify-between pt-4 pb-2 border-y border-gold/5">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-noir">
                      Redeem 500 GlowPoints
                    </span>
                  </div>
                  {/* Radix UI Style Switch */}
                  <button
                    onClick={() => setUsePoints(!usePoints)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${usePoints ? "bg-gold" : "bg-gray-200"}`}
                  >
                    <motion.div
                      animate={{ x: usePoints ? 22 : 2 }}
                      className="w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm"
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center pt-6">
                  <span className="text-sm font-black uppercase tracking-widest">
                    Total
                  </span>
                  <span className="text-3xl font-black text-gold tracking-tighter">
                    ₦{finalTotal.toLocaleString()}
                  </span>
                </div>

                <button className="w-full bg-gold text-noir py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-noir hover:text-gold transition-all shadow-xl group">
                  Secure Checkout{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </button>

                {/* Trust Badges */}
                <div className="flex justify-center gap-4 pt-6 border-t border-gold/5">
                  <div className="flex flex-col items-center gap-1 opacity-40">
                    <ShieldCheck size={18} />
                    <span className="text-[8px] font-bold uppercase tracking-tighter">
                      Secure
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 opacity-40">
                    <RotateCcw size={18} />
                    <span className="text-[8px] font-bold uppercase tracking-tighter">
                      Returns
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 opacity-40">
                    <Truck size={18} />
                    <span className="text-[8px] font-bold uppercase tracking-tighter">
                      Fast
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

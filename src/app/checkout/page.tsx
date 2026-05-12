"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Loader2,
  CreditCard,
  ChevronLeft,
  MapPin,
  ShieldCheck,
  Truck,
  ReceiptText,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, cartTotal, addresses, displayName, clearCart, addOrder } =
    useStore();
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success"
  >("idle");

  // Get default address or first available
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];
  const glowPointsEarned = Math.floor(cartTotal / 100);

  // DUMMY LOGIC FOR ROUTES (Based on your store data)
  const isLagos = defaultAddress?.city?.toLowerCase() === "lagos";
  const deliveryRoute = isLagos
    ? "Glowhaus Express (Lagos)"
    : "Standard National (Abuja/Regional)";
  const deliveryTime = isLagos ? "1-2 Business Days" : "3-5 Business Days";

  const handleGlowPay = () => {
    setPaymentStatus("processing");

    // Simulation Timer
    setTimeout(() => {
      // 1. Create the order object for your store history
      const newOrder = {
        id: `GH_ORDER_${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        total: cartTotal,
        status: "processing" as const,
        address: `${defaultAddress.street}, ${defaultAddress.city}`,
        paymentMethod: "GlowPay Digital",
        items: cartItems,
      };

      // 2. Update Store
      addOrder(newOrder);
      setPaymentStatus("success");

      // 3. Clear cart after successful "payment"
      setTimeout(() => clearCart(), 1000);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-noir text-noir dark:text-ivory transition-colors duration-300 font-sans">
      {/* HEADER */}
      <nav className="p-6 border-b border-gold/10 bg-white flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center text-gold hover:text-noir transition-colors text-xs font-black uppercase tracking-[0.2em]"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to Shop
        </Link>
        <h1 className="font-serif italic text-2xl font-bold text-gold">
          Glowhaus
        </h1>
        <div className="w-20"></div> {/* Spacer */}
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT & CENTER: SHIPPING & PAYMENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Section */}
          <section className="bg-white p-8 rounded-sm shadow-sm border border-gold/5">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-6 flex items-center gap-2">
              <MapPin size={14} /> Shipping Destination
            </h2>
            <div className="flex justify-between items-start border-l-2 border-gold pl-6 py-2">
              <div>
                <p className="font-bold text-noir uppercase text-xs tracking-widest">
                  {displayName}
                </p>
                <p className="text-noir/60 text-sm mt-1">
                  {defaultAddress?.street}
                </p>
                <p className="text-noir/60 text-sm">
                  {defaultAddress?.city}, {defaultAddress?.state}
                </p>
                <p className="text-noir/60 text-sm">{defaultAddress?.phone}</p>
              </div>
              <button className="text-[9px] font-black uppercase tracking-widest text-gold hover:underline">
                Change
              </button>
            </div>

            {/* --- DELIVERY & BILLING INCLUSIONS --- */}
            <div className="mt-8 pt-8 border-t border-gold/5 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="text-gold mt-1">
                  <Truck size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-noir/40">
                    Delivery Route
                  </p>
                  <p className="text-xs font-bold text-noir">{deliveryRoute}</p>
                  <p className="text-[10px] text-gold italic">{deliveryTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-gold mt-1">
                  <ReceiptText size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-noir/40">
                    Billing Details
                  </p>
                  <p className="text-xs font-bold text-noir uppercase tracking-tighter">
                    Same as shipping destination
                  </p>
                  <p className="text-[10px] text-gold italic font-medium">
                    Digital Invoice selected
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Section */}
          <section className="bg-white p-8 rounded-sm shadow-sm border border-gold/5">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-6 flex items-center gap-2">
              <CreditCard size={14} /> Secure Payment
            </h2>
            <div className="group p-6 border-2 border-gold rounded-xl bg-gold/5 flex items-center justify-between cursor-pointer transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-noir p-3 rounded-full text-gold shadow-lg">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="font-black text-xs uppercase tracking-widest text-noir">
                    GlowPay Digital
                  </p>
                  <p className="text-[10px] text-gold font-bold italic mt-0.5">
                    Instant checkout • Zero fees
                  </p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-gold flex items-center justify-center">
                <div className="w-3 h-3 bg-gold rounded-full" />
              </div>
            </div>

            <button
              onClick={handleGlowPay}
              disabled={cartItems.length === 0 || paymentStatus !== "idle"}
              className="w-full mt-10 bg-noir text-white py-6 rounded-sm text-[11px] font-black uppercase tracking-[0.5em] hover:bg-gold hover:text-noir transition-all active:scale-[0.98] shadow-2xl disabled:opacity-50"
            >
              {paymentStatus === "idle"
                ? `Pay ₦${cartTotal.toLocaleString()} with GlowPay`
                : "Processing..."}
            </button>
          </section>
        </div>

        {/* RIGHT: ORDER SUMMARY WITH PRODUCT IMAGES */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-8 rounded-sm shadow-sm border border-gold/5 sticky top-24">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-noir/40 mb-6 border-b border-gold/10 pb-4">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 text-xs group"
                >
                  {/* ASSET IMAGE THUMBNAIL */}
                  <div className="w-14 h-14 bg-[#FAF7F2] rounded-sm overflow-hidden flex-shrink-0 border border-gold/10 relative">
                    <img
                      src={item.product.images?.[0] || "/placeholder.png"}
                      alt={item.product.name}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-0 right-0 bg-gold text-white text-[8px] px-1.5 py-0.5 font-bold shadow-sm">
                      {item.quantity}
                    </div>
                  </div>

                  <div className="flex-1 flex justify-between items-center">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-noir font-bold uppercase tracking-tighter truncate max-w-[120px]">
                        {item.product.name}
                      </span>
                      <span className="text-noir/40 text-[9px] uppercase tracking-widest font-medium">
                        ₦{item.product.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="font-bold text-gold">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gold/10">
              <div className="flex justify-between text-xs text-noir/40 uppercase tracking-widest font-bold">
                <span>Subtotal</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-gold uppercase tracking-widest font-bold">
                <span>Shipping</span>
                <span className="animate-pulse">FREE</span>
              </div>
              <div className="flex justify-between pt-4 text-xl font-black text-noir tracking-tighter">
                <span>Total</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 bg-gold/5 p-4 rounded-sm border border-gold/10 text-center">
              <p className="text-[9px] font-black uppercase tracking-widest text-gold">
                ✨ Earns {glowPointsEarned.toLocaleString()} GlowPoints
              </p>
            </div>
          </div>
        </aside>
      </main>

      {/* GLOWPAY SIMULATION OVERLAY */}
      <AnimatePresence>
        {paymentStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-noir/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
          >
            {paymentStatus === "processing" ? (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                <div className="relative mb-8">
                  <Loader2 className="w-20 h-20 text-gold animate-spin stroke-[1px]" />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-gold animate-pulse">
                    GP
                  </div>
                </div>
                <h2 className="text-gold text-sm font-black uppercase tracking-[0.5em] animate-pulse">
                  Securing GlowPay Transaction
                </h2>
                <p className="text-white/30 text-[9px] mt-4 uppercase tracking-widest">
                  Validating with Glowhaus Secure Nodes...
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                  <CheckCircle
                    size={56}
                    className="text-noir"
                    strokeWidth={1}
                  />
                </div>
                <h2 className="text-3xl font-serif italic font-bold text-white mb-2">
                  Order Confirmed
                </h2>
                <p className="text-gold/60 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                  Your luxury essentials are being prepared
                </p>

                <div className="space-y-4">
                  <Link
                    href="/"
                    className="block px-12 py-4 bg-gold text-noir text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

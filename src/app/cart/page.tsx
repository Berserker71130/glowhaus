"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { ShoppingBag, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function DummyCheckoutPage() {
  const { cartItems, cartTotal } = useStore();

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/"
            className="p-2 hover:bg-gold/10 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gold" />
          </Link>
          <h1 className="font-serif italic text-3xl text-noir">
            Checkout Preview
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Order Summary Side */}
            <div className="space-y-6">
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gold border-b border-gold/20 pb-4">
                Your Order
              </h2>
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm font-medium text-noir">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="text-sm font-bold text-noir">
                    ₦{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-6 border-t border-noir/10 flex justify-between items-center">
                <span className="text-lg font-serif italic text-gold">
                  Total Amount
                </span>
                <span className="text-2xl font-black text-noir">
                  ₦{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Dummy Action Side */}
            <div className="bg-white p-8 border border-gold/10 shadow-sm rounded-sm flex flex-col items-center text-center justify-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tighter text-noir">
                Ready to Glow?
              </h3>
              <p className="text-[11px] text-noir/50 mt-4 leading-relaxed uppercase tracking-widest font-bold">
                This is a dummy checkout. <br />
                In the next task, we will connect <br />
                Paystack for real payments.
              </p>
              <button
                onClick={() => alert("Order logic coming in Task #21! ✨")}
                className="mt-8 w-full bg-noir text-white py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-gold transition-all"
              >
                Place Test Order
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag size={48} className="mx-auto text-gold/20 mb-6" />
            <p className="text-[11px] font-bold uppercase tracking-widest text-noir/40">
              Your cart is empty. Nothing to check out!
            </p>
            <Link
              href="/"
              className="mt-8 inline-block text-[11px] font-black uppercase underline tracking-[0.2em]"
            >
              Back to Boutique
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MapPin,
  CreditCard,
  ExternalLink,
  Package,
  Truck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Image from "next/image";

// Helper for dynamic badge colors
const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "processing":
      return "bg-[#FDF6E3] text-[#B8860B] border-[#B8860B]/20"; // Gold
    case "shipped":
      return "bg-blue-50 text-blue-600 border-blue-200"; // Blue
    case "delivered":
      return "bg-emerald-50 text-emerald-600 border-emerald-200"; // Green
    case "cancelled":
      return "bg-rose-50 text-rose-600 border-rose-200"; // Rose
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

export default function OrdersPage() {
  const { orders } = useStore();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-8 px-4 md:px-10 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl text-noir">Order History</h1>
        <p className="text-muted-foreground text-sm italic">
          Track your luxury purchases and deliveries.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-gold/30 rounded-3xl bg-linen/5">
          <p className="text-muted-foreground italic font-serif">
            Your wardrobe is awaiting its first addition.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gold/10 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Table Header Row */}
              <div
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
                className="p-6 md:p-8 flex items-center justify-between cursor-pointer group"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-1">
                      Order #
                    </span>
                    <span className="font-mono text-sm font-semibold uppercase">
                      {order.id}
                    </span>
                  </div>
                  <div className="hidden md:flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-1">
                      Date
                    </span>
                    <span className="text-sm text-noir">{order.date}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-1">
                      Total
                    </span>
                    <span className="text-sm font-bold text-gold">
                      ₦{order.total.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <Badge
                      className={`${getStatusStyles(order.status)} border-none px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
                <ChevronDown
                  className={`text-gold transition-transform duration-500 ${expandedOrder === order.id ? "rotate-180" : ""}`}
                />
              </div>

              {/* Expanded Section */}
              <AnimatePresence>
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <div className="px-8 pb-8 pt-4 border-t border-linen">
                      {/* 1. Animated Tracking Timeline */}
                      <div className="mb-12 pt-6">
                        <div className="flex justify-between mb-4 px-2">
                          {[
                            "Placed",
                            "Processing",
                            "Shipped",
                            "Out for Delivery",
                            "Delivered",
                          ].map((step, i) => (
                            <div
                              key={i}
                              className="flex flex-col items-center gap-2"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`w-3 h-3 rounded-full ${i <= 2 ? "bg-gold" : "bg-linen"} shadow-sm`}
                              />
                              <span className="text-[9px] uppercase tracking-tighter font-bold text-muted-foreground">
                                {step}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="relative h-1 bg-linen rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: order.status === "shipped" ? "60%" : "25%",
                            }}
                            className="absolute h-full bg-gold shadow-[0_0_8px_#D4AF37]"
                          />
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* 2. Items List */}
                        <div className="lg:col-span-2 space-y-4">
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">
                            Order Items
                          </p>
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-6 p-4 bg-linen/10 rounded-2xl border border-gold/5"
                            >
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                                <Image
                                  src={
                                    item.product.images[0] || "/placeholder.jpg"
                                  }
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-serif text-noir text-sm">
                                  {item.product.name}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="text-sm font-bold text-gold">
                                ₦{item.product.price.toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* 3. Shipping & Payment Info */}
                        <section className="bg-linen/30 p-6 rounded-3xl space-y-6 self-start border border-gold/5">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold shadow-sm">
                              <MapPin size={18} />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">
                                Shipping Address
                              </p>
                              <p className="text-sm text-noir leading-relaxed italic">
                                "{order.address}"
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4 border-t border-gold/5 pt-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold shadow-sm">
                              <CreditCard size={18} />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">
                                Payment Method
                              </p>
                              <p className="text-sm text-noir font-medium">
                                {order.paymentMethod}
                              </p>
                            </div>
                          </div>
                          <button className="w-full mt-4 flex items-center justify-center gap-2 py-4 bg-white border border-gold/20 text-gold rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all group shadow-sm">
                            Download Invoice
                            <ExternalLink
                              size={12}
                              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                            />
                          </button>
                        </section>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

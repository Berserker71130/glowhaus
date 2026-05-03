"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Package, Truck, Home, Clock } from "lucide-react";

interface TrackingTimelineProps {
  status: "processing" | "shipped" | "delivered" | "cancelled";
}

const steps = [
  { id: "processing", label: "Processing", icon: Clock },
  { id: "shipped", label: "Shipped", icon: Package },
  { id: "out", label: "Out for Delivery", icon: Truck },
  { id: "delivered", label: "Delivered", icon: Home },
];

export const TrackingTimeline = ({ status }: TrackingTimelineProps) => {
  // Map the status to an index for the progress bar
  const getActiveIndex = () => {
    switch (status) {
      case "processing":
        return 0;
      case "shipped":
        return 1;
      case "delivered":
        return 3;
      case "cancelled":
        return -1; // No progress for cancelled
      default:
        return 1;
    }
  };

  const activeIndex = getActiveIndex();

  if (status === "cancelled") {
    return (
      <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm font-medium">
        This order was cancelled. No tracking information available.
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-2">
      <div className="relative flex justify-between">
        {/* Background Line */}
        <div className="absolute top-5 left-0 w-full h-[2px] bg-linen" />

        {/* Animated Progress Gold Line */}
        <motion.div
          className="absolute top-5 left-0 h-[2px] bg-gold origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: activeIndex / (steps.length - 1) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ width: "100%" }}
        />

        {steps.map((step, index) => {
          const isActive = index <= activeIndex;
          const isCurrent = index === activeIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Dot/Icon Circle */}
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isActive ? "#D4AF37" : "#FFFFFF",
                  borderColor: isActive ? "#D4AF37" : "#E2E2E2",
                  scale: isCurrent ? 1.15 : 1,
                }}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-sm ${
                  isCurrent ? "shadow-gold/40" : ""
                }`}
              >
                {isActive ? (
                  <Check className="text-white w-5 h-5" strokeWidth={3} />
                ) : (
                  <Icon className="text-muted-foreground w-5 h-5" />
                )}
              </motion.div>

              {/* Label */}
              <span
                className={`mt-3 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-center max-w-[60px] md:max-w-none ${
                  isActive ? "text-noir" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

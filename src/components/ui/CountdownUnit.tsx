"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CountDownUnit {
  value: number;
  label: string;
}

export default function CountDownUnit({ value, label }: CountDownUnit) {
  return (
    <div className="flex flex-col items-center">
      {/* Container For The Number */}
      <div className="relative w-16 h-20 md:w-20 md:h-24 bg-[#111111] border border-gold/20 rounded-lg flex items-center justify-center overflow-hiidden shadow-2xl">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="text-3xl md:text-5xl font-display text-gold"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>

        {/* Luxury Flip Line */}
        <div className="absolute w-full h-[1px] bg-gold/10 top-1/2 left-0" />
      </div>
      <span className="text-[10px] tracking-[0.2em] font-bold text-gold/40 mt-4 uppercase">
        {label}
      </span>
    </div>
  );
}

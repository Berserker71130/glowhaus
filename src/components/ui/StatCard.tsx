"use client";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      /* SURGERY: Added dark:bg-white/[0.03] and dark border for depth */
      className="bg-white dark:bg-white/[0.03] p-6 rounded-2xl border border-noir/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all duration-500"
    >
      <div className="flex items-center justify-between mb-4">
        {/* Label: noir/40 -> ivory/40 */}
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-noir/40 dark:text-ivory/40 transition-colors">
          {label}
        </span>
        {/* Icon: Always gold, but slightly glowier bg in dark mode */}
        <div className="text-gold bg-gold/5 dark:bg-gold/10 p-2.5 rounded-xl transition-colors">
          {icon}
        </div>
      </div>
      {/* Value: noir -> ivory */}
      <p className="text-3xl font-serif text-noir dark:text-ivory tracking-tight transition-colors">
        {value}
      </p>
    </motion.div>
  );
}

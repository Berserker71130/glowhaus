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
      className="bg-white p-6 rounded-2xl border border-noir/5 shadow-sm hover:shadow-xl hover:shadow-gold/5 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-noir/40">
          {label}
        </span>
        <div className="text-gold bg-gold/5 p-2.5 rounded-xl">{icon}</div>
      </div>
      <p className="text-3xl font-serif text-noir tracking-tight">{value}</p>
    </motion.div>
  );
}

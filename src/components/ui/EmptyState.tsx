"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: "bag" | "heart" | "search" | "filters" | "calendar";
  title: string;
  subtitle?: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
  onClear?: () => void;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
  ctaText,
  ctaLink,
  onClear,
}: EmptyStateProps) {
  // Directly setting the color to Gold (#D4AF37)
  const icons = {
    bag: <ShoppingBag size={80} strokeWidth={1} color="#D4AF37" />,
    heart: <Heart size={80} strokeWidth={1} color="#D4AF37" />,
    search: <Search size={80} strokeWidth={1} color="#D4AF37" />,
    filters: <SlidersHorizontal size={80} strokeWidth={1} color="#D4AF37" />,
    calendar: <Calendar size={80} strokeWidth={1} color="#D4AF37" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="text-6xl mb-6 grayscale-0 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
        {icons[icon]}
      </div>

      <h3 className="text-2xl font-medium text-noir mb-3">{title}</h3>

      {subtitle && <div className="text-taupe text-sm mb-8">{subtitle}</div>}

      {/* Pointing specifically to Home as requested */}
      {ctaLink && (
        <Link
          href="/"
          className="bg-noir text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all"
        >
          {ctaText}
        </Link>
      )}

      {onClear && (
        <button
          onClick={onClear}
          className="bg-noir text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all"
        >
          {ctaText}
        </button>
      )}
    </motion.div>
  );
}

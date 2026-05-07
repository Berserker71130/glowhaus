"use client";

import Link from "next/link";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] text-center px-6 animate-in fade-in duration-1000">
      {/* BRAND HEADER */}
      <span className="text-[#1A1A1A] text-2xl tracking-[0.4em] font-light uppercase mb-6">
        GlowHaus
      </span>
      <div className="w-16 h-[1px] bg-[#D4AF37] mb-12" />

      {/* GOLDEN ICON */}
      <div className="mb-8 flex justify-center">
        <div className="w-20 h-20 rounded-full border border-[#D4AF37]/20 flex items-center justify-center bg-white shadow-sm">
          <AlertCircle size={40} strokeWidth={1.2} className="text-[#D4AF37]" />
        </div>
      </div>

      <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-4">
        Error 500
      </h2>

      <p className="text-[#1A1A1A] text-xl font-medium mb-10 max-w-md uppercase tracking-tight font-serif">
        Something went wrong on our end. We&apos;re fixing it!
      </p>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-2 bg-[#D4AF37] text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-[#D4AF37]/10"
        >
          <RefreshCcw size={14} />
          Try Again
        </button>
        <Link
          href="/"
          className="bg-[#1A1A1A] text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

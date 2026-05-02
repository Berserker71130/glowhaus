"use client";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryItem } from "@/lib/dummy-data";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, Share, X } from "lucide-react";

interface LightboxProps {
  items: GalleryItem[];
  currentIdx: number;
  onClose: () => void;
  setIndex: (idx: number) => void;
}

export default function Lightbox({
  items,
  currentIdx,
  onClose,
  setIndex,
}: LightboxProps) {
  const item = items[currentIdx];

  // 1. SCROLL LOCK: Prevents the background from moving when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // 2. KEYBOARD NAV: Close on Escape, Nav with Arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((currentIdx + 1) % items.length);
      if (e.key === "ArrowLeft")
        setIndex((currentIdx - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, currentIdx, items.length, setIndex]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-noir/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10 touch-none"
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-[110]"
      >
        <X size={32} />
      </button>

      {/* NAVIGATION ARROWS (Hidden on small mobile for cleaner swipe experience) */}
      <button
        onClick={() => setIndex((currentIdx - 1 + items.length) % items.length)}
        className="hidden md:block absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-[110]"
      >
        <ChevronLeft size={48} />
      </button>
      <button
        onClick={() => setIndex((currentIdx + 1) % items.length)}
        className="hidden md:block absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-[110]"
      >
        <ChevronRight size={48} />
      </button>

      {/* IMAGE CONTAINER */}
      <div className="relative w-full max-w-4xl h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={item.id}
            src={item.imageUrl}
            // --- MOBILE SWIPE LOGIC ---
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const threshold = 50;
              if (info.offset.x > threshold) {
                setIndex((currentIdx - 1 + items.length) % items.length);
              } else if (info.offset.x < -threshold) {
                setIndex((currentIdx + 1) % items.length);
              }
            }}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="max-w-full max-h-full object-contain shadow-2xl cursor-grab active:cursor-grabbing"
          />
        </AnimatePresence>
      </div>

      {/* FOOTER / CAPTION */}
      <div className="mt-8 text-center text-white space-y-2 px-4">
        <p className="text-gold text-[10px] font-black uppercase tracking-[0.3em]">
          Service: {item.title}
        </p>
        <h2 className="font-serif italic text-2xl">by GlowHaus</h2>

        <div className="flex justify-center gap-8 mt-6">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/60 hover:text-gold transition-colors"
          >
            <Share size={16} /> Share
          </button>
          <a
            href={item.imageUrl}
            download
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/60 hover:text-gold transition-colors"
          >
            <Download size={16} /> Download
          </a>
        </div>
      </div>
    </motion.div>
  );
}

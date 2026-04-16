"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: "★ NEW SEASON ARRIVALS",
    title: "Luxury Hair,\nNails & Beauty\nCurated for You.",
    subtext:
      "Premium beauty products and accessories, delivered with elegance.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1487&auto=format&fit=crop",
    primaryCTA: "Shop Collection",
    secondaryCTA: "Book a Service",
  },
  {
    id: 2,
    eyebrow: "★ EXCLUSIVE COLLECTION",
    title: "Radiance Defined\nBy Modern\nArtistry.",
    subtext:
      "Experience the pinnacle of skincare science and luxury aesthetics.",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1480&auto=format&fit=crop",
    primaryCTA: "Explore Glow",
    secondaryCTA: "Our Story",
  },
  {
    id: 3,
    eyebrow: "★ LIMITED EDITION",
    title: "Timeless Beauty\nDesigned for\nThe Elite.",
    subtext:
      "Hand picked accessories and tools for professional-grade results at home.",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1335&auto=format&fit=crop",
    primaryCTA: "View Limited",
    secondaryCTA: "Consult Now",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[85vh] lg:h-screen bg-ivory overflow-hidden">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative grid grid-cols-1 lg:grid-cols-[55%_45%] h-full w-full"
        >
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center px-8 lg:px-20 space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold font-sans tracking-[0.2em] text-sm font-semibold uppercase"
            >
              {HERO_SLIDES[current].eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-display text-noir leading-[1.1] whitespace-pre-line"
            >
              {HERO_SLIDES[current].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-taupe text-lg lg:text-xl max-w-md font-sans"
            >
              {HERO_SLIDES[current].subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="primary" size="lg">
                {HERO_SLIDES[current].primaryCTA}
              </Button>
              <Button variant="outline" size="lg">
                {HERO_SLIDES[current].secondaryCTA}
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 pt-8 border-t border-gold/20"
            >
              {["Authentic Products", "Free Returns", "Next Day Delivery"].map(
                (text) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-xs font-semibold text-noir/70 uppercase tracking-wider"
                  >
                    <Check className="w-4 h-4 text-gold" />
                    {text}
                  </div>
                ),
              )}
            </motion.div>
          </div>
          {/* RIGHT IMAGE */}
          <div className="relative hidden lg:block h-full overflow-hidden">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6 }}
              src={HERO_SLIDES[current].image}
              alt="Luxury Beauty"
              className="w-full h-full object-cover"
            />

            {/* FLOATING CARDS */}
            <motion.div className="absolute bottom-12 left-10 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-xl animate-float">
              <p className="text-sm font-bold text-noir">★ 4.9 Rating</p>
              <p className="text-xs text-taupe">2,000+ happy clients</p>
            </motion.div>

            <motion.div className="absolute top-32 right-10 bg-noir/90 text-white p-4 rounded-xl shadow-xl animate-float [animation-delay:1s]">
              <p className="text-sm font-bold">Book Today</p>
              <p className="text-xs text-gold/80">Limited slots available</p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={cn(
              "h-2 transition-all duration-300 rounded-full",
              current === idx ? "w-8 bg-gold" : "w-2 bg-gold/30",
            )}
          />
        ))}
      </div>
    </section>
  );
}

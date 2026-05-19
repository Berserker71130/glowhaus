"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { NAV_DATA } from "./NavData";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, Heart, User, X } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen } = useStore();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Mock Authentication state for Criterion #4 (Set to false for now, change to true to test)
  // When backend is ready, this will come from your auth context/store: const { user } = useAuth();
  const isLoggedIn = false; 

  const categories = Object.keys(NAV_DATA).filter((k) => k !== "Simple");
  const simpleLinks = NAV_DATA.Simple;

  const toggleAccordion = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // HELPER TO GENERATE SLUGS THAT MATCH YOUR DATA
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace("hair care", "care")
      .replace("press-on nails", "press-ons")
      .replace("closure & frontals", "closures") // Matches 'Closures' in your data
      .replace("nail care", "care")
      .replace(/\s+/g, "-");
  };

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* 1. OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden"
          />

          {/* 2. SLIDE-IN PANEL */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 w-[85%] h-full bg-[#FAF7F2] dark:bg-noir z-[70] shadow-2xl flex flex-col md:hidden transition-colors duration-300"
          >
            {/* HEADER */}
            <div className="p-6 flex justify-between items-center border-b border-gold/10">
              <h2 className="font-serif text-2xl text-gold italic font-bold">
                GlowHaus
              </h2>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X className="w-6 h-6 text-black dark:text-ivory" />
              </button>
            </div>

            {/* NAVIGATION BODY */}
            <div className="flex-1 overflow-y-auto p-6">
              <nav className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat} className="border-b border-gold/5 py-2">
                    <button
                      onClick={() => toggleAccordion(cat)}
                      className="w-full flex justify-between items-center py-3 text-xs uppercase tracking-[0.2em] font-medium text-black dark:text-ivory"
                    >
                      {cat}
                      <motion.div
                        animate={{ rotate: expandedCategory === cat ? 180 : 0 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gold" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedCategory === cat && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-gold/5 dark:bg-white/5 rounded-sm"
                        >
                          {/* <div className="flex flex-col gap-4 p-4 ml-2">
                            {NAV_DATA[
                              cat as keyof Omit<typeof NAV_DATA, "Simple">
                            ].links.map((linkText: string) => (
                              <Link
                                key={linkText}
                                href={/category/`${generateSlug(linkText)}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[10px] uppercase tracking-widest text-black/60 dark:text-ivory/60 hover:text-gold"
                              >
                                {linkText}
                              </Link>
                            ))}
                            <Link
                              href={/category/`${cat.toLowerCase()}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-[10px] uppercase tracking-widest text-gold font-bold mt-2"
                            >
                              Shop All {cat}
                            </Link>
                          </div> */}
                          <div className="flex flex-col gap-4 p-4 ml-2">
                            {NAV_DATA[
                              cat as keyof Omit<typeof NAV_DATA, "Simple">
                            ].links.map((linkText: string) => (
                              <Link
                                key={linkText}
                                href={`/category/${generateSlug(linkText)}`} 
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[10px] uppercase tracking-widest text-black/60 dark:text-ivory/60 hover:text-gold"
                              >
                                {linkText}
                              </Link>
                            ))}
                            <Link
                              href={`/category/${cat.toLowerCase()}`} 
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-[10px] uppercase tracking-widest text-gold font-bold mt-2"
                            >
                              Shop All {cat}
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

               {simpleLinks.map((link) => {
  // Explicit routing checks for standalone links
  const isSale = link.toLowerCase() === "sale";
  const isBook = link.toLowerCase() === "book";

  // Force "Book" to /booking, "Sale" to /category/sale, or use the fallback slug
  const targetHref = isBook 
    ? "/booking" 
    : isSale 
      ? "/category/sale" 
      : `/${generateSlug(link)}`;

  return (
    <Link
      key={link}
      href={targetHref}
      onClick={() => setMobileMenuOpen(false)}
      className="block py-5 border-b border-gold/5 text-xs uppercase tracking-[0.2em] font-medium text-black dark:text-ivory hover:text-gold transition-colors"
    >
      {link}
    </Link>
  );
})}
              </nav>
            </div>

           {/* Bottom Section */}
            <div className="p-6 bg-white dark:bg-white/[0.02] border-t border-gold/20 space-y-6">
              
              {/* Dynamic Grid Layout Wrapper */}
              <div 
                className={
                  isLoggedIn 
                    ? "grid grid-cols-2 gap-4" 
                    : "grid grid-cols-1 gap-4"
                }
              >
                {/* Criterion #4: Conditionally render Account link based on auth token status */}
                {isLoggedIn && (
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-black dark:text-ivory hover:text-gold transition-colors"
                  >
                    <User className="w-4 h-4 text-gold" /> Account
                  </Link>
                )}

                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-black dark:text-ivory hover:text-gold transition-colors"
                >
                  <Heart className="w-4 h-4 text-gold" /> Wishlist
                </Link>
              </div>

              {/* SURGICAL FIX: Converted from basic button to a fully functional routing Next.js Link element */}
              <Link
                href="/appointments"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-gold text-white dark:text-noir py-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black dark:hover:bg-ivory transition-colors text-center"
              >
                <Calendar className="w-4 h-4" /> Book Appointment
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
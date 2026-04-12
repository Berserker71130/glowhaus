"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { NAV_DATA } from "./NavData";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, Heart, User, X } from "lucide-react";
import Link from "next/link";
import { link } from "fs";

export default function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen, cartCount } = useStore();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  //   Categories that have sub links (Accordions)
  const categories = Object.keys(NAV_DATA).filter((k) => k !== "Simple");
  const simpleLinks = NAV_DATA.Simple;

  const toggleAccordion = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] md:hidden"
          />

          {/* 2. SLIDE-IN PANEL */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 w-[85%] h-full bg-[#FAF7F2] z-[70] shadow-2xl flex flex-col md:hidden"
          >
            {/* HEADER */}
            <div className="p-6 flex justify-between items-center border-b border-gold/10">
              <h2 className="font-serif text-2xl text-gold italic font-bold">
                GlowHaus
              </h2>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* NAVIGATION BODY */}
            <div className="flex-1 overflow-y-auto p-6">
              <nav className="space-y-2">
                {/* Accordion categories */}
                {categories.map((cat) => (
                  <div key={cat} className="border-b border-gold/5 py-2">
                    <button
                      onClick={() => toggleAccordion(cat)}
                      className="w-full flex justify-between items-center py-3 text-xs uppercase tracking-[0.2em] font-medium text-black"
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
                          className="overflow-hidden bg-gold/5 rounded-sm"
                        >
                          <div className="flex flex-col gap-4 p-4 ml-2">
                            {NAV_DATA[
                              cat as keyof Omit<typeof NAV_DATA, "Simple">
                            ].links.map((link: string) => (
                              <Link
                                key={link}
                                href="#"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[10px] uppercase tracking-widest text-black/60 hover:text-gold"
                              >
                                {link}
                              </Link>
                            ))}
                            <Link
                              href="#"
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

                {/* Simple Links */}
                {simpleLinks.map((link) => (
                  <Link
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-5 border-b border-gold/5 text-xs uppercase tracking-[0.2em] font-medium text-black"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Section (Fixed) */}
            <div className="p-6 bg-white border-t border-gold/20 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/account"
                  className="flex items-center gap-3 text-[10px] uppercase tracking-widest"
                >
                  <User className="w-4 h-4 text-gold" /> Acount
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 text-[10px] uppercase tracking-widest"
                >
                  <Heart className="w-4 h-4 text-gold" /> Wishlist
                </Link>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  //Logic for booking will go here
                }}
                className="w-full bg-gold text-white py-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-colors"
              >
                <Calendar className="w-4 h-4" /> Book Appointment
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

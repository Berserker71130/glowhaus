"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Menu } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { NAV_DATA } from "./NavData";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "@/components/shared/SearchOverlay";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const { cartCount, wishlistItems, setMobileMenuOpen, setCartOpen, cartOpen } =
    useStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleCart = () => {
    setMobileMenuOpen(false);
    setCartOpen(true);
  };

  // HELPER TO GENERATE SLUGS THAT MATCH YOUR DATA
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace("hair care", "care")
      .replace("press-on nails", "press-ons")
      .replace("closure & frontals", "closures")
      .replace("nail care", "care")
      .replace(/\s+/g, "-");
  };

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* --- TOP BAR (36px) --- */}
      <div className="h-[36px] bg-noir text-white flex items-center justify-between px-6 md:px-12 text-[10px] uppercase tracking-[0.2em] relative overflow-hidden border-b border-gold/10">
        <div className="flex-1 max-w-[50%] overflow-hidden relative">
          <motion.p
            animate={{ x: [300, -300] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="whitespace-nowrap"
          >
            Free delivery on orders over ₦50,000
          </motion.p>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <span className="hover:text-gold cursor-pointer transition-colors font-medium">
            My Account
          </span>
          <span className="opacity-30">·</span>
          <span className="hover:text-gold cursor-pointer transition-colors font-medium">
            Track Order
          </span>
          <span className="opacity-30">·</span>
          <div className="flex items-center gap-2 bg-gold/10 px-2 py-1 border border-gold/20 rounded-sm">
            <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            <span className="text-gold font-bold">Loyalty Points</span>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVBAR (72px) --- */}
      <motion.div
        animate={{
          backdropFilter: isScrolled ? "blur(20px)" : "blur(12px)",
          borderBottom: isScrolled
            ? "1px solid rgba(201, 168, 76, 0.1)"
            : "none",
        }}
        transition={{ duration: 0.4 }}
        className={`h-[72px] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          isScrolled
            ? "bg-[#FAF7F2]/90 dark:bg-noir/90 shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Left: Logo (Desktop) / Hamburger (Mobile) */}
        <div className="flex items-center gap-4 flex-1">
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6 text-gold" />
          </button>
          <Link href="/" className="hidden md:block group">
            <h1 className="font-serif text-3xl text-gold italic font-bold tracking-tighter transition-transform group-hover:scale-105">
              GlowHaus
            </h1>
          </Link>
        </div>

        {/* Centre: Logo (Mobile) */}
        <Link href="/" className="md:hidden flex-1 text-center">
          <h1 className="font-serif text-2xl text-gold italic font-bold">
            GlowHaus
          </h1>
        </Link>

        {/* Centre: Nav Links (Desktop) */}
        <div className="hidden md:flex gap-10 items-center h-full">
          {Object.keys(NAV_DATA)
            .filter((k) => k !== "Simple")
            .map((cat) => (
              <div
                key={cat}
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="h-full flex items-center group cursor-pointer"
              >
                <span className="text-[11px] uppercase tracking-[0.25em] group-hover:text-gold transition-colors font-bold relative dark:text-ivory">
                  {cat}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[1.5px] bg-gold"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </span>
              </div>
            ))}

          {/* SCRIPTED OVERRIDE: Exactly updating URL outputs for the simple string list */}
          {NAV_DATA.Simple.map((link) => {
            const norm = link.toLowerCase().trim();
            const targetUrl =
              norm === "book" || norm === "book appointment"
                ? "/booking"
                : norm === "sale" || norm === "sales"
                  ? "/category/sale"
                  : `/${norm}`;

            return (
              <Link
                key={link}
                href={targetUrl}
                className="text-[11px] uppercase tracking-[0.25em] hover:text-gold transition-colors font-bold dark:text-ivory"
              >
                {link}
              </Link>
            );
          })}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="hover:scale-110 transition-transform">
            <ThemeToggle />
          </div>

          <div className="text-gold hover:scale-110 transition-transform cursor-pointer">
            <SearchOverlay />
          </div>

          <Link href="/wishlist" className="hidden md:block relative group">
            <Heart className="w-5 h-5 text-gold group-hover:fill-gold transition-all" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-noir text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-gold/50 font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <button
            className="relative group p-2 -mr-2"
            onClick={toggleCart}
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 bg-gold text-noir text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </motion.div>

      {/* --- MEGA MENU --- */}
      <AnimatePresence>
        {hoveredCategory && hoveredCategory !== "Simple" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
            className="absolute top-[108px] left-0 w-full bg-[#FAF7F2] dark:bg-noir border-b border-gold/20 shadow-2xl hidden md:block z-[100]"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 p-12">
              {(() => {
                const data = NAV_DATA[hoveredCategory as keyof typeof NAV_DATA];
                if (!data || Array.isArray(data)) return null;

                return (
                  <>
                    {/* LEFT SIDE: Links */}
                    <div className="flex flex-col">
                      <h2 className="font-serif text-4xl text-gold italic mb-8">
                        {hoveredCategory}
                      </h2>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                        {data.links.map((link) => (
                          <Link
                            key={link}
                            href={`/category/${generateSlug(link)}`}
                            className="text-noir/70 dark:text-ivory/70 hover:text-gold text-sm tracking-wide transition-colors duration-300 italic"
                          >
                            {link}
                          </Link>
                        ))}
                      </div>

                      <Link
                        href={`/category/${hoveredCategory.toLowerCase()}`}
                        className="mt-10 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-gold border-b border-gold/40 pb-1 w-fit hover:border-gold transition-all"
                      >
                        Shop All {hoveredCategory}
                      </Link>
                    </div>

                    {/* RIGHT SIDE: Featured Image */}
                    <div className="relative h-[300px] w-full overflow-hidden rounded-sm group">
                      <img
                        src={data.image}
                        alt={hoveredCategory}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-noir/20 group-hover:bg-noir/10 transition-colors duration-500" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
                          Luxury Collection
                        </p>
                        <p className="font-serif text-2xl italic">
                          Signature Style
                        </p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <MobileMenu />
    </nav>
  );
}

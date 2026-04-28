"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Menu } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { NAV_DATA } from "./NavData";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "@/components/shared/SearchOverlay";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Added setMobileMenuOpen and cartOpen/setCartOpen for better control
  const {
    cartCount,
    wishlistItems,
    setMobileMenuOpen,
    setCartOpen,
    cartOpen, // Added to check if cart is already open
  } = useStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to open cart and ensure mobile menu is closed
  const toggleCart = () => {
    setMobileMenuOpen(false);
    setCartOpen(true);
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
          backgroundColor: isScrolled ? "#FAF7F2" : "rgba(250, 247, 242, 0.05)",
          backdropFilter: isScrolled ? "none" : "blur(12px)",
          borderBottom: isScrolled
            ? "1px solid rgba(201, 168, 76, 0.1)"
            : "none",
        }}
        transition={{ duration: 0.4 }}
        className="h-[72px] flex items-center justify-between px-6 md:px-12"
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
                <span className="text-[11px] uppercase tracking-[0.25em] group-hover:text-gold transition-colors font-bold relative">
                  {cat}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[1.5px] bg-gold"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </span>
              </div>
            ))}
          {NAV_DATA.Simple.map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[0.25em] hover:text-gold transition-colors font-bold"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6 flex-1 justify-end">
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

          {/* Optimized Cart Trigger */}
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
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
            className="absolute top-[108px] left-0 w-full bg-[#FAF7F2] border-b border-gold/20 shadow-2xl hidden md:block z-40"
          >
            {/* Mega menu content would go here */}
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu />
    </nav>
  );
}

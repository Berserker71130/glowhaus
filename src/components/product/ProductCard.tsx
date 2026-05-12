"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({
  product,
  onQuickView,
}: ProductCardProps) {
  const { addToCart, addToWishlist, isWishlisted } = useStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayImage =
    (product as any).images?.[0] ||
    (product as any).image ||
    "/placeholder.jpg";
  const displayReviews =
    (product as any).reviewCount || (product as any).reviewsCount || 0;
  const isLiked = mounted ? isWishlisted(product.id) : false;

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, {});
  };

  const cardVariants = {
    initial: { y: 0 },
    hover: { y: -8 },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.08 },
  };

  const actionBarVariants = {
    initial: { y: "100%", opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
      /* Updated bg to handle dark mode and border colors */
      className="group relative flex flex-col w-full bg-[#FCF9F2] dark:bg-zinc-900 border border-[#D4AF37]/10 dark:border-white/5 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.3)]"
    >
      {/* 1. IMAGE CONTAINER */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EDE4] dark:bg-zinc-800 transition-colors duration-500">
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full h-full ${product.isSoldOut ? "grayscale brightness-75" : ""}`}
        >
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </motion.div>

        {/* 2. BADGES OVERLAY */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isSoldOut ? (
            <span className="bg-black dark:bg-white dark:text-black text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase shadow-lg transition-colors">
              SOLD OUT
            </span>
          ) : (
            (product as any).badges?.map((badge: string) => (
              <span
                key={badge}
                className={`text-[9px] font-bold px-2 py-1 tracking-widest uppercase shadow-sm transition-colors
                    ${badge === "SALE" ? "bg-[#D4AF37] text-white" : "bg-black dark:bg-white text-white dark:text-black"}`}
              >
                {badge}
              </span>
            ))
          )}
          {(product as any).isNew && !product.isSoldOut && (
            <span className="bg-black dark:bg-white dark:text-black text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase shadow-sm transition-colors">
              NEW ARRIVAL
            </span>
          )}
        </div>

        {/* 3. WISHLIST HEART */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-[#FCF9F2]/90 dark:bg-noir/80 backdrop-blur-md hover:bg-white dark:hover:bg-gold transition-all duration-300 z-20 shadow-md"
        >
          <Heart
            size={16}
            className={`transition-colors duration-300 ${
              isLiked
                ? "fill-[#D4AF37] text-[#D4AF37]"
                : "text-black dark:text-ivory"
            }`}
          />
        </button>

        {/* 4. HOVER ACTION BAR */}
        <motion.div
          variants={actionBarVariants}
          transition={{ duration: 0.4, ease: "easeOut" }}
          /* Adjusted dark mode hover bar */
          className="absolute bottom-0 left-0 right-0 hidden md:flex h-14 bg-black dark:bg-white/10 dark:backdrop-blur-lg text-white z-30 transition-colors"
        >
          {product.isSoldOut ? (
            <button
              className="flex-1 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              Notify Me
            </button>
          ) : (
            <>
              <button
                onClick={() => onQuickView(product)}
                className="flex-1 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 border-r border-white/10"
              >
                <Eye size={14} /> Quick View
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black dark:hover:bg-gold dark:hover:text-white transition-all duration-300"
              >
                <ShoppingBag size={14} /> Add To Bag
              </button>
            </>
          )}
        </motion.div>
      </div>

      {/* 5. PRODUCT INFO */}
      <div className="flex flex-col py-6 px-4 gap-2">
        <h3 className="font-serif text-[15px] md:text-[17px] text-gray-900 dark:text-ivory leading-tight line-clamp-2 min-h-[40px] uppercase tracking-wider transition-colors duration-500">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={
                  i < Math.floor(product.rating || 5) ? "currentColor" : "none"
                }
                className="mr-0.5"
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 dark:text-ivory/40 font-bold transition-colors">
            ({displayReviews})
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="font-bold text-[#D4AF37] text-lg">
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 dark:text-white/20 line-through text-[12px] font-medium italic transition-colors">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={(e) => !product.isSoldOut && handleAddToCart(e)}
          className={`mt-4 w-full py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 md:hidden border
            ${
              product.isSoldOut
                ? "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-white/20 border-gray-200 dark:border-white/5 cursor-not-allowed"
                : "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white active:bg-[#D4AF37]"
            }`}
        >
          {product.isSoldOut ? "Notify Me" : "Add To Bag"}
        </button>
      </div>
    </motion.div>
  );
}

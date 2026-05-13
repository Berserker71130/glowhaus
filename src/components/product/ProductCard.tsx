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
    hover: { y: -4 }, // Subtler lift for slim cards
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
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
      className="group relative flex flex-col w-full bg-[#FCF9F2] dark:bg-noir border border-[#D4AF37]/10 dark:border-white/5 transition-all duration-500 hover:shadow-[0_15px_40px_-15px_rgba(212,175,55,0.2)]"
    >
      {/* 1. SLIM RECTANGULAR IMAGE CONTAINER (Changed from 3/4 to 16/10) */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F2EDE4] dark:bg-zinc-900 transition-colors duration-500">
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full h-full relative ${product.isSoldOut ? "grayscale brightness-75" : ""}`}
        >
          {/* Primary Image */}
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-700 ${product.images?.[1] ? "group-hover:opacity-0" : ""}`}
          />

          {/* Hover Image (The "Back" or "Action" shot) */}
          {product.images?.[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
        </motion.div>

        {/* 2. BADGES OVERLAY */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isSoldOut ? (
            <span className="bg-black dark:bg-ivory dark:text-noir text-white text-[8px] font-black px-2 py-1 tracking-[0.2em] uppercase shadow-lg transition-colors">
              SOLD OUT
            </span>
          ) : (
            (product as any).badges?.map((badge: string) => (
              <span
                key={badge}
                className={`text-[8px] font-black px-2 py-1 tracking-[0.2em] uppercase shadow-sm transition-colors
                    ${badge === "SALE" ? "bg-[#D4AF37] text-white" : "bg-black dark:bg-ivory text-white dark:text-noir"}`}
              >
                {badge}
              </span>
            ))
          )}
          {(product as any).isNew && !product.isSoldOut && (
            <span className="bg-black dark:bg-ivory dark:text-noir text-white text-[8px] font-black px-2 py-1 tracking-[0.2em] uppercase shadow-sm transition-colors">
              NEW ARRIVAL
            </span>
          )}
        </div>

        {/* 3. WISHLIST HEART */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-[#FCF9F2]/80 dark:bg-noir/60 backdrop-blur-md hover:bg-white dark:hover:bg-gold transition-all duration-300 z-20"
        >
          <Heart
            size={14}
            className={`transition-colors duration-300 ${
              isLiked
                ? "fill-[#D4AF37] text-[#D4AF37]"
                : "text-black dark:text-ivory"
            }`}
          />
        </button>

        {/* 4. HOVER ACTION BAR (Integrated Dark Mode) */}
        <motion.div
          variants={actionBarVariants}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 hidden md:flex h-12 bg-noir/90 dark:bg-ivory/95 text-white dark:text-noir z-30 transition-colors"
        >
          {product.isSoldOut ? (
            <button
              className="flex-1 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              Notify Me
            </button>
          ) : (
            <>
              <button
                onClick={() => onQuickView(product)}
                className="flex-1 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-white dark:hover:text-white transition-all duration-300 border-r border-white/10 dark:border-noir/10"
              >
                <Eye size={12} /> View
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-noir dark:hover:bg-gold dark:hover:text-white transition-all duration-300"
              >
                <ShoppingBag size={12} /> Add
              </button>
            </>
          )}
        </motion.div>
      </div>

      {/* 5. PRODUCT INFO (Slimmed Padding) */}
      <div className="flex flex-col py-5 px-4 gap-1.5">
        <h3 className="font-serif text-[13px] md:text-[14px] text-noir dark:text-ivory leading-tight line-clamp-1 min-h-[18px] uppercase tracking-widest transition-colors duration-500">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                fill={
                  i < Math.floor(product.rating || 5) ? "currentColor" : "none"
                }
                className="mr-0.5"
              />
            ))}
          </div>
          <span className="text-[9px] text-gray-500 dark:text-ivory/30 font-bold transition-colors">
            ({displayReviews})
          </span>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <span className="font-black text-[#D4AF37] text-base tracking-tighter">
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 dark:text-white/10 line-through text-[11px] font-medium italic transition-colors">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={(e) => !product.isSoldOut && handleAddToCart(e)}
          className={`mt-4 w-full py-3.5 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-300 md:hidden border
            ${
              product.isSoldOut
                ? "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-white/10 border-gray-200 dark:border-white/5 cursor-not-allowed"
                : "bg-noir dark:bg-ivory text-white dark:text-noir border-noir dark:border-ivory active:bg-[#D4AF37]"
            }`}
        >
          {product.isSoldOut ? "Notify" : "Add to Bag"}
        </button>
      </div>
    </motion.div>
  );
}

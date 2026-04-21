"use client";

import React from "react";
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
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } =
    useStore();
  const isLiked = wishlistItems.some((item) => item.id === product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const cardVariants = {
    initial: { y: 0 },
    hover: { y: -8 }, // Slightly more lift for luxury feel
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
      // FIXED: Added Ivory background (#FCF9F2) and a soft gold border
      className="group relative flex flex-col w-full bg-[#FCF9F2] border border-[#D4AF37]/10 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.3)]"
    >
      {/* 1. IMAGE CONTAINER */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EDE4]">
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full h-full ${product.isSoldOut ? "grayscale brightness-75" : ""}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 50vw, 33vw"
          />
        </motion.div>

        {/* 2. BADGES OVERLAY */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isSoldOut ? (
            <span className="bg-black text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase">
              SOLD OUT
            </span>
          ) : (
            product.badges.map((badge) => (
              <span
                key={badge}
                className={`text-[9px] font-bold px-2 py-1 tracking-widest uppercase shadow-sm
                    ${badge === "SALE" ? "bg-[#D4AF37] text-white" : "bg-black text-white"}`}
              >
                {badge}
              </span>
            ))
          )}
        </div>

        {/* 3. WISHLIST HEART */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-[#FCF9F2]/90 backdrop-blur-md hover:bg-white transition-all duration-300 z-20 shadow-md"
        >
          <Heart
            size={16}
            className={`transition-colors duration-300 ${isLiked ? "fill-[#D4AF37] text-[#D4AF37]" : "text-black"}`}
          />
        </button>

        {/* 4. HOVER ACTION BAR (FIXED: Contrast and Colors) */}
        {!product.isSoldOut && (
          <motion.div
            variants={actionBarVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            // Changed to a sleek Black bar so it stands out against Ivory
            className="absolute bottom-0 left-0 right-0 hidden md:flex h-14 bg-black text-white z-30"
          >
            <button
              onClick={() => onQuickView(product)}
              className="flex-1 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 border-r border-white/10"
            >
              <Eye size={14} /> Quick View
            </button>
            <button
              onClick={() => addToCart(product, {})}
              className="flex-1 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
            >
              <ShoppingBag size={14} /> Add To Bag
            </button>
          </motion.div>
        )}
      </div>

      {/* 5. PRODUCT INFO (Inside the Ivory card) */}
      <div className="flex flex-col py-6 px-4 gap-2">
        <h3 className="font-serif text-[15px] md:text-[17px] text-gray-900 leading-tight line-clamp-2 min-h-[40px] uppercase tracking-wider">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                className="mr-0.5"
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-bold">
            ({product.reviewsCount})
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="font-bold text-[#D4AF37] text-lg">
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-[12px] font-medium italic">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => !product.isSoldOut && addToCart(product, {})}
          className={`mt-4 w-full py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 md:hidden border
            ${
              product.isSoldOut
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                : "bg-black text-white border-black active:bg-[#D4AF37]"
            }`}
        >
          {product.isSoldOut ? "Notify Me" : "Add To Bag"}
        </button>
      </div>
    </motion.div>
  );
}

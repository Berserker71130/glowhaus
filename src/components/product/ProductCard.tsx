"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // IMPORTED LINK
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

  const displayImage = product.images[0] || "/placeholder.jpg";
  const displayReviews = product.reviewCount || 0;
  const isLiked = mounted ? isWishlisted(product.id) : false;

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); // Added preventDefault
    addToCart(product, {});
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { y: 0 },
        hover: { y: -4 },
      }}
      className="group relative flex flex-col w-full bg-[#FCF9F2] dark:bg-noir border border-[#D4AF37]/10 dark:border-white/5 transition-all duration-500 hover:shadow-[0_15px_40px_-15px_rgba(212,175,55,0.2)]"
    >
      {/* WRAP IMAGE IN LINK FOR MOBILE ACCESS */}
      <Link
        href={`/product/${product.id}`}
        className="relative aspect-square overflow-hidden bg-[#F2EDE4] dark:bg-zinc-900 transition-colors duration-500"
      >
        <motion.div
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full h-full relative ${product.isSoldOut ? "grayscale brightness-75" : ""}`}
        >
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-700 ${product.images[1] ? "group-hover:opacity-0" : ""}`}
          />

          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
        </motion.div>

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isSoldOut ? (
            <span className="bg-black dark:bg-ivory dark:text-noir text-white text-[8px] font-black px-2 py-1 tracking-[0.2em] uppercase shadow-lg transition-colors">
              SOLD OUT
            </span>
          ) : (
            product.tags.map((tag: string) => (
              <span
                key={tag}
                className={`text-[8px] font-black px-2 py-1 tracking-[0.2em] uppercase shadow-sm transition-colors
                    ${tag === "SALE" || product.isSale ? "bg-[#D4AF37] text-white" : "bg-black dark:bg-ivory text-white dark:text-noir"}`}
              >
                {tag}
              </span>
            ))
          )}
        </div>

        {/* WISHLIST HEART - STOP PROPAGATION TO PREVENT LINK CLICK */}
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

        {/* DESKTOP HOVER ACTION BAR (Still hidden on mobile) */}
        <motion.div
          variants={{
            initial: { y: "100%", opacity: 0 },
            hover: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 hidden md:flex h-12 bg-noir/90 dark:bg-ivory/95 text-white dark:text-noir z-30 transition-colors"
        >
          {product.isSoldOut ? (
            <button className="flex-1 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
              Notify Me
            </button>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="flex-1 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 border-r border-white/10 dark:border-noir/10"
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
      </Link>

      {/* PRODUCT INFO */}
      <div className="flex flex-col py-4 px-3 gap-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif text-[13px] md:text-[14px] text-noir dark:text-ivory leading-tight line-clamp-1 min-h-[18px] uppercase tracking-widest transition-colors duration-500 hover:text-[#D4AF37]">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                className="mr-0.5"
              />
            ))}
          </div>
          <span className="text-[9px] text-gray-500 dark:text-ivory/30 font-bold">
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

        {/* MOBILE ADD TO BAG */}
        <button
          onClick={handleAddToCart}
          className={`mt-3 w-full py-2.5 text-[8px] font-black uppercase tracking-[0.1em] transition-all duration-300 md:hidden border
            ${
              product.isSoldOut
                ? "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-white/10 border-gray-200 dark:border-white/5 cursor-not-allowed"
                : "bg-noir dark:bg-ivory text-white dark:text-noir border-noir dark:border-ivory active:bg-[#D4AF37]"
            }`}
        >
          {product.isSoldOut ? "Notify Me" : "Add to Bag"}
        </button>
      </div>
    </motion.div>
  );
}

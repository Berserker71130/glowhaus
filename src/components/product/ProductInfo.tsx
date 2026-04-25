"use client";

import React, { useState } from "react";
import {
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  Star,
  ChevronDown,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: any;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedLength, setSelectedLength] = useState(
    product.lengthOptions?.[0] || "",
  );
  const addToCart = useStore((state: any) => state.addToCart);
  const addToWishlist = useStore((state: any) => state.addToWishlist);
  // Criteria: Stock indicator logic with refined colors
  const getStockStatus = () => {
    if (!product.stockCount || product.stockCount <= 0)
      return { label: "✗ Sold Out", color: "text-rose-600" };
    if (product.stockCount <= 3)
      return {
        label: `⚠ Only ${product.stockCount} left!`,
        color: "text-amber-600",
      };
    return {
      label: `✓ In Stock — ${product.stockCount} remaining`,
      color: "text-green-600",
    };
  };

  const status = getStockStatus();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, selectedLength });
  };

  const handleAddToWishlist = (p: any) => {
    addToWishlist(p);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart"); // Navigates directly to cart as requested
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Breadcrumb (Home › Category › Sub) */}
      <nav className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
        Home › {product.category} ›{" "}
        <span className="text-black">{product.subcategory || "Wigs"}</span>
      </nav>

      {/* 2. Product Name (Luxury Serif - Removed Uppercase for Elegance) */}
      <div className="space-y-3">
        <h1 className="font-serif text-4xl md:text-5xl text-black leading-tight italic">
          {product.name}
        </h1>
        {/* 3. Rating Stars + Link */}
        <div className="flex items-center gap-4">
          <div className="flex text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < 4 ? "currentColor" : "none"}
                stroke="currentColor"
              />
            ))}
          </div>
          <a
            href="#reviews"
            className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors underline underline-offset-4"
          >
            (246 reviews)
          </a>
        </div>
      </div>

      {/* 4. Price (Large, Gold) */}
      <div className="flex items-baseline gap-4">
        <span className="text-3xl font-bold text-[#D4AF37]">
          ₦{product.price.toLocaleString()}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-xl text-gray-300 line-through">
            ₦{product.originalPrice.toLocaleString()}
          </span>
        )}
      </div>

      {/* 5. Stock Indicator */}
      <div
        className={`text-[10px] font-bold uppercase tracking-[0.15em] ${status.color}`}
      >
        {status.label}
      </div>

      {/* 6. Variant Selectors (Pills for Hair, Color Circles for Nails) */}
      <div className="space-y-6 my-6">
        {/* 1. HAIR LENGTHS */}
        {product.category === "hair" && product.lengthOptions && (
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Select Length
            </label>
            <div className="flex flex-wrap gap-2">
              {product.lengthOptions.map((len: string) => (
                <button
                  key={len}
                  onClick={() => setSelectedLength(len)}
                  className={`px-6 py-3 rounded-full border text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                    selectedLength === len
                      ? "bg-black text-white border-black shadow-md scale-105" // Selected: Black Pill
                      : "bg-white border-gray-200 text-gray-400 hover:border-black hover:text-black" // Unselected: Clean White Pill
                  }`}
                >
                  {len}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. NAIL OPTIONS (Smart Selector) */}
        {product.category === "nails" && product.shadeOptions && (
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Select Style / Shade
            </label>
            <div className="flex flex-wrap gap-2">
              {product.shadeOptions.map((shade: string) => {
                const isHex = shade.startsWith("#"); // Checks if it's a color code

                return (
                  <button
                    key={shade}
                    onClick={() => setSelectedLength(shade)}
                    className={`transition-all ${
                      isHex
                        ? `w-10 h-10 rounded-full border-2 ${selectedLength === shade ? "border-black scale-110" : "border-gray-200"}`
                        : `px-6 py-3 border text-[11px] font-bold tracking-widest ${selectedLength === shade ? "bg-black text-white border-black" : "bg-white border-gray-300 text-gray-500"}`
                    }`}
                    style={isHex ? { backgroundColor: shade } : {}}
                  >
                    {!isHex && shade}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 7. Quantity Selector */}
      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Quantity
        </label>
        <div className="flex items-center border border-gray-200 w-fit h-12">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 h-full hover:bg-gray-50 transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="px-6 font-bold text-sm w-12 text-center">
            {quantity}
          </span>
          <button
            onClick={() =>
              setQuantity(Math.min(product.stockCount || 10, quantity + 1))
            }
            className="px-4 h-full hover:bg-gray-50 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* 8. CTAs (Primary Gold Gradient) */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAddToCart}
          disabled={product.stockCount === 0}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-white py-5 font-bold uppercase tracking-[0.2em] text-[11px] flex justify-center items-center gap-3 hover:brightness-110 active:scale-[0.98] disabled:grayscale transition-all shadow-xl"
        >
          <ShoppingBag size={18} /> Add to Bag
        </button>
        <button
          onClick={() => handleAddToWishlist(product)}
          className="w-full border border-black py-4 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-black hover:text-white transition-all active:scale-[0.98]"
        >
          Add to Wishlist
        </button>
        <button
          onClick={handleBuyNow}
          className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black underline underline-offset-4 mt-2"
        >
          Buy It Now
        </button>
      </div>

      {/* 9. Delivery Info */}
      <div className="flex items-center gap-4 p-5 bg-gray-50 border-l-4 border-[#D4AF37]">
        <Truck size={22} className="text-[#D4AF37]" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-700 leading-relaxed">
          Order before 4PM for next-day Lagos delivery
        </p>
      </div>

      {/* 10. Accordion & Payment */}
      <Accordion.Root
        type="single"
        defaultValue="description" // Criteria: Open by default
        collapsible
        className="w-full pt-8"
      >
        {[
          {
            id: "description",
            title: "Description",
            content: product.description,
          },
          {
            id: "details",
            title: "Product Details",
            content: product.details, // This should be an array in your dummy data
          },
          {
            id: "care",
            title: "Care Instructions",
            content:
              product.careInstructions ||
              "Wash with sulfate-free shampoo. Air dry only.",
          },
          {
            id: "shipping",
            title: "Shipping & Returns",
            content:
              "Free shipping on orders over ₦200k. 7-day return policy. Items must be unworn and in original packaging.",
          },
        ].map((item) => (
          <Accordion.Item
            key={item.id}
            value={item.id}
            className="border-b border-gray-100 last:border-0"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex justify-between items-center w-full py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-black hover:text-[#D4AF37] group transition-all text-left">
                {item.title}
                <ChevronDown
                  className="transition-transform duration-300 group-data-[state=open]:rotate-180 text-gray-400"
                  size={14}
                />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <div className="pb-6 text-sm text-gray-500 leading-loose font-light">
                {/* Criteria: Render Product Details as a bullet list */}
                {item.id === "details" && Array.isArray(item.content) ? (
                  <ul className="list-disc pl-5 space-y-2 decoration-[#D4AF37]">
                    {item.content.map((detail, index) => (
                      <li key={index} className="pl-2">
                        {detail}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.content}</p>
                )}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <div className="flex flex-col items-center gap-4 pt-8 border-t border-gray-50">
        <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-400">
          Secure Checkout With
        </p>
        <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
          <img
            src="/paystack-logo.png"
            className="h-5 object-contain"
            alt="Paystack"
          />
          <img
            src="/flutterwave-logo.png"
            className="h-5 object-contain"
            alt="Flutterwave"
          />
        </div>
      </div>
    </div>
  );
}

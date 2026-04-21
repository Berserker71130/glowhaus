"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";
import { ShoppingBag, Star, X } from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const { addToCart } = useStore();

  if (!product) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay - The dark background */}
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-300" />

        {/* Content - The Modal Box */}
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl bg-[#FCF9F2] shadow-2xl z-[101] outline-none animate-in zoom-in-95 duration-300 overflow-hidden border border-[#D4AF37]/20">
          {/* ACCESSIBILITY FIX: Screen Reader Only Titles */}
          <Dialog.Title className="sr-only">
            Quick view for {product.name}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Product details and purchase options for {product.name}
          </Dialog.Description>

          <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
            {/* LEFT: Image Section */}
            <div className="relative w-full md:w-1/2 aspect-[3/4] bg-[#F2EDE4]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.isSoldOut && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="bg-white text-black px-4 py-2 font-bold tracking-widest text-xs">
                    SOLD OUT
                  </span>
                </div>
              )}
            </div>

            {/* RIGHT: Product Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#FCF9F2]">
              <Dialog.Close className="absolute top-4 right-4 p-2 hover:bg-[#D4AF37]/10 rounded-full transition-colors">
                <X size={20} className="text-black" />
              </Dialog.Close>

              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-gray-900 uppercase tracking-tight leading-tight">
                    {product.name}
                  </h2>

                  {/* Rating in Modal */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={
                            i < Math.floor(product.rating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest">
                      ({product.reviewsCount} REVIEWS)
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-2xl font-bold text-[#D4AF37]">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through italic">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-700 leading-relaxed font-light italic">
                  Experience the epitome of luxury with the {product.name}.
                  Carefully curated for the Glowhaus woman who values elegance
                  and quality above all else.
                </p>

                <div className="pt-4 space-y-4">
                  <button
                    disabled={product.isSoldOut}
                    onClick={() => {
                      addToCart(product, {});
                      onClose(); //Close modal after adding
                    }}
                    className={`w-full flex items-center justify-center gap-3 py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${
                      product.isSoldOut
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-black text-white hover:bg-[#D4AF37]"
                    }`}
                  >
                    <ShoppingBag size={18} />
                    {product.isSoldOut
                      ? "Notify Me When Available"
                      : "Add to Shopping Bag"}
                  </button>

                  <button className="w-full text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors underline underline-offset-8 decoration-[#D4AF37]/40">
                    View Full Product Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";
import { ShoppingBag, Star, X } from "lucide-react";
import { showGlowToast } from "@/lib/toast";
import Link from "next/link";

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
  const { addToCart, setCartOpen } = useStore();

  if (!product) return null;

  // Now that we have a standard type, we can trust product.images[0]
  const displayImage = product.images[0] || "/placeholder.jpg";

  const handleAddToCart = () => {
    addToCart(product, {});
    onClose();

    showGlowToast({
      message: `${product.name} added to bag`,
      accentColor: "#D4AF37",
      icon: "👜",
      action: {
        label: "View Bag",
        fn: () => setCartOpen(true),
      },
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-noir/60 dark:bg-black/80 backdrop-blur-sm z-[100] animate-in fade-in duration-300" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl bg-ivory dark:bg-noir shadow-2xl z-[101] outline-none animate-in zoom-in-95 duration-300 overflow-hidden border border-gold/20 dark:border-white/10 transition-colors duration-500">
          <Dialog.Title className="sr-only">
            Quick view for {product.name}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Product details and purchase options for {product.name}
          </Dialog.Description>

          <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
            {/* LEFT: Image Section - Using the 16/10 logic for consistent luxury framing */}
            <div className="relative w-full md:w-1/2 aspect-[16/10] md:aspect-auto bg-gray-100 dark:bg-zinc-800 transition-colors duration-500">
              <Image
                src={displayImage}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {product.isSoldOut && (
                <div className="absolute inset-0 bg-noir/40 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="bg-ivory text-noir px-6 py-3 font-black tracking-[0.3em] text-[10px] uppercase">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* RIGHT: Product Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-zinc-900 transition-colors duration-500">
              <Dialog.Close className="absolute top-4 right-4 p-2 hover:bg-gold/10 dark:hover:bg-white/10 rounded-full transition-all z-10">
                <X size={20} className="text-noir dark:text-ivory" />
              </Dialog.Close>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-2">
                    {product.category}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-noir dark:text-ivory italic font-bold tracking-tight leading-tight transition-colors">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < 5 ? "currentColor" : "none"} // Static for now per your dummy data
                        />
                      ))}
                    </div>
                    <span className="text-[9px] font-black text-noir/30 dark:text-ivory/30 tracking-widest uppercase">
                      (Featured Collection)
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-black text-noir dark:text-ivory tracking-tighter">
                    ₦{product.price.toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-noir/60 dark:text-ivory/60 leading-relaxed font-light italic transition-colors border-l-2 border-gold/20 pl-4">
                  Experience the epitome of luxury with the {product.name}. A
                  signature piece from the Glowhaus collection, meticulously
                  crafted for the modern woman.
                </p>

                <div className="pt-6 space-y-4">
                  <button
                    disabled={product.isSoldOut}
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center gap-3 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all ${
                      product.isSoldOut
                        ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-white/20 cursor-not-allowed"
                        : "bg-noir dark:bg-ivory text-white dark:text-noir hover:bg-gold dark:hover:bg-gold transition-colors duration-300 shadow-xl"
                    }`}
                  >
                    <ShoppingBag size={18} strokeWidth={1.5} />
                    {product.isSoldOut ? "Notify Me" : "Add to Bag"}
                  </button>

                  <Link
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="block w-full text-center text-[9px] font-black uppercase tracking-[0.2em] text-noir/40 dark:text-ivory/40 hover:text-gold transition-colors"
                  >
                    View Full Details — Discover More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

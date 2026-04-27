"use client";

import { products } from "@/lib/dummy-data/products";
import { useStore } from "@/store/useStore";
import { Product } from "@/types";
import { useState } from "react";
import { Check, ShoppingBag, Plus } from "lucide-react";

export default function CompleteTheLook() {
  const addBundleToCart = useStore((state) => state.addBundleToCart);
  const [added, setAdded] = useState(false);

  // 1. IMPROVED FILTER: This ensures we grab the specific items requested
  // We look for any product that has these keywords in the name
  const accessories = products.filter((p) => {
    const name = p.name.toLowerCase();
    return (
      name.includes("cap") || name.includes("edge") || name.includes("bonnet")
    );
  });

  // 2. GUARANTEE 3 ITEMS: If your data is missing some, we fill with others
  // so the UI always has 3 cards as per the instructions
  const displayItems =
    accessories.length >= 3
      ? accessories.slice(0, 3)
      : [
          ...accessories,
          ...products.filter((p) => !accessories.includes(p)),
        ].slice(0, 3);

  const totalPrice = displayItems.reduce((sum, p) => sum + p.price, 0);

  const handleAddBundle = () => {
    addBundleToCart(displayItems as unknown as Product[]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="mt-16 bg-[#FCF9F2] rounded-2xl p-6 md:p-8 border border-[#D4AF37]/20">
      <h3 className="text-xl font-serif font-bold mb-8 text-gray-900 uppercase tracking-widest">
        Complete the Look
      </h3>

      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* SMALL CARDS WITH PLUS ICONS */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 w-full lg:w-auto scrollbar-hide">
          {displayItems.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-28 md:w-36 text-center">
                <div className="aspect-square relative rounded-xl overflow-hidden border border-[#D4AF37]/10 bg-white mb-3 shadow-sm">
                  <img
                    /* FIXED THE RED ERROR: item.images[0] is the string, item.images is an array */
                    src={item.image || (item.images && item.images[0]) || ""}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[10px] font-bold uppercase truncate text-gray-800 px-1">
                  {item.name}
                </p>
                <p className="text-xs text-[#D4AF37] font-bold mt-1">
                  ₦{item.price.toLocaleString()}
                </p>
              </div>

              {/* Show '+' between cards, but not after the last card */}
              {index < displayItems.length - 1 && (
                <Plus size={16} className="text-[#D4AF37] flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* BUNDLE SUMMARY CTA */}
        <div className="w-full lg:w-auto lg:border-l border-gray-200 lg:pl-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
            Bundle total (3 Items)
          </p>
          <p className="text-3xl font-bold mb-6 text-black font-serif">
            ₦{totalPrice.toLocaleString()}
          </p>

          <button
            onClick={handleAddBundle}
            disabled={added}
            className={`flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-500 shadow-lg ${
              added
                ? "bg-green-600 text-white"
                : "bg-black text-white hover:bg-[#D4AF37] hover:shadow-[#D4AF37]/20"
            }`}
          >
            {added ? (
              <>
                <Check size={16} />
                Added to Bag
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                Add All to Bag
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

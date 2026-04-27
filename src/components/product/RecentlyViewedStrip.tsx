"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";
import { X } from "lucide-react";

export default function RecentlyViewedStrip({
  currentProductId,
}: {
  currentProductId: string;
}) {
  const { recentlyViewed, removeFromRecentlyViewed } = useStore();

  // Exclude current product from the strip
  const displayItems = recentlyViewed.filter((p) => p.id !== currentProductId);

  if (displayItems.length === 0) return null;

  return (
    <section className="w-full bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gray-400">
          Recently Viewed
        </h3>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {displayItems.map((item: any) => (
            <div key={item.id} className="relative flex-shrink-0 w-36 group">
              {/* Individual Remove Button */}
              <button
                onClick={() => removeFromRecentlyViewed(item.id)}
                className="absolute -top-1 -right-1 z-10 bg-white border rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black hover:text-white"
              >
                <X size={12} />
              </button>

              <Link href={`/product/${item.slug}`}>
                <div className="aspect-[3/4] relative rounded-lg overflow-hidden mb-3 border border-gray-100 bg-gray-50">
                  {/* Safety Check for images to prevent Vercel Build Errors */}
                  {(item.images && item.images[0]) || item.image ? (
                    <img
                      src={(item.images && item.images[0]) || item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-[10px] text-gray-300 uppercase font-bold">
                        No Image
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <p className="text-[11px] font-bold truncate uppercase mb-1 text-gray-900">
                  {item.name}
                </p>

                {/* Product Price */}
                <p className="text-xs text-gray-500 font-medium">
                  ₦{item.price?.toLocaleString()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

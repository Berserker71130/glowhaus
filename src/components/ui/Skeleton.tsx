"use client";

import { cn } from "@/lib/utils";

/**
 * GLOWHAUS SKELETON SUITE
 * Updated with Ivory (#F2EDE4) and Gold (#D4AF37) accents.
 */

// Base Primitive - The "Mother" of all skeletons with a soft luxury shimmer
export const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "bg-[#F2EDE4] dark:bg-zinc-800 animate-pulse relative overflow-hidden border border-[#D4AF37]/5 rounded-sm",
      className,
    )}
  />
);

// 1. ProductCardSkeleton — Matches the 3:4 aspect ratio used in Glowhaus
export const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-4 w-full">
    <Skeleton className="aspect-[3/4] w-full" />
    <div className="px-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-5 w-1/4 mt-2" />
    </div>
  </div>
);

// 2. ProductGridSkeleton — 8-card grid layout for the shop
export const ProductGridSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-10 py-10">
    {[...Array(8)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// 3. ProductDetailSkeleton — Updated for Video Ad + 3-Image Stack
export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-6 md:p-12 max-w-7xl mx-auto">
    {/* LEFT: Media Stack (Video Placeholder + Image Placeholders) */}
    <div className="space-y-4">
      <Skeleton className="aspect-[9/16] md:aspect-video w-full" />{" "}
      {/* Video Ad */}
      <Skeleton className="aspect-[3/4] w-full" /> {/* Front View */}
      <Skeleton className="aspect-[3/4] w-full" /> {/* Back View */}
    </div>

    {/* RIGHT: Info Panel */}
    <div className="flex flex-col gap-8 sticky top-32 h-fit">
      <div className="space-y-4">
        <Skeleton className="h-3 w-24" /> {/* Category Label */}
        <Skeleton className="h-12 w-3/4" /> {/* Product Title */}
        <Skeleton className="h-8 w-1/3" /> {/* Price */}
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-16 w-full mt-6" /> {/* Add to Bag Button */}
    </div>
  </div>
);

// 4. HeroSkeleton — Full-width luxury landing
export const HeroSkeleton = () => (
  <Skeleton className="w-full h-[70vh] md:h-[85vh] rounded-none" />
);

// 5. CategoryBannerSkeleton — Wide banner strip
export const CategoryBannerSkeleton = () => (
  <Skeleton className="w-full h-[180px] md:h-[260px] rounded-none" />
);

// 6. ReviewCardSkeleton — High-end testimonial ghost
export const ReviewCardSkeleton = () => (
  <div className="p-6 border border-[#D4AF37]/10 rounded-2xl flex flex-col gap-4">
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-4 w-4 rounded-full" />
      ))}
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
);

// 7. GalleryGridSkeleton — Masonry style
export const GalleryGridSkeleton = () => (
  <div className="columns-2 md:columns-3 gap-4 space-y-4 px-4">
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-[400px] w-full" />
    <Skeleton className="h-72 w-full" />
    <Skeleton className="h-96 w-full" />
    <Skeleton className="h-80 w-full" />
  </div>
);

// 8. CartDrawerSkeleton — Shopping Bag list
export const CartDrawerSkeleton = () => (
  <div className="p-6 space-y-8">
    <Skeleton className="h-8 w-1/2 mb-6" />
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton className="h-24 w-20 flex-shrink-0" />
        <div className="flex-1 space-y-3 py-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    ))}
    <div className="pt-6 border-t border-[#D4AF37]/20 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-14 w-full" />
    </div>
  </div>
);

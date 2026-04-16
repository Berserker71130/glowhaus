import { cn } from "@/lib/utils";

// Base Primitive - The "Mother" of all skeletons
export const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "bg-taupe/20 animate-shimmer rounded-lg border border-blush/50",
      className,
    )}
  />
);

// 1. ProductCardSkeleton — image placeholder + title lines + price line
export const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-4 w-full">
    <Skeleton className="aspect-[3/4] w-full" />
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-6 w-1/4 mt-2" />
  </div>
);

// 2. ProductGridSkeleton — 8-card grid layout
export const ProductGridSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-10 py-10">
    {[...Array(8)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// 3. ProductDetailSkeleton — image gallery + info panel
export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-6 md:p-12">
    <Skeleton className="aspect-square w-full" />
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-6 w-1/4" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-14 w-full mt-6" />
    </div>
  </div>
);

// 4. HeroSkeleton — full-width hero
export const HeroSkeleton = () => (
  <Skeleton className="w-full h-[70vh] md:h-[85vh] rounded-none" />
);

// 5. CategoryBannerSkeleton — wide banner strip
export const CategoryBannerSkeleton = () => (
  <Skeleton className="w-full h-[180px] md:h-[260px] rounded-none" />
);

// 6. ReviewCardSkeleton — avatar circle + text lines + star row
export const ReviewCardSkeleton = () => (
  <div className="p-6 border border-blush/30 rounded-2xl flex flex-col gap-4">
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

// 7. GalleryGridSkeleton — masonry grid of image boxes
export const GalleryGridSkeleton = () => (
  <div className="columns-2 md:columns-3 gap-4 space-y-4 px-4">
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-[400px] w-full" />
    <Skeleton className="h-72 w-full" />
    <Skeleton className="h-96 w-full" />
    <Skeleton className="h-80 w-full" />
  </div>
);

// 8. BookingFormSkeleton — service picker + calendar placeholder
export const BookingFormSkeleton = () => (
  <div className="max-w-2xl mx-auto space-y-8 p-8 border border-blush/20 rounded-3xl">
    <div className="space-y-2">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-14 w-full" />
  </div>
);

// 9. CartDrawerSkeleton — list of item rows
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
    <div className="pt-6 border-t border-blush/20 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-14 w-full" />
    </div>
  </div>
);

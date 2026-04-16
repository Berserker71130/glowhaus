import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Title placeholder */}
      <div className="px-4 md:px-10 pt-12 pb-4">
        <div className="h-8 w-48 bg-blush/30 animate-pulse rounded-md mb-4" />
        <div className="h-4 w-64 bg-blush/20 animate-pulse rounded-md" />
      </div>

      {/* The 8-Card grid built */}
      <ProductGridSkeleton />
    </div>
  );
}

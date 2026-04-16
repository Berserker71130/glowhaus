import { HeroSkeleton } from "@/components/ui/Skeleton";

export default function GlobalLoading() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Show big Hero Skeleton first */}
      <HeroSkeleton />

      {/* Add a bit of spacing and some generic card shapes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-64 bg-blush/30 animate-shimmer rounded-2xl" />
            <div className="h-4 w-3/4 bg-blush/20 animate-shimmer rounded-md" />
          </div>
        ))}
      </div>
    </main>
  );
}

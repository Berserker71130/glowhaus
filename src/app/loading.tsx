import { HeroSkeleton } from "@/components/ui/Skeleton";

export default function GlobalLoading() {
  return (
    // Using your 'ivory' token for the base background
    <main className="min-h-screen bg-ivory">
      <HeroSkeleton />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header Skeleton */}
        <div className="h-8 w-48 bg-gold-muted/20 animate-shimmer rounded mb-8" />

        {/* Product Grid - 4 Columns like a luxury boutique */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              {/* Image area using your 'blush' token for a soft feel */}
              <div className="aspect-[3/4] w-full bg-blush/40 animate-shimmer rounded-sm border border-gold/5" />

              {/* Text lines using 'taupe' or 'gold' muted tones */}
              <div className="space-y-3">
                <div className="h-3 w-1/3 bg-gold-muted/30 animate-shimmer rounded" />
                <div className="h-4 w-full bg-taupe/20 animate-shimmer rounded" />
                <div className="h-3 w-1/4 bg-gold-muted/20 animate-shimmer rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

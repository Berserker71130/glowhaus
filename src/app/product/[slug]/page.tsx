import { Metadata } from "next";
import { products } from "@/lib/dummy-data/products";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import CompleteTheLook from "@/components/product/CompleteTheLook";
import ProductInfo from "@/components/product/ProductInfo";
import { reviews } from "@/lib/dummy-data";
import ProductReviews from "@/components/product/ProductReviews";
import RecentlyViewedTracker from "@/components/product/RecentlyViewedTracker";
import RelatedProducts from "@/components/product/RelatedProducts";
import RecentlyViewedStrip from "@/components/product/RecentlyViewedStrip";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug || p.id === slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | GlowHaus`,
    description: product.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  const isHairProduct =
    product.category.toLowerCase().includes("hair") ||
    product.category.toLowerCase().includes("wig");

  const productReviews = reviews.filter((r) => r.productId === product.id);

  const productBadges: string[] = [];
  if (product.isNew) productBadges.push("NEW");
  if (product.isBestseller) productBadges.push("BESTSELLER");
  if (product.isSale) productBadges.push("SALE");

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pt-32 py-10">
      <RecentlyViewedTracker product={product} />

      <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
        {/* LEFT COLUMN: MEDIA GALLERY (Surgically Enhanced for Bianca's Criteria) */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          
          {/* 1. PREMIUM AUTO-PLAYING "VIDEO" EXPERIENCE LAYER (FIRST THING USER SEES) */}
          <div className="relative aspect-square w-full bg-zinc-900 overflow-hidden rounded-sm shadow-sm group">
            
            {/* Swapped custom style tag out for Next.js inline style component to avoid client component collision */}
           <img 
  src={product.images[0]} 
  alt={`${product.name} Experience`} 
  className="w-full h-full object-cover transform scale-105 animate-[pulse_8s_ease-in-out_infinite]"
/>
            
            {/* Elegant Minimal Brand Badge Overlay instead of an ugly play icon */}
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full pointer-events-none">
              <p className="text-white text-[9px] tracking-[0.2em] uppercase font-light flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Experience
              </p>
            </div>
            
            {/* Badges Overlay */}
            {productBadges.length > 0 && (
              <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                {productBadges.map((badge) => (
                  <span key={badge} className="bg-black text-white text-[9px] tracking-widest font-light px-3 py-1 uppercase">
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 2. THE REST OF THE IMAGE GALLERY */}
          <ProductGallery images={product.images} badges={[]} />
        </div>

        {/* RIGHT COLUMN: PRODUCT CONTROLS */}
        <div className="w-full lg:w-2/5 lg:sticky lg:top-24">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="mt-20 border-t border-gray-100">
        <ProductReviews reviews={productReviews} />
      </div>

      {isHairProduct && (
        <div className="mt-16">
          <CompleteTheLook />
        </div>
      )}

      <div className="mt-24">
        <RelatedProducts
          products={relatedProducts}
          category={product.category}
        />
      </div>

      <div className="mt-32">
        <RecentlyViewedStrip currentProductId={product.id} />
      </div>
    </main>
  );
}
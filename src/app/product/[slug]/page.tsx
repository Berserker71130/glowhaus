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
        <div className="w-full lg:w-3/5">
          <ProductGallery images={product.images} badges={productBadges} />
        </div>

        <div className="w-full lg:w-2/5 lg:sticky lg:top-24">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* 1. REVIEWS SECTION */}
      <div className="mt-20 border-t border-gray-100">
        <ProductReviews reviews={productReviews} />
      </div>

      {/* 2. NEW VIDEO EXPERIENCE SECTION (The Bianca Criteria) */}
      <div className="mt-24 pt-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-xl font-light tracking-[0.3em] uppercase mb-10 text-gray-800">
            Product Experience
          </h2>
          <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden rounded-sm group cursor-pointer shadow-2xl">
            {/* Background Preview */}
            <img 
              src={product.images[0]} 
              alt="Experience Video" 
              className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-[2000ms]"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
              </div>
              <p className="mt-6 text-white text-[10px] tracking-[0.5em] uppercase font-light">Watch the Glow-Up</p>
              <span className="mt-2 text-white/40 text-[8px] uppercase tracking-widest">Coming Soon to GlowHaus</span>
            </div>
          </div>
        </div>
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
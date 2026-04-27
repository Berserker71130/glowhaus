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
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | GlowHaus`,
    description: product.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // --- LOGIC FOR TASK #19 ---
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  const isHairProduct =
    product.category.toLowerCase().includes("hair") ||
    product.category.toLowerCase().includes("wig");
  // --- END LOGIC ---

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

      <div className="mt-20 border-t border-gray-100">
        <ProductReviews reviews={productReviews} />
      </div>

      {/* --- ADDED SECTIONS BELOW --- */}

      {/* 3. CRITERIA: "Complete the Look" (hair products only) */}
      {isHairProduct && (
        <div className="mt-16">
          <CompleteTheLook />
        </div>
      )}

      {/* 4. CRITERIA: "You May Also Like" carousel */}
      <div className="mt-24">
        <RelatedProducts
          products={relatedProducts}
          category={product.category}
        />
      </div>

      {/* 5. CRITERIA: Recently Viewed strip at the very bottom */}
      <div className="mt-32">
        <RecentlyViewedStrip currentProductId={product.id} />
      </div>
    </main>
  );
}

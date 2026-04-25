import { Metadata } from "next";
import { products } from "@/lib/dummy-data/products"; // Adjusted to match your specific file
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import { Review, reviews } from "@/lib/dummy-data";
import ProductReviews from "@/components/product/ProductReviews";

// 1. Corrected Interface: Added colon and Promise for Next.js 15+
interface Props {
  params: Promise<{ slug: string }>;
}

// 2. SEO: Handling the Promise slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | GlowHaus`,
    description: product.description,
  };
}

// 3. Page Component: Made async to await params
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);

  const productBadges: string[] = [];
  if (product.isNew) productBadges.push("NEW");
  if (product.isBestseller) productBadges.push("BESTSELLER");
  if (product.isSale) productBadges.push("SALE");

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pt-32 py-10">
      {/* Layout: Sticky 2-column on desktop, stacked on mobile */}
      <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
        {/* Left — Image Gallery */}
        <div className="w-full lg:w-3/5">
          {/* 4. Fix: Changed product.image to product.images to match the Gallery prop */}
          <ProductGallery images={product.images} badges={productBadges} />
        </div>

        {/* Right — Product Info Panel (Sticky top-24) */}
        <div className="w-full lg:w-2/5 lg:sticky lg:top-24">
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="mt-20 border-t border-gray-100">
        <ProductReviews reviews={productReviews} />
      </div>
    </main>
  );
}

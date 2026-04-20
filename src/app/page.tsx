import BestSellers from "@/components/home/Bestsellers";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/sections/NewArrivals";
import SaleBanner from "@/components/sections/SaleBanner";
import TrustSection from "@/components/sections/TrustSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory">
      <Hero />
      <CategoryShowcase />
      <BestSellers />
      <NewArrivals />
      <SaleBanner />
      <TrustSection />
    </main>
  );
}

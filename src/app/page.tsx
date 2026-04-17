import BestSellers from "@/components/home/Bestsellers";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/sections/NewArrivals";
import SaleBanner from "@/components/sections/SaleBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-200">
      <Hero />
      <CategoryShowcase />
      <BestSellers />
      <NewArrivals />
      <SaleBanner />
    </main>
  );
}

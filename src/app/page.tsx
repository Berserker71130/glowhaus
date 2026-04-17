import BestSellers from "@/components/home/Bestsellers";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-200">
      <Hero />
      <CategoryShowcase />
      <BestSellers />
    </main>
  );
}

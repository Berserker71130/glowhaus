import CategoryShowcase from "@/components/home/CategoryShowcase";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategoryShowcase />
    </main>
  );
}

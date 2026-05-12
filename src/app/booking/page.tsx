"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/lib/dummy-data";
import { ServiceCard } from "@/components/booking/ServiceCard";
import { BookingTabs } from "@/components/booking/BookingTabs";
import { HowItWorks } from "@/components/booking/HowItWorks";

const CATEGORIES = ["All", "Hair Services", "Nail Services", "Beauty Services"];

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState("All");

  const allServices = products.filter(
    (p) =>
      p.category === "hair" ||
      p.category === "nails" ||
      p.subcategory === "Services",
  );

  const filteredServices =
    activeTab === "All"
      ? allServices
      : allServices.filter((s) => {
          const cat = activeTab.split(" ")[0].toLowerCase();
          return s.category.toLowerCase().includes(cat);
        });

  return (
    /* SURGERY: Theme background and transition added */
    <div className="min-h-screen bg-white dark:bg-noir transition-colors duration-500">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-noir">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2000"
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="GlowHaus Luxury Banner"
          />
          {/* FIX: Gradient now fades into Noir when in Dark Mode */}
          <div className="absolute inset-0 bg-gradient-to-b from-noir/60 via-transparent to-white dark:to-noir transition-all duration-500" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-serif text-white mb-6 tracking-tighter"
          >
            Book Your Glow Session
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-xl md:text-2xl font-light italic max-w-3xl mx-auto"
          >
            Professional hair, nail & beauty services at your finger tips
          </motion.p>

          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="mt-12 flex justify-center"
          >
            <svg
              width="220"
              height="30"
              viewBox="0 0 220 30"
              fill="none"
              className="text-gold"
            >
              <path
                d="M0 15C40 15 40 2 80 2C120 2 120 28 160 28C200 28 200 15 240 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* CONTENT AREA */}
      <div className="container mx-auto px-6 py-20">
        {/* TABS: Note: Ensure BookingTabs component handles dark mode internals */}
        <div className="mb-24">
          <BookingTabs
            categories={CATEGORIES}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* GRID: ServiceCard needs to be theme-aware */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-24"
        >
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* EMPTY STATE: text-noir/30 -> dark:text-ivory/30 */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20 font-serif text-2xl text-noir/30 dark:text-ivory/30 transition-colors">
            More services coming soon to this category...
          </div>
        )}

        {/* HOW IT WORKS: Note: Ensure this component handles dark mode internals */}
        <HowItWorks />
      </div>
    </div>
  );
}

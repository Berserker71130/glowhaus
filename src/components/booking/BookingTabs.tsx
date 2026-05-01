"use client";
import { motion } from "framer-motion";

interface TabsProps {
  categories: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BookingTabs = ({
  categories,
  activeTab,
  setActiveTab,
}: TabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap=8 md:gap-16 border-b border-noir/10">
      {categories.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative pb-6 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 ${
            activeTab === tab ? "text-noir" : "text-noir/30 hover:text-noir/60"
          }`}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="activeUnderline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

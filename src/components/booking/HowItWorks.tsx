"use client";
import { motion } from "framer-motion";

const STEPS = [
  {
    icon: "🎯",
    title: "Choose Your Service",
    desc: "Select from our range of premium hair, nail & beauty treatments.",
  },
  {
    icon: "📅",
    title: "Pick a Date & Time",
    desc: "Our real-time calendar shows you exactly when our experts are free.",
  },
  {
    icon: "✨",
    title: "Show Up & Glow",
    desc: "Visit our luxury suite and let us handle the rest. Confidence included.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="mt-48 py-24 border-t border-noir/5">
      <h2 className="text-center font-serif text-4xl mb-24 tracking-tight text-noir">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4">
        {STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            // Added a very slight white background with low opacity to lift from Ivory
            className="text-center group p-8 bg-white/40 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500"
          >
            {/* Icon Container: Gives the emoji a "home" so it doesn't float awkwardly */}
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500 text-4xl">
              {step.icon}
            </div>

            <h4 className="text-sm font-bold text-noir mb-4 uppercase tracking-[0.2em] leading-none">
              {step.title}
            </h4>

            <div className="w-12 h-[2px] bg-gold mx-auto mb-6 opacity-80" />

            <p className="text-noir/70 text-sm font-light leading-relaxed max-w-[240px] mx-auto italic">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

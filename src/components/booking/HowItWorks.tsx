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
      <h2 className="text-center font-serif text-4xl mb-24 tracking-tight">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="text-center group"
          >
            <div className="text-5xl mb-8 group-hover:scale-125 transition-transform duration-500 block">
              {step.icon}
            </div>
            <h4 className="text-xl font-serif text-noir mb-4 uppercase tracking-widest leading-none">
              {step.title}
            </h4>
            <div className="w-8 h-[1px] bg-gold mx-auto mb-6" />
            <p className="text-noir/50 text-sm font-light leading-relaxed max-w-[280px] mx-auto">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

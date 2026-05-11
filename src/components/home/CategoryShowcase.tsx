"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    title: "HAIR COLLECTION",
    subtitle: "Wigs ∙ Weaves ∙ Extensions",
    badge: "120+ Products",
    image: "/hair.jpg",
    href: "/hair",
  },
  {
    title: "NAIL STUDIO",
    subtitle: "Press-On ∙ Gel ∙ Acrylic",
    badge: "Nail Kits & Art",
    image: "/nailstudio.jpg",
    href: "/nails",
  },
  {
    title: "ACCESSORIES",
    subtitle: "Silk ∙ Vanity ∙ Makeup Tools",
    badge: "Premium Picks",
    image: "/accessories.jpg",
    href: "/accessories",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-24 px-6 lg:px-20 bg-blush">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            <Link
              href={cat.href}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-noir"
            >
              {/* Image with Hover Zoom */}
              <motion.img
                src={cat.image}
                alt={cat.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-60"
              />

              {/* Top Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-sans font-bold uppercase tracking-widest py-2 px-4 rounded-full">
                  {cat.badge}
                </span>
              </div>

              {/* Bottom Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/20 to-transparent flex flex-col justify-end p-8">
                <h3>{cat.title}</h3>
                <p className="text-ivory/70 text-sm font-sans mb-6">
                  {cat.subtitle}
                </p>

                <div className="flex items-center gap-2 text-gold font-bold text-xs tracking-tighter uppercase group">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

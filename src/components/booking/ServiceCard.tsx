"use client";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/dummy-data/products";

export const ServiceCard = ({ service }: { service: Product }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-noir/5 p-4 flex flex-col h-full hover:shadow-2xl transition-all duration-500 max-w-sm mx-auto w-full"
    >
      {/* Service Photo */}
      <div className="relative aspect-video overflow-hidden mb-5">
        <img
          src={service.images[0]}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* CRITERIA: Specific Tag Styling (Popular / New / Bridal) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {service.tags.map((tag) => {
            const isPopular = tag.toLowerCase() === "popular";
            const isNew = tag.toLowerCase() === "new";
            const isBridal = tag.toLowerCase() === "bridal";

            return (
              <span
                key={tag}
                className={`text-[7px] font-black uppercase tracking-[0.2em] px-2.5 py-1 shadow-sm backdrop-blur-md 
                ${isPopular ? "bg-gold text-white" : ""}
                ${isNew ? "bg-noir text-white" : ""}
                ${isBridal ? "bg-white/90 text-noir border border-noir/10" : ""}
                ${!isPopular && !isNew && !isBridal ? "bg-noir/60 text-white" : ""} 
                `}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>

      {/* Service Name */}
      <h3
        className="text-xl font-serif text-noir mb-2 leading-tight"
        style={{ fontFamily: "var(--font-playfair-display), serif" }}
      >
        {service.name}
      </h3>

      <div className="flex items-center justify-between mb-4">
        {/* Duration Badge */}
        <div className="flex items-center gap-1.5 text-noir/50 text-[10px] font-bold uppercase tracking-wider">
          <Clock size={12} className="text-gold" />
          {service.details[0] || "2 hours"}
        </div>

        {/* Price */}
        <div className="text-gold font-bold text-base">
          ₦{service.price.toLocaleString()}
        </div>
      </div>

      {/* Description */}
      <p className="text-noir/60 text-xs font-light leading-relaxed mb-6 line-clamp-2 italic">
        {service.description}
      </p>

      {/* CRITERIA: "Book Now" button → navigates to /booking/[serviceSlug] */}
      <Link
        href={`/booking/${service.slug}`}
        className="mt-auto flex items-center justify-between w-full border border-noir py-3 px-6 text-[9px] font-bold uppercase tracking-[0.3em] group-hover:bg-noir group-hover:text-white transition-all duration-300"
      >
        Book Now <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
};

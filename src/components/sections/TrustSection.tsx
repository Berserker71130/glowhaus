"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, RefreshCw, ShieldCheck, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Amaka J.",
    text: "The premium hair quality is unmatched. Best investment ever!",
    stars: 5,
  },
  {
    id: 2,
    name: "Tunde W.",
    text: "Fast delivery to Abuja and the packaging was pure luxury",
    stars: 5,
  },
  {
    id: 3,
    name: "Sarah L.",
    text: "Verified products only. Glowhaus is my go-to for authenticity",
    stars: 5,
  },
];

const TrustSection = () => {
  const [index, setIndex] = useState(0);

  //   Requirement: Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 border-t border-gold/10">
      {/* TESTIMONIAL CAROUSEL */}
      <div className="max-w-4xl mx-auto px-4 text-center h-[250px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[index].id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex justify-center gap-1">
              {[...Array(testimonials[index].stars)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-[#D4AF37] text-[#D4AF37]"
                />
              ))}
            </div>
            <p className="text-xl md:text-2xl font-medium text-gray-800 italic">
              "{testimonials[index].text}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="font-semibold text-gray-900">
                {testimonials[index].name}
              </span>
              <span className="text-[10px] uppercase tracking-widest bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/20">
                Verified Purchase
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TRUST/USP SECTION */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-y-0 py-12 border-y border-[#D4AF37]">
          {/* Column 1 Delivery */}
          <div className="flex flex-col items-center text-center px-4 md:border-r border-[#D4AF37]">
            <Truck
              className="text-[#D4AF37] mb-4"
              size={32}
              strokeWidth={1.2}
            />
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-900 mb-2">
              Fast Delivery
            </h4>
            <p className="text-gray-600 text-xs">
              Next day delivery within Lagos, 2-3 days nationwide
            </p>
          </div>

          {/* Column 2 Authentic  */}
          <div className="flex flex-col items-center text-center px-4 md:border-r border-[#D4AF37]">
            <ShieldCheck
              className="text-[#D4AF37] mb-4"
              size={32}
              strokeWidth={1.2}
            />
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-900 mb-2">
              100% Authentic
            </h4>
            <p className="text-gray-600 text-xs">
              All products are geniune and quality-verified
            </p>
          </div>

          {/* Column 3: Returns */}
          <div className="flex flex-col items-center text-center px-4 md:border-r border-[#D4AF37]">
            <RefreshCw
              className="text-[#D4AF37] mb-4"
              size={32}
              strokeWidth={1.2}
            />
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-900 mb-2">
              Easy Returns
            </h4>
            <p className="text-gray-600 text-xs">
              14-day hassle-free return policy
            </p>
          </div>

          {/* Column 4: Loyalty */}
          <div className="flex flex-col items-center text-center px-4 md:border-r border-[#D4AF37]">
            <Gem className="text-[#D4AF37] mb-4" size={32} strokeWidth={1.2} />
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-900 mb-2">
              Loyalty Rewards
            </h4>
            <p className="text-gray-600 text-xs">
              Earn points on every purchase
            </p>
          </div>
        </div>
      </div>

      {/* INSTAGRAM FEED STRIP (Stripped & Cleaned) */}
      <div className="mt-24">
        <div className="flex flex-col items-center mb-10">
          <div className="h-[1px] w-12 bg-[#D4AF37] mb-4"></div>
          <h4 className="text-[11px] font-bold tracking-[0.4em] text-gray-900 uppercase">
            On the Gram
          </h4>
        </div>

        <div className="max-w-[1400px] mx-auto px-4">
          {/* We removed bg-white here. Now it uses the Global Ivory */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 p-2 border border-[#D4AF37]/30">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="relative group aspect-square overflow-hidden border border-[#D4AF37]/10"
              >
                <img
                  src={`https://picsum.photos/400/400?random=${item}`} // Used a different source for variety
                  alt="GlowHaus Aesthetic"
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-white backdrop-blur-[1px]">
                  <FaInstagram size={20} strokeWidth={1.5} />
                  <p className="text-[8px] font-bold mt-2 tracking-[0.3em] uppercase">
                    Shop Look
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12 pb-10">
          <button className="px-8 py-3 border border-gray-900 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gray-900 hover:text-white transition-all duration-500 flex items-center gap-3 bg-transparent">
            <FaInstagram size={14} />
            Follow @GLOWHAUS
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

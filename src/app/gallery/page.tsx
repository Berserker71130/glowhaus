"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gallery } from "@/lib/dummy-data";
import GalleryCard from "@/components/product/GalleryCard";
import Lightbox from "@/components/product/Lightbox";

const CATEGORIES = ["All", "Hair", "Nails", "Makeup", "Accessories"];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return gallery;
    return gallery.filter(
      (item) => item.category === activeFilter.toLocaleLowerCase(),
    );
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[#FCFAFA] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <header className="text-center mb-16">
          {" "}
          {/* Fixed your 'nb-16' typo to 'mb-16' here too! */}
          <h1 className="font-serif text-5xl md:text-8xl text-noir mb-4">
            The GlowHaus Gallery
          </h1>
          <p className="text-noir/50 tracking-[0.3em] uppercase text-[10px] font-bold">
            Real results from real clients
          </p>
        </header>

        {/* FILTERS SECTION ... (Keep your code as it is) */}

        {/* MASONRY CARDS */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => setSelectedIdx(index)}
            />
          ))}
        </div>

        {/* --- GALLERY FOOTER --- */}
        <section className="mt-32 mb-12 py-20 border-t border-noir/5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <div className="space-y-3">
              <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">
                Join the Lookbook
              </span>
              <h2 className="font-serif italic text-4xl md:text-5xl text-noir">
                Submit Your Look
              </h2>
              <p className="text-noir/50 text-sm md:text-base leading-relaxed max-w-md mx-auto font-medium">
                Tag us <span className="text-noir font-bold">@GLOWHAUS</span> on
                Instagram for a chance to be featured in our official gallery.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <a
                href="https://instagram.com/glowhaus"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 bg-noir text-white px-10 py-5 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-noir/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 font-black uppercase text-[10px] tracking-[0.2em]">
                  Follow & Tag @GLOWHAUS
                </span>
                <div className="relative z-10 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-gold group-hover:text-noir transition-all">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </a>
              <p className="text-[9px] font-black text-gold uppercase tracking-[0.5em]">
                #GlowHausMuse
              </p>
            </div>
          </motion.div>
        </section>

        {/* LIGHTBOX PORTAL */}
        <AnimatePresence>
          {selectedIdx !== null && (
            <Lightbox
              items={filteredItems}
              currentIdx={selectedIdx}
              onClose={() => setSelectedIdx(null)}
              setIndex={setSelectedIdx}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

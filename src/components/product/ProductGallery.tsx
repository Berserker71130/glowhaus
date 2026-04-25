"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface GalleryProps {
  images: string[];
  badges: string[];
}

export default function ProductGallery({ images, badges }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Sync index when swiping on mobile
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  // Handle click on thumbnails
  const handleThumbClick = (index: number) => {
    setSelectedIndex(index);
    if (emblaApi) emblaApi.scrollTo(index);
  };

  // --- Zoom Logic ---
  const [zoomStyle, setZoomStyle] = useState({
    display: "none",
    backgroundPosition: "0% 0%",
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({ display: "block", backgroundPosition: `${x}% ${y}%` });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Main Image Container (Large, Square) */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden group cursor-zoom-in">
        {/* 6. Badges top-left */}
        <div className="absolute top-4 left-4 z-30 flex flex-col gap-2 pointer-events-none">
          {badges?.map((badge) => (
            <span
              key={badge}
              className="bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* 7. Wishlist button top-right */}
        <button className="absolute top-4 right-4 z-30 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform">
          <Heart
            size={20}
            className="text-gray-400 hover:text-red-500 transition-colors"
          />
        </button>

        {/* 5. Mobile Swipe Carousel (Embla Viewport) */}
        <div className="h-full w-full" ref={emblaRef}>
          <div className="flex h-full w-full">
            {images.map((img, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] min-w-0 relative h-full w-full"
                ref={i === selectedIndex ? containerRef : null}
                onMouseMove={i === selectedIndex ? handleMouseMove : undefined}
                onMouseLeave={() =>
                  setZoomStyle({ ...zoomStyle, display: "none" })
                }
              >
                {/* 3. Crossfade with Framer Motion */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-full w-full"
                  >
                    <img
                      src={images[selectedIndex]}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />

                    {/* 4. Zoom on hover Overlay */}
                    <div
                      className="absolute inset-0 z-10 pointer-events-none hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        ...zoomStyle,
                        backgroundImage: `url(${images[selectedIndex]})`,
                        backgroundSize: "250%",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Thumbnail Strip (4 visible, scroll if more) */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => handleThumbClick(i)}
            className={`relative w-24 h-24 flex-shrink-0 border-2 transition-all ${
              selectedIndex === i
                ? "border-[#D4AF37]"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={img}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

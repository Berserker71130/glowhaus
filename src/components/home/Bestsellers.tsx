"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

const BESTSELLER_PRODUCTS = [
  {
    id: 1,
    name: "Velvet Lace Front",
    price: "₦145,000",
    rating: 5,
    reviews: 48,
    img: "https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=800&auto=format&fit=crop",
    isBestSeller: true,
  },
  {
    id: 2,
    name: "Midnight Silk Bundle",
    price: "₦85,000",
    rating: 4,
    reviews: 32,
    img: "https://images.unsplash.com/photo-1595475243692-3a99d72ad5d3d?q=80&w=800&auto=format&fit=crop",
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Chrome Press-On Kit",
    price: "₦12,500",
    rating: 5,
    reviews: 120,
    img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800&auto=format&fit=crop",
    isBestSeller: true,
  },
  {
    id: 4,
    name: "Gold Vanity Mirror",
    price: "₦45,000",
    rating: 5,
    reviews: 15,
    img: "https://images.unsplash.com/photo-1554050857-c84a8babb521?q=80&w=800&auto=format&fit=crop",
    isBestSeller: true,
  },
];

export default function BestSellers() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: false,
      dragFree: true,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ],
  );

  // --- THE JUMPSTART LOGIC ---
  useEffect(() => {
    if (!emblaApi) return;

    //This listenier waits for the window to be ready
    const syncCarousel = () => {
      emblaApi.reInit();
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) autoplay.play();
    };

    //Run immediately and again after a small delay to catch the full screen render
    syncCarousel();
    const timer = setTimeout(syncCarousel, 500);

    return () => clearTimeout(timer);
  }, [emblaApi]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  return (
    // CONTRAST FIX: Changed bg from #F4F4F2 to #EDECE8 (slightly darker stone)
    <section className="py-24 px-6 lg:px-20 bg-ivory">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 max-w-7xl mx-auto">
        <div>
          <span className="text-gold font-bold text-[10px] tracking-[0.3em] uppercase mb-4 block">
            ✦ CUSTOMER FAVOURITES
          </span>
          <h2 className="text-4xl lg:text-5xl font-display text-noir mb-4">
            Our Bestsellers
          </h2>
          <p className="text-noir/60 font-sans max-w-md">
            The products our clients keep coming back for.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/shop"
            className="text-noir font-bold text-xs uppercase tracking-widest border-b-2 border-gold pb-1 hover:text-gold transition-colors"
          >
            View All →
          </Link>
          <div className="hidden md:flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold bg-white hover:bg-gold hover:text-white transition-all shadow-md active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold bg-white hover:bg-gold hover:text-white transition-all shadow-md active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        ref={emblaRef}
      >
        <div className="flex -ml-6">
          {/* STEP 1: Duplicate the array so it has 8 items instead of 4 */}
          {[...BESTSELLER_PRODUCTS, ...BESTSELLER_PRODUCTS].map(
            (product, index) => (
              <div
                // STEP 2: Change key to use the index so React doesn't complain about duplicates
                key={`${product.id}-${index}`}
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_24%] min-w-0 pl-6 pb-12"
              >
                {/* STEP 3: Change bg-ivory/20 to bg-white (This fixes the blending!) */}
                <div className="group relative bg-white rounded-xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-taupe/10 transition-all duration-500 hover:border-gold/30">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#EAEAEA]">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    <div className="absolute top-4 left-4 bg-rose-deep text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm shadow-sm">
                      Bestseller
                    </div>

                    {/* HOVER ACTIONS */}
                    <div className="absolute inset-0 bg-noir/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                      <button className="bg-white p-4 rounded-full text-noir hover:bg-gold hover:text-white transition-all shadow-xl translate-y-6 group-hover:translate-y-0 duration-300">
                        <ShoppingBag size={20} />
                      </button>
                      <button className="bg-white p-4 rounded-full text-noir hover:bg-gold hover:text-white transition-all shadow-xl translate-y-6 group-hover:translate-y-0 duration-500">
                        <Heart size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 px-1 pb-2 text-left">
                    <h3 className="font-display text-xl text-noir mb-2 font-semibold italic">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < product.rating ? "#D4AF37" : "none"}
                          className={
                            i < product.rating ? "text-gold" : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="text-[10px] text-noir/40 ml-1 font-sans">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gold font-bold font-sans text-lg tracking-tight">
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

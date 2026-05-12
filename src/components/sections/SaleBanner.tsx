"use client";
import React, { useState, useEffect } from "react";
import CountdownUnit from "../ui/CountdownUnit";

const SALE_ITEMS = [
  {
    id: 1,
    name: "Brazilian Silk",
    price: "₦145,000",
    salePrice: "₦110,000",
    img: "/brazilliansilkstraight.webp",
  },
  {
    id: 2,
    name: "Chrome Tips",
    price: "₦12,500",
    salePrice: "₦8,500",
    img: "/midnightchrometips.jpg",
  },
  {
    id: 4,
    name: "Gold Cuff",
    price: "₦15,000",
    salePrice: "₦10,000",
    img: "/goldplatedhaircuffs.jpg",
  },
];

export default function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    DAYS: 0,
    HRS: 0,
    MINS: 0,
    SECS: 0,
  });

  useEffect(() => {
    const targetDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) return clearInterval(interval);

      setTimeLeft({
        DAYS: Math.floor(distance / (1000 * 60 * 60 * 24)),
        HRS: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        MINS: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        SECS: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    /* Since this is already bg-noir, we just ensure it transitions smoothly and 
       maybe deepens slightly in true dark mode if needed. */
    <section className="bg-noir dark:bg-[#050505] py-24 px-6 lg:px-20 border-y border-gold/10 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* LEFT: TEXT & TIMER */}
        <div className="text-center lg:text-left space-y-10 flex-1">
          <h2 className="text-5xl lg:text-7xl font-display text-white leading-tight">
            UP TO <span className="text-gold italic">40% OFF</span> <br />
            <span className="text-2xl md:text-3xl uppercase tracking-[0.2em] font-sans text-ivory/60 transition-colors duration-500">
              End of Season Sale
            </span>
          </h2>

          <div className="flex justify-center lg:justify-start gap-4 md:gap-6">
            <CountdownUnit value={timeLeft.DAYS} label="DAYS" />
            <CountdownUnit value={timeLeft.HRS} label="HRS" />
            <CountdownUnit value={timeLeft.MINS} label="MINS" />
            <CountdownUnit value={timeLeft.SECS} label="SECS" />
          </div>

          <button className="bg-gold text-noir font-bold px-12 py-5 uppercase text-xs tracking-widest hover:bg-ivory dark:hover:bg-gold/90 transition-all duration-500 shadow-gold active:scale-95">
            Shop the Sale →
          </button>
        </div>

        {/* RIGHT: MINI SALE CAROUSEL */}
        <div className="w-full lg:w-[400px] space-y-4">
          {SALE_ITEMS.map((item) => (
            <div
              key={item.id}
              /* Enhanced the white/5 to white/10 in dark mode for better card definition */
              className="bg-white/5 dark:bg-white/[0.08] border border-white/10 dark:border-gold/20 p-4 rounded-xl backdrop-blur-md hover:border-gold/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt="sale item"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-ivory font-display italic text-lg">
                    {item.name}
                  </h4>
                  <div className="flex gap-3 items-center mt-1">
                    <span className="text-gold font-bold">
                      {item.salePrice}
                    </span>
                    <span className="text-ivory/20 line-through text-xs">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

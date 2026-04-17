"use client";
import React, { useState, useEffect } from "react";
import CountdownUnit from "../ui/CountdownUnit";

const SALE_ITEMS = [
  {
    id: 1,
    name: "Brazilian Silk",
    price: "₦145,000",
    salePrice: "₦110,000",
    img: "https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=200",
  },
  {
    id: 2,
    name: "Chrome Tips",
    price: "₦12,500",
    salePrice: "₦8,500",
    img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=200",
  },
  {
    id: 4,
    name: "Gold Cuff",
    price: "₦15,000",
    salePrice: "₦10,000",
    img: "https://images.unsplash.com/photo-1554050857-c84a8babb521?q=80&w=200",
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
    <section className="bg-noir py-24 px-6 lg:px-20 border-y border-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* LEFT: TEXT & TIMER */}
        <div className="text-center lg:text-left space-y-10 flex-1">
          <h2 className="text-5xl lg:text-7xl font-display text-white leading-tight">
            UP TO <span className="text-gold italic">40% OFF</span> <br />
            <span className="text-2xl md:text-3xl uppercase tracking-[0.2em] font-sans text-white/60">
              End of Season Sale
            </span>
          </h2>

          <div className="flex justify-center lg:justify-start gap-4 md:gap-6">
            <CountdownUnit value={timeLeft.DAYS} label="DAYS" />
            <CountdownUnit value={timeLeft.HRS} label="HRS" />
            <CountdownUnit value={timeLeft.MINS} label="MINS" />
            <CountdownUnit value={timeLeft.SECS} label="SECS" />
          </div>

          <button className="bg-gold text-noir font-bold px-12 py-5 uppercase text-xs tracking-widest hover:bg-white transition-all duration-500 shadow-xl">
            Shop the Sale →
          </button>
        </div>

        {/* RIGHT: MINI SALE CAROUSEL */}
        <div className="w-full lg:w-[400px] space-y-4">
          {SALE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md hover:border-gold/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover"
                    alt="sale item"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-display italic text-lg">
                    {item.name}
                  </h4>
                  <div className="flex gap-3 items-center mt-1">
                    <span className="text-gold font-bold">
                      {item.salePrice}
                    </span>
                    <span className="text-white/20 line-through text-xs">
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

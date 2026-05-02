"use client";
import Image from "next/image";
import { useState } from "react";

interface ComparisonSliderProps {
  before: string;
  after: string;
}

export default function ComparisonSlider({
  before,
  after,
}: ComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden group select-none">
      {/* AFTER IMAGE (The base) */}
      <Image
        src={after}
        alt="After"
        fill
        className="object-cover"
        draggable={false}
      />

      {/* BEFORE IMAGE (The overlay) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image
          src={before}
          alt="Before"
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* LABELS (Rose & Gold) */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-[#E29B9B] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
          Before
        </span>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <span className="bg-[#C5A059] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
          After
        </span>
      </div>

      {/* DRAG HANDLE LINE */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white z-30 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl border-[4px] border-noir/5">
          <div className="flex gap-1">
            <div className="w-[1px] h-3 bg-noir/20" />
            <div className="w-[1px] h-3 bg-noir/20" />
          </div>
        </div>
      </div>

      {/* INVISIBLE RANGE INPUT */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={handleMove}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
      />
    </div>
  );
}

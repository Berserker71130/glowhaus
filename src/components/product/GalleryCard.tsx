"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { GalleryItem } from "@/lib/dummy-data";
import ComparisonSlider from "./ComparisonSlider";
import { Heart, Maximize2 } from "lucide-react";

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  const [likes, setLikes] = useState(item.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); //Don't trigger the lightbox
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative break-inside-avoid mb-6 overflow-hidden rounded-sm group cursor-pointer"
    >
      {item.isBeforeAfter && item.beforeImageUrl ? (
        <ComparisonSlider before={item.beforeImageUrl} after={item.imageUrl} />
      ) : (
        <div
          className="relative aspect-[4/5] overflow-hidden bg-noir/5"
          onClick={onClick}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* HOVER OVERLAY */}
          <div className="absolute inset-0 bg-noir/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6">
            <div className="flex justify-end gap-3">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full hover:bg-gold transition-colors"
              >
                <Heart size={14} className={hasLiked ? "fill-white" : ""} />
                <span className="text-[10px] font-bold">{likes}</span>
              </button>
            </div>

            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <span className="text-gold text-[8px] font-black uppercase tracking-widest">
                  {item.category}
                </span>
                <h3 className="text-white font-serif italic text-lg leading-tight">
                  {item.title}
                </h3>
              </div>
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full hover:bg-gold transition-colors">
                <Maximize2 size={16} className="text-noir" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATIC LABEL FOR SLIDER CARDS */}
      {item.isBeforeAfter && (
        <div className="mt-4 flex justify-between items-center px-1">
          <h3 className="font-serif italic text-noir/80">{item.title}</h3>
          <div className="flex gap-4">
            <Heart
              onClick={handleLike}
              size={18}
              className={`cursor-pointer transsition-colors ${hasLiked ? "fill-gold text-gold" : "text-noir/20 hover:text-gold"}`}
            />
            <span className="text-[10px] font-bold text-noir/40">{likes}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

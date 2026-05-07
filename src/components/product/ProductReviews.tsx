"use client";

import React, { useState, useMemo } from "react";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Plus,
  X,
} from "lucide-react";
// 1. Import the Luxe Toast Engine
import { showGlowToast } from "@/lib/toast";

const DUMMY_REVIEWS = [
  {
    id: 1,
    userName: "Amina Yusuf",
    rating: 5,
    headline: "Absolutely Divine!",
    comment:
      "The GlowHaus serum has completely transformed my evening routine. My skin feels like silk.",
    date: "Oct 12, 2025",
    isVerified: true,
  },
  {
    id: 2,
    userName: "Sarah O.",
    rating: 5,
    headline: "Luxury in a bottle",
    comment:
      "I've tried many high-end brands, but this consistency is unmatched. Worth every kobo.",
    date: "Oct 10, 2025",
    isVerified: true,
  },
  {
    id: 3,
    userName: "Michael C.",
    rating: 4,
    headline: "Great results, slow shipping",
    comment:
      "The product itself is 5 stars, but it took a week to arrive in Lagos. Still highly recommend.",
    date: "Oct 08, 2025",
    isVerified: true,
  },
  {
    id: 4,
    userName: "Blessing E.",
    rating: 5,
    headline: "My new holy grail",
    comment:
      "I was skeptical at first, but after 3 days, the glow is unmistakable. I'm obsessed!",
    date: "Oct 05, 2025",
    isVerified: true,
  },
  {
    id: 5,
    userName: "David K.",
    rating: 5,
    headline: "Impressive quality",
    comment:
      "The packaging alone tells you this is premium. The actual cream is lightweight yet hydrating.",
    date: "Oct 01, 2025",
    isVerified: true,
  },
  {
    id: 6,
    userName: "Zainab A.",
    rating: 4,
    headline: "Soft and subtle",
    comment:
      "It has a very mild scent which I love. It doesn't irritate my sensitive skin at all.",
    date: "Sep 28, 2025",
    isVerified: true,
  },
  {
    id: 7,
    userName: "Chidi M.",
    rating: 5,
    headline: "Top Tier",
    comment:
      "If you are looking for that glass skin look, this is the shortcut. Buying my second bottle now.",
    date: "Sep 25, 2025",
    isVerified: true,
  },
  {
    id: 8,
    userName: "Elena R.",
    rating: 5,
    headline: "Perfect for layering",
    comment:
      "I use this under my makeup and it acts like the perfect primer. No pilling at all.",
    date: "Sep 20, 2025",
    isVerified: true,
  },
  {
    id: 9,
    userName: "Tunde W.",
    rating: 3,
    headline: "Average for me",
    comment:
      "It’s a nice moisturizer, but I haven't seen the 'miracle' glow everyone is talking about yet.",
    date: "Sep 15, 2025",
    isVerified: false,
  },
  {
    id: 10,
    userName: "Grace L.",
    rating: 5,
    headline: "Smells like a spa",
    comment:
      "Every time I put this on, I feel like I'm in a 5-star hotel. The texture is so buttery.",
    date: "Sep 10, 2025",
    isVerified: true,
  },
  {
    id: 11,
    userName: "Fola S.",
    rating: 4,
    headline: "Consistent quality",
    comment:
      "GlowHaus never misses. This is another solid addition to their lineup.",
    date: "Sep 05, 2025",
    isVerified: true,
  },
  {
    id: 12,
    userName: "Ibrahim H.",
    rating: 5,
    headline: "The best gift",
    comment:
      "Bought this for my wife and she hasn't stopped talking about it. Happy wife, happy life!",
    date: "Sep 01, 2025",
    isVerified: true,
  },
];

export default function ProductReviews({
  reviews: initialReviews,
}: {
  reviews: any[];
}) {
  const [allReviews, setAllReviews] = useState(() =>
    initialReviews?.length > 0 ? initialReviews : DUMMY_REVIEWS,
  );
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newHeadline, setNewHeadline] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newRating === 0 || newComment.length < 20) {
      alert(
        "Please ensure rating is selected and review is at least 20 chars.",
      );
      return;
    }

    const newEntry = {
      id: Date.now(),
      userName: "GlowHaus Guest",
      rating: newRating,
      headline: newHeadline || "Excellent Product",
      comment: newComment,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      isVerified: false,
    };

    setAllReviews([newEntry, ...allReviews]);
    setIsModalOpen(false);
    setNewRating(0);
    setNewHeadline("");
    setNewComment("");

    // --- TASK: TRIGGER GOLD TOAST ---
    showGlowToast({
      message: "Review submitted — thank you! ✨",
      accentColor: "#D4AF37",
      icon: "✍️",
    });
  };

  const filteredReviews = useMemo(() => {
    let result = [...allReviews];
    if (filter !== "All") {
      const starTarget = parseInt(filter);
      result =
        filter === "3★ and below"
          ? result.filter((r) => r.rating <= 3)
          : result.filter((r) => r.rating === starTarget);
    }
    if (sortBy === "Highest Rated") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "Lowest Rated") result.sort((a, b) => a.rating - b.rating);
    return result;
  }, [allReviews, filter, sortBy]);

  return (
    <section
      id="reviews"
      className="py-24 px-6 md:px-12 bg-[#F9F9F7] border-t border-[#E5E5E1]"
    >
      <div className="max-w-5xl mx-auto">
        {/* RATING SUMMARY */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center md:text-left flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-8 md:pb-0">
            <h2 className="font-serif text-7xl font-bold text-[#D4AF37] mb-2">
              4.8
            </h2>
            <div className="flex justify-center md:justify-start text-[#D4AF37] mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  fill={i < 4 ? "currentColor" : "none"}
                />
              ))}
            </div>
            <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-medium">
              Based on 246 reviews
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-all duration-300 shadow-xl"
            >
              <Plus size={16} /> Write a Review
            </button>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            {[
              { s: 5, p: 78 },
              { s: 4, p: 14 },
              { s: 3, p: 5 },
              { s: 2, p: 2 },
              { s: 1, p: 1 },
            ].map((item) => (
              <div
                key={item.s}
                className="flex items-center gap-4 text-[10px] font-bold text-gray-500"
              >
                <span className="w-6">{item.s}★</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D4AF37]"
                    style={{ width: `${item.p}%` }}
                  />
                </div>
                <span className="w-8 text-right text-black">{item.p}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-6 mb-10 gap-4">
          <div className="flex gap-2">
            {["All", "5★", "4★", "3★ and below"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${filter === f ? "bg-black text-white" : "bg-white text-gray-400 border border-gray-100 hover:border-black"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredReviews.slice(0, visibleCount).map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                    {review.date}
                  </span>
                </div>
                <h4 className="font-bold text-sm mb-2">{review.headline}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-black">
                    {review.userName}
                  </span>
                  {review.isVerified && (
                    <CheckCircle2 size={14} className="text-green-500" />
                  )}
                </div>
                <div className="flex gap-3 text-gray-300">
                  <ThumbsUp
                    size={14}
                    className="hover:text-black cursor-pointer"
                  />
                  <ThumbsDown
                    size={14}
                    className="hover:text-black cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredReviews.length && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-12 py-4 border border-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="font-serif text-3xl italic mb-8">Write a Review</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest mb-3 block font-bold text-black">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(s)}
                    >
                      <Star
                        size={28}
                        fill={
                          (hoverRating || newRating) >= s ? "#D4AF37" : "none"
                        }
                        className={
                          (hoverRating || newRating) >= s
                            ? "text-[#D4AF37]"
                            : "text-gray-200"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                placeholder="Review Headline"
                value={newHeadline}
                onChange={(e) => setNewHeadline(e.target.value)}
                className="w-full border border-gray-100 bg-gray-50 rounded-xl p-4 text-sm outline-none"
              />
              <textarea
                placeholder="Share your experience (min 20 characters)..."
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full border border-gray-100 bg-gray-50 rounded-xl p-4 text-sm outline-none"
              />
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 text-[10px] uppercase tracking-widest border border-gray-200 text-gray-500 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-4 text-[10px] uppercase tracking-widest bg-black text-white rounded-xl hover:bg-[#D4AF37] transition-all font-bold"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

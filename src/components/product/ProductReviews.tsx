"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";

export default function ProductReviews({ reviews }: { reviews: any[] }) {
  return (
    <section
      id="reviews"
      className="py-20 px-6 md:px-12 bg-white border-t border-gray-100"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl italic text-black mb-12 text-center">
          Client Experiences
        </h2>

        <div className="space-y-12">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-50 pb-12 last:border-0"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {/* MATCHING YOUR DATA: review.userName */}
                      <span className="font-bold text-[11px] uppercase tracking-widest text-black">
                        {review.userName}
                      </span>
                      {review.isVerified && (
                        <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={10} />
                          <span className="text-[8px] uppercase font-bold tracking-tighter">
                            Verified
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          fill={i < review.rating ? "currentColor" : "none"}
                          stroke="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                  {/* MATCHING YOUR DATA: review.date */}
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest">
                    {review.date}
                  </span>
                </div>
                {/* MATCHING YOUR DATA: review.comment */}
                <p className="text-gray-600 text-sm leading-relaxed italic font-light">
                  "{review.comment}"
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 italic">
                No reviews yet for this specific product.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

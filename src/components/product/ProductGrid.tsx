"use client";

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="group cursor-pointer">
          <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden mb-5">
            <img
              src={`https://images.unsplash.com/photo-1595476108010-b19086dd12bb?auto=format&fit=crop&w=600&q=80&sig=${i}`}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              alt="GlowHaus Product"
            />
            {/* BADGES */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-black text-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest">
                New Arrival
              </span>
              {i % 2 === 0 && (
                <span className="bg-[#D4AF37] text-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest">
                  Bestseller
                </span>
              )}
            </div>
          </div>
          <h3 className="font-serif text-lg text-gray-900 group-hover:text-[#D4AF37] transition-colors">
            Premium Virgin Bundle {i}
          </h3>
          <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mt-1">
            ₦45,000
          </p>
        </div>
      ))}
    </div>
  );
}

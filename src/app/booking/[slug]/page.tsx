"use client";
import { use } from "react"; // Import the 'use' hook
import { products } from "@/lib/dummy-data/products";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, ShieldCheck } from "lucide-react";

// 1. Update the type to reflect that params is a Promise
export default function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();

  // 2. Unwrap the params promise using 'use'
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  // 3. Now find the service using the unwrapped slug
  const service = products.find((p) => p.slug === slug);

  if (!service) notFound();

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Navigation Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-noir/40 hover:text-noir transition-colors mb-12 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Back to Services
          </span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Service Preview */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-2xl border border-noir/5">
                <img
                  src={service.images[0]}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-noir shadow-xl">
                    {service.tags[0]}
                  </span>
                </div>
              </div>
              <h1 className="text-4xl font-serif text-noir mb-4">
                {service.name}
              </h1>
              <div className="flex items-center gap-6 text-noir/60 mb-6">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gold" />
                  <span className="text-sm font-medium">
                    {service.details[0]}
                  </span>
                </div>
                <div className="text-lg font-serif italic text-gold">
                  ₦{service.price.toLocaleString()}
                </div>
              </div>
              <p className="text-noir/60 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          </div>

          {/* Right: Booking Interface */}
          <div className="lg:col-span-7 bg-noir/[0.02] border border-noir/5 p-8 md:p-12">
            <div className="mb-10">
              <h2 className="text-2xl font-serif text-noir mb-2">
                Secure Your Slot
              </h2>
              <p className="text-noir/40 text-xs uppercase tracking-widest">
                Select your preferred date & time
              </p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-white border border-noir/10 text-center space-y-2">
                  <span className="text-[10px] font-bold text-noir/30 uppercase tracking-tighter">
                    Date Selection
                  </span>
                  <p className="text-xs italic text-noir/40">
                    Calendar Integration Pending...
                  </p>
                </div>
                <div className="p-6 bg-white border border-noir/10 text-center space-y-2">
                  <span className="text-[10px] font-bold text-noir/30 uppercase tracking-tighter">
                    Time Slot
                  </span>
                  <p className="text-xs italic text-noir/40">
                    Automated Syncing...
                  </p>
                </div>
              </div>

              <div className="border-t border-noir/5 pt-8">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
                  Why Book With Us?
                </h3>
                <div className="grid gap-4">
                  {[
                    "Instant Confirmation via Email",
                    "Certified Professional Stylists",
                    "Premium Luxury Products Used",
                    "Strict Hygiene & Safety Protocols",
                  ].map((text) => (
                    <div
                      key={text}
                      className="flex items-center gap-3 text-sm text-noir/70"
                    >
                      <CheckCircle2 size={16} className="text-gold" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full bg-noir text-white py-6 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-colors flex items-center justify-center gap-3">
                Confirm Appointment <ShieldCheck size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

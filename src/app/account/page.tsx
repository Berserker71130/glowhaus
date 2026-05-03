"use client";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Package,
  ShoppingBag,
  Star,
} from "lucide-react";

export default function DashboardPage() {
  const { displayName, points, tier, wishlistItems, bookingHistory } =
    useStore();

  const nextAppt = bookingHistory[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* WELCOME BANNER */}
      <section>
        <h1 className="font-serif text-5xl text-noir mb-3 italic">
          Good morning, {displayName.split("")[0]!}
        </h1>
        <p className="text-noir/40 text-sm tracking-wide">
          Manage your aesthetic journey and loyalty rewards.
        </p>
      </section>

      {/* 4 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Orders"
          value={bookingHistory.length + 12}
          icon={<ShoppingBag size={20} />}
        />
        <StatCard
          label="GlowPoints"
          value={points.toLocaleString() || "1,250"}
          icon={<Star size={20} />}
        />
        <StatCard
          label="Wishlist Items"
          value={wishlistItems.length}
          icon={<Heart size={20} />}
        />
        <StatCard
          label="Next Appointment"
          value={nextAppt?.date || "Mar 15"}
          icon={<Calendar size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT ORDERS */}
        <div className="lg:col-span-2 bg-white rounded-[2.5em] border border-noir/5 p-10 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-serif text-2xl text-noir">Recent Orders</h3>
            <Link
              href="/account/orders"
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gold hover:text-noir transition-all"
            >
              View All Orders{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-2 transition-transform"
              />
            </Link>
          </div>

          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-noir/5 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[#F9F9F9] rounded-2xl flex items-center justify-center text-noir/20">
                    <Package size={28} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-noir mb-1">
                      Order #GH-990{i}
                    </p>
                    <p className="text-xs text-noir/40 font-medium">
                      Feb {18 - i}, 2026 • 2 Items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm font-serif text-noir mb-1">
                      ₦{(45000 * i).toLocaleString()}
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest">
                      <CheckCircle2 size={10} /> Delivered
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDE COLUMN: APPOINTMENT & LOYALTY */}
        <div className="space-y-8">
          {/* UPCOMING APPOINTMENT */}
          <div className="bg-noir text-white rounded-[2.5em] p-10 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 blur-3xl rounded-full group-hover:bg-gold/20 transition-all duration-700" />

            <div className="flex items-center gap-2 text-gold mb-8">
              <Clock size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Next Session
              </span>
            </div>

            <h4 className="font-serif text-3xl mb-2">
              {nextAppt?.service?.name || "Get Manicure"}
            </h4>
            <p className="text-white/40 text-xs mb-8 font-medium">
              Elite Studio • Room 04
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex justify-between text-[11px] border-b border-white/10 pb-2">
                <span className="text-white/30 uppercase tracking-widest">
                  Date & Time
                </span>
                <span className="font-bold text-gold">
                  {nextAppt?.date || "Mar 15"} • 10:30AM
                </span>
              </div>
              <div className="flex justify-between text-[11px] border-b border-white/10 pb-2">
                <span className="text-white/30 uppercase tracking-widest">
                  Service Fee
                </span>
                <span className="font-bold">₦25,000</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-white text-noir text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gold transition-colors">
                View Details
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Confirm cancellation?"))
                    alert("Cancelled");
                }}
                className="w-full py-4 bg-transparent border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:text-rose-500 hover:border-rose-500/30 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* LOYALTY SNAPSHOT */}
          <div className="bg-gold p-10 rounded-[2.5em] text-noir">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60">
              Status
            </p>
            <h4 className="font-serif text-3xl mb-6">{tier} Member</h4>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1 opacity-60">
                  Balance
                </p>
                <p className="text-3xl font-serif">{points} pts</p>
              </div>
              <Link
                href="/loyalty"
                className="p-3 bg-noir text-white rounded-2xl hover:scale-110 transition-transform"
              >
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

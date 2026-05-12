"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";
import { CalendarIcon, Clock, RefreshCcw, Star, User } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

export default function AppointmentsPage() {
  const { bookingHistory, setAppointmentRating, rebookService } = useStore();
  const router = useRouter();

  const handleRebook = (service: any) => {
    rebookService(service);
    router.push("/booking");
  };

  return (
    /* SURGERY: Theme-aware background and transition */
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-noir pt-32 pb-20 px-6 transition-colors duration-500">
      <div className="w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* text-black -> dark:text-ivory */}
            <h1 className="font-serif text-5xl text-black dark:text-ivory mb-3 uppercase tracking-tight transition-colors">
              My Appointments
            </h1>
            <p className="text-sm text-muted-foreground dark:text-ivory/40 italic">
              Manage your beauty sessions and review your transformation
              history.
            </p>
          </div>

          {bookingHistory.length > 0 && (
            <button
              onClick={() => router.push("/booking")}
              className="bg-[#D4AF37] text-white px-10 py-4 rounded-full font-bold text-xs hover:bg-black dark:hover:bg-ivory dark:hover:text-black transition-all shadow-xl shadow-[#D4AF37]/20 uppercase tracking-[0.2em]"
            >
              Book New Session
            </button>
          )}
        </header>

        {/* SURGERY: Table container now supports dark mode glassmorphism */}
        <div className="bg-white dark:bg-white/[0.03] border border-[#D4AF37]/10 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-sm transition-all">
          {bookingHistory.length === 0 ? (
            <div className="py-32">
              <EmptyState
                icon="calendar"
                title="No bookings yet"
                subtitle="Your luxury journey starts here. Ready for a transformation? Book your next session with our beauty experts."
                ctaText="Book a Service"
                ctaLink="/booking"
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  {/* bg-[#FCF9F2]/50 -> dark:bg-white/5 */}
                  <tr className="bg-[#FCF9F2]/50 dark:bg-white/5 border-b border-[#D4AF37]/5 dark:border-white/10">
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60 dark:text-ivory/60">
                      Service & Stylist
                    </th>
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60 dark:text-ivory/60">
                      Schedule
                    </th>
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60 dark:text-ivory/60">
                      Status
                    </th>
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60 dark:text-ivory/60">
                      Feedback
                    </th>
                    <th className="p-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4AF37]/5 dark:divide-white/5">
                  {bookingHistory.map((appt) => (
                    <tr
                      key={appt.id}
                      /* Hover effect updated for dark mode */
                      className="hover:bg-[#FCF9F2]/30 dark:hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-8">
                        <p className="font-serif text-xl text-black dark:text-ivory mb-1 uppercase tracking-wide">
                          {appt.service.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-ivory/40">
                          <User size={12} className="text-[#D4AF37]" />
                          <span>
                            Stylist:{" "}
                            <span className="text-black dark:text-ivory font-semibold">
                              {appt.stylist.name}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="p-8 text-sm">
                        <div className="space-y-1">
                          <p className="font-medium flex items-center gap-2 uppercase text-black dark:text-ivory">
                            <CalendarIcon
                              size={14}
                              className="text-[#D4AF37]"
                            />{" "}
                            {appt.date}
                          </p>
                          <p className="text-muted-foreground dark:text-ivory/40 flex items-center gap-2 pl-5">
                            <Clock size={14} /> {appt.time}
                          </p>
                        </div>
                      </td>
                      <td className="p-8">
                        {/* Status Badge styling for dark mode */}
                        <Badge className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none">
                          {appt.status}
                        </Badge>
                      </td>
                      <td className="p-8">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={`${
                                star <= (appt.rating || 0)
                                  ? "fill-[#D4AF37] text-[#D4AF37]"
                                  : "text-[#F2EDE4] dark:text-white/10"
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-8 text-right">
                        <button
                          onClick={() => handleRebook(appt.service)}
                          className="opacity-0 group-hover:opacity-100 bg-black dark:bg-ivory text-white dark:text-black px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-[#D4AF37] dark:hover:bg-gold"
                        >
                          Rebook
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

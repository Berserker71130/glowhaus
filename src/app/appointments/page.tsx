"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";
import { CalendarIcon, Clock, RefreshCcw, Star, User } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

export default function AppointmentsPage() {
  const { bookingHistory, setAppointmentRating, rebookService } = useStore();
  const testHistory = [];
  const router = useRouter();

  const handleRebook = (service: any) => {
    rebookService(service);
    router.push("/booking");
  };

  return (
    /* STANDALONE WRAPPER: Includes pt-32 to clear the main Navbar */
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-6">
      <div className="w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-5xl text-black mb-3 uppercase tracking-tight">
              My Appointments
            </h1>
            <p className="text-sm text-muted-foreground italic">
              Manage your beauty sessions and review your transformation
              history.
            </p>
          </div>

          {bookingHistory.length > 0 && (
            <button
              onClick={() => router.push("/booking")}
              className="bg-[#D4AF37] text-white px-10 py-4 rounded-full font-bold text-xs hover:bg-black transition-all shadow-xl shadow-[#D4AF37]/20 uppercase tracking-[0.2em]"
            >
              Book New Session
            </button>
          )}
        </header>

        <div className="bg-white border border-[#D4AF37]/10 rounded-[2.5rem] overflow-hidden shadow-sm">
          {bookingHistory.length === 0 ? (
            /* --- LUXURY EMPTY STATE --- */
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
                  <tr className="bg-[#FCF9F2]/50 border-b border-[#D4AF37]/5">
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
                      Service & Stylist
                    </th>
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
                      Schedule
                    </th>
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
                      Status
                    </th>
                    <th className="p-8 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
                      Feedback
                    </th>
                    <th className="p-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4AF37]/5">
                  {bookingHistory.map((appt) => (
                    <tr
                      key={appt.id}
                      className="hover:bg-[#FCF9F2]/30 transition-colors group"
                    >
                      <td className="p-8">
                        <p className="font-serif text-xl text-black mb-1 uppercase tracking-wide">
                          {appt.service.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User size={12} className="text-[#D4AF37]" />
                          <span>
                            Stylist:{" "}
                            <span className="text-black font-semibold">
                              {appt.stylist.name}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="p-8 text-sm">
                        <div className="space-y-1">
                          <p className="font-medium flex items-center gap-2 uppercase">
                            <CalendarIcon
                              size={14}
                              className="text-[#D4AF37]"
                            />{" "}
                            {appt.date}
                          </p>
                          <p className="text-muted-foreground flex items-center gap-2 pl-5">
                            <Clock size={14} /> {appt.time}
                          </p>
                        </div>
                      </td>
                      <td className="p-8">
                        <Badge className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600">
                          {appt.status}
                        </Badge>
                      </td>
                      <td className="p-8">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={`${star <= (appt.rating || 0) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#F2EDE4]"}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-8 text-right">
                        <button
                          onClick={() => handleRebook(appt.service)}
                          className="opacity-0 group-hover:opacity-100 bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-[#D4AF37]"
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

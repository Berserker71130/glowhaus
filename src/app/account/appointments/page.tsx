"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";
import { CalendarIcon, Clock, RefreshCcw, Star, User } from "lucide-react";

export default function AppointmentsPage() {
  // Pulling only what we need from the Luxe Store
  const { bookingHistory, setAppointmentRating, rebookService } = useStore();
  const router = useRouter();

  const handleRebook = (service: any) => {
    // This sets the store state for the next booking
    rebookService(service);
    // Redirects to the booking flow
    router.push("/booking");
    // NOTE: The "Booking Confirmed" toast will fire from the Store
    // once the user completes the final step in the booking flow.
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-8 px-4 md:px-10 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-[#1A1A1A] mb-2 uppercase tracking-tight">
            My Appointments
          </h1>
          <p className="text-muted-foreground italic">
            Manage your beauty sessions and provide feedback...
          </p>
        </div>
        <button
          onClick={() => router.push("/booking")}
          className="bg-[#D4AF37] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-black transition-all shadow-lg shadow-[#D4AF37]/20 uppercase tracking-widest"
        >
          Book New Session
        </button>
      </header>

      <div className="bg-white border border-[#D4AF37]/10 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FCF9F2]/50 border-b border-[#D4AF37]/5">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
                  Service & Stylist
                </th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
                  Schedule
                </th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
                  Price
                </th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
                  Status
                </th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
                  Feedback
                </th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/5">
              {bookingHistory.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-20 text-center text-muted-foreground italic font-serif"
                  >
                    No appointment history found. Your luxury journey starts
                    here.
                  </td>
                </tr>
              ) : (
                bookingHistory.map((appt) => (
                  <tr
                    key={appt.id}
                    className="hover:bg-[#FCF9F2]/30 transition-colors group"
                  >
                    {/* Service & Stylist */}
                    <td className="p-6">
                      <p className="font-serif text-lg text-black mb-1 uppercase tracking-wide">
                        {appt.service.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                          <User size={10} />
                        </div>
                        <span className="flex gap-1">
                          Stylist:
                          <span className="text-black font-semibold">
                            {appt.stylist.name}
                          </span>
                        </span>
                      </div>
                    </td>

                    {/* Schedule */}
                    <td className="p-6 text-sm">
                      <div className="space-y-1">
                        <p className="font-medium flex items-center gap-2 text-black uppercase tracking-tighter">
                          <CalendarIcon size={14} className="text-[#D4AF37]" />{" "}
                          {appt.date}
                        </p>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Clock size={14} /> {appt.time}
                        </p>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-6">
                      <span className="text-sm font-bold text-[#D4AF37]">
                        ₦{appt.service.price.toLocaleString()}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-6">
                      <Badge
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none ${
                          appt.status === "completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {appt.status}
                      </Badge>
                    </td>

                    {/* Feedback: CRITERIA TRIGGERED HERE */}
                    <td className="p-6">
                      {appt.status === "completed" ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() =>
                                  setAppointmentRating(appt.id, star)
                                }
                                className="transition-transform active:scale-125 hover:scale-110"
                              >
                                <Star
                                  size={16}
                                  className={`${
                                    star <= (appt.rating || 0)
                                      ? "fill-[#D4AF37] text-[#D4AF37]"
                                      : "text-[#F2EDE4] hover:text-[#D4AF37]/40"
                                  } transition-colors duration-300`}
                                />
                              </button>
                            ))}
                          </div>
                          {!appt.rating && (
                            <span className="text-[9px] uppercase font-bold text-[#D4AF37] animate-pulse tracking-[0.1em]">
                              Rate Experience
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-muted-foreground italic">
                          Available after session
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-6 text-right">
                      <button
                        onClick={() => handleRebook(appt.service)}
                        className="opacity-0 group-hover:opacity-100 flex items-center gap-2 ml-auto bg-black text-white px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-all hover:bg-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/20"
                      >
                        <RefreshCcw size={12} /> Book Again
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

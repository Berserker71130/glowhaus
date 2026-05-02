"use client";
import { useState, use, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/dummy-data";
import { notFound, useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useStore } from "@/store/useStore";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function AppointmentBookingFlow({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const service = products.find((p) => p.slug === resolvedParams.slug);

  //   Zustand Store Connection
  const {
    selectedDate,
    selectedTime,
    setDate,
    setTime,
    displayName,
    email,
    bookingPhone,
    bookingNotes,
    bookingReferral,
    setBookingPhone,
    setBookingNotes,
    setBookingReferral,
    confirmBooking,
    clearBooking,
  } = useStore();

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!service) notFound();

  // 3-step wizard with gold progress bar
  const progress = (step / 3) * 100;

  const handleFinalConfirm = () => {
    const reference = `GH-2025-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    confirmBooking({
      id: reference,
      service: {
        id: service.id,
        name: service.name,
        duration: service.details[0] || "1 Hour",
        price: service.price,
      },
      date: selectedDate!,
      time: selectedTime!,
    });

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C5A059", "#000000", "#FFFFFF"],
    });

    setIsSuccess(true);
  };

  if (isSuccess)
    return <SuccessCard serviceName={service.name} clear={clearBooking} />;

  return (
    <main className="min-h-screen bg-[#FCFAFA] pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress section */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-noir">
              Step {step} of 3
            </span>
          </div>
          <div className="h-[2px] w-full bg-noir/10 relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute top-0 left-0 h-full bg-gold"
            />
          </div>
        </div>

        {/* Step Transitions: Fraamer Motion AnimatePresence slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            {step === 1 && (
              <StepOne
                service={service}
                onNext={() => setStep(2)}
                state={{ selectedDate, setDate, selectedTime, setTime }}
              />
            )}
            {step === 2 && (
              <StepTwo
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
                form={{
                  displayName,
                  email,
                  bookingPhone,
                  setBookingPhone,
                  bookingNotes,
                  setBookingNotes,
                  bookingReferral,
                  setBookingReferral,
                }}
              />
            )}
            {step === 3 && (
              <StepThree
                service={service}
                onBack={() => setStep(2)}
                onConfirm={handleFinalConfirm}
                data={{
                  selectedDate,
                  selectedTime,
                  displayName,
                  bookingPhone,
                  email,
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

// STEP 1: Date & Time Selection
function StepOne({ service, onNext, state }: any) {
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDay = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1,
  ).getDay();

  const timeSlots = [
    "9:00AM",
    "10:00AM",
    "11:00AM",
    "12:00PM",
    "2:00PM",
    "3:00PM",
    "4:00PM",
  ];
  const bookedSlots = ["11:00AM", "3:00PM"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-white p-8 border border-noir/10 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-xl italic text-noir">
              {viewDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  setViewDate(
                    new Date(viewDate.setMonth(viewDate.getMonth() - 1)),
                  )
                }
                className="text-noir hover:text-gold"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() =>
                  setViewDate(
                    new Date(viewDate.setMonth(viewDate.getMonth() + 1)),
                  )
                }
                className="text-noir hover:text-gold"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-black tracking-widest text-noir/40 mb-4 uppercase">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array(firstDay)
              .fill(null)
              .map((_, i) => (
                <div key={i} />
              ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
              const dateKey = `${viewDate.getFullYear()}-${viewDate.getMonth() + 1}-${d}`;
              const isToday =
                d === today.getDate() &&
                viewDate.getMonth() === today.getMonth();
              const dayType = new Date(
                viewDate.getFullYear(),
                viewDate.getMonth(),
                d,
              ).getDay();
              const isUnavailable =
                dayType === 0 || dayType === 6 || d === 15 || d === 22;

              return (
                <button
                  key={d}
                  disabled={isUnavailable}
                  onClick={() => state.setDate(dateKey)}
                  className={`aspect-square text-[11px] font-bold relative flex items-center justify-center transition-all
                ${isUnavailable ? "text-noir/20 cursor-not-allowed bg-noir/[0.03]" : "text-noir hover:text-gold"}
                ${state.selectedDate === dateKey ? "bg-gold text-white" : ""}`}
                >
                  {d}
                  {isToday && (
                    <div className="absolute bottom-1 w-1 h-1 bg-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {state.selectedDate && (
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-noir/70">
              Available Slots
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((t) => {
                const isBooked = bookedSlots.includes(t);
                return (
                  <button
                    key={t}
                    disabled={isBooked}
                    onClick={() => state.setTime(t)}
                    className={`py-4 text-[10px] font-bold border transition-all
  ${isBooked ? "bg-noir/[0.05] text-noir/20 border-transparent" : "border-noir/20 text-noir hover:border-noir"}
  ${state.selectedTime === t ? "bg-gold border-gold text-white" : ""}`}
                  >
                    {isBooked ? "Booked" : t}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        <div className="bg-noir text-white p-8 space-y-6 shadow-xl">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60 border-b border-white/10 pb-4">
            Service Summary
          </p>
          <div>
            <h2 className="font-serif text-2xl mb-1">{service.name}</h2>
            <p className="text-[10px] text-white/70 italic">
              {service.details[0]}
            </p>
          </div>
          <div className="flex justify-between items-end pt-4">
            <span className="text-2xl font-serif text-gold">
              ₦{service.price.toLocaleString()}
            </span>
            <button
              disabled={!state.selectedDate || !state.selectedTime}
              onClick={onNext}
              className="bg-white text-noir px-6 py-3 text-[10px] font-black uppercase tracking-widest disabled:opacity-30 hover:bg-gold hover:text-white transition-colors flex items-center gap-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// STEP 2: Details
function StepTwo({ onNext, onBack, form }: any) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-10 border border-noir/10 shadow-lg space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-noir/70">
            Name
          </label>
          <div className="p-4 bg-noir/[0.03] border border-noir/10 text-sm font-serif italic text-noir/80 cursor-not-allowed">
            {form.displayName}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-noir/70">
            Phone Number*
          </label>
          <input
            value={form.bookingPhone}
            onChange={(e) => form.setBookingPhone(e.target.value)}
            type="tel"
            placeholder="080XXXXXXXX"
            className="w-full p-4 bg-white border border-noir/20 outline-none text-sm text-noir focus:border-gold transition-all"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[9px] font-black uppercase tracking-widest text-noir/70">
          Email
        </label>
        <div className="p-4 bg-noir/[0.03] border border-noir/10 text-sm font-serif italic text-noir/80 cursor-not-allowed">
          {form.email}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[9px] font-black uppercase tracking-widest text-noir/70">
          Any allergies or notes?
        </label>
        <textarea
          value={form.bookingNotes}
          onChange={(e) => form.setBookingNotes(e.target.value)}
          className="w-full p-4 bg-white border border-noir/20 outline-none text-sm text-noir min-h-[100px] focus:border-gold transition-all"
          placeholder="Special requests..."
        />
      </div>
      <div className="space-y-2">
        <label className="text-[9px] font-black uppercase tracking-widest text-noir/70">
          How did you hear about us?
        </label>
        <select
          value={form.bookingReferral}
          onChange={(e) => form.setBookingReferral(e.target.value)}
          className="w-full p-4 bg-white border border-noir/20 outline-none text-[10px] font-black uppercase tracking-widest text-noir focus:border-gold cursor-pointer"
        >
          <option value="">Select Option</option>
          <option value="Instagram">Instagram</option>
          <option value="TikTok">TikTok</option>
          <option value="Facebook">Facebook</option>
          <option value="Friend">Word of Mouth</option>
        </select>
      </div>
      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-noir/20 text-noir text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-noir hover:text-white transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!form.bookingPhone}
          className="flex-1 py-4 bg-noir text-white text-[10px] font-black uppercase tracking-widest disabled:opacity-30 shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// STEP 3: Review & Confirm
function StepThree({ service, onBack, onConfirm, data }: any) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-10 border border-noir/10 shadow-lg space-y-10">
        <h3 className="font-serif text-2xl italic text-center text-noir">
          Review Booking
        </h3>
        <div className="space-y-4 border-y border-noir/10 py-8">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-noir/60">
            <span>Service</span>
            <span className="text-noir font-bold">
              {service.name} ({service.details[0]})
            </span>
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-noir/60">
            <span>Date & Time</span>
            <span className="text-noir font-bold">
              {data.selectedDate} @ {data.selectedTime}
            </span>
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-noir/60">
            <span>Contact</span>
            <span className="text-noir font-bold">
              {data.displayName} • {data.bookingPhone}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-noir/40">
            Total Price
          </span>
          <span className="text-3xl font-serif text-gold">
            ₦{service.price.toLocaleString()}
          </span>
        </div>
        <div className="bg-gold/5 p-4 border-l-2 border-gold flex gap-3">
          <ShieldCheck size={16} className="text-gold" />
          <p className="text-[9px] uppercase tracking-widest text-gold font-bold leading-relaxed">
            Note: 24hr cancellation notice required.
          </p>
        </div>
      </div>
      <button
        onClick={onConfirm}
        className="w-full py-5 bg-gold text-white text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-gold/90 transition-all"
      >
        Confirm Booking
      </button>
      <button
        onClick={onBack}
        className="w-full py-2 text-[9px] font-black uppercase tracking-widest text-noir/40 hover:text-noir transition-colors"
      >
        Modify Details
      </button>
    </div>
  );
}

// SUCCESS STATE
function SuccessCard({ serviceName, clear }: any) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-lg mx-auto text-center py-20 bg-white border border-gold/20 shadow-2xl relative"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
      <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-8">
        <Check size={40} />
      </div>
      <h2 className="font-serif text-4xl italic mb-4 text-noir">
        Booking Confirmed
      </h2>
      <p className="text-xs text-noir/60 mb-8">
        Ref: GH-2025-{Math.floor(1000 + Math.random() * 9000)} • {serviceName}
      </p>
      <div className="px-12 space-y-4">
        <button className="w-full py-4 border border-noir/20 text-noir text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-noir/5 transition-all">
          <Sparkles size={14} className="text-gold" /> Add To Calendar
        </button>
        <button
          onClick={() => {
            clear();
            window.location.href = "appointments";
          }}
          className="w-full py-4 bg-noir text-white text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-noir/90 transition-all"
        >
          View My Appointments
        </button>
      </div>
    </motion.div>
  );
}

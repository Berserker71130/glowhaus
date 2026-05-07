"use client";
import { useState, use } from "react";
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
// 1. Import Luxe Toast Engine
import { showGlowToast } from "@/lib/toast";

export default function AppointmentBookingFlow({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const service = products.find((p) => p.slug === resolvedParams.slug);

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

  const progress = (step / 3) * 100;

  // --- TASK: BOOKING CONFIRMED (Gold) ---
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
      stylist: {
        id: "st_gen",
        name: "Staff Professional",
        role: "GlowHaus Specialist",
      },
      status: "upcoming",
      rating: 0,
    });

    // Fire Luxe Gold Toast per Criteria
    showGlowToast({
      message: "Your glow-up is scheduled! ✨",
      accentColor: "#C5A059",
      icon: "📅",
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

// Sub-components (StepOne, StepTwo, StepThree) - Keeping your original logic
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
              return (
                <button
                  key={d}
                  onClick={() => state.setDate(dateKey)}
                  className={`aspect-square text-[11px] font-bold relative flex items-center justify-center transition-all
                  ${state.selectedDate === dateKey ? "bg-gold text-white" : "text-noir hover:text-gold"}`}
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
              {timeSlots.map((t) => (
                <button
                  key={t}
                  onClick={() => state.setTime(t)}
                  className={`py-4 text-[10px] font-bold border transition-all
                  ${state.selectedTime === t ? "bg-gold border-gold text-white" : "border-noir/20 text-noir hover:border-noir"}`}
                >
                  {t}
                </button>
              ))}
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
              className="bg-white text-noir px-6 py-3 text-[10px] font-black uppercase tracking-widest disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepTwo({ onNext, onBack, form }: any) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-10 border border-noir/10 shadow-lg space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-noir/70">
            Name
          </label>
          <div className="p-4 bg-noir/[0.03] border border-noir/10 text-sm font-serif italic text-noir/80">
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
            className="w-full p-4 border border-noir/20 outline-none text-sm text-noir"
          />
        </div>
      </div>
      <textarea
        value={form.bookingNotes}
        onChange={(e) => form.setBookingNotes(e.target.value)}
        className="w-full p-4 border border-noir/20 outline-none text-sm min-h-[100px]"
        placeholder="Allergies or notes..."
      />
      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-noir/20 text-noir text-[10px] font-black uppercase tracking-widest"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!form.bookingPhone}
          className="flex-1 py-4 bg-noir text-white text-[10px] font-black uppercase tracking-widest"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function StepThree({ service, onBack, onConfirm, data }: any) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-10 border border-noir/10 shadow-lg space-y-10">
        <h3 className="font-serif text-2xl italic text-center text-noir">
          Review Booking
        </h3>
        <div className="space-y-4 border-y border-noir/10 py-8 text-[10px] uppercase tracking-widest">
          <div className="flex justify-between">
            <span>Service</span>
            <span className="font-bold">{service.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Date & Time</span>
            <span className="font-bold">
              {data.selectedDate} @ {data.selectedTime}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-noir/40">
            Total
          </span>
          <span className="text-3xl font-serif text-gold">
            ₦{service.price.toLocaleString()}
          </span>
        </div>
      </div>
      <button
        onClick={onConfirm}
        className="w-full py-5 bg-gold text-white text-[10px] font-black uppercase tracking-widest shadow-xl"
      >
        Confirm Booking
      </button>
    </div>
  );
}

// SUCCESS STATE - UPDATED WITH YOUR EXACT LOGIC
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

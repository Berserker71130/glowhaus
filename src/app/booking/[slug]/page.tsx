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
    /* SURGERY: Background updated to theme-aware noir */
    <main className="min-h-screen bg-[#FCFAFA] dark:bg-noir pt-28 pb-20 px-6 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-noir dark:text-ivory/60 transition-colors">
              Step {step} of 3
            </span>
          </div>
          <div className="h-[2px] w-full bg-noir/10 dark:bg-white/10 relative">
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

function StepOne({ service, onNext, state }: any) {
  const [viewDate, setViewDate] = useState(new Date());
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
        {/* SURGERY: Calendar container now supports dark mode */}
        <div className="bg-white dark:bg-white/[0.03] p-8 border border-noir/10 dark:border-white/10 shadow-sm transition-all">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-xl italic text-noir dark:text-ivory">
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
                className="p-2 hover:bg-noir/5 dark:hover:bg-white/5 dark:text-ivory"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() =>
                  setViewDate(
                    new Date(viewDate.setMonth(viewDate.getMonth() + 1)),
                  )
                }
                className="p-2 hover:bg-noir/5 dark:hover:bg-white/5 dark:text-ivory"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* NEW FIXED CODE */}
            {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
              <div
                key={`${d}-${index}`}
                className="text-[10px] font-black text-center text-noir/30 dark:text-ivory/30 pb-4"
              >
                {d}
              </div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${viewDate.getFullYear()}-${viewDate.getMonth() + 1}-${day}`;
              const isSelected = state.selectedDate === dateStr;
              return (
                <button
                  key={day}
                  onClick={() => state.setDate(dateStr)}
                  className={`aspect-square flex items-center justify-center text-xs transition-all ${
                    isSelected
                      ? "bg-noir dark:bg-white text-white dark:text-noir"
                      : "hover:bg-gold/10 text-noir dark:text-ivory"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 space-y-8">
        <div className="bg-white dark:bg-white/[0.03] p-8 border border-noir/10 dark:border-white/10 transition-all">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-noir dark:text-ivory mb-6">
            Select Time
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                disabled={bookedSlots.includes(slot)}
                onClick={() => state.setTime(slot)}
                className={`py-3 text-[10px] font-bold tracking-widest transition-all ${
                  state.selectedTime === slot
                    ? "bg-gold text-white"
                    : "bg-noir/5 dark:bg-white/5 text-noir dark:text-ivory hover:bg-noir hover:text-white"
                } ${bookedSlots.includes(slot) ? "opacity-20 cursor-not-allowed" : ""}`}
              >
                {slot}
              </button>
            ))}
          </div>
          <button
            disabled={!state.selectedDate || !state.selectedTime}
            onClick={onNext}
            className="w-full mt-8 py-4 bg-noir dark:bg-white text-white dark:text-noir text-[10px] font-black uppercase tracking-widest disabled:opacity-30 transition-all"
          >
            Continue to Details
          </button>
        </div>
      </div>
    </div>
  );
}

function StepTwo({ onNext, onBack, form }: any) {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-white/[0.03] p-10 border border-noir/10 dark:border-white/10 transition-all">
      <h2 className="font-serif text-3xl text-noir dark:text-ivory mb-8">
        Your Contact Details
      </h2>
      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black uppercase text-noir/40 dark:text-ivory/40">
            Phone Number
          </label>
          <input
            value={form.bookingPhone}
            onChange={(e) => form.setBookingPhone(e.target.value)}
            className="w-full mt-2 bg-transparent border-b border-noir/10 dark:border-white/10 py-3 focus:border-gold outline-none text-noir dark:text-ivory transition-all"
            placeholder="+234..."
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-noir/40 dark:text-ivory/40">
            Special Notes (Optional)
          </label>
          <textarea
            value={form.bookingNotes}
            onChange={(e) => form.setBookingNotes(e.target.value)}
            className="w-full mt-2 bg-transparent border-b border-noir/10 dark:border-white/10 py-3 focus:border-gold outline-none text-noir dark:text-ivory transition-all min-h-[100px]"
            placeholder="Any allergies or specific requests?"
          />
        </div>
      </div>
      <div className="flex gap-4 mt-12">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-noir/10 dark:border-white/10 text-noir dark:text-ivory text-[10px] font-black uppercase tracking-widest hover:bg-noir/5 transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 bg-noir dark:bg-white text-white dark:text-noir text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all"
        >
          Confirm Summary
        </button>
      </div>
    </div>
  );
}

function StepThree({ service, onBack, onConfirm, data }: any) {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-white/[0.03] p-10 border border-noir/10 dark:border-white/10 transition-all">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
          <ShieldCheck size={32} />
        </div>
        <h2 className="font-serif text-3xl text-noir dark:text-ivory">
          Review Appointment
        </h2>
      </div>
      <div className="space-y-4 border-y border-noir/5 dark:border-white/5 py-8 mb-8">
        <div className="flex justify-between">
          <span className="text-[10px] font-black uppercase text-noir/40 dark:text-ivory/40 transition-colors">
            Service
          </span>
          <span className="text-sm font-bold text-noir dark:text-ivory transition-colors">
            {service.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] font-black uppercase text-noir/40 dark:text-ivory/40 transition-colors">
            Date & Time
          </span>
          <span className="text-sm font-bold text-noir dark:text-ivory transition-colors">
            {data.selectedDate} at {data.selectedTime}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] font-black uppercase text-noir/40 dark:text-ivory/40 transition-colors">
            Amount
          </span>
          <span className="text-sm font-bold text-gold transition-colors">
            ₦{service.price.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-noir/10 dark:border-white/10 text-noir dark:text-ivory text-[10px] font-black uppercase tracking-widest transition-all"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-4 bg-noir dark:bg-white text-white dark:text-noir text-[10px] font-black uppercase tracking-widest shadow-xl transition-all"
        >
          Schedule Now
        </button>
      </div>
    </div>
  );
}

function SuccessCard({ serviceName, clear }: any) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-md mx-auto mt-32 text-center bg-white dark:bg-white/[0.03] p-12 border border-noir/10 dark:border-white/10 shadow-2xl transition-all"
    >
      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white">
        <Check size={40} />
      </div>
      <h2 className="font-serif text-4xl italic mb-4 text-noir dark:text-ivory transition-colors">
        Booking Confirmed
      </h2>
      <p className="text-xs text-noir/60 dark:text-ivory/60 mb-8 transition-colors">
        Ref: GH-2025-{Math.floor(1000 + Math.random() * 9000)} • {serviceName}
      </p>
      <div className="px-12 space-y-4">
        <button className="w-full py-4 border border-noir/20 dark:border-white/20 text-noir dark:text-ivory text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-noir/5 dark:hover:bg-white/5 transition-all">
          <Sparkles size={14} className="text-gold" /> Add To Calendar
        </button>
        <button
          onClick={() => {
            clear();
            window.location.href = "/account/appointments";
          }}
          className="w-full py-4 bg-noir dark:bg-white text-white dark:text-noir text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-noir/90 dark:hover:bg-ivory transition-all"
        >
          View My Appointments
        </button>
      </div>
    </motion.div>
  );
}

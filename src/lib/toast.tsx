"use client";

import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export const showGlowToast = ({
  message,
  subtext,
  icon,
  accentColor = "#C5A059",
  action,
}: any) => {
  return toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        // Added 'z-[9999]' to make sure it stays on top of everything
        className="flex items-center gap-0 min-w-[340px] pointer-events-auto p-0 overflow-hidden shadow-2xl z-[9999]"
        style={{
          backgroundColor: "#FDFCFB", // Solid Ivory
          boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px ${accentColor}44`,
          borderRadius: "4px",
          borderLeft: `8px solid ${accentColor}`, // Thicker stripe
        }}
      >
        <div className="flex-1 flex items-center gap-4 px-6 py-5 bg-[#FDFCFB]">
          {icon && <span className="text-2xl">{icon}</span>}
          <div className="flex flex-col">
            <p className="font-black text-[#000000] text-[13px] uppercase tracking-[0.1em] leading-tight">
              {message}
            </p>
            {subtext && (
              <p className="text-gray-500 text-[11px] mt-1 italic font-medium">
                {subtext}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center pr-2 bg-[#FDFCFB]">
          {action ? (
            <button
              onClick={() => {
                action.fn();
                toast.dismiss(t.id);
              }}
              className="h-full px-4 py-2 border border-black/10 hover:bg-black hover:text-white transition-all text-[10px] font-black uppercase tracking-widest mr-2"
              style={{ color: accentColor }}
            >
              {action.label}
            </button>
          ) : (
            <button
              onClick={() => toast.dismiss(t.id)}
              className="p-2 text-gray-400 hover:text-black transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </motion.div>
    ),
    { duration: 3500 },
  );
};

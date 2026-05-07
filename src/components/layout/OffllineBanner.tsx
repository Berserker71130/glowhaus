"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    console.log("Offline Status Check:", navigator.onLine);
    setIsOffline(!navigator.onLine);
    const onLine = () => setIsOffline(false);
    const offLine = () => setIsOffline(true);

    window.addEventListener("online", onLine);
    window.addEventListener("offline", offLine);
    return () => {
      window.removeEventListener("online", onLine);
      window.removeEventListener("offline", offLine);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-0 left-0 w-full bg-gold py-2.5 z-[9999] shadow-md pointer-events-none"
        >
          <p className="text-noir text-[10px] font-bold uppercase tracking-[0.2em] text-center">
            You are offline - Some features may not work 🎇
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

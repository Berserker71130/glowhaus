"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { FaCcVisa, FaCcMastercard, FaCreditCard } from "react-icons/fa";
import { footerLinks } from "./footer-data";
import { link } from "fs";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list", {
        style: {
          background: "#121212",
          color: "#D4AF37",
          border: "1px solid #D4AF37",
        },
      });
      setEmail("");
    }
  };
  return (
    <footer className="bg-[#0A0A0A] text-[#A8A196] pt-16 md:px-12 border-t border-[#D4AF37]/30 font-sans">
      <Toaster position="top-center" />

      {/* ROW 1: Brand + Newsletter */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <div>
          <h2 className="text-3xl font-serif text-[#D4AF37] mb-1">GlowHaus</h2>
          <p className="italic text-xs font-light tracking-wide">
            Where beauty meets luxury
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row w-full md:w-auto"
        >
          <input
            type="email"
            placeholder="Your email address"
            className="bg-transparent border border-[#A8A196] px-4 py-2 putline-none focus:border-[#D4AF37] text-sm sm:w-64"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="bg-[#D4AF37] text-black font-bold px-6 py-2 uppercase text-[10px] tracking-widest hover:brightness-110 transition-all">
            Join The Club
          </button>
        </form>
      </div>

      {/* GOLD DIVIDER */}
      <div className="h-[1px] w-full bg-[#D4AF37] opacity-40 mb-12" />

      {/* ROW 2: 4 Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
        {[
          { title: "shop", display: "Shop" },
          { title: "services", display: "Services" },
          { title: "help", display: "Help" },
        ].map((col) => (
          <div key={col.title} className="flex flex-col gap-4">
            
            {/* Header in Playfair Display */}
            <h4 className="font-serif text-[#D4AF37] text-lg">{col.display}</h4>

            {/* We cast the title so TypeScript finds the array */}
            {footerLinks[col.title as keyof typeof footerLinks].map(
              (link: any) => (
                <a
                  key={typeof link === "string" ? link : link.href}
                  href="#"
                  className="text-sm text-[#A8A196] hover:text-[#D4AF37] transition-colors duration-300 font-sans"
                >
                  {typeof link === "string" ? link : link.label}
                </a>
              ),
            )}
          </div>
        ))}

        {/* Column 4: Follow Us (Keep this separate as it uses Icons, not text) */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-[#D4AF37] text-lg">Follow Us</h4>
          <div className="flex gap-4 text-2xl">
            {footerLinks.socials.map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                whileHover={{ scale: 1.2, color: "#D4AF37" }}
                className="cursor-pointer text-[#A8A196]"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* GOLD DIVIDER */}
      <div className="h-[1px] w-full bg-[#D4AF37] opacity-40 mb-8" />

      {/* ROW # Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] opacity-80">
        <p>© 2025 GlowHaus. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#D4AF37]">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#D4AF37]">
            Terms
          </a>
          <a href="#" className="hover:text-[#D4AF37]">
            Cookie Policy
          </a>
        </div>
        <div className="flex gap-4 text-2xl opacity-60">
          <FaCcVisa /> <FaCcMastercard /> <FaCreditCard />
          <span className="text-[9px] font-bold border px-1 self-center">
            PAYSTACK
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

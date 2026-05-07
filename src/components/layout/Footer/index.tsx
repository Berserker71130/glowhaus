"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { showGlowToast } from "@/lib/toast";
import { FaCcVisa, FaCcMastercard, FaCreditCard } from "react-icons/fa";
import { footerLinks } from "./footer-data";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Logic for Newsletter Signup - Official Ticket Match
      showGlowToast({
        message: "You're on the list! Welcome to GlowHaus 🌸",
        // Using the consistent Gold from your other components
        accentColor: "#C5A059",
        icon: "✨",
        // If your engine supports subtext, this satisfies the "Welcome" requirement
        subtext: "Check your inbox for a special welcome treat.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#A8A196] pt-16 pb-12 md:px-12 border-t border-[#C5A059]/30 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <div>
          <h2 className="text-3xl font-serif text-[#C5A059] mb-1 tracking-tight">
            GlowHaus
          </h2>
          <p className="italic text-xs font-light tracking-[0.2em] uppercase opacity-60">
            Where beauty meets luxury
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row w-full md:w-auto gap-0"
        >
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="bg-transparent border border-[#A8A196]/30 px-6 py-3 outline-none focus:border-[#C5A059] text-[10px] tracking-widest sm:w-72 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="bg-[#C5A059] text-black font-black px-8 py-3 uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all shadow-lg">
            Join The Club
          </button>
        </form>
      </div>

      <div className="h-[1px] w-full bg-[#C5A059]/20 mb-12" />

      {/* Grid and Links */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
        {[
          { title: "shop", display: "Shop" },
          { title: "services", display: "Services" },
          { title: "help", display: "Help" },
        ].map((col) => (
          <div key={col.title} className="flex flex-col gap-4">
            <h4 className="font-serif text-[#C5A059] text-lg italic">
              {col.display}
            </h4>
            {footerLinks[col.title as keyof typeof footerLinks].map(
              (link: any) => (
                <a
                  key={typeof link === "string" ? link : link.href}
                  href="#"
                  className="text-[11px] uppercase tracking-widest text-[#A8A196] hover:text-[#C5A059] transition-colors duration-300"
                >
                  {typeof link === "string" ? link : link.label}
                </a>
              ),
            )}
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-[#C5A059] text-lg italic">
            Follow Us
          </h4>
          <div className="flex gap-5 text-xl">
            {footerLinks.socials.map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                whileHover={{ y: -3, color: "#C5A059" }}
                className="cursor-pointer text-[#A8A196]/60 transition-colors"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-[#C5A059]/10 mb-8" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.3em] opacity-50">
        <p>© 2026 GlowHaus Luxury. Designed for Excellence.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-[#C5A059]">
            Privacy
          </a>
          <a href="#" className="hover:text-[#C5A059]">
            Terms
          </a>
        </div>
        <div className="flex gap-4 text-2xl opacity-40 grayscale hover:grayscale-0 transition-all">
          <FaCcVisa /> <FaCcMastercard /> <FaCreditCard />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

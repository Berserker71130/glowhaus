"use client";

import { useState, useEffect } from "react"; // Added useEffect
import { useStore } from "@/store/useStore";
import { toast } from "react-hot-toast";
import { Camera, Save } from "lucide-react";

export default function PersonalInfo() {
  const { displayName, email, phone, dob, avatar, updateProfile } = useStore();

  // 1. Initialize local state
  const [formData, setFormData] = useState({
    displayName: displayName || "",
    email: email || "",
    phone: phone || "",
    dob: dob || "",
  });

  // 2. SYNC EFFECT: This forces the form to update when Zustand loads from LocalStorage
  useEffect(() => {
    setFormData({
      displayName: displayName || "",
      email: email || "",
      phone: phone || "",
      dob: dob || "",
    });
  }, [displayName, email, phone, dob]);

  const getInitials = (name: string) => {
    if (!name) return "GH";
    const cleanName = name.replace(/[^a-zA-Z ]/g, "").trim();
    const parts = cleanName.split(/\s+/).filter(Boolean);

    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return cleanName.slice(0, 2).toUpperCase();
  };

  const handleSave = () => {
    updateProfile(formData);
    toast.success("Profile updated ✨", {
      style: {
        background: "#1a1a1a",
        color: "#FDFCFB",
        border: "1px solid #D4AF37",
      },
    });
  };

  const handleAvatarClick = () => {
    toast("Image upload coming soon", {
      icon: "📷",
      style: { background: "#FDFCFB", color: "#1a1a1a" },
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 bg-[#F9F6F2] p-8 rounded-3xl border border-blush/20 shadow-sm">
      {/* AVATAR SECTION */}
      <section className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-2xl bg-white/40 border border-white shadow-sm backdrop-blur-sm">
        <div
          className="relative group cursor-pointer"
          onClick={handleAvatarClick}
        >
          <div className="w-32 h-32 rounded-full border border-gold/20 p-1.5 flex items-center justify-center bg-white shadow-md transition-all duration-500 group-hover:scale-[1.02]">
            {avatar && avatar.length > 10 ? (
              <img
                src={avatar}
                alt={displayName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              // 3. CENTERING FIX: Using grid + place-items-center for perfect alignment
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#F3E7E4] to-[#F9F6F2] grid place-items-center overflow-hidden">
                <span className="text-4xl font-serif text-gold uppercase tracking-tighter leading-none block transform translate-y-[2px]">
                  {getInitials(formData.displayName || displayName)}
                </span>
              </div>
            )}
          </div>
          <div className="absolute inset-1.5 rounded-full bg-noir/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Camera className="text-white w-6 h-6" />
          </div>
        </div>

        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-2xl font-serif text-noir tracking-tight">
            Your Portrait
          </h2>
          <p className="text-sm text-taupe max-w-[280px]">
            Personalize your GlowHaus profile appearance.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        <div className="space-y-2.5">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-noir/40 ml-1">
            Display Name
          </label>
          <input
            type="text"
            value={formData.displayName}
            onChange={(e) =>
              setFormData({ ...formData, displayName: e.target.value })
            }
            className="w-full px-5 py-4 bg-white border border-blush/30 rounded-2xl focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all duration-300 shadow-sm"
          />
        </div>

        <div className="space-y-2.5">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-noir/40 ml-1">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-5 py-4 bg-white border border-blush/30 rounded-2xl focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all duration-300 shadow-sm"
          />
        </div>

        <div className="space-y-2.5">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-noir/40 ml-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-5 py-4 bg-white border border-blush/30 rounded-2xl focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all duration-300 shadow-sm"
          />
        </div>

        <div className="space-y-2.5">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-noir/40 ml-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full px-5 py-4 bg-white border border-blush/30 rounded-2xl focus:border-gold outline-none transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      <div className="pt-8 flex justify-center md:justify-start">
        <button
          onClick={handleSave}
          className="group relative flex items-center justify-center gap-5 bg-noir text-white px-14 py-5 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-noir/20 active:scale-95"
        >
          <span className="relative z-10 font-bold tracking-[0.4em] uppercase text-[11px]">
            Save Changes
          </span>
          <Save className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:rotate-12" />
          <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold/90 to-[#B8860B] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </button>
      </div>
    </div>
  );
}

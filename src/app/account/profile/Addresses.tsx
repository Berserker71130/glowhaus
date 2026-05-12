"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
// LOCAL TOAST REMOVED: Store handles all feedback now.
import {
  Briefcase,
  CheckCircle2,
  Home,
  Plus,
  Trash2,
  MapPin,
  Phone,
} from "lucide-react";

export default function Addresses() {
  const { addresses, addAddress, deleteAddress, setDefaultAddress } =
    useStore();
  const [showAddForm, setShowAddForm] = useState(false);

  // Local state for the Add New Address form
  const [newAddr, setNewAddr] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    isDefault: false,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    // The store action handles the "Address added successfully" Gold toast
    addAddress({ ...newAddr });

    // Reset Form
    setShowAddForm(false);
    setNewAddr({
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      isDefault: false,
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center border-b border-blush/20 dark:border-white/10 pb-6 transition-colors">
        <div>
          <h3 className="text-2xl font-serif text-noir dark:text-ivory tracking-tight">
            Saved Addresses
          </h3>
          <p className="text-sm text-taupe dark:text-ivory/40 mt-1">
            Manage your primary delivery destinations.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full border font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300 ${
            showAddForm
              ? "border-noir dark:border-ivory text-noir dark:text-ivory hover:bg-noir dark:hover:bg-ivory hover:text-white dark:hover:text-noir"
              : "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
          }`}
        >
          {showAddForm ? (
            "Cancel"
          ) : (
            <>
              <Plus size={14} /> Add New
            </>
          )}
        </button>
      </div>

      {/* ADD ADDRESS FORM */}
      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className="bg-white dark:bg-white/[0.03] p-8 rounded-3xl border border-[#D4AF37]/20 grid grid-cols-1 md:grid-cols-2 gap-5 animate-in zoom-in-95 duration-500 shadow-xl shadow-[#D4AF37]/5 transition-all"
        >
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-noir/40 dark:text-ivory/40 ml-1">
              Address Label
            </label>
            <input
              placeholder="e.g. Penthouse, Office, Summer Home"
              className="w-full p-4 bg-[#FDFCFB] dark:bg-white/5 border border-blush/30 dark:border-white/10 rounded-xl outline-none focus:border-[#D4AF37] transition-all text-noir dark:text-ivory"
              value={newAddr.name}
              onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
              required
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-noir/40 dark:text-ivory/40 ml-1">
              Street Address
            </label>
            <input
              placeholder="123 Luxury Way"
              className="w-full p-4 bg-[#FDFCFB] dark:bg-white/5 border border-blush/30 dark:border-white/10 rounded-xl outline-none focus:border-[#D4AF37] transition-all text-noir dark:text-ivory"
              value={newAddr.street}
              onChange={(e) =>
                setNewAddr({ ...newAddr, street: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-noir/40 dark:text-ivory/40 ml-1">
              City
            </label>
            <input
              placeholder="Lagos"
              className="w-full p-4 bg-[#FDFCFB] dark:bg-white/5 border border-blush/30 dark:border-white/10 rounded-xl outline-none focus:border-[#D4AF37] transition-all text-noir dark:text-ivory"
              value={newAddr.city}
              onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-noir/40 dark:text-ivory/40 ml-1">
              State
            </label>
            <input
              placeholder="Lagos State"
              className="w-full p-4 bg-[#FDFCFB] dark:bg-white/5 border border-blush/30 dark:border-white/10 rounded-xl outline-none focus:border-[#D4AF37] transition-all text-noir dark:text-ivory"
              value={newAddr.state}
              onChange={(e) =>
                setNewAddr({ ...newAddr, state: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-noir/40 dark:text-ivory/40 ml-1">
              Postal Code
            </label>
            <input
              placeholder="100001"
              className="w-full p-4 bg-[#FDFCFB] dark:bg-white/5 border border-blush/30 dark:border-white/10 rounded-xl outline-none focus:border-[#D4AF37] transition-all text-noir dark:text-ivory"
              value={newAddr.zipCode}
              onChange={(e) =>
                setNewAddr({ ...newAddr, zipCode: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-noir/40 dark:text-ivory/40 ml-1">
              Contact Phone
            </label>
            <input
              placeholder="+234..."
              type="tel"
              className="w-full p-4 bg-[#FDFCFB] dark:bg-white/5 border border-blush/30 dark:border-white/10 rounded-xl outline-none focus:border-[#D4AF37] transition-all text-noir dark:text-ivory"
              value={newAddr.phone}
              onChange={(e) =>
                setNewAddr({ ...newAddr, phone: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-4 bg-noir dark:bg-ivory text-white dark:text-noir py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-[#D4AF37] dark:hover:bg-gold hover:text-white dark:hover:text-noir transition-all duration-500 shadow-lg active:scale-95"
          >
            Save Address to Profile
          </button>
        </form>
      )}

      {/* ADDRESS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`group relative p-8 rounded-3xl border transition-all duration-500 ${
              addr.isDefault
                ? "border-[#D4AF37] bg-[#D4AF37]/[0.03] shadow-xl shadow-[#D4AF37]/5"
                : "border-blush/20 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-[#D4AF37]/40 hover:shadow-lg"
            }`}
          >
            {addr.isDefault && (
              <div className="absolute -top-3 left-6 bg-[#D4AF37] text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-md border border-white dark:border-noir">
                Primary Residence
              </div>
            )}

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-noir border border-blush/20 dark:border-white/10 rounded-2xl text-[#D4AF37] shadow-sm group-hover:scale-110 transition-transform duration-500">
                  {addr.name.toLowerCase().includes("home") ? (
                    <Home size={22} strokeWidth={1.5} />
                  ) : (
                    <Briefcase size={22} strokeWidth={1.5} />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-noir dark:text-ivory uppercase tracking-widest text-sm">
                    {addr.name}
                  </h4>
                </div>
              </div>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {!addr.isDefault && (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="p-2 text-taupe dark:text-ivory/40 hover:text-[#D4AF37] transition-colors"
                    title="Make Default"
                  >
                    <CheckCircle2 size={18} />
                  </button>
                )}
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="p-2 text-taupe dark:text-ivory/40 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm text-taupe dark:text-ivory/60 ml-1 flex flex-col">
              <div className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-[#D4AF37]/50 mt-0.5 shrink-0"
                />
                <p className="leading-relaxed">
                  {addr.street}
                  <br />
                  {addr.city}, {addr.state} {addr.zipCode}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-blush/10 dark:border-white/10 mt-2">
                <Phone size={14} className="text-[#D4AF37]/50 shrink-0" />
                <p className="text-noir dark:text-ivory font-semibold tracking-tight">
                  {addr.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

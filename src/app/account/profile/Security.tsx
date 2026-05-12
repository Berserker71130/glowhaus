"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/Modal";
import { AlertTriangle, Lock, Trash2, LogOut, Smartphone } from "lucide-react";

export default function Security() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    toast.success("Password updated successfully");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleSignOutAll = () => {
    toast.success("Signed out of all other devices", {
      icon: "🌐",
      style: {
        background: "#FDFCFB",
        color: "#1a1a1a",
        border: "1px solid #EDE3E3",
      },
    });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-10">
      {/* PASSWORD SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-blush/20 dark:border-white/10 pb-4">
          <Lock className="text-gold" size={20} />
          <h3 className="text-xl font-serif text-noir dark:text-ivory">
            Password & Access
          </h3>
        </div>

        <form onSubmit={handlePasswordChange} className="max-w-md space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-noir/50 dark:text-ivory/40">
              Current Password
            </label>
            <input
              type="password"
              required
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
              className="w-full p-3 bg-white dark:bg-white/[0.03] border border-blush/30 dark:border-white/10 rounded-lg focus:border-gold outline-none transition-all text-noir dark:text-ivory"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-noir/50 dark:text-ivory/40">
              New Password
            </label>
            <input
              type="password"
              required
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
              className="w-full p-3 bg-white dark:bg-white/[0.03] border border-blush/30 dark:border-white/10 rounded-lg focus:border-gold outline-none transition-all text-noir dark:text-ivory"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-noir/50 dark:text-ivory/40">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
              className="w-full p-3 bg-white dark:bg-white/[0.03] border border-blush/30 dark:border-white/10 rounded-lg focus:border-gold outline-none transition-all text-noir dark:text-ivory"
            />
          </div>
          <button
            type="submit"
            className="bg-noir dark:bg-ivory text-white dark:text-noir px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold dark:hover:bg-gold hover:text-noir transition-all duration-300"
          >
            Update Password
          </button>
        </form>
      </section>

      {/* ACTIVE SESSIONS SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-blush/20 dark:border-white/10 pb-4">
          <Smartphone className="text-gold" size={20} />
          <h3 className="text-xl font-serif text-noir dark:text-ivory">
            Active Sessions
          </h3>
        </div>

        <div className="flex justify-between items-center p-6 border border-blush/20 dark:border-white/10 rounded-2xl bg-white dark:bg-white/[0.02] shadow-sm">
          <div>
            <p className="font-bold text-noir dark:text-ivory text-sm uppercase tracking-wider">
              All Devices
            </p>
            <p className="text-xs text-muted-foreground dark:text-ivory/40 mt-1 italic">
              You are currently active on 3 other devices.
            </p>
          </div>
          <button
            onClick={handleSignOutAll}
            className="flex items-center gap-2 border border-noir/10 dark:border-white/20 text-noir dark:text-ivory px-5 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-noir dark:hover:bg-ivory hover:text-white dark:hover:text-noir transition-all"
          >
            <LogOut size={14} />
            Sign out of all
          </button>
        </div>
      </section>

      {/* DANGER ZONE */}
      <section className="pt-10 border-t border-red-100 dark:border-red-900/30">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-500 mb-4">
          <AlertTriangle size={18} />
          <h4 className="text-sm font-bold uppercase tracking-[0.2em]">
            Danger Zone
          </h4>
        </div>

        <div className="flex justify-between items-center p-6 border border-red-100 dark:border-red-900/20 rounded-2xl bg-red-50/30 dark:bg-red-900/5">
          <div>
            <p className="font-bold text-noir dark:text-ivory text-sm">
              Delete Account
            </p>
            <p className="text-xs text-muted-foreground dark:text-ivory/40 mt-1">
              Permanently remove your profile and data.
            </p>
          </div>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-sm shadow-red-200 dark:shadow-none"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </section>

      {/* MODAL */}
      <Modal open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <ModalContent className="dark:bg-noir dark:border-white/10">
          <div className="p-2 space-y-6 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={32} />
            </div>
            <div>
              <ModalTitle className="text-xl font-serif text-center mb-2 dark:text-ivory">
                Are you absolutely sure?
              </ModalTitle>
              <ModalDescription className="text-center dark:text-ivory/60">
                This action is permanent. You will lose your Glow Points and
                order history forever.
              </ModalDescription>
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={() => {
                  toast.error("Deletion request sent");
                  setIsDeleteOpen(false);
                }}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition-all"
              >
                Yes Delete My Account
              </button>
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="w-full bg-blush/10 dark:bg-white/5 text-noir dark:text-ivory py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blush/20 dark:hover:bg-white/10 transition-all"
              >
                Nevermind Go Back
              </button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

"use client";

import { useStore } from "@/store/useStore";
import { Switch } from "@/components/ui/Switch";
import { Mail, ShieldCheck, Smartphone } from "lucide-react";

export default function Notifications() {
  const { notifications, updateNotifications } = useStore();

  const handleToggle = (key: keyof typeof notifications, value: boolean) => {
    // SURGICAL FIX: We call the store only.
    // The showGlowToast is now inside updateNotifications in your useStore.ts
    updateNotifications({ [key]: value });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 bg-white/30 dark:bg-white/[0.02] p-6 rounded-2xl transition-colors">
      <div className="border-b border-blush/20 dark:border-white/10 pb-6">
        <h3 className="text-2xl font-serif text-noir dark:text-ivory tracking-tight">
          Notification Preferences
        </h3>
        <p className="text-sm text-taupe dark:text-ivory/40 mt-2 italic">
          Choose how you'd like to stay connected with the GlowHaus experience.
        </p>
      </div>

      <div className="grid gap-12">
        {/* EMAIL SECTION */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-gold">
            <Mail size={18} strokeWidth={1.5} />
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em]">
              Email Channels
            </h4>
          </div>

          <div className="grid gap-4 ml-0 sm:ml-8">
            {[
              {
                key: "emailOffers",
                label: "Offers & Promotions",
                desc: "Exclusive discounts and early access.",
              },
              {
                key: "emailOrders",
                label: "Order Updates",
                desc: "Real-time tracking and confirmations.",
              },
              {
                key: "emailReminders",
                label: "Appointment Reminders",
                desc: "Confirmations and 24-hour alerts.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-blush/20 dark:border-white/10 hover:border-gold/30 transition-all shadow-sm"
              >
                <div className="space-y-1">
                  <p className="font-medium text-noir dark:text-ivory text-sm">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground dark:text-ivory/40 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <Switch
                  checked={
                    notifications[item.key as keyof typeof notifications]
                  }
                  onCheckedChange={(val) =>
                    handleToggle(item.key as keyof typeof notifications, val)
                  }
                />
              </div>
            ))}
          </div>
        </section>

        {/* SMS SECTION */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-gold">
            <Smartphone size={18} strokeWidth={1.5} />
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em]">
              Mobile Alerts (SMS)
            </h4>
          </div>

          <div className="grid gap-4 ml-0 sm:ml-8">
            {[
              {
                key: "smsOrders",
                label: "Order Delivery Alerts",
                desc: "Immediate text when your package is nearby.",
              },
              {
                key: "smsReminders",
                label: "Appointment Reminders",
                desc: "Quick SMS 2 hours before your session.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-blush/20 dark:border-white/10 hover:border-gold/30 transition-all shadow-sm"
              >
                <div className="space-y-1">
                  <p className="font-medium text-noir dark:text-ivory text-sm">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground dark:text-ivory/40 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <Switch
                  checked={
                    notifications[item.key as keyof typeof notifications]
                  }
                  onCheckedChange={(val) =>
                    handleToggle(item.key as keyof typeof notifications, val)
                  }
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER NOTE */}
      <div className="pt-8 flex items-start gap-4 border-t border-blush/20 dark:border-white/10">
        <div className="p-2 bg-gold/5 rounded-full">
          <ShieldCheck className="text-gold" size={16} />
        </div>
        <p className="text-[10px] text-taupe dark:text-ivory/60 leading-relaxed uppercase tracking-wider max-w-xl">
          Your privacy is paramount. GlowHaus will never share your contact
          details with third-party advertisers. Standard messaging rates may
          apply for SMS alerts.
        </p>
      </div>
    </div>
  );
}

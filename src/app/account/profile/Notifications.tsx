"use client";

import { useStore } from "@/store/useStore";
import { toast } from "react-hot-toast";
import { Switch } from "@/components/ui/Switch";
import { Mail, ShieldCheck, Smartphone } from "lucide-react";

export default function Notifications() {
  const { notifications, updateNotifications } = useStore();

  const handleToggle = (key: keyof typeof notifications, value: boolean) => {
    updateNotifications({ [key]: value });

    // LUXE TOAST FIX: Light Ivory background with Noir text for perfect contrast
    toast.success("Preferences updated", {
      duration: 2000,
      style: {
        background: "#FDFCFB", // Creamy Ivory
        color: "#1a1a1a", // Deep Noir
        border: "1px solid #D4AF37", // Thin Gold border
        fontSize: "12px",
        fontWeight: "600",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        borderRadius: "12px",
        padding: "12px 20px",
      },
      iconTheme: {
        primary: "#D4AF37", // Gold Checkmark
        secondary: "#FDFCFB",
      },
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 bg-white/30 p-6 rounded-2xl">
      <div className="border-b border-blush/20 pb-6">
        <h3 className="text-2xl font-serif text-noir tracking-tight">
          Notification Preferences
        </h3>
        <p className="text-sm text-taupe mt-2 italic">
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
                className="flex items-center justify-between p-5 rounded-2xl bg-white border border-blush/20 hover:border-gold/30 transition-colors shadow-sm"
              >
                <div className="space-y-1">
                  <p className="font-medium text-noir text-sm">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
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
                className="flex items-center justify-between p-5 rounded-2xl bg-white border border-blush/20 hover:border-gold/30 transition-colors shadow-sm"
              >
                <div className="space-y-1">
                  <p className="font-medium text-noir text-sm">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
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
      <div className="pt-8 flex items-start gap-4 border-t border-blush/20">
        <div className="p-2 bg-gold/5 rounded-full">
          <ShieldCheck className="text-gold" size={16} />
        </div>
        <p className="text-[10px] text-taupe leading-relaxed uppercase tracking-wider max-w-xl">
          Your privacy is paramount. GlowHaus will never share your contact
          details with third-party advertisers. Standard messaging rates may
          apply for SMS alerts.
        </p>
      </div>
    </div>
  );
}

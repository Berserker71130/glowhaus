"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";
import {
  Award,
  CalendarDays,
  Heart,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Dashboard", href: "/account", icon: LayoutDashboard },
  { name: "Orders", href: "/account/orders", icon: ShoppingBag },
  { name: "Appointments", href: "/account/appointments", icon: CalendarDays },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Loyalty", href: "/loyalty", icon: Award },
  { name: "Profile Settings", href: "/account/settings", icon: Settings },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { displayName, tier } = useStore();

  return (
    /* SURGICAL FIX: Added md:sticky and md:top-32 so it only pins on desktop and stays fluid on mobile */
    <aside className="w-full md:w-[280px] bg-white dark:bg-[#0D0D0D] border border-noir/5 dark:border-white/10 h-fit md:min-h-[calc(100vh-160px)] static md:sticky md:top-32 flex flex-col p-6 md:p-8 rounded-[2rem] shadow-sm transition-all duration-500">
      {/* USER PROFILE */}
      <div className="flex flex-col items-center text-center pb-6 md:pb-8 border-b border-noir/5 dark:border-white/5 mb-6 md:mb-8">
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-noir dark:bg-zinc-800 flex items-center justify-center text-white font-serif italic text-2xl md:text-3xl mb-3 md:mb-4 border-4 border-gold/10 transition-colors">
          {displayName ? displayName.charAt(0) : "G"}
        </div>
        <h3 className="font-serif text-lg md:text-xl text-noir dark:text-ivory leading-tight transition-colors">
          {displayName}
        </h3>
        <div className="mt-2 px-4 py-1.5 bg-gold/10 border border-gold/20 text-gold text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
          {tier} Member
        </div>
      </div>

      {/* NAV LINKS */}
      <nav className="flex flex-col gap-2 md:space-y-1.5">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all group ${
                isActive
                  ? "bg-noir dark:bg-white text-white dark:text-black shadow-lg shadow-noir/10"
                  : "text-noir/50 dark:text-ivory/40 hover:bg-noir/5 dark:hover:bg-white/5 hover:text-noir dark:hover:text-ivory"
              }`}
            >
              <link.icon
                size={18}
                className={
                  isActive
                    ? "text-gold"
                    : "group-hover:text-gold transition-colors"
                }
              />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* SIGN OUT BUTTON */}
      <button className="mt-6 md:mt-8 flex items-center gap-4 px-5 py-3.5 text-noir/30 dark:text-ivory/20 hover:text-rose-500 transition-colors group">
        <LogOut
          size={18}
          className="group-hover:rotate-180 transition-transform duration-500"
        />
        <span className="text-[10px] font-black uppercase tracking-widest">
          Sign Out
        </span>
      </button>
    </aside>
  );
}

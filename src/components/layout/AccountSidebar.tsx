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
  { name: "Profile Settings", href: "account/settings", icon: Settings },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { displayName, tier, avatar } = useStore();

  return (
    <aside className="w-full md:w-[280px] bg-white border border-noir/5 h-fit md:min-h-[calc(100vh-160px)] sticky top-32 flex flex-col p-8 rounded-[2rem] shadow-sm">
      {/* USER PROFILE */}
      <div className="flex flex-col items-center text-center pb-8 border-b border-noir/5 mb-8">
        <div className="relative w-20 h-20 rounded-full bg-noir flex items-center justify-center text-white font-serif italic text-3xl mb-4 border-4 border-gold/10">
          {displayName ? displayName.charAt(0) : "G"}
        </div>
        <h3 className="font-serif text-xl text-noir leading-tight">
          {displayName}
        </h3>
        <div className="mt-2 px-4 py-1.5 bg-gold/10 border border-gold/20 text-gold text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
          {tier} Member
        </div>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 space-y-1.5">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all group ${
                isActive
                  ? "bg-noir text-white shadow-lg shadow-noir/10"
                  : "text-noir/50 hover:bg-noir/5 hover:text-noir"
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

      <button className="mt-8 flex items-center gap-4 px-5 py-3.5 text-noir/30 hover:text-rose-500 transition-colors group">
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Heart, Building2, Bell, Settings,
  User, ChevronRight, LogOut, TrendingUp,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";

const navItems = [
  { href: "/dashboard",           icon: LayoutDashboard, label: "Overview"         },
  { href: "/dashboard/saved",     icon: Heart,           label: "Saved Properties" },
  { href: "/dashboard/listings",  icon: Building2,       label: "My Listings"      },
  { href: "/dashboard/alerts",    icon: Bell,            label: "Alerts"           },
  { href: "/dashboard/settings",  icon: Settings,        label: "Settings"         },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname   = usePathname();
  const profile    = useDashboardStore((s) => s.profile);
  const savedCount = useDashboardStore((s) => s.savedPropertyIds.length);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex">
      {/* ── Sidebar ─────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-border shrink-0 fixed top-[73px] bottom-0 overflow-y-auto z-30">

        {/* Profile card */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-secondary text-sm truncate">{profile.name}</p>
              <p className="text-xs text-slate-400 truncate">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ href, icon: Icon, label }) => {
            const exact  = href === "/dashboard";
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/8 text-primary"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-secondary dark:hover:text-slate-200"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 shrink-0 ${active ? "text-primary" : "text-slate-400 group-hover:text-secondary transition-colors"}`} />
                <span className="flex-1">{label}</span>
                {label === "Saved Properties" && savedCount > 0 && (
                  <span className="text-xs font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{savedCount}</span>
                )}
                {active && <ChevronRight className="w-3.5 h-3.5 text-primary/60" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom links */}
        <div className="p-3 border-t border-border space-y-0.5">
          <Link
            href="/search"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-secondary transition-all"
          >
            <TrendingUp className="w-4.5 h-4.5 text-slate-400" />
            Browse Properties
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-all">
            <LogOut className="w-4.5 h-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-border z-30 flex">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${active ? "text-primary" : "text-slate-400"}`}>
              <Icon className="w-5 h-5" />
              <span className="hidden sm:block">{label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Main content ────────────────────────────── */}
      <div className="flex-1 lg:ml-64 pb-20 lg:pb-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}

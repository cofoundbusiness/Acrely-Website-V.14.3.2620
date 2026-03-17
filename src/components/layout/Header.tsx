"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, LayoutDashboard, Heart, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Insights",   href: "/insights"   },
  { name: "Industrial", href: "/industrial" },
  { name: "Multifamily",href: "/multifamily"},
  { name: "Offices",    href: "/offices"    },
  { name: "Land",       href: "/land"       },
  { name: "About",      href: "/about"      },
  { name: "Contact",    href: "/contact"    },
  { name: "Careers",    href: "/careers"    },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 10); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-border shadow-sm py-3"
          : "bg-white dark:bg-slate-900 border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl leading-none tracking-tighter">A</span>
          </div>
          <span className="text-xl font-bold text-secondary tracking-tight">Acrely</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>

          {/* Dashboard dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
              <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-border shadow-lg py-1.5 w-48">
                <Link href="/dashboard"          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> Overview
                </Link>
                <Link href="/dashboard/saved"    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors">
                  <Heart className="w-4 h-4" /> Saved Properties
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
              </div>
            </div>
          </div>

          <Button variant="ghost" className="font-medium">Login</Button>
          <Link href="/post-property">
            <Button className="font-medium">Post Property</Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-2 text-secondary dark:text-slate-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-slate-700 dark:text-slate-200 py-2 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 mt-1 flex flex-col gap-1">
              <Link href="/dashboard"          className="flex items-center gap-2 text-base font-medium text-slate-700 dark:text-slate-200 py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link href="/dashboard/saved"    className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 py-1.5 pl-6 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                <Heart className="w-3.5 h-3.5" /> Saved Properties
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 py-1.5 pl-6 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                <Settings className="w-3.5 h-3.5" /> Settings
              </Link>
            </div>
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
            <Button variant="outline" className="w-full justify-center">Login</Button>
            <Link href="/post-property" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center">Post Property</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";
import { Search, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export function HomeHero() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center overflow-hidden bg-secondary">
      {/* Background Image abstract */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply z-10" />
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" 
          alt="Commercial Real Estate" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="container px-4 md:px-6 relative z-20 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md mb-6">
            <TrendingUp className="mr-2 h-4 w-4 text-accent" />
            <span className="opacity-90">Discover Modern Commercial Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
            Discover Commercial Opportunities
          </h1>
          
          <p className="max-w-[700px] text-lg text-slate-300 mb-10 mx-auto font-light">
            Search warehouses, retail spaces, land, and robust multifamily investments powered by data-driven insights.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`w-full max-w-4xl mx-auto transition-all duration-300 ${searchFocused ? 'scale-[1.02]' : ''}`}
        >
          <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-slate-200 px-4 py-3 md:py-2">
              <Search className="w-5 h-5 text-slate-400 mr-3 hidden sm:block" />
              <input 
                type="text" 
                placeholder="City, State, or Zip" 
                className="w-full outline-none text-slate-800 placeholder:text-slate-400 bg-transparent text-lg"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
            <div className="hidden md:flex flex-1 items-center border-r border-slate-200 px-4 py-2">
              <Building2 className="w-5 h-5 text-slate-400 mr-3" />
              <select className="w-full outline-none text-slate-700 bg-transparent py-1 cursor-pointer appearance-none">
                <option value="">Property Type</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="industrial">Industrial</option>
                <option value="multifamily">Multifamily</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="hidden lg:flex flex-1 flex-col justify-center px-4 py-2 border-r border-slate-200 cursor-pointer">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Cap Rate / Price</span>
              <span className="text-slate-800 font-medium">Any Price & Yield</span>
            </div>
            <Link href="/search" className="contents">
              <Button size="lg" className="h-14 px-8 text-lg rounded-xl flex items-center justify-center bg-primary hover:bg-primary/90 text-white shrink-0">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </Link>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-slate-300 font-medium">Trending Cities:</span>
            {["Dallas", "Houston", "Austin", "Atlanta", "Phoenix"].map((city) => (
              <Link 
                key={city} 
                href={`/search?city=${city.toLowerCase()}`}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm transition-colors backdrop-blur-sm"
              >
                {city}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

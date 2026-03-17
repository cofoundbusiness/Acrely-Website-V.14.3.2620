
import React from 'react';
import { MapPin, Search, ArrowRight, ShieldCheck, PlayCircle, TrendingUp } from 'lucide-react';
import { Button } from '../components/Button';
import { PropertyCard } from '../components/PropertyCard';
import { Property, ViewState } from '../types';

interface HomeProps {
  setView: (view: ViewState) => void;
  properties: Property[];
  onPropertyClick: (p: Property) => void;
}

export const Home: React.FC<HomeProps> = ({ setView, properties, onPropertyClick }) => {
  return (
    <div className="w-full">
      {/* Hero Section - Compacted for Mobile */}
      <section className="relative min-h-[550px] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Interior" 
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-slate-900/40 md:bg-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-16 md:pt-20">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-8 animate-slide-up">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 text-[10px] md:text-xs font-bold tracking-widest uppercase">
              The Future of Real Estate
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              Discover a place <br/>
              you'll love to <span className="text-amber-500 italic font-serif">live.</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed px-2 md:px-4">
              Experience the seamless way to buy, sell, and invest. 
              Zero commissions, AI-verified listings, and fractional ownership.
            </p>

            {/* Search Bar - Stacked & Compact on Mobile */}
            <div className="bg-white dark:bg-slate-900 p-2 md:p-2 rounded-xl md:rounded-2xl shadow-2xl shadow-slate-900/40 max-w-3xl mx-auto flex flex-col md:flex-row gap-2 mt-6 md:mt-10 border border-slate-100 dark:border-slate-800">
              <div className="flex-1 relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 md:w-5 md:h-5 group-focus-within:text-amber-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="City, Locality..." 
                  className="w-full pl-9 md:pl-12 pr-4 py-2.5 md:py-4 bg-slate-50 dark:bg-slate-800 md:bg-transparent dark:md:bg-transparent rounded-lg md:rounded-xl focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800 md:focus:bg-slate-50 dark:md:focus:bg-slate-800 transition-colors text-slate-900 dark:text-white font-medium placeholder:text-slate-400 placeholder:font-normal text-sm md:text-base"
                />
              </div>
              <div className="w-px bg-slate-200 dark:bg-slate-700 my-2 hidden md:block"></div>
              <div className="flex-1 relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 md:w-5 md:h-5 group-focus-within:text-amber-500 transition-colors" />
                 <select className="w-full pl-9 md:pl-12 pr-4 py-2.5 md:py-4 bg-slate-50 dark:bg-slate-800 md:bg-transparent dark:md:bg-transparent rounded-lg md:rounded-xl focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800 md:focus:bg-slate-50 dark:md:focus:bg-slate-800 transition-colors text-slate-900 dark:text-white font-medium appearance-none cursor-pointer text-sm md:text-base">
                    <option>Buy Residential</option>
                    <option>Buy Commercial</option>
                    <option>Rent</option>
                    <option>Plot / Land</option>
                  </select>
              </div>
              <Button onClick={() => setView('buy')} size="lg" className="rounded-lg md:rounded-xl w-full md:w-auto shadow-none py-2.5 md:py-3.5 text-sm md:text-base">
                Search
              </Button>
            </div>
          </div>
        </div>
        
        {/* Stats Strip - Hidden on very small screens, visible on md+ */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-white/5 backdrop-blur-md hidden sm:block">
            <div className="container mx-auto px-6 py-6 flex flex-wrap justify-center gap-12 text-white/80">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    <span className="text-sm font-medium">100% Verified Listings</span>
                </div>
                <div className="flex items-center gap-3">
                    <PlayCircle className="w-6 h-6 text-amber-400" />
                    <span className="text-sm font-medium">Immersive 3D Tours</span>
                </div>
                <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-indigo-400" />
                    <span className="text-sm font-medium">Data-Driven Insights</span>
                </div>
            </div>
        </div>
      </section>

      {/* Featured Properties Grid */}
      <section className="py-10 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-row items-end justify-between mb-6 md:mb-12 gap-2">
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 md:mb-3">Trending Homes</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-base">Curated properties popular near you.</p>
            </div>
            <Button variant="ghost" onClick={() => setView('buy')} size="sm" className="group self-center md:self-auto pl-2 md:pl-4 text-xs md:text-sm">
              View All <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
             {properties.slice(0, 4).map(p => (
               <PropertyCard key={p.id} property={p} onClick={onPropertyClick} />
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

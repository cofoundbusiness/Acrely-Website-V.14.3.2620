
import React, { useState } from 'react';
import { TrendingUp, Clock, ShieldCheck, Check, DollarSign, ArrowRight, Camera, FileText } from 'lucide-react';
import { Button } from '../components/Button';

export const Sell: React.FC = () => {
  const [valuationStep, setValuationStep] = useState(0);

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 animate-fade-in pb-12 md:pb-20 transition-colors duration-300">
      
      {/* Hero Section - Compact on Mobile */}
      <section className="container mx-auto px-4 md:px-6 mb-10 md:mb-20">
        <div className="bg-slate-900 rounded-2xl md:rounded-[2.5rem] p-6 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-40">
             <img 
               src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
               alt="Modern Home" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-2xl animate-slide-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6">
              <DollarSign className="w-3 h-3" /> Sell Your Home
            </span>
            <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Sell for more. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Pay zero commission.</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-300 mb-6 md:mb-8 leading-relaxed">
              We use AI to price your home perfectly and 3D tours to showcase it to the world. 
              Skip the middlemen and keep 100% of your profit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" className="rounded-xl w-full sm:w-auto text-sm md:text-base">Get Free Valuation</Button>
              <Button size="lg" variant="outline" className="rounded-xl w-full sm:w-auto text-white border-slate-600 hover:bg-slate-800 hover:border-slate-500 hover:text-white text-sm md:text-base">How it works</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="container mx-auto px-4 md:px-6 mb-10 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {[
            { icon: TrendingUp, val: "₹4.5L", label: "Average Savings per Sale", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" },
            { icon: Clock, val: "28 Days", label: "Average Time to Sell", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" },
            { icon: ShieldCheck, val: "100%", label: "Verified Buyers", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" }
          ].map((stat, i) => (
             <div key={i} className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{stat.val}</div>
                  <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 md:px-6 mb-12 md:mb-24">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">A smarter way to sell</h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">Traditional selling is stressful. We made it seamless.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            { 
              icon: FileText, 
              step: "01", 
              title: "Instant Valuation", 
              desc: "Enter your address and get an AI-driven price estimate in seconds based on recent market data." 
            },
            { 
              icon: Camera, 
              step: "02", 
              title: "Professional Prep", 
              desc: "We send a team to capture 3D tours, 4K photos, and floor plans at no cost to you." 
            },
            { 
              icon: TrendingUp, 
              step: "03", 
              title: "Smart Listing", 
              desc: "Your home is listed on Acrely and 50+ partner sites, targeted to verified buyers." 
            },
            { 
              icon: Check, 
              step: "04", 
              title: "Close & Save", 
              desc: "Manage offers online. We handle the paperwork. You save the 2-6% brokerage fee." 
            }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 h-full relative z-10">
                <div className="text-5xl md:text-6xl font-bold text-slate-100 dark:text-slate-800 absolute top-4 right-6 -z-10 group-hover:text-slate-50 dark:group-hover:text-slate-700 transition-colors select-none">
                  {item.step}
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-slate-900/20">
                  <item.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">{item.title}</h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Valuation CTA */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-amber-400 rounded-2xl md:rounded-3xl p-6 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6">Ready to see what your home is worth?</h2>
            <p className="text-slate-800 text-sm md:text-lg mb-6 md:mb-8 font-medium">Get a free, no-obligation valuation report delivered to your inbox in minutes.</p>
            
            <div className="bg-white p-2 rounded-xl md:rounded-2xl shadow-lg flex flex-col sm:flex-row gap-2">
              <input 
                type="text" 
                placeholder="Enter your property address..." 
                className="flex-1 px-4 py-3 md:px-6 md:py-4 rounded-lg md:rounded-xl bg-transparent border-none focus:outline-none focus:bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
              />
              <Button size="lg" className="rounded-lg md:rounded-xl shrink-0 w-full sm:w-auto text-sm md:text-base">Get Valuation</Button>
            </div>
            <p className="text-slate-700 text-[10px] md:text-xs mt-4 font-medium flex items-center gap-1 justify-center sm:justify-start">
              <ShieldCheck className="w-3 h-3" /> Your data is private and secure.
            </p>
          </div>
          
          <div className="relative z-10 hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059ee971?auto=format&fit=crop&q=80&w=600" 
              alt="Happy Homeowner" 
              className="rounded-3xl shadow-2xl rotate-3 border-4 border-white/30 w-80"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

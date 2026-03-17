
import React from 'react';
import { Users, Shield, TrendingUp, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen animate-fade-in transition-colors duration-300">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-24 text-center">
        <span className="text-amber-600 font-bold tracking-wider uppercase text-xs mb-4 block animate-slide-up">Our Mission</span>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight animate-slide-up" style={{animationDelay: '0.1s'}}>
          Redefining Real Estate for <br className="hidden md:block" />
          <span className="relative inline-block">
            <span className="relative z-10">the Modern World.</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-amber-200/60 dark:bg-amber-600/40 -z-0 -rotate-1"></span>
          </span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
          Acrely is India's first tech-enabled, zero-commission real estate platform. 
          We combine human expertise with data science to make buying and selling simple, transparent, and efficient.
        </p>
      </section>

      {/* Image Grid */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
          <div className="md:col-span-2 h-64 md:h-full rounded-3xl overflow-hidden relative group shadow-xl">
             <img 
               src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
               alt="Team working" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors"></div>
             <div className="absolute bottom-0 left-0 p-8 text-white">
               <h3 className="text-2xl font-bold mb-2">Built on Trust</h3>
               <p className="text-slate-200">Serving over 10,000+ customers across India.</p>
             </div>
          </div>
          <div className="h-full space-y-6 flex flex-col">
            <div className="h-64 md:h-1/2 rounded-3xl overflow-hidden relative group shadow-xl">
              <img 
               src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600" 
               alt="Meeting" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="h-48 md:h-[calc(50%-1.5rem)] bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 flex flex-col justify-center text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-16 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="text-4xl font-bold text-amber-500 mb-2 relative z-10">₹500Cr+</div>
              <div className="text-slate-400 font-medium relative z-10">Assets Managed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why we started Acrely</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Traditional real estate is broken—hidden fees, endless paperwork, and untrustworthy middlemen. We built Acrely to fix that.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: "Trust First", desc: "We verify every listing physically. No fakes, no scams, just genuine properties." },
              { icon: TrendingUp, title: "Data Driven", desc: "Our valuation models use millions of data points to ensure fair pricing for everyone." },
              { icon: Users, title: "Customer Obsessed", desc: "We don't just close deals; we build relationships. Our support team is here 24/7." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Stats */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">By the numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { label: 'Properties Sold', value: '1,200+' },
               { label: 'Happy Families', value: '3,500+' },
               { label: 'Cities', value: '12' },
               { label: 'Team Members', value: '85' },
             ].map((stat, idx) => (
               <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                 <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                 <div className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

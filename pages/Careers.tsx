
import React from 'react';
import { ArrowRight, Zap, Heart, Coffee, Globe, Laptop } from 'lucide-react';
import { Button } from '../components/Button';

export const Careers: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen animate-fade-in transition-colors duration-300">
      {/* Hero */}
      <section className="container mx-auto px-4 md:px-6 mb-20">
        <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
           {/* Background decorative elements */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px]"></div>

           <div className="relative z-10 animate-slide-up">
             <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6">
               We are hiring
             </span>
             <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
               Build the future of <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Real Estate.</span>
             </h1>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
               Join a team of dreamers, builders, and doers. We are revolutionizing how people buy, sell, and invest in property across India.
             </p>
             <Button variant="white" size="lg" className="rounded-full px-8 h-12">View Open Positions</Button>
           </div>
        </div>
      </section>

      {/* Perks */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Life at Acrely</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Globe, title: "Remote First", desc: "Work from anywhere in the world." },
            { icon: Heart, title: "Health Insurance", desc: "Comprehensive coverage for family." },
            { icon: Laptop, title: "Top Equipment", desc: "MacBook Pro and accessories." },
            { icon: Coffee, title: "Unlimited PTO", desc: "Rest when you need to recharge." },
          ].map((perk, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <perk.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{perk.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="flex items-end justify-between mb-8">
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Open Positions</h2>
           <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">4 roles available</span>
        </div>
        
        <div className="space-y-4">
          {[
            { title: "Senior Full Stack Engineer", dept: "Engineering", loc: "Remote", type: "Full-time" },
            { title: "Product Designer", dept: "Design", loc: "Bangalore", type: "Hybrid" },
            { title: "Real Estate Sales Manager", dept: "Sales", loc: "Mumbai", type: "On-site" },
            { title: "Marketing Lead", dept: "Marketing", loc: "Delhi NCR", type: "Remote" }
          ].map((job, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5 transition-all group cursor-pointer flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">{job.title}</h4>
                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-2">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">{job.dept}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span>{job.loc}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span>{job.type}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-amber-500 group-hover:text-white transition-all transform group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center p-8 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 border-dashed">
          <p className="text-slate-600 dark:text-slate-300 font-medium mb-4">Don't see a role for you?</p>
          <Button variant="outline" className="mx-auto bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">Email us at careers@acrely.in</Button>
        </div>
      </section>
    </div>
  );
};

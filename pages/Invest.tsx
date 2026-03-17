
import React, { useState } from 'react';
import { BarChart3, TrendingUp, ShieldCheck, CheckCircle2, RefreshCw, Copy, Lightbulb, Share2, Loader2, Coins } from 'lucide-react';
import { Button } from '../components/Button';
import { generateRealEstateAdvice } from '../services/geminiService';

export const Invest: React.FC = () => {
  const [amount, setAmount] = useState(10000000);
  const [years, setYears] = useState(5);
  const [aiReport, setAiReport] = useState("");
  const [loadingReport, setLoadingReport] = useState(false);

  const handleGenerateReport = async () => {
    setLoadingReport(true);
    setAiReport("");
    
    const prompt = `Act as a senior wealth manager. I want to invest ₹${(amount/10000000).toFixed(2)} Cr in Indian Commercial Real Estate for ${years} years.
    Search for current commercial rental yields in Bengaluru and Mumbai.
    Suggest a strategy (REITs vs Fractional Ownership vs Direct Purchase).
    Format nicely with Markdown headers. Keep it under 150 words.`;

    const systemContext = "You are an expert financial analyst specializing in Indian Real Estate markets.";
    
    const result = await generateRealEstateAdvice(prompt, systemContext);
    setAiReport(result.text);
    setLoadingReport(false);
  };

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-slate-900 text-white pb-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header - Compact on mobile */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16 animate-slide-up">
           <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6">
             <Coins className="w-3 h-3" /> Fractional Ownership
           </div>
           <h1 className="text-2xl md:text-6xl font-bold mb-3 md:mb-6 tracking-tight leading-tight">
             Invest like the <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Top 1%</span>
           </h1>
           <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
             Own Grade-A commercial assets with as little as ₹5 Lakhs. Earn monthly rental yields 
             and benefit from capital appreciation.
           </p>
        </div>

        {/* Dashboard UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Controls & AI Section */}
          <div className="lg:col-span-7 bg-slate-800/50 rounded-2xl md:rounded-3xl border border-white/5 p-5 md:p-8 backdrop-blur-sm">
             <div className="flex items-center justify-between mb-6 md:mb-8">
               <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                 <BarChart3 className="text-amber-500" /> ROI Calculator
               </h3>
             </div>

             <div className="space-y-6 md:space-y-8">
               {/* Sliders */}
               <div className="bg-slate-900/50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/5 space-y-4 md:space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2 md:mb-4">
                      <label className="text-xs md:text-sm font-medium text-slate-400">Investment Amount</label>
                      <div className="text-lg md:text-2xl font-bold text-white">₹{(amount/100000).toFixed(0)} <span className="text-xs md:text-sm text-slate-500 font-medium">Lakhs</span></div>
                    </div>
                    <input 
                      type="range" min="500000" max="50000000" step="500000" 
                      value={amount} onChange={(e) => setAmount(Number(e.target.value))} 
                      className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2 md:mb-4">
                      <label className="text-xs md:text-sm font-medium text-slate-400">Time Horizon</label>
                      <div className="text-lg md:text-2xl font-bold text-white">{years} <span className="text-xs md:text-sm text-slate-500 font-medium">Years</span></div>
                    </div>
                    <input 
                      type="range" min="1" max="10" 
                      value={years} onChange={(e) => setYears(Number(e.target.value))} 
                      className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" 
                    />
                  </div>
               </div>

               {/* AI Action */}
               <div className="space-y-4">
                 <Button variant="ai" className="w-full py-3 md:py-4 text-sm md:text-base relative overflow-hidden group" onClick={handleGenerateReport} disabled={loadingReport}>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative flex items-center gap-2">
                       {loadingReport ? <Loader2 className="animate-spin w-4 h-4 md:w-5 md:h-5"/> : <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />}
                       {loadingReport ? 'Analyzing...' : 'Generate Investment Strategy'}
                    </span>
                 </Button>

                 {aiReport && (
                   <div className="bg-slate-900 rounded-xl md:rounded-2xl border border-indigo-500/30 p-4 md:p-6 animate-fade-in relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs md:text-sm uppercase tracking-wider">
                          <Lightbulb className="w-4 h-4" /> Acrely Intelligence
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => navigator.clipboard.writeText(aiReport)} className="text-slate-500 hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <div className="prose prose-invert prose-sm max-w-none text-slate-300 text-xs md:text-sm">
                        {aiReport.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
                      </div>
                   </div>
                 )}
               </div>
             </div>
          </div>

          {/* Benefits Column */}
          <div className="lg:col-span-5 space-y-4 md:space-y-6">
            <div className="bg-white text-slate-900 p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-32 bg-amber-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-200 transition-colors"></div>
               <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 relative z-10">Why Fractional?</h3>
               <ul className="space-y-4 md:space-y-5 relative z-10">
                 {[
                   { title: "Accessibility", desc: "Start with ₹5L instead of ₹5Cr." },
                   { title: "Passive Income", desc: "Monthly rental yields deposited to your account." },
                   { title: "Capital Gains", desc: "Benefit from property appreciation over time." },
                   { title: "Liquidity", desc: "Exit anytime via our resale marketplace." }
                 ].map((item, idx) => (
                   <li key={idx} className="flex gap-3 md:gap-4">
                     <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                       <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                     </div>
                     <div>
                       <h4 className="font-bold text-base md:text-lg">{item.title}</h4>
                       <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                     </div>
                   </li>
                 ))}
               </ul>
               <Button className="w-full mt-6 md:mt-8" variant="primary">View Available Assets</Button>
            </div>

            <div className="bg-slate-800 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 flex items-center gap-4">
               <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-emerald-500 shrink-0" />
               <div>
                 <h4 className="font-bold text-white text-base md:text-lg">SEBI Regulated</h4>
                 <p className="text-slate-400 text-xs md:text-sm">All investment vehicles are fully compliant with Indian regulations.</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

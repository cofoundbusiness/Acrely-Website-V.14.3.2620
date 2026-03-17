
import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Mail, Award, Filter, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Agent } from '../types';
import { INITIAL_AGENTS } from '../constants';

export const Agents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = INITIAL_AGENTS.filter(agent => 
      agent.name.toLowerCase().includes(term) || 
      agent.location.toLowerCase().includes(term) ||
      agent.role.toLowerCase().includes(term)
    );
    setAgents(filtered);
  };

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 animate-fade-in pb-12 md:pb-20 transition-colors duration-300">
      
      {/* Header */}
      <section className="container mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-4 md:gap-6 mb-6 md:mb-10">
          <div className="max-w-2xl">
            <span className="text-amber-600 font-bold tracking-wider uppercase text-[10px] md:text-xs mb-2 block">Our Experts</span>
            <h1 className="text-2xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 md:mb-4">
              Find your perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Real Estate Partner.</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Connect with top-rated agents who know your neighborhood inside out.</p>
          </div>
          <div className="hidden md:block">
            <Button variant="outline" className="gap-2">
              Join as an Agent <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search Bar - Stacked on Mobile */}
        <div className="bg-white dark:bg-slate-900 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-3 md:gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 md:w-5 md:h-5" />
            <input 
              type="text" 
              placeholder="Search by name, location..." 
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-800 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 text-sm md:text-base"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <button className="flex-1 md:flex-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg md:rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium text-sm md:text-base">
               <Filter className="w-4 h-4" /> Filters
             </button>
             <Button className="flex-1 md:flex-auto w-full md:w-auto py-2.5 md:py-3 text-sm md:text-base">Search</Button>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="container mx-auto px-4 md:px-6">
        {agents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img 
                    src={agent.image} 
                    alt={agent.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-1 text-amber-400 mb-1">
                      <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-amber-400" />
                      <span className="font-bold text-xs md:text-sm">{agent.rating}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">{agent.name}</h3>
                    <p className="text-slate-200 text-[10px] md:text-xs font-medium">{agent.role}</p>
                  </div>
                </div>

                <div className="p-4 md:p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs md:text-sm">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400" />
                    {agent.location}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 md:gap-3 pb-4 border-b border-slate-50 dark:border-slate-800">
                    <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded-lg md:rounded-xl text-center">
                      <div className="text-base md:text-lg font-bold text-slate-900 dark:text-white">{agent.deals}</div>
                      <div className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-wider font-bold">Deals Closed</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded-lg md:rounded-xl text-center">
                      <div className="text-base md:text-lg font-bold text-slate-900 dark:text-white">4.5<span className="text-[10px] md:text-xs text-slate-400">yrs</span></div>
                      <div className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-wider font-bold">Experience</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium text-xs md:text-sm">
                      <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" /> Message
                    </button>
                    <button className="flex items-center justify-center p-2 md:p-2.5 rounded-lg md:rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white/90 transition-colors shadow-lg shadow-slate-900/20">
                      <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-20 bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">No agents found</h3>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">Try adjusting your search terms or filters.</p>
            <Button variant="ghost" onClick={() => {setSearchTerm(''); setAgents(INITIAL_AGENTS);}} className="mt-4">Clear Search</Button>
          </div>
        )}
      </section>
    </div>
  );
};

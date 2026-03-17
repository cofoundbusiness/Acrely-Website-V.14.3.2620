
import React, { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { Button } from './Button';
import { ViewState } from '../types';

interface NavbarProps {
  view: ViewState;
  setView: (view: ViewState) => void;
  scrolled: boolean;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ view, setView, scrolled, onOpenSettings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTransparent = !scrolled && (view === 'home' || view === 'login' || view === 'signup');
  const textColor = isTransparent ? 'text-white' : 'text-slate-900 dark:text-white';
  const navLinkColor = isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-300 border-b 
        ${!isTransparent 
          ? 'bg-white/90 dark:bg-slate-900/90 border-slate-100 dark:border-slate-800 shadow-sm py-3 md:py-4 backdrop-blur-md' 
          : 'bg-transparent border-transparent py-3 md:py-6'
        }
      `}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setView('home')} 
          className="cursor-pointer flex items-center gap-2 group z-[60] relative"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-900 dark:bg-slate-800 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg shadow-slate-900/20">
            <span className="text-white font-bold text-lg md:text-xl">A</span>
          </div>
          <span className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${mobileMenuOpen ? 'text-white' : textColor}`}>
            acrely<span className="text-amber-500">.</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className={`hidden lg:flex items-center gap-8 ${navLinkColor}`}>
          {['buy', 'sell', 'invest', 'agents', 'blog'].map((item) => (
            <button 
              key={item}
              onClick={() => setView(item as ViewState)}
              className={`text-sm font-medium transition-colors capitalize relative group ${view === item ? 'text-amber-500 font-bold' : ''}`}
            >
              {item}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full ${view === item ? 'w-full' : ''}`}></span>
            </button>
          ))}
        </div>

        {/* Desktop Auth & Settings */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={onOpenSettings}
            className={`p-2 rounded-lg transition-all hover:rotate-45 ${isTransparent ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <div className={`h-6 w-px ${isTransparent ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
          <Button 
            onClick={() => setView('login')}
            variant="ghost"
            className={`${isTransparent ? "text-white hover:bg-white/10" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
          >
            Log In
          </Button>
          <Button 
            onClick={() => setView('signup')}
            variant={isTransparent ? "white" : "primary"}
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden z-[60] flex items-center gap-2">
          <button 
              onClick={onOpenSettings}
              className={`p-2 rounded-lg transition-all ${mobileMenuOpen ? 'text-white/80 hover:bg-white/10' : `${textColor} hover:bg-slate-100 dark:hover:bg-slate-800`}`}
          >
            <Settings className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${mobileMenuOpen ? 'text-white hover:bg-white/10' : `${textColor} hover:bg-slate-100 dark:hover:bg-slate-800`}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900 z-[55] flex flex-col pt-24 px-6 overflow-y-auto transition-all duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
         <div className="flex flex-col gap-6">
           {['buy', 'sell', 'invest', 'agents', 'blog', 'about', 'careers', 'contact'].map((item, idx) => (
            <button 
              key={item}
              onClick={() => { setView(item as ViewState); setMobileMenuOpen(false); }}
              className="text-3xl font-bold text-white py-2 capitalize text-left hover:text-amber-500 transition-colors transform translate-y-0 opacity-100"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {item}
            </button>
          ))}
          <div className="h-px bg-slate-800 my-4 w-20"></div>
          <div className="flex flex-col gap-4">
            <button 
               onClick={() => { setView('login'); setMobileMenuOpen(false); }}
               className="text-xl font-medium text-slate-300 py-2 text-left hover:text-white"
            >
              Log In
            </button>
             <button 
               onClick={() => { setView('signup'); setMobileMenuOpen(false); }}
               className="text-xl font-medium text-amber-500 py-2 text-left hover:text-amber-400"
            >
              Sign Up
            </button>
          </div>
         </div>
      </div>
    </nav>
  );
};

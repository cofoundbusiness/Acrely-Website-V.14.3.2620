
import React from 'react';
import { X, Snowflake, Moon } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSnowEnabled: boolean;
  toggleSnow: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, isSnowEnabled, toggleSnow, isDarkMode, toggleDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm p-6 relative z-10 shadow-2xl animate-zoom-in border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Settings</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSnowEnabled ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                 <Snowflake className="w-5 h-5" />
               </div>
               <div>
                 <div className="font-bold text-slate-900 dark:text-white text-sm">Festive Mode</div>
                 <div className="text-xs text-slate-500 dark:text-slate-400">Enable seasonal snowfall</div>
               </div>
             </div>
             
             {/* Toggle Switch */}
             <button 
               onClick={toggleSnow}
               className={`relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-slate-900 ${isSnowEnabled ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}
             >
               <span 
                 className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 ${isSnowEnabled ? 'translate-x-5' : 'translate-x-0'}`} 
               />
             </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                 <Moon className="w-5 h-5" />
               </div>
               <div>
                 <div className="font-bold text-slate-900 dark:text-white text-sm">Dark Mode</div>
                 <div className="text-xs text-slate-500 dark:text-slate-400">Easy on the eyes</div>
               </div>
             </div>
             
             {/* Toggle Switch */}
             <button 
               onClick={toggleDarkMode}
               className={`relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-slate-900 ${isDarkMode ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}
             >
               <span 
                 className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} 
               />
             </button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
           <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Acrely v2.4.0</p>
        </div>
      </div>
    </div>
  );
};

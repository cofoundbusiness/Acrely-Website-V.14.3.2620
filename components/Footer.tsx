
import React from 'react';
import { Mail, MapPin, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { ViewState } from '../types';

interface FooterProps {
  setView: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
           <div>
             <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 bg-slate-900 dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                 <span className="text-white font-bold text-lg">A</span>
               </div>
               <span className="font-bold text-slate-900 dark:text-white text-xl">acrely.</span>
             </div>
             <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
               The modern standard for real estate in India. Built for trust, speed, and transparency with AI at its core.
             </p>
             <div className="flex gap-4">
               {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                 <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">
                   <Icon className="w-4 h-4" />
                 </a>
               ))}
             </div>
           </div>
           
           <div>
             <h4 className="font-bold text-slate-900 dark:text-white mb-4">Platform</h4>
             <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
               {['Buy a Home', 'Sell Property', 'Fractional Invest', 'Find Agents'].map((item, i) => {
                 const views: ViewState[] = ['buy', 'sell', 'invest', 'agents'];
                 return (
                   <li 
                    key={i} 
                    onClick={() => setView(views[i])} 
                    className="hover:text-amber-600 dark:hover:text-amber-500 cursor-pointer transition-colors"
                   >
                    {item}
                   </li>
                 );
               })}
             </ul>
           </div>
           
           <div>
             <h4 className="font-bold text-slate-900 dark:text-white mb-4">Company</h4>
             <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
               <li onClick={() => setView('about')} className="hover:text-amber-600 dark:hover:text-amber-500 cursor-pointer transition-colors">About Us</li>
               <li onClick={() => setView('careers')} className="hover:text-amber-600 dark:hover:text-amber-500 cursor-pointer transition-colors">Careers</li>
               <li onClick={() => setView('blog')} className="hover:text-amber-600 dark:hover:text-amber-500 cursor-pointer transition-colors">Blog</li>
               <li className="hover:text-amber-600 dark:hover:text-amber-500 cursor-pointer transition-colors">Legal & Privacy</li>
             </ul>
           </div>
           
           <div>
             <h4 className="font-bold text-slate-900 dark:text-white mb-4">Contact</h4>
             <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
               <li onClick={() => setView('contact')} className="hover:text-amber-600 dark:hover:text-amber-500 cursor-pointer transition-colors flex items-center gap-2">
                 <Mail className="w-4 h-4 text-amber-500" /> Contact Support
               </li>
               <li className="flex items-start gap-2">
                 <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> 
                 <span>Whitefield, Bangalore<br/>India 560066</span>
               </li>
             </ul>
           </div>
        </div>
        
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p>© 2024 Acrely Real Estate Technologies Pvt Ltd.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

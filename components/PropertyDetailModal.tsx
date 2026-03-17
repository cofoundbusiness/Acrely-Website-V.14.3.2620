
import React, { useState, useEffect } from 'react';
import { X, Building, ChevronLeft, ChevronRight, Maximize2, Minimize2, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Property } from '../types';

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [bookingState, setBookingState] = useState<'idle' | 'form' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', contact: '' });

  useEffect(() => {
    setCurrentImageIndex(0);
    setIsFullScreen(false);
    setBookingState('idle');
    setFormData({ name: '', contact: '' });
  }, [property]);

  const nextImage = (e: React.MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % (property.images?.length || 1));
  };

  const prevImage = (e: React.MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + (property.images?.length || 1)) % (property.images?.length || 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (bookingState === 'form') return; // Prevent navigation when typing
    if (e.key === 'ArrowRight') nextImage(e as any);
    if (e.key === 'ArrowLeft') prevImage(e as any);
    if (e.key === 'Escape') {
      if (isFullScreen) {
        setIsFullScreen(false);
      } else {
        onClose();
      }
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => {
      setBookingState('success');
    }, 800);
  };

  const getTimingMessage = () => {
    const hour = new Date().getHours();
    const isWorkingHours = hour >= 9 && hour < 17;
    
    if (isWorkingHours) {
      return "Our agents will call you back within 2 hours.";
    } else {
      return "It's currently after hours. We'll call you first thing tomorrow morning.";
    }
  };

  // Full Screen View
  if (isFullScreen) {
    return (
      <div 
        className="fixed inset-0 z-[200] bg-black flex flex-col animate-fade-in"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        autoFocus
      >
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/60 to-transparent">
          <div className="text-white/80 text-sm font-medium">
            {currentImageIndex + 1} / {property.images?.length}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsFullScreen(false)} 
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsFullScreen(false)} 
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Fullscreen Image */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden group">
          <img 
            src={property.images?.[currentImageIndex] || property.image} 
            className="max-w-full max-h-full object-contain transition-transform duration-300" 
            alt={`Full view ${currentImageIndex + 1}`} 
          />
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevImage} 
            className="absolute left-4 p-4 rounded-full text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 outline-none focus:opacity-100"
          >
            <ChevronLeft className="w-10 h-10 drop-shadow-lg" />
          </button>
          <button 
            onClick={nextImage} 
            className="absolute right-4 p-4 rounded-full text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 outline-none focus:opacity-100"
          >
            <ChevronRight className="w-10 h-10 drop-shadow-lg" />
          </button>
        </div>

        {/* Bottom Thumbnails */}
        <div className="h-20 bg-black/80 flex items-center justify-center gap-2 p-4 overflow-x-auto">
          {property.images?.map((img, idx) => (
             <button 
               key={idx} 
               onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
               className={`h-12 w-16 rounded-md overflow-hidden border-2 transition-all shrink-0 ${idx === currentImageIndex ? 'border-amber-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
             >
               <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx}`} />
             </button>
          ))}
        </div>
      </div>
    );
  }

  // Regular Modal View
  return (
    <div 
      className="fixed inset-0 z-[150] flex items-end md:items-center justify-center p-0 md:p-4 outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white dark:bg-slate-900 w-full h-[95vh] md:h-auto md:max-h-[90vh] md:max-w-6xl rounded-t-3xl md:rounded-3xl relative z-10 shadow-2xl animate-zoom-in flex flex-col md:flex-row overflow-hidden transition-colors duration-300">
         
         {/* Close Button */}
         <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/20 md:bg-white/50 dark:md:bg-black/50 backdrop-blur-md rounded-full text-white md:text-slate-900 dark:md:text-white hover:bg-black/40 md:hover:bg-white dark:md:hover:bg-slate-800 transition-colors">
           <X className="w-5 h-5" />
         </button>
         
         {/* Gallery Section */}
         <div 
           className="h-72 md:h-auto md:w-3/5 shrink-0 relative group bg-slate-900 select-none cursor-zoom-in"
           onClick={() => setIsFullScreen(true)}
         >
           <img 
             src={property.images?.[currentImageIndex] || property.image} 
             className="w-full h-full object-cover transition-opacity duration-300" 
             alt={`${property.title} view ${currentImageIndex + 1}`} 
           />
           
           {/* Full Screen Hint */}
           <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-black/50 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2">
                <Maximize2 className="w-3 h-3" /> Full Screen
              </span>
           </div>

           {/* Navigation Arrows (Modal Mode) */}
           <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <button 
                onClick={prevImage} 
                className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 transition-all shadow-lg pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextImage} 
                className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 transition-all shadow-lg pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
           </div>

           {/* Mobile Gradient Info */}
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent md:hidden pointer-events-none"></div>
           <div className="absolute bottom-4 left-4 md:hidden z-10">
              <div className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded inline-block mb-1">
                {property.status}
              </div>
              <h3 className="text-white text-xl font-bold">{property.priceDisplay}</h3>
           </div>

           {/* Desktop Thumbnails Overlay */}
           <div className="hidden md:flex absolute bottom-4 left-0 right-0 justify-center gap-2 px-4 overflow-x-auto hide-scrollbar z-20 pointer-events-none">
              {property.images?.map((img, idx) => (
                 <button 
                   key={idx} 
                   onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                   className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shadow-lg shrink-0 pointer-events-auto ${idx === currentImageIndex ? 'border-amber-500 scale-110 ring-2 ring-black/50' : 'border-white/20 opacity-70 hover:opacity-100 hover:border-white'}`}
                 >
                   <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
                 </button>
              ))}
           </div>
         </div>
         
         {/* Content Section */}
         <div className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto bg-white dark:bg-slate-900 relative">
           <div className="flex flex-wrap gap-2 mb-4">
             {property.tags.map(t => <span key={t} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide">{t}</span>)}
             <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-emerald-100 dark:border-emerald-800">{property.status}</span>
           </div>
           
           <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">{property.title}</h2>
           <div className="text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2 text-sm font-medium">
             <Building className="w-4 h-4" /> {property.location}
           </div>
           
           <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm md:text-base border-l-4 border-amber-500 pl-4">{property.description}</p>
           
           <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
              <div className="border border-slate-100 dark:border-slate-800 p-3 md:p-4 rounded-2xl text-center bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all">
                <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{property.beds || '-'}</div>
                <div className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Bedrooms</div>
              </div>
              <div className="border border-slate-100 dark:border-slate-800 p-3 md:p-4 rounded-2xl text-center bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all">
                <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{property.baths || '-'}</div>
                <div className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Bathrooms</div>
              </div>
              <div className="border border-slate-100 dark:border-slate-800 p-3 md:p-4 rounded-2xl text-center bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all">
                <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{property.sqft}</div>
                <div className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Sqft</div>
              </div>
           </div>

           {/* Bottom Actions - Always Visible */}
           <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 min-h-[100px] flex items-center">
              <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-auto text-center md:text-left hidden md:block">
                  <div className="text-xs text-slate-400 font-bold uppercase">Total Price</div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{property.priceDisplay}</div>
                </div>
                {/* Mobile Price Display */}
                <div className="w-full flex justify-between md:hidden items-center">
                   <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{property.priceDisplay}</div>
                </div>
                <Button 
                  onClick={() => setBookingState('form')}
                  className="w-full md:w-auto md:ml-auto h-12 md:h-14 text-base shadow-xl shadow-slate-900/10 dark:shadow-black/20 px-8 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900"
                >
                  Book a Site Visit
                </Button>
              </div>
           </div>

           {/* Slide-Up Drawer for Form / Success */}
           {(bookingState === 'form' || bookingState === 'success') && (
             <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-900/20 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 p-6 z-30 animate-slide-up">
                
                {bookingState === 'form' && (
                  <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-500">
                             <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Schedule Visit</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Available 9 AM - 5 PM</p>
                          </div>
                       </div>
                       <button 
                         type="button" 
                         onClick={() => setBookingState('idle')}
                         className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                       >
                         <X className="w-5 h-5" />
                       </button>
                    </div>

                    <div className="space-y-3">
                       <input 
                          autoFocus
                          required
                          placeholder="Your Name" 
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm font-medium text-slate-900 dark:text-white"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                        <input 
                          required
                          placeholder="Phone Number" 
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm font-medium text-slate-900 dark:text-white"
                          value={formData.contact}
                          onChange={e => setFormData({...formData, contact: e.target.value})}
                        />
                    </div>
                    
                    <Button type="submit" className="w-full py-3.5 text-base shadow-lg shadow-slate-900/10">Confirm Request</Button>
                  </form>
                )}

                {bookingState === 'success' && (
                  <div className="flex flex-col items-center text-center py-4">
                     <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4 animate-[bounce_1s_ease-in-out_1]">
                        <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                     </div>
                     <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Request Received!</h4>
                     <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                       {getTimingMessage()}
                     </p>
                     <Button 
                       onClick={() => setBookingState('idle')} 
                       variant="outline" 
                       className="min-w-[120px]"
                     >
                       Close
                     </Button>
                  </div>
                )}
             </div>
           )}

         </div>
      </div>
    </div>
  );
};

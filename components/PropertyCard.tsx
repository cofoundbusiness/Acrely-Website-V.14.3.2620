
import React, { memo } from 'react';
import { Heart, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick: (p: Property) => void;
}

export const PropertyCard = memo(({ property, onClick }: PropertyCardProps) => (
  <div 
    onClick={() => onClick(property)}
    className="bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full will-change-transform"
  >
    {/* Image Container - Compact height on mobile */}
    <div className="relative h-48 md:h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img 
        src={property.image} 
        alt={property.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute top-3 left-3 flex gap-2">
        {property.tags.map((tag, idx) => (
          <span key={idx} className="bg-slate-900/80 text-white backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            {tag}
          </span>
        ))}
      </div>
      <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-rose-500 transition-all shadow-sm z-10">
        <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
      </button>
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-3 text-white">
        <p className="text-xl md:text-2xl font-bold tracking-tight">{property.priceDisplay}</p>
      </div>
    </div>

    {/* Content - Compact padding on mobile */}
    <div className="p-3 md:p-5 flex flex-col flex-grow">
      <div className="mb-2 md:mb-3">
        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">{property.title}</h3>
        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-0.5 md:mt-1">
          <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 md:gap-2 py-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
        {property.type !== 'Plot' && (
          <>
            <div className="flex flex-col items-center justify-center p-1.5 md:p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Bed className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 mb-0.5" />
              <span className="text-[10px] md:text-xs font-semibold text-slate-700 dark:text-slate-300">{property.beds} Bed</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1.5 md:p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Bath className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 mb-0.5" />
              <span className="text-[10px] md:text-xs font-semibold text-slate-700 dark:text-slate-300">{property.baths} Bath</span>
            </div>
          </>
        )}
        <div className="flex flex-col items-center justify-center p-1.5 md:p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <Maximize className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 mb-0.5" />
          <span className="text-[10px] md:text-xs font-semibold text-slate-700 dark:text-slate-300">{property.sqft} sqft</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50 dark:border-slate-800">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{property.type}</span>
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-800">{property.status}</span>
      </div>
    </div>
  </div>
));

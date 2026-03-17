
import React, { useState, useMemo } from 'react';
import { Filter, Map, ChevronDown, Search, X } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/Button';
import { Property } from '../types';

interface BuyProps {
  properties: Property[];
  onPropertyClick: (p: Property) => void;
}

export const Buy: React.FC<BuyProps> = ({ properties, onPropertyClick }) => {
  const [filters, setFilters] = useState({
    type: 'All',
    minPrice: 0,
    maxPrice: 100000000,
    beds: 'Any',
    search: ''
  });
  
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesType = filters.type === 'All' || p.type === filters.type;
      const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const matchesBeds = filters.beds === 'Any' || (p.beds >= parseInt(filters.beds));
      const matchesSearch = p.location.toLowerCase().includes(filters.search.toLowerCase()) || 
                            p.title.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesType && matchesPrice && matchesBeds && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // Default (mock newest)
    });
  }, [properties, filters, sortBy]);

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sticky Top Bar for Mobile/Tablet */}
      <div className="sticky top-16 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 md:hidden flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search location..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm focus:outline-none text-slate-900 dark:text-white"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
        <button 
          onClick={() => setShowFiltersMobile(true)}
          className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 flex items-start gap-8">
        
        {/* Sidebar Filters (Desktop) */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 md:translate-x-0 md:static md:w-64 md:shadow-none md:bg-transparent md:block shrink-0 ${showFiltersMobile ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full overflow-y-auto p-6 md:p-0 md:overflow-visible">
            <div className="flex items-center justify-between mb-6 md:hidden">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Filters</h2>
              <button onClick={() => setShowFiltersMobile(false)}><X className="w-6 h-6 text-slate-500 dark:text-slate-400" /></button>
            </div>

            <div className="space-y-8">
              {/* Desktop Search */}
              <div className="hidden md:block relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="City, Zip, Address" 
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 transition-all text-sm text-slate-900 dark:text-white"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                 />
              </div>

              {/* Property Type */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Property Type</h3>
                <div className="space-y-2">
                  {['All', 'Apartment', 'Villa', 'Penthouse', 'Plot'].map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.type === type ? 'bg-amber-500 border-amber-500' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 group-hover:border-amber-400'}`}>
                        {filters.type === type && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <input 
                        type="radio" 
                        name="type" 
                        className="hidden" 
                        checked={filters.type === type}
                        onChange={() => setFilters({...filters, type})}
                      />
                      <span className={`${filters.type === type ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-600 dark:text-slate-400'} transition-colors`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Max Price</h3>
                <input 
                  type="range" 
                  min="5000000" 
                  max="100000000" 
                  step="5000000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  <span>₹50L</span>
                  <span>₹{filters.maxPrice >= 100000000 ? '10 Cr+' : `${(filters.maxPrice / 10000000).toFixed(1)} Cr`}</span>
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Bedrooms</h3>
                <div className="flex flex-wrap gap-2">
                  {['Any', '1', '2', '3', '4+'].map(bed => (
                    <button
                      key={bed}
                      onClick={() => setFilters({...filters, beds: bed === '4+' ? '4' : bed})}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        (bed === 'Any' && filters.beds === 'Any') || (bed !== 'Any' && filters.beds === bed.replace('+','')) 
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100' 
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                      }`}
                    >
                      {bed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mock Map View Toggle */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-4 text-white relative overflow-hidden cursor-not-allowed opacity-80">
                  <div className="absolute inset-0 bg-white/5"></div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Map View</span>
                    <Map className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-xs text-slate-400">Interactive map search coming soon.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile filters */}
        {showFiltersMobile && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowFiltersMobile(false)}></div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {filteredProperties.length} Properties <span className="font-normal text-slate-500 dark:text-slate-400 text-lg">for sale</span>
            </h1>
            
            <div className="relative inline-block w-48">
              <select 
                className="w-full appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 cursor-pointer text-slate-900 dark:text-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} onClick={onPropertyClick} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No properties found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Try adjusting your filters to find what you're looking for.</p>
              <Button 
                variant="outline" 
                onClick={() => setFilters({ type: 'All', minPrice: 0, maxPrice: 100000000, beds: 'Any', search: '' })}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

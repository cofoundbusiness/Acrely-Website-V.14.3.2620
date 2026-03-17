"use client";

import { useSearchStore } from "@/lib/store";
import { Search, SlidersHorizontal, Map as MapIcon, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export function FilterSidebar() {
  const { 
    searchQuery, setSearchQuery, 
    propertyType, setPropertyType, 
    minPrice, maxPrice, setPriceRange,
    minCapRate, setMinCapRate,
    resetFilters
  } = useSearchStore();

  const [localMinPrice, setLocalMinPrice] = useState(minPrice?.toString() || "");
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice?.toString() || "");

  const handlePriceApply = () => {
    setPriceRange(
      localMinPrice ? parseInt(localMinPrice, 10) : null,
      localMaxPrice ? parseInt(localMaxPrice, 10) : null
    );
  };

  return (
    <aside className="w-full lg:w-72 bg-white border-r border-border p-5 h-full overflow-y-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" /> Filters
        </h2>
        <button 
          onClick={() => {
            resetFilters();
            setLocalMinPrice("");
            setLocalMaxPrice("");
          }}
          className="text-xs text-slate-500 hover:text-primary flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Location or Keyword</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="City, state, zip..." 
              className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Property Type</label>
          <select 
            className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Office">Office</option>
            <option value="Retail">Retail</option>
            <option value="Industrial">Industrial</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Multifamily">Multifamily</option>
            <option value="Land">Land</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Price Range</label>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
            />
            <span className="text-slate-400">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="w-full mt-2" onClick={handlePriceApply}>
            Apply Price
          </Button>
        </div>

        {/* Cap Rate */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex justify-between">
            Minimum Cap Rate
            <span className="text-primary font-semibold">{minCapRate ? `${minCapRate}%` : 'Any'}</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="15" 
            step="0.5"
            className="w-full accent-primary"
            value={minCapRate || 0}
            onChange={(e) => setMinCapRate(parseFloat(e.target.value) || null)}
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>Any</span>
            <span>15%+</span>
          </div>
        </div>
      </div>

    </aside>
  );
}

"use client";

import { useSearchStore } from "@/lib/store";
import { FilterSidebar } from "@/components/layout/FilterSidebar";
import { mockProperties } from "@/mock-data/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { MinimalMap } from "@/components/map/MinimalMap";
import { useEffect, useState } from "react";
import { MapIcon, List, ArrowDownUp, Search as SearchIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SearchPage() {
  const { 
    showMap, setShowMap, 
    searchQuery, propertyType, minPrice, maxPrice, minCapRate, sortBy 
  } = useSearchStore();

  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: searchQuery,
            propertyType,
            minPrice,
            maxPrice,
            minCapRate,
            sortBy
          })
        });
        const json = await res.json();
        
        // Map Prisma format back to component expectations
        if (json.status === 'success') {
          const mapped = json.data.map((p: any) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            address: {
              street: p.streetAddress,
              city: p.city,
              state: p.state,
              zip: p.zipCode,
              coordinates: [p.lng || 0, p.lat || 0]
            },
            capRate: p.capRate || 0,
            noi: p.noi || 0,
            sqft: p.sqft || 0,
            type: p.propertyType,
            images: p.images?.length > 0 ? p.images.map((img: any) => img.url) : ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"],
            tags: [],
            description: p.description
          }));
          setFilteredProperties(mapped);
        }
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce to avoid spamming API
    const timeoutId = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, propertyType, minPrice, maxPrice, minCapRate, sortBy]);

  return (
    <div className="flex flex-col h-[calc(100vh-73px)] overflow-hidden">
      {/* Search Header / Control Bar */}
      <div className="bg-white border-b border-border px-4 py-3 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-secondary">
            {filteredProperties.length} Properties
          </span>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
            <span className="bg-slate-100 px-3 py-1 rounded-full">All Markets</span>
            <span className="bg-slate-100 px-3 py-1 rounded-full">For Sale</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center border border-border rounded-lg p-1 bg-slate-50">
            <button 
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!showMap ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-secondary'}`}
              onClick={() => setShowMap(false)}
            >
              <List className="w-4 h-4" /> Grid
            </button>
            <button 
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showMap ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-secondary'}`}
              onClick={() => setShowMap(true)}
            >
              <MapIcon className="w-4 h-4" /> Map
            </button>
          </div>
          
          <Button variant="outline" size="sm" className="hidden md:flex">
             <ArrowDownUp className="w-4 h-4 mr-2" /> Sort
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div className="hidden lg:block w-72 shrink-0 border-r border-border bg-white z-10 transition-all">
          <FilterSidebar />
        </div>

        {/* Listings Grid */}
        <div className={`flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6 transition-all duration-300 ${showMap ? 'lg:max-w-xl xl:max-w-2xl' : 'w-full'}`}>
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <h3 className="text-xl font-bold text-secondary mb-2">Searching Properties...</h3>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-border">
                <SearchIcon className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">No properties found</h3>
              <p className="text-slate-500 max-w-sm">Try adjusting your filters, location or price range to find what you're looking for.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${showMap ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>

        {/* Map View */}
        {showMap && (
          <div className="hidden lg:block flex-1 relative bg-slate-200">
             <MinimalMap />
          </div>
        )}
      </div>
    </div>
  );
}

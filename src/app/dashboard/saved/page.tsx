"use client";

import { useDashboardStore } from "@/lib/store";
import { mockProperties } from "@/mock-data/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SavedPropertiesPage() {
  const { savedPropertyIds, unsaveProperty } = useDashboardStore();
  const saved = mockProperties.filter((p) => savedPropertyIds.includes(p.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Saved Properties</h1>
          <p className="text-slate-500 text-sm mt-1">
            {saved.length} {saved.length === 1 ? "property" : "properties"} saved
          </p>
        </div>
        {saved.length > 0 && (
          <Link href="/search">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" /> Browse More
            </Button>
          </Link>
        )}
      </div>

      {saved.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-border p-16 text-center"
        >
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-slate-200" />
          </div>
          <h3 className="text-lg font-bold text-secondary mb-2">No saved properties yet</h3>
          <p className="text-slate-400 max-w-sm mx-auto text-sm mb-6">
            Tap the heart icon on any listing to save it here for easy access.
          </p>
          <Link href="/search">
            <Button>Explore Listings</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {saved.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="relative group"
            >
              <PropertyCard property={property} />
              {/* Remove overlay */}
              <button
                onClick={() => unsaveProperty(property.id)}
                className="absolute top-14 right-4 z-20 px-3 py-1.5 bg-white/90 backdrop-blur text-xs font-semibold text-red-500 border border-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 shadow-sm"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

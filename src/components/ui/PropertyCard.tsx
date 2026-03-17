"use client";

import { useState } from "react";
import { Property } from "@/types/property";
import { Heart, ChevronLeft, ChevronRight, MapPin, Building2, TrendingUp, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyCardProps {
  property: Property | any;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaved(!isSaved);
  };

  // Format currency — Indian market (₹ Lakhs / Crores)
  const formatCurrency = (value: number) => {
    if (value >= 10_000_000) {
      const cr = value / 10_000_000;
      return `₹${parseFloat(cr.toFixed(2))} Cr`;
    } else if (value >= 100_000) {
      const l = value / 100_000;
      return `₹${parseFloat(l.toFixed(2))} L`;
    }
    return `₹${value.toLocaleString("en-IN")}`;
  };

  return (
    <motion.div
      className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
    >
      {/* Image Gallery */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImage}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={property.images[currentImage] || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-secondary rounded shadow-sm">
            {property.type}
          </span>
          {property.capRate > 6 && (
            <span className="px-2 py-1 text-xs font-semibold bg-accent/90 backdrop-blur-sm text-white rounded shadow-sm">
              High Yield
            </span>
          )}
          {property.analytics && property.analytics.dealScore && (
            <span className="px-2 py-1 text-xs font-bold bg-[#f59e0b]/90 backdrop-blur-sm text-yellow-900 rounded shadow-sm">
              Deal Score: {property.analytics.dealScore}
            </span>
          )}
          {property.analytics && property.analytics.areaGrowthSignal && (
            <span className={`px-2 py-1 text-xs font-bold rounded shadow-sm backdrop-blur-sm ${
              property.analytics.areaGrowthSignal === 'High' ? 'bg-emerald-500/90 text-white' : 
              property.analytics.areaGrowthSignal === 'Declining' ? 'bg-red-500/90 text-white' : 
              'bg-blue-500/90 text-white'
            }`}>
              Growth: {property.analytics.areaGrowthSignal}
            </span>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={toggleSave}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-400 hover:text-red-500 transition-colors shadow-sm z-10"
        >
          <Heart className={`w-5 h-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Carousel Controls */}
        {property.images.length > 1 && (
          <div className={`absolute inset-0 flex items-center justify-between px-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={prevImage}
              className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Carousel Indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {property.images.map((_: any, i: number) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  currentImage === i ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <Link href={`/property/${property.id}`} className="flex-col flex flex-1 p-5">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-bold text-lg text-secondary line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <span className="font-bold text-lg text-primary shrink-0">
            {formatCurrency(property.price)}
          </span>
        </div>

        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 shrink-0" />
          <span className="truncate">{property.address.street}, {property.address.city}, {property.address.state}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 flex items-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3" /> Cap Rate
            </span>
            <span className="font-semibold text-secondary">
              {property.capRate > 0 ? `${property.capRate}%` : 'N/A'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 flex items-center gap-1 mb-1">
              <Building2 className="w-3 h-3" /> Occupancy
            </span>
            <span className="font-semibold text-secondary">
              {property.occupancy > 0 ? `${property.occupancy}%` : 'Vacant'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 flex items-center gap-1 mb-1">
              <Maximize2 className="w-3 h-3" /> Size
            </span>
            <span className="font-semibold text-secondary">
              {property.sqft > 0 ? `${property.sqft.toLocaleString()} Sq Ft` : `${property.lotSizeAcres} Acres`}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 flex items-center gap-1 mb-1">
               NOI
            </span>
            <span className="font-semibold text-secondary">
              {property.noi > 0 ? formatCurrency(property.noi) : 'N/A'}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">ID: {property.id}</span>
          <span className="text-sm font-semibold text-primary flex items-center group-hover:translate-x-1 transition-transform">
            View Details <ChevronRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

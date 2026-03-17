"use client";

import { useParams } from "next/navigation";
import { mockProperties } from "@/mock-data/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Building2, TrendingUp, Maximize2, Users,
  Calendar, CheckCircle2, Heart, Share2, Mail,
  Star, ShieldCheck, Zap, BarChart3,
  Phone, DollarSign,
} from "lucide-react";
import { useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatINR(value: number): string {
  if (value >= 10_000_000) return `₹${parseFloat((value / 10_000_000).toFixed(2))} Cr`;
  if (value >= 100_000)    return `₹${parseFloat((value / 100_000).toFixed(2))} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

function getAIRecommendation(capRate: number, occupancy: number): { label: string; color: string } {
  const score = capRate * 10 + occupancy * 0.4;
  if (score >= 120) return { label: "Strong Investment", color: "text-emerald-600 bg-emerald-50" };
  if (score >= 80)  return { label: "Moderate",          color: "text-amber-600 bg-amber-50" };
  return                  { label: "High Risk",           color: "text-red-600 bg-red-50" };
}

function derivedScores(capRate: number, occupancy: number, yearBuilt: number) {
  const currentYear = 2026;
  const age = currentYear - (yearBuilt || currentYear);
  const roiScore       = Math.min(100, Math.round(capRate * 12 + 10));
  const constructionScore = Math.min(100, Math.max(0, 100 - age * 2));
  const lifestyleScore = Math.min(100, Math.round(occupancy * 0.95 + capRate * 2));
  const dealScore      = Math.round((roiScore + constructionScore + lifestyleScore) / 3);
  return { roiScore, constructionScore, lifestyleScore, dealScore };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className={`text-sm font-bold ${color}`}>{score}/100</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-red-400"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
}

const investmentHighlights = [
  { icon: TrendingUp, text: "Strong rental demand driven by IT / industrial growth corridor" },
  { icon: ShieldCheck, text: "Established micro-market with proven occupancy track record" },
  { icon: Zap,        text: "Excellent connectivity — NH-48 / Chennai Outer Ring Road access" },
  { icon: BarChart3,  text: "Consistent year-on-year appreciation in the 8–12% range" },
  { icon: Star,       text: "High-profile corporate and institutional tenants" },
  { icon: CheckCircle2, text: "Zoned for commercial / industrial use; approvals in place" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  const property = mockProperties.find((p) => p.id === id)
    ?? mockProperties.find((p) => p.id === `prop-00${id}`)
    ?? mockProperties.find((_, idx) => String(idx + 1) === id)
    ?? null;

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 text-center px-4">
        <Building2 className="w-16 h-16 text-slate-300" />
        <h1 className="text-3xl font-bold text-secondary">Property Not Found</h1>
        <p className="text-slate-500 max-w-sm">
          The listing you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/search">
          <Button>Browse All Properties</Button>
        </Link>
      </div>
    );
  }

  const related = mockProperties.filter((p) => p.id !== property.id).slice(0, 3);
  const scores  = derivedScores(property.capRate, property.occupancy, property.yearBuilt);
  const aiRec   = getAIRecommendation(property.capRate, property.occupancy);
  const pricePerSqft = property.sqft > 0 ? property.price / property.sqft : null;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">

      {/* ── Hero Image Gallery ──────────────────────────────── */}
      <div className="w-full bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex gap-3 h-[50vh] md:h-[62vh]">
            {/* Main image */}
            <div className="flex-1 relative rounded-2xl overflow-hidden cursor-pointer">
              <Image
                src={property.images[activeImage] || property.images[0]}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              {/* Overlay badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 text-xs font-bold bg-slate-900/80 backdrop-blur text-white rounded-lg">
                  {property.type}
                </span>
                {property.capRate > 6 && (
                  <span className="px-3 py-1.5 text-xs font-bold bg-emerald-500/90 backdrop-blur text-white rounded-lg">
                    High Yield
                  </span>
                )}
              </div>
              {/* Image counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur text-white text-xs font-medium rounded-lg">
                {activeImage + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="hidden md:flex flex-col gap-3 w-48">
                {property.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-1 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      activeImage === i ? "border-primary opacity-100" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="200px" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Main Content ─────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Property Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-bold bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                  {property.type}
                </span>
                {property.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3 leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center text-slate-500 text-base gap-1">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{property.address.street}, {property.address.city}, {property.address.state}</span>
              </div>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
            >
              {[
                { icon: TrendingUp,  label: "Cap Rate",    value: property.capRate > 0 ? `${property.capRate}%` : "N/A", accent: property.capRate > 6 },
                { icon: DollarSign,  label: "NOI",         value: property.noi > 0 ? formatINR(property.noi) : "N/A", accent: false },
                { icon: Maximize2,   label: "Size",        value: property.sqft > 0 ? `${property.sqft.toLocaleString()} ft²` : `${property.lotSizeAcres} Acres`, accent: false },
                { icon: Users,       label: "Occupancy",   value: property.occupancy > 0 ? `${property.occupancy}%` : "Vacant", accent: property.occupancy >= 90 },
                { icon: Calendar,    label: "Year Built",  value: property.yearBuilt || "N/A", accent: false },
              ].map(({ icon: Icon, label, value, accent }) => (
                <div key={label} className="bg-white rounded-xl border border-border p-4 flex flex-col gap-1 shadow-sm">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${accent ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-500"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</span>
                  <span className={`text-base font-bold ${accent ? "text-emerald-600" : "text-secondary"}`}>{value}</span>
                </div>
              ))}
            </motion.div>

            {/* Investment Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white rounded-2xl border border-border p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-secondary mb-5">Investment Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {investmentHighlights.map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-slate-600 text-sm leading-relaxed">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Acrely AI Scoring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-2xl border border-border p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-bold text-secondary">Acrely AI Intelligence</h2>
                  <p className="text-sm text-slate-400 mt-0.5">Scores computed from market and property data</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${aiRec.color}`}>
                    {aiRec.label}
                  </div>
                  <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold">
                    Deal Score: {scores.dealScore}
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <ScoreBar
                  label="ROI Score"
                  score={scores.roiScore}
                  color={scores.roiScore >= 80 ? "text-emerald-600" : scores.roiScore >= 60 ? "text-amber-600" : "text-red-500"}
                />
                <ScoreBar
                  label="Construction Quality"
                  score={scores.constructionScore}
                  color={scores.constructionScore >= 80 ? "text-emerald-600" : scores.constructionScore >= 60 ? "text-amber-600" : "text-red-500"}
                />
                <ScoreBar
                  label="Lifestyle & Area Growth"
                  score={scores.lifestyleScore}
                  color={scores.lifestyleScore >= 80 ? "text-emerald-600" : scores.lifestyleScore >= 60 ? "text-amber-600" : "text-red-500"}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white rounded-2xl border border-border p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-secondary mb-4">Property Overview</h2>
              <p className="text-slate-600 leading-relaxed max-w-3xl text-base">{property.description}</p>
            </motion.div>

            {/* Financial Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" /> Financials
                </h2>
                {[
                  { label: "Asking Price",   value: formatINR(property.price) },
                  { label: "Cap Rate",        value: property.capRate > 0 ? `${property.capRate}%` : "N/A" },
                  { label: "NOI (Annual)",    value: property.noi > 0 ? formatINR(property.noi) : "N/A" },
                  { label: "Price / Sq Ft",  value: pricePerSqft ? formatINR(pricePerSqft) : "N/A" },
                  { label: "Expected Return", value: property.capRate > 0 ? `${(property.capRate * 1.15).toFixed(1)}% (levered)` : "N/A" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0">
                    <span className="text-slate-500 text-sm">{label}</span>
                    <span className="font-bold text-secondary text-sm">{value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" /> Property Details
                </h2>
                {[
                  { label: "Property Type",      value: property.type },
                  { label: "Leasable Area",       value: property.sqft > 0 ? `${property.sqft.toLocaleString()} sq ft` : "N/A" },
                  ...(property.lotSizeAcres ? [{ label: "Lot Size", value: `${property.lotSizeAcres} Acres` }] : []),
                  { label: "Year Built",          value: property.yearBuilt || "N/A" },
                  { label: "Current Occupancy",   value: property.occupancy > 0 ? `${property.occupancy}%` : "Vacant" },
                  { label: "City",                value: `${property.address.city}, ${property.address.state}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0">
                    <span className="text-slate-500 text-sm">{label}</span>
                    <span className="font-bold text-secondary text-sm">{String(value)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Location Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
              className="bg-white rounded-2xl border border-border p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-secondary mb-4">Location</h2>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-secondary">{property.address.street}</p>
                  <p className="text-slate-500 text-sm">{property.address.city}, {property.address.state} — {property.address.zipCode}</p>
                </div>
              </div>
              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden h-60 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center relative border border-border">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                />
                <MapPin className="w-10 h-10 text-primary mb-2" />
                <p className="text-sm text-slate-500 font-medium">Interactive map coming soon</p>
                <p className="text-xs text-slate-400 mt-1">
                  {property.coordinates.lat.toFixed(4)}° N, {property.coordinates.lng.toFixed(4)}° E
                </p>
              </div>
            </motion.div>

            {/* Image Gallery Grid */}
            {property.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-secondary mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                        activeImage === i ? "border-primary shadow-md" : "border-transparent hover:border-slate-300"
                      }`}
                    >
                      <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover" sizes="300px" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Properties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45 }}
            >
              <h2 className="text-xl font-bold text-secondary mb-5">Similar Listings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Sticky Sidebar ───────────────────────────────── */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-24 space-y-4">

              {/* Price + CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white rounded-2xl border border-border shadow-sm p-6"
              >
                <div className="text-center mb-6">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Asking Price</span>
                  <div className="text-4xl font-bold text-primary mt-1.5">{formatINR(property.price)}</div>
                  {pricePerSqft && (
                    <p className="text-xs text-slate-400 mt-1">{formatINR(pricePerSqft)} / sq ft</p>
                  )}
                </div>

                <div className="space-y-3 mb-5">
                  <Button size="lg" className="w-full font-semibold text-base shadow-sm">
                    <Phone className="w-4 h-4 mr-2" /> Schedule a Visit
                  </Button>
                  <a href="mailto:info@acrely.in">
                    <Button variant="outline" size="lg" className="w-full font-semibold">
                      <Mail className="w-4 h-4 mr-2" /> Email Broker
                    </Button>
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                      saved ? "bg-red-50 text-red-500" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${saved ? "fill-red-500" : ""}`} />
                    {saved ? "Saved" : "Save"}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </motion.div>

              {/* Quick AI summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-white rounded-2xl border border-border shadow-sm p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-bold text-secondary text-sm">Acrely AI</span>
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full inline-block mb-3 ${aiRec.color}`}>
                  {aiRec.label}
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Deal Score",    value: `${scores.dealScore}/100` },
                    { label: "ROI Score",     value: `${scores.roiScore}/100` },
                    { label: "Build Quality", value: `${scores.constructionScore}/100` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span className="text-slate-400">{label}</span>
                      <span className="font-bold text-secondary">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Acrely contact badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
                className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-5 text-center"
              >
                <p className="text-sm font-bold text-secondary mb-1">Need help evaluating?</p>
                <p className="text-xs text-slate-500 mb-3">Our team is available Mon–Sat, 9AM–6PM IST</p>
                <a href="mailto:sanjayaaron@acrely.in">
                  <Button variant="outline" size="sm" className="w-full text-xs border-primary/30 text-primary hover:bg-primary hover:text-white">
                    <Mail className="w-3 h-3 mr-1.5" /> sanjayaaron@acrely.in
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

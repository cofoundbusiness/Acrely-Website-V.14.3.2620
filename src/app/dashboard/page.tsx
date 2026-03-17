"use client";

import { useDashboardStore } from "@/lib/store";
import { mockProperties } from "@/mock-data/properties";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart, Building2, Eye, Bell, TrendingUp,
  ArrowRight, Plus, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

function formatINR(value: number): string {
  if (value >= 10_000_000) return `₹${parseFloat((value / 10_000_000).toFixed(2))} Cr`;
  if (value >= 100_000)    return `₹${parseFloat((value / 100_000).toFixed(2))} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

const MOCK_ACTIVITY = [
  { icon: Heart,     label: "You saved",         property: "Prime OMR Class A Office",    time: "2 hours ago",  color: "text-rose-500 bg-rose-50"    },
  { icon: Eye,       label: "You viewed",         property: "Oragadam Logistics Hub",      time: "5 hours ago",  color: "text-blue-500 bg-blue-50"    },
  { icon: Bell,      label: "New alert match",    property: "ECR Retail Plaza",            time: "Yesterday",    color: "text-amber-500 bg-amber-50"  },
  { icon: Eye,       label: "You viewed",         property: "Ambattur Medical Office",     time: "2 days ago",   color: "text-blue-500 bg-blue-50"    },
  { icon: TrendingUp,label: "Price drop",         property: "Guindy Multifamily Residences","time": "3 days ago", color: "text-emerald-500 bg-emerald-50"},
];

export default function DashboardOverviewPage() {
  const { savedPropertyIds, recentlyViewedIds, alerts, profile } = useDashboardStore();

  const stats = [
    { icon: Heart,     label: "Saved Properties", value: savedPropertyIds.length, href: "/dashboard/saved",    color: "bg-rose-50 text-rose-600"    },
    { icon: Eye,       label: "Viewed Properties", value: recentlyViewedIds.length || 12, href: "/search",     color: "bg-blue-50 text-blue-600"    },
    { icon: Building2, label: "Active Listings",   value: 0,                        href: "/dashboard/listings",color: "bg-emerald-50 text-emerald-600"},
    { icon: Bell,      label: "Active Alerts",     value: alerts.filter(a => a.active).length, href: "/dashboard/alerts", color: "bg-amber-50 text-amber-600" },
  ];

  const savedProperties = mockProperties.filter(p => savedPropertyIds.includes(p.id)).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary">
          Good evening, {profile.name.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-500 mt-1">Here&apos;s your investment activity at a glance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, href, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          >
            <Link href={href}>
              <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-all group cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-secondary">{value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{label}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View all <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-3 bg-white rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-secondary text-lg">Recent Activity</h2>
            <Clock className="w-4 h-4 text-slate-300" />
          </div>
          <div className="space-y-3">
            {MOCK_ACTIVITY.map(({ icon: Icon, label, property, time, color }, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">{label}</span>{" "}
                    <span className="text-secondary font-semibold truncate">{property}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Saved snapshot */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-secondary text-base">Saved Properties</h2>
              <Link href="/dashboard/saved" className="text-xs text-primary font-medium hover:underline">View all</Link>
            </div>
            {savedProperties.length > 0 ? (
              <div className="space-y-3">
                {savedProperties.map((p) => (
                  <Link key={p.id} href={`/property/${p.id}`} className="flex items-center gap-3 group">
                    <div className="w-14 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 relative">
                      {p.images[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-secondary truncate group-hover:text-primary transition-colors">{p.title}</p>
                      <p className="text-xs text-slate-400">{formatINR(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Heart className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No saved properties yet</p>
                <Link href="/search"><p className="text-xs text-primary mt-1 hover:underline">Browse listings →</p></Link>
              </div>
            )}
          </div>

          {/* CTA - post property */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6 text-center">
            <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="font-bold text-secondary text-sm mb-1">List Your Property</p>
            <p className="text-xs text-slate-500 mb-4">Reach thousands of qualified investors</p>
            <Link href="/post-property">
              <Button size="sm" className="w-full"><Plus className="w-3 h-3 mr-1.5" /> Post a Property</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

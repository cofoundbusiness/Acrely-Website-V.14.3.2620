"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Plus, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const MOCK_LISTINGS = [
  {
    id: "listing-1",
    title: "Commercial Office Space — Nungambakkam",
    location: "Nungambakkam, Chennai",
    price: 95000000,
    type: "Office",
    status: "approved" as const,
    views: 142,
    saves: 7,
    submittedAt: "Mar 10, 2026",
  },
  {
    id: "listing-2",
    title: "Warehouse Unit — Ambattur Industrial Estate",
    location: "Ambattur, Chennai",
    price: 34000000,
    type: "Industrial",
    status: "pending" as const,
    views: 0,
    saves: 0,
    submittedAt: "Mar 16, 2026",
  },
];

function formatINR(value: number): string {
  if (value >= 10_000_000) return `₹${parseFloat((value / 10_000_000).toFixed(2))} Cr`;
  if (value >= 100_000)    return `₹${parseFloat((value / 100_000).toFixed(2))} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

const statusConfig = {
  approved: { label: "Approved",        icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  pending:  { label: "Pending Review",  icon: Clock,        color: "bg-amber-50 text-amber-600 border-amber-100"   },
  rejected: { label: "Rejected",        icon: XCircle,      color: "bg-red-50 text-red-600 border-red-100"         },
};

export default function MyListingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary">My Listings</h1>
          <p className="text-slate-500 text-sm mt-1">{MOCK_LISTINGS.length} properties submitted</p>
        </div>
        <Link href="/post-property">
          <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Post New Property</Button>
        </Link>
      </div>

      {MOCK_LISTINGS.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-border p-16 text-center"
        >
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-slate-200" />
          </div>
          <h3 className="text-lg font-bold text-secondary mb-2">No listings yet</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
            Submit your first commercial property and reach thousands of verified investors.
          </p>
          <Link href="/post-property"><Button>Post a Property</Button></Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {MOCK_LISTINGS.map((listing, i) => {
            const { label, icon: StatusIcon, color } = statusConfig[listing.status];
            return (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border ${color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {label}
                      </span>
                      <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-border">{listing.type}</span>
                    </div>
                    <h3 className="font-bold text-secondary text-base mb-1">{listing.title}</h3>
                    <p className="text-sm text-slate-500 mb-3">{listing.location}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>Submitted {listing.submittedAt}</span>
                      {listing.views > 0 && <span>{listing.views} views</span>}
                      {listing.saves > 0 && <span>{listing.saves} saves</span>}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-bold text-primary">{formatINR(listing.price)}</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      {listing.status === "approved" && (
                        <Link href={`/property/${listing.id}`}>
                          <Button size="sm">View</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Info Card */}
      <div className="bg-slate-50 rounded-2xl border border-border p-5 text-sm text-slate-500 leading-relaxed">
        <strong className="text-secondary block mb-1">How listings work</strong>
        All submitted properties are reviewed by the Acrely team before going live. Approvals typically take 24–48 hours. Once approved, your listing will appear in search results and be visible to registered investors.
      </div>
    </div>
  );
}

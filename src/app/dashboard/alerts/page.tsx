"use client";

import { useState } from "react";
import { useDashboardStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Plus, Trash2, ToggleLeft, ToggleRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const PROPERTY_TYPES = ["Office", "Industrial", "Retail", "Warehouse", "Land", "Multifamily"];
const LOCATIONS      = ["OMR, Chennai", "Ambattur, Chennai", "Guindy, Chennai", "ECR, Chennai", "Oragadam, Chennai", "Sriperumbudur, Kanchipuram"];

function formatINR(value: number): string {
  if (value >= 10_000_000) return `₹${parseFloat((value / 10_000_000).toFixed(2))} Cr`;
  if (value >= 100_000)    return `₹${parseFloat((value / 100_000).toFixed(2))} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function AlertsPage() {
  const { alerts, addAlert, removeAlert, toggleAlert } = useDashboardStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type:         "new_listing" as "new_listing" | "price_drop",
    location:     LOCATIONS[0],
    propertyType: PROPERTY_TYPES[0],
    maxPrice:     "",
  });

  const handleCreate = () => {
    addAlert({
      type:         form.type,
      label:        `${form.type === "new_listing" ? "New" : "Price drop"} ${form.propertyType} in ${form.location}`,
      location:     form.location,
      propertyType: form.propertyType,
      maxPrice:     form.maxPrice ? Number(form.maxPrice) : null,
      active:       true,
    });
    setShowForm(false);
    setForm({ type: "new_listing", location: LOCATIONS[0], propertyType: PROPERTY_TYPES[0], maxPrice: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Property Alerts</h1>
          <p className="text-slate-500 text-sm mt-1">Get notified when matching properties appear</p>
        </div>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" /> New Alert
        </Button>
      </div>

      {/* Create alert form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border border-primary/30 shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-secondary">Create Alert</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Alert Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                >
                  <option value="new_listing">New Listing</option>
                  <option value="price_drop">Price Drop</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                <select
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                >
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Type</label>
                <select
                  value={form.propertyType}
                  onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                >
                  {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Budget (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 25000000 (₹2.5 Cr)"
                  value={form.maxPrice}
                  onChange={(e) => setForm({ ...form, maxPrice: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {form.maxPrice && !isNaN(Number(form.maxPrice)) && (
                  <p className="text-xs text-slate-400 mt-1">{formatINR(Number(form.maxPrice))}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button size="sm" onClick={handleCreate}>Create Alert</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert list */}
      {alerts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border p-16 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-slate-200" />
          </div>
          <h3 className="text-lg font-bold text-secondary mb-2">No alerts yet</h3>
          <p className="text-slate-400 text-sm mb-6">Set up alerts to be notified of matching properties</p>
          <Button onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-2" /> Create Alert</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className={`bg-white rounded-2xl border transition-all ${alert.active ? "border-border shadow-sm" : "border-border opacity-60"}`}
            >
              <div className="p-5 flex items-center gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  alert.type === "new_listing" ? "bg-blue-50 text-blue-500" : "bg-amber-50 text-amber-500"
                }`}>
                  <Bell className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className="font-semibold text-secondary text-sm">{alert.label}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      alert.type === "new_listing" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      {alert.type === "new_listing" ? "New Listing" : "Price Drop"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                    <span>{alert.location}</span>
                    <span>·</span>
                    <span>{alert.propertyType}</span>
                    {alert.maxPrice && <><span>·</span><span>Max {formatINR(alert.maxPrice)}</span></>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className={`transition-colors ${alert.active ? "text-primary" : "text-slate-300"}`}
                    title={alert.active ? "Disable alert" : "Enable alert"}
                  >
                    {alert.active
                      ? <ToggleRight className="w-7 h-7" />
                      : <ToggleLeft  className="w-7 h-7" />
                    }
                  </button>
                  <button
                    onClick={() => removeAlert(alert.id)}
                    className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-400 text-center pt-2">
        Alerts are delivered via email. Ensure your email is correct in{" "}
        <a href="/dashboard/settings" className="text-primary hover:underline">Settings</a>.
      </p>
    </div>
  );
}

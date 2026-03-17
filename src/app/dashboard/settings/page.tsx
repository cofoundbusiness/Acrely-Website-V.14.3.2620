"use client";

import { useState } from "react";
import { useDashboardStore } from "@/lib/store";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import {
  User, Lock, SlidersHorizontal, Bell,
  Palette, ChevronRight, Save, Eye, EyeOff, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// ─── Reusable section wrapper ─────────────────────────────────────────────────
function Section({ id, icon: Icon, title, description, children }: {
  id: string; icon: any; title: string; description: string; children: React.ReactNode;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-slate-50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="font-bold text-secondary text-sm">{title}</h2>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5.5 rounded-full relative transition-colors duration-200 focus:outline-none ${checked ? "bg-primary" : "bg-slate-200"}`}
      style={{ height: "22px", width: "42px" }}
    >
      <span
        className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0.5"}`}
        style={{ width: "18px", height: "18px", top: "2px", left: "2px" }}
      />
    </button>
  );
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string; description?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-secondary">{label}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all bg-white disabled:bg-slate-50 disabled:text-slate-400"
      />
    </div>
  );
}

// ─── Main Settings Page ───────────────────────────────────────────────────────
export default function SettingsPage() {
  const { profile, setProfile, preferences, setPreferences, notifications, setNotification } = useDashboardStore();
  const { theme, setTheme } = useTheme();

  const [localProfile, setLocalProfile] = useState({ ...profile });
  const [savedProfile, setSavedProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const handleSaveProfile = () => {
    setProfile(localProfile);
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 2000);
  };

  const LOCATIONS      = ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Pune", "Coimbatore"];
  const PROPERTY_TYPES = ["Office", "Industrial", "Retail", "Warehouse", "Land", "Multifamily"];
  const RISK_LEVELS    = [
    { value: "conservative", label: "Conservative — Stable income, low risk"  },
    { value: "moderate",     label: "Moderate — Balanced risk/return"          },
    { value: "aggressive",   label: "Aggressive — High return, higher risk"    },
  ];
  const GOALS = [
    { value: "income",       label: "Rental Income"   },
    { value: "appreciation", label: "Capital Growth"  },
    { value: "both",         label: "Both"            },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account, preferences, and notifications</p>
      </div>

      {/* Quick jump */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {["General", "Account", "Preferences", "Notifications", "Appearance"].map((section) => (
          <a
            key={section}
            href={`#settings-${section.toLowerCase()}`}
            className="shrink-0 px-3 py-1.5 bg-white border border-border rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
          >
            {section}
          </a>
        ))}
      </div>

      {/* ── General ──────────────────────────────────── */}
      <Section id="settings-general" icon={User} title="General" description="Your personal information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <Field
            label="Full Name"
            value={localProfile.name}
            onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
            placeholder="Your name"
          />
          <Field
            label="Email Address"
            type="email"
            value={localProfile.email}
            onChange={(e) => setLocalProfile({ ...localProfile, email: e.target.value })}
            placeholder="you@example.com"
          />
          <Field
            label="Phone Number (optional)"
            type="tel"
            value={localProfile.phone}
            onChange={(e) => setLocalProfile({ ...localProfile, phone: e.target.value })}
            placeholder="+91 98765 43210"
          />
        </div>
        <Button
          size="sm"
          onClick={handleSaveProfile}
          className={savedProfile ? "bg-emerald-500 hover:bg-emerald-500" : ""}
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          {savedProfile ? "Saved!" : "Save Changes"}
        </Button>
      </Section>

      {/* ── Account ──────────────────────────────────── */}
      <Section id="settings-account" icon={Lock} title="Account" description="Password and security settings">
        <div className="space-y-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                placeholder="Current password"
                className="w-full px-3 py-2 pr-10 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Field
            label="New Password"
            type="password"
            value={passwords.next}
            onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
            placeholder="Minimum 8 characters"
          />
          <Field
            label="Confirm New Password"
            type="password"
            value={passwords.confirm}
            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            placeholder="Repeat new password"
          />
        </div>
        <Button size="sm" variant="outline">Update Password</Button>

        {/* Danger zone */}
        <div className="mt-8 pt-6 border-t border-red-100">
          <h3 className="text-sm font-bold text-red-500 mb-1">Danger Zone</h3>
          <p className="text-xs text-slate-400 mb-4">
            Once you delete your account, all data is permanently removed. Type{" "}
            <code className="bg-slate-100 px-1 rounded">DELETE</code> to confirm.
          </p>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type DELETE"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              className="px-3 py-2 rounded-lg border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 w-40"
            />
            <button
              disabled={deleteConfirm !== "DELETE"}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-500 rounded-lg border border-red-200 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </div>
      </Section>

      {/* ── Preferences ──────────────────────────────── */}
      <Section id="settings-preferences" icon={SlidersHorizontal} title="Preferences" description="Tailor your investment profile">
        <div className="space-y-5">
          {/* Preferred Locations */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Locations</label>
            <div className="flex flex-wrap gap-2">
              {LOCATIONS.map((loc) => {
                const selected = preferences.preferredLocations.includes(loc);
                return (
                  <button
                    key={loc}
                    onClick={() =>
                      setPreferences({
                        preferredLocations: selected
                          ? preferences.preferredLocations.filter((l) => l !== loc)
                          : [...preferences.preferredLocations, loc],
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selected
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-slate-600 border-border hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Property Types */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Property Types</label>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((type) => {
                const selected = preferences.preferredTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() =>
                      setPreferences({
                        preferredTypes: selected
                          ? preferences.preferredTypes.filter((t) => t !== type)
                          : [...preferences.preferredTypes, type],
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selected
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-slate-600 border-border hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Min Budget (₹)</label>
              <input
                type="number"
                placeholder="e.g. 5000000"
                value={preferences.budgetMin ?? ""}
                onChange={(e) => setPreferences({ budgetMin: e.target.value ? Number(e.target.value) : null })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Budget (₹)</label>
              <input
                type="number"
                placeholder="e.g. 50000000"
                value={preferences.budgetMax ?? ""}
                onChange={(e) => setPreferences({ budgetMax: e.target.value ? Number(e.target.value) : null })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Investment Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Risk Level</label>
              <select
                value={preferences.riskLevel}
                onChange={(e) => setPreferences({ riskLevel: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                {RISK_LEVELS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Investment Goal</label>
              <select
                value={preferences.investmentGoal}
                onChange={(e) => setPreferences({ investmentGoal: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                {GOALS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Notifications ─────────────────────────────── */}
      <Section id="settings-notifications" icon={Bell} title="Notifications" description="Control how Acrely contacts you">
        <div>
          <ToggleRow
            label="Email Notifications"
            description="Receive updates and activity via email"
            checked={notifications.emailNotifications}
            onChange={(v) => setNotification("emailNotifications", v)}
          />
          <ToggleRow
            label="Property Alerts"
            description="Get notified when a matching property is listed"
            checked={notifications.propertyAlerts}
            onChange={(v) => setNotification("propertyAlerts", v)}
          />
          <ToggleRow
            label="Price Drops"
            description="Alert when a saved property drops in price"
            checked={notifications.priceDrops}
            onChange={(v) => setNotification("priceDrops", v)}
          />
          <ToggleRow
            label="New Listings"
            description="Daily digest of new listings in your areas"
            checked={notifications.newListings}
            onChange={(v) => setNotification("newListings", v)}
          />
          <ToggleRow
            label="Weekly Market Digest"
            description="Summary of market trends every Monday"
            checked={notifications.weeklyDigest}
            onChange={(v) => setNotification("weeklyDigest", v)}
          />
        </div>
      </Section>

      {/* ── Appearance ───────────────────────────────── */}
      <Section id="settings-appearance" icon={Palette} title="Appearance" description="Customise how Acrely looks">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Theme</label>
            <div className="flex gap-2">
              {["light", "dark", "system"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border capitalize transition-all ${
                    theme === t
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-slate-600 border-border hover:border-primary/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Theme changes apply immediately across the entire platform.
          </p>
        </div>
      </Section>
    </div>
  );
}

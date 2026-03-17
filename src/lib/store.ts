import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Search Store (existing) ─────────────────────────────────────────────────
interface SearchState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  propertyType: string;
  setPropertyType: (type: string) => void;
  minPrice: number | null;
  maxPrice: number | null;
  setPriceRange: (min: number | null, max: number | null) => void;
  minCapRate: number | null;
  setMinCapRate: (cap: number | null) => void;
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  propertyType: "all",
  setPropertyType: (type) => set({ propertyType: type }),
  minPrice: null,
  maxPrice: null,
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max }),
  minCapRate: null,
  setMinCapRate: (cap) => set({ minCapRate: cap }),
  showMap: true,
  setShowMap: (show) => set({ showMap: show }),
  sortBy: "newest",
  setSortBy: (sort) => set({ sortBy: sort }),
  resetFilters: () =>
    set({
      searchQuery: "",
      propertyType: "all",
      minPrice: null,
      maxPrice: null,
      minCapRate: null,
      sortBy: "newest",
    }),
}));

// ─── Dashboard / User Store ──────────────────────────────────────────────────
interface Alert {
  id: string;
  type: "price_drop" | "new_listing";
  label: string;
  location: string;
  propertyType: string;
  maxPrice: number | null;
  active: boolean;
  createdAt: string;
}

interface UserPreferences {
  preferredLocations: string[];
  preferredTypes: string[];
  budgetMin: number | null;
  budgetMax: number | null;
  riskLevel: "conservative" | "moderate" | "aggressive";
  investmentGoal: "income" | "appreciation" | "both";
}

interface NotificationSettings {
  emailNotifications: boolean;
  propertyAlerts: boolean;
  priceDrops: boolean;
  newListings: boolean;
  weeklyDigest: boolean;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

interface DashboardState {
  // Saved properties (by ID)
  savedPropertyIds: string[];
  saveProperty: (id: string) => void;
  unsaveProperty: (id: string) => void;
  isPropertySaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;

  // Recently viewed
  recentlyViewedIds: string[];
  markViewed: (id: string) => void;

  // Alerts
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, "id" | "createdAt">) => void;
  removeAlert: (id: string) => void;
  toggleAlert: (id: string) => void;

  // User profile (mock, no auth)
  profile: UserProfile;
  setProfile: (updates: Partial<UserProfile>) => void;

  // Preferences
  preferences: UserPreferences;
  setPreferences: (updates: Partial<UserPreferences>) => void;

  // Notification settings
  notifications: NotificationSettings;
  setNotification: (key: keyof NotificationSettings, value: boolean) => void;

  // Appearance
  accentColor: string;
  setAccentColor: (color: string) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      // Saved properties
      savedPropertyIds: [],
      saveProperty: (id) =>
        set((s) => ({
          savedPropertyIds: s.savedPropertyIds.includes(id)
            ? s.savedPropertyIds
            : [...s.savedPropertyIds, id],
        })),
      unsaveProperty: (id) =>
        set((s) => ({
          savedPropertyIds: s.savedPropertyIds.filter((pid) => pid !== id),
        })),
      isPropertySaved: (id) => get().savedPropertyIds.includes(id),
      toggleSaved: (id) => {
        const saved = get().savedPropertyIds.includes(id);
        saved ? get().unsaveProperty(id) : get().saveProperty(id);
      },

      // Recently viewed
      recentlyViewedIds: [],
      markViewed: (id) =>
        set((s) => ({
          recentlyViewedIds: [
            id,
            ...s.recentlyViewedIds.filter((v) => v !== id),
          ].slice(0, 10),
        })),

      // Alerts
      alerts: [
        {
          id: "alert-demo-1",
          type: "new_listing",
          label: "New Office listings in OMR",
          location: "OMR, Chennai",
          propertyType: "Office",
          maxPrice: 150000000,
          active: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: "alert-demo-2",
          type: "price_drop",
          label: "Price drops on Industrial",
          location: "Ambattur, Chennai",
          propertyType: "Industrial",
          maxPrice: null,
          active: false,
          createdAt: new Date().toISOString(),
        },
      ],
      addAlert: (alert) =>
        set((s) => ({
          alerts: [
            ...s.alerts,
            {
              ...alert,
              id: `alert-${Date.now()}`,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      removeAlert: (id) =>
        set((s) => ({ alerts: s.alerts.filter((a) => a.id !== id) })),
      toggleAlert: (id) =>
        set((s) => ({
          alerts: s.alerts.map((a) =>
            a.id === id ? { ...a, active: !a.active } : a
          ),
        })),

      // Profile
      profile: {
        name: "Acrely User",
        email: "user@acrely.in",
        phone: "",
        avatar: "",
      },
      setProfile: (updates) =>
        set((s) => ({ profile: { ...s.profile, ...updates } })),

      // Preferences
      preferences: {
        preferredLocations: ["Chennai"],
        preferredTypes: [],
        budgetMin: null,
        budgetMax: null,
        riskLevel: "moderate",
        investmentGoal: "both",
      },
      setPreferences: (updates) =>
        set((s) => ({ preferences: { ...s.preferences, ...updates } })),

      // Notifications
      notifications: {
        emailNotifications: true,
        propertyAlerts: true,
        priceDrops: true,
        newListings: false,
        weeklyDigest: true,
      },
      setNotification: (key, value) =>
        set((s) => ({ notifications: { ...s.notifications, [key]: value } })),

      // Appearance
      accentColor: "blue",
      setAccentColor: (color) => set({ accentColor: color }),
    }),
    {
      name: "acrely-dashboard",
    }
  )
);

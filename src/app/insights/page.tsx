import { TrendingUp, BarChart3, Building } from "lucide-react";
import { InfoCard } from "@/components/ui/InfoCard";
import { CtaSection } from "@/components/ui/CtaSection";

export const metadata = {
  title: "Market Insights | Acrely",
  description: "Data-driven commercial real estate market insights.",
};

export default function InsightsPage() {
  return (
    <main className="bg-background min-h-screen pb-20">

      {/* Hero Card */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-card rounded-2xl shadow-md p-10 md:p-14 text-center border border-border">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Market Insights
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
              Data-driven intelligence shaping the future of commercial real estate. Our proprietary metric dashboards are launching soon.
            </p>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="mt-4 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="relative group">
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 border border-border">Coming Soon</span>
            </div>
            <InfoCard
              title="Cap Rate Trends"
              description="Interactive time-series tracking yield averages across national and high-growth sunbelt corridors."
              icon={<TrendingUp className="w-6 h-6" />}
              className="opacity-80 group-hover:opacity-100 h-full"
              delay={0.1}
            />
          </div>
          <div className="relative group">
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 border border-border">Coming Soon</span>
            </div>
            <InfoCard
              title="Demand Velocity"
              description="Live tracking of institutional capital flows and leasing demand broken down by property type."
              icon={<BarChart3 className="w-6 h-6" />}
              className="opacity-80 group-hover:opacity-100 h-full"
              delay={0.2}
            />
          </div>
          <div className="relative group">
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 border border-border">Coming Soon</span>
            </div>
            <InfoCard
              title="Top Heatmaps"
              description="Visual heatmaps identifying emerging micro-markets before widespread institutional discovery."
              icon={<Building className="w-6 h-6" />}
              className="opacity-80 group-hover:opacity-100 h-full"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}

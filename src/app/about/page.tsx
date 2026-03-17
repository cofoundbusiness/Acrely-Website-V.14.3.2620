"use client";

import { Building2, SearchCheck, Briefcase, Activity, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { InfoCard } from "@/components/ui/InfoCard";
import { CtaSection } from "@/components/ui/CtaSection";


export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen pb-20">

      {/* Hero Card */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl shadow-md p-10 md:p-14 text-center border border-border"
          >
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                <Building2 className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About Acrely
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
              A premium commercial real estate intelligence platform transforming the industry into a fully transparent, data-driven ecosystem for investors and buyers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What Acrely Does */}
      <section className="mt-4 max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-semibold mb-3">
            How We Empower Investors
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We provide buyers and sellers with the exclusive tools and insights necessary to navigate a complex market.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            title="Handpicked Properties"
            description="We filter through the noise to bring you only the most lucrative, rigorously vetted commercial assets on the market."
            icon={<SearchCheck className="w-6 h-6" />}
            delay={0.1}
            className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 [&_h3]:text-white [&_p]:text-gray-300 [&_.icon-wrap]:bg-white/10 [&_.icon-wrap]:text-white"
          />
          <InfoCard
            title="AI Scoring System"
            description="Leverage our proprietary algorithms to instantly evaluate yield potential, structural integrity, and local dynamics."
            icon={<Activity className="w-6 h-6" />}
            delay={0.2}
            className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 [&_h3]:text-white [&_p]:text-gray-300 [&_.icon-wrap]:bg-white/10 [&_.icon-wrap]:text-white"
          />
          <InfoCard
            title="End-to-End Support"
            description="From legal consultations to loan origination and full-service property management — we handle the entire lifecycle."
            icon={<Briefcase className="w-6 h-6" />}
            delay={0.3}
            className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 [&_h3]:text-white [&_p]:text-gray-300 [&_.icon-wrap]:bg-white/10 [&_.icon-wrap]:text-white"
          />
        </div>
      </section>

      {/* Scoring System */}
      <section className="mt-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-semibold mb-3">
            Our Proprietary Evaluation
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Every property on Acrely is meticulously graded across three critical dimensions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            title="ROI Projections"
            description="Detailed financial models spanning cap rates, cash-on-cash returns, and predictive market yield analysis."
            icon={<Activity className="w-6 h-6" />}
            delay={0.1}
            className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 [&_h3]:text-white [&_p]:text-gray-300 [&_.icon-wrap]:bg-white/10 [&_.icon-wrap]:text-white"
          />
          <InfoCard
            title="Construction Quality"
            description="Comprehensive structural and engineering assessments to guarantee asset durability and minimize capital expenditures."
            icon={<ShieldCheck className="w-6 h-6" />}
            delay={0.2}
            className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 [&_h3]:text-white [&_p]:text-gray-300 [&_.icon-wrap]:bg-white/10 [&_.icon-wrap]:text-white"
          />
          <InfoCard
            title="Location & Lifestyle"
            description="Data-driven evaluation of neighborhood growth, foot traffic metrics, and broader demographic trends."
            icon={<MapPin className="w-6 h-6" />}
            delay={0.3}
            className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 [&_h3]:text-white [&_p]:text-gray-300 [&_.icon-wrap]:bg-white/10 [&_.icon-wrap]:text-white"
          />
        </div>
      </section>

      {/* Vision */}
      <section className="mt-16 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary text-white rounded-2xl p-10 md:p-14 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed text-lg font-light">
            "To bring unprecedented transparency, efficiency, and intelligence to every commercial real estate transaction, empowering the next generation of investors."
          </p>
        </motion.div>
      </section>

      <CtaSection />
    </main>
  );
}

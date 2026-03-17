"use client";

import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { CtaSection } from "@/components/ui/CtaSection";

export default function CareersPage() {
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
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                <Briefcase className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Careers at Acrely
            </h1>
            <span className="inline-flex rounded-full bg-slate-100 border border-slate-200 px-4 py-1 text-sm font-medium text-slate-600 mb-6">
              Not Currently Hiring
            </span>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
              We are carefully expanding our commercial real estate intelligence platform. Opportunities across data engineering, property analytics, and client management will open soon. Stay connected with Acrely.
            </p>
          </motion.div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}

"use client";

import { Warehouse, Info } from "lucide-react";
import { motion } from "framer-motion";
import { CtaSection } from "@/components/ui/CtaSection";


export default function IndustrialPage() {
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
            <div className="mb-4 flex justify-center">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 border border-slate-200">
                Property Category
              </span>
            </div>
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                <Warehouse className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industrial Properties
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
              Explore curated, high-yield warehouses, distribution centers, and light industrial assets tailored for robust returns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Card */}
      <section className="mt-4 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border shadow-sm p-10 text-center"
        >
          <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 mx-auto mb-5">
            <Info className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Curating Listings</h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Our acquisitions team is processing high-quality industrial assets. Exclusive early access will be available soon.
          </p>
        </motion.div>
      </section>

      <CtaSection />
    </main>
  );
}

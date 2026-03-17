"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { CtaSection } from "@/components/ui/CtaSection";

export default function ContactPage() {
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
                <Mail className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
              Whether you&apos;re exploring robust commercial acquisitions or mapping investments, we&apos;re here to assist. For priority service, contact the founder directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="mt-4 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* General Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-8 hover:shadow-md transition-all"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-foreground">General Support</h2>
              <p className="text-muted-foreground leading-relaxed">
                For account inquiries, listing assistance, and general platform questions.
              </p>
              <a
                href="mailto:info@acrely.in"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                info@acrely.in
              </a>
            </div>
          </motion.div>

          {/* Founder Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-8 hover:shadow-md transition-all"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Founder Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For investment conversations, large-scale acquisitions, and enterprise partnerships.
              </p>
              <a
                href="mailto:sanjayaaron@acrely.in"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                sanjayaaron@acrely.in
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      <CtaSection />
    </main>
  );
}

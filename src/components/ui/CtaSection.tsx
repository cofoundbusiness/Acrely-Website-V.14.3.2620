"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-border mt-16 md:mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8 text-center pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto flex flex-col items-center justify-center p-8"
        >
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl mb-6">
            List your property with Acrely
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the leading commercial real estate platform. Maximize your property&apos;s visibility to serious, verified investors and handle everything end-to-end.
          </p>
          <Link href="/post-property">
            <Button size="lg" className="rounded-full px-8 text-base shadow-md hover:shadow-lg transition-all">
              Start Listing
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { Info } from "lucide-react";
import { motion } from "framer-motion";

interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center min-h-[50vh] bg-slate-50/50 rounded-3xl border border-slate-100/50 shadow-sm mx-auto max-w-4xl"
    >
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-20 h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-8 text-primary"
      >
        <Info className="w-10 h-10" />
      </motion.div>
      <motion.h1 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-3xl font-bold tracking-tight text-secondary sm:text-5xl mb-6"
      >
        {title}
      </motion.h1>
      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="text-lg text-slate-600 max-w-2xl leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

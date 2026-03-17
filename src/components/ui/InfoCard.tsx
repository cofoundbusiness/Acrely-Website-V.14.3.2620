"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface InfoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function InfoCard({ title, description, icon, className, delay = 0 }: InfoCardProps) {
  // Detect if a dark-override className is provided (contains bg-white/5)
  const isDarkOverride = className?.includes("bg-white/5");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "flex flex-col rounded-2xl p-8 border shadow-sm transition-all duration-300 group",
        isDarkOverride
          ? ""
          : "bg-white border-border bg-opacity-50 hover:shadow-xl hover:border-slate-300",
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            "icon-wrap mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
            isDarkOverride
              ? "bg-white/10 text-white"
              : "bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary"
          )}
        >
          {icon}
        </div>
      )}
      <h3
        className={cn(
          "text-xl font-bold mb-3",
          isDarkOverride ? "text-white" : "text-secondary"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "leading-relaxed",
          isDarkOverride ? "text-gray-300" : "text-slate-600"
        )}
      >
        {description}
      </p>
    </motion.div>
  );
}

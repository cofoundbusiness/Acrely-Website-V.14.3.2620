import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({ children, className }: SectionContainerProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {children}
      </div>
    </section>
  );
}

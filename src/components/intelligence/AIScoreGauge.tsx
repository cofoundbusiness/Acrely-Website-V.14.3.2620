import { motion } from "framer-motion";

interface AIScoreGaugeProps {
  score: number;
  label: string;
  type: "roi" | "construction" | "lifestyle";
}

export function AIScoreGauge({ score, label, type }: AIScoreGaugeProps) {
  const getColors = () => {
    if (type === "roi") return { stroke: "#10b981", bg: "#d1fae5", text: "text-emerald-600" };
    if (type === "construction") return { stroke: "#3b82f6", bg: "#dbeafe", text: "text-blue-600" };
    return { stroke: "#f59e0b", bg: "#fef3c7", text: "text-amber-600" };
  };

  const colors = getColors();
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={colors.bg}
            strokeWidth="6"
            fill="none"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke={colors.stroke}
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center font-bold text-lg ${colors.text}`}>
          {score}
        </div>
      </div>
      <span className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center max-w-[80px] leading-tight">
        {label}
      </span>
    </div>
  );
}

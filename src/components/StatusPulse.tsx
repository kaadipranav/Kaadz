"use client";

import { motion } from "framer-motion";

interface StatusPulseProps {
  status: "live" | "building" | "shipped" | "experiment";
  label?: string;
}

const statusConfig = {
  live: { color: "#00ffa3", label: "LIVE" },
  building: { color: "#f59e0b", label: "BUILDING" },
  shipped: { color: "#0ea5e9", label: "SHIPPED" },
  experiment: { color: "#a855f7", label: "EXPERIMENT" },
};

export default function StatusPulse({ status, label }: StatusPulseProps) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: config.color }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div
          className="absolute inset-0 w-2 h-2 rounded-full animate-ping"
          style={{ backgroundColor: config.color, opacity: 0.3 }}
        />
      </div>
      <span
        className="text-xs font-mono tracking-wider uppercase"
        style={{ color: config.color }}
      >
        {label || config.label}
      </span>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  command: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ command, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-accent font-mono text-sm">{">"}</span>
        <span className="text-muted font-mono text-sm">{command}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-card-border to-transparent" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-muted-light mt-2 max-w-xl text-base">{subtitle}</p>
      )}
    </motion.div>
  );
}

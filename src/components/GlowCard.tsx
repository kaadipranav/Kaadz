"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  featured?: boolean;
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "rgba(0, 255, 163, 0.15)",
  featured = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative rounded-xl border border-card-border bg-card overflow-hidden group ${
        featured ? "md:col-span-2" : ""
      } ${className}`}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Glow effect following mouse */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
            inset: 0,
          }}
        />
      )}

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 60%)`,
          inset: "-1px",
          zIndex: -1,
        }}
      />

      <div className="relative z-10 p-7">{children}</div>
    </motion.div>
  );
}

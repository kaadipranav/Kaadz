"use client";

import { motion } from "framer-motion";
import TypingText from "./TypingText";
import StatusPulse from "./StatusPulse";

const metrics = [
  { label: "Active Projects", value: "4" },
  { label: "Shipped", value: "6+" },
  { label: "Lines Shipped", value: "50k+" },
];

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto px-8 md:px-12 pt-32">
        <div className="grid md:grid-cols-5 gap-16 items-center">
          {/* Left — Main content */}
          <div className="md:col-span-3 space-y-10">
            {/* Status bar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <StatusPulse status="live" label="SYSTEMS ONLINE" />
              <span className="text-border-light">|</span>
              <span className="text-muted font-mono text-xs">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
                <span className="text-foreground">kaadz</span>
                <span className="text-accent">.me</span>
              </h1>
            </motion.div>

            {/* Typing subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="font-mono text-lg md:text-xl text-muted-light"
            >
              <TypingText
                texts={[
                  "shipping products, not portfolios",
                  "building tools that solve real problems",
                  "the lab is always open",
                  "from zero to shipped, fast",
                ]}
                speed={50}
                pauseTime={2500}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-muted max-w-lg text-base leading-relaxed"
            >
              Personal R&D lab. Where experiments become products and ideas hit
              production. Focused on AI tooling, developer infrastructure, and
              shipping fast.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex items-center gap-4"
            >
              <a
                href="#lab"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-background font-medium text-sm rounded-lg hover:bg-accent/90 transition-colors"
              >
                Explore the Lab
                <span className="text-lg">→</span>
              </a>
              <a
                href="#building"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-card-border text-muted-light font-medium text-sm rounded-lg hover:border-accent/40 hover:text-accent transition-colors"
              >
                What&apos;s Active
              </a>
            </motion.div>
          </div>

          {/* Right — Terminal/metrics panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="md:col-span-2"
          >
            <div className="border border-card-border rounded-xl bg-card/80 backdrop-blur-sm overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-card-border">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs font-mono text-muted">
                  kaadz://dashboard
                </span>
              </div>

              {/* Terminal content */}
              <div className="p-5 space-y-4 font-mono text-sm">
                <div className="space-y-1.5">
                  <div className="text-muted text-xs">$ system.status</div>
                  <div className="flex items-center gap-2">
                    <StatusPulse status="live" />
                    <span className="text-foreground text-xs">
                      All systems operational
                    </span>
                  </div>
                </div>

                <div className="h-px bg-card-border" />

                {/* Metrics */}
                <div className="space-y-3">
                  <div className="text-muted text-xs">$ metrics.overview</div>
                  {metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.15 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-muted-light text-xs">
                        {metric.label}
                      </span>
                      <span className="text-accent font-bold text-sm">
                        {metric.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="h-px bg-card-border" />

                <div className="space-y-1.5">
                  <div className="text-muted text-xs">$ latest.deploy</div>
                  <div className="text-foreground text-xs">
                    WatchLLM v0.3 →{" "}
                    <span className="text-accent">deployed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-card-border rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-accent/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

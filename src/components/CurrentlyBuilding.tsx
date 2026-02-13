"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import StatusPulse from "./StatusPulse";

interface ActiveItem {
  title: string;
  description: string;
  status: "live" | "building" | "experiment";
  progress: number;
  updated: string;
}

const activeWork: ActiveItem[] = [
  {
    title: "WatchLLM — Core Dashboard",
    description:
      "Building the real-time monitoring UI. Streaming metrics, alert configs, and multi-provider support.",
    status: "building",
    progress: 65,
    updated: "Today",
  },
  {
    title: "WatchLLM — SDK Integration",
    description:
      "Python SDK for one-line integration. Auto-captures API calls, token usage, latency.",
    status: "building",
    progress: 40,
    updated: "Yesterday",
  },
  {
    title: "kaadz.me — This Site",
    description:
      "The lab itself. Modular, dark, fast. Built to grow with every new experiment.",
    status: "live",
    progress: 90,
    updated: "Now",
  },
  {
    title: "Ghostwriter — Client Work",
    description:
      "Active ghostwriting engagements for startup founders. Technical content and landing pages.",
    status: "live",
    progress: 75,
    updated: "This week",
  },
];

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="relative px-6 py-32 md:py-44">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          command="ps aux | grep active"
          title="Currently Building"
          subtitle="Live work. Updated as things ship."
        />

        <div className="space-y-5">
          {activeWork.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group border border-card-border rounded-xl bg-card/60 backdrop-blur-sm p-6 hover:border-accent/20 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <StatusPulse status={item.status} />
                  </div>
                  <p className="text-sm text-muted-light">
                    {item.description}
                  </p>
                </div>
                <span className="text-xs text-muted font-mono whitespace-nowrap">
                  {item.updated}
                </span>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1 bg-card-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background:
                        item.status === "building"
                          ? "linear-gradient(90deg, #f59e0b, #f59e0b)"
                          : item.status === "live"
                          ? "linear-gradient(90deg, #00ffa3, #00ffa3)"
                          : "linear-gradient(90deg, #a855f7, #a855f7)",
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-muted w-8 text-right">
                  {item.progress}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

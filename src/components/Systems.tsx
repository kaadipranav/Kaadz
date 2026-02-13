"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

interface SystemCategory {
  title: string;
  items: { name: string; detail: string }[];
}

const systems: SystemCategory[] = [
  {
    title: "Build",
    items: [
      { name: "Next.js + TypeScript", detail: "Default stack for everything web" },
      { name: "Python + FastAPI", detail: "Backend services and AI integration" },
      { name: "PostgreSQL + Redis", detail: "Data layer — structured + fast" },
      { name: "Tailwind CSS", detail: "Styling. No debates, just ship" },
    ],
  },
  {
    title: "Ship",
    items: [
      { name: "Vercel", detail: "Deploy on push. Zero config." },
      { name: "GitHub Actions", detail: "CI/CD pipelines for everything" },
      { name: "Docker", detail: "Containerize when it matters" },
      { name: "Cloudflare", detail: "DNS, caching, edge" },
    ],
  },
  {
    title: "Think",
    items: [
      { name: "Cursor + Claude", detail: "AI as co-founder, not autocomplete" },
      { name: "Linear", detail: "Track work without the noise" },
      { name: "Obsidian", detail: "Second brain for ideas and systems" },
      { name: "Excalidraw", detail: "Sketch architectures before building" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Systems() {
  return (
    <section id="systems" className="relative py-32 md:py-44">
      <div className="max-w-5xl mx-auto px-8 md:px-12">
        <SectionHeader
          command="cat systems.yml"
          title="Systems I Use"
          subtitle="How I move fast. Opinionated stack, zero friction."
        />

        <div className="grid md:grid-cols-3 gap-10">
          {systems.map((category) => (
            <motion.div
              key={category.title}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-1"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-card-border">
                <span className="text-accent font-mono text-xs">
                  {category.title === "Build"
                    ? "⚡"
                    : category.title === "Ship"
                    ? "🚀"
                    : "🧠"}
                </span>
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Items */}
              {category.items.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-card-hover/50 transition-colors cursor-default"
                >
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {item.name}
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      {item.detail}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

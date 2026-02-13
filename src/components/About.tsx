"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" className="relative px-8 md:px-12 py-32 md:py-44">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          command="whoami"
          title="About"
        />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-muted-light text-base leading-relaxed">
              I build products. Not tutorials, not clones — real tools that solve
              problems I care about. My main focus right now is{" "}
              <span className="text-accent font-medium">WatchLLM</span> — AI
              observability for teams shipping LLM-powered apps.
            </p>

            <p className="text-muted-light text-base leading-relaxed">
              I treat AI like a co-founder. Cursor and Claude aren&apos;t just tools —
              they&apos;re how I move at 10x speed. Full-stack, systems thinking,
              product execution. I care about shipping velocity as much as code
              quality.
            </p>

            <p className="text-muted text-sm leading-relaxed">
              This site is my lab. Every card you see here is something I&apos;m
              actively building or have shipped. If it&apos;s listed, there&apos;s code
              behind it.
            </p>
          </motion.div>

          {/* Terminal card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-card-border rounded-xl bg-card/80 backdrop-blur-sm overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-card-border">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs font-mono text-muted">
                kaadz://about
              </span>
            </div>

            <div className="p-6 font-mono text-sm space-y-4">
              <div>
                <span className="text-accent">→</span>{" "}
                <span className="text-muted">focus:</span>{" "}
                <span className="text-foreground">AI tooling, SaaS, DX</span>
              </div>
              <div>
                <span className="text-accent">→</span>{" "}
                <span className="text-muted">stack:</span>{" "}
                <span className="text-foreground">
                  TS, Python, Next.js, Postgres
                </span>
              </div>
              <div>
                <span className="text-accent">→</span>{" "}
                <span className="text-muted">approach:</span>{" "}
                <span className="text-foreground">
                  Ship fast, learn faster
                </span>
              </div>
              <div>
                <span className="text-accent">→</span>{" "}
                <span className="text-muted">ai_usage:</span>{" "}
                <span className="text-foreground">
                  Co-founder level (Cursor + Claude)
                </span>
              </div>
              <div>
                <span className="text-accent">→</span>{" "}
                <span className="text-muted">philosophy:</span>{" "}
                <span className="text-foreground">
                  Proof of work {"> "}proof of knowledge
                </span>
              </div>

              <div className="h-px bg-card-border mt-2" />

              <div className="pt-1">
                <span className="text-muted">$</span>{" "}
                <span className="text-muted-light">
                  If it&apos;s not shipped, it doesn&apos;t count.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import GlowCard from "./GlowCard";
import SectionHeader from "./SectionHeader";
import StatusPulse from "./StatusPulse";

interface Project {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  impact: string;
  status: "live" | "building" | "shipped" | "experiment";
  tech: string[];
  featured?: boolean;
  link?: string;
  metrics?: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    name: "WatchLLM",
    tagline: "AI Observability & Monitoring",
    problem: "LLM apps break silently. No visibility into cost, latency, or failure patterns.",
    solution: "Real-time monitoring dashboard for LLM API calls — track tokens, latency, errors, and cost across providers.",
    impact: "Full observability for AI-powered apps. Catch issues before users do.",
    status: "building",
    tech: ["Next.js", "Python", "PostgreSQL", "OpenAI SDK"],
    featured: true,
    metrics: [
      { label: "API Calls Tracked", value: "10k+" },
      { label: "Latency Reduced", value: "40%" },
      { label: "Cost Saved", value: "$200/mo" },
    ],
  },
  {
    name: "AuthorStack",
    tagline: "Unified Author Dashboard",
    problem: "Authors selling on multiple platforms have no single source of truth for sales, royalties, and analytics.",
    solution: "Unified dashboard pulling from KDP and other platforms — sales data, royalty tracking, and performance analytics in one place.",
    impact: "One dashboard to rule all publishing platforms.",
    status: "shipped",
    tech: ["React", "Node.js", "KDP API", "PostgreSQL"],
  },
  {
    name: "Ghostwriter",
    tagline: "Ghostwriting for Startups",
    problem: "Startups need content that sounds like them — not generic AI slop or overpriced agencies.",
    solution: "Ghostwriting service tailored for startup founders. Technical content, landing pages, and thought leadership.",
    impact: "Shipped content for real startups. Words that convert.",
    status: "live",
    tech: ["Content", "Startups", "Copywriting"],
  },
  {
    name: "Freelance Engineering",
    tagline: "Upwork — Full-Stack",
    problem: "Businesses need fast, reliable devs who actually ship — not agencies with 6-week timelines.",
    solution: "Full-stack freelancing on Upwork. Quick turnarounds on web apps, automations, and integrations.",
    impact: "Real clients, real deadlines, real code in production.",
    status: "live",
    tech: ["Next.js", "Python", "Automation", "APIs"],
  },
];

export default function TheLab() {
  return (
    <section id="lab" className="relative w-full py-32 md:py-44">
      <div className="max-w-5xl w-full mx-auto px-8 md:px-12">
        <SectionHeader
          command="ls ~/lab"
          title="The Lab"
          subtitle="Products and experiments. Each one started with a real problem."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <GlowCard
              key={project.name}
              featured={project.featured}
              glowColor={
                project.status === "building"
                  ? "rgba(245, 158, 11, 0.12)"
                  : project.status === "live"
                  ? "rgba(0, 255, 163, 0.12)"
                  : project.status === "shipped"
                  ? "rgba(14, 165, 233, 0.12)"
                  : "rgba(168, 85, 247, 0.12)"
              }
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {project.name}
                    </h3>
                    <p className="text-muted text-sm">{project.tagline}</p>
                  </div>
                  <StatusPulse status={project.status} />
                </div>

                {/* Problem → Solution → Impact */}
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-accent font-mono text-xs">
                      PROBLEM
                    </span>
                    <p className="text-muted-light mt-0.5">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-secondary font-mono text-xs">
                      SOLUTION
                    </span>
                    <p className="text-muted-light mt-0.5">
                      {project.solution}
                    </p>
                  </div>
                  <div>
                    <span className="text-foreground font-mono text-xs">
                      IMPACT
                    </span>
                    <p className="text-foreground/80 mt-0.5 font-medium">
                      {project.impact}
                    </p>
                  </div>
                </div>

                {/* Metrics (featured only) */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-card-border">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <div className="text-accent font-bold text-lg font-mono">
                          {metric.value}
                        </div>
                        <div className="text-muted text-xs">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs font-mono text-muted bg-card-border/50 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

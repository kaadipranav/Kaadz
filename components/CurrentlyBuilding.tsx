'use client';

import { motion } from 'framer-motion';
import { Activity, GitBranch } from 'lucide-react';
import GitHubStats from './GitHubStats';

export default function CurrentlyBuilding() {
  return (
    <section className="py-32 px-4 relative">
      <div className="section-divider mb-32" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="label-gold block mb-4">NOW</span>
          <h2 className="text-headline">Currently Building</h2>
          <p className="text-body-lg mt-4 max-w-md">
            Live work and active development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* WatchLLM — primary focus */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="card-premium p-8 hover-lift group"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[rgba(201,169,110,0.06)] border border-[var(--border)] flex items-center justify-center">
                  <Activity className="w-4.5 h-4.5 text-[var(--gold)] opacity-60" />
                </div>
                <div>
                  <a href="https://watchllm.dev" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold-light)] transition-colors duration-300">
                    <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--text-primary)]">WatchLLM</h3>
                  </a>
                </div>
              </div>
              <a href="https://watchllm.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="status-dot" />
                <span className="text-mono text-xs text-[var(--gold)] opacity-60">LIVE</span>
              </a>
            </div>

            <div className="space-y-6">
              <div>
                <p className="label-gold mb-2">FOCUS</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                  Real-time monitoring, cost optimization, performance tracking for LLM applications.
                </p>
              </div>
              <div className="w-full h-px bg-[var(--border)]" />
              <div>
                <p className="label-gold mb-2">NEXT</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                  Enhanced analytics dashboard, alerting system, team collaboration features.
                </p>
              </div>
              <div className="w-full h-px bg-[var(--border)]" />
              <a
                href="https://watchllm.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--gold)] opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-mono text-xs tracking-wider">VIEW PROJECT →</span>
              </a>
            </div>
          </motion.div>

          {/* Experiments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="card-premium p-8 hover-lift group"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[rgba(201,169,110,0.04)] border border-[var(--border)] flex items-center justify-center">
                  <GitBranch className="w-4.5 h-4.5 text-[var(--text-muted)]" />
                </div>
                <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--text-primary)]">Experiments</h3>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="label-gold mb-3">ACTIVE THREADS</p>
                <ul className="space-y-3">
                  {[
                    'AI-powered automation tools',
                    'Performance optimization experiments',
                    'New monitoring integrations',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-secondary)] font-light">
                      <span className="text-[var(--gold)] opacity-30 text-xs">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full h-px bg-[var(--border)]" />
              <div>
                <p className="label-gold mb-2">VELOCITY</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                  Shipping new features weekly, testing hypotheses fast.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <GitHubStats />
        </motion.div>
      </div>
    </section>
  );
}

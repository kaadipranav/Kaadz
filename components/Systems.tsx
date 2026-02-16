'use client';

import { motion } from 'framer-motion';
import { Code2, Zap, Cpu, GitBranch } from 'lucide-react';

const systems = [
  {
    icon: Code2,
    title: 'Full-Stack',
    description: 'TypeScript, Next.js, React, Node.js — end to end.',
    number: '01',
  },
  {
    icon: Zap,
    title: 'AI Co-Founder',
    description: 'Cursor, Claude, GPT-4 — AI as velocity multiplier.',
    number: '02',
  },
  {
    icon: Cpu,
    title: 'Systems Thinking',
    description: 'Automation, infrastructure, scale — built to last.',
    number: '03',
  },
  {
    icon: GitBranch,
    title: 'Fast Iteration',
    description: 'Ship → test → iterate → repeat. Weekly cadence.',
    number: '04',
  },
];

export default function Systems() {
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
          <span className="label-gold block mb-4">METHODOLOGY</span>
          <h2 className="text-headline">Systems</h2>
          <p className="text-body-lg mt-4 max-w-md">
            The operating system behind everything I ship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-[var(--border)] rounded-2xl overflow-hidden">
          {systems.map((system, index) => {
            const Icon = system.icon;
            return (
              <motion.div
                key={system.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[var(--surface)] p-8 md:p-10 group hover:bg-[var(--surface-elevated)] transition-colors duration-500 cursor-default"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-mono text-[var(--gold)] opacity-25 text-xs">{system.number}</span>
                  <div className="w-10 h-10 rounded-xl bg-[rgba(201,169,110,0.04)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[rgba(201,169,110,0.08)] group-hover:border-[var(--border-hover)] transition-all duration-500">
                    <Icon className="w-4.5 h-4.5 text-[var(--gold)] opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>
                </div>

                <h3 className="text-xl font-light tracking-[-0.01em] text-[var(--text-primary)] mb-3 group-hover:text-[var(--gold-light)] transition-colors duration-500">
                  {system.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                  {system.description}
                </p>

                {/* Subtle bottom accent on hover */}
                <div className="mt-6 w-0 h-px bg-[var(--gold)] opacity-0 group-hover:w-12 group-hover:opacity-30 transition-all duration-700 ease-out" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

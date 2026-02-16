'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const tickerItems = [
  'FULL-STACK',
  'AI SYSTEMS',
  'NEXT.JS',
  'TYPESCRIPT',
  'REACT',
  'NODE.JS',
  'CLOUDFLARE',
  'MONITORING',
  'LLM OPS',
  'SHIP FAST',
  'FOUNDER',
  'HACKER',
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const tickerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Giant ambient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Top horizontal line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[15%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.12)] to-transparent origin-center"
      />

      {/* Main content */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 text-center px-4"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <span className="label-gold">PERSONAL OPERATING SYSTEM</span>
        </motion.div>

        {/* Name — massive, light-weight */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-display tracking-[-0.05em] mb-6"
        >
          <span className="font-extralight text-[var(--text-primary)]">kaa</span>
          <span className="shimmer-text font-light">dz</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-body-lg max-w-lg mx-auto mb-10"
        >
          Builder. Hacker. Founder.
          <br />
          <span className="text-[var(--text-muted)]">
            Shipping real products — not tutorials.
          </span>
        </motion.p>

        {/* Status indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-8 text-mono"
        >
          <div className="flex items-center gap-2.5">
            <div className="status-dot" />
            <span className="text-[var(--text-secondary)] text-xs tracking-[0.15em] uppercase">Building</span>
          </div>
          <div className="w-px h-3 bg-[var(--border)]" />
          <div className="flex items-center gap-2.5">
            <span className="text-[var(--gold)] text-xs">⚡</span>
            <span className="text-[var(--text-secondary)] text-xs tracking-[0.15em] uppercase">Shipping</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Infinite scroll ticker at bottom */}
      <motion.div
        style={{ opacity: tickerOpacity }}
        className="absolute bottom-16 left-0 right-0 overflow-hidden"
      >
        <div className="ticker-track flex whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 mx-6 text-[0.65rem] tracking-[0.3em] font-light text-[var(--text-muted)] uppercase select-none"
            >
              {item}
              <span className="text-[var(--gold)] opacity-30">◆</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[var(--gold)] to-transparent opacity-30"
        />
      </motion.div>
    </section>
  );
}

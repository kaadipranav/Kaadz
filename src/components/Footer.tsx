"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full py-12 border-t border-card-border">
      <div className="max-w-5xl mx-auto px-8 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold tracking-tighter text-foreground">
              kaadz<span className="text-accent">.me</span>
            </span>
            <span className="text-muted text-xs font-mono">
              © {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent text-sm font-mono transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://x.com/kaad_zz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent text-sm font-mono transition-colors"
            >
              X / Twitter
            </a>
            <a
              href="mailto:hello@kaadz.me"
              className="text-muted hover:text-accent text-sm font-mono transition-colors"
            >
              Email
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-muted font-mono"
          >
            built with <span className="text-accent">obsession</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Mail } from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/kaadipranav',
    label: 'GITHUB',
  },
  {
    icon: Twitter,
    href: 'https://x.com/kaad_zz',
    label: 'X / TWITTER',
  },
  {
    icon: Mail,
    href: 'mailto:contact@kaadz.me',
    label: 'EMAIL',
  },
];

export default function About() {
  return (
    <section className="py-32 px-4 relative">
      <div className="section-divider mb-32" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="label-gold block mb-4">ABOUT</span>

          <h2 className="text-headline mb-8">
            Let&apos;s build
            <br />
            <span className="shimmer-text">something real.</span>
          </h2>

          <p className="text-body-lg mb-16 max-w-lg mx-auto">
            Building real products, not tutorials. Focused on shipping fast,
            iterating on real problems, and treating AI as a co-founder.
          </p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-elevated)] transition-all duration-500"
                >
                  <Icon className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors duration-500" />
                  <span className="text-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-500 tracking-wider">
                    {social.label}
                  </span>
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-32 text-center"
        >
          <div className="section-divider mb-8" />
          <p className="text-mono text-xs text-[var(--text-muted)] tracking-[0.2em]">
            © {new Date().getFullYear()} KAADZ
          </p>
        </motion.div>
      </div>
    </section>
  );
}

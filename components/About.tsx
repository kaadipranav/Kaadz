'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Mail } from 'lucide-react';

export default function About() {
  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">About</h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Building real products, not tutorials. Focused on shipping fast, 
            iterating on real problems, and treating AI as a co-founder. 
            This is where experiments become products.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-6"
          >
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group"
            >
              <Github className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://x.com/kaad_zz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group"
            >
              <Twitter className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href="mailto:contact@kaadz.me"
              className="p-4 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group"
            >
              <Mail className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


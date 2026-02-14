'use client';

import { motion } from 'framer-motion';
import { Github, Code2, Zap, Cpu } from 'lucide-react';

const systems = [
  {
    icon: Code2,
    title: 'Full-Stack',
    description: 'TypeScript, Next.js, React, Node.js',
  },
  {
    icon: Zap,
    title: 'AI Co-Founder',
    description: 'Cursor, Claude, GPT-4 for velocity',
  },
  {
    icon: Cpu,
    title: 'Systems Thinking',
    description: 'Automation, infrastructure, scale',
  },
  {
    icon: Github,
    title: 'Fast Iteration',
    description: 'Ship → test → iterate → repeat',
  },
];

export default function Systems() {
  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Systems I Use</h2>
          <p className="text-gray-400 text-lg">How I ship fast and build</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((system, index) => {
            const Icon = system.icon;
            return (
              <motion.div
                key={system.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-6 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm hover:border-gray-700 transition-all duration-300"
              >
                <Icon className="w-8 h-8 mb-4 text-blue-400" />
                <h3 className="text-xl font-bold mb-2">{system.title}</h3>
                <p className="text-sm text-gray-400">{system.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


'use client';

import { motion } from 'framer-motion';
import { Github, Code2, Zap, Cpu } from 'lucide-react';

const systems = [
  {
    icon: Code2,
    title: 'Full-Stack',
    description: 'TypeScript, Next.js, React, Node.js',
    color: 'blue',
    style: 'minimal',
  },
  {
    icon: Zap,
    title: 'AI Co-Founder',
    description: 'Cursor, Claude, GPT-4 for velocity',
    color: 'yellow',
    style: 'gradient',
  },
  {
    icon: Cpu,
    title: 'Systems Thinking',
    description: 'Automation, infrastructure, scale',
    color: 'purple',
    style: 'bordered',
  },
  {
    icon: Github,
    title: 'Fast Iteration',
    description: 'Ship → test → iterate → repeat',
    color: 'green',
    style: 'compact',
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
            const colorClasses = {
              blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
              yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
              purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
              green: 'text-green-400 bg-green-500/10 border-green-500/20',
            };

            return (
              <motion.div
                key={system.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -5, 
                  scale: system.style === 'compact' ? 1.05 : 1.02,
                  transition: { duration: 0.2 } 
                }}
                className={`${
                  system.style === 'minimal' ? 'p-6 rounded-lg' :
                  system.style === 'gradient' ? 'p-6 rounded-xl bg-gradient-to-br from-yellow-950/20 to-gray-900/30' :
                  system.style === 'bordered' ? 'p-6 rounded-lg border-2' :
                  'p-5 rounded-2xl'
                } border ${colorClasses[system.color as keyof typeof colorClasses]} backdrop-blur-sm hover:border-opacity-50 transition-all duration-300 ${
                  system.style === 'gradient' ? 'border-yellow-500/30' : ''
                }`}
              >
                {system.style === 'minimal' ? (
                  <>
                    <Icon className="w-8 h-8 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{system.title}</h3>
                    <p className="text-sm text-gray-400">{system.description}</p>
                  </>
                ) : system.style === 'gradient' ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-yellow-500/20">
                        <Icon className="w-6 h-6 text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-bold">{system.title}</h3>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{system.description}</p>
                  </>
                ) : system.style === 'bordered' ? (
                  <>
                    <div className="mb-4 pb-4 border-b border-purple-500/20">
                      <Icon className="w-8 h-8 mb-2" />
                      <h3 className="text-xl font-bold">{system.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400">{system.description}</p>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold mb-1.5">{system.title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">{system.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


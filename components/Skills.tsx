'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code2, BrainCircuit, Cloud, Zap, Globe, Database, Cpu, Shield } from 'lucide-react';

const skills = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'React, Next.js, TypeScript, Node.js',
    level: 95,
    category: 'core'
  },
  {
    icon: BrainCircuit,
    title: 'AI/ML Systems',
    description: 'LLM Ops, Vector Databases, Fine-tuning',
    level: 88,
    category: 'ai'
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'AWS, Cloudflare, Docker, K8s',
    level: 92,
    category: 'infrastructure'
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimization, Monitoring, Caching',
    level: 90,
    category: 'core'
  },
  {
    icon: Globe,
    title: 'Web3/Blockchain',
    description: 'Smart Contracts, DeFi, dApps',
    level: 75,
    category: 'emerging'
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'PostgreSQL, MongoDB, Redis',
    level: 85,
    category: 'infrastructure'
  },
  {
    icon: Cpu,
    title: 'Systems Design',
    description: 'Microservices, APIs, Architecture',
    level: 87,
    category: 'core'
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Auth, Encryption, Best Practices',
    level: 82,
    category: 'infrastructure'
  }
];

const categories = [
  { id: 'all', label: 'ALL SKILLS' },
  { id: 'core', label: 'CORE' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'infrastructure', label: 'INFRASTRUCTURE' },
  { id: 'emerging', label: 'EMERGING' }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section className="py-32 px-4 relative">
      <div className="section-divider mb-32" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="label-gold block mb-4">EXPERTISE</span>
          <h2 className="text-headline mb-8">
            Skills that
            <br />
            <span className="shimmer-text">ship products.</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Full-stack capabilities with deep expertise in AI systems and modern infrastructure.
            Built from real-world experience, not tutorials.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-mono text-xs tracking-wider transition-all duration-500 ${
                activeCategory === category.id
                  ? 'bg-[var(--gold)] text-[var(--background)]'
                  : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                onHoverStart={() => setHoveredSkill(skill.title)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="card-premium p-6 hover-lift cursor-pointer group"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--surface-elevated)] flex items-center justify-center group-hover:bg-[var(--gold)] transition-all duration-500">
                    <Icon className="w-6 h-6 text-[var(--gold)] group-hover:text-[var(--background)] transition-colors duration-500" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-light text-[var(--text-primary)] mb-2 group-hover:text-[var(--gold)] transition-colors duration-500">
                  {skill.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                  {skill.description}
                </p>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="h-1 bg-[var(--surface)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: hoveredSkill === skill.title ? `${skill.level}%` : '0%' 
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] rounded-full"
                    />
                  </div>
                  <span className="text-mono text-xs text-[var(--text-muted)] mt-2 inline-block">
                    {skill.level}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '50+', label: 'PROJECTS SHIPPED' },
            { number: '8+', label: 'YEARS EXPERIENCE' },
            { number: '15+', label: 'TECH STACK' },
            { number: '100%', label: 'SHIP RATE' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-light text-[var(--gold)] mb-2">
                {stat.number}
              </div>
              <div className="text-mono text-xs text-[var(--text-muted)] tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

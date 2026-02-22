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
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const handleSkillClick = (skillTitle: string) => {
    setSelectedSkill(selectedSkill === skillTitle ? null : skillTitle);
  };

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
            const isSelected = selectedSkill === skill.title;
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
                onClick={() => handleSkillClick(skill.title)}
                onHoverStart={() => setHoveredSkill(skill.title)}
                onHoverEnd={() => setHoveredSkill(null)}
                className={`card-premium p-6 cursor-pointer transition-all duration-500 ${
                  isSelected ? 'ring-2 ring-[var(--gold)] bg-[var(--surface-elevated)]' : 'hover-lift'
                }`}
              >
                {/* Icon */}
                <div className="mb-4">
                  <motion.div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 ${
                      isSelected ? 'bg-[var(--gold)]' : 'bg-[var(--surface-elevated)]'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className={`w-6 h-6 transition-colors duration-500 ${
                      isSelected ? 'text-[var(--background)]' : 'text-[var(--gold)]'
                    }`} />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className={`text-lg font-light mb-2 transition-colors duration-500 ${
                  isSelected ? 'text-[var(--gold)]' : 'text-[var(--text-primary)]'
                }`}>
                  {skill.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                  {skill.description}
                </p>

                {/* Interactive Progress Bar */}
                <div className="relative">
                  <div className="h-1 bg-[var(--surface)] rounded-full overflow-hidden cursor-pointer"
                       onClick={(e) => e.stopPropagation()}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: isSelected || hoveredSkill === skill.title ? `${skill.level}%` : '20%'
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] rounded-full"
                    />
                  </div>
                  <motion.div 
                    className="flex items-center justify-between mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-mono text-xs text-[var(--text-muted)]">
                      EXPERTISE
                    </span>
                    <motion.span 
                      className="text-mono text-xs font-bold"
                      animate={{ 
                        color: isSelected ? 'var(--gold)' : 'var(--text-muted)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </motion.div>
                </div>

                {/* Expanded Details */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: isSelected ? 1 : 0,
                    height: isSelected ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 pt-4 border-t border-[var(--border)]"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                      <span className="text-xs text-[var(--text-secondary)]">
                        Click to explore projects using this skill
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--gold)] text-mono text-xs text-[var(--text-secondary)] hover:text-[var(--gold)] transition-all duration-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Navigate to projects filtered by this skill
                        const projectsSection = document.getElementById('projects');
                        projectsSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      VIEW RELATED PROJECTS →
                    </motion.button>
                  </div>
                </motion.div>

                {/* Hover Effect Overlay */}
                {hoveredSkill === skill.title && !isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--gold)]/5 to-transparent pointer-events-none"
                  />
                )}
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

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Sparkles, Rocket, Zap, Shield } from 'lucide-react';

const projects = [
  {
    title: 'AI-Powered Analytics Platform',
    description: 'Real-time data visualization with ML insights and predictive analytics for enterprise clients.',
    tech: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL'],
    category: 'ai',
    status: 'live',
    link: 'https://example.com',
    github: 'https://github.com',
    featured: true,
    icon: Sparkles
  },
  {
    title: 'Decentralized Exchange',
    description: 'High-performance DEX with automated market making and liquidity pools for DeFi protocols.',
    tech: ['Solidity', 'React', 'Web3.js', 'Node.js'],
    category: 'web3',
    status: 'live',
    link: 'https://example.com',
    github: 'https://github.com',
    featured: true,
    icon: Rocket
  },
  {
    title: 'Cloud Infrastructure Suite',
    description: 'Microservices orchestration platform with auto-scaling and monitoring for distributed systems.',
    tech: ['Kubernetes', 'Docker', 'Go', 'AWS'],
    category: 'infrastructure',
    status: 'development',
    link: null,
    github: 'https://github.com',
    featured: false,
    icon: Shield
  },
  {
    title: 'Real-time Collaboration Tool',
    description: 'WebSocket-based collaborative workspace with CRDT operations and live synchronization.',
    tech: ['TypeScript', 'Socket.io', 'Redis', 'MongoDB'],
    category: 'saas',
    status: 'live',
    link: 'https://example.com',
    github: 'https://github.com',
    featured: false,
    icon: Zap
  },
  {
    title: 'LLM Fine-tuning Pipeline',
    description: 'Automated model training pipeline with custom datasets and deployment optimization.',
    tech: ['Python', 'PyTorch', 'FastAPI', 'Docker'],
    category: 'ai',
    status: 'beta',
    link: null,
    github: 'https://github.com',
    featured: false,
    icon: Sparkles
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure fintech application with biometric auth and real-time transaction processing.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
    category: 'fintech',
    status: 'live',
    link: 'https://example.com',
    github: null,
    featured: false,
    icon: Shield
  }
];

const categories = [
  { id: 'all', label: 'ALL PROJECTS' },
  { id: 'featured', label: 'FEATURED' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'web3', label: 'WEB3' },
  { id: 'infrastructure', label: 'INFRASTRUCTURE' },
  { id: 'saas', label: 'SAAS' },
  { id: 'fintech', label: 'FINTECH' }
];

const statusColors: Record<string, string> = {
  live: 'bg-green-500/10 text-green-400 border-green-500/20',
  development: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  beta: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : activeCategory === 'featured'
    ? projects.filter(p => p.featured)
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="py-32 px-4 relative">
      <div className="section-divider mb-32" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="label-gold block mb-4">PROJECTS</span>
          <h2 className="text-headline mb-8">
            Real products,
            <br />
            <span className="shimmer-text">real impact.</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            A curated selection of shipped products that solve actual problems.
            No tutorials, no demos—just production-grade applications.
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                onHoverStart={() => setHoveredProject(project.title)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group"
              >
                <div className="card-premium p-8 hover-lift h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[var(--surface-elevated)] flex items-center justify-center group-hover:bg-[var(--gold)] transition-all duration-500">
                      <Icon className="w-7 h-7 text-[var(--gold)] group-hover:text-[var(--background)] transition-colors duration-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      {project.featured && (
                        <span className="px-2 py-1 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] text-mono text-xs tracking-wider">
                          FEATURED
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full border text-mono text-xs tracking-wider ${statusColors[project.status]}`}>
                        {project.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-light text-[var(--text-primary)] mb-3 group-hover:text-[var(--gold)] transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-mono text-xs text-[var(--text-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-auto">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--gold)] hover:bg-[var(--surface-elevated)] transition-all duration-500 group/btn"
                      >
                        <span className="text-mono text-xs text-[var(--text-secondary)] group-hover/btn:text-[var(--gold)] transition-colors duration-500">
                          VIEW LIVE
                        </span>
                        <ExternalLink className="w-3 h-3 text-[var(--text-muted)] group-hover/btn:text-[var(--gold)] transition-colors duration-500" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--gold)] hover:bg-[var(--surface-elevated)] transition-all duration-500 group/btn"
                      >
                        <Github className="w-4 h-4 text-[var(--text-muted)] group-hover/btn:text-[var(--gold)] transition-colors duration-500" />
                      </a>
                    )}
                  </div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredProject === project.title ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--gold)]/5 to-transparent pointer-events-none"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="card-glass p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-[var(--text-primary)] mb-4">
              Want to see more?
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              I&apos;ve shipped 50+ projects. Let&apos;s discuss how I can help build your next product.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--gold)] text-[var(--background)] hover:bg-[var(--gold-light)] transition-all duration-500 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-medium tracking-wider">LET&apos;S COLLABORATE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

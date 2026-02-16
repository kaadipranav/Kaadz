'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Activity, BookOpen, PenTool } from 'lucide-react';

const projects = [
  {
    name: 'WatchLLM',
    tagline: 'AI Observability Platform',
    status: 'Active',
    problem: 'AI observability is fragmented and expensive',
    solution: 'Unified monitoring platform for LLM applications',
    impact: 'Real-time insights, cost tracking, performance optimization',
    link: '#',
    featured: true,
    icon: Activity,
    number: '01',
  },
  {
    name: 'AuthorStack',
    tagline: 'Book Sales Dashboard',
    status: 'Archived',
    problem: 'Authors struggle managing sales across platforms',
    solution: 'Unified dashboard for multi-platform book sales',
    impact: 'KDP integrations, analytics, streamlined workflow',
    link: '#',
    featured: false,
    icon: BookOpen,
    number: '02',
  },
  {
    name: 'Ghostwriter',
    tagline: 'Technical Content Service',
    status: 'Active',
    problem: 'Startups need quality content fast',
    solution: 'Ghostwriting service for technical content',
    impact: 'Fast turnaround, technical accuracy, scalable',
    link: '#',
    featured: false,
    icon: PenTool,
    number: '03',
  },
];

export default function TheLab() {
  return (
    <section className="py-32 px-4 relative">
      {/* Section divider */}
      <div className="section-divider mb-32" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="label-gold block mb-4">PORTFOLIO</span>
          <h2 className="text-headline">The Lab</h2>
          <p className="text-body-lg mt-4 max-w-md">
            Products and experiments that made it to production.
          </p>
        </motion.div>

        {/* Featured project — full width */}
        {projects.filter(p => p.featured).map((project) => {
          const Icon = project.icon;
          return (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium p-8 md:p-12 mb-8 hover-lift group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-mono text-[var(--gold)] opacity-40">{project.number}</span>
                    <div className="w-8 h-px bg-[var(--border-hover)]" />
                    <span className="text-mono text-xs text-[var(--gold)] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-[var(--gold)] border-opacity-20 bg-[rgba(201,169,110,0.05)]">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-light tracking-[-0.03em] mb-2 text-[var(--text-primary)] group-hover:text-[var(--gold-light)] transition-colors duration-500">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] tracking-wide mb-8">
                    {project.tagline}
                  </p>

                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      { label: 'Problem', text: project.problem },
                      { label: 'Solution', text: project.solution },
                      { label: 'Impact', text: project.impact },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="label-gold mb-2">{item.label}</p>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[rgba(201,169,110,0.05)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[rgba(201,169,110,0.1)] group-hover:border-[var(--border-hover)] transition-all duration-500">
                    <Icon className="w-7 h-7 text-[var(--gold)] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--border)]">
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2.5 text-sm text-[var(--gold)] opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="text-mono tracking-wider">VIEW PROJECT</span>
                </a>
              </div>
            </motion.div>
          );
        })}

        {/* Other projects — two column grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="card-premium p-6 md:p-8 hover-lift group cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-mono text-[var(--gold)] opacity-40">{project.number}</span>
                  <div className="w-6 h-px bg-[var(--border-hover)]" />
                  <span className={`text-mono text-xs tracking-[0.15em] uppercase ${project.status === 'Active'
                      ? 'text-[var(--gold)]'
                      : 'text-[var(--text-muted)]'
                    }`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light tracking-[-0.02em] mb-1 text-[var(--text-primary)] group-hover:text-[var(--gold-light)] transition-colors duration-500">
                      {project.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] tracking-wide">
                      {project.tagline}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[rgba(201,169,110,0.04)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[var(--gold)] opacity-50" />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {[
                    { label: 'Problem', text: project.problem },
                    { label: 'Solution', text: project.solution },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="label-gold mb-1">{item.label}</p>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-sm text-[var(--gold)] opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="text-mono text-xs tracking-wider">VIEW</span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

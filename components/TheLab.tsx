'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code, TrendingUp } from 'lucide-react';

const projects = [
  {
    name: 'WatchLLM',
    status: 'Active',
    problem: 'AI observability is fragmented and expensive',
    solution: 'Unified monitoring platform for LLM applications',
    impact: 'Real-time insights, cost tracking, performance optimization',
    link: '#',
    featured: true,
  },
  {
    name: 'AuthorStack',
    status: 'Archived',
    problem: 'Authors struggle managing sales across platforms',
    solution: 'Unified dashboard for multi-platform book sales',
    impact: 'KDP integrations, analytics, streamlined workflow',
    link: '#',
    featured: false,
  },
  {
    name: 'Ghostwriter',
    status: 'Active',
    problem: 'Startups need quality content fast',
    solution: 'Ghostwriting service for technical content',
    impact: 'Fast turnaround, technical accuracy, scalable',
    link: '#',
    featured: false,
  },
];

export default function TheLab() {
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
          <h2 className="text-5xl md:text-6xl font-bold mb-4">The Lab</h2>
          <p className="text-gray-400 text-lg">Products and experiments in production</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`group relative p-6 rounded-lg border ${
                project.featured
                  ? 'border-blue-500/50 bg-gradient-to-br from-blue-950/20 to-gray-900/50'
                  : 'border-gray-800 bg-gray-900/30 backdrop-blur-sm'
              } hover:border-gray-700 transition-all duration-300`}
            >
              {project.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                  FEATURED
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold">{project.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    project.status === 'Active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Problem</p>
                  <p className="text-sm text-gray-300">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Solution</p>
                  <p className="text-sm text-gray-300">{project.solution}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Impact</p>
                  <p className="text-sm text-gray-300">{project.impact}</p>
                </div>
              </div>

              <a
                href={project.link}
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View project</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


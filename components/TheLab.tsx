'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Activity, BookOpen, PenTool } from 'lucide-react';

const projects = [
  {
    name: 'WatchLLM',
    status: 'Active',
    problem: 'AI observability is fragmented and expensive',
    solution: 'Unified monitoring platform for LLM applications',
    impact: 'Real-time insights, cost tracking, performance optimization',
    link: '#',
    featured: true,
    icon: Activity,
    accent: 'blue',
    layout: 'wide',
  },
  {
    name: 'AuthorStack',
    status: 'Archived',
    problem: 'Authors struggle managing sales across platforms',
    solution: 'Unified dashboard for multi-platform book sales',
    impact: 'KDP integrations, analytics, streamlined workflow',
    link: '#',
    featured: false,
    icon: BookOpen,
    accent: 'purple',
    layout: 'tall',
  },
  {
    name: 'Ghostwriter',
    status: 'Active',
    problem: 'Startups need quality content fast',
    solution: 'Ghostwriting service for technical content',
    impact: 'Fast turnaround, technical accuracy, scalable',
    link: '#',
    featured: false,
    icon: PenTool,
    accent: 'green',
    layout: 'compact',
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isWide = project.layout === 'wide';
            const isTall = project.layout === 'tall';
            const isCompact = project.layout === 'compact';

            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                className={`group relative ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                } ${
                  isTall ? 'md:row-span-1' : ''
                } ${
                  project.featured
                    ? 'border-blue-500/50 bg-gradient-to-br from-blue-950/20 via-blue-950/10 to-gray-900/50'
                    : project.accent === 'purple'
                    ? 'border-purple-500/30 bg-gradient-to-br from-purple-950/10 to-gray-900/30'
                    : project.accent === 'green'
                    ? 'border-green-500/30 bg-gradient-to-br from-green-950/10 to-gray-900/30'
                    : 'border-gray-800 bg-gray-900/30'
                } ${
                  isWide ? 'rounded-xl' : isCompact ? 'rounded-2xl' : 'rounded-lg'
                } border backdrop-blur-sm hover:border-gray-600 transition-all duration-300 overflow-hidden`}
              >
                {/* Background accent */}
                {project.featured && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                )}

                {/* Corner accent for featured */}
                {project.featured && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                )}

                {/* Different padding based on layout */}
                <div className={`relative ${isWide ? 'p-8' : isCompact ? 'p-5' : 'p-6'} h-full flex flex-col`}>
                  {project.featured && (
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full z-10">
                      FEATURED
                    </div>
                  )}

                  {/* Header with icon */}
                  <div className={`flex items-start justify-between ${isCompact ? 'mb-3' : 'mb-4'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        project.accent === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                        project.accent === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                        project.accent === 'green' ? 'bg-green-500/20 text-green-400' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className={`${isWide ? 'text-3xl' : 'text-2xl'} font-bold`}>{project.name}</h3>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        project.status === 'Active'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Content layout variations */}
                  {isWide ? (
                    <div className="grid md:grid-cols-3 gap-6 mb-6 flex-grow">
                      <div>
                        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Problem</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{project.problem}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Solution</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{project.solution}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Impact</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{project.impact}</p>
                      </div>
                    </div>
                  ) : isCompact ? (
                    <div className="space-y-2.5 mb-4 flex-grow">
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
                  ) : (
                    <div className="space-y-4 mb-6 flex-grow">
                      <div className="border-l-2 border-purple-500/30 pl-4">
                        <p className="text-xs text-gray-500 mb-1.5 font-medium">Problem</p>
                        <p className="text-sm text-gray-300">{project.problem}</p>
                      </div>
                      <div className="border-l-2 border-purple-500/30 pl-4">
                        <p className="text-xs text-gray-500 mb-1.5 font-medium">Solution</p>
                        <p className="text-sm text-gray-300">{project.solution}</p>
                      </div>
                      <div className="border-l-2 border-purple-500/30 pl-4">
                        <p className="text-xs text-gray-500 mb-1.5 font-medium">Impact</p>
                        <p className="text-sm text-gray-300">{project.impact}</p>
                      </div>
                    </div>
                  )}

                  <a
                    href={project.link}
                    className={`inline-flex items-center gap-2 text-sm ${
                      project.accent === 'blue' ? 'text-blue-400 hover:text-blue-300' :
                      project.accent === 'purple' ? 'text-purple-400 hover:text-purple-300' :
                      project.accent === 'green' ? 'text-green-400 hover:text-green-300' :
                      'text-gray-400 hover:text-white'
                    } transition-colors mt-auto`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View project</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


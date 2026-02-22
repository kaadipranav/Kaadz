'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, MapPin, Briefcase, GraduationCap, Award, Rocket } from 'lucide-react';

const timelineEvents = [
  {
    year: '2024',
    title: 'AI Systems Architect',
    company: 'Stealth Startup',
    description: 'Leading development of LLM-powered enterprise platform with real-time inference and fine-tuning capabilities.',
    type: 'work',
    location: 'San Francisco, CA',
    highlights: ['Scaled to 10M+ requests', 'Reduced latency by 60%', 'Built custom training pipeline']
  },
  {
    year: '2023',
    title: 'Full-Stack Lead',
    company: 'DeFi Protocol',
    description: 'Architected and deployed decentralized exchange with $50M+ TVL and automated market making.',
    type: 'work',
    location: 'Remote',
    highlights: ['Smart contract audits', 'Cross-chain integration', 'Mobile app launch']
  },
  {
    year: '2022',
    title: 'Senior Developer',
    company: 'Cloud Infrastructure Co',
    description: 'Built microservices orchestration platform handling 1M+ containers across multiple cloud providers.',
    type: 'work',
    location: 'Seattle, WA',
    highlights: ['Kubernetes expertise', 'CI/CD pipelines', 'Monitoring systems']
  },
  {
    year: '2021',
    title: 'Machine Learning Engineer',
    company: 'Analytics Startup',
    description: 'Developed predictive analytics engine serving enterprise clients with real-time data processing.',
    type: 'work',
    location: 'Austin, TX',
    highlights: ['TensorFlow models', 'Real-time streaming', 'API design']
  },
  {
    year: '2020',
    title: 'Computer Science Degree',
    company: 'University',
    description: 'Graduated with honors, specialized in distributed systems and machine learning.',
    type: 'education',
    location: 'Boston, MA',
    highlights: ['GPA: 3.8/4.0', 'Dean\'s List', 'Research publications']
  },
  {
    year: '2019',
    title: 'First Startup',
    company: 'Self-Funded',
    description: 'Built and launched SaaS product for automated social media management, reached 1K+ users.',
    type: 'project',
    location: 'Boston, MA',
    highlights: ['Product design', 'Full-stack development', 'User acquisition']
  }
];

const typeIcons: Record<string, any> = {
  work: Briefcase,
  education: GraduationCap,
  project: Rocket,
  award: Award
};

const typeColors: Record<string, string> = {
  work: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  education: 'bg-green-500/10 text-green-400 border-green-500/20',
  project: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  award: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
};

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

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
          <span className="label-gold block mb-4">JOURNEY</span>
          <h2 className="text-headline mb-8">
            Building in public,
            <br />
            <span className="shimmer-text">since day one.</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            From first startup to AI systems architect. Every step focused on shipping real products
            and solving actual problems.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--gold)] via-[var(--border)] to-transparent transform md:-translate-x-1/2" />

          {/* Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = typeIcons[event.type];
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-8 md:gap-12`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--gold)] transform -translate-x-1/2 md:-translate-x-1/2 z-10">
                    <motion.div
                      animate={{ scale: selectedEvent === index ? 1.5 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-2 h-2 rounded-full bg-[var(--gold)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>

                  {/* Year Badge */}
                  <div className="w-20 md:w-24 flex-shrink-0">
                    <div className="card-glass px-3 py-2 text-center">
                      <span className="text-mono text-sm text-[var(--gold)] font-bold">
                        {event.year}
                      </span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    onHoverStart={() => setSelectedEvent(index)}
                    onHoverEnd={() => setSelectedEvent(null)}
                    className={`flex-1 ${
                      isLeft ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
                    } md:w-1/2`}
                  >
                    <div className="card-premium p-6 hover-lift cursor-pointer">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeColors[event.type]}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-light text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors duration-500">
                              {event.title}
                            </h3>
                            <p className="text-[var(--gold)] text-sm font-light">
                              {event.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-mono text-xs text-[var(--text-muted)]">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Highlights */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: selectedEvent === index ? 1 : 0,
                          height: selectedEvent === index ? 'auto' : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-[var(--border)]">
                          <div className="space-y-2">
                            {event.highlights.map((highlight, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-[var(--gold)]" />
                                <span className="text-sm text-[var(--text-secondary)]">
                                  {highlight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* Hover Effect */}
                      {selectedEvent === index && (
                        <motion.div
                          layoutId="timeline-glow"
                          className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--gold)]/5 to-transparent pointer-events-none"
                        />
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20"
        >
          <div className="card-glass p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '8+', label: 'YEARS BUILDING' },
                { number: '50+', label: 'PROJECTS SHIPPED' },
                { number: '1M+', label: 'USERS IMPACTED' },
                { number: '∞', label: 'THINGS LEARNED' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-2xl font-light text-[var(--gold)] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-mono text-xs text-[var(--text-muted)] tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

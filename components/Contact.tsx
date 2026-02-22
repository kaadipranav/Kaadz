'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MessageSquare, Send, Github, Twitter, Linkedin, Calendar } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Direct line for serious inquiries',
    value: 'contact@kaadz.me',
    action: 'mailto:contact@kaadz.me',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  {
    icon: MessageSquare,
    title: 'Twitter/X',
    description: 'Quick thoughts and updates',
    value: '@kaad_zz',
    action: 'https://x.com/kaad_zz',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'Open source contributions',
    value: 'kaadipranav',
    action: 'https://github.com/kaadipranav',
    color: 'bg-green-500/10 text-green-400 border-green-500/20'
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    description: 'Professional network',
    value: 'kaadz',
    action: 'https://linkedin.com/in/kaadz',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  }
];

const collaborationTypes = [
  {
    title: 'Product Development',
    description: 'Full-stack development from concept to launch',
    timeline: '3-6 months',
    icon: '🚀'
  },
  {
    title: 'AI/ML Consulting',
    description: 'LLM integration and custom model development',
    timeline: '1-3 months',
    icon: '🤖'
  },
  {
    title: 'Technical Advisory',
    description: 'Architecture reviews and strategic guidance',
    timeline: 'Ongoing',
    icon: '🎯'
  },
  {
    title: 'Team Training',
    description: 'Modern development practices and AI workflows',
    timeline: '2-4 weeks',
    icon: '📚'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      company: '',
      project: '',
      timeline: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-32 px-4 relative">
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
          <span className="label-gold block mb-4">CONNECT</span>
          <h2 className="text-headline mb-8">
            Let&apos;s build
            <br />
            <span className="shimmer-text">something together.</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Whether you need a technical co-founder, AI expertise, or full-stack development—
            I&apos;m ready to help ship your next product.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.title}
                href={method.action}
                target={method.action.startsWith('mailto') ? undefined : '_blank'}
                rel={method.action.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="card-premium p-6 hover-lift cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-lg ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-light text-[var(--text-primary)] mb-2 group-hover:text-[var(--gold)] transition-colors duration-500">
                  {method.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  {method.description}
                </p>
                <span className="text-mono text-xs text-[var(--gold)]">
                  {method.value}
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Collaboration Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-light text-[var(--text-primary)] text-center mb-12">
            How we can work together
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collaborationTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                className="card-glass p-6 text-center hover-lift"
              >
                <div className="text-3xl mb-4">{type.icon}</div>
                <h4 className="text-lg font-light text-[var(--text-primary)] mb-3">
                  {type.title}
                </h4>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {type.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-mono text-xs text-[var(--gold)]">
                  <Calendar className="w-3 h-3" />
                  <span>{type.timeline}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="card-premium p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--gold)]/10 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <h3 className="text-2xl font-light text-[var(--text-primary)] mb-4">
                  Message sent!
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  I&apos;ll get back to you within 24 hours.
                </p>
                <motion.button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--gold)] transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-mono text-sm text-[var(--text-secondary)]">
                    SEND ANOTHER MESSAGE
                  </span>
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-mono text-xs text-[var(--text-muted)] tracking-wider mb-2">
                      NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none transition-all duration-500 text-[var(--text-primary)]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-mono text-xs text-[var(--text-muted)] tracking-wider mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none transition-all duration-500 text-[var(--text-primary)]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-mono text-xs text-[var(--text-muted)] tracking-wider mb-2">
                    COMPANY (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none transition-all duration-500 text-[var(--text-primary)]"
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-mono text-xs text-[var(--text-muted)] tracking-wider mb-2">
                      PROJECT TYPE
                    </label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none transition-all duration-500 text-[var(--text-primary)]"
                    >
                      <option value="">Select a type</option>
                      <option value="product">Product Development</option>
                      <option value="ai">AI/ML Consulting</option>
                      <option value="advisory">Technical Advisory</option>
                      <option value="training">Team Training</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-mono text-xs text-[var(--text-muted)] tracking-wider mb-2">
                      TIMELINE
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none transition-all duration-500 text-[var(--text-primary)]"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1month">1 month</option>
                      <option value="3months">3 months</option>
                      <option value="6months">6 months</option>
                      <option value="ongoing">Ongoing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-mono text-xs text-[var(--text-muted)] tracking-wider mb-2">
                    PROJECT DETAILS
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none transition-all duration-500 text-[var(--text-primary)] resize-none"
                    placeholder="Tell me about your project, goals, and what you're looking for..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[var(--gold)] text-[var(--background)] hover:bg-[var(--gold-light)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-[var(--background)] border-t-transparent rounded-full"
                      />
                      <span className="font-medium tracking-wider">SENDING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span className="font-medium tracking-wider">SEND MESSAGE</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-mono text-xs text-[var(--text-muted)] tracking-wider">
            RESPONSE TIME • WITHIN 24 HOURS • SERIOUS INQUIRIES ONLY
          </p>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Activity, GitBranch } from 'lucide-react';
import GitHubStats from './GitHubStats';

export default function CurrentlyBuilding() {
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
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Currently Building</h2>
          <p className="text-gray-400 text-lg">Live work and active development</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="relative p-8 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-950/20 to-gray-900/30 backdrop-blur-sm overflow-hidden"
          >
            {/* Animated background accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">WatchLLM</h3>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-medium">Status</p>
                    <span className="text-sm text-gray-300">Active Development</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">Focus</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Real-time monitoring, cost optimization, performance tracking
                  </p>
                </div>
                <div className="pt-2 border-t border-blue-500/20">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">Next</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Enhanced analytics dashboard, alerting system
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="relative p-8 rounded-xl border-2 border-gray-800 bg-gray-900/40 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gray-800 border border-gray-700">
                <GitBranch className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold">Experiments</h3>
            </div>
            <div className="space-y-5">
              <div>
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide font-medium">Active</p>
                <ul className="space-y-2.5 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">▸</span>
                    <span>AI-powered automation tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">▸</span>
                    <span>Performance optimization experiments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">▸</span>
                    <span>New monitoring integrations</span>
                  </li>
                </ul>
              </div>
              <div className="pt-2 border-t border-gray-800">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">Velocity</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Shipping new features weekly, testing hypotheses fast
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12"
        >
          <GitHubStats />
        </motion.div>
      </div>
    </section>
  );
}


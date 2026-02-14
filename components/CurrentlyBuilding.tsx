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
            className="p-8 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold">WatchLLM</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-300">Active Development</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Focus</p>
                <p className="text-sm text-gray-300">
                  Real-time monitoring, cost optimization, performance tracking
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Next</p>
                <p className="text-sm text-gray-300">
                  Enhanced analytics dashboard, alerting system
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-8 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <GitBranch className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold">Experiments</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Active</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• AI-powered automation tools</li>
                  <li>• Performance optimization experiments</li>
                  <li>• New monitoring integrations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Velocity</p>
                <p className="text-sm text-gray-300">
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


'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

interface GitHubStats {
  stars: number;
  contributions: number;
  repos: number;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch GitHub stats
    const fetchStats = async () => {
      try {
        // Using GitHub API for basic stats
        const response = await fetch('https://api.github.com/users/kaadipranav');
        const data = await response.json();
        
        setStats({
          stars: 0, // Would need to aggregate from repos
          contributions: 0, // Would need GitHub API v4 GraphQL
          repos: data.public_repos || 0,
        });
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <Github className="w-6 h-6 text-blue-400" />
        <h3 className="text-2xl font-bold">GitHub Activity</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* GitHub Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">Stats</h4>
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              View Profile →
            </a>
          </div>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Public Repositories</p>
                <p className="text-2xl font-bold">{stats?.repos || 0}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Contribution Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-6 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">Contribution Graph</h4>
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              View →
            </a>
          </div>
          <a
            href="https://github.com/kaadipranav"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=kaadipranav&theme=github-dark&hide_border=true&bg_color=0a0a0a&color=60a5fa&line=60a5fa&point=ffffff"
              alt="GitHub Activity Graph"
              className="w-full h-auto rounded"
            />
          </a>
        </motion.div>
      </div>

      {/* GitHub Stats Images */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-6"
      >
        <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">GitHub Statistics</h4>
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              View Profile →
            </a>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 hover:opacity-90 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://github-readme-stats.vercel.app/api?username=kaadipranav&show_icons=true&theme=dark&hide_border=true&bg_color=0a0a0a&title_color=ffffff&text_color=ededed&icon_color=60a5fa&border_color=1a1a1a"
                alt="GitHub Stats"
                className="w-full h-auto rounded"
              />
            </a>
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 hover:opacity-90 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=kaadipranav&layout=compact&theme=dark&hide_border=true&bg_color=0a0a0a&title_color=ffffff&text_color=ededed&border_color=1a1a1a"
                alt="Top Languages"
                className="w-full h-auto rounded"
              />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Contribution Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6"
      >
        <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">Contribution Heatmap</h4>
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              View Calendar →
            </a>
          </div>
          <a
            href="https://github.com/kaadipranav"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-90 transition-opacity"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-streak-stats.demolab.com/?user=kaadipranav&theme=dark&hide_border=true&background=0a0a0a&ring=60a5fa&fire=60a5fa&currStreakLabel=60a5fa"
              alt="GitHub Streak Stats"
              className="w-full h-auto rounded"
            />
          </a>
        </div>
      </motion.div>
    </div>
  );
}


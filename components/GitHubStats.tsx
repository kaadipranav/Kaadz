'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

interface GitHubStatsData {
  stars: number;
  contributions: number;
  repos: number;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/kaadipranav');
        const data = await response.json();

        setStats({
          stars: 0,
          contributions: 0,
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
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-8">
        <Github className="w-4 h-4 text-[var(--gold)] opacity-50" />
        <span className="label-gold">GITHUB</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="card-premium p-6 hover-lift"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="label-gold">STATS</span>
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono text-xs text-[var(--gold)] opacity-40 hover:opacity-80 transition-opacity"
            >
              VIEW →
            </a>
          </div>
          {loading ? (
            <div className="text-[var(--text-muted)] text-sm font-light">Loading...</div>
          ) : (
            <div>
              <p className="label-gold mb-1.5">PUBLIC REPOS</p>
              <p className="text-4xl font-extralight text-[var(--text-primary)] tracking-tight">
                {stats?.repos || 0}
              </p>
            </div>
          )}
        </motion.div>

        {/* Activity Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="card-premium p-6 hover-lift"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="label-gold">ACTIVITY</span>
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono text-xs text-[var(--gold)] opacity-40 hover:opacity-80 transition-opacity"
            >
              VIEW →
            </a>
          </div>
          <a
            href="https://github.com/kaadipranav"
            target="_blank"
            rel="noopener noreferrer"
            className="block opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=kaadipranav&theme=github-dark&hide_border=true&bg_color=0a0a0a&color=c9a96e&line=c9a96e&point=f0ece4&area=true&area_color=c9a96e"
              alt="GitHub Activity Graph"
              className="w-full h-auto rounded-lg"
            />
          </a>
        </motion.div>
      </div>

      {/* GitHub Stats Images */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mt-6"
      >
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="label-gold">OVERVIEW</span>
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono text-xs text-[var(--gold)] opacity-40 hover:opacity-80 transition-opacity"
            >
              PROFILE →
            </a>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://github-readme-stats.vercel.app/api?username=kaadipranav&show_icons=true&theme=dark&hide_border=true&bg_color=0a0a0a&title_color=c9a96e&text_color=8a8578&icon_color=c9a96e&border_color=1a1a1a"
                alt="GitHub Stats"
                className="w-full h-auto rounded-lg"
              />
            </a>
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=kaadipranav&layout=compact&theme=dark&hide_border=true&bg_color=0a0a0a&title_color=c9a96e&text_color=8a8578&border_color=1a1a1a"
                alt="Top Languages"
                className="w-full h-auto rounded-lg"
              />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Streak Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-6"
      >
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="label-gold">STREAK</span>
            <a
              href="https://github.com/kaadipranav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono text-xs text-[var(--gold)] opacity-40 hover:opacity-80 transition-opacity"
            >
              CALENDAR →
            </a>
          </div>
          <a
            href="https://github.com/kaadipranav"
            target="_blank"
            rel="noopener noreferrer"
            className="block opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-streak-stats.demolab.com/?user=kaadipranav&theme=dark&hide_border=true&background=0a0a0a&ring=c9a96e&fire=c9a96e&currStreakLabel=c9a96e&sideLabels=8a8578&dates=504b42"
              alt="GitHub Streak Stats"
              className="w-full h-auto rounded-lg"
            />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Users, BookOpen } from 'lucide-react';

interface GitHubUserData {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  created_at: string;
  avatar_url: string;
  bio: string | null;
}

interface RepoData {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface ProcessedStats {
  repos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; count: number; percentage: number }[];
  memberSince: string;
}

const GITHUB_USERNAME = 'kaadipranav';

export default function GitHubStats() {
  const [stats, setStats] = useState<ProcessedStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      // Fetch user data and repos in parallel
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
      ]);

      if (!userRes.ok || !reposRes.ok) {
        throw new Error('GitHub API request failed');
      }

      const userData: GitHubUserData = await userRes.json();
      const reposData: RepoData[] = await reposRes.json();

      // Calculate total stars and forks
      const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);

      // Calculate top languages
      const langCounts: Record<string, number> = {};
      reposData.forEach((repo) => {
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
      });

      const totalWithLang = Object.values(langCounts).reduce((a, b) => a + b, 0);
      const topLanguages = Object.entries(langCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({
          name,
          count,
          percentage: Math.round((count / totalWithLang) * 100),
        }));

      const createdYear = new Date(userData.created_at).getFullYear();

      setStats({
        repos: userData.public_repos,
        followers: userData.followers,
        totalStars,
        totalForks,
        topLanguages,
        memberSince: createdYear.toString(),
      });
    } catch (err) {
      console.error('Failed to fetch GitHub stats:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Language color mapping
  const langColors: Record<string, string> = {
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    Python: '#3572A5',
    HTML: '#E34C26',
    CSS: '#563D7C',
    Java: '#B07219',
    Go: '#00ADD8',
    Rust: '#DEA584',
    Shell: '#89E051',
    Dart: '#00B4AB',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Vue: '#41B883',
    Svelte: '#FF3E00',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Kotlin: '#A97BFF',
    Swift: '#FA7343',
  };

  const statItems = stats
    ? [
      { icon: BookOpen, label: 'REPOS', value: stats.repos },
      { icon: Star, label: 'STARS', value: stats.totalStars },
      { icon: GitFork, label: 'FORKS', value: stats.totalForks },
      { icon: Users, label: 'FOLLOWERS', value: stats.followers },
    ]
    : [];

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-8">
        <Github className="w-4 h-4 text-[var(--gold)] opacity-50" />
        <span className="label-gold">GITHUB</span>
      </div>

      {/* Stats Overview — 4 columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] rounded-2xl overflow-hidden mb-6"
      >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[var(--surface)] p-6 flex flex-col items-center justify-center">
              <div className="w-12 h-5 rounded bg-[var(--surface-elevated)] animate-pulse mb-2" />
              <div className="w-8 h-3 rounded bg-[var(--surface-elevated)] animate-pulse" />
            </div>
          ))
          : statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="bg-[var(--surface)] p-6 md:p-8 flex flex-col items-center justify-center group hover:bg-[var(--surface-elevated)] transition-colors duration-500"
              >
                <Icon className="w-3.5 h-3.5 text-[var(--gold)] opacity-30 mb-3" />
                <p className="text-3xl md:text-4xl font-extralight text-[var(--text-primary)] tracking-tight mb-1">
                  {item.value}
                </p>
                <p className="label-gold opacity-50 text-[0.6rem]">{item.label}</p>
              </motion.div>
            );
          })}
      </motion.div>

      {/* Contribution Graph — native GitHub style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="card-premium p-6 hover-lift mb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="label-gold">CONTRIBUTIONS</span>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mono text-xs text-[var(--gold)] opacity-40 hover:opacity-80 transition-opacity"
          >
            PROFILE →
          </a>
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block opacity-80 hover:opacity-100 transition-opacity duration-300"
        >
          {/* GitHub-native contribution calendar via ghchart */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
            alt="GitHub Contribution Graph"
            className="w-full h-auto rounded-lg"
            style={{ filter: 'brightness(0.9)' }}
          />
        </a>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Languages — custom rendered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="card-premium p-6 hover-lift"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="label-gold">TOP LANGUAGES</span>
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full h-4 rounded bg-[var(--surface-elevated)] animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <p className="text-sm text-[var(--text-muted)] font-light">Unable to load.</p>
          ) : (
            <div className="space-y-4">
              {/* Language bar */}
              <div className="flex rounded-full overflow-hidden h-2 bg-[var(--surface-elevated)]">
                {stats?.topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: langColors[lang.name] || 'var(--text-muted)',
                    }}
                    className="transition-all duration-500"
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>
              {/* Language list */}
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {stats?.topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: langColors[lang.name] || 'var(--text-muted)' }}
                    />
                    <span className="text-xs text-[var(--text-secondary)] font-light">{lang.name}</span>
                    <span className="text-xs text-[var(--text-muted)]">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Streak Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="card-premium p-6 hover-lift"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="label-gold">STREAK</span>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono text-xs text-[var(--gold)] opacity-40 hover:opacity-80 transition-opacity"
            >
              CALENDAR →
            </a>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://github-readme-streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=dark&hide_border=true&background=0a0a0a&ring=c9a96e&fire=c9a96e&currStreakLabel=c9a96e&sideLabels=8a8578&dates=504b42&currStreakNum=f0ece4&sideNums=f0ece4`}
              alt="GitHub Streak Stats"
              className="w-full h-auto rounded-lg"
            />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

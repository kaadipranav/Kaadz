"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  name: string;
}

interface Repo {
  stargazers_count: number;
  language: string;
}

export default function GitHubStats() {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repoStats, setRepoStats] = useState({
    totalStars: 0,
    topLanguages: [] as { lang: string; count: number }[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userRes = await fetch("https://api.github.com/users/kaadipranav");
        const user = (await userRes.json()) as GitHubUser;
        setUserData(user);

        // Fetch repos data
        const reposRes = await fetch(
          "https://api.github.com/users/kaadipranav/repos?per_page=100&sort=stars"
        );
        const repos = (await reposRes.json()) as Repo[];

        // Calculate stats
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const languages: Record<string, number> = {};
        repos.forEach((repo) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });

        const topLanguages = Object.entries(languages)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([lang, count]) => ({ lang, count }));

        setRepoStats({ totalStars, topLanguages });
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <section id="github" className="relative w-full py-32 md:py-44">
        <div className="max-w-5xl w-full mx-auto px-8 md:px-12">
          <SectionHeader command="curl api.github.com/users/kaadipranav" title="GitHub" subtitle="Fetching stats..." />
        </div>
      </section>
    );
  }

  if (!userData) {
    return null;
  }

  const stats = [
    { label: "Public Repos", value: userData.public_repos.toString() },
    { label: "Total Stars", value: repoStats.totalStars.toString() },
    { label: "Followers", value: userData.followers.toString() },
    { label: "Following", value: userData.following.toString() },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="github" className="relative w-full py-32 md:py-44">
      <div className="max-w-5xl w-full mx-auto px-8 md:px-12">
        <SectionHeader
          command="curl api.github.com/users/kaadipranav"
          title="GitHub"
          subtitle="Real-time stats from the open source grind."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Stats grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="border border-card-border rounded-xl bg-card/60 backdrop-blur-sm p-5 text-center hover:border-accent/40 transition-colors"
              >
                <div className="text-accent font-bold text-2xl font-mono mb-1">
                  {stat.value}
                </div>
                <div className="text-muted text-xs uppercase tracking-wider font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Top languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-card-border rounded-xl bg-card/60 backdrop-blur-sm p-6"
          >
            <div className="text-sm font-bold uppercase tracking-widest text-foreground mb-5">
              Top Languages
            </div>

            <div className="space-y-4">
              {repoStats.topLanguages.map((item, i) => (
                <motion.div
                  key={item.lang}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground">
                      {item.lang}
                    </span>
                    <span className="text-xs text-muted">
                      {item.count} repo{item.count !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-card-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${((item.count / repoStats.topLanguages[0].count) * 100).toFixed(0)}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          item.lang === "TypeScript"
                            ? "linear-gradient(90deg, #3178c6, #3178c6)"
                            : item.lang === "Python"
                            ? "linear-gradient(90deg, #3776ab, #3776ab)"
                            : item.lang === "JavaScript"
                            ? "linear-gradient(90deg, #f7df1e, #f7df1e)"
                            : item.lang === "CSS"
                            ? "linear-gradient(90deg, #563d7c, #563d7c)"
                            : "linear-gradient(90deg, #00ffa3, #00ffa3)",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

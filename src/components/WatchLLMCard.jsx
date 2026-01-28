import { motion } from 'framer-motion';
import { ExternalLink, Database, Eye, GitBranch, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const WatchLLMCard = () => {
  const [starCount, setStarCount] = useState('—');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch GitHub star count
    // This assumes WatchLLM repo exists at github.com/kaadipranav/watchllm
    // Replace with actual repo URL when known
    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/kaadipranav/watchllm', {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setStarCount(data.stargazers_count || '—');
        } else {
          setStarCount('—');
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
        setStarCount('—');
        
        // Log error to file (in production, this would go to a logging service)
        if (typeof window !== 'undefined') {
          console.log('GitHub API error logged to console (would write to logs/github-stars.log in production)');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStars();
  }, []);

  const handleCTAClick = (ctaName) => {
    if (window.plausible) {
      window.plausible('WatchLLM CTA', { props: { cta: ctaName } });
    }
  };

  const features = [
    { icon: Database, label: 'Caching', color: 'text-blue-400' },
    { icon: GitBranch, label: 'Agent Debug', color: 'text-green-400' },
    { icon: Eye, label: 'Observability', color: 'text-purple-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-16"
    >
      <div className="bg-bg-secondary/50 backdrop-blur-sm border border-watchllm-purple/20 rounded-2xl p-8 shadow-purple-glow">
        {/* Header with badge */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-3xl font-bold text-white">WatchLLM</h2>
              <span className="px-3 py-1 bg-watchllm-purple/20 text-watchllm-purple text-xs font-semibold rounded-full border border-watchllm-purple/30">
                starring
              </span>
            </div>
            
            {/* Star count badge */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{isLoading ? '...' : starCount} stars</span>
            </div>
          </div>
        </div>

        {/* One-line pitch */}
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Observability + prompt normalization + agent debugging — instrumentation that actually saves cash & prevents incidents.
        </p>

        {/* Feature glyphs */}
        <div className="flex gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className={`p-3 rounded-lg bg-bg-primary/50 border border-gray-700/50`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <span className="text-xs text-gray-400">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://watchllm.dev/demo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCTAClick('Show me how')}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-watchllm-purple hover:bg-watchllm-purple-light text-white font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            Show me how
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#trial-form"
            onClick={() => handleCTAClick('Request self-host trial')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-primary hover:bg-bg-primary/80 text-watchllm-purple font-semibold rounded-lg border-2 border-watchllm-purple/30 hover:border-watchllm-purple transition-all"
          >
            Request self-host trial
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default WatchLLMCard;

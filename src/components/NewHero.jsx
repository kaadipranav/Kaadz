import { motion } from 'framer-motion';
import { ExternalLink, Mail } from 'lucide-react';

const NewHero = () => {
  const handleCTAClick = (ctaName) => {
    // Track analytics event (will be implemented in STEP 8)
    if (window.plausible) {
      window.plausible('CTA Click', { props: { cta: ctaName } });
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            <span className="text-watchllm-purple">kaadz</span> — I build tools that stop LLMs from breaking production.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Creator of <span className="text-watchllm-purple font-semibold">WatchLLM</span> — semantic caching, agent debugging, and enterprise self-hosting. 
            If your LLM stack leaks money or faith, I&apos;ll fix the leak.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            {/* Primary CTA */}
            <a
              href="https://watchllm.dev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTAClick('See WatchLLM')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-watchllm-purple hover:bg-watchllm-purple-light text-white font-semibold rounded-lg transition-all shadow-purple-glow hover:shadow-purple-glow-lg transform hover:scale-105"
            >
              See WatchLLM
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#checklist"
              onClick={() => handleCTAClick('LLM Checklist')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-bg-secondary hover:bg-bg-secondary/80 text-watchllm-purple font-semibold rounded-lg border-2 border-watchllm-purple/30 hover:border-watchllm-purple transition-all"
            >
              1-minute LLM Checklist
            </a>
          </div>

          {/* Subtle contact link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-8"
          >
            <a
              href="mailto:kiwi092020@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-watchllm-purple transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Want a private demo or to whiteboard an infra problem? Book 15m.</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewHero;

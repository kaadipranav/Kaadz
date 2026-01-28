import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Copy, ExternalLink, Check } from 'lucide-react';

const DemoSandbox = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const normalizePrompt = (text) => {
    return text
      .trim()
      // Unify quotes
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      // Remove common PII patterns (simplified for demo)
      .replace(/\b[\w.%+-]+@[\w.-]+\.[A-Z|a-z]{2,}\b/gi, '[EMAIL]')
      .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]')
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]')
      // Collapse whitespace
      .replace(/\s+/g, ' ')
      .trim();
  };

  const estimateTokens = (text) => {
    // Simple heuristic: ~4 chars per token
    return Math.ceil(text.length / 4);
  };

  const estimateCost = (tokens) => {
    // Example: $0.0004 per 1k tokens (GPT-3.5 style pricing)
    const costPer1k = 0.0004;
    return ((tokens / 1000) * costPer1k).toFixed(6);
  };

  const handleRun = () => {
    if (!prompt.trim()) return;

    const normalized = normalizePrompt(prompt);
    const originalTokens = estimateTokens(prompt);
    const normalizedTokens = estimateTokens(normalized);
    const tokensSaved = originalTokens - normalizedTokens;
    const costSaved = estimateCost(tokensSaved);

    setResult({
      original: prompt,
      normalized,
      originalTokens,
      normalizedTokens,
      tokensSaved,
      costOriginal: estimateCost(originalTokens),
      costNormalized: estimateCost(normalizedTokens),
      costSaved,
    });

    // Track analytics
    if (window.plausible) {
      window.plausible('Demo Run', { props: { tokens_saved: tokensSaved } });
    }
  };

  const handleCopy = () => {
    if (result?.normalized) {
      navigator.clipboard.writeText(result.normalized);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-16"
      id="demo"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">
          See Prompt Normalization in Action
        </h2>
        <p className="text-gray-400">
          Paste any prompt to see how WatchLLM optimizes it
        </p>
      </div>

      <div className="bg-bg-secondary/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-xl overflow-hidden font-mono">
        {/* Input area */}
        <div className="border-b border-gray-700/50 bg-bg-primary/30 px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">INPUT</span>
          <span className="text-xs text-gray-500">Paste your prompt below</span>
        </div>
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: &quot;Hi, my email is john@example.com and phone is 555-123-4567. Can you help me with    multiple    spaces?&quot;"
          className="w-full h-32 bg-transparent px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none resize-none"
        />

        {/* Run button */}
        <div className="px-4 py-3 bg-bg-primary/30 border-t border-gray-700/50">
          <button
            onClick={handleRun}
            disabled={!prompt.trim()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-watchllm-purple hover:bg-watchllm-purple-light disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-semibold rounded transition-all disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            Run Normalization
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
        >
          {/* Normalized prompt */}
          <div className="bg-bg-secondary/50 backdrop-blur-sm border-2 border-watchllm-purple/30 rounded-xl overflow-hidden font-mono">
            <div className="border-b border-watchllm-purple/30 bg-bg-primary/30 px-4 py-2 flex items-center justify-between">
              <span className="text-xs text-watchllm-purple">NORMALIZED PROMPT</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-watchllm-purple transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            
            <div className="px-4 py-3 text-sm text-gray-200">
              {result.normalized}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-bg-secondary/50 border border-gray-700/50 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Original Tokens</div>
              <div className="text-xl font-bold text-white">{result.originalTokens}</div>
            </div>
            
            <div className="bg-bg-secondary/50 border border-gray-700/50 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Normalized Tokens</div>
              <div className="text-xl font-bold text-green-400">{result.normalizedTokens}</div>
            </div>
            
            <div className="bg-bg-secondary/50 border border-gray-700/50 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Tokens Saved</div>
              <div className="text-xl font-bold text-watchllm-purple">{result.tokensSaved}</div>
            </div>
            
            <div className="bg-bg-secondary/50 border border-gray-700/50 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Cost Estimate</div>
              <div className="text-xl font-bold text-yellow-400">${result.costNormalized}</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <a
              href="https://watchllm.dev/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-watchllm-purple hover:text-watchllm-purple-light font-medium transition-colors"
              onClick={() => {
                if (window.plausible) {
                  window.plausible('CTA Click', { props: { cta: 'Full debug & instrumentation' } });
                }
              }}
            >
              Full debug & instrumentation → watchllm.dev/demo
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DemoSandbox;

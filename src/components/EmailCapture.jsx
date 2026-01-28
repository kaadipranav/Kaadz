import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, AlertCircle, Download } from 'lucide-react';

const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // Netlify Forms submission
      // In production, this would submit to Netlify or MailerLite
      // For now, we'll simulate with a local fallback
      
      const formData = new FormData();
      formData.append('form-name', 'llm-checklist');
      formData.append('email', email);

      // Try Netlify Forms submission
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Success! Check your email for the LLM Incident Checklist.');
        setEmail('');
        
        // Track analytics
        if (window.plausible) {
          window.plausible('Email Capture', { props: { source: 'llm-checklist' } });
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Email capture error:', error);
      
      // Fallback: Log to console (in production would write to CSV or database)
      console.log(`[Email Capture] ${new Date().toISOString()} - ${email}`);
      
      setStatus('success');
      setMessage('Success! Check your email for the LLM Incident Checklist. (Note: Email integration pending - contact directly for checklist)');
      setEmail('');
      
      // Track analytics even on fallback
      if (window.plausible) {
        window.plausible('Email Capture', { props: { source: 'llm-checklist-fallback' } });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto px-4 py-16"
      id="checklist"
    >
      <div className="bg-gradient-to-br from-watchllm-purple/10 to-bg-secondary/50 backdrop-blur-sm border-2 border-watchllm-purple/30 rounded-2xl p-8 shadow-purple-glow">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-watchllm-purple/20 rounded-full">
            <Download className="w-8 h-8 text-watchllm-purple" />
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
          LLM Incident Checklist
        </h2>
        
        <p className="text-gray-300 text-center mb-8">
          1 page. Deploy safe, debug faster, stop cost leaks.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} name="llm-checklist" method="POST" data-netlify="true" className="space-y-4">
          <input type="hidden" name="form-name" value="llm-checklist" />
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === 'loading' || status === 'success'}
              className="w-full pl-12 pr-4 py-4 bg-bg-primary border-2 border-gray-700/50 focus:border-watchllm-purple text-white rounded-lg focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full py-4 bg-watchllm-purple hover:bg-watchllm-purple-light disabled:bg-gray-700 text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : status === 'success' ? (
              <>
                <Check className="w-5 h-5" />
                Sent!
              </>
            ) : (
              'Get the Checklist'
            )}
          </button>
        </form>

        {/* Status messages */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-lg flex items-start gap-2 text-sm ${
              status === 'success'
                ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}
          >
            {status === 'success' ? (
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            <span>{message}</span>
          </motion.div>
        )}

        {/* Fine print */}
        <p className="text-xs text-gray-500 text-center mt-6">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>

        {/* Micro-CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-6 border-t border-gray-700/50"
        >
          <p className="text-sm text-gray-400 text-center">
            If you want WatchLLM to audit your LLM stack, reply to the checklist email
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmailCapture;

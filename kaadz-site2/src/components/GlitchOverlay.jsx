import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlitchOverlay = () => {
  const [glitch, setGlitch] = useState(null);
  
  useEffect(() => {
    const triggerGlitch = () => {
      // Random chance to glitch (15% every 3 seconds)
      if (Math.random() > 0.85) {
        const glitchType = Math.floor(Math.random() * 4);
        setGlitch(glitchType);
        
        // Clear after short duration
        setTimeout(() => setGlitch(null), 100 + Math.random() * 150);
      }
    };
    
    const interval = setInterval(triggerGlitch, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <AnimatePresence>
      {glitch !== null && (
        <>
          {/* Horizontal scan line */}
          {glitch === 0 && (
            <motion.div
              initial={{ top: '-5%', opacity: 1 }}
              animate={{ top: '105%', opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed left-0 right-0 h-1 bg-matrix-green/30 pointer-events-none z-[60]"
            />
          )}
          
          {/* Color shift */}
          {glitch === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.05 }}
              className="fixed inset-0 pointer-events-none z-[60]"
              style={{
                background: 'linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 50%, rgba(0,255,255,0.1) 100%)',
                mixBlendMode: 'screen'
              }}
            />
          )}
          
          {/* Static noise */}
          {glitch === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-[60]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          )}
          
          {/* Horizontal displacement bars */}
          {glitch === 3 && (
            <>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, 10, -10, 5, 0] }}
                transition={{ duration: 0.1 }}
                className="fixed left-0 right-0 h-8 bg-matrix-green/10 pointer-events-none z-[60]"
                style={{ top: `${Math.random() * 80 + 10}%` }}
              />
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, -15, 15, -8, 0] }}
                transition={{ duration: 0.1 }}
                className="fixed left-0 right-0 h-4 bg-cyan-500/10 pointer-events-none z-[60]"
                style={{ top: `${Math.random() * 80 + 10}%` }}
              />
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default GlitchOverlay;

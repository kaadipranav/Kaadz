import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const bootSequence = [
    { text: '> INITIALIZING SYSTEM...', delay: 0 },
    { text: '> Loading neural network...', delay: 300 },
    { text: '> Establishing secure connection...', delay: 600 },
    { text: '> Decrypting user profile...', delay: 900 },
    { text: '> Compiling TypeScript demons...', delay: 1200 },
    { text: '> Injecting caffeine dependencies...', delay: 1500 },
    { text: '> Spawning AI co-founders...', delay: 1800 },
    { text: '> SYSTEM READY', delay: 2100 },
    { text: '> Welcome, visitor.', delay: 2400 },
  ];

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Boot sequence text
    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setCurrentLine(index + 1);
      }, line.delay);
    });

    // Complete loading
    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-cyber-black flex flex-col items-center justify-center"
        >
          {/* Scan lines overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsla(var(--hue), 100%, 50%, 0.03) 2px, hsla(var(--hue), 100%, 50%, 0.03) 4px)',
            }}
          />

          {/* Glowing border frame */}
          <div className="absolute inset-4 border border-matrix-green/20 rounded-lg" />
          <div className="absolute inset-8 border border-matrix-green/10 rounded-lg" />

          {/* Terminal window */}
          <motion.div 
            className="w-full max-w-lg px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-matrix-green/30">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-matrix-green/80" />
              <span className="ml-4 text-matrix-green/60 text-xs font-mono">kaadz@system ~ /init</span>
            </div>

            {/* Boot sequence lines */}
            <div className="font-mono text-sm space-y-1 min-h-[240px]">
              {bootSequence.slice(0, currentLine).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    line.text.includes('SYSTEM READY') || line.text.includes('Welcome')
                      ? 'text-matrix-green font-bold'
                      : 'text-matrix-green/70'
                  }`}
                >
                  {line.text}
                  {index === currentLine - 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="ml-1"
                    >
                      █
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-mono text-matrix-green/60 mb-2">
                <span>LOADING</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-matrix-green/10 rounded-full overflow-hidden border border-matrix-green/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-matrix-green/50 to-matrix-green"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  style={{
                    boxShadow: '0 0 10px hsla(var(--hue), 100%, 50%, 0.5)',
                  }}
                />
              </div>
            </div>

            {/* ASCII art logo */}
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 50 ? 0.3 : 0 }}
              className="text-matrix-green text-[8px] sm:text-[10px] mt-8 text-center leading-tight font-mono"
            >
{`
 ██╗  ██╗ █████╗  █████╗ ██████╗ ███████╗
 ██║ ██╔╝██╔══██╗██╔══██╗██╔══██╗╚══███╔╝
 █████╔╝ ███████║███████║██║  ██║  ███╔╝ 
 ██╔═██╗ ██╔══██║██╔══██║██║  ██║ ███╔╝  
 ██║  ██╗██║  ██║██║  ██║██████╔╝███████╗
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝
`}
            </motion.pre>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-matrix-green/50" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-matrix-green/50" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-matrix-green/50" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-matrix-green/50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

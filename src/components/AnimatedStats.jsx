import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Rocket, Code2, Coffee, GitCommit } from 'lucide-react';

const CountingNumber = ({ value, duration = 1.5 }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
    return unsubscribe;
  }, [springValue]);

  return <span ref={ref}>0</span>;
};

const GlitchyStat = ({ icon: Icon, value, label, suffix = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isGlitching, setIsGlitching] = useState(false);

  // Random glitch effect
  useEffect(() => {
    if (!isInView) return;
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100 + Math.random() * 150);
      }
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(glitchInterval);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3 group"
    >
      {/* Icon */}
      <motion.div
        animate={isGlitching ? { 
          x: [0, -2, 3, -1, 0],
          opacity: [1, 0.5, 1, 0.7, 1]
        } : {}}
        transition={{ duration: 0.15 }}
        className="text-matrix-green/60 group-hover:text-matrix-green transition-colors"
      >
        <Icon size={16} />
      </motion.div>

      {/* Value with glitch */}
      <div className="relative">
        <motion.span
          animate={isGlitching ? {
            x: [0, -1, 2, -1, 0],
            textShadow: [
              '0 0 0 transparent',
              '2px 0 #ff0000, -2px 0 #00ffff',
              '-1px 0 #ff0000, 1px 0 #00ffff',
              '0 0 0 transparent',
            ]
          } : {
            textShadow: '0 0 10px hsla(var(--hue), 100%, 50%, 0.3)'
          }}
          transition={{ duration: 0.15 }}
          className="text-xl sm:text-2xl font-bold font-mono text-matrix-green"
        >
          {isInView ? <CountingNumber value={value} /> : '0'}
          <span className="text-matrix-green/80">{suffix}</span>
        </motion.span>
        
        {/* Glitch duplicate layers */}
        {isGlitching && (
          <>
            <span className="absolute inset-0 text-xl sm:text-2xl font-bold font-mono text-red-500/50 -translate-x-[2px]">
              {value}{suffix}
            </span>
            <span className="absolute inset-0 text-xl sm:text-2xl font-bold font-mono text-cyan-500/50 translate-x-[2px]">
              {value}{suffix}
            </span>
          </>
        )}
      </div>

      {/* Label */}
      <span className="text-white/40 text-xs uppercase tracking-wider group-hover:text-white/60 transition-colors">
        {label}
      </span>
    </motion.div>
  );
};

const AnimatedStats = ({ delay = 0 }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [scanLinePos, setScanLinePos] = useState(0);

  // Scan line animation
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setScanLinePos(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [isInView]);

  const stats = [
    { icon: Rocket, value: 8, suffix: '+', label: 'apps shipped' },
    { icon: Coffee, value: 1000, suffix: '+', label: 'cups of coffee' },
    { icon: GitCommit, value: 2500, suffix: '+', label: 'commits' },
    { icon: Code2, value: 50, suffix: 'K', label: 'lines of code' },
  ];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay }}
      className="w-full max-w-xl mx-auto px-4 py-8"
    >
      {/* Terminal-style container */}
      <div className="relative border border-matrix-green/20 rounded-lg bg-cyber-black/40 backdrop-blur-sm overflow-hidden">
        {/* Scan line effect */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-matrix-green/20 pointer-events-none"
          style={{ top: `${scanLinePos}%` }}
        />
        
        {/* Header bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-matrix-green/20 bg-matrix-green/5">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-matrix-green/60" />
          </div>
          <span className="text-[10px] font-mono text-matrix-green/50 uppercase tracking-widest ml-2">
            ~/stats --live
          </span>
          <motion.span 
            className="ml-auto text-[10px] font-mono text-matrix-green/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ● LIVE
          </motion.span>
        </div>

        {/* Stats content */}
        <div className="p-4 space-y-3">
          {stats.map((stat, index) => (
            <GlitchyStat
              key={stat.label}
              {...stat}
              delay={delay + 0.1 + index * 0.1}
            />
          ))}
        </div>

        {/* Footer with blinking cursor */}
        <div className="px-4 py-2 border-t border-matrix-green/10">
          <div className="flex items-center gap-2 text-[10px] font-mono text-matrix-green/30">
            <span>$</span>
            <span>building_in_public</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              █
            </motion.span>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-matrix-green/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-matrix-green/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-matrix-green/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-matrix-green/40" />
      </div>
    </motion.div>
  );
};

export default AnimatedStats;

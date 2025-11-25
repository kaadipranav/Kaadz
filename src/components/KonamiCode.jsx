import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

const MatrixRain = () => {
  const columns = Math.floor(window.innerWidth / 20);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 font-mono text-matrix-green text-sm"
          style={{ left: i * 20 }}
          initial={{ y: -100 }}
          animate={{ y: window.innerHeight + 100 }}
          transition={{ 
            duration: Math.random() * 2 + 1.5,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div 
              key={j} 
              className="opacity-80"
              style={{ 
                opacity: 1 - j * 0.05,
                textShadow: '0 0 10px rgba(0,255,65,0.8)'
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const AchievementPopup = ({ onClose }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    exit={{ scale: 0, rotate: 180 }}
    transition={{ type: "spring", damping: 15 }}
    className="fixed inset-0 flex items-center justify-center z-[100] bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      className="relative p-8 rounded-xl border-2 border-matrix-green bg-cyber-black/95 text-center"
      animate={{ 
        boxShadow: [
          '0 0 20px rgba(0,255,65,0.3)',
          '0 0 60px rgba(0,255,65,0.6)',
          '0 0 20px rgba(0,255,65,0.3)'
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* Glitch corners */}
      <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400" />
      <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-red-400" />
      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-red-400" />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400" />
      
      <motion.div 
        className="text-6xl mb-4"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        🎮
      </motion.div>
      
      <h2 className="text-2xl font-bold text-matrix-green mb-2 animate-glitch">
        KONAMI CODE ACTIVATED
      </h2>
      
      <p className="text-matrix-green/70 font-mono text-sm mb-4">
        ↑↑↓↓←→←→BA
      </p>
      
      <div className="text-cyan-400 font-mono">
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          +30 HACKER CRED
        </motion.span>
      </div>
      
      <p className="text-matrix-green/40 text-xs mt-4">
        Click anywhere to continue
      </p>
    </motion.div>
  </motion.div>
);

const KonamiCode = () => {
  const [keySequence, setKeySequence] = useState([]);
  const [isActivated, setIsActivated] = useState(false);
  const [showRain, setShowRain] = useState(false);
  
  const checkKonami = useCallback((sequence) => {
    if (sequence.length < KONAMI_CODE.length) return false;
    const recent = sequence.slice(-KONAMI_CODE.length);
    return recent.every((key, i) => key === KONAMI_CODE[i]);
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      const newSequence = [...keySequence.slice(-9), e.code];
      setKeySequence(newSequence);
      
      if (checkKonami(newSequence)) {
        setIsActivated(true);
        setShowRain(true);
        
        // Stop the rain after 5 seconds
        setTimeout(() => setShowRain(false), 5000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence, checkKonami]);
  
  return (
    <>
      {showRain && <MatrixRain />}
      <AnimatePresence>
        {isActivated && (
          <AchievementPopup onClose={() => setIsActivated(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default KonamiCode;

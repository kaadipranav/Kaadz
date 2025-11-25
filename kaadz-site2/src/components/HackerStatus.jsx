import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const statusMessages = [
  { text: 'Online', icon: '●' },
  { text: 'Building', icon: '⚡' },
  { text: 'Shipping', icon: '🚀' },
  { text: 'Creating', icon: '✨' },
  { text: 'Coding', icon: '💻' },
  { text: 'Designing', icon: '🎨' },
];

const HackerStatus = () => {
  const [currentStatus, setCurrentStatus] = useState(statusMessages[0]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update status every 5 seconds
    const statusInterval = setInterval(() => {
      setCurrentStatus(statusMessages[Math.floor(Math.random() * statusMessages.length)]);
    }, 5000);

    // Update time every second
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: 'numeric', 
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center 
                 px-4 sm:px-6 py-3 bg-cyber-black/90 backdrop-blur-md border-b border-white/5"
    >
      {/* Left side - Status */}
      <div className="flex items-center gap-2 sm:gap-3">
        <motion.span 
          className="w-2 h-2 rounded-full bg-matrix-green"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={currentStatus.text}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="text-white/60 text-xs sm:text-sm font-medium flex items-center gap-2"
          >
            <span>{currentStatus.icon}</span>
            <span className="hidden sm:inline">{currentStatus.text}</span>
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Center - Brand */}
      <div className="text-white/80 text-xs sm:text-sm font-semibold tracking-wide font-display">
        kaadz<span className="text-matrix-green">.me</span>
      </div>

      {/* Right side - Time */}
      <div className="text-white/40 text-xs sm:text-sm tabular-nums">
        {formatTime(time)}
      </div>
    </motion.div>
  );
};

export default HackerStatus;

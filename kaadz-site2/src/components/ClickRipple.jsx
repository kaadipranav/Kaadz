import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClickRipple = () => {
  const [ripples, setRipples] = useState([]);
  let rippleId = 0;

  useEffect(() => {
    const handleClick = (e) => {
      const id = rippleId++;
      const x = e.clientX;
      const y = e.clientY;
      
      setRipples(prev => [...prev, { id, x, y }]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999]">
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute w-20 h-20 rounded-full border-2 border-matrix-green"
            style={{
              left: ripple.x - 40,
              top: ripple.y - 40,
              boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickRipple;

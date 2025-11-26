import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClickRipple = () => {
  const [effects, setEffects] = useState([]);
  let effectId = 0;

  useEffect(() => {
    const handleClick = (e) => {
      const id = effectId++;
      const x = e.clientX;
      const y = e.clientY;

      // Generate random sparks (4-8 particles)
      const sparkCount = Math.floor(Math.random() * 5) + 4;
      const sparks = Array.from({ length: sparkCount }, (_, i) => ({
        id: `${id}-spark-${i}`,
        angle: (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5,
        distance: 30 + Math.random() * 40,
        size: 2 + Math.random() * 3
      }));

      setEffects(prev => [...prev, {
        id,
        x,
        y,
        sparks,
        glitchOffset: Math.random() > 0.5 ? 1 : -1
      }]);

      // Cleanup after animation completes
      setTimeout(() => {
        setEffects(prev => prev.filter(e => e.id !== id));
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999]">
      <AnimatePresence>
        {effects.map(effect => (
          <div key={effect.id}>
            {/* Main Ripple Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute w-20 h-20 rounded-full border-2 border-matrix-green"
              style={{
                left: effect.x - 40,
                top: effect.y - 40,
                boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)'
              }}
            />

            {/* Secondary Pulse Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
              className="absolute w-16 h-16 rounded-full border border-matrix-green/50"
              style={{
                left: effect.x - 32,
                top: effect.y - 32,
              }}
            />

            {/* Glitch Effect - Horizontal bars */}
            <motion.div
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{
                scaleX: [0, 1.5, 0],
                opacity: [1, 0.8, 0],
                x: [0, effect.glitchOffset * 3, 0]
              }}
              transition={{ duration: 0.3, times: [0, 0.5, 1] }}
              className="absolute h-1 bg-matrix-green"
              style={{
                left: effect.x - 30,
                top: effect.y - 2,
                width: 60,
                boxShadow: '0 0 10px rgba(0, 255, 65, 0.8)'
              }}
            />
            <motion.div
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{
                scaleX: [0, 1.2, 0],
                opacity: [1, 0.6, 0],
                x: [0, -effect.glitchOffset * 2, 0]
              }}
              transition={{ duration: 0.25, times: [0, 0.6, 1], delay: 0.05 }}
              className="absolute h-0.5 bg-cyan-400"
              style={{
                left: effect.x - 20,
                top: effect.y + 3,
                width: 40,
                boxShadow: '0 0 8px rgba(0, 255, 255, 0.6)'
              }}
            />

            {/* Buffer/Loading Animation */}
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0, 1, 0],
                rotate: [0, 180]
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute w-8 h-8 border-2 border-t-matrix-green border-r-matrix-green border-b-transparent border-l-transparent rounded-full"
              style={{
                left: effect.x - 16,
                top: effect.y - 16,
              }}
            />

            {/* Spark Particles */}
            {effect.sparks.map((spark) => {
              const endX = Math.cos(spark.angle) * spark.distance;
              const endY = Math.sin(spark.angle) * spark.distance;

              return (
                <motion.div
                  key={spark.id}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1
                  }}
                  animate={{
                    x: endX,
                    y: endY,
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{
                    duration: 0.4 + Math.random() * 0.2,
                    ease: 'easeOut'
                  }}
                  className="absolute rounded-full bg-matrix-green"
                  style={{
                    left: effect.x,
                    top: effect.y,
                    width: spark.size,
                    height: spark.size,
                    boxShadow: `0 0 ${spark.size * 2}px rgba(0, 255, 65, 0.8)`
                  }}
                />
              );
            })}

            {/* Digital "Pixel" Burst */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`pixel-${effect.id}-${i}`}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [1, 0.8, 0],
                  x: (Math.random() - 0.5) * 40,
                  y: (Math.random() - 0.5) * 40,
                }}
                transition={{
                  duration: 0.3 + Math.random() * 0.2,
                  delay: Math.random() * 0.1
                }}
                className="absolute w-1 h-1 bg-matrix-green"
                style={{
                  left: effect.x,
                  top: effect.y,
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickRipple;

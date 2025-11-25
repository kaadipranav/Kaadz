import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTrail = () => {
  const [particles, setParticles] = useState([]);
  const [isDesktop, setIsDesktop] = useState(true);
  
  useEffect(() => {
    // Only show on desktop
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);
  
  useEffect(() => {
    if (!isDesktop) return;
    
    let particleId = 0;
    
    const handleMouseMove = (e) => {
      // More aggressive throttle for better performance (only 20% of moves create particles)
      if (Math.random() > 0.2) return;
      
      const newParticle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        char: String.fromCharCode(0x30A0 + Math.random() * 96), // Random katakana
        velocity: {
          x: (Math.random() - 0.5) * 30,
          y: Math.random() * -40 - 10
        }
      };
      
      // Keep max 12 particles for performance
      setParticles(prev => [...prev.slice(-12), newParticle]);
      
      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 1000);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop]);
  
  if (!isDesktop) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.span
            key={particle.id}
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              opacity: 1, 
              scale: 1 
            }}
            animate={{ 
              x: particle.x + particle.velocity.x,
              y: particle.y + particle.velocity.y,
              opacity: 0,
              scale: 0.5
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute text-matrix-green font-mono text-lg pointer-events-none"
            style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.8)' }}
          >
            {particle.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Pipeline stages: prompt -> cache -> model -> alert
    const stages = [
      { x: 0.15, label: 'prompt', color: '#7c5cff' },
      { x: 0.35, label: 'cache', color: '#5a9eff' },
      { x: 0.65, label: 'model', color: '#ff6b9d' },
      { x: 0.85, label: 'alert', color: '#ffd93d' },
    ];

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: 12 }, (_, i) => ({
        progress: (i / 12) * 100,
        opacity: Math.random() * 0.3 + 0.1,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.15 + 0.05,
      }));
    };
    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerY = canvas.height / 2;
      const pathY = centerY;

      // Draw faint connection lines between stages
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = '#7c5cff';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 10]);
      ctx.beginPath();
      ctx.moveTo(stages[0].x * canvas.width, pathY);
      for (let i = 1; i < stages.length; i++) {
        ctx.lineTo(stages[i].x * canvas.width, pathY);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw stage nodes (very subtle)
      stages.forEach(stage => {
        ctx.globalAlpha = 0.06;
        ctx.fillStyle = stage.color;
        ctx.beginPath();
        ctx.arc(stage.x * canvas.width, pathY, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Animate particles along the pipeline
      particlesRef.current.forEach(particle => {
        particle.progress += particle.speed;
        if (particle.progress > 100) {
          particle.progress = 0;
          particle.opacity = Math.random() * 0.3 + 0.1;
        }

        const x = (particle.progress / 100) * (stages[stages.length - 1].x - stages[0].x) + stages[0].x;
        const posX = x * canvas.width;

        // Determine color based on position
        let color = stages[0].color;
        for (let i = 0; i < stages.length - 1; i++) {
          if (x >= stages[i].x && x < stages[i + 1].x) {
            color = stages[i].color;
            break;
          }
        }

        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(posX, pathY + (Math.sin(particle.progress * 0.1) * 15), particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isEnabled]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-0 ${isEnabled ? 'opacity-100' : 'opacity-0'}`}
        style={{ filter: 'blur(1px)' }}
      />
      
      {/* Toggle button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setIsEnabled(!isEnabled)}
        className="fixed top-4 right-4 z-50 px-3 py-1.5 text-xs bg-bg-secondary/80 backdrop-blur-sm text-gray-400 rounded border border-gray-700/50 hover:border-watchllm-purple/50 hover:text-watchllm-purple transition-colors"
        title="Toggle background animation"
      >
        {isEnabled ? '◉ Animation On' : '○ Animation Off'}
      </motion.button>
    </>
  );
};

export default BackgroundCanvas;

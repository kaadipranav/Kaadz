import { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const lastMoveTimeout = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      isMoving.current = true;
      
      // Create particles on move
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 1,
          life: 1,
          decay: Math.random() * 0.02 + 0.01,
          color: getComputedStyle(document.documentElement).getPropertyValue('--hue').trim() || '120'
        });
      }

      clearTimeout(lastMoveTimeout.current);
      lastMoveTimeout.current = setTimeout(() => {
        isMoving.current = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get current global hue
      const currentHue = getComputedStyle(document.documentElement).getPropertyValue('--hue').trim() || '120';

      particles.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.size *= 0.95;

        if (p.life <= 0 || p.size < 0.1) {
          particles.current.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          // Use the particle's creation hue or current hue? Let's use current for full RGB sync
          ctx.fillStyle = `hsla(${currentHue}, 100%, 50%, ${p.life})`;
          ctx.fill();
          
          // Glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsla(${currentHue}, 100%, 50%, 0.5)`;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 bg-transparent"
    />
  );
};

export default CursorTrail;

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Random code snippets that appear
const codeSnippets = [
  'const ship = () => {}',
  'npm run build',
  'git push origin main',
  'await deploy()',
  'export default App',
  'console.log("🚀")',
  'function hack() {}',
  'import { magic }',
  'return <Success />',
  'while(true) build()',
  '// TODO: sleep',
  'async function win()',
  'const coffee = ☕',
  'if(stuck) google()',
  'try { ship() }',
  'let dreams = true',
  '0x00FF41',
  'chmod +x life.sh',
  'sudo rm -rf bugs/*',
  'pip install success',
];

// Random thoughts/phrases
const randomThoughts = [
  'SHIPPING CODE...',
  'BREWING IDEAS...',
  'DEBUGGING LIFE...',
  'STACK OVERFLOW...',
  'CAFFEINATED...',
  'IN THE ZONE...',
  'MIDNIGHT OIL...',
  'REFACTORING...',
  'DEPLOYING...',
  'HACKING...',
];

// Floating code snippet component
const FloatingCode = ({ snippet, startPosition }) => {
  const duration = 15 + Math.random() * 10;
  
  return (
    <motion.div
      initial={{ 
        x: startPosition.x, 
        y: '110vh',
        opacity: 0,
        rotate: Math.random() * 20 - 10
      }}
      animate={{ 
        y: '-10vh',
        opacity: [0, 0.6, 0.6, 0],
        rotate: Math.random() * 20 - 10
      }}
      transition={{ 
        duration,
        ease: 'linear',
      }}
      className="fixed font-mono text-xs sm:text-sm text-matrix-green/40 whitespace-nowrap pointer-events-none select-none"
      style={{ 
        textShadow: '0 0 10px rgba(0, 255, 65, 0.3)',
        left: startPosition.x,
        zIndex: 1
      }}
    >
      {snippet}
    </motion.div>
  );
};

// Glitch text that randomly appears
const GlitchText = ({ text, position }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 1, 0.5],
      x: [0, -5, 5, -3, 3, 0],
    }}
    transition={{ duration: 1.5 }}
    className="fixed font-mono text-lg sm:text-xl font-bold text-matrix-green pointer-events-none select-none"
    style={{ 
      left: position.x, 
      top: position.y,
      textShadow: '2px 2px 0 #ff0000, -2px -2px 0 #00ffff',
      zIndex: 2
    }}
  >
    {text}
  </motion.div>
);

// Orbiting particle
const OrbitingParticle = ({ index, total }) => {
  const angle = (index / total) * Math.PI * 2;
  const radius = 45; // percentage of viewport
  const duration = 30 + index * 5;
  
  return (
    <motion.div
      className="fixed w-2 h-2 rounded-full bg-matrix-green pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        boxShadow: '0 0 20px rgba(0, 255, 65, 0.8), 0 0 40px rgba(0, 255, 65, 0.4)',
        zIndex: 1
      }}
      animate={{
        x: [
          Math.cos(angle) * radius + 'vw',
          Math.cos(angle + Math.PI * 2) * radius + 'vw'
        ],
        y: [
          Math.sin(angle) * radius + 'vh',
          Math.sin(angle + Math.PI * 2) * radius + 'vh'
        ],
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.8, 0.3]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

// Binary rain column
const BinaryColumn = ({ x }) => {
  const chars = Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0');
  
  return (
    <motion.div
      className="fixed font-mono text-[10px] text-matrix-green/20 leading-tight pointer-events-none"
      style={{ left: x, top: 0, zIndex: 0 }}
      initial={{ y: -200 }}
      animate={{ y: '100vh' }}
      transition={{ 
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        ease: 'linear',
        delay: Math.random() * 5
      }}
    >
      {chars.map((char, i) => (
        <div key={i} style={{ opacity: 1 - (i * 0.05) }}>{char}</div>
      ))}
    </motion.div>
  );
};

// Hexagon grid cell
const HexCell = ({ x, y, delay }) => (
  <motion.div
    className="absolute w-8 h-8 border border-matrix-green/10 pointer-events-none"
    style={{ 
      left: x, 
      top: y,
      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
    }}
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 0.3, 0],
      scale: [0.8, 1, 0.8]
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 5
    }}
  />
);

const WildBackground = () => {
  const [floatingCodes, setFloatingCodes] = useState([]);
  const [glitchTexts, setGlitchTexts] = useState([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const idRef = useRef(0);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Spawn floating code snippets
  useEffect(() => {
    if (!isDesktop) return;
    
    const spawnCode = () => {
      const id = idRef.current++;
      const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const x = Math.random() * 80 + 10 + '%';
      
      setFloatingCodes(prev => [...prev, { id, snippet, x }]);
      
      // Remove after animation
      setTimeout(() => {
        setFloatingCodes(prev => prev.filter(c => c.id !== id));
      }, 25000);
    };

    // Initial spawn - reduced from 3 to 2
    for (let i = 0; i < 2; i++) {
      setTimeout(spawnCode, i * 3000);
    }

    // Slower spawn rate for better performance
    const interval = setInterval(spawnCode, 6000);
    return () => clearInterval(interval);
  }, [isDesktop]);

  // Spawn random glitch text
  useEffect(() => {
    if (!isDesktop) return;
    
    const spawnGlitch = () => {
      if (Math.random() > 0.7) return; // 30% chance
      
      const id = idRef.current++;
      const text = randomThoughts[Math.floor(Math.random() * randomThoughts.length)];
      const x = Math.random() * 60 + 20 + '%';
      const y = Math.random() * 60 + 20 + '%';
      
      setGlitchTexts(prev => [...prev, { id, text, x, y }]);
      
      setTimeout(() => {
        setGlitchTexts(prev => prev.filter(g => g.id !== id));
      }, 2000);
    };

    const interval = setInterval(spawnGlitch, 7000);
    return () => clearInterval(interval);
  }, [isDesktop]);

  // Generate hex grid positions - reduced from 15 to 8
  const hexCells = [];
  if (isDesktop) {
    for (let i = 0; i < 8; i++) {
      hexCells.push({
        x: Math.random() * 100 + '%',
        y: Math.random() * 100 + '%',
        delay: Math.random() * 5
      });
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1, willChange: 'transform' }}>
      {/* Binary rain columns - reduced from 8 to 5 */}
      {isDesktop && Array.from({ length: 5 }).map((_, i) => (
        <BinaryColumn key={`binary-${i}`} x={`${(i + 1) * 18}%`} />
      ))}
      
      {/* Orbiting particles - reduced from 5 to 3 */}
      {isDesktop && Array.from({ length: 3 }).map((_, i) => (
        <OrbitingParticle key={`orbit-${i}`} index={i} total={3} />
      ))}
      
      {/* Hex grid */}
      {hexCells.map((cell, i) => (
        <HexCell key={`hex-${i}`} {...cell} />
      ))}
      
      {/* Floating code snippets */}
      <AnimatePresence>
        {floatingCodes.map(code => (
          <FloatingCode 
            key={code.id} 
            snippet={code.snippet} 
            startPosition={{ x: code.x }} 
          />
        ))}
      </AnimatePresence>
      
      {/* Random glitch text */}
      <AnimatePresence>
        {glitchTexts.map(glitch => (
          <GlitchText 
            key={glitch.id} 
            text={glitch.text} 
            position={{ x: glitch.x, y: glitch.y }} 
          />
        ))}
      </AnimatePresence>
      
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-matrix-green/20" />
      <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-matrix-green/20" />
      <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-matrix-green/20" />
      <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-matrix-green/20" />
      
      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-matrix-green/50 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Pulsing center glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,65,0.1) 0%, transparent 70%)',
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default WildBackground;

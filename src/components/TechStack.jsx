import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Glitchy bullet point component
const GlitchBullet = () => {
  const [char, setChar] = useState('▸');
  const chars = ['▸', '▹', '►', '▻', '◆', '◇', '●', '○', '■', '□'];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setChar(chars[Math.floor(Math.random() * chars.length)]);
        setTimeout(() => setChar('▸'), 100);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="text-matrix-green font-mono text-sm"
      style={{ textShadow: '0 0 8px hsla(var(--hue), 100%, 50%, 0.8)' }}
    >
      {char}
    </span>
  );
};

const TechBadge = ({ name, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative px-4 py-2 border border-matrix-green/30 rounded-lg
                 bg-cyber-black/50 backdrop-blur-sm transition-all duration-300
                 hover:border-matrix-green/60 hover:bg-matrix-green/5"
      style={{
        boxShadow: isHovered
          ? '0 0 20px hsla(var(--hue), 100%, 50%, 0.2), inset 0 0 20px hsla(var(--hue), 100%, 50%, 0.05)'
          : 'none'
      }}
    >
      <div className="flex items-center gap-2">
        <GlitchBullet />
        <span className="text-sm font-medium text-white/90">{name}</span>
      </div>

      {/* Glow pulse on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-matrix-green/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

TechBadge.propTypes = {
  name: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

const TechStack = ({ delay = 0 }) => {
  const techStack = [
    'Next.js',
    'React',
    'Node.js',
    'Express',
    'TypeScript',
    'Python',
    'Tailwind',
    'Three.js',
    'Supabase',
    'Firebase',
    'Prisma',
    'Stripe',
    'OpenAI',
    'Vercel',
  ];

  return (
    <section className="py-12 sm:py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{
              color: '#ffffff',
              fontFamily: 'Space Grotesk, sans-serif',
              textShadow: '0 0 30px hsla(var(--hue), 100%, 50%, 0.3)'
            }}
          >
            <span className="text-matrix-green">&lt;</span>
            Tech Stack
            <span className="text-matrix-green">/&gt;</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          >
            You bring the idea. I bring the execution.
          </motion.p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {techStack.map((tech, index) => (
            <TechBadge
              key={tech}
              name={tech}
              delay={delay + 0.3 + (index * 0.05)}
            />
          ))}
        </div>

        {/* Decorative line */}
        <motion.div
          className="w-32 h-px bg-gradient-to-r from-transparent via-matrix-green/30 to-transparent mx-auto mt-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.8 }}
        />
      </div>
    </section>
  );
};

TechStack.propTypes = {
  delay: PropTypes.number,
};

export default TechStack;

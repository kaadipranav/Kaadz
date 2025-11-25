import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Zap, Code2, Sparkles } from 'lucide-react';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

const HolographicCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.2 + 0.5, duration: 0.8, type: "spring" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative perspective-1000"
    >
      {/* Holographic background effect */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-matrix-green/20 via-cyan-500/10 to-purple-500/20 
                       blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Main card */}
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block p-6 rounded-xl border border-matrix-green/30 
                   bg-cyber-black/80 backdrop-blur-sm overflow-hidden
                   hover:border-matrix-green transition-all duration-500 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
             style={{
               backgroundImage: `linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }} />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-matrix-green/50 to-transparent 
                          animate-scan-vertical" />
        </div>
        
        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-matrix-green/50 group-hover:border-matrix-green transition-colors" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-matrix-green/50 group-hover:border-matrix-green transition-colors" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-matrix-green/50 group-hover:border-matrix-green transition-colors" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-matrix-green/50 group-hover:border-matrix-green transition-colors" />
        
        {/* Content */}
        <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
          {/* Header with icon */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-2 rounded-lg bg-matrix-green/10 border border-matrix-green/30"
                animate={isHovered ? { 
                  boxShadow: ['0 0 10px rgba(0,255,65,0.3)', '0 0 20px rgba(0,255,65,0.6)', '0 0 10px rgba(0,255,65,0.3)']
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {project.icon === 'code' && <Code2 className="text-matrix-green" size={24} />}
                {project.icon === 'zap' && <Zap className="text-matrix-green" size={24} />}
                {project.icon === 'sparkles' && <Sparkles className="text-matrix-green" size={24} />}
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-matrix-green group-hover:text-shadow-glow transition-all">
                  {project.title}
                </h3>
                <span className="text-xs text-matrix-green/50 uppercase tracking-wider">
                  {project.type}
                </span>
              </div>
            </div>
            <motion.div
              animate={isHovered ? { x: 5, opacity: 1 } : { x: 0, opacity: 0.5 }}
              className="text-matrix-green"
            >
              <ExternalLink size={18} />
            </motion.div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-cyber-gray leading-relaxed mb-4 group-hover:text-matrix-green/80 transition-colors">
            {project.description}
          </p>
          
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 + 0.8 + i * 0.1 }}
                className="px-2 py-1 text-xs font-mono rounded border border-matrix-green/30 
                           text-matrix-green/70 bg-matrix-green/5
                           group-hover:border-matrix-green/50 group-hover:bg-matrix-green/10 transition-all"
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          {/* Status indicator */}
          <div className="mt-4 flex items-center gap-2">
            <motion.div 
              className="w-2 h-2 rounded-full bg-matrix-green"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-matrix-green/60 uppercase tracking-wider">
              {project.status || 'Active'}
            </span>
          </div>
        </div>
        
        {/* Glitch overlay on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0, 0.1, 0] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
            className="absolute inset-0 bg-matrix-green/20 pointer-events-none"
          />
        )}
      </motion.a>
    </motion.div>
  );
};

HolographicCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string,
    icon: PropTypes.oneOf(['code', 'zap', 'sparkles']),
    tech: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const ProjectShowcase = ({ projects, delay = 0 }) => {
  const [glitchTitle, setGlitchTitle] = useState(false);
  
  // Random glitch effect on title
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchTitle(true);
        setTimeout(() => setGlitchTitle(false), 150);
      }
    }, 2000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      {/* Section header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.2 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 mb-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-matrix-green/50" />
          <span className="text-xs text-matrix-green/50 uppercase tracking-[0.3em] font-mono">
            ./projects
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-matrix-green/50" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold text-matrix-green ${glitchTitle ? 'animate-glitch-fast' : ''}`}>
          <span className="relative">
            WHAT I&apos;M BUILDING
            {glitchTitle && (
              <>
                <span className="absolute inset-0 text-red-500 translate-x-0.5 opacity-70">WHAT I&apos;M BUILDING</span>
                <span className="absolute inset-0 text-cyan-500 -translate-x-0.5 opacity-70">WHAT I&apos;M BUILDING</span>
              </>
            )}
          </span>
        </h2>
      </motion.div>
      
      {/* Projects grid */}
      <div className="space-y-4 sm:space-y-6">
        {projects.map((project, index) => (
          <HolographicCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

ProjectShowcase.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string,
    icon: PropTypes.oneOf(['code', 'zap', 'sparkles']),
    tech: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
  })).isRequired,
  delay: PropTypes.number,
};

export default ProjectShowcase;

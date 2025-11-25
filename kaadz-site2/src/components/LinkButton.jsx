import { motion } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Instagram, Github, Linkedin, Sparkles, Zap } from 'lucide-react';

// X/Twitter Icon
const XIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// App Icon for custom apps
const AppIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="4"/>
    <path d="M12 8v8M8 12h8"/>
  </svg>
);

const getIcon = (iconType, size = 20) => {
  switch (iconType) {
    case 'instagram':
      return <Instagram size={size} />;
    case 'x':
      return <XIcon size={size} />;
    case 'github':
      return <Github size={size} />;
    case 'linkedin':
      return <Linkedin size={size} />;
    case 'app':
      return <Sparkles size={size} />;
    default:
      return <Zap size={size} />;
  }
};

const LinkButton = ({ title, url, icon, comingSoon = false, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={comingSoon ? undefined : url}
      target={comingSoon ? undefined : "_blank"}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: comingSoon ? 1 : 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: comingSoon ? 1 : 0.98,
        transition: { duration: 0.1 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative block w-full px-5 sm:px-6 py-3.5 sm:py-4 min-h-[52px]
                 border border-matrix-green/30 rounded-xl
                 text-white font-medium text-center
                 bg-cyber-black/50 backdrop-blur-sm overflow-hidden
                 transition-all duration-300 group
                 touch-manipulation
                 ${comingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:border-matrix-green/60 hover:bg-matrix-green/5'}`}
      style={{
        boxShadow: isHovered && !comingSoon
          ? '0 0 30px rgba(0, 255, 65, 0.15), inset 0 0 30px rgba(0, 255, 65, 0.03)'
          : 'none'
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-matrix-green/0 via-matrix-green/5 to-matrix-green/0"
        initial={{ opacity: 0, x: '-100%' }}
        animate={isHovered && !comingSoon ? { opacity: 1, x: '100%' } : { opacity: 0, x: '-100%' }}
        transition={{ duration: 0.6 }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-3">
        {/* Icon */}
        <motion.span 
          className="text-matrix-green"
          animate={isHovered && !comingSoon ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {getIcon(icon, 20)}
        </motion.span>
        
        {/* Title */}
        <span className="font-semibold tracking-wide text-sm sm:text-base">
          {title}
        </span>
        
        {/* Coming Soon Badge */}
        {comingSoon && (
          <span className="ml-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider 
                         bg-matrix-green/20 text-matrix-green rounded-full border border-matrix-green/30">
            Soon
          </span>
        )}
      </span>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-matrix-green to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={isHovered && !comingSoon ? { width: '80%', opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

LinkButton.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.string,
  comingSoon: PropTypes.bool,
  delay: PropTypes.number,
};

export default LinkButton;

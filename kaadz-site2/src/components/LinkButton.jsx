import { motion } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';

const LinkButton = ({ title, url, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="neon-button relative block w-full px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]
                 border-2 border-matrix-green/40 rounded-full
                 text-white font-medium text-center font-mono
                 bg-transparent overflow-hidden
                 transition-all duration-300 group
                 touch-manipulation active:scale-95"
      style={{
        boxShadow: isHovered 
          ? '0 0 20px rgba(0, 255, 65, 0.6), 0 0 40px rgba(0, 255, 65, 0.4), inset 0 0 20px rgba(0, 255, 65, 0.1)'
          : '0 0 10px rgba(0, 255, 65, 0.2)'
      }}
    >
      {/* Ripple effect on click */}
      <motion.span
        className="absolute inset-0 bg-matrix-green/20"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{
          scale: 2,
          opacity: 0,
          transition: { duration: 0.6 }
        }}
        style={{
          borderRadius: '50%',
          transformOrigin: 'center'
        }}
      />

      {/* Scan-line effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-b from-transparent via-matrix-green/30 to-transparent"
        initial={{ y: '-100%' }}
        animate={isHovered ? {
          y: '100%',
          transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: 'linear'
          }
        } : {
          y: '-100%'
        }}
        style={{
          height: '50%',
          pointerEvents: 'none'
        }}
      />

      {/* Glow orb that follows on hover */}
      {isHovered && (
        <motion.span
          className="absolute w-32 h-32 bg-matrix-green/20 rounded-full blur-xl"
          initial={{ x: '-50%', y: '-50%', opacity: 0 }}
          animate={{ 
            x: '-50%', 
            y: '-50%', 
            opacity: 0.5,
            scale: [1, 1.2, 1]
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          style={{
            left: '50%',
            top: '50%',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Border glow animation on hover */}
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-matrix-green/0"
        animate={isHovered ? {
          borderColor: 'rgba(0, 255, 65, 0.8)',
          scale: [1, 1.05, 1],
          transition: {
            scale: {
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }
        } : {
          borderColor: 'rgba(0, 255, 65, 0)',
          scale: 1
        }}
      />

      {/* Button text */}
      <span className="relative z-10 tracking-wide uppercase text-xs sm:text-sm">
        {title}
      </span>

      {/* Corner accents */}
      <motion.span
        className="absolute top-0 left-4 w-8 h-0.5 bg-matrix-green"
        initial={{ width: 0 }}
        animate={isHovered ? { width: 32 } : { width: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute top-0 left-4 w-0.5 h-8 bg-matrix-green"
        initial={{ height: 0 }}
        animate={isHovered ? { height: 32 } : { height: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <motion.span
        className="absolute bottom-0 right-4 w-8 h-0.5 bg-matrix-green"
        initial={{ width: 0 }}
        animate={isHovered ? { width: 32 } : { width: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute bottom-0 right-4 w-0.5 h-8 bg-matrix-green"
        initial={{ height: 0 }}
        animate={isHovered ? { height: 32 } : { height: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.a>
  );
};

LinkButton.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

export default LinkButton;

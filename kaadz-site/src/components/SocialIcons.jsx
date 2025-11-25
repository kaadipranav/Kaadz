import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import PropTypes from 'prop-types';

const XIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="20" 
    height="20" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SocialIcons = ({ instagramUrl, twitterUrl, delay = 0 }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay,
        staggerChildren: 0.1
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex gap-4 justify-center"
    >
      {instagramUrl && (
        <motion.a
          variants={iconVariants}
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full border-2 border-matrix-green/40 
                     hover:border-matrix-green hover:bg-matrix-green/10
                     transition-all duration-300 hover:shadow-neon-green"
          aria-label="Instagram"
        >
          <Instagram size={24} className="text-matrix-green" />
        </motion.a>
      )}
      
      {twitterUrl && (
        <motion.a
          variants={iconVariants}
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full border-2 border-matrix-green/40 
                     hover:border-matrix-green hover:bg-matrix-green/10
                     transition-all duration-300 hover:shadow-neon-green"
          aria-label="X (Twitter)"
        >
          <div className="text-matrix-green">
            <XIcon />
          </div>
        </motion.a>
      )}
    </motion.div>
  );
};

SocialIcons.propTypes = {
  instagramUrl: PropTypes.string,
  twitterUrl: PropTypes.string,
  delay: PropTypes.number,
};

export default SocialIcons;

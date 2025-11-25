import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const LinkButton = ({ title, url, delay = 0 }) => {
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="neon-button relative block w-full px-8 py-4 
                 border-2 border-matrix-green/40 rounded-full
                 text-white font-medium text-center
                 bg-transparent hover:bg-matrix-green/5
                 transition-all duration-300"
    >
      <span className="relative z-10">{title}</span>
    </motion.a>
  );
};

LinkButton.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

export default LinkButton;

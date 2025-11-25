import { motion } from 'framer-motion';
import { Instagram, Github, Linkedin } from 'lucide-react';
import PropTypes from 'prop-types';

const XIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="100%" 
    height="100%" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SocialIcons = ({ socials, delay = 0 }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay,
        staggerChildren: 0.12
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const iconConfigs = [
    { key: 'instagram', url: socials?.instagram, Icon: Instagram, label: 'Instagram', hoverRotate: 10 },
    { key: 'twitter', url: socials?.twitter, Icon: XIcon, label: 'X', hoverRotate: -10 },
    { key: 'github', url: socials?.github, Icon: Github, label: 'GitHub', hoverRotate: 360 },
    { key: 'linkedin', url: socials?.linkedin, Icon: Linkedin, label: 'LinkedIn', hoverRotate: -10 },
  ].filter(item => item.url);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex gap-3 sm:gap-4 justify-center flex-wrap"
    >
      {iconConfigs.map(({ key, url, Icon, label, hoverRotate }) => (
        <motion.a
          key={key}
          variants={iconVariants}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ 
            scale: 1.2, 
            rotate: hoverRotate,
            boxShadow: '0 0 30px rgba(0, 255, 65, 0.8)'
          }}
          whileTap={{ scale: 0.9 }}
          className="p-2.5 sm:p-3 rounded-full border-2 border-matrix-green/40 
                     hover:border-matrix-green hover:bg-matrix-green/10
                     transition-all duration-300 hover:shadow-neon-green
                     min-w-[44px] min-h-[44px] flex items-center justify-center
                     touch-manipulation active:scale-95 group"
          aria-label={label}
        >
          <div className="text-matrix-green w-5 h-5 sm:w-6 sm:h-6 
                          group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]
                          transition-all duration-300">
            {key === 'twitter' ? <Icon /> : <Icon size={24} />}
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};

SocialIcons.propTypes = {
  socials: PropTypes.shape({
    instagram: PropTypes.string,
    twitter: PropTypes.string,
    github: PropTypes.string,
    linkedin: PropTypes.string,
  }),
  delay: PropTypes.number,
};

export default SocialIcons;

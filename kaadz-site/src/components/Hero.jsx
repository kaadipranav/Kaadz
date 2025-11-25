import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import SocialIcons from './SocialIcons';
import LinkButton from './LinkButton';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const cardRef = useRef(null);
  
  const bio = [
    "solo founder · AuthorStack, BookHunt & 7 more",
    "apps shipped with AI · typescript demon @kaad__zz"
  ];
  const fullBio = bio.join('\n');

  useEffect(() => {
    // Start typing after delay
    const typingDelay = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < fullBio.length) {
          setDisplayedText(fullBio.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }, 1500);

    return () => clearTimeout(typingDelay);
  }, [fullBio]);

  useEffect(() => {
    // Initialize Vanilla Tilt
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 5,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
      });
    }

    return () => {
      if (cardRef.current?.vanillaTilt) {
        cardRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  const links = [
    {
      title: "Instagram",
      url: "https://instagram.com/kaad__zz",
    },
    {
      title: "Personal Website",
      url: "https://kaadz.me",
    },
    {
      title: "X",
      url: "https://twitter.com/kaad__zz",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 scanlines">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass-card rounded-3xl p-8 md:p-12 max-w-md w-full relative overflow-hidden"
      >
        {/* Star/Settings Icon */}
        <motion.div
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute top-6 left-6 w-8 h-8 border-2 border-matrix-green/60 
                     rounded-full flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 bg-matrix-green rounded-full"></div>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.3, 
            duration: 0.8,
            type: "spring",
            stiffness: 100 
          }}
          className="flex justify-center mb-6"
        >
          <div className="avatar-glow">
            <img 
              src="/avatar.png" 
              alt="Kaadz Avatar" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* Name with glitch effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="glitch text-4xl md:text-5xl font-bold text-white text-center mb-4
                     tracking-wider"
        >
          Kaadz
        </motion.h1>

        {/* Bio with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mb-6 min-h-[3.5rem]"
        >
          <p className="text-sm md:text-base text-gray-300 whitespace-pre-line">
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </p>
        </motion.div>

        {/* Social Icons */}
        <div className="mb-8">
          <SocialIcons 
            instagramUrl="https://instagram.com/kaad__zz"
            twitterUrl="https://twitter.com/kaad__zz"
            delay={2.0}
          />
        </div>

        {/* Link Buttons */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <LinkButton
              key={link.title}
              title={link.title}
              url={link.url}
              delay={2.2 + (index * 0.1)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;

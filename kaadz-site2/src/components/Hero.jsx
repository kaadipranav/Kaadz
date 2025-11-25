import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SocialIcons from './SocialIcons';
import LinkButton from './LinkButton';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const bio = [
    "solo founder · AuthorStack, BookHunt & 7 more",
    "apps shipped with AI · typescript demon @kaad__zz"
  ];
  const fullBio = bio.join('\n');

  useEffect(() => {
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
    <div className="relative z-10 min-h-screen flex items-center justify-center p-6 scanlines">
      <div className="max-w-md w-full">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.5, 
            duration: 0.8,
            type: "spring",
            stiffness: 100 
          }}
          className="flex justify-center mb-8"
        >
          <div className="avatar-glow">
            <img 
              src="/avatar.png" 
              alt="Kaadz Avatar" 
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover
                         border-4 border-matrix-green/30"
            />
          </div>
        </motion.div>

        {/* Name with glitch effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="glitch text-5xl md:text-6xl font-bold text-white text-center mb-6
                     tracking-wider"
        >
          KAADZ
        </motion.h1>

        {/* Bio with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-center mb-8 min-h-[4rem]"
        >
          <p className="text-sm md:text-base text-gray-300 whitespace-pre-line leading-relaxed">
            {displayedText}
            {isTyping && <span className="typing-cursor text-matrix-green">|</span>}
          </p>
        </motion.div>

        {/* Social Icons */}
        <div className="mb-10">
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
      </div>
    </div>
  );
};

export default Hero;

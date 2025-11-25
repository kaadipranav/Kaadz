import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import SocialIcons from './SocialIcons';
import LinkButton from './LinkButton';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const glitchControls = useAnimation();
  
  const bio = [
    "solo founder · building in public · shipping fast",
    "AuthorStack · ScriptBoost · 7+ apps deployed",
    "AI-powered dev · TypeScript enjoyer · @kaad__zz"
  ];
  const fullBio = bio.join('\n');

  // Glitch animation sequence for the name
  useEffect(() => {
    const triggerGlitch = async () => {
      await glitchControls.start({
        x: [0, -2, 3, -1, 2, 0],
        y: [0, 2, -3, 1, -2, 0],
        textShadow: [
          '0 0 0 rgba(255,0,0,0)',
          '2px 2px 0 rgba(255,0,0,0.8), -2px -2px 0 rgba(0,255,0,0.8)',
          '-2px 2px 0 rgba(255,0,0,0.8), 2px -2px 0 rgba(0,0,255,0.8)',
          '0 0 0 rgba(255,0,0,0)',
        ],
        transition: {
          duration: 0.5,
          times: [0, 0.2, 0.5, 1],
        }
      });
    };

    // Initial glitch at 1.2s
    const initialGlitch = setTimeout(() => {
      triggerGlitch();
    }, 1200);

    // Random glitches every 10-15 seconds
    const randomGlitch = setInterval(() => {
      const randomDelay = Math.random() * 5000 + 10000; // 10-15 seconds
      setTimeout(() => {
        triggerGlitch();
      }, randomDelay);
    }, 15000);

    return () => {
      clearTimeout(initialGlitch);
      clearInterval(randomGlitch);
    };
  }, [glitchControls]);

  // Typing animation for bio
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
      url: "https://instagram.com/k.aadz",
      icon: "instagram"
    },
    {
      title: "X (Twitter)",
      url: "https://x.com/kaad_zz",
      icon: "x"
    },
    {
      title: "AuthorStack",
      url: "https://authorstack.vercel.app",
      icon: "app"
    },
    {
      title: "ScriptBoost",
      url: "https://scriptboost.vercel.app",
      icon: "app"
    },
    {
      title: "GitHub",
      url: "https://github.com/kaadipranav",
      icon: "github"
    },
    {
      title: "LinkedIn",
      url: "#",
      icon: "linkedin",
      comingSoon: true
    },
  ];

  const socials = {
    instagram: "https://instagram.com/k.aadz",
    twitter: "https://x.com/kaad_zz",
    github: "https://github.com/kaadipranav",
  };

  // Avatar variants with pulse animation
  const avatarVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: 0.5,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Name glitch variants
  const nameVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.8,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 scanlines">
      <div className="max-w-md w-full px-2 sm:px-0">
        {/* Avatar with glow pulse */}
        <motion.div
          variants={avatarVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-8"
        >
          <motion.div 
            className="avatar-glow relative"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/avatar.png" 
              alt="Kaadz Avatar" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover
                         border-2 sm:border-4 border-matrix-green/30 shadow-neon-green"
            />
            {/* Rotating ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-matrix-green/20"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
              }}
            />
          </motion.div>
        </motion.div>

        {/* Name - clean and visible */}
        <motion.h1
          variants={nameVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 sm:mb-6
                     tracking-tight font-display"
          style={{
            color: '#ffffff',
            textShadow: '0 0 30px rgba(0, 255, 65, 0.5), 0 0 60px rgba(0, 255, 65, 0.3)'
          }}
        >
          KAADZ
        </motion.h1>

        {/* Bio with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 min-h-[4.5rem] sm:min-h-[5rem] px-2 sm:px-4"
        >
          <p className="text-sm sm:text-base md:text-lg text-gray-300 whitespace-pre-line leading-relaxed">
            {displayedText}
            {isTyping && (
              <motion.span 
                className="text-matrix-green ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                █
              </motion.span>
            )}
          </p>
        </motion.div>

        {/* Social Icons */}
        <div className="mb-6 sm:mb-10">
          <SocialIcons 
            socials={socials}
            delay={2.0}
          />
        </div>

        {/* Link Buttons */}
        <div className="space-y-3">
          {links.map((link, index) => (
            <LinkButton
              key={link.title}
              title={link.title}
              url={link.url}
              icon={link.icon}
              comingSoon={link.comingSoon}
              delay={2.2 + (index * 0.08)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

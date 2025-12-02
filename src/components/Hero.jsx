import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import SocialIcons from './SocialIcons';
import LinkButton from './LinkButton';
import HackerText from './HackerText';
import TiltCard from './TiltCard';

const Hero = () => {
  const bio = [
    "I ship MVPs in 24–72 hours. Zero delays. Zero bureaucracy.",
    "Landing pages · Dashboards · AI-integrated apps",
    "Next.js · Node.js · AI APIs · Stripe · Supabase"
  ];

  const links = [
    {
      title: "Build Your MVP Fast →",
      url: "https://whop.com/mvpflow",
      icon: "rocket",
      primary: true
    },
    {
      title: "View Services & Pricing",
      url: "#services",
      icon: "app"
    },
    {
      title: "Get a Quote",
      url: "mailto:kiwi092020@gmail.com",
      icon: "mail"
    },
    {
      title: "GitHub",
      url: "https://github.com/kaadipranav",
      icon: "github"
    },
    {
      title: "X (Twitter)",
      url: "https://x.com/kaad_zz",
      icon: "x"
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
      <TiltCard className="max-w-md w-full px-2 sm:px-0">
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
              src="/avatar-white.png"
              alt="Kaadz Avatar"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover
                         border-2 sm:border-4 border-matrix-green/30 shadow-neon-green avatar-rgb"
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
                boxShadow: '0 0 20px hsla(var(--hue), 100%, 50%, 0.3)'
              }}
            />
          </motion.div>
        </motion.div>

        {/* Name - Hacker Scramble */}
        <motion.div
          variants={nameVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-4 sm:mb-6"
        >
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight inline-block"
            style={{
              color: '#ffffff',
              fontFamily: 'Space Grotesk, sans-serif',
              textShadow: '0 0 30px hsla(var(--hue), 100%, 50%, 0.5), 0 0 60px hsla(var(--hue), 100%, 50%, 0.3)'
            }}
          >
            <HackerText text="KAADZ" speed={50} />
          </h1>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 px-2 sm:px-4 flex flex-col items-center justify-center gap-1"
        >
          {bio.map((line, index) => (
            <p key={index} className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
              {line}
            </p>
          ))}
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
      </TiltCard>
    </div>
  );
};

export default Hero;

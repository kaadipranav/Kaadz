import Background3D from './components/Background3D'
import Hero from './components/Hero'
import ProjectShowcase from './components/ProjectShowcase'
import CursorTrail from './components/CursorTrail'
import KonamiCode from './components/KonamiCode'
import GlitchOverlay from './components/GlitchOverlay'
import WildBackground from './components/WildBackground'
import HackerStatus from './components/HackerStatus'
import ClickRipple from './components/ClickRipple'
import { motion } from 'framer-motion'
import './App.css'

function App() {
  const projects = [
    {
      title: "AuthorStack",
      description: "The ultimate platform for indie authors to discover tools, share resources, and build their writing empire. Like Product Hunt, but for writers.",
      url: "https://authorstack.vercel.app",
      type: "SaaS Platform",
      icon: "sparkles",
      tech: ["TypeScript", "Next.js", "AI", "Prisma"],
      status: "Live"
    },
    {
      title: "ScriptBoost",
      description: "AI-powered script generator for content creators. Generate video scripts, hooks, and storylines in seconds. A fun hobby project that actually works!",
      url: "https://scriptboost.vercel.app",
      type: "AI Tool",
      icon: "zap",
      tech: ["React", "OpenAI", "Vercel"],
      status: "Hobby Project"
    },
    {
      title: "More Projects",
      description: "7+ apps shipped and counting. Building in public, breaking things in private. Each failure is just a feature in disguise.",
      url: "https://github.com/kaadz",
      type: "Portfolio",
      icon: "code",
      tech: ["TypeScript", "AI", "Ship Fast"],
      status: "Always Building"
    }
  ];

  return (
    <div className="relative min-h-screen bg-cyber-black overflow-x-hidden">
      {/* Top status bar */}
      <HackerStatus />
      
      {/* Easter eggs and effects */}
      <CursorTrail />
      <KonamiCode />
      <GlitchOverlay />
      <ClickRipple />
      
      {/* Backgrounds */}
      <Background3D />
      <WildBackground />
      
      {/* Main content */}
      <div className="relative z-10 pt-12">
        <Hero />
        
        {/* Project Showcase Section */}
        <div className="py-12 sm:py-20">
          <ProjectShowcase projects={projects} delay={3.5} />
        </div>
        
        {/* Footer */}
        <footer className="py-10 sm:py-16 text-center relative">
          {/* Decorative line */}
          <motion.div 
            className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/30 text-sm mb-4">
              Made with{' '}
              <motion.span 
                className="text-red-400 inline-block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ♥
              </motion.span>
              {' '}by{' '}
              <span className="text-white/60 font-semibold">Kaadz</span>
            </p>
            
            <p className="text-white/20 text-xs">
              © {new Date().getFullYear()} · All rights reserved
            </p>
            
            <motion.p 
              className="text-white/10 text-[10px] mt-4"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ↑↑↓↓←→←→BA
            </motion.p>
          </motion.div>
        </footer>
      </div>
    </div>
  )
}

export default App

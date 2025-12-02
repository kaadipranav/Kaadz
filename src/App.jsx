import { useState } from 'react'
import Hero from './components/Hero'
import ProjectShowcase from './components/ProjectShowcase'
import KonamiCode from './components/KonamiCode'
import HackerStatus from './components/HackerStatus'
import ScanlineEffect from './components/ScanlineEffect'
import LoadingScreen from './components/LoadingScreen'
import InteractiveTerminal from './components/InteractiveTerminal'
import AnimatedStats from './components/AnimatedStats'
import TechStack from './components/TechStack'
import Services from './components/Services'
import SpeedGuarantee from './components/SpeedGuarantee'
import Process from './components/Process'
import AvailabilityBadge from './components/AvailabilityBadge'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const projects = [
    {
      title: "Demo Project A — AI Notepad",
      description: "Intelligent note-taking app with AI-powered summarization and tagging. Turns messy notes into structured knowledge. No more lost ideas.",
      url: "#",
      type: "AI Tool",
      icon: "sparkles",
      tech: ["Next.js", "OpenAI", "Supabase", "Tailwind"],
      status: "Demo"
    },
    {
      title: "Demo Project B — Micro-CRM",
      description: "Lightweight CRM for freelancers and small teams. Track clients and deals without enterprise bloat. Simple, fast, effective.",
      url: "#",
      type: "SaaS",
      icon: "zap",
      tech: ["React", "Node.js", "Firebase", "Stripe"],
      status: "Demo"
    },
    {
      title: "Demo Project C — Dashboard Analytics",
      description: "Real-time analytics dashboard with custom metrics. See your data clearly. Make decisions faster.",
      url: "#",
      type: "Dashboard",
      icon: "code",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      status: "Demo"
    }
  ];

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen bg-cyber-black overflow-x-hidden"
          >
            {/* Top status bar */}
            <HackerStatus />

            {/* Easter eggs and effects */}
            <KonamiCode />
            <ScanlineEffect />

            {/* Interactive Terminal */}
            <InteractiveTerminal />

            {/* Availability Badge */}
            <AvailabilityBadge />

            {/* Simple gradient background - much faster */}
            <div className="fixed inset-0 bg-gradient-to-b from-cyber-black via-[#0a0a0a] to-cyber-black" />

            {/* Main content */}
            <div className="relative z-10 pt-12">
              <Hero />

              {/* Animated Stats Section */}
              <AnimatedStats delay={1.5} />

              {/* Services Section */}
              <Services delay={2.0} />

              {/* Speed Guarantee */}
              <SpeedGuarantee delay={2.5} />

              {/* Tech Stack Section */}
              <TechStack delay={3.0} />

              {/* Process Section */}
              <Process delay={3.5} />

              {/* Project Showcase Section */}
              <div className="py-12 sm:py-20">
                <ProjectShowcase projects={projects} delay={4.0} />
              </div>

              {/* Footer / CTA Section */}
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
                  {/* Main CTA Headline */}
                  <h2
                    className="text-4xl sm:text-5xl font-bold mb-4 text-white font-mono"
                    style={{
                      textShadow: '0 0 30px hsla(var(--hue), 100%, 50%, 0.4)'
                    }}
                  >
                    Let's build.
                  </h2>

                  <p className="text-gray-400 text-lg mb-8">
                    Got an idea? Need it built fast?
                  </p>

                  {/* Contact Links */}
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10">
                    <motion.a
                      href="mailto:kiwi092020@gmail.com"
                      whileHover={{ scale: 1.05 }}
                      className="text-matrix-green hover:text-white transition-colors font-mono text-sm sm:text-base"
                      style={{ textShadow: '0 0 10px hsla(var(--hue), 100%, 50%, 0.5)' }}
                    >
                      → Email
                    </motion.a>
                    <motion.a
                      href="https://github.com/kaadipranav"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="text-matrix-green hover:text-white transition-colors font-mono text-sm sm:text-base"
                      style={{ textShadow: '0 0 10px hsla(var(--hue), 100%, 50%, 0.5)' }}
                    >
                      → GitHub
                    </motion.a>
                    <motion.a
                      href="https://x.com/kaad_zz"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="text-matrix-green hover:text-white transition-colors font-mono text-sm sm:text-base"
                      style={{ textShadow: '0 0 10px hsla(var(--hue), 100%, 50%, 0.5)' }}
                    >
                      → X (Twitter)
                    </motion.a>
                    {/* Add Discord/Telegram when ready */}
                  </div>

                  <p className="text-white/20 text-xs mb-4">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App

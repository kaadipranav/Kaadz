import Background3D from './components/Background3D'
import Hero from './components/Hero'
import ProjectShowcase from './components/ProjectShowcase'
import CursorTrail from './components/CursorTrail'
import KonamiCode from './components/KonamiCode'
import GlitchOverlay from './components/GlitchOverlay'
import './App.css'

function App() {
  const projects = [
    {
      title: "AuthorStack",
      description: "The ultimate platform for indie authors to discover tools, share resources, and build their writing empire. Like Product Hunt, but for writers.",
      url: "https://authorstack.com",
      type: "SaaS Platform",
      icon: "sparkles",
      tech: ["TypeScript", "Next.js", "AI", "Prisma"],
      status: "Active"
    },
    {
      title: "BookHunt",
      description: "Discover your next favorite read through AI-powered recommendations. Swipe right on books that match your vibe.",
      url: "https://bookhunt.app",
      type: "Mobile App",
      icon: "zap",
      tech: ["React Native", "OpenAI", "Firebase"],
      status: "Active"
    },
    {
      title: "More Projects",
      description: "7 more apps shipped and counting. Building in public, breaking things in private. Each failure is just a feature in disguise.",
      url: "https://github.com/kaadz",
      type: "Portfolio",
      icon: "code",
      tech: ["TypeScript", "AI", "Ship Fast"],
      status: "Always Building"
    }
  ];

  return (
    <div className="relative min-h-screen bg-cyber-black overflow-x-hidden">
      {/* Easter eggs and effects */}
      <CursorTrail />
      <KonamiCode />
      <GlitchOverlay />
      
      {/* Background */}
      <Background3D />
      
      {/* Main content */}
      <div className="relative z-10">
        <Hero />
        
        {/* Project Showcase Section */}
        <div className="py-12 sm:py-20">
          <ProjectShowcase projects={projects} delay={3.5} />
        </div>
        
        {/* Footer */}
        <footer className="py-8 text-center">
          <p className="text-matrix-green/40 text-xs font-mono">
            <span className="text-matrix-green/60">&#60;/&#62;</span> with{' '}
            <span className="text-red-500 animate-pulse">♥</span> by kaadz
          </p>
          <p className="text-matrix-green/20 text-[10px] font-mono mt-2">
            try the konami code ↑↑↓↓←→←→BA
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App

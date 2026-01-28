import { useState } from 'react'
import NewHero from './components/NewHero'
import BackgroundCanvas from './components/BackgroundCanvas'
import WatchLLMCard from './components/WatchLLMCard'
import DemoSandbox from './components/DemoSandbox'
import EmailCapture from './components/EmailCapture'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

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
            className="relative min-h-screen bg-bg-primary overflow-x-hidden"
          >
            {/* Animated Background Canvas */}
            <BackgroundCanvas />

            {/* Main gradient background */}
            <div className="fixed inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />

            {/* Main content */}
            <div className="relative z-10">
              {/* Hero Section */}
              <NewHero />

              {/* WatchLLM Feature Card */}
              <WatchLLMCard />

              {/* Interactive Demo Sandbox */}
              <DemoSandbox />

              {/* Email Capture / Lead Magnet */}
              <EmailCapture />

              {/* Footer */}
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App

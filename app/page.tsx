'use client';

import Hero from '@/components/Hero';
import TheLab from '@/components/TheLab';
import Systems from '@/components/Systems';
import CurrentlyBuilding from '@/components/CurrentlyBuilding';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import AnimatedBackground from '@/components/AnimatedBackground';
import FloatingNav from '@/components/FloatingNav';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <FloatingNav />
      <div className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <TheLab />
        <Systems />
        <CurrentlyBuilding />
        <Contact />
        <About />
      </div>
    </main>
  );
}

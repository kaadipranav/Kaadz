'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import TheLab from '@/components/TheLab';
import Systems from '@/components/Systems';
import CurrentlyBuilding from '@/components/CurrentlyBuilding';
import About from '@/components/About';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Hero />
        <TheLab />
        <Systems />
        <CurrentlyBuilding />
        <About />
      </div>
    </main>
  );
}


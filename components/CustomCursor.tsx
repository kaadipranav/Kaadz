'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[10000] hidden md:block"
      style={{
        left: position.x - 12,
        top: position.y - 12,
      }}
    >
      <div className="h-6 w-6 rounded-full border-2 border-[#00d4ff] bg-[#00d4ff]/10 backdrop-blur-sm transition-transform duration-150 ease-out" />
    </div>
  );
}

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// Helper to get current RGB hue from CSS
const getRGBColor = () => {
  const style = getComputedStyle(document.documentElement);
  const hue = style.getPropertyValue('--hue') || '120';
  return `hsl(${hue}, 100%, 50%)`;
};

const MatrixRain = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentColor, setCurrentColor] = useState(new THREE.Color('#00ff41'));
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Update color based on CSS variable
  useEffect(() => {
    const updateColor = () => {
      const color = getRGBColor();
      setCurrentColor(new THREE.Color(color));
    };
    
    // Update frequently to match CSS animation
    const interval = setInterval(updateColor, 100);
    return () => clearInterval(interval);
  }, []);
  
  const count = isMobile ? 30 : 70; // Optimized particle count for 60fps
  const meshRef = useRef();
  const materialRef = useRef();
  
  // Matrix characters to display
  const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  // Create texture with characters
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const size = 64;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#00ff41';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const char = characters[Math.floor(Math.random() * characters.length)];
    ctx.fillText(char, size / 2, size / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [characters]);

  // Create particles with random positions and speeds
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 40 - 20;
      const y = Math.random() * 40;
      const z = Math.random() * 20 - 10;
      const speed = Math.random() * 0.08 + 0.03;
      const rotationSpeed = Math.random() * 0.02 - 0.01;
      temp.push({ x, y, z, speed, rotationSpeed });
    }
    return temp;
  }, [count]);

  // Animate falling characters
  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      const rotations = meshRef.current.geometry.attributes.rotation?.array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Move particle down
        positions[i3 + 1] -= particles[i].speed;
        
        // Rotate particles
        if (rotations) {
          rotations[i3 + 2] += particles[i].rotationSpeed;
        }
        
        // Reset to top when reaches bottom
        if (positions[i3 + 1] < -20) {
          positions[i3 + 1] = 20;
          positions[i3] = Math.random() * 40 - 20;
        }
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      if (rotations) {
        meshRef.current.geometry.attributes.rotation.needsUpdate = true;
      }
    }
    
    // Update material opacity for fade effect and color
    if (materialRef.current) {
      materialRef.current.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      materialRef.current.color = currentColor;
    }
  });

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.x;
      positions[i * 3 + 1] = particle.y;
      positions[i * 3 + 2] = particle.z;
    });
    return positions;
  }, [particles]);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.5}
        color={currentColor}
        map={texture}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Camera animation component
const CameraRig = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  useFrame((state) => {
    if (!isMobile) {
      const t = state.clock.elapsedTime;
      // Subtle camera movement (disabled on mobile)
      state.camera.position.x = Math.sin(t * 0.1) * 0.5;
      state.camera.position.y = Math.cos(t * 0.15) * 0.3;
      state.camera.lookAt(0, 0, 0);
    }
  });
  return null;
};

const Background3D = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Show simplified version on mobile
  if (isMobile) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0d1a0d 50%, #0a0a0a 100%)',
        opacity: 0.8
      }} />
    );
  }
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]} // Limit pixel ratio for performance
      >
        <CameraRig />
        <MatrixRain />
      </Canvas>
    </div>
  );
};

export default Background3D;

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const MatrixRain = () => {
  const count = 80;
  const mesh = useRef();
  
  // Create random positions and speeds for falling characters
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 40 - 20;
      const y = Math.random() * 40;
      const z = Math.random() * 40 - 20;
      const speed = Math.random() * 0.05 + 0.02;
      temp.push({ x, y, z, speed });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (mesh.current) {
      const positions = mesh.current.geometry.attributes.position.array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Move particle down
        positions[i3 + 1] -= particles[i].speed;
        
        // Reset to top when reaches bottom
        if (positions[i3 + 1] < -20) {
          positions[i3 + 1] = 20;
        }
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true;
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
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#00ff41"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const Background3D = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <MatrixRain />
      </Canvas>
    </div>
  );
};

export default Background3D;

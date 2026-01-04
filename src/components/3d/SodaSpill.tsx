import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SodaSpillProps {
  scrollProgress: number;
}

export const SodaSpill = ({ scrollProgress }: SodaSpillProps) => {
  const spillRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const intensity = Math.max(0, (scrollProgress - 0.25) / 0.4);
  
  const particleCount = 200;
  
  const { positions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Starting positions around bottle neck
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.1 + Math.random() * 0.15;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 1.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Upward velocities with spread
      velocities[i * 3] = (Math.random() - 0.5) * 0.3;
      velocities[i * 3 + 1] = 0.5 + Math.random() * 1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      
      sizes[i] = 0.02 + Math.random() * 0.05;
    }
    
    return { positions, velocities, sizes };
  }, []);
  
  const positionsRef = useRef(positions.slice());
  
  useFrame((state) => {
    if (!particlesRef.current || intensity <= 0) return;
    
    const geometry = particlesRef.current.geometry;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < particleCount; i++) {
      // Update positions
      const idx = i * 3;
      
      // Physics simulation with gravity
      positionsRef.current[idx] = positions[idx] + velocities[idx] * Math.sin(time + i) * intensity;
      positionsRef.current[idx + 1] = positions[idx + 1] + velocities[idx + 1] * ((time * 0.5 + i * 0.1) % 2) * intensity;
      positionsRef.current[idx + 2] = positions[idx + 2] + velocities[idx + 2] * Math.cos(time + i) * intensity;
      
      posAttr.setXYZ(i, positionsRef.current[idx], positionsRef.current[idx + 1], positionsRef.current[idx + 2]);
    }
    
    posAttr.needsUpdate = true;
  });

  if (intensity <= 0) return null;

  return (
    <group ref={spillRef}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positionsRef.current}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleCount}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ff6b35"
          size={0.08}
          transparent
          opacity={0.8 * intensity}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Foam sphere at top */}
      <mesh position={[0, 1.6 + intensity * 0.5, 0]} scale={intensity * 0.8}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffaa55"
          metalness={0}
          roughness={0.3}
          transmission={0.3}
          thickness={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

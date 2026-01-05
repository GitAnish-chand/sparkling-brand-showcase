import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WaterSpillProps {
  scrollProgress: number;
}

export const WaterSpill = ({ scrollProgress }: WaterSpillProps) => {
  const spillRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const intensity = Math.max(0, (scrollProgress - 0.25) / 0.4);
  
  const particleCount = 300;
  
  const { positions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Starting positions around bottle neck
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.1 + Math.random() * 0.2;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 2.2;
      positions[i * 3 + 2] = Math.sin(angle) * radius + 0.5; // Bias toward camera
      
      // Velocities - mostly coming toward camera (positive Z)
      velocities[i * 3] = (Math.random() - 0.5) * 0.4;
      velocities[i * 3 + 1] = 0.2 + Math.random() * 0.5;
      velocities[i * 3 + 2] = 0.8 + Math.random() * 1.5; // Strong Z velocity toward camera
      
      sizes[i] = 0.03 + Math.random() * 0.06;
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
      const idx = i * 3;
      
      // Physics simulation - water droplets flying toward camera
      const t = ((time * 0.5 + i * 0.05) % 3);
      
      positionsRef.current[idx] = positions[idx] + velocities[idx] * t * intensity;
      positionsRef.current[idx + 1] = positions[idx + 1] + velocities[idx + 1] * t * intensity - 0.3 * t * t; // gravity
      positionsRef.current[idx + 2] = positions[idx + 2] + velocities[idx + 2] * t * intensity;
      
      posAttr.setXYZ(i, positionsRef.current[idx], positionsRef.current[idx + 1], positionsRef.current[idx + 2]);
    }
    
    posAttr.needsUpdate = true;
  });

  if (intensity <= 0) return null;

  return (
    <group ref={spillRef}>
      {/* Water droplet particles */}
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
          color="#87ceeb"
          size={0.1}
          transparent
          opacity={0.7 * intensity}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Large splash droplets in front */}
      {[...Array(15)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.sin(i * 1.2) * 0.6) * intensity,
            1.8 + Math.cos(i * 0.8) * 0.5 * intensity,
            2 + intensity * 2 + i * 0.15
          ]}
          scale={intensity * (0.8 + Math.random() * 0.4)}
        >
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshPhysicalMaterial
            color="#a8e6ff"
            metalness={0}
            roughness={0}
            transmission={0.9}
            thickness={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Water mist effect */}
      <mesh position={[0, 2.0, 1 + intensity * 1.5]} scale={intensity * 1.5}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0.3}
          transmission={0.5}
          thickness={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

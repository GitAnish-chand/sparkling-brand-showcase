import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WaterSpillProps {
  scrollProgress: number;
}

// Individual water droplet that flies toward camera
const WaterDroplet = ({ 
  initialPos, 
  velocity, 
  size, 
  delay,
  intensity 
}: { 
  initialPos: [number, number, number];
  velocity: [number, number, number];
  size: number;
  delay: number;
  intensity: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ref.current || intensity <= 0) return;
    const time = (state.clock.elapsedTime * 0.8 + delay) % 4;
    
    // Parabolic motion toward camera with gravity
    ref.current.position.x = initialPos[0] + velocity[0] * time * intensity;
    ref.current.position.y = initialPos[1] + velocity[1] * time * intensity - 0.5 * time * time;
    ref.current.position.z = initialPos[2] + velocity[2] * time * intensity * 1.5;
    
    // Scale up as it gets closer
    const scale = 1 + (ref.current.position.z - initialPos[2]) * 0.15;
    ref.current.scale.setScalar(Math.max(0, scale * intensity));
  });

  if (intensity <= 0) return null;

  return (
    <mesh ref={ref} position={initialPos}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshPhysicalMaterial
        color="#7dd3fc"
        metalness={0}
        roughness={0}
        transmission={0.95}
        thickness={0.5}
        ior={1.33}
        transparent
        opacity={0.85}
        envMapIntensity={2}
      />
    </mesh>
  );
};

export const WaterSpill = ({ scrollProgress }: WaterSpillProps) => {
  const spillRef = useRef<THREE.Group>(null);
  const streamRef = useRef<THREE.Mesh>(null);
  const splashRef = useRef<THREE.Group>(null);
  
  const intensity = Math.max(0, (scrollProgress - 0.2) / 0.35);
  const splashIntensity = Math.max(0, (scrollProgress - 0.35) / 0.3);
  
  // Generate droplet data
  const droplets = useMemo(() => {
    const drops = [];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spread = 0.3 + Math.random() * 0.4;
      drops.push({
        initialPos: [
          Math.cos(angle) * 0.1,
          2.8 + Math.random() * 0.3,
          Math.sin(angle) * 0.1 + 0.5
        ] as [number, number, number],
        velocity: [
          Math.cos(angle) * spread,
          0.5 + Math.random() * 0.8,
          1.5 + Math.random() * 2
        ] as [number, number, number],
        size: 0.04 + Math.random() * 0.06,
        delay: Math.random() * 3
      });
    }
    return drops;
  }, []);

  // Large splash drops that hit the "screen"
  const splashDrops = useMemo(() => {
    const drops = [];
    for (let i = 0; i < 25; i++) {
      const angle = (i / 25) * Math.PI * 2;
      drops.push({
        angle,
        radius: 0.3 + Math.random() * 0.5,
        size: 0.08 + Math.random() * 0.12,
        zOffset: 4 + Math.random() * 2,
        speed: 0.5 + Math.random() * 0.5
      });
    }
    return drops;
  }, []);

  useFrame((state) => {
    if (streamRef.current && intensity > 0) {
      // Animate the main water stream
      const time = state.clock.elapsedTime;
      streamRef.current.rotation.x = Math.PI / 2 - 0.4 - Math.sin(time * 3) * 0.05;
      streamRef.current.scale.z = 1 + Math.sin(time * 5) * 0.1;
    }
    
    if (splashRef.current && splashIntensity > 0) {
      // Animate splash group
      splashRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  if (intensity <= 0) return null;

  return (
    <group ref={spillRef} position={[0, 0, 0]}>
      {/* Main water stream flowing toward camera */}
      <mesh 
        ref={streamRef}
        position={[0, 2.8, intensity * 2]} 
        rotation={[Math.PI / 2 - 0.4, 0, 0]}
      >
        <cylinderGeometry args={[0.06, 0.12, 3 * intensity, 24, 8, true]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          metalness={0}
          roughness={0}
          transmission={0.85}
          thickness={1}
          ior={1.33}
          transparent
          opacity={0.75 * intensity}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Secondary stream with variation */}
      <mesh 
        position={[0.05, 2.75, intensity * 1.8]} 
        rotation={[Math.PI / 2 - 0.35, 0.1, 0]}
      >
        <cylinderGeometry args={[0.04, 0.08, 2.5 * intensity, 20, 6, true]} />
        <meshPhysicalMaterial
          color="#7dd3fc"
          metalness={0}
          roughness={0}
          transmission={0.9}
          thickness={0.8}
          ior={1.33}
          transparent
          opacity={0.6 * intensity}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Flying water droplets toward camera */}
      {droplets.map((drop, i) => (
        <WaterDroplet
          key={i}
          initialPos={drop.initialPos}
          velocity={drop.velocity}
          size={drop.size}
          delay={drop.delay}
          intensity={intensity}
        />
      ))}
      
      {/* Large splash drops at screen level */}
      <group ref={splashRef} position={[0, 1.5, 5]}>
        {splashDrops.map((drop, i) => (
          <mesh
            key={`splash-${i}`}
            position={[
              Math.cos(drop.angle) * drop.radius * splashIntensity,
              Math.sin(drop.angle) * drop.radius * splashIntensity * 0.8,
              drop.zOffset * splashIntensity * 0.3
            ]}
            scale={splashIntensity}
          >
            <sphereGeometry args={[drop.size, 20, 20]} />
            <meshPhysicalMaterial
              color="#7dd3fc"
              metalness={0}
              roughness={0}
              transmission={0.92}
              thickness={0.4}
              ior={1.33}
              transparent
              opacity={0.8}
              envMapIntensity={2.5}
            />
          </mesh>
        ))}
      </group>

      {/* Water mist/spray effect */}
      <mesh 
        position={[0, 2.2, 2 + intensity * 2]} 
        scale={[intensity * 1.5, intensity * 1.2, intensity * 0.5]}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          metalness={0}
          roughness={0.5}
          transmission={0.7}
          thickness={0.3}
          transparent
          opacity={0.25 * intensity}
        />
      </mesh>
      
      {/* Close splash ring effect - simulates water hitting screen */}
      {splashIntensity > 0 && (
        <group position={[0, 1.5, 6]}>
          {/* Central impact splash */}
          <mesh scale={splashIntensity}>
            <ringGeometry args={[0.2, 0.8, 32]} />
            <meshBasicMaterial
              color="#7dd3fc"
              transparent
              opacity={0.4 * splashIntensity}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* Outer ripple */}
          <mesh scale={splashIntensity * 1.5}>
            <ringGeometry args={[0.8, 1.2, 32]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.2 * splashIntensity}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* Droplets on "screen" */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const dist = 0.4 + (i % 3) * 0.3;
            return (
              <mesh
                key={`screen-drop-${i}`}
                position={[
                  Math.cos(angle) * dist * splashIntensity,
                  Math.sin(angle) * dist * splashIntensity * 0.7,
                  0.1
                ]}
                scale={0.08 + (i % 4) * 0.02}
              >
                <sphereGeometry args={[1, 16, 16]} />
                <meshPhysicalMaterial
                  color="#7dd3fc"
                  metalness={0}
                  roughness={0}
                  transmission={0.95}
                  thickness={0.3}
                  transparent
                  opacity={0.9 * splashIntensity}
                />
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
};
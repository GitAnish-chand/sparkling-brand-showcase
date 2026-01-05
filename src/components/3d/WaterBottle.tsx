import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface WaterBottleProps {
  scrollProgress: number;
}

// Vitamin labels that appear when water spills
const VitaminLabel = ({ 
  position, 
  vitamin, 
  delay, 
  scrollProgress 
}: { 
  position: [number, number, number]; 
  vitamin: string; 
  delay: number;
  scrollProgress: number;
}) => {
  const ref = useRef<THREE.Group>(null);
  const visibility = Math.max(0, (scrollProgress - 0.3 - delay) / 0.15);
  
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(time * 2 + delay * 10) * 0.1;
    ref.current.rotation.y = Math.sin(time * 0.5) * 0.2;
  });

  if (visibility <= 0) return null;

  return (
    <group ref={ref} position={position}>
      {/* Glowing sphere background */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshPhysicalMaterial
          color="#00d4ff"
          transparent
          opacity={0.3 * visibility}
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          roughness={0.1}
        />
      </mesh>
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.8 * visibility}
          emissive="#00d4ff"
          emissiveIntensity={1}
        />
      </mesh>
      {/* Vitamin text */}
      <Text
        position={[0, 0, 0.3]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/bebas-neue.woff"
        outlineWidth={0.01}
        outlineColor="#00d4ff"
      >
        {vitamin}
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={visibility}
        />
      </Text>
    </group>
  );
};

export const WaterBottle = ({ scrollProgress }: WaterBottleProps) => {
  const bottleRef = useRef<THREE.Group>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  // Cap rotation based on scroll (0 to 0.25 progress = full cap twist)
  const capRotation = Math.min(scrollProgress / 0.2, 1) * Math.PI * 6;
  const capLift = Math.min(scrollProgress / 0.2, 1) * 1.5;

  // Water spill effect
  const spillIntensity = Math.max(0, (scrollProgress - 0.25) / 0.4);
  const waterDrop = Math.max(0, (scrollProgress - 0.2) / 0.5) * 0.3;

  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.03 - 0.5;
      bottleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
    }
  });

  // Plastic water bottle shape - taller and more modern
  const bottleShape = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Start at bottom center
    shape.moveTo(0, 0);
    
    // Bottom flat with slight indent
    shape.lineTo(0.32, 0);
    shape.quadraticCurveTo(0.35, 0.03, 0.35, 0.08);
    
    // Bottom ridges for grip
    shape.lineTo(0.36, 0.15);
    shape.lineTo(0.34, 0.18);
    shape.lineTo(0.36, 0.22);
    shape.lineTo(0.34, 0.26);
    shape.lineTo(0.36, 0.3);
    
    // Main body - slight hourglass curve
    shape.quadraticCurveTo(0.38, 0.5, 0.36, 0.8);
    shape.quadraticCurveTo(0.34, 1.0, 0.36, 1.2);
    shape.quadraticCurveTo(0.38, 1.5, 0.38, 1.8);
    shape.quadraticCurveTo(0.40, 2.2, 0.38, 2.5);
    
    // Shoulder curve - smooth transition
    shape.quadraticCurveTo(0.35, 2.7, 0.28, 2.85);
    
    // Neck taper
    shape.quadraticCurveTo(0.22, 3.0, 0.18, 3.15);
    
    // Thread ridges on neck
    shape.lineTo(0.19, 3.2);
    shape.lineTo(0.17, 3.22);
    shape.lineTo(0.19, 3.25);
    shape.lineTo(0.17, 3.28);
    shape.lineTo(0.19, 3.32);
    
    // Lip/rim
    shape.lineTo(0.2, 3.38);
    shape.quadraticCurveTo(0.2, 3.42, 0.18, 3.44);
    shape.lineTo(0, 3.44);
    
    return shape;
  }, []);

  const bottleGeometry = useMemo(() => {
    return new THREE.LatheGeometry(
      bottleShape.getPoints(100).map(p => new THREE.Vector2(p.x, p.y)),
      64
    );
  }, [bottleShape]);

  // Clear plastic material for water bottle
  const plasticMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e8f4f8'),
      metalness: 0.0,
      roughness: 0.1,
      transmission: 0.92,
      thickness: 0.3,
      ior: 1.45,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.5,
      transparent: true,
      opacity: 0.85,
    });
  }, []);

  // Crystal clear water material
  const waterMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#a8e6ff'),
      metalness: 0,
      roughness: 0.0,
      transmission: 0.95,
      thickness: 2,
      ior: 1.33,
      clearcoat: 0.5,
      attenuationColor: new THREE.Color('#87ceeb'),
      attenuationDistance: 2,
    });
  }, []);

  // Blue cap material
  const capMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0088cc'),
      metalness: 0.1,
      roughness: 0.4,
    });
  }, []);

  // Label material - blue and white theme
  const labelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0077be'),
      metalness: 0.05,
      roughness: 0.5,
      transparent: true,
      opacity: 0.95,
    });
  }, []);

  // Vitamins that appear
  const vitamins = [
    { name: 'B12', position: [-1.2, 2.0, 0.5] as [number, number, number], delay: 0 },
    { name: 'Ca', position: [1.3, 1.8, 0.3] as [number, number, number], delay: 0.05 },
    { name: 'Mg', position: [-1.0, 1.2, 0.8] as [number, number, number], delay: 0.1 },
    { name: 'K', position: [1.1, 1.0, 0.6] as [number, number, number], delay: 0.15 },
    { name: 'Zn', position: [-0.8, 0.5, 0.9] as [number, number, number], delay: 0.2 },
    { name: 'Na', position: [0.9, 0.3, 0.7] as [number, number, number], delay: 0.25 },
  ];

  return (
    <group ref={bottleRef} position={[0, -0.5, 0]} scale={0.85}>
      {/* Plastic bottle */}
      <mesh geometry={bottleGeometry} material={plasticMaterial} />
      
      {/* Inner bottle surface for depth */}
      <mesh geometry={bottleGeometry} scale={[0.97, 1, 0.97]}>
        <meshPhysicalMaterial
          color="#d0f0ff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Water inside bottle */}
      <group position={[0, 0.1 - waterDrop * 0.5, 0]}>
        {/* Bottom water */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.32, 0.30, 0.7, 32]} />
          <primitive object={waterMaterial} />
        </mesh>
        
        {/* Middle water - main body */}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.33, 0.32, 0.9, 32]} />
          <primitive object={waterMaterial} />
        </mesh>
        
        {/* Upper water */}
        <mesh position={[0, 1.7, 0]}>
          <cylinderGeometry args={[0.34, 0.33, 0.8, 32]} />
          <primitive object={waterMaterial} />
        </mesh>
        
        {/* Top water - decreases as cap opens */}
        <mesh position={[0, 2.3, 0]} scale={[1, 1 - waterDrop, 1]}>
          <cylinderGeometry args={[0.32, 0.34, 0.6, 32]} />
          <primitive object={waterMaterial} />
        </mesh>
        
        {/* Water surface meniscus */}
        <mesh position={[0, 2.6 - waterDrop * 0.8, 0]}>
          <sphereGeometry args={[0.30, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <primitive object={waterMaterial} />
        </mesh>
      </group>

      {/* Water spill stream - comes toward camera */}
      {spillIntensity > 0 && (
        <group position={[0, 3.3 + capLift * 0.3, 0]}>
          {/* Main water stream - flowing toward viewer */}
          <mesh position={[0, 0, spillIntensity * 2]} rotation={[Math.PI / 2 - 0.3, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.15, 2 * spillIntensity, 16]} />
            <meshPhysicalMaterial
              color="#87ceeb"
              transparent
              opacity={0.7}
              roughness={0}
              transmission={0.8}
              thickness={1}
            />
          </mesh>
          
          {/* Water splash drops */}
          {[...Array(12)].map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.sin(i * 0.8) * 0.3) * spillIntensity,
                -spillIntensity * 0.5,
                spillIntensity * 2.5 + Math.cos(i * 1.2) * 0.4
              ]}
            >
              <sphereGeometry args={[0.05 + Math.random() * 0.04, 16, 16]} />
              <meshPhysicalMaterial
                color="#a8e6ff"
                transparent
                opacity={0.8}
                roughness={0}
                transmission={0.9}
              />
            </mesh>
          ))}
          
          {/* Larger splash drops coming at camera */}
          {[...Array(8)].map((_, i) => (
            <mesh
              key={`splash-${i}`}
              position={[
                (Math.sin(i * 1.5) * 0.5) * spillIntensity,
                Math.cos(i * 2) * 0.3 * spillIntensity,
                spillIntensity * 3 + i * 0.2
              ]}
            >
              <sphereGeometry args={[0.08 + Math.random() * 0.06, 16, 16]} />
              <meshPhysicalMaterial
                color="#87ceeb"
                transparent
                opacity={0.6}
                roughness={0}
                transmission={0.95}
                thickness={0.5}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Vitamin/Mineral labels floating around */}
      {vitamins.map((vitamin) => (
        <VitaminLabel
          key={vitamin.name}
          position={vitamin.position}
          vitamin={vitamin.name}
          delay={vitamin.delay}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* Cap with threads */}
      <group position={[0, 3.44 + capLift, 0]} rotation={[0, capRotation, 0]}>
        {/* Main cap body */}
        <mesh>
          <cylinderGeometry args={[0.22, 0.20, 0.28, 32]} />
          <primitive object={capMaterial} />
        </mesh>
        {/* Cap top - rounded */}
        <mesh position={[0, 0.14, 0]}>
          <sphereGeometry args={[0.20, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <primitive object={capMaterial} />
        </mesh>
        {/* Cap ridges for grip */}
        {[...Array(20)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i / 20) * Math.PI * 2) * 0.215,
              0,
              Math.cos((i / 20) * Math.PI * 2) * 0.215
            ]}
            rotation={[0, (i / 20) * Math.PI * 2, 0]}
          >
            <boxGeometry args={[0.015, 0.24, 0.012]} />
            <primitive object={capMaterial} />
          </mesh>
        ))}
        {/* Safety ring */}
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.19, 0.21, 0.08, 32]} />
          <meshStandardMaterial
            color="#006699"
            roughness={0.5}
          />
        </mesh>
      </group>

      {/* Main label wrap - blue water theme */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.375, 0.375, 1.4, 64]} />
        <primitive object={labelMaterial} />
      </mesh>
      
      {/* Label white stripe - brand name area */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.4, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.5}
        />
      </mesh>
      
      {/* Label mountain graphic stripe */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.378, 0.378, 0.15, 64]} />
        <meshStandardMaterial
          color="#e0f4ff"
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>

      {/* Mineral content strip at bottom of label */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.376, 0.376, 0.2, 64]} />
        <meshStandardMaterial
          color="#00aadd"
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* Bottle highlights/reflections */}
      <mesh position={[0.25, 1.5, 0.25]} rotation={[0, 0.5, 0]}>
        <planeGeometry args={[0.08, 2.0]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh position={[-0.2, 1.3, 0.28]} rotation={[0, -0.3, 0]}>
        <planeGeometry args={[0.05, 1.5]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

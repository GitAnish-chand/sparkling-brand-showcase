import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshTransmissionMaterial } from '@react-three/drei';
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
  const visibility = Math.max(0, (scrollProgress - 0.4 - delay) / 0.15);
  
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(time * 2 + delay * 10) * 0.15;
    ref.current.position.z = position[2] + scrollProgress * 1.5;
    ref.current.rotation.y = Math.sin(time * 0.5) * 0.3;
  });

  if (visibility <= 0) return null;

  return (
    <group ref={ref} position={position}>
      {/* Glowing sphere background */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial
          color="#00d4ff"
          transparent
          opacity={0.4 * visibility}
          emissive="#00d4ff"
          emissiveIntensity={0.8}
          roughness={0.1}
        />
      </mesh>
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.9 * visibility}
          emissive="#00d4ff"
          emissiveIntensity={1.2}
        />
      </mesh>
      {/* Vitamin text */}
      <Text
        position={[0, 0, 0.35]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
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
  const highlightRef1 = useRef<THREE.Mesh>(null);
  const highlightRef2 = useRef<THREE.Mesh>(null);

  // Cap rotation based on scroll (0 to 0.25 progress = full cap twist)
  const capRotation = Math.min(scrollProgress / 0.2, 1) * Math.PI * 8;
  const capLift = Math.min(scrollProgress / 0.2, 1) * 2;

  // Water spill effect - starts earlier and more dramatic
  const spillIntensity = Math.max(0, (scrollProgress - 0.2) / 0.35);
  const waterDrop = Math.max(0, (scrollProgress - 0.15) / 0.4) * 0.5;

  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04 - 0.3;
      bottleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.04;
    }
    
    // Animate highlights for realistic plastic shine
    if (highlightRef1.current) {
      highlightRef1.current.position.x = 0.28 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
    }
    if (highlightRef2.current) {
      highlightRef2.current.position.x = -0.22 + Math.sin(state.clock.elapsedTime * 0.6 + 1) * 0.015;
    }
  });

  // Realistic plastic bottle shape
  const bottleShape = useMemo(() => {
    const shape = new THREE.Shape();
    
    shape.moveTo(0, 0);
    
    // Bottom with indent
    shape.lineTo(0.28, 0);
    shape.quadraticCurveTo(0.32, 0.02, 0.32, 0.06);
    
    // Bottom ridge detail
    shape.lineTo(0.33, 0.12);
    shape.lineTo(0.31, 0.16);
    shape.lineTo(0.33, 0.20);
    shape.lineTo(0.31, 0.24);
    shape.lineTo(0.33, 0.28);
    
    // Main body - ergonomic curves
    shape.quadraticCurveTo(0.36, 0.5, 0.34, 0.9);
    shape.quadraticCurveTo(0.32, 1.1, 0.34, 1.3);
    shape.quadraticCurveTo(0.36, 1.6, 0.35, 2.0);
    shape.quadraticCurveTo(0.37, 2.4, 0.35, 2.6);
    
    // Shoulder curve
    shape.quadraticCurveTo(0.32, 2.8, 0.25, 2.95);
    
    // Neck
    shape.quadraticCurveTo(0.20, 3.1, 0.16, 3.2);
    
    // Thread ridges
    shape.lineTo(0.17, 3.24);
    shape.lineTo(0.15, 3.27);
    shape.lineTo(0.17, 3.30);
    shape.lineTo(0.15, 3.33);
    shape.lineTo(0.17, 3.36);
    
    // Lip
    shape.lineTo(0.18, 3.42);
    shape.quadraticCurveTo(0.18, 3.46, 0.16, 3.48);
    shape.lineTo(0, 3.48);
    
    return shape;
  }, []);

  const bottleGeometry = useMemo(() => {
    return new THREE.LatheGeometry(
      bottleShape.getPoints(120).map(p => new THREE.Vector2(p.x, p.y)),
      80
    );
  }, [bottleShape]);

  // Premium clear plastic material with realistic shine
  const plasticMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f0f8ff'),
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.94,
      thickness: 0.5,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      envMapIntensity: 2.5,
      transparent: true,
      opacity: 0.9,
      reflectivity: 1,
      sheen: 0.5,
      sheenColor: new THREE.Color('#ffffff'),
      specularIntensity: 1.5,
      specularColor: new THREE.Color('#ffffff'),
    });
  }, []);

  // Crystal clear water
  const waterMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#7dd3fc'),
      metalness: 0,
      roughness: 0.0,
      transmission: 0.98,
      thickness: 3,
      ior: 1.33,
      clearcoat: 0.8,
      attenuationColor: new THREE.Color('#38bdf8'),
      attenuationDistance: 1.5,
    });
  }, []);

  // Blue cap material with plastic shine
  const capMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0284c7'),
      metalness: 0.0,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });
  }, []);

  // Label material
  const labelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0369a1'),
      metalness: 0.1,
      roughness: 0.4,
      transparent: true,
      opacity: 0.95,
    });
  }, []);

  // Vitamins that appear
  const vitamins = [
    { name: 'B12', position: [-1.5, 1.8, 1] as [number, number, number], delay: 0 },
    { name: 'Ca', position: [1.6, 1.5, 0.8] as [number, number, number], delay: 0.05 },
    { name: 'Mg', position: [-1.3, 0.8, 1.2] as [number, number, number], delay: 0.1 },
    { name: 'K', position: [1.4, 0.6, 1] as [number, number, number], delay: 0.15 },
    { name: 'Zn', position: [-1.1, 0.0, 1.4] as [number, number, number], delay: 0.2 },
    { name: 'Na', position: [1.2, -0.2, 1.2] as [number, number, number], delay: 0.25 },
  ];

  return (
    <group ref={bottleRef} position={[0, -0.3, 0]} scale={0.9}>
      {/* Main plastic bottle with realistic shine */}
      <mesh geometry={bottleGeometry} material={plasticMaterial} />
      
      {/* Inner surface for depth and refraction */}
      <mesh geometry={bottleGeometry} scale={[0.96, 0.995, 0.96]}>
        <meshPhysicalMaterial
          color="#e0f2fe"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          roughness={0.1}
        />
      </mesh>
      
      {/* Primary specular highlight - bright white streak */}
      <mesh ref={highlightRef1} position={[0.28, 1.6, 0.15]} rotation={[0, 0.2, 0.1]}>
        <planeGeometry args={[0.06, 2.8]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Secondary specular highlight */}
      <mesh ref={highlightRef2} position={[-0.22, 1.4, 0.2]} rotation={[0, -0.3, -0.05]}>
        <planeGeometry args={[0.04, 2.2]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Curved highlight on shoulder */}
      <mesh position={[0.15, 2.7, 0.2]} rotation={[0.3, 0.4, 0.2]}>
        <planeGeometry args={[0.15, 0.08]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Rim highlight */}
      <mesh position={[0, 3.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.13, 0.165, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Water inside bottle */}
      <group position={[0, 0.1 - waterDrop * 0.3, 0]}>
        {/* Bottom water section */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.28, 0.26, 0.6, 40]} />
          <primitive object={waterMaterial} />
        </mesh>
        
        {/* Lower middle water */}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.30, 0.28, 0.7, 40]} />
          <primitive object={waterMaterial} />
        </mesh>
        
        {/* Middle water */}
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.31, 0.30, 0.8, 40]} />
          <primitive object={waterMaterial} />
        </mesh>
        
        {/* Upper middle water */}
        <mesh position={[0, 1.95, 0]}>
          <cylinderGeometry args={[0.32, 0.31, 0.7, 40]} />
          <primitive object={waterMaterial} />
        </mesh>
        
        {/* Top water - decreases as bottle opens */}
        <mesh position={[0, 2.45, 0]} scale={[1, Math.max(0.1, 1 - waterDrop * 1.5), 1]}>
          <cylinderGeometry args={[0.30, 0.32, 0.5, 40]} />
          <primitive object={waterMaterial} />
        </mesh>
        
        {/* Water surface meniscus */}
        <mesh position={[0, 2.7 - waterDrop * 1.2, 0]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.28, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3]} />
          <primitive object={waterMaterial} />
        </mesh>
      </group>

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

      {/* Cap with realistic details */}
      <group position={[0, 3.48 + capLift, 0]} rotation={[0, capRotation, 0]}>
        {/* Main cap body */}
        <mesh>
          <cylinderGeometry args={[0.20, 0.18, 0.30, 40]} />
          <primitive object={capMaterial} />
        </mesh>
        {/* Cap top dome */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.18, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <primitive object={capMaterial} />
        </mesh>
        {/* Cap highlight */}
        <mesh position={[0.08, 0.18, 0.12]} rotation={[0.3, 0.3, 0]}>
          <planeGeometry args={[0.08, 0.06]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Cap ridges for grip */}
        {[...Array(24)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i / 24) * Math.PI * 2) * 0.195,
              0,
              Math.cos((i / 24) * Math.PI * 2) * 0.195
            ]}
            rotation={[0, (i / 24) * Math.PI * 2, 0]}
          >
            <boxGeometry args={[0.012, 0.26, 0.01]} />
            <primitive object={capMaterial} />
          </mesh>
        ))}
        {/* Safety ring */}
        <mesh position={[0, -0.20, 0]}>
          <cylinderGeometry args={[0.17, 0.19, 0.10, 40]} />
          <meshPhysicalMaterial
            color="#0369a1"
            roughness={0.3}
            clearcoat={0.5}
          />
        </mesh>
      </group>

      {/* Main label */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.355, 0.355, 1.2, 64]} />
        <primitive object={labelMaterial} />
      </mesh>
      
      {/* White brand area */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.358, 0.358, 0.35, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.05}
          roughness={0.4}
        />
      </mesh>
      
      {/* Light blue mountain graphic */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.356, 0.356, 0.12, 64]} />
        <meshStandardMaterial
          color="#bae6fd"
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>

      {/* Bottom info strip */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.354, 0.354, 0.18, 64]} />
        <meshStandardMaterial
          color="#0ea5e9"
          metalness={0.15}
          roughness={0.25}
        />
      </mesh>

      {/* Label shine/gloss */}
      <mesh position={[0.25, 1.35, 0.22]} rotation={[0, 0.6, 0]}>
        <planeGeometry args={[0.08, 1.0]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
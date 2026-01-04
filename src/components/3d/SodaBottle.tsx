import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SodaBottleProps {
  scrollProgress: number;
}

export const SodaBottle = ({ scrollProgress }: SodaBottleProps) => {
  const bottleRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Mesh>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  // Cap rotation based on scroll (0 to 0.3 progress = full cap twist)
  const capRotation = Math.min(scrollProgress / 0.25, 1) * Math.PI * 4;
  const capLift = Math.min(scrollProgress / 0.25, 1) * 0.8;

  // Liquid rise based on scroll
  const liquidRise = Math.max(0, (scrollProgress - 0.15) / 0.4) * 0.6;
  const liquidScale = 1 + Math.max(0, (scrollProgress - 0.2) / 0.5) * 0.3;

  useFrame((state) => {
    if (bottleRef.current) {
      // Subtle floating animation
      bottleRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      bottleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  // Bottle body geometry - realistic glass bottle shape
  const bottleShape = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Bottom curve
    shape.moveTo(0, 0);
    shape.lineTo(0.4, 0);
    shape.quadraticCurveTo(0.45, 0, 0.45, 0.1);
    
    // Body
    shape.lineTo(0.45, 1.8);
    
    // Shoulder curve
    shape.quadraticCurveTo(0.45, 2.0, 0.35, 2.2);
    
    // Neck
    shape.lineTo(0.18, 2.5);
    shape.lineTo(0.18, 2.9);
    
    // Cap rim
    shape.quadraticCurveTo(0.18, 2.95, 0.2, 2.95);
    shape.lineTo(0.2, 3.0);
    shape.lineTo(0, 3.0);
    
    return shape;
  }, []);

  const bottleGeometry = useMemo(() => {
    return new THREE.LatheGeometry(
      bottleShape.getPoints(50).map(p => new THREE.Vector2(p.x, p.y)),
      64
    );
  }, [bottleShape]);

  // Glass material
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1a4a3a'),
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 0.5,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.5,
    });
  }, []);

  // Soda liquid material
  const liquidMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e85d04'),
      metalness: 0,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 2,
      ior: 1.33,
      clearcoat: 0.5,
    });
  }, []);

  // Cap material
  const capMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e85d04'),
      metalness: 0.8,
      roughness: 0.2,
    });
  }, []);

  return (
    <group ref={bottleRef} position={[0, -1.5, 0]} scale={1}>
      {/* Glass bottle */}
      <mesh geometry={bottleGeometry} material={glassMaterial} />
      
      {/* Liquid inside */}
      <mesh 
        ref={liquidRef}
        position={[0, 0.1 + liquidRise, 0]} 
        scale={[0.85, 0.58 + liquidScale * 0.1, 0.85]}
      >
        <cylinderGeometry args={[0.4, 0.4, 1.8, 32]} />
        <primitive object={liquidMaterial} />
      </mesh>

      {/* Overflow liquid effect */}
      {scrollProgress > 0.25 && (
        <mesh position={[0, 2.9 + liquidRise * 0.5, 0]} scale={[1, liquidScale, 1]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <primitive object={liquidMaterial} />
        </mesh>
      )}

      {/* Cap */}
      <mesh 
        ref={capRef}
        position={[0, 2.95 + capLift, 0]}
        rotation={[0, capRotation, 0]}
      >
        <cylinderGeometry args={[0.22, 0.2, 0.2, 32]} />
        <primitive object={capMaterial} />
        {/* Cap ridges */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.21, 0.02, 8, 24]} />
          <primitive object={capMaterial} />
        </mesh>
      </mesh>

      {/* Label area - subtle */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 1.2, 32]} />
        <meshStandardMaterial 
          color="#ff6b35"
          metalness={0.1}
          roughness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Brand text on label */}
      <mesh position={[0, 1.0, 0.47]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};

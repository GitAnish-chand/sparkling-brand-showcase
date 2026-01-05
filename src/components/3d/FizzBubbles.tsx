import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FizzBubblesProps {
  scrollProgress: number;
  count?: number;
}

export const FizzBubbles = ({ scrollProgress, count = 50 }: FizzBubblesProps) => {
  const bubblesRef = useRef<THREE.InstancedMesh>(null);
  
  const bubbleData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        Math.random() * 6 - 2,
        (Math.random() - 0.5) * 4
      ),
      speed: Math.random() * 0.4 + 0.2,
      offset: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.08 + 0.03,
    }));
  }, [count]);

  useFrame((state) => {
    if (!bubblesRef.current) return;
    
    const dummy = new THREE.Object3D();
    const time = state.clock.elapsedTime;
    
    bubbleData.forEach((bubble, i) => {
      // Rising motion with gentle wobble
      const y = ((bubble.position.y + time * bubble.speed) % 8) - 2;
      const wobbleX = Math.sin(time * 1.5 + bubble.offset) * 0.15;
      const wobbleZ = Math.cos(time * 1.8 + bubble.offset) * 0.15;
      
      // Increase activity based on scroll progress
      const activityMultiplier = 1 + scrollProgress * 0.5;
      
      dummy.position.set(
        bubble.position.x + wobbleX * activityMultiplier,
        y * activityMultiplier,
        bubble.position.z + wobbleZ * activityMultiplier
      );
      dummy.scale.setScalar(bubble.scale * (1 + scrollProgress * 0.3));
      dummy.updateMatrix();
      bubblesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    bubblesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={bubblesRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial
        color="#a8e6ff"
        transparent
        opacity={0.5}
        roughness={0}
        metalness={0}
        transmission={0.9}
        thickness={0.1}
        envMapIntensity={1}
      />
    </instancedMesh>
  );
};

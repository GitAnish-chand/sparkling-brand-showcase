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
    return Array.from({ length: count }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 1.5,
        Math.random() * 3 - 1,
        (Math.random() - 0.5) * 1.5
      ),
      speed: 0.5 + Math.random() * 1.5,
      size: 0.02 + Math.random() * 0.06,
      offset: Math.random() * Math.PI * 2,
      wobble: 0.5 + Math.random() * 0.5,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!bubblesRef.current) return;
    
    const intensity = Math.max(0, (scrollProgress - 0.15) / 0.5);
    
    bubbleData.forEach((bubble, i) => {
      const time = state.clock.elapsedTime;
      
      // Rise with scroll progress
      const y = bubble.position.y + (time * bubble.speed * intensity) % 4 - 1;
      
      // Wobble side to side
      const wobbleX = Math.sin(time * bubble.wobble + bubble.offset) * 0.1;
      const wobbleZ = Math.cos(time * bubble.wobble * 0.7 + bubble.offset) * 0.1;
      
      dummy.position.set(
        bubble.position.x + wobbleX,
        y,
        bubble.position.z + wobbleZ
      );
      
      // Scale based on intensity and position
      const scale = bubble.size * intensity * (1 + Math.sin(time + bubble.offset) * 0.2);
      dummy.scale.setScalar(scale);
      
      dummy.updateMatrix();
      bubblesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    bubblesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={bubblesRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0}
        roughness={0}
        transmission={0.9}
        thickness={0.1}
        ior={1.33}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
};

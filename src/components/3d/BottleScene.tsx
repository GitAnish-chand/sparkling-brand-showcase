import { Canvas } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import { Suspense } from 'react';
import { SodaBottle } from './SodaBottle';
import { FizzBubbles } from './FizzBubbles';
import { SodaSpill } from './SodaSpill';

interface BottleSceneProps {
  scrollProgress: number;
}

export const BottleScene = ({ scrollProgress }: BottleSceneProps) => {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#00d4ff" />
          <pointLight position={[0, 3, 2]} intensity={1} color="#ff6b35" />
          <spotLight
            position={[0, 5, 0]}
            angle={0.5}
            penumbra={1}
            intensity={1.5}
            color="#ffffff"
          />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Main bottle with float effect */}
          <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            <SodaBottle scrollProgress={scrollProgress} />
            <FizzBubbles scrollProgress={scrollProgress} count={60} />
            <SodaSpill scrollProgress={scrollProgress} />
          </Float>
          
          {/* Background sparkles */}
          <Sparkles
            count={100}
            scale={10}
            size={2}
            speed={0.5}
            opacity={0.3}
            color="#00d4ff"
          />
          
          {/* Additional ambient bubbles in scene */}
          <Sparkles
            count={50}
            scale={8}
            size={3}
            speed={0.3}
            opacity={0.2}
            color="#ff6b35"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

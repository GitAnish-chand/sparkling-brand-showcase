import { Canvas } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import { Suspense } from 'react';
import { WaterBottle } from './WaterBottle';
import { FizzBubbles } from './FizzBubbles';
import { WaterSpill } from './WaterSpill';

interface BottleSceneProps {
  scrollProgress: number;
}

export const BottleScene = ({ scrollProgress }: BottleSceneProps) => {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1, 7], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting - cool water tones */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#00d4ff" />
          <pointLight position={[0, 3, 2]} intensity={0.8} color="#87ceeb" />
          <spotLight
            position={[0, 6, 3]}
            angle={0.4}
            penumbra={1}
            intensity={1.5}
            color="#ffffff"
          />
          <pointLight position={[2, 1, 4]} intensity={0.5} color="#00aaff" />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Main bottle with subtle float effect */}
          <Float
            speed={1.2}
            rotationIntensity={0.15}
            floatIntensity={0.2}
          >
            <WaterBottle scrollProgress={scrollProgress} />
            <FizzBubbles scrollProgress={scrollProgress} count={50} />
            <WaterSpill scrollProgress={scrollProgress} />
          </Float>
          
          {/* Background water-like sparkles */}
          <Sparkles
            count={80}
            scale={12}
            size={2}
            speed={0.4}
            opacity={0.4}
            color="#00d4ff"
          />
          
          {/* Additional ambient bubbles */}
          <Sparkles
            count={40}
            scale={10}
            size={2.5}
            speed={0.3}
            opacity={0.25}
            color="#87ceeb"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

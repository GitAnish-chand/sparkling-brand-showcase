import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface BubbleParticlesProps {
  scrollProgress: number;
}

interface Bubble {
  id: number;
  size: number;
  left: string;
  delay: number;
  duration: number;
  opacity: number;
}

export const BubbleParticles = ({ scrollProgress }: BubbleParticlesProps) => {
  const bubbles = useMemo<Bubble[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: 4 + Math.random() * 20,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      opacity: 0.1 + Math.random() * 0.4,
    }));
  }, []);

  const intensity = Math.min(1, scrollProgress * 2);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            bottom: '-5%',
            background: `radial-gradient(circle at 30% 30%, 
              hsl(var(--bubble-white) / ${bubble.opacity * intensity}), 
              hsl(var(--neon-cyan) / ${bubble.opacity * 0.5 * intensity}))`,
            boxShadow: `0 0 ${bubble.size}px hsl(var(--neon-cyan) / ${bubble.opacity * 0.3 * intensity})`,
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, Math.sin(bubble.delay) * 50, 0],
            scale: [1, 1.2, 0.8],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

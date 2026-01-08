import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BubbleParticles } from '@/components/effects/BubbleParticles';
import { HeroSection } from '@/components/sections/HeroSection';
import { StorySection } from '@/components/sections/StorySection';
import { CraftSection } from '@/components/sections/CraftSection';
import { VisionSection } from '@/components/sections/VisionSection';
import { CTASection } from '@/components/sections/CTASection';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import Background3D from '@/components/3d/Background3D';

const Index = () => {
  const { scrollProgress } = useScrollProgress();
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const lastScrollRef = useRef(0);
  const [rotationY, setRotationY] = useState(0);

  const { playBubbleSound, playFizzSound } = useSoundEffects({
    enabled: soundEnabled,
    volume: 0.2
  });

  // Play sounds based on scroll
  useEffect(() => {
    const scrollDelta = Math.abs(scrollProgress - lastScrollRef.current);

    if (scrollDelta > 0.01 && soundEnabled) {
      if (scrollProgress > 0.15 && scrollProgress < 0.5) {
        playBubbleSound();
      }
      if (scrollProgress > 0.25 && scrollProgress < 0.35) {
        playFizzSound();
      }
    }

    lastScrollRef.current = scrollProgress;
  }, [scrollProgress, soundEnabled, playBubbleSound, playFizzSound]);

  // Loader animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Loading screen */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-cyan to-water-deep animate-pulse" />
              <h2 className="font-display text-4xl gradient-text-water">PURELIFE</h2>
              <p className="text-muted-foreground mt-2">Loading Experience...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sound toggle button */}
      <button
        onClick={toggleSound}
        className="fixed top-6 right-6 z-40 glass rounded-full p-3 hover:bg-card/80 transition-all duration-300"
        aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
      >
        {soundEnabled ? (
          <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </button>

      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-40">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-neon-cyan to-primary"
          style={{
            scaleX: scrollProgress,
            transformOrigin: 'left'
          }}
        />
      </div>

      {/* Background bubble particles */}
      <BubbleParticles scrollProgress={scrollProgress} />

      {/* Scrollable content sections */}
      <div className="relative z-20">
        <Background3D rotationY={rotationY} />

        {/* Scroll controller */}
        <HeroSection setRotationY={setRotationY} />
        <StorySection />
        <CraftSection />
        <VisionSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;
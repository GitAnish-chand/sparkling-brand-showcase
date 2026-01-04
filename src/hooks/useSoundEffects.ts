import { useRef, useEffect, useCallback } from 'react';

interface UseSoundEffectsOptions {
  enabled?: boolean;
  volume?: number;
}

export const useSoundEffects = ({ enabled = true, volume = 0.3 }: UseSoundEffectsOptions = {}) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastPlayTime = useRef(0);

  useEffect(() => {
    if (enabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [enabled]);

  const playBubbleSound = useCallback(() => {
    if (!enabled || !audioContextRef.current) return;
    
    const now = Date.now();
    if (now - lastPlayTime.current < 100) return; // Throttle
    lastPlayTime.current = now;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Bubble pop sound
    oscillator.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(volume * 0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }, [enabled, volume]);

  const playFizzSound = useCallback(() => {
    if (!enabled || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    
    // Create white noise for fizz
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 3000;
    
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume * 0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    noise.start();
    noise.stop(ctx.currentTime + 0.5);
  }, [enabled, volume]);

  return { playBubbleSound, playFizzSound };
};

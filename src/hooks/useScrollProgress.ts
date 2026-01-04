import { useEffect, useRef, useState, useCallback } from 'react';

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  const updateScrollProgress = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    setScrollProgress(Math.min(1, Math.max(0, currentProgress)));
    setScrollY(window.scrollY);
    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollProgress);
      ticking.current = true;
    }
  }, [updateScrollProgress]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, updateScrollProgress]);

  return { scrollProgress, scrollY };
};

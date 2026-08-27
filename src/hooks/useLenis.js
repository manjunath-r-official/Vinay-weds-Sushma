import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import config from '../config/config.js';

/**
 * Sets up Lenis smooth scrolling for the whole app.
 * Automatically disabled if the user prefers reduced motion.
 * Returns the Lenis instance ref so callers can start/stop it
 * (e.g. to lock scroll while the intro door is showing).
 */
export default function useLenis({ enabled = true } = {}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      config.animation.reduceMotionRespected &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!enabled || prefersReduced) return undefined;

    const lenis = new Lenis({
      duration: config.animation.lenisSmoothness,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}

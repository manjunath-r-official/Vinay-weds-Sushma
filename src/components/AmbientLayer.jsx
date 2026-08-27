import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import config from '../config/config.js';

const PETAL_COLORS = ['#E3B7A0', '#C9A24B', '#E8C874', '#8a2f3a'];

/**
 * Continuous ambient background effect. Two selectable modes, set via
 * `config.ambient.mode`:
 *   - 'petals': soft CSS-drawn flower petals drifting down (original look)
 *   - 'emoji' : WhatsApp-style flower/leaf emoji falling naturally, plus
 *               a few shiny butterflies flying independently across the
 *               screen (not falling — a gentle side-to-side wander)
 *   - 'off'   : disables the ambient layer entirely
 *
 * Exposes an imperative `burst(n)` method via ref for celebratory moments
 * (RSVP submit, scratch reveal, etc) — works the same regardless of mode.
 */
export default function AmbientLayer({ layerRef }) {
  const containerRef = useRef(null);
  const butterflyContainerRef = useRef(null);
  const mode = config.ambient?.mode ?? 'petals';
  const intervalMs = config.ambient?.spawnIntervalMs ?? 500;
  const emojiSet = config.ambient?.emojiSet ?? ['🌸', '🌼', '🌷', '🍃', '🌿'];
  const butterflyCfg = config.ambient?.butterflies ?? { enabled: false };

  function spawnPetal() {
    const container = containerRef.current;
    if (!container) return;
    const el = document.createElement('div');
    const size = 8 + Math.random() * 10;
    const startX = 6 + Math.random() * 88;
    const driftX = (Math.random() * 40) - 20;
    el.style.position = 'absolute';
    el.style.top = '-5%';
    el.style.left = startX + '%';
    el.style.width = size + 'px';
    el.style.height = size * 0.8 + 'px';
    el.style.background = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    el.style.borderRadius = '0 100% 0 100%';
    el.style.opacity = '0.9';
    el.style.willChange = 'transform, opacity';
    container.appendChild(el);

    const duration = 7 + Math.random() * 6;
    const travelDistance = container.clientHeight + 80;
    gsap.to(el, {
      x: driftX,
      y: travelDistance,
      rotation: Math.random() * 720,
      opacity: 0,
      duration,
      ease: 'none',
      onComplete: () => el.remove(),
    });
  }

  function spawnEmoji() {
    const container = containerRef.current;
    if (!container) return;
    const el = document.createElement('div');
    const size = 8 + Math.random() * 14;
    const startX = 6 + Math.random() * 88;
    const sway = (Math.random() * 30) - 15;
    el.textContent = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    el.style.position = 'absolute';
    el.style.top = '-6%';
    el.style.left = startX + '%';
    el.style.fontSize = size + 'px';
    el.style.lineHeight = '1';
    el.style.opacity = '0.95';
    el.style.willChange = 'transform, opacity';
    el.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,.25))';
    container.appendChild(el);

    const duration = 8 + Math.random() * 6;
    const travelDistance = container.clientHeight + 80;
    const tl = gsap.timeline({ onComplete: () => el.remove() });
    tl.to(el, {
      y: travelDistance,
      rotation: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
      duration,
      ease: 'none',
    }, 0);
    // keep motion visually lively without letting the petals drift beyond the viewport
    tl.to(el, {
      x: sway,
      duration: duration / 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1,
    }, 0);
  }

  function spawnBurstParticle() {
    mode === 'emoji' ? spawnEmoji() : spawnPetal();
  }

  function burst(n = 30) {
    if (mode === 'off') return;
    for (let i = 0; i < n; i++) {
      setTimeout(spawnBurstParticle, i * 18);
    }
  }

  // Ambient ongoing spawn (petals or emoji, whichever mode is active)
  useEffect(() => {
    if (layerRef) layerRef.current = { burst };

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || mode === 'off') return undefined;

    const spawn = mode === 'emoji' ? spawnEmoji : spawnPetal;
    const id = setInterval(spawn, intervalMs);
    for (let i = 0; i < 6; i++) setTimeout(spawn, i * 150);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, intervalMs]);

  // Independent butterfly flight loop — only relevant in 'emoji' mode
  useEffect(() => {
    if (mode !== 'emoji' || !butterflyCfg.enabled) return undefined;
    const container = butterflyContainerRef.current;
    if (!container) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const butterflies = [];
    const count = butterflyCfg.count ?? 4;

    function flyOnce(el) {
      const startX = Math.random() * 100;
      const startY = 15 + Math.random() * 60;
      const endX = Math.random() * 100;
      const endY = 15 + Math.random() * 60;
      const midX = (startX + endX) / 2 + (Math.random() * 20 - 10);
      const midY = Math.min(startY, endY) - 10 - Math.random() * 15;

      gsap.set(el, { left: startX + '%', top: startY + '%' });
      const tl = gsap.timeline({ onComplete: () => flyOnce(el) });
      tl.to(el, {
        left: midX + '%',
        top: midY + '%',
        duration: 19 + Math.random() * 2,
        ease: 'sine.inOut',
      }).to(el, {
        left: endX + '%',
        top: endY + '%',
        duration: 3 + Math.random() * 2,
        ease: 'sine.inOut',
      });
      // wing flutter via scaleX pulsing
      gsap.to(el, {
        scaleX: 0.5,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.textContent = butterflyCfg.emoji ?? '🦋';
      el.style.position = 'absolute';
      el.style.fontSize = 22 + Math.random() * 10 + 'px';
      el.style.filter = 'drop-shadow(0 0 6px rgba(232,200,116,.6))';
      el.style.willChange = 'transform, left, top';
      container.appendChild(el);
      butterflies.push(el);
      flyOnce(el);
    }

    return () => {
      butterflies.forEach((el) => {
        gsap.killTweensOf(el);
        el.remove();
      });
    };
  }, [mode, butterflyCfg.enabled, butterflyCfg.count, butterflyCfg.emoji]);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
        aria-hidden="true"
      />
      {mode === 'emoji' && butterflyCfg.enabled && (
        <div
          ref={butterflyContainerRef}
          className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
}

import { useEffect, useRef } from 'react';

/**
 * Canvas-based confetti "party popper" burst — distinct from the ambient
 * AmbientLayer (which drifts continuously). This fires in discrete bursts
 * from one or two origin points (like popper streamers) with gravity,
 * rotation, and a shred/rectangle shape mix, then clears itself.
 * Exposes an imperative `burst()` method via ref, same pattern as AmbientLayer.
 */
const CONFETTI_COLORS = ['#C9A24B', '#E8C874', '#E3B7A0', '#0F5C4A', '#F6ECD9', '#8a2f3a'];

export default function ConfettiLayer({ layerRef }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const rafId = useRef(null);
  const runningRef = useRef(false);

  function resize() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawnBurst(originXRatio = 0.5, count = 90) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const originX = canvas.width * originXRatio;
    const originY = canvas.height * 0.28;

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI) - Math.PI / 2 - Math.PI / 4; // upward cone
      const speed = 6 + Math.random() * 9;
      particles.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
        vy: Math.sin(angle) * speed - 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 14,
        size: 5 + Math.random() * 6,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        gravity: 0.22 + Math.random() * 0.08,
        drag: 0.985,
        life: 0,
        maxLife: 110 + Math.random() * 40,
      });
    }
    if (!runningRef.current) {
      runningRef.current = true;
      tick();
    }
  }

  function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current = particles.current.filter((p) => p.life < p.maxLife);

    for (const p of particles.current) {
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.life += 1;

      const fadeStart = p.maxLife * 0.7;
      const opacity = p.life > fadeStart ? Math.max(0, 1 - (p.life - fadeStart) / (p.maxLife - fadeStart)) : 1;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (particles.current.length > 0) {
      rafId.current = requestAnimationFrame(tick);
    } else {
      runningRef.current = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /** Two-popper burst — from left-of-center and right-of-center, like real poppers. */
  function popperBurst() {
    spawnBurst(0.22, 80);
    setTimeout(() => spawnBurst(0.78, 80), 80);
  }

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    if (layerRef) layerRef.current = { burst: popperBurst };
    return () => {
      window.removeEventListener('resize', resize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[95]"
      aria-hidden="true"
    />
  );
}

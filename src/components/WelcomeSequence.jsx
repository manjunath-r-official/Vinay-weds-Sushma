import { useEffect, useRef } from 'react';
import config from '../config/config.js';
const ganeshaImage = '/images/lordganesha.png';
const thoranaImage = '/images/GIF/thorana.gif';

const MARIGOLD_COLORS = ['#f8d266', '#f4a261', '#f9b233', '#e76f51', '#f1c40f'];

export default function WelcomeSequence({ visible, onEnter }) {
  const petalsRef = useRef(null);
  const petalSet = config.welcome?.flowerEmojis ?? ['🌼', '🌸', '🌼', '🌻', '🌷'];

  useEffect(() => {
    if (!visible || !petalsRef.current) return undefined;

    const container = petalsRef.current;
    const petals = [];
    const makePetal = () => {
      const petal = document.createElement('span');
      const size = 8 + Math.random() * 18;
      petal.textContent = petalSet[Math.floor(Math.random() * petalSet.length)];
      petal.style.position = 'absolute';
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.top = '-30px';
      petal.style.fontSize = `${size}px`;
      petal.style.color = MARIGOLD_COLORS[Math.floor(Math.random() * MARIGOLD_COLORS.length)];
      petal.style.opacity = '0.9';
      petal.style.filter = 'drop-shadow(0 0 10px rgba(248,210,102,0.5))';
      petal.style.pointerEvents = 'none';
      petal.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(petal);
      petals.push(petal);

      const startX = (Math.random() - 0.5) * 260;
      const midX = startX + (Math.random() - 0.5) * 220;
      const endX = startX + (Math.random() - 0.5) * 320;
      const startY = -30 - Math.random() * 30;
      const endY = window.innerHeight + 140;
      const duration = 9000 + Math.random() * 7000;

      petal.animate(
        [
          { transform: `translate3d(${startX}px, ${startY}px, 0) rotate(0deg) scale(0.7)`, opacity: 0 },
          { transform: `translate3d(${midX}px, ${(endY - startY) * 0.38}px, 0) rotate(120deg) scale(1)`, opacity: 0.9 },
          { transform: `translate3d(${endX}px, ${endY}px, 0) rotate(280deg) scale(1.05)`, opacity: 0 },
        ],
        {
          duration,
          easing: 'linear',
          fill: 'forwards',
        }
      ).onfinish = () => petal.remove();
    };

    const spawn = () => {
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) makePetal();
    };

    const interval = setInterval(spawn, 360);
    for (let i = 0; i < 18; i++) setTimeout(makePetal, i * 120);

    return () => {
      clearInterval(interval);
      petals.forEach((petal) => petal.remove());
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex w-full max-w-full flex-col items-center justify-center overflow-hidden text-center"
      style={{
        background: 'radial-gradient(ellipse at center, #2a0a10, #170509)',
      }}
    >
      <style>{`
        @keyframes welcomeFloat {
          0% {
            transform: translateY(10px) scale(0.98);
            opacity: 0.78;
            text-shadow: 0 0 0 rgba(244, 196, 108, 0);
          }
          50% {
            transform: translateY(-6px) scale(1.02);
            opacity: 1;
            text-shadow: 0 0 18px rgba(244, 196, 108, 0.36);
          }
          100% {
            transform: translateY(10px) scale(0.98);
            opacity: 0.9;
            text-shadow: 0 0 0 rgba(244, 196, 108, 0);
          }
        }

        @keyframes welcomePulse {
          0%, 100% {
            transform: translateY(0) scale(1);
            box-shadow: 0 0 0 rgba(244, 196, 108, 0);
          }
          50% {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 0 18px rgba(244, 196, 108, 0.22);
          }
        }
      `}</style>

      <div ref={petalsRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" />

      <img
        src={thoranaImage}
        alt="Decorative wedding torana"
        className="pointer-events-none absolute inset-x-0 top-0 w-full max-w-[1200px] object-contain opacity-80"
        style={{ filter: 'drop-shadow(0 0 24px rgba(201,162,75,0.12))' }}
      />

      <div className="relative z-10 mb-5 max-w-[min(84vw,420px)]">
        <img
          src={ganeshaImage}
          alt="Ganesha idol"
          className="w-[240px] h-[240px] md:w-[300px] md:h-[300px] object-contain max-w-full"
        />
      </div>

      <div
        className="relative z-10 font-devanagari text-gold-bright"
        style={{
          fontSize: 'clamp(30px,7vw,54px)',
          animation: 'welcomeFloat 3.6s ease-in-out infinite',
        }}
      >
        ಸುಸ್ವಾಗತ
      </div>

      <div
        className="relative z-10 mt-2 text-ivory text-[13px] uppercase tracking-[0.2em]"
        style={{ animation: 'welcomeFloat 3.6s ease-in-out infinite 0.25s' }}
      >
        Welcome to our wedding
      </div>

      <button
        className="relative z-10 mt-9 px-9 py-3.5 rounded-full border border-gold text-gold-bright text-[13px] uppercase tracking-[0.12em] hover:bg-gold hover:text-maroon-deep transition-colors"
        style={{ animation: 'welcomePulse 3s ease-in-out infinite' }}
        onClick={onEnter}
      >
        Begin the Journey
      </button>
    </div>
  );
}

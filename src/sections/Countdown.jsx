import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import CountdownDigits from '../components/CountdownDigits.jsx';

export default function Countdown() {
  const fireflies = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 4,
      })),
    []
  );

  return (
    <section id="countdown" className="section max-w-[1120px] mx-auto px-5 py-5">
      <Reveal>
        <div
          className="rounded-3xl px-5 py-5 relative overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at top, rgba(201,162,75,.14), transparent 70%)' }}
        >
          {fireflies.map((f) => (
            <motion.div
              key={f.id}
              className="absolute w-[5px] h-[5px] rounded-full bg-gold-bright"
              style={{ left: f.left + '%', bottom: 0, boxShadow: '0 0 10px 3px rgba(232,200,116,.7)' }}
              animate={{ opacity: [0, 0.9, 0.7, 0], y: [0, -40, -70, -110], x: [0, 30, -20, 0] }}
              transition={{ duration: f.duration, repeat: Infinity, delay: f.delay, ease: 'easeInOut' }}
            />
          ))}

          <div className="text-center relative z-10">
            <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">Almost There</span>
            <h2 className="font-display font-medium text-ivory mb-10" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>
              Counting Down To Forever
            </h2>
          </div>

          <div className="relative z-10">
            <CountdownDigits size="md" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

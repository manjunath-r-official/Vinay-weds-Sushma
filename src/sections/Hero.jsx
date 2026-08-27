import { motion } from 'framer-motion';
import config from '../config/config.js';

export default function Hero() {
  const dateStr = new Date(config.weddingDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center relative px-5"
    >
      <motion.div
        className="relative w-[min(78vw,300px)] h-[min(78vw,380px)] overflow-hidden border-[6px] border-gold shadow-royal mb-8"
        style={{ borderRadius: '50% 50% 6% 6% / 60% 60% 6% 6%', boxShadow: '0 20px 60px rgba(0,0,0,.45), 0 0 0 12px rgba(201,162,75,.12)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      >
        <img src={config.heroPhoto} alt={`${config.bride.name} and ${config.groom.name}`} className="w-full h-full object-cover" loading="eager" />
      </motion.div>

      <h1 className="font-cinzel text-gold-bright leading-none text-shadow-royal" style={{ fontSize: 'clamp(40px,9vw,86px)' }}>
        {config.bride.name}
        <span className="font-devanagari text-rose block my-1.5" style={{ fontSize: '0.5em' }}>॥ श्री ॥</span>
        {config.groom.name}
      </h1>

      <p className="mt-4 text-lg tracking-wide text-ivory">are getting married</p>

      {/* <div className="mt-6 px-7 py-3 border border-gold rounded-full text-gold-bright tracking-widest text-sm uppercase">
        {dateStr}
      </div> */}

      <motion.div
        className="absolute bottom-6 left-1/3 -translate-x-1/2 text-xs tracking-[0.2em] text-rose"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        SCROLL TO ENTER ↓
      </motion.div>
    </section>
  );
}

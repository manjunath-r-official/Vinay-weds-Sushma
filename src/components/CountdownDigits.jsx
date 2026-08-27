import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config/config.js';

function getRemaining(target) {
  let diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
  const mins = Math.floor(diff / 60000); diff -= mins * 60000;
  const secs = Math.floor(diff / 1000);
  return { days, hours, mins, secs };
}

function Digit({ value, label, size = 'md' }) {
  const isSmall = size === 'sm';
  return (
    <div
      className={isSmall ? 'w-[76px] py-3 border rounded-xl text-center' : 'w-[110px] py-5 border rounded-2xl text-center'}
      style={{ borderColor: 'rgba(201,162,75,.35)', background: 'rgba(38,8,13,.5)' }}
    >
      <div className={isSmall ? 'relative h-[32px] overflow-hidden' : 'relative h-[50px] overflow-hidden'}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className={`font-cinzel text-gold-bright ${isSmall ? 'text-[26px]' : 'text-[42px]'}`}
            style={{ textShadow: '0 0 18px rgba(232,200,116,.5)' }}
          >
            {String(value).padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={isSmall ? 'text-[9px] tracking-widest uppercase text-rose mt-1' : 'text-[11px] tracking-widest uppercase text-rose mt-1'}>
        {label}
      </div>
    </div>
  );
}

/**
 * Live ticking countdown to the wedding date. Shared between the standalone
 * Countdown section and the scratch-card reveal (with `size="sm"` there so
 * it fits neatly beneath the card). Same ticking behavior everywhere —
 * updates every second, digits flip with the same animation.
 */
export default function CountdownDigits({ size = 'md', className = '' }) {
  const target = useMemo(() => new Date(config.weddingDate).getTime(), []);
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className={`flex justify-center gap-3 flex-wrap ${className}`}>
      <Digit value={remaining.days} label="Days" size={size} />
      <Digit value={remaining.hours} label="Hours" size={size} />
      <Digit value={remaining.mins} label="Minutes" size={size} />
      <Digit value={remaining.secs} label="Seconds" size={size} />
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function EasterEggs({ onCelebrate }) {
  const [message, setMessage] = useState('');

  function trigger(egg) {
    setMessage(egg.message);
    onCelebrate && onCelebrate(15);
    if (navigator.vibrate) navigator.vibrate(15);
  }

  return (
    <section className="section max-w-[1120px] mx-auto px-5 py-24 text-center">
      <Reveal>
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">Meaning of Saptapadi</span>
        <h2 className="font-display font-medium text-ivory mb-3" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>Tap to discover</h2>
      </Reveal>

      <div className="flex justify-center gap-8 flex-wrap mt-2.5">
        {config.easterEggs.map((egg) => (
          <motion.button
            key={egg.id}
            className="text-4xl"
            style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.4))' }}
            whileHover={{ scale: 1.2, rotate: -6 }}
            whileTap={{ scale: 1.4, rotate: 10 }}
            onClick={() => trigger(egg)}
            aria-label={egg.id}
          >
            {egg.icon}
          </motion.button>
        ))}
      </div>

      <div className="mt-4 min-h-[24px] text-gold-bright italic">{message}</div>
    </section>
  );
}

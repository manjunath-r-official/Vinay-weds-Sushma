import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="section max-w-[1120px] mx-auto px-5 py-28">
      <Reveal className="text-center">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">Moments</span>
        <h2 className="font-display font-medium text-ivory" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>Gallery</h2>
        <p className="text-rose italic max-w-md mx-auto mt-2 mb-12">A few frames from the story so far.</p>
      </Reveal>

      <div className="[column-width:220px] [column-gap:14px] md:[column-width:240px]">
        {config.gallery.map((item, i) => (
          <Reveal key={item.src} variant="scale" delay={(i % 6) * 0.05} className="mb-3.5 break-inside-avoid">
            <img
              src={item.src}
              alt={`Wedding gallery ${i + 1}`}
              loading="lazy"
              className="w-full block rounded-xl cursor-zoom-in shadow-lg hover:scale-[1.02] transition-transform duration-300"
              onClick={() => setActive(item.src)}
            />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-8"
            style={{ background: 'rgba(10,3,5,.94)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              className="absolute top-6 right-7 text-3xl text-gold-bright"
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              ×
            </button>
            <motion.img
              src={active}
              alt="Enlarged wedding photo"
              className="max-w-[92vw] max-h-[86vh] rounded-lg shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

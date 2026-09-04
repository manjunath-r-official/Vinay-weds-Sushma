import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function Gallery() {
  const items = config.gallery || [];
  const n = items.length;
  const [index, setIndex] = useState(0);

  if (n === 0) return null;

  const prev = (index - 1 + n) % n;
  const next = (index + 1) % n;

  function goto(i) {
    setIndex((i + n) % n);
  }

  function handleDragEnd(event, info) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    // swipe left => show next, swipe right => show prev
    if (offset < -80 || velocity < -500) {
      goto(index + 1);
    } else if (offset > 80 || velocity > 500) {
      goto(index - 1);
    }
  }

  return (
    <section id="gallery" className="section max-w-[1120px] mx-auto px-5 py-20">
      <Reveal className="text-center">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">Moments</span>
        <h2 className="font-display font-medium text-ivory" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>Gallery</h2>
        <p className="text-rose italic max-w-md mx-auto mt-2 mb-8">A few frames from the story so far.</p>
      </Reveal>

      <div className="relative flex items-center justify-center mt-8">
        {/* Left (previous) image - behind and slightly rotated */}
        <motion.img
          src={items[prev].src}
          alt={`Previous ${prev + 1}`}
          className="absolute rounded-xl shadow-xl"
          style={{ width: '72%', filter: 'blur(0px) grayscale(.01)', transformOrigin: 'center' }}
          initial={{ x: '-22%', scale: 0.96, rotate: -2, opacity: 0.98 }}
          animate={{ x: '-22%', scale: 0.96, rotate: -2, opacity: 0.98 }}
          transition={{ duration: 0.28 }}
        />

        {/* Center (current) image - prominent and draggable */}
        <motion.img
          src={items[index].src}
          alt={`Current ${index + 1}`}
          className="relative rounded-xl shadow-2xl cursor-grab"
          style={{ width: '89%', zIndex: 100 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: 'grabbing' }}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* Right (next) image - ahead and slightly rotated/out of focus */}
        <motion.img
          src={items[next].src}
          alt={`Next ${next + 1}`}
          className="absolute rounded-xl shadow-xl"
          style={{ width: '72%', filter: 'blur(0px) grayscale(.01)', transformOrigin: 'center' }}
          initial={{ x: '22%', scale: 0.96, rotate: 2, opacity: 0.98 }}
          animate={{ x: '22%', scale: 0.96, rotate: 2, opacity: 0.98 }}
          transition={{ duration: 0.28 }}
        />

        {/* Navigation controls removed — swipe/drag to navigate */}
      </div>
      
    </section>
  );
}

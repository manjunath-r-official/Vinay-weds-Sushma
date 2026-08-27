import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD = 50;

export default function PhotoCarousel() {
  const slides = config.gallery; // reuse the same photo set configured for the Gallery
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback(
    (next) => {
      setDirection(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1);
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [index, slides.length]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return undefined;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, paused]);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
    setPaused(false);
  }

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
  };

  return (
    <section id="carousel" className="section max-w-[1120px] mx-auto px-5 py-28">
      <Reveal className="text-center">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">
          Relive the Moments
        </span>
        <h2 className="font-display font-medium text-ivory" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>
          Photo Slideshow
        </h2>
        <p className="text-rose italic max-w-md mx-auto mt-2 mb-12">
          Swipe or use the arrows to browse — it plays itself too.
        </p>
      </Reveal>

      <Reveal variant="scale">
        <div
          className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-royal"
          style={{ aspectRatio: '4 / 3', background: '#1e0509' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={slides[index].src}
              src={slides[index].src}
              alt={`Slideshow photo ${index + 1}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </AnimatePresence>

          {/* Gradient scrim for control legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,.25) 0%, transparent 20%, transparent 75%, rgba(0,0,0,.55) 100%)' }}
          />

          {/* Prev / Next controls */}
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-ivory"
            style={{ background: 'rgba(38,8,13,.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(201,162,75,.3)' }}
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-ivory"
            style={{ background: 'rgba(38,8,13,.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(201,162,75,.3)' }}
          >
            <FiChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.src}
                onClick={() => goTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                className="rounded-full transition-all"
                style={{
                  width: i === index ? '22px' : '7px',
                  height: '7px',
                  background: i === index ? '#E8C874' : 'rgba(246,236,217,.4)',
                }}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

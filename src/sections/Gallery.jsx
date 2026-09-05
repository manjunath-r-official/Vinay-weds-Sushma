import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';
import galleryBg from '../assets/images/props/bg2.png';

export default function Gallery() {
  const items = config.gallery || [];
  const n = items.length;
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const autoSlideRef = useRef(null);
  const touchStart = useRef(null);
  const resumeTimeoutRef = useRef(null);

  // Gallery section colors from config
  const galleryColors = config.gallerySection?.colors || {
    title: '#F6ECD9',
    titleSmall: '#E8C874',
    subtitle: '#E3B7A0',
    overlay: 'rgba(10,3,5,0.3)',
  };
  const galleryTitle = config.gallerySection?.title || 'Gallery';
  const galleryTitleSmall = config.gallerySection?.titleSmall || 'Moments';
  const gallerySubtitle = config.gallerySection?.subtitle || 'A few frames from the story so far.';

  if (n === 0) return null;

  const prev = (index - 1 + n) % n;
  const next = (index + 1) % n;

  function goto(i) {
    setIndex((i + n) % n);
    // Trigger 5-second delay before resuming auto-slide
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
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

  // Auto-slide infinite loop
  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      goto(index + 1);
    }, 4000); // Change slide every 4 seconds

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [index, n]);

  // Pause auto-slide on hover/focus
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (isPaused) {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
        autoSlideRef.current = null;
      }
    } else if (!autoSlideRef.current) {
      autoSlideRef.current = setInterval(() => {
        goto(index + 1);
      }, 4000);
    }
  }, [isPaused, index, n]);

  function openFullscreen(i) {
    setFullscreenIndex(i);
    setIsFullscreen(true);
  }

  function closeFullscreen() {
    setIsFullscreen(false);
    // Trigger 5-second delay before resuming auto-slide
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }

  function nextFullscreen() {
    setFullscreenIndex((fullscreenIndex + 1) % n);
    // Trigger 5-second delay before resuming auto-slide
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }

  function prevFullscreen() {
    setFullscreenIndex((fullscreenIndex - 1 + n) % n);
    // Trigger 5-second delay before resuming auto-slide
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }

  // Keyboard navigation for fullscreen modal
  useEffect(() => {
    if (!isFullscreen) return;
    
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowRight') {
        nextFullscreen();
      } else if (e.key === 'ArrowLeft') {
        prevFullscreen();
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, fullscreenIndex, n]);

  return (
    <section 
      id="gallery" 
      className="section max-w-[1120px] mx-auto px-5 py-20 relative"
      style={{ 
        backgroundImage: `url(${galleryBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="absolute inset-0" style={{ background: galleryColors.overlay }} />
      
      <Reveal className="text-center relative z-10">
        <span className="inline-block tracking-[0.28em] uppercase text-xs mb-3" style={{ color: galleryColors.titleSmall }}>{galleryTitleSmall}</span>
        <h2 className="font-display font-medium" style={{ fontSize: 'clamp(34px,6vw,58px)', color: galleryColors.title }}>{galleryTitle}</h2>
        <p className="italic max-w-md mx-auto mt-2 mb-8" style={{ color: galleryColors.subtitle }}>{gallerySubtitle}</p>
      </Reveal>

      <div className="relative flex items-center justify-center mt-8 z-10">
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

        {/* Center (current) image - prominent and draggable for manual navigation */}
        <motion.img
          src={items[index].src}
          alt={`Current ${index + 1}`}
          className="relative rounded-xl shadow-2xl cursor-grab"
          style={{ width: '89%', zIndex: 100 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
          onClick={() => openFullscreen(index)}
          whileTap={{ cursor: 'grabbing', scale: 0.98 }}
          whileDrag={{ cursor: 'grabbing' }}
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

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(10,3,5,0.98)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen gallery"
            onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStart.current === null) return;
              const touchEnd = e.changedTouches[0].clientX;
              const diff = touchStart.current - touchEnd;
              if (Math.abs(diff) > 50) {
                if (diff > 0) nextFullscreen();
                else prevFullscreen();
              }
              touchStart.current = null;
            }}
          >
            <button
              className="absolute top-6 right-6 z-210 p-2 rounded-full bg-[rgba(10,3,5,0.8)] text-ivory text-3xl"
              aria-label="Close fullscreen"
              onClick={(e) => { e.stopPropagation(); closeFullscreen(); }}
            >
              ×
            </button>
            
            <button
              className="absolute left-6 z-210 p-4 rounded-full bg-[rgba(10,3,5,0.8)] text-ivory text-4xl"
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); prevFullscreen(); }}
            >
              ‹
            </button>
            
            <button
              className="absolute right-6 z-210 p-4 rounded-full bg-[rgba(10,3,5,0.8)] text-ivory text-4xl"
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); nextFullscreen(); }}
            >
              ›
            </button>

            <motion.img
              src={items[fullscreenIndex].src}
              alt={`Gallery ${fullscreenIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

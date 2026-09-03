import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config/config.js';
import featherIcon from '../assets/images/feather-icon.png';

const LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#surprise', label: 'The Date' },
  { href: '#couple', label: 'Couple' },
  { href: '#story', label: 'Story' },
  { href: '#events', label: 'Events' },
  { href: '#countdown', label: 'Countdown' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#carousel', label: 'Slideshow' },
  { href: '#venue', label: 'Venue' },
  { href: '#rsvp', label: 'RSVP' },
];

/**
 * Navigation is hidden by default. A small peacock-feather icon sits fixed
 * in the top-right corner (like a hamburger menu button); tapping it opens
 * a slide-out drawer with the section links. Swap `navigation.peacockIcon`
 * in config.js for a real peacock image whenever you have one — a
 * placeholder mark is used until then.
 */
export default function FloatingNav() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);

  // Close on Escape, and on click outside the drawer.
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onClickOutside(e) {
      if (open && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  function handleLinkClick() {
    setOpen(false);
  }

  return (
    <>
      {/* Feather trigger — fixed top-right, always visible, opens the drawer */}
      <motion.button
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed top-4 right-4 z-[70] w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(38,8,13,.6)',
          backdropFilter: 'blur(14px) saturate(140%)',
          border: '1px solid rgba(201,162,75,.35)',
          boxShadow: '0 10px 30px rgba(0,0,0,.35)',
        }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.06 }}
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <img
          src={featherIcon}
          alt=""
          aria-hidden="true"
          className="w-7 h-7 object-contain"
          draggable={false}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[65]"
              style={{ background: 'rgba(10,3,5,.6)', backdropFilter: 'blur(2px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Slide-out drawer */}
            <motion.nav
              ref={drawerRef}
              aria-label="Section navigation"
              className="fixed top-0 right-0 z-[68] h-full w-[78vw] max-w-[300px] flex flex-col gap-1 p-6 pt-24"
              style={{
                background: 'linear-gradient(180deg, #26080D, #1a0509)',
                borderLeft: '1px solid rgba(201,162,75,.3)',
                boxShadow: '-20px 0 60px rgba(0,0,0,.5)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            >
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={handleLinkClick}
                  className="px-4 py-3 text-[15px] tracking-wide rounded-xl text-ivory hover:bg-gold hover:text-maroon-deep transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 + i * 0.04 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

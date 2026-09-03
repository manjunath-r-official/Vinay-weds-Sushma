import { useRef, useState } from 'react';
import { gsap } from 'gsap';
const doorLeft = '/images/door/door-left.jpg';
const doorRight = '/images/door/door-right.jpg';

/**
 * Full-bleed royal palace door built from the couple's own reference
 * photography (real carved temple doors) rather than procedural 3D
 * geometry — this gives genuine ornate detail a primitive-based Three.js
 * scene can't match. The "3D" swing-open is done with CSS 3D transforms
 * (perspective + rotateY on each leaf, pivoted at its outer edge) and
 * orchestrated with GSAP for the same easing language as the rest of the
 * site. Lightweight: no WebGL, no Three.js runtime cost for this screen.
 */
export default function RoyalDoor3D({ onOpened }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const glowRef = useRef(null);

  function handleOpen() {
    if (isOpen) return;
    setIsOpen(true);
    if (navigator.vibrate) navigator.vibrate(30);

    const tl = gsap.timeline();

    // Light bloom from the seam right before the doors move
    tl.to(glowRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0);

    // Swing both leaves open, pivoting at their outer edges (real hinge behavior)
    tl.to(leftRef.current, { rotateY: -108, duration: 1.7, ease: 'power3.inOut' }, 0.15);
    tl.to(rightRef.current, { rotateY: 108, duration: 1.7, ease: 'power3.inOut' }, 0.15);

    // Whole scene pushes back and fades as we "walk through"
    tl.to(
      wrapperRef.current,
      { scale: 1.25, opacity: 0, duration: 1.1, ease: 'power2.in' },
      0.9
    );

    setTimeout(() => onOpened && onOpened(), 2100);
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full select-none"
      role="button"
      tabIndex={0}
      aria-label="Open the palace door to enter the invitation"
      onClick={handleOpen}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
      style={{ perspective: '2200px', margin: 0, padding: 0 }}
    >
      {/* Ambient god-ray glow behind the seam, blooms on open */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 45%, rgba(232,200,116,0.9), rgba(232,200,116,0) 60%)',
          zIndex: 1,
        }}
      />

      <div className="relative w-full h-full flex" style={{ transformStyle: 'preserve-3d', margin: 0, padding: 0 }}>
        {/* Left leaf — hinge on the far left edge */}
        <div
          className="relative w-1/2 h-full overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center',
            margin: 0,
            padding: 0,
          }}
        >
          <div
            ref={leftRef}
            className="w-full h-full"
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
          >
            <img
              src={doorLeft}
              alt="Carved palace door — left panel"
              className="w-full h-full object-cover"
              style={{
                boxShadow: 'inset -20px 0 40px rgba(0,0,0,.4), 0 20px 60px rgba(0,0,0,.5)',
              }}
              draggable={false}
            />
          </div>
        </div>

        {/* Right leaf — hinge on the far right edge */}
        <div
          className="relative w-1/2 h-full overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'right center',
            margin: 0,
            padding: 0,
          }}
        >
          <div
            ref={rightRef}
            className="w-full h-full"
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'right center' }}
          >
            <img
              src={doorRight}
              alt="Carved palace door — right panel"
              className="w-full h-full object-cover"
              style={{
                boxShadow: 'inset 20px 0 40px rgba(0,0,0,.4), 0 20px 60px rgba(0,0,0,.5)',
              }}
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Center seam line for a convincing closed-door look before opening */}
      {!isOpen && (
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '3px',
            background: 'linear-gradient(180deg, transparent, rgba(0,0,0,.6) 10%, rgba(0,0,0,.6) 90%, transparent)',
            zIndex: 2,
          }}
        />
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import CountdownDigits from '../components/CountdownDigits.jsx';
import config from '../config/config.js';
import Countdown from './Countdown.jsx';


/**
 * Second section on the page (right after the Hero). Guests scratch the
 * card to reveal the wedding date; on completion this fires the confetti
 * party-popper burst (via onCelebrate) and, just below the card, reveals
 * the same live ticking countdown used further down the page.
 */
export default function ScratchSurprise({ onCelebrate }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const scratching = useRef(false);

  const dateStr = new Date(config.weddingDate).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext('2d');

    function sizeCanvas() {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;

      const gBright = config.theme.colors.maroonDeep || '#E8C874';
      const gDark = config.theme.colors.realGold || '#C9A24B';

      // Base diagonal gold gradient across the canvas (aligned correctly)
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, gBright);
      grad.addColorStop(0.48, '#fbbe23');
      grad.addColorStop(0.99, gBright);
      //grad.addColorStop(0.8, '#fbbe23');
      //grad.addColorStop(0.9, gDark);
      grad.addColorStop(1, gDark);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glossy diagonal sheen drawn as a diagonal gradient across the whole canvas
      const sheen = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      sheen.addColorStop(0, 'rgba(255,255,255,0)');
      // very narrow, subtle bright band centered near the middle
      sheen.addColorStop(0.497, 'rgba(255,255,255,0)');
      sheen.addColorStop(0.499, 'rgba(255,255,255,0.16)');
      sheen.addColorStop(0.5, 'rgba(255,255,255,0.28)');
      sheen.addColorStop(0.501, 'rgba(255,255,255,0.12)');
      sheen.addColorStop(0.503, 'rgba(255,255,255,0)');
      sheen.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = sheen;
      ctx.save();
      ctx.globalAlpha = 0.18; // lower overall sheen intensity
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Very subtle micro-sheen lines for metallic texture
      ctx.globalAlpha = 0.01;
      ctx.strokeStyle = 'rgba(255,255,255,1)';
      ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i++) {
        const t = (i / 5) * canvas.height * 0.35;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.18 + t);
        ctx.lineTo(canvas.width, canvas.height * 0.26 + t);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Premium maroon text over the gold overlay
      ctx.fillStyle = config.theme.colors.maroonDeep || '#26080D';
      ctx.font = "700 15px Cinzel, serif";
      ctx.textAlign = 'center';
      ctx.fillText('✦ SCRATCH TO REVEAL THE DATE ✦', canvas.width / 2, canvas.height / 2);
    }
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    function pos(e) {
      const r = canvas.getBoundingClientRect();
      const t = e.touches ? e.touches[0] : e;
      return { x: t.clientX - r.left, y: t.clientY - r.top };
    }
    function scratchAt(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();
    }
    function checkRevealed() {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 4 * 40) {
        total++;
        if (data[i] === 0) clear++;
      }
      if (clear / total > 0.55) {
        setRevealed(true);
        if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
        // Fires ambient burst + confetti party poppers together — this is
        // the one place in the site that gets the confetti effect.
        onCelebrate && onCelebrate(35);
      }
    }
    function start(e) {
      scratching.current = true;
      const p = pos(e);
      scratchAt(p.x, p.y);
    }
    function move(e) {
      if (!scratching.current) return;
      e.preventDefault();
      const p = pos(e);
      scratchAt(p.x, p.y);
      checkRevealed();
    }
    function end() {
      scratching.current = false;
    }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchend', end);

    return () => {
      window.removeEventListener('resize', sizeCanvas);
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('mousemove', move);
      canvas.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', end);
      canvas.removeEventListener('touchend', end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="surprise" className="section max-w-[1120px] mx-auto px-5 py-28">
      <Reveal className="text-center">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">Shhh...</span>
        <h2 className="font-display font-medium text-ivory" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>Save The Date</h2>
        <p className="text-rose italic max-w-md mx-auto mt-2 mb-12">Scratch the card below to reveal the big day.</p>
      </Reveal>

      <Reveal variant="scale">
        <div ref={wrapperRef} className="relative max-w-[420px] mx-auto rounded-2xl overflow-hidden shadow-royal">
          <div className="px-6 py-14 text-center min-h-[260px] flex flex-col items-center justify-center" style={{ background: config.theme.colors.ivory }}>
            <span className="text-3xl mb-3" style={{ color: config.theme.colors.maroonDeep }}>💍</span>
            <h4 className="font-display text-3xl mb-2 leading-snug" style={{ color: config.theme.colors.maroonDeep }}>{dateStr}</h4>
            <p className="text-[15px]" style={{ color: config.theme.colors.maroon }}>{config.scratchSurprise.subtitle}</p>
          </div>
          {!revealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 cursor-grab"
              style={{ touchAction: 'none' }}
            />
          )}
          {!revealed && (
            <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase text-white/70 pointer-events-none">
              {/* Scratch to reveal */}
            </div>
          )}
        </div>
      </Reveal>

      {/* Countdown reveals below the card only after the scratch is complete */}
      <AnimatePresence>
        {revealed && (
          // <motion.div
          //   initial={{ opacity: 0, y: 20, height: 0 }}
          //   animate={{ opacity: 1, y: 0, height: 'auto' }}
          //   transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          //   className="mt-10 overflow-hidden"
          // >
          //   <p className="text-center text-xs tracking-[0.2em] uppercase text-gold-bright mb-4">
          //     Counting down to forever
          //   </p>
          //   {/* <CountdownDigits size="sm" /> */}
            
          // </motion.div>
          <Countdown />
        )}
      </AnimatePresence>
    </section>
  );
}

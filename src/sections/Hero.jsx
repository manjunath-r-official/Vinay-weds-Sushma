import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import config from '../config/config.js';
import leftCurtainImage from '../assets/images/leftcurtain.png';
import rightCurtainImage from '../assets/images/rightcurtain.png';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !leftCurtainRef.current || !rightCurtainRef.current || !contentRef.current) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const curtainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1200',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.set([leftCurtainRef.current, rightCurtainRef.current], {
        force3D: true,
      });

      curtainTimeline
        .to(leftCurtainRef.current, {
          xPercent: -100,
          ease: 'none',
        }, 0)
        .to(rightCurtainRef.current, {
          xPercent: 100,
          ease: 'none',
        }, 0);

      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: '+=700',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[175vh] px-0"
    >
      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-start overflow-hidden pt-0 text-center">
        <style>{`
          .curtain-panel {
            box-shadow: inset 0 0 28px rgba(76,48,7,0.45), inset 0 0 18px rgba(255,248,220,0.18);
            border-top: 2px solid rgba(255,241,189,0.7);
            border-bottom: 2px solid rgba(255,241,189,0.7);
          }
        `}</style>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <motion.div
            className="relative w-[min(78vw,300px)] h-[min(78vw,380px)] mb-8"
            style={{ borderRadius: '50% 50% 6% 6% / 60% 60% 6% 6%', boxShadow: '0 20px 60px rgba(0,0,0,.45), 0 0 0 12px rgba(201,162,75,.12)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[inherit]" style={{ border: '6px solid rgba(201,162,75,0.88)' }}>
              <img src={config.heroPhoto} alt={`${config.bride.name} and ${config.groom.name}`} className="h-full w-full object-cover" loading="eager" />
            </div>
          </motion.div>

          <div ref={contentRef} className="relative z-10">
            <h1 className="font-cinzel text-gold-bright leading-none text-shadow-royal" style={{ fontSize: 'clamp(40px,9vw,86px)' }}>
              {config.bride.name}
              <span className="font-devanagari text-rose block my-1.5" style={{ fontSize: '0.5em' }}>॥ श्री ॥</span>
              {config.groom.name}
            </h1>

            <p className="mt-4 text-lg tracking-wide text-ivory">are getting married</p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div
            ref={leftCurtainRef}
            className="curtain-panel absolute left-0 top-0 z-20 h-[90vh] w-1/2"
            style={{
              borderRight: '2px solid rgba(255,241,189,0.7)',
            }}
          >
            <img
              src={leftCurtainImage}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: 'left center' }}
            />
          </div>

          <div
            ref={rightCurtainRef}
            className="curtain-panel absolute right-0 top-0 z-10 h-[90vh] w-1/2"
            style={{
              borderLeft: '2px solid rgba(255,241,189,0.7)',
            }}
          >
            <img
              src={rightCurtainImage}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: 'right center' }}
            />
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-[10px] tracking-[0.35em] text-rose uppercase"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll down to reveal
        </motion.div>
      </div>
    </section>
  );
}

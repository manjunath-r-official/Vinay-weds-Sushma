import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RoyalDoor3D from '../components/RoyalDoor3D.jsx';
import WelcomeSequence from '../components/WelcomeSequence.jsx';
import config from '../config/config.js';

/**
 * Controls the full first-experience flow:
 *   1. Dark palace door (Three.js) — tap/click to open
 *   2. Welcome sequence (Sanskrit + rangoli)
 *   3. Reveals the rest of the site (handled by parent via onEnter)
 */
export default function EntryGate({ onEnter, onMusicStart, petalBurst }) {
  const [stage, setStage] = useState('door'); // 'door' | 'welcome' | 'done'

  function handleDoorOpened() {
    petalBurst && petalBurst(40);
    onMusicStart && onMusicStart();
    setStage('welcome');
  }

  function handleWelcomeEnter() {
    setStage('done');
    petalBurst && petalBurst(20);
    onEnter && onEnter();
  }

  return (
    <>
      <AnimatePresence>
        {stage === 'door' && (
          <motion.div
            key="gate"
            className="fixed inset-0 z-[100] w-full max-w-full overflow-hidden overscroll-none touch-none"
            style={{
              background: 'radial-gradient(ellipse at center, #1a0509 0%, #0d0304 70%)',
              height: '100dvh',
              padding: 0,
              margin: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              style={{
                height: '100dvh',
                padding: 0,
                margin: 0,
              }}
            >
              {/* <div className="text-center shrink-0 px-2 pt-2">
                <h1 className="font-cinzel text-xl sm:text-2xl md:text-4xl text-ivory">
                  {config.bride.name} &amp; {config.groom.name}
                </h1>
              </div> */}
              <div className="w-full flex-1 min-h-0" style={{ maxWidth: '100vw' }}>
                <RoyalDoor3D onOpened={handleDoorOpened} />
              </div>
              <p className="shrink-0 text-gold-bright text-xs tracking-[0.14em] uppercase opacity-80 animate-pulse pb-2">
                Tap the door to enter
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <WelcomeSequence visible={stage === 'welcome'} onEnter={handleWelcomeEnter} />
    </>
  );
}

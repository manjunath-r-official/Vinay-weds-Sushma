import { useEffect, useRef, useState } from 'react';
import useLenis from './hooks/useLenis.js';
import AmbientLayer from './components/AmbientLayer.jsx';
import ConfettiLayer from './components/ConfettiLayer.jsx';
import FloatingNav from './components/FloatingNav.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import EntryGate from './layouts/EntryGate.jsx';

import Hero from './sections/Hero.jsx';
import ScratchSurprise from './sections/ScratchSurprise.jsx';
import Couple from './sections/Couple.jsx';
import StoryTimeline from './sections/StoryTimeline.jsx';
import Events from './sections/Events.jsx';
import Countdown from './sections/Countdown.jsx';
import Gallery from './sections/Gallery.jsx';
import PhotoCarousel from './sections/PhotoCarousel.jsx';
import Family from './sections/Family.jsx';
import Venue from './sections/Venue.jsx';
import RSVP from './sections/RSVP.jsx';
import Contact from './sections/Contact.jsx';
import MemoryWall from './sections/MemoryWall.jsx';
import EasterEggs from './sections/EasterEggs.jsx';
import config from './config/config.js';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [musicStartSignal, setMusicStartSignal] = useState(0);
  const ambientLayerRef = useRef(null);
  const confettiLayerRef = useRef(null);
  useLenis({ enabled: entered });

  // Lock page scroll until the guest has passed through the gate.
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = entered ? 'auto' : 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = entered ? 'auto' : 'hidden';
  }, [entered]);

  /** Ambient petal/emoji burst — used for lighter celebratory moments
   *  (door opening, easter eggs) without the heavier confetti effect. */
  function burstAmbient(n) {
    ambientLayerRef.current?.burst(n);
  }

  /** Full celebration — ambient burst + confetti party poppers. Reserved
   *  specifically for the scratch-card date reveal, per design direction. */
  function celebrateWithConfetti(n) {
    //ambientLayerRef.current?.burst(n);
    confettiLayerRef.current?.burst(n);
  }

  return (
    <>
      <AmbientLayer layerRef={ambientLayerRef} />
      <ConfettiLayer layerRef={confettiLayerRef} />

      {!entered && (
        <EntryGate
          onEnter={() => setEntered(true)}
          onMusicStart={() => setMusicStartSignal((count) => count + 1)}
          petalBurst={burstAmbient}
        />
      )}

      <div style={{ opacity: entered ? 1 : 0, transition: 'opacity 1s ease' }}>
        {entered && <FloatingNav />}
        <main className="overflow-x-hidden overflow-y-hidden">
          <Hero />
          <ScratchSurprise onCelebrate={celebrateWithConfetti} />
          <Couple />
          {/* <StoryTimeline /> */}
          <Events />
          {/* <Countdown /> */}
          <Gallery />
          {/* <PhotoCarousel /> */}
          {/* <Family /> */}
          <Venue />
          {/* <RSVP onCelebrate={burstAmbient} /> */}
          <Contact />
          {/* <MemoryWall /> */}
          <EasterEggs onCelebrate={celebrateWithConfetti} />
        </main>
        <footer className="text-center py-16 px-5 text-rose text-[13px] tracking-wide">
          <span className="font-devanagari text-xl block mb-2.5 text-gold-bright">Thank you</span>
          With love, {config.bride.name} &amp; {config.groom.name} - see you at the celebration.
        </footer>
        <MusicPlayer startSignal={musicStartSignal} visible={entered} />
      </div>
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { FiPlay, FiPause } from 'react-icons/fi';
import config from '../config/config.js';

export default function MusicPlayer({ startSignal = 0, visible = true }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(() => {
    if (typeof window === 'undefined') return false;
    const pref = localStorage.getItem('weddingMusicPref');
    return pref !== 'off';
  });

  useEffect(() => {
    if (!config.backgroundMusic) return undefined;

    const audio = new Audio(config.backgroundMusic);
    audio.loop = true;
    audioRef.current = audio;

    const pref = localStorage.getItem('weddingMusicPref');
    const shouldAutoplay = pref !== 'off';

    if (shouldAutoplay) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
      localStorage.setItem('weddingMusicPref', 'on');
    } else {
      audio.pause();
      setPlaying(false);
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || startSignal === 0 || !config.backgroundMusic) return;

    localStorage.setItem('weddingMusicPref', 'on');
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [startSignal]);

  function toggle() {
    const next = !playing;
    setPlaying(next);
    localStorage.setItem('weddingMusicPref', next ? 'on' : 'off');

    if (!audioRef.current) return;

    if (next) {
      audioRef.current.play().catch(() => setPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 pl-2.5 pr-4 py-2.5 rounded-full"
      style={{
        background: 'rgba(38,8,13,.7)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(201,162,75,.3)',
        boxShadow: '0 20px 60px rgba(0,0,0,.45)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
      }}
    >
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="w-[38px] h-[38px] rounded-full bg-gold text-maroon-deep flex items-center justify-center"
      >
        {playing ? <FiPause /> : <FiPlay />}
      </button>
      <div className="flex gap-[2px] items-end h-4">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[3px] bg-gold-bright"
            style={{
              height: playing ? undefined : '4px',
              animation: playing ? `eq 1s ease-in-out ${i * 0.15}s infinite` : 'none',
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes eq { 0%,100% { height: 4px; } 50% { height: 16px; } }
      `}</style>
    </div>
  );
}

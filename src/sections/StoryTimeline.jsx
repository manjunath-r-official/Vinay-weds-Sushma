import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function StoryTimeline() {
  const [activeStep, setActiveStep] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentAnimateIndex, setCurrentAnimateIndex] = useState(0);
  const [viewed, setViewed] = useState(() => new Array(config.saptapadi.length).fill(false));
  const [modalClosing, setModalClosing] = useState(false);

  const handleCloseModal = () => {
    if (modalClosing) return;
    setModalClosing(true);

    if (activeIndex !== null) {
      setViewed((prev) => {
        const next = [...prev];
        next[activeIndex] = true;
        return next;
      });
    }

    // wait for exit animation before unmounting and advancing
    const exitMs = 360;
    setTimeout(() => {
      setModalClosing(false);
      setActiveStep(null);
      setActiveIndex(null);
      setCurrentAnimateIndex((ci) => (ci < config.saptapadi.length - 1 ? ci + 1 : ci));
    }, exitMs);
  };

  useEffect(() => {
    if (!activeStep) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') handleCloseModal();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeStep]);

  return (
    <section id="story" className="section mx-auto max-w-[1180px] px-5 py-28">
      <Reveal className="text-center">
        <span className="mb-3 inline-block tracking-[0.28em] text-[10px] uppercase text-gold-bright">Sacred Ritual</span>
        <h2 className="font-display font-medium text-ivory" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>
          Saptapadi
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[15px] uppercase tracking-[0.18em] text-rose/90">
          Seven sacred steps, one lifelong promise.
        </p>
      </Reveal>

      <style>{`
        @keyframes pulseSlow {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 0.25; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        .animate-pulse-slow { animation: pulseSlow 1600ms ease-in-out infinite; }
      `}</style>

      <div className="relative mx-auto mt-12">
        {config.saptapadi.map((step, index) => {
          const isActive = index === currentAnimateIndex && !viewed[index];
          const allViewed = viewed.every(Boolean);
          return (
            <Reveal key={step.number} className="block">
              <button
                type="button"
                onClick={() => {
                  if (!(isActive || allViewed)) return; // allow only active or after all viewed
                  setActiveStep(step);
                  setActiveIndex(index);
                }}
                aria-disabled={!(isActive || allViewed)}
                className={`group relative block w-full bg-transparent p-0 text-left transition-transform duration-300 ${
                  isActive || allViewed ? 'cursor-pointer' : 'pointer-events-none opacity-90'
                }`}
                style={{ marginTop: index === 0 ? '0' : '-8px', zIndex: 10 - index }}
              >
                <div className="relative overflow-hidden">
                  <img
                      src={step.image}
                      alt={step.title}
                      className={`w-full h-auto object-cover transition duration-500 ${isActive ? 'animate-float-slow' : ''}`}
                    />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#18070d]/60 via-[#18070d]/12 to-transparent" />

                  {/* Interactive indicator only for the active step */}
                  {(isActive || allViewed) && (
                    <div className="absolute right-4 bottom-6 flex items-center justify-center">
                      <span className="block h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm animate-pulse-slow" />
                    </div>
                  )}
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {(activeStep || modalClosing) && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#12070b]/80 p-4 backdrop-blur-sm ${modalClosing ? 'overlay-exit' : 'overlay-enter'}`}
          onClick={handleCloseModal}
        >
          <div
            className={`relative w-full max-w-[740px] overflow-hidden rounded-[30px] border border-gold/30 bg-[#1a090d] shadow-[0_30px_80px_rgba(0,0,0,0.48)] ${modalClosing ? 'modal-content-exit' : 'modal-content-enter'}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className={`relative h-[320px] w-full bg-cover bg-center md:h-[420px] ${modalClosing ? 'modal-exit' : 'modal-enter'}`}
              style={{
                  backgroundImage: `linear-gradient(180deg, rgba(18,7,11,0.15), rgba(18,7,11,0.72)), url(${(activeStep && (activeStep.modalImage || activeStep.image)) || ''})`,
                }}
            >
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 bg-[#12070b]/70 text-xl text-gold-bright"
              >
                ×
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="text-[10px] uppercase tracking-[0.32em] text-gold-bright">Step {activeStep.number}</div>
              <h3 className="mt-3 font-display text-3xl text-ivory md:text-4xl">{activeStep.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-[#f3e7d8] md:text-lg">{activeStep.meaning}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes floatSlow {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-float-slow { animation: floatSlow 2200ms ease-in-out infinite; transform-origin: center; }

        @keyframes modalIn {
          0% { opacity: 0; transform: translateY(8px) scale(0.99); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes modalOut {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(8px) scale(0.99); }
        }
        .modal-enter { animation: modalIn 360ms cubic-bezier(.2,.9,.2,1) both; }
        .modal-exit { animation: modalOut 320ms cubic-bezier(.2,.9,.2,1) both; }
        @keyframes overlayIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes overlayOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .overlay-enter { animation: overlayIn 220ms ease both; }
        .overlay-exit { animation: overlayOut 200ms ease both; }

        @keyframes contentIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.995); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes contentOut {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(10px) scale(0.995); }
        }
        .modal-content-enter { animation: contentIn 360ms cubic-bezier(.2,.9,.2,1) both; }
        .modal-content-exit { animation: contentOut 320ms cubic-bezier(.2,.9,.2,1) both; }
      `}</style>
    </section>
  );
}

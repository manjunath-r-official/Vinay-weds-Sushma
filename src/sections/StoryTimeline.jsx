import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal.jsx';

const saptapadiSteps = [
  {
    number: '01',
    title: 'Pratham Padi',
    meaning: 'We walk together with faith, trust, and a shared purpose.',
    image: '/src/assets/images/1.jpg',
  },
  {
    number: '02',
    title: 'Dvitiiya Padi',
    meaning: 'We nurture strength, harmony, and a life of togetherness.',
    image: '/src/assets/images/2.jpg',
  },
  {
    number: '03',
    title: 'Tritiya Padi',
    meaning: 'We honour prosperity, wisdom, and the blessings of family.',
    image: '/src/assets/images/3.jpg',
  },
  {
    number: '04',
    title: 'Chaturthi Padi',
    meaning: 'We grow in love, comfort, and mutual respect every day.',
    image: '/src/assets/images/4.jpg',
  },
  {
    number: '05',
    title: 'Panchami Padi',
    meaning: 'We cherish courage, compassion, and a life rooted in grace.',
    image: '/src/assets/images/5.jpg',
  },
  {
    number: '06',
    title: 'Shashthi Padi',
    meaning: 'We walk in devotion, loyalty, and the light of union.',
    image: '/src/assets/images/6.jpg',
  },
  {
    number: '07',
    title: 'Saptami Padi',
    meaning: 'We vow to remain one in joy, sorrow, and forever.',
    image: '/src/assets/images/7.jpg',
  },
];

export default function StoryTimeline() {
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    if (!activeStep) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveStep(null);
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

      <div className="relative mx-auto mt-12 max-w-[680px]">
        {saptapadiSteps.map((step, index) => (
          <Reveal key={step.number} className="block">
            <button
              type="button"
              onClick={() => setActiveStep(step)}
              className="group relative mt-[-18px] block w-full rounded-[28px] border border-gold/35 bg-[#1f0c12]/70 p-2 text-left shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1"
              style={{ marginTop: index === 0 ? '0' : '-18px', zIndex: 10 - index }}
            >
              <div className="relative overflow-hidden rounded-[22px] border border-gold/30">
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-[180px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[210px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#18070d]/90 via-[#18070d]/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-gold-bright">Step {step.number}</div>
                    <div className="mt-2 font-display text-2xl text-ivory">{step.title}</div>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 bg-[#1b080d]/70 text-lg text-gold-bright">
                    →
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {activeStep && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#12070b]/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveStep(null)}
        >
          <div
            className="relative w-full max-w-[740px] overflow-hidden rounded-[30px] border border-gold/30 bg-[#1a090d] shadow-[0_30px_80px_rgba(0,0,0,0.48)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="relative h-[320px] w-full bg-cover bg-center md:h-[420px]"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(18,7,11,0.15), rgba(18,7,11,0.72)), url(${activeStep.image})`,
              }}
            >
              <button
                type="button"
                onClick={() => setActiveStep(null)}
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
    </section>
  );
}

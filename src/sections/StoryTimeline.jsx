import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function StoryTimeline() {
  return (
    <section id="story" className="section max-w-[1120px] mx-auto px-5 py-28 overflow-y-hidden">
      <Reveal className="text-center overflow-y-hidden">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">Our Journey</span>
        <h2 className="font-display font-medium text-ivory" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>A Love Story</h2>
        <p className="text-rose italic max-w-md mx-auto mt-2 mb-12">From a college photography club to forever.</p>
      </Reveal>

      <div className="relative mt-10 overflow-x-hidden overflow-y-hidden">
        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold to-transparent" />
        {config.timeline.map((item, i) => {
          const isEven = i % 2 === 1;
          return (
            <Reveal
              key={item.year}
              variant={isEven ? 'slideRight' : 'slideLeft'}
              className={`relative mb-14 pl-16 md:pl-0 md:w-1/2 overflow-x-hidden overflow-y-hidden ${
                isEven ? 'md:ml-1/2 md:pl-14 md:text-left' : 'md:pr-14 md:text-right'
              }`}
              // Tailwind can't do dynamic ml-1/2 reliably; inline style fallback below
            >
              <div
                className="md:w-full max-w-full"
                style={isEven ? { marginLeft: 'min(50%, 280px)', maxWidth: '280px' } : { maxWidth: '280px' }}
              >
                <span
                  className={`absolute top-1 w-[18px] h-[18px] rounded-full bg-gold-bright shadow-[0_0_0_5px_rgba(201,162,75,0.18)] left-4 md:left-auto ${
                    isEven ? 'md:-left-[9px]' : 'md:-right-[9px]'
                  }`}
                />
                <div className="text-xs text-gold-bright tracking-widest uppercase">{item.year}</div>
                <h4 className="font-display text-2xl text-ivory mt-1.5 mb-2">{item.title}</h4>
                <p className="text-[#e9dcc7] text-[15px] leading-relaxed">{item.text}</p>
                <span className="inline-block mt-2.5 text-lg text-rose animate-heartbeat">♥</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

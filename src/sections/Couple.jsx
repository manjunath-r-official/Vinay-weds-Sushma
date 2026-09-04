import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function Couple() {
  return (
    <section id="couple" className="couple-bg relative section max-w-[1120px] mx-auto px-5 py-28 overflow-y-hidden">
      <div className="relative z-10">
      <Reveal className="text-center overflow-x-hidden overflow-y-hidden">
        <span className="inline-block tracking-[0.28em] uppercase text-xs mb-3" style={{ color: config.theme.colors.goldBright }}>
          The Couple
        </span>
        <h2 className="font-display font-medium" style={{ fontSize: 'clamp(34px,6vw,58px)', color: config.theme.colors.maroonDeep }}>
          With Love &amp; Blessings
        </h2>
        <p className="italic max-w-md mx-auto mt-2 mb-12" style={{ color: config.theme.colors.maroonDeep }}>
          Two families, joined by the love of their children.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 text-center">
        <Reveal variant="slideLeft">
          <img
            src={config.bride.photo}
            alt={config.bride.fullName}
            className="w-[170px] h-[170px] rounded-full object-cover border-4 border-gold shadow-royal mx-auto"
          />
          <h3 className="font-display text-3xl mt-5 mb-1" style={{ color: config.theme.colors.emerald }}>{config.bride.name}</h3>
          <div className="text-xs tracking-widest uppercase mb-3" style={{ color: config.theme.colors.maroonDeep }}>The Bride</div>
          <p className="leading-relaxed" style={{ color: config.theme.colors.ink }}>Daughter of {config.bride.parents}</p>
          <p className="leading-relaxed mt-2" style={{ color: config.theme.colors.ink }}>{config.bride.story}</p>
        </Reveal>

        <Reveal variant="slideRight">
          <img
            src={config.groom.photo}
            alt={config.groom.fullName}
            className="w-[170px] h-[170px] rounded-full object-cover border-4 border-gold shadow-royal mx-auto"
          />
          <h3 className="font-display text-3xl mt-5 mb-1" style={{ color: config.theme.colors.emerald }}>{config.groom.name}</h3>
          <div className="text-xs tracking-widest uppercase mb-3" style={{ color: config.theme.colors.maroonDeep }}>The Groom</div>
          <p className="leading-relaxed" style={{ color: config.theme.colors.ink }}>Son of {config.groom.parents}</p>
          <p className="leading-relaxed mt-2" style={{ color: config.theme.colors.ink }}>{config.groom.story}</p>
        </Reveal>
      </div>

      <Reveal variant="scale" className="mt-16 max-w-xl mx-auto text-center">
        <p className="font-display italic text-2xl leading-relaxed" style={{ color: config.theme.colors.maroonDeep }}>“{config.quote.text}”</p>
        <span className="block mt-3 text-sm tracking-widest not-italic" style={{ color: config.theme.colors.goldBright }}>— {config.quote.by}</span>
      </Reveal>
      </div>

      <style>{`
        /* Decorative repeating vertical background for Couple section.
           The image path is read from config.coupleSection.backgroundImage.
        */
        .couple-bg {
          background-image: url('${config.coupleSection?.backgroundImage || '/src/assets/images/couple-bg.png'}');
          background-repeat: repeat-y;
          background-position: center top;
          background-size: 100% auto; /* stretch to width, preserve aspect ratio */
        }
      `}</style>
    </section>
  );
}

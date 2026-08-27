import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function Couple() {
  return (
    <section id="couple" className="section max-w-[1120px] mx-auto px-5 py-28 overflow-y-hidden">
      <Reveal className="text-center overflow-x-hidden overflow-y-hidden">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">
          The Couple
        </span>
        <h2 className="font-display font-medium text-ivory" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>
          With Love &amp; Blessings
        </h2>
        <p className="text-rose italic max-w-md mx-auto mt-2 mb-12">
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
          <h3 className="font-display text-3xl text-gold-bright mt-5 mb-1">{config.bride.name}</h3>
          <div className="text-rose text-xs tracking-widest uppercase mb-3">The Bride</div>
          <p className="text-[#e9dcc7] leading-relaxed">Daughter of {config.bride.parents}</p>
          <p className="text-[#e9dcc7] leading-relaxed mt-2">{config.bride.story}</p>
        </Reveal>

        <Reveal variant="slideRight">
          <img
            src={config.groom.photo}
            alt={config.groom.fullName}
            className="w-[170px] h-[170px] rounded-full object-cover border-4 border-gold shadow-royal mx-auto"
          />
          <h3 className="font-display text-3xl text-gold-bright mt-5 mb-1">{config.groom.name}</h3>
          <div className="text-rose text-xs tracking-widest uppercase mb-3">The Groom</div>
          <p className="text-[#e9dcc7] leading-relaxed">Son of {config.groom.parents}</p>
          <p className="text-[#e9dcc7] leading-relaxed mt-2">{config.groom.story}</p>
        </Reveal>
      </div>

      <Reveal variant="scale" className="mt-16 max-w-xl mx-auto text-center">
        <p className="font-display italic text-rose text-2xl leading-relaxed">“{config.quote.text}”</p>
        <span className="block mt-3 text-sm text-gold-bright tracking-widest not-italic">— {config.quote.by}</span>
      </Reveal>
    </section>
  );
}

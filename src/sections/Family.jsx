import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function Family() {
  return (
    <section id="family" className="section max-w-[1120px] mx-auto px-5 py-28 overflow-y-hidden">
      <Reveal className="text-center overflow-y-hidden">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">With Gratitude</span>
        <h2 className="font-display font-medium text-ivory mb-12" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>Our Families</h2>
      </Reveal>

      <div className="grid gap-8 text-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
        {config.family.map((f, i) => (
          <Reveal key={f.name} variant="scale" delay={i * 0.08}>
            <img
              src={f.photo}
              alt={f.name}
              loading="lazy"
              className="w-[110px] h-[110px] rounded-full object-cover border-[3px] border-gold mx-auto"
            />
            <h5 className="mt-3 mb-0.5 text-[17px] text-ivory">{f.name}</h5>
            <div className="text-xs text-rose uppercase tracking-wider">{f.relation}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

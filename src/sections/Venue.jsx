import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function Venue() {
  const { venue } = config;
  return (
    <section id="venue" className="section max-w-[1120px] mx-auto px-5 py-28">
      <Reveal className="text-center">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">Find Us</span>
        <h2 className="font-display font-medium text-ivory mb-12" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>The Venue</h2>
      </Reveal>

      <Reveal
        variant="rise"
        className="rounded-[20px] p-9 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 items-center"
        style={{ background: 'rgba(201,162,75,.06)', border: '1px solid rgba(201,162,75,.28)' }}
      >
          <div>
            <h3 className="font-display text-[28px] text-gold-bright mb-2">{venue.name}</h3>
            <p className="text-[#e9dcc7] leading-relaxed">{venue.address}</p>
            <p className="text-[#e9dcc7] text-sm leading-relaxed mt-2">{venue.parkingInfo}</p>
            {/* {venue.hotelsNearby?.length > 0 && (
              <ul className="mt-3 text-sm text-rose space-y-1">
                {venue.hotelsNearby.map((h) => (
                  <li key={h.name}>{h.name} — {h.distance}</li>
                ))}
              </ul>
            )} */}
            <div className="flex gap-3 flex-wrap mt-5">
              <a
                href={venue.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold text-maroon-deep font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Open in Google Maps
              </a>
              <a
                href={venue.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-gold text-gold-bright font-semibold text-sm hover:-translate-y-0.5 transition-all"
              >
                Get Directions
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden h-[240px] border" style={{ borderColor: 'rgba(201,162,75,.3)' }}>
            <iframe
              src={venue.mapsEmbed}
              title="Venue map"
              loading="lazy"
              className="w-full h-full border-0"
              style={{ filter: 'sepia(.3) saturate(1.3)' }}
            />
          </div>
      </Reveal>
    </section>
  );
}

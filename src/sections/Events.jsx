import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

/**
 * Each event renders as a full-width row. Content (icon/name/date/details)
 * alternates sides: 1st event's content sits on the left, 2nd on the right,
 * 3rd back on the left, and so on — per your spec. The opposite side shows
 * a decorative accent panel, which becomes a real photo automatically if
 * you set `backgroundImage` on that event in config.js (fully optional).
 *
 * The whole section can also take one global background image via
 * `config.eventsSection.sectionBackgroundImage` — also optional.
 */
export default function Events() {
  const { eventsSection } = config;
  const hasSectionBg = Boolean(eventsSection?.sectionBackgroundImage);

  return (
    <section id="events" className="relative">
      {hasSectionBg && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${eventsSection.sectionBackgroundImage})` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{ background: `rgba(38,8,13,${eventsSection.sectionBackgroundOverlayOpacity ?? 0.55})` }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative section max-w-[1120px] mx-auto px-5 py-28">
        <Reveal className="text-center">
          <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">Celebrations</span>
          <h2 className="font-display font-medium text-ivory" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>Wedding Events</h2>
          <p className="text-rose italic max-w-md mx-auto mt-2 mb-16">Five days of colour, music, and joy.</p>
        </Reveal>

        <div className="flex flex-col gap-10">
          {config.events.map((ev, i) => {
            const contentOnLeft = i % 2 === 0; // 1st, 3rd, 5th... on the left
            return (
              <Reveal key={ev.name} variant={contentOnLeft ? 'slideLeft' : 'slideRight'} delay={i * 0.05}>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border transform-gpu"
                  style={{
                    borderColor: 'rgba(255,255,255,0.06)',
                    borderWidth: '1px',
                    background: 'rgba(255,255,255,0.02)',
                    boxShadow: '0 12px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    perspective: 1400,
                  }}
                  whileHover={{ rotateX: 3, rotateY: -6, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {/* Content block (glass card) */}
                  <div
                    className={`p-6 md:p-10 flex flex-col justify-center ${contentOnLeft ? 'md:order-1' : 'md:order-2'}`}
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))',
                      borderRight: contentOnLeft ? '1px solid rgba(255,255,255,0.02)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-gold/20 to-transparent text-2xl text-gold-bright shadow-md transform-gpu">
                        {ev.icon}
                      </div>
                      <div>
                        <h4 className="font-display text-2xl md:text-3xl text-ivory leading-tight">{ev.name}</h4>
                        <div className="text-rose text-xs tracking-wide mt-1">{ev.date} · {ev.time}</div>
                      </div>
                    </div>

                    <p className="text-[#e9dcc7] text-[15px] leading-relaxed mb-4">{ev.description}</p>

                    <div className="mt-auto flex items-center justify-start gap-4">
                      <div>
                        <p className="text-[#e9dcc7] text-sm mb-1">{ev.venue}</p>
                        <div className="text-gold text-xs uppercase tracking-wider">{ev.dressCode}</div>
                      </div>
                    </div>
                  </div>

                  {/* Accent / photo block — modern image with overlay */}
                  <div
                    className={`relative min-h-[220px] md:min-h-0 flex items-center justify-center overflow-hidden ${contentOnLeft ? 'md:order-2' : 'md:order-1'}`}
                  >
                    {ev.backgroundImage ? (
                      <>
                        <img src={ev.backgroundImage} alt={ev.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1200 ease-in-out" style={{ transformOrigin: 'center' }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/8" />
                        <div className="absolute -inset-2 bg-white/3 blur-2xl transform-gpu opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </>
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">
                        <div className="rounded-full w-[220px] h-[220px] bg-gradient-to-tr from-[#c9a24b]/12 to-transparent blur-[40px]" />
                        <span className="text-[88px] opacity-20 select-none z-10">{ev.icon}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

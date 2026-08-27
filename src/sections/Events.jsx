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
                  className="grid grid-cols-1 md:grid-cols-2 rounded-[20px] overflow-hidden border"
                  style={{ borderColor: 'rgba(201,162,75,.28)' }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Content block */}
                  <div
                    className={`p-8 md:p-10 flex flex-col justify-center ${contentOnLeft ? 'md:order-1' : 'md:order-2'}`}
                    style={{ background: 'linear-gradient(160deg, rgba(201,162,75,.1), rgba(201,162,75,.02))' }}
                  >
                    <div className="text-3xl mb-3">{ev.icon}</div>
                    <h4 className="font-display text-3xl text-gold-bright mb-1.5">{ev.name}</h4>
                    <div className="text-rose text-xs mb-4 tracking-wide">{ev.date} · {ev.time}</div>
                    <p className="text-[#e9dcc7] text-[15px] leading-relaxed mb-3">{ev.description}</p>
                    <p className="text-[#e9dcc7] text-sm mb-1">{ev.venue}</p>
                    <div className="text-gold text-xs uppercase tracking-wider mt-2">{ev.dressCode}</div>
                  </div>

                  {/* Accent / photo block — shows the optional backgroundImage if set,
                      otherwise a themed gradient with the event icon large & soft */}
                  <div
                    className={`relative min-h-[200px] md:min-h-0 flex items-center justify-center ${contentOnLeft ? 'md:order-2' : 'md:order-1'}`}
                    style={
                      ev.backgroundImage
                        ? {
                            backgroundImage: `url(${ev.backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }
                        : {
                            background:
                              'radial-gradient(circle at 50% 50%, rgba(201,162,75,.18), rgba(38,8,13,.4))',
                          }
                    }
                  >
                    {!ev.backgroundImage && (
                      <span className="text-[90px] opacity-25 select-none" aria-hidden="true">
                        {ev.icon}
                      </span>
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

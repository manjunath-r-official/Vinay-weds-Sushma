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
                  className="relative rounded-2xl overflow-hidden transform-gpu group event-card"
                  style={{
                    borderColor: 'rgba(255,255,255,0.06)',
                    borderWidth: '1px',
                    boxShadow: '0 18px 45px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    perspective: 1400,
                    backgroundImage: ev.backgroundImage ? `url(${ev.backgroundImage})` : undefined,
                    backgroundSize: ev.backgroundImage ? 'cover' : undefined,
                    backgroundPosition: ev.backgroundImage ? (contentOnLeft ? 'right center' : 'left center') : undefined,
                    backgroundColor: ev.backgroundImage ? undefined : 'rgba(255,255,255,0.02)'
                  }}
                  whileHover={{ rotateX: 3, rotateY: -6, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {/* backdrop overlay to ensure readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/12 z-0" aria-hidden="true" />

                  {/* moving glow behind the content (above bg image, below content) */}
                  <div className="absolute inset-0 pointer-events-none card-glow" aria-hidden="true" />

                  {/* Content block sits above the backdrop */}
                  <div
                    className={`relative z-10 p-6 md:p-10 flex flex-col justify-center event-content-panel ${contentOnLeft ? 'content-left' : 'content-right'}`}
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
                      maxWidth: '65%',
                      marginLeft: contentOnLeft ? '0' : 'auto',
                      marginRight: contentOnLeft ? 'auto' : '0',
                      borderRadius: '12px'
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-full ${contentOnLeft ? '' : 'text-right'}`}>
                          <h4 className="font-display text-2xl md:text-3xl leading-tight" style={{ color: (config.theme.colorsByEvent && config.theme.colorsByEvent[ev.name]?.heading) || config.theme.colors.maroon }}>
                            {ev.name}
                          </h4>
                          <div className="text-xs tracking-wide mt-1" style={{ color: (config.theme.colorsByEvent && config.theme.colorsByEvent[ev.name]?.sub) || config.theme.colors.rose }}>{ev.date} · {ev.time}</div>
                        </div>
                    </div>

                    <p className="text-[15px] leading-relaxed mb-4" style={{ color: config.theme.colors.ivory }}>{ev.description}</p>

                    <div className="mt-auto">
                      <p className="text-sm mb-1" style={{ color: config.theme.colors.ivory }}>{ev.venue}</p>
                      <div className="text-xs uppercase tracking-wider" style={{ color: config.theme.colors.gold }}>{ev.dressCode}</div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
        <style>{`
          /* Keep left/right alignment consistent on all sizes */
          .event-content-panel.content-left { text-align: left; }
          .event-content-panel.content-right { text-align: right; }

          /* animated glowing blobs behind each card */
          .card-glow {
            z-index: 8; /* above overlay (z-0) but below content (z-10) */
            filter: blur(28px);
            opacity: 1;
            mix-blend-mode: screen;
            background-image: radial-gradient(700px 350px at 15% 35%, rgba(201,162,75,0.32), transparent 28%),
                              radial-gradient(500px 260px at 85% 65%, rgba(226,200,96,0.22), transparent 36%);
            transform: translate3d(0,0,0) scale(1.02);
            animation: glowMove 14s ease-in-out infinite;
            transition: opacity 0.6s ease, transform 0.6s ease;
          }

          @keyframes glowMove {
            0% { transform: translateX(-6%) translateY(0) rotate(0deg); }
            25% { transform: translateX(6%) translateY(-3%) rotate(8deg); }
            50% { transform: translateX(-4%) translateY(3%) rotate(0deg); }
            75% { transform: translateX(4%) translateY(-2%) rotate(-6deg); }
            100% { transform: translateX(-6%) translateY(0) rotate(0deg); }
          }

            /* Desktop-only (leave mobile layout spacing untouched) */
            @media (min-width: 1024px) {
              .event-card { transition: transform 0.6s cubic-bezier(.2,.8,.2,1), box-shadow 0.6s; }
              .event-card:hover { transform: rotateX(4deg) rotateY(-8deg) scale(1.03); box-shadow: 0 28px 70px rgba(2,6,23,0.75); }

                /* 3D layered edge effect */
                .event-card::before,
                .event-card::after {
                  content: '';
                  position: absolute;
                  inset: 10px;
                  border-radius: 18px;
                  z-index: 0;
                  transition: transform 0.6s cubic-bezier(.2,.8,.2,1), opacity 0.6s;
                  pointer-events: none;
                }
                .event-card::before {
                  background: linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.02));
                  transform: translate3d(12px, 14px, 0) scale(0.995);
                  opacity: 0.9;
                }
                .event-card::after {
                  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
                  transform: translate3d(6px, 8px, 0) scale(0.997);
                  opacity: 0.7;
                }

                .event-card:hover::before { transform: translate3d(6px, 8px, 0) scale(0.998); opacity: 0.7; }
                .event-card:hover::after { transform: translate3d(3px, 4px, 0) scale(0.999); opacity: 0.85; }

              .event-content-panel { max-width: 55% !important; padding: 2.25rem !important; border-radius: 16px !important; }
              .event-content-panel.content-left { margin-left: 0 !important; margin-right: auto !important; }
              .event-content-panel.content-right { margin-right: 0 !important; margin-left: auto !important; }

              /* Slight stronger parallax on background for large screens */
              .event-card[style] { background-size: cover; }
            }
        `}</style>
      </div>
    </section>
  );
}

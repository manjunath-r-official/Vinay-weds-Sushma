import config from '../config/config.js';
import heroSmall from '../assets/images/hero_small.png';
import heroBig from '../assets/images/hero_big.png';

export default function Hero() {
  const groom = config.groom?.name || 'Groom';
  const bride = config.bride?.name || 'Bride';

  return (
    <section id="hero" className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 z-30 god-badge" aria-hidden="true" style={{ top: config.coupleSection?.godTop || '2%' }}>
        {config.coupleSection?.godImage && (
          <img src={config.coupleSection.godImage} alt="" style={{ width: 44, height: 'auto', display: 'block', margin: '0 auto' }} />
        )}
        {config.coupleSection?.godSubtitle && (
          <div style={{ textAlign: 'center', marginTop: 6, fontSize: '8px', color: config.theme.colors.maroon, opacity: 0.9 }}>
            {config.coupleSection.godSubtitle}
          </div>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        .hero-bg {
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 15vh; /* place title ~20% from top */
          background-image: url('${heroSmall}');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }

        .god-badge { }

        @media (min-width: 768px) {
          .hero-bg { background-image: url('${heroBig}'); }
        }

        .hero-overlay {
          width: 36%;
          max-width: 640px;
          padding: 0rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          position: relative;
          z-index: 40;
        }

        @media (max-width: 640px) {
          .hero-overlay { width: 80%; margin-bottom: 2rem; }
        }

        .hero-intro {
          margin-bottom: 1.3rem;
          font-size: clamp(15px, 1.8vw, 16px);
          color: ${config.theme.colors.maroon};
          text-transform: none;
          opacity: 0.92;
          max-width: 56ch;
          line-height: 1.4;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          font-family: 'Great Vibes', ${config.theme.fonts.display}, cursive;
        }

        .hero-title {
          font-family: 'Great Vibes', ${config.theme.fonts.cinzel}, ${config.theme.fonts.display}, cursive;
          color: ${config.theme.colors.maroonDeep};
          font-size: clamp(40px, 12vw, 96px);
          line-height: 0.9;
          text-align: center;
          letter-spacing: -0.02em;
          text-shadow: 0 8px 28px rgba(0,0,0,0.45);
        }
      `}</style>

      <div className="hero-bg">
        <div className="hero-overlay">
          <div>
            <p className="hero-intro">Together with our families, we solicite your gracious presence and blessings on the auspicious occasion of the wedding celebration of</p>
            <h1 className="hero-title">{groom} <span style={{ display: 'block', fontSize: '0.45em', opacity: 0.9 }}>and</span> {bride}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

import config from '../config/config.js';
import heroSmall from '../assets/images/hero_small.png';
import heroBig from '../assets/images/hero_big.png';

export default function Hero() {
  const groom = config.groom?.name || 'Groom';
  const bride = config.bride?.name || 'Bride';

  return (
    <section id="hero" className="relative">
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

        @media (min-width: 768px) {
          .hero-bg { background-image: url('${heroBig}'); }
        }

        .hero-overlay {
          width: 100%;
          max-width: 1200px;
          padding: 3.5rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-title {
          font-family: 'Great Vibes', ${config.theme.fonts.cinzel}, ${config.theme.fonts.display}, cursive;
          color: ${config.theme.colors.maroonDeep};
          font-size: clamp(40px, 12vw, 96px);
          line-height: 0.9;
          text-align: center;
          letter-spacing: -0.02em;
          text-shadow: 0 6px 18px rgba(0,0,0,0.2);
        }

        .hero-sub {
          margin-top: 0.6rem;
          font-size: clamp(14px, 2.2vw, 20px);
          color: ${config.theme.colors.maroon};
          text-transform: none;
          opacity: 0.95;
        }
      `}</style>

      <div className="hero-bg">
        <div className="hero-overlay">
          <div>
            <h1 className="hero-title">{groom} <span style={{ display: 'block', fontSize: '0.45em', opacity: 0.9 }}>weds</span> {bride}</h1>
            <p className="hero-sub">Together with their families</p>
          </div>
        </div>
      </div>
    </section>
  );
}

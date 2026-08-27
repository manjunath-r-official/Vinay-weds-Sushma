import ganeshaImage from '../assets/images/lordganesha.png';

export default function WelcomeSequence({ visible, onEnter }) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex w-full max-w-full flex-col items-center justify-center overflow-hidden text-center"
      style={{
        background: 'radial-gradient(ellipse at center, #2a0a10, #170509)',
      }}
    >
      <div className="mb-5 max-w-[min(84vw,420px)]">
        <img
          src={ganeshaImage}
          alt="Ganesha idol"
          className="w-[240px] h-[240px] md:w-[300px] md:h-[300px] object-contain max-w-full"
        />
      </div>

      <div
        className="font-devanagari text-gold-bright"
        style={{ fontSize: 'clamp(30px,7vw,54px)' }}
      >
        ಸುಸ್ವಾಗತ
      </div>

      <div className="mt-2 text-ivory text-[13px] uppercase tracking-[0.2em]">
        Welcome to our wedding
      </div>

      <button
        className="mt-9 px-9 py-3.5 rounded-full border border-gold text-gold-bright text-[13px] uppercase tracking-[0.12em] hover:bg-gold hover:text-maroon-deep transition-colors"
        onClick={onEnter}
      >
        Begin the Journey
      </button>
    </div>
  );
}

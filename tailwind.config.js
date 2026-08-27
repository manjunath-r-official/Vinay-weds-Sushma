/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: '#3B0D14', deep: '#26080D' },
        gold: { DEFAULT: '#C9A24B', bright: '#E8C874', dim: '#7a5a24' },
        ivory: '#F6ECD9',
        emerald: '#0F5C4A',
        rose: '#E3B7A0',
        ink: '#241008',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        body: ['"Mukta"', 'sans-serif'],
        devanagari: ['"Tiro Devanagari Hindi"', 'serif'],
      },
      boxShadow: {
        royal: '0 20px 60px rgba(0,0,0,.45)',
      },
      transitionTimingFunction: {
        royal: 'cubic-bezier(.19,1,.22,1)',
        soft: 'cubic-bezier(.4,0,.2,1)',
      },
      keyframes: {
        flicker: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.72 } },
        heartbeat: { '0%,100%': { transform: 'scale(1)' }, '25%': { transform: 'scale(1.2)' } },
        bob: { '0%,100%': { transform: 'translate(-50%,0)' }, '50%': { transform: 'translate(-50%,8px)' } },
      },
      animation: {
        flicker: 'flicker 2.4s ease-in-out infinite',
        heartbeat: 'heartbeat 1.8s ease-in-out infinite',
        bob: 'bob 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

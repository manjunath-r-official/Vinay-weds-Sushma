import { motion } from 'framer-motion';

/**
 * Wraps children in a fade+rise reveal that triggers once when scrolled
 * into view. Use `variant` to pick a different signature animation for
 * sections that want to stand out (per the "no repeated effects" brief).
 */
const variants = {
  rise: {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1 },
  },
  clip: {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    show: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0 },
  },
};

export default function Reveal({ children, variant = 'rise', delay = 0, className = '', style, as = 'div' }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={`${className} overflow-x-hidden overflow-y-hidden`.trim()}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants[variant] || variants.rise}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay }}
    >
      {children}
    </Comp>
  );
}

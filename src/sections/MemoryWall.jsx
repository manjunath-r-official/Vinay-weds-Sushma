import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function MemoryWall() {
  const [notes, setNotes] = useState(
    config.memoryWallSeed.map((n, i) => ({ ...n, id: `seed-${i}`, hearts: 0 }))
  );
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const note = { id: Date.now(), name: name.trim(), message: message.trim(), hearts: 0 };
    setNotes((prev) => [note, ...prev]);
    setName('');
    setMessage('');

    if (config.memoryWallEndpoint) {
      try {
        await fetch(config.memoryWallEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note),
        });
      } catch (err) {
        console.error('Memory wall submit failed', err);
      }
    }
  }

  function addHeart(id) {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, hearts: n.hearts + 1 } : n)));
  }

  return (
    <section id="memories" className="section max-w-[1120px] mx-auto px-5 py-28">
      <Reveal className="text-center">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">Leave a Wish</span>
        <h2 className="font-display font-medium text-ivory mb-10" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>Memory Wall</h2>
      </Reveal>

      <form onSubmit={handleSubmit} className="flex gap-2.5 max-w-xl mx-auto mb-9 flex-wrap justify-center">
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 min-w-[160px] px-3.5 py-3 rounded-lg text-ivory"
          style={{ background: 'rgba(246,236,217,.06)', border: '1px solid rgba(201,162,75,.3)' }}
        />
        <input
          placeholder="Your wish for the couple"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="flex-1 min-w-[220px] px-3.5 py-3 rounded-lg text-ivory"
          style={{ background: 'rgba(246,236,217,.06)', border: '1px solid rgba(201,162,75,.3)' }}
        />
        <button type="submit" className="px-6 py-3 rounded-full bg-gold text-maroon-deep font-semibold text-sm">
          Post
        </button>
      </form>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        <AnimatePresence initial={false}>
          {notes.map((n) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-2xl p-4.5 p-[18px]"
              style={{ background: 'rgba(201,162,75,.08)', border: '1px solid rgba(201,162,75,.22)' }}
            >
              <div className="text-gold-bright text-[13px] tracking-wide mb-1.5">{n.name}</div>
              <div className="text-sm leading-relaxed text-[#e9dcc7]">{n.message}</div>
              <button
                onClick={() => addHeart(n.id)}
                className="mt-2.5 flex items-center gap-1.5 text-rose text-sm hover:text-gold-bright transition-colors"
                aria-label="Send love"
              >
                ♥ <span>{n.hearts}</span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

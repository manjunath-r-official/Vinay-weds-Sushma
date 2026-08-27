import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function RSVP({ onCelebrate }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', guests: '1', attend: 'Joyfully Accepts', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    if (config.rsvpEndpoint) {
      try {
        await fetch(config.rsvpEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } catch (err) {
        // Fail soft — still show success to the guest, log for the couple to debug.
        console.error('RSVP submit failed', err);
      }
    } else {
      console.log('RSVP (no endpoint configured):', form);
    }
    setSubmitted(true);
    onCelebrate && onCelebrate(30);
  }

  return (
    <section id="rsvp" className="section max-w-[1120px] mx-auto px-5 py-28">
      <Reveal className="text-center">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">Kindly Respond</span>
        <h2 className="font-display font-medium text-ivory" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>RSVP</h2>
        <p className="text-rose italic max-w-md mx-auto mt-2 mb-12">We'd be honoured to have you celebrate with us.</p>
      </Reveal>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            className="max-w-lg mx-auto grid gap-4"
            onSubmit={handleSubmit}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
          >
            <Field label="Full Name">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rsvp-input" />
            </Field>
            <Field label="Phone Number">
              <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rsvp-input" />
            </Field>
            <Field label="Number of Guests">
              <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="rsvp-input">
                {['1', '2', '3', '4', '5+'].map((g) => <option key={g}>{g}</option>)}
              </select>
            </Field>
            <Field label="Attendance">
              <select value={form.attend} onChange={(e) => setForm({ ...form, attend: e.target.value })} className="rsvp-input">
                <option>Joyfully Accepts</option>
                <option>Regretfully Declines</option>
              </select>
            </Field>
            <Field label="Message for the Couple">
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rsvp-input" />
            </Field>
            <button
              type="submit"
              className="justify-self-start px-7 py-3.5 rounded-full bg-gold text-maroon-deep font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Send RSVP
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            className="text-center py-10 px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-5xl text-gold-bright"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.15, 1] }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              ✓
            </motion.div>
            <h3 className="font-display text-2xl text-gold-bright mt-3">Thank you!</h3>
            <p className="text-rose">Your RSVP has been received with love.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .rsvp-input {
          width: 100%; padding: 14px 16px;
          background: rgba(246,236,217,.06);
          border: 1px solid rgba(201,162,75,.35);
          border-radius: 10px; color: #F6ECD9; font-size: 15px; font-family: inherit;
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-rose mb-1.5">{label}</label>
      {children}
    </div>
  );
}

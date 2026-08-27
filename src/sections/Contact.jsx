import { FiPhone, FiMessageCircle, FiMail, FiMapPin } from 'react-icons/fi';
import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

export default function Contact() {
  const { contacts, venue } = config;
  const items = [
    { label: 'Call Groom', icon: <FiPhone />, href: `tel:${contacts.groomPhone}` },
    { label: 'Call Bride', icon: <FiPhone />, href: `tel:${contacts.bridePhone}` },
    { label: 'Call Parents', icon: <FiPhone />, href: `tel:${contacts.parentsPhone}` },
    { label: 'WhatsApp', icon: <FiMessageCircle />, href: `https://wa.me/${contacts.whatsapp}` },
    { label: 'Email Us', icon: <FiMail />, href: `mailto:${contacts.email}` },
    { label: 'Directions', icon: <FiMapPin />, href: venue.mapsLink },
  ];

  return (
    <section id="contact" className="section max-w-[1120px] mx-auto px-5 py-28">
      <Reveal className="text-center">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">Get In Touch</span>
        <h2 className="font-display font-medium text-ivory mb-12" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>Contact</h2>
      </Reveal>

      <Reveal>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          {items.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 py-6 px-3 rounded-2xl text-ivory no-underline transition-all hover:-translate-y-1"
              style={{ background: 'rgba(201,162,75,.07)', border: '1px solid rgba(201,162,75,.25)' }}
            >
              <span className="text-2xl text-gold-bright">{c.icon}</span>
              <span className="text-[13px] tracking-wide">{c.label}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

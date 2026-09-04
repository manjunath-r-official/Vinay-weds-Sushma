import { FiPhone, FiMessageCircle, FiMapPin, FiMail } from 'react-icons/fi';
import Reveal from '../components/Reveal.jsx';
import config from '../config/config.js';

function resolvePath(obj, path) {
  return path.split('.').reduce((acc, p) => (acc && acc[p] !== undefined ? acc[p] : undefined), obj);
}

function iconFor(name) {
  switch ((name || '').toLowerCase()) {
    case 'phone': return <FiPhone />;
    case 'whatsapp': return <FiMessageCircle />;
    case 'mail':
    case 'email': return <FiMail />;
    case 'map':
    case 'maps': return <FiMapPin />;
    default: return <FiPhone />;
  }
}

export default function Contact() {
  const { contacts, venue } = config;

  // If config specifies ordered items, use that. Otherwise fall back to previous behavior.
  const configured = config.contactsSection && Array.isArray(config.contactsSection.items) ? config.contactsSection.items : null;
  const items = [];

  if (configured) {
    for (const it of configured) {
      const value = resolvePath(config, it.source || '');
      if (!value) continue;

      // determine href
      let href = '';
      if (it.hrefTemplate) {
        href = it.hrefTemplate.replace('${value}', encodeURIComponent(value));
      } else if ((it.source || '').includes('email')) {
        href = `mailto:${value}`;
      } else if ((it.source || '').includes('whatsapp')) {
        href = `https://wa.me/${value}`;
      } else if ((it.source || '').includes('mapsLink') || (it.source || '').includes('maps')) {
        href = value;
      } else {
        href = `tel:${value}`;
      }

      items.push({ label: it.label || value, icon: iconFor(it.icon), href });
    }
  } else {
    if (contacts?.groomPhone) items.push({ label: 'Call Groom', icon: <FiPhone />, href: `tel:${contacts.groomPhone}` });
    if (contacts?.bridePhone) items.push({ label: 'Call Bride', icon: <FiPhone />, href: `tel:${contacts.bridePhone}` });
    if (contacts?.parentsPhone) items.push({ label: 'Call Parents', icon: <FiPhone />, href: `tel:${contacts.parentsPhone}` });
    if (contacts?.whatsapp) items.push({ label: 'WhatsApp', icon: <FiMessageCircle />, href: `https://wa.me/${contacts.whatsapp}` });
    if (contacts?.email) items.push({ label: 'Email Us', icon: <FiMail />, href: `mailto:${contacts.email}` });
    if (venue?.mapsLink) items.push({ label: 'Directions', icon: <FiMapPin />, href: venue.mapsLink });
  }

  const titleSmall = config.contactsSection?.titleSmall || 'Get In Touch';
  const titleMain = config.contactsSection?.title || 'Contact';

  return (
    <section id="contact" className="section max-w-[1120px] mx-auto px-5 py-28">
      <Reveal className="text-center">
        <span className="inline-block tracking-[0.28em] uppercase text-xs text-gold-bright mb-3">{titleSmall}</span>
        <h2 className="font-display font-medium text-ivory mb-12" style={{ fontSize: 'clamp(34px,6vw,58px)' }}>{titleMain}</h2>
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

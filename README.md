# Ananya & Vikram — Royal Wedding Invitation

An ultra-premium, cinematic digital wedding invitation built with React,
GSAP, Framer Motion, and Lenis smooth scroll.

## ✨ What's inside

- **Carved palace door intro** — real temple door photography swung open with
  CSS 3D transforms + GSAP, with a light bloom at the seam and gold particles.
- **Sanskrit welcome sequence** with an animated rangoli (Framer Motion).
- **Save-the-date scratch card** — 2nd section on the page, right after the
  Hero. Scratching reveals the wedding date, fires a confetti party-popper
  burst, and unveils a live ticking countdown just below the card.
- **Every section from the brief**: Hero, Save-the-Date Scratch Card, Couple,
  Love Story Timeline, Events (Haldi/Mehendi/Sangeet/Wedding/Reception —
  alternating left/right layout with optional background images), Countdown,
  Masonry Gallery + Lightbox, autoplaying Photo Slideshow Carousel, Family,
  Venue with embedded map, RSVP form, Contact (tel/WhatsApp/email/maps),
  Memory Wall, floating Music Player, and 4 tappable Easter Eggs.
- **Hidden nav, feather-triggered drawer** — the section nav is hidden by
  default; a peacock-feather icon fixed in the top-right corner (swap in
  your own peacock image via `config.navigation.peacockIcon` any time) opens
  a slide-out drawer with the links.
- **Party popper confetti** — a canvas-based confetti burst, reserved
  specifically for the scratch-card date reveal so it stays a special
  moment rather than firing everywhere.
- **Toggleable ambient background** — `config.ambient.mode` switches between
  falling flower petals, WhatsApp-style flower/leaf emoji with shiny
  butterflies flying across the screen, or off entirely. Fully your call,
  switch anytime in config.
- **Smooth scroll** via Lenis, scroll-reveal animations via Framer Motion.
- **Single configuration file** — `src/config/config.js` — controls every piece of
  text, every image path, dates, venue, contacts, theme colors, the ambient
  effect mode, and optional Events section/card background images.
- Accessible: visible focus states, `prefers-reduced-motion` respected everywhere,
  semantic roles on interactive elements.
- PWA-ready (installable), SEO metadata + Open Graph tags, `robots.txt` + `sitemap.xml`.

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## ✏️ Customizing content

**You should only ever need to edit `src/config/config.js`.** It contains:

- Bride/groom names, parents, bios, photos
- Wedding & reception dates
- Venue name, address, Google Maps link/embed
- Phone numbers, WhatsApp, email
- All 5 events with date/time/venue/dress code/description
- Love story timeline entries
- Gallery images
- Family members
- Scratch-card surprise content
- Background music path
- Theme colors and fonts
- RSVP and Memory Wall backend endpoints (optional)

Replace image paths with your own files placed in `src/assets/images/`.
Replace the music path with an mp3 placed in `src/assets/audio/` (or leave blank
to disable the music player's playback — the UI still renders).

## 🖼️ Adding your own images

1. Drop photos into `src/assets/images/` (e.g. `bride.jpg`, `hero.jpg`, `gallery-1.jpg`).
2. Update the corresponding paths in `src/config/config.js`.
3. For best performance, export photos at reasonable web sizes (under ~500KB each,
   1600px max dimension) — Vite will still optimize and hash them on build.

**Entry door images**: the palace door graphics live at
`src/assets/images/door/door-left.jpg` and `door-right.jpg`, imported directly
in `src/components/RoyalDoor3D.jsx` (not via `config.js`, since they're a
structural part of the intro animation rather than editable content). To
swap them, replace those two files with your own door photography at a
similar portrait aspect ratio (~1:2) — matching pair, same height, so the
seam lines up when closed.

## 🌸 Ambient background: petals or emoji + butterflies

Set `config.ambient.mode` to:
- `'petals'` — soft drifting flower-petal shapes (default)
- `'emoji'` — WhatsApp-style flower/leaf emoji falling naturally
  (`config.ambient.emojiSet`, edit the array to change which emoji appear),
  plus a few shiny butterflies flying independently across the screen
  (`config.ambient.butterflies.enabled` / `.count` / `.emoji`)
- `'off'` — disables the ambient layer entirely

This is a simple one-line toggle — switch it anytime, no other code changes
needed. It also respects `prefers-reduced-motion` automatically.

## 🦚 Navigation: feather-triggered drawer

The section nav bar is hidden by default. A small icon fixed in the
top-right corner (currently a placeholder mark) opens a slide-out drawer
with the links, similar to a hamburger menu. Once you have a real peacock
image ready, drop it in `src/assets/images/` and point
`config.navigation.peacockIcon` at it — no other changes needed. The
feather-icon trigger button itself lives in `src/components/FloatingNav.jsx`
if you want to swap that graphic too (`src/assets/images/feather-icon.png`).

## 🎉 Events section: optional backgrounds & alternating layout

Each event card automatically alternates its content side — the 1st event's
details sit on the left with the accent panel on the right, the 2nd flips,
the 3rd flips back, and so on. This is automatic based on position in the
`events` array, no config needed.

Background images are entirely optional:
- `config.eventsSection.sectionBackgroundImage` — one image behind the whole
  Events section (leave blank for the default themed background)
- Each event's own `backgroundImage` field — overrides just that card's
  accent panel with a photo (leave blank to show the default icon-on-gradient look)

## 🔌 Wiring up RSVP & Memory Wall to a real backend

Both forms currently submit to whatever URL you set in `config.rsvpEndpoint` /
`config.memoryWallEndpoint` (JSON POST). Leave them blank during development —
submissions just log to the console and the UI still shows success states.

Easy options:
- **Formspree** (formspree.io) — create a form, paste the endpoint URL in.
- **Google Sheets** via a Google Apps Script Web App — deploy a script that
  accepts POST and appends a row, paste the deployed URL in.
- Your own API route on Vercel/Netlify Functions.

## 📱 PWA

The manifest is defined in `vite.config.js` (via `vite-plugin-pwa`). Replace
`public/icon-192.png`, `public/icon-512.png`, and `public/apple-touch-icon.png`
with your own artwork before shipping.

## 🏗️ Build

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## ☁️ Deployment

### Netlify
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Netlify: "Add new site" → "Import an existing project" → pick the repo.
3. Build command `npm run build`, publish directory `dist` (already set in
   `netlify.toml`, so Netlify should auto-detect these).
4. Deploy.

### Vercel
1. Push the repo to GitHub.
2. In Vercel: "Add New Project" → import the repo.
3. Framework preset: Vite. Build command/output are already set in `vercel.json`.
4. Deploy.

### GitHub Pages
1. Push to GitHub, on branch `main`.
2. In your repo settings → Pages → set Source to "GitHub Actions".
3. The included workflow at `.github/workflows/deploy-gh-pages.yml` builds and
   deploys automatically on every push to `main`.
4. If your repo is **not** served from the domain root (i.e. it's at
   `username.github.io/repo-name`), set `base: '/repo-name/'` in `vite.config.js`.

### Hostinger (or any static host)
1. Run `npm run build` locally.
2. Upload the contents of the `dist/` folder to your `public_html` (or
   equivalent) directory via Hostinger's File Manager or FTP.
3. Make sure `index.html` sits at the root of that directory.

## 📁 Project structure

```
src/
  components/     Reusable UI: door, petals, nav, music player, reveal wrapper
  animations/     (add custom GSAP timelines here as the project grows)
  hooks/          useLenis (smooth scroll setup)
  assets/         images/ audio/ videos/ — your media files go here
  config/         config.js — the single source of truth for all content
  sections/       One component per page section (Hero, Couple, Events, ...)
  layouts/        EntryGate — orchestrates the door + welcome intro flow
  pages/          (reserved for future multi-page routing via react-router-dom)
  utils/          (reserved for shared helper functions)
  styles/         index.css — Tailwind base + global tokens
```

## ⚙️ Tech stack

React 18 (Vite) · TailwindCSS · Framer Motion · GSAP · Lenis · React Icons ·
React Router (installed, ready if you split into multiple routes) · Lottie
React (installed, ready for any Lottie JSON animations you want to add).

## 🎛️ Performance notes

- Images use `loading="lazy"` outside the hero.
- Manual chunk-splitting in `vite.config.js` keeps motion libraries in a
  separate bundle from the main vendor chunk.
- Scroll animations use `whileInView` with `once: true` so they don't
  re-trigger cost on every scroll pass.
- `prefers-reduced-motion` disables ambient petal spawning and shortens
  all transitions app-wide.

## 📝 License / content

All copy and photo references in `config.js` are placeholder content for
demonstration — replace with your own before sending invitations!

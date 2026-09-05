// ============================================================================
// WEDDING CONFIGURATION
// This is the ONLY file you should need to edit to customize the invitation.
// Replace text, dates, image paths, and links below.
// Image paths should point to files you add in src/assets/images/.
// ============================================================================

// Import assets so Vite includes them in the production build. Keep images
// inside `src/assets/...` and update these imports when swapping photos.
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import img4 from '../assets/images/4.jpg';
import img5 from '../assets/images/5.jpg';
import img6 from '../assets/images/6.jpg';
import haldiImg from '../assets/images/events/haldi.png';
import mehandiImg from '../assets/images/events/mehandi.png';
import receptionImg from '../assets/images/events/reception.png';
import weddingImg from '../assets/images/events/wedding.png';
import sapt1 from '../assets/images/saptapadi/1.png';
import sapt2 from '../assets/images/saptapadi/2.png';
import sapt3 from '../assets/images/saptapadi/3.png';
import sapt4 from '../assets/images/saptapadi/4.png';
import sapt5 from '../assets/images/saptapadi/5.png';
import sapt6 from '../assets/images/saptapadi/6.png';
import sapt7 from '../assets/images/saptapadi/7.png';
import peacockPlaceholder from '../assets/images/peacock-placeholder.svg';
// Background music (replace with your file in src/assets/audio/)
import bgm from '../assets/audio/bgm.mp3';
import coupleBg from '../assets/images/props/bg2.png';
import godImg from '../assets/images/props/god.png';

const config = {
  // ---------------------------------------------------------------- SEO
  seo: {
    siteTitle: 'Sushma & Vinay — Wedding Invitation',
    description: 'Join Sushma & Vinay as they begin their forever. December 2026, New Delhi.',
    url: 'https://sushmavinay.wedding',
    ogImage: '/og-cover.jpg',
  },

  // ------------------------------------------------------------- COUPLE
  bride: {
    name: 'Sushma',
    fullName: 'Sushma.L.P',
    parents: 'Sri B.A. Prakash & Smt. Late Latha',
    photo: img3,
    story:
      '',
  },
  groom: {
    name: 'Vinay',
    fullName: 'Vinay.R',
    parents: 'Late Sri Rudra Aradhya & Smt. Manjula',
    photo: img2,
    story:
      '',
  },
  heroPhoto: img1,

  quote: {
    text: 'Two souls, one heart, one destiny woven in gold thread and temple bells.',
    by: 'Sushma & Vinay',
  },

  welcome: {
    flowerEmojis: ['🌼', '🌸'],
  },

  // ------------------------------------------------------------- DATES
  weddingDate: '2026-09-21T10:00:00',
  receptionDate: '2026-09-20T19:00:00',

  // ------------------------------------------------------------- VENUE
  venue: {
    name: 'The Venue',
    address: 'PRAKRUTHI VILASA',
    mapsLink: 'https://maps.app.goo.gl/fNTzFE3DBAceXFWH9',
    mapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.162777287996!2d77.7175536750741!3d12.832755887470016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6d15b3be0553%3A0xbaa6da78b605a0d4!2sPRAKRUTHI%20VILASA!5e0!3m2!1sen!2sin!4v1787860400033!5m2!1sen!2sin',
    parkingInfo: 'Singena Agrahara Gate, Dommasandra Road, Near Chowdeshwary Nursery, Bengaluru, Karnataka — 560099',
    hotelsNearby: [
      { name: 'The Oberoi, New Delhi', distance: '2.1 km' },
      { name: 'Taj Mahal Hotel', distance: '3.4 km' },
    ],
  },

  // ---------------------------------------------------------- CONTACTS
  contacts: {
    groomPhone: '+917483147151',
    bridePhone: '+917483147151',
    parentsPhone: '+917483147151',
    whatsapp: '917483147151',
    //email: 'hello@sushmavinay.wedding',
  },
  contactsSection: {
    title: 'Get In Touch',
    items: [
      // { source: 'contacts.groomPhone', label: 'Call Vinay', icon: 'phone' },
      // { source: 'contacts.bridePhone', label: 'Call Sushma', icon: 'phone' },
      { source: 'contacts.parentsPhone', label: 'Contact us', icon: 'phone' },
      { source: 'contacts.whatsapp', label: 'WhatsApp', icon: 'whatsapp' },
      { source: 'contacts.email', label: 'Instagram', icon: 'instagram' },
      { source: 'venue.mapsLink', label: 'Directions', icon: 'map' },
    ],
  },
  instagram: 'https://instagram.com/sushmavinay',

  // ------------------------------------------------------------- MUSIC
  // Path to an mp3 in src/assets/audio/. Leave empty string to disable.
  backgroundMusic: bgm,
  // Default background music volume (0.0 - 1.0). Change to 0.0 to mute.
  backgroundMusicVolume: 0.5,
  soundEffects: {
    templeBells: '',
    doorOpen: '',
    petalsFalling: '',
    scratchSound: '',
    confetti: '',
  },

  // ----------------------------------------------------------- THEME
  theme: {
    colors: {
      maroon: '#3B0D14',
      maroonDeep: '#26080D',
      gold: '#C9A24B',
      goldBright: '#E8C874',
      ivory: '#F6ECD9',
      emerald: '#0F5C4A',
      rose: '#E3B7A0',
      ink: '#241008',
      realGold: '#fbbe23'
    },
    // Per-event readable text colors (override defaults for specific events)
    colorsByEvent: {
      Haldi: { heading: '#26080D', sub: '#241008' }, // dark maroon on yellow/white
      Mehendi: { heading: '#0F5C4A', sub: '#241008' }, // deep green on green/white
      Wedding: { heading: '#3B0D14', sub: '#241008' }, // maroon on cream
      Reception: { heading: '#241008', sub: '#8a6b4a' }, // dark ink on white/cream
    },
    fonts: {
      display: '"Cormorant Garamond", serif',
      cinzel: '"Cinzel", serif',
      body: '"Mukta", sans-serif',
      devanagari: '"Tiro Devanagari Hindi", serif',
    },
  },

  // ------------------------------------------------------------ EVENTS
  // `sectionBackgroundImage`: optional full-section background for the whole
  // Events block. Leave empty to use the default themed background.
  // Each event can also set its own `backgroundImage` to override the card's
  // background individually — also optional, leave empty for the default look.
  eventsSection: {
    sectionBackgroundImage: '', // e.g. '/src/assets/images/events-bg.jpg'
    sectionBackgroundOverlayOpacity: 0.55, // darkens the bg image so text stays readable
  },
  coupleSection: {
    backgroundImage: coupleBg,
    godImage: godImg,
    godSubtitle: '|| Sri Nanjundeshwara Swamy Prasanna ||',
    godTop: '2%'
  },
  events: [
    {
      name: 'Haldi',
      icon: '🌼',
      date: 'Sept 20, 2026',
      time: '10:00 PM',
      venue: 'Prakruthi vilasa, Bangalore',
      // dressCode: 'Yellow Attire',
      description: 'A joyful morning of turmeric, laughter, and blessings from both families.',
      backgroundImage: haldiImg, // optional per-card override
    },
    {
      name: 'Mehendi',
      icon: '🌿',
      date: 'Sept 18, 2026',
      time: '10:00 AM',
      venue: 'Aradhya Nilaya, Bangalore',
      // dressCode: 'Green & Gold',
      description: 'Intricate henna, live dhol, and an evening of stories and sweets.',
      backgroundImage: mehandiImg,
    },
    // {
    //   name: 'Sangeet',
    //   icon: '🎶',
    //   date: 'Dec 11, 2026',
    //   time: '7:00 PM',
    //   venue: 'The Leela Palace Lawns',
    //   dressCode: 'Festive Indo-Western',
    //   description: "A night of dance battles between both families — bring your best moves.",
    //   backgroundImage: '/src/assets/images/3.jpg',
    // },
    {
      name: 'Reception',
      icon: '🥂',
      date: 'Sept 20, 2026',
      time: '7:00 PM',
      venue: 'Prakruthi Vilasa, Bangalore',
      // dressCode: 'Formal / Black Tie',
      description: 'An elegant evening to celebrate the newlyweds with dinner and dance.',
      backgroundImage: receptionImg,
    },
    {
      name: 'Wedding',
      icon: '💍',
      date: 'Sept 21, 2026',
      time: '10:00 AM',
      venue: 'Prakruthi Vilasa, Bangalore',
      // dressCode: 'Traditional Indian',
      description: 'Sacred vows exchanged around the holy fire, as our families become one.',
      backgroundImage: weddingImg,
    }
  ],

  // ---------------------------------------------------------- TIMELINE
  timeline: [
    {
      year: '2019',
      title: 'A Chance Meeting',
      text: 'They met at a college photography club, arguing over the correct exposure for a sunset.',
      image: img1,
      video: '',
    },
    {
      year: '2021',
      title: 'First Trip Together',
      text: 'A rainy weekend in Munnar sealed what the photography club started.',
      image: img2,
      video: '',
    },
    {
      year: '2023',
      title: 'He Asked The Big Question',
      text: 'On a rooftop lit with fairy lights, with both families secretly watching from below.',
      image: img3,
      video: '',
    },
    {
      year: '2026',
      title: 'Forever Begins',
      text: 'Two families, one wedding, and a lifetime of filter coffee ahead.',
      image: img4,
      video: '',
    },
  ],

  // ----------------------------------------------------------- GALLERY
  gallery: [
    { src: img1, type: 'image' },
    { src: img2, type: 'image' },
    { src: img3, type: 'image' },
    { src: img4, type: 'image' },
    { src: img5, type: 'image' },
    { src: img6, type: 'image' },
    // { src: '/videos/highlight.mp4', type: 'video', poster: '/images/gallery-1.jpg' },
  ],

  // ------------------------------------------------------- SAPTAPADI IMAGES
  // Configure step images here. Each step can define `image` (thumbnail)
  // and `modalImage` (larger backdrop shown in the modal).
  saptapadi: [
    {
      number: '01',
      title: 'Pratham Padi',
      meaning: 'We walk together with faith, trust, and a shared purpose.',
      image: sapt1,
      modalImage: sapt1,
    },
    {
      number: '02',
      title: 'Dvitiiya Padi',
      meaning: 'We nurture strength, harmony, and a life of togetherness.',
      image: sapt2,
      modalImage: sapt2,
    },
    {
      number: '03',
      title: 'Tritiya Padi',
      meaning: 'We honour prosperity, wisdom, and the blessings of family.',
      image: sapt3,
      modalImage: sapt3,
    },
    {
      number: '04',
      title: 'Chaturthi Padi',
      meaning: 'We grow in love, comfort, and mutual respect every day.',
      image: sapt4,
      modalImage: sapt4,
    },
    {
      number: '05',
      title: 'Panchami Padi',
      meaning: 'We cherish courage, compassion, and a life rooted in grace.',
      image: sapt5,
      modalImage: sapt5,
    },
    {
      number: '06',
      title: 'Shashthi Padi',
      meaning: 'We walk in devotion, loyalty, and the light of union.',
      image: sapt6,
      modalImage: sapt6,
    },
    {
      number: '07',
      title: 'Saptami Padi',
      meaning: 'We vow to remain one in joy, sorrow, and forever.',
      image: sapt7,
      modalImage: sapt7,
    },
  ],

  // ------------------------------------------------------------ FAMILY
  family: [
    { name: 'Dr. Suresh Raghunathan', relation: 'Father of the Bride', photo: '' },
    { name: 'Kavitha Raghunathan', relation: 'Mother of the Bride', photo: '' },
    { name: 'Ramesh Srinivasan', relation: 'Father of the Groom', photo: '' },
    { name: 'Lakshmi Srinivasan', relation: 'Mother of the Groom', photo: '' },
  ],

  // --------------------------------------------------- SCRATCH SURPRISE
  // The scratch card (2nd section, right after the Hero) reveals the
  // wedding date automatically from `weddingDate` above — no need to
  // duplicate the date here. `subtitle` is the line shown under the date
  // once revealed; customize freely.
  scratchSurprise: {
    subtitle: "Mark your calendar - we can't wait to celebrate with you.",
  },

  // ------------------------------------------------------------ RSVP
  // Point this at your backend endpoint (Formspree, Google Sheets via Apps
  // Script, custom API, etc). Leave empty to just log to console.
  rsvpEndpoint: '',

  // --------------------------------------------------------- MEMORY WALL
  // Point this at your backend endpoint. Leave empty to keep wall local
  // (seeded messages + anything the visitor adds in their own session).
  memoryWallEndpoint: '',
  memoryWallSeed: [
    { name: 'Priya', message: 'Wishing you a lifetime of love and laughter! 💛' },
    { name: 'Arjun', message: "Can't wait to dance at the sangeet!" },
  ],

  // ------------------------------------------------------------ EASTER EGGS
  easterEggs: [
    { id: 'moon', icon: '1', message: 'We walk together with faith, trust, and a shared purpose.🌙' },
    { id: 'diya', icon: '2', message: 'We nurture strength, harmony, and a life of togetherness.🪔' },
    { id: 'peacock', icon: '3', message: 'We honour prosperity, wisdom, and the blessings of family.🦚' },
    { id: 'lotus', icon: '4', message: 'We grow in love, comfort, and mutual respect every day. 🪷' },
    { id: 'moon', icon: '5', message: 'We cherish courage, compassion, and a life rooted in grace.🌙' },
    { id: 'diya', icon: '6', message: 'We walk in devotion, loyalty, and the light of union. 🪔' },
    { id: 'peacock', icon: '7', message: 'We vow to remain one in joy, sorrow, and forever. 🦚' },
  ],

  // ------------------------------------------------------------ AMBIENT LAYER
  // Controls the continuous background effect across the whole site.
  // mode: 'petals' (default flower-petal shapes) or 'emoji' (WhatsApp-style
  // flower/leaf emoji + butterflies drifting down, per your request).
  // Toggle freely — everything else about the effect stays the same either way.
  ambient: {
    mode: 'petals', // 'petals' | 'emoji' | 'off'
    spawnIntervalMs: 900,
    //emojiSet: ['🌸', '🌼', '🌷', '🍃', '🌿'],
    emojiSet: ['🌸', '🌼', '🍃', '🌿'], // flowers + leaves, edit freely
    butterflies: {
      enabled: false,
      count: 4,
      emoji: '🦋',
    },
  },

  // ------------------------------------------------------------ NAVIGATION
  // The top nav bar is hidden by default; a feather icon (top-right) opens
  // it as a slide-out drawer instead. Swap `peacockIcon` for your own image
  // whenever you have one ready — until then a placeholder is used.
  navigation: {
    style: 'feather-drawer', // 'feather-drawer' | 'bar' (classic always-visible bar)
    peacockIcon: peacockPlaceholder,
    // Enable or disable the floating navigation (feather trigger + drawer)
    floatingEnabled: false,
  },

  // ------------------------------------------------------------ ANIMATION
  animation: {
    doorOpenDurationS: 1.8,
    lenisSmoothness: 1.1, // higher = smoother/slower
    reduceMotionRespected: true,
  },
};

export default config;

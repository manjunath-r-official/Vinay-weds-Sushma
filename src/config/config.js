// ============================================================================
// WEDDING CONFIGURATION
// This is the ONLY file you should need to edit to customize the invitation.
// Replace text, dates, image paths, and links below.
// Image paths should point to files you add in src/assets/images/.
// ============================================================================

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
    fullName: 'Sushma Raghunathan',
    parents: 'Dr. Suresh & Mrs. Kavitha Raghunathan',
    photo: '/src/assets/images/3.jpg',
    story:
      'A classical dancer with a weakness for filter coffee and old Ilaiyaraaja songs. Sushma believes every celebration deserves marigolds.',
  },
  groom: {
    name: 'Vinay',
    fullName: 'Vinay Srinivasan',
    parents: 'Mr. Ramesh & Mrs. Lakshmi Srinivasan',
    photo: '/src/assets/images/2.jpg',
    story:
      'An engineer who once wrote Sushma a love letter in Python comments. Vinay is happiest with a camera, a cricket bat, or both.',
  },
  heroPhoto: '/src/assets/images/1.jpg',

  quote: {
    text: 'Two souls, one heart, one destiny woven in gold thread and temple bells.',
    by: 'Sushma & Vinay',
  },

  // ------------------------------------------------------------- DATES
  weddingDate: '2026-09-21T09:00:00',
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
    groomPhone: '+919876543210',
    bridePhone: '+919876543211',
    parentsPhone: '+919876543212',
    whatsapp: '919876543210',
    email: 'hello@sushmavinay.wedding',
  },
  instagram: 'https://instagram.com/sushmavinay',

  // ------------------------------------------------------------- MUSIC
  // Path to an mp3 in src/assets/audio/. Leave empty string to disable.
  backgroundMusic: '/src/assets/audio/bgm.mp3',
  soundEffects: {
    templeBells: '/src/assets/audio/temple-bells.mp3',
    doorOpen: '/src/assets/audio/door-open.mp3',
    petalsFalling: '/src/assets/audio/petals.mp3',
    scratchSound: '/src/assets/audio/scratch.mp3',
    confetti: '/src/assets/audio/confetti.mp3',
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
  events: [
    {
      name: 'Haldi',
      icon: '🌼',
      date: 'Dec 10, 2026',
      time: '10:00 AM',
      venue: 'Family Residence, Delhi',
      dressCode: 'Yellow Attire',
      description: 'A joyful morning of turmeric, laughter, and blessings from both families.',
      backgroundImage: '/src/assets/images/1.jpg', // optional per-card override, e.g. '/src/assets/images/haldi-bg.jpg'
    },
    {
      name: 'Mehendi',
      icon: '🌿',
      date: 'Dec 10, 2026',
      time: '4:00 PM',
      venue: 'Garden Courtyard',
      dressCode: 'Green & Gold',
      description: 'Intricate henna, live dhol, and an evening of stories and sweets.',
      backgroundImage: '/src/assets/images/2.jpg',
    },
    {
      name: 'Sangeet',
      icon: '🎶',
      date: 'Dec 11, 2026',
      time: '7:00 PM',
      venue: 'The Leela Palace Lawns',
      dressCode: 'Festive Indo-Western',
      description: "A night of dance battles between both families — bring your best moves.",
      backgroundImage: '/src/assets/images/3.jpg',
    },
    {
      name: 'Wedding',
      icon: '💍',
      date: 'Dec 12, 2026',
      time: '9:00 AM',
      venue: 'Main Mandap, The Leela Palace',
      dressCode: 'Traditional Indian',
      description: 'Sacred vows exchanged around the holy fire, as our families become one.',
      backgroundImage: '/src/assets/images/4.jpg',
    },
    {
      name: 'Reception',
      icon: '🥂',
      date: 'Dec 13, 2026',
      time: '7:00 PM',
      venue: 'Crystal Ballroom, The Leela Palace',
      dressCode: 'Formal / Black Tie',
      description: 'An elegant evening to celebrate the newlyweds with dinner and dance.',
      backgroundImage: '/src/assets/images/5.jpg',
    },
  ],

  // ---------------------------------------------------------- TIMELINE
  timeline: [
    {
      year: '2019',
      title: 'A Chance Meeting',
      text: 'They met at a college photography club, arguing over the correct exposure for a sunset.',
      image: '/src/assets/images/1.jpg',
      video: '',
    },
    {
      year: '2021',
      title: 'First Trip Together',
      text: 'A rainy weekend in Munnar sealed what the photography club started.',
      image: '/src/assets/images/2.jpg',
      video: '',
    },
    {
      year: '2023',
      title: 'He Asked The Big Question',
      text: 'On a rooftop lit with fairy lights, with both families secretly watching from below.',
      image: '/src/assets/images/3.jpg',
      video: '',
    },
    {
      year: '2026',
      title: 'Forever Begins',
      text: 'Two families, one wedding, and a lifetime of filter coffee ahead.',
      image: '/src/assets/images/4.jpg',
      video: '',
    },
  ],

  // ----------------------------------------------------------- GALLERY
  gallery: [
    { src: '/src/assets/images/1.jpg', type: 'image' },
    { src: '/src/assets/images/2.jpg', type: 'image' },
    { src: '/src/assets/images/3.jpg', type: 'image' },
    { src: '/src/assets/images/4.jpg', type: 'image' },
    { src: '/src/assets/images/5.jpg', type: 'image' },
    { src: '/src/assets/images/6.jpg', type: 'image' },
    // { src: '/src/assets/videos/highlight.mp4', type: 'video', poster: '/src/assets/images/gallery-1.jpg' },
  ],

  // ------------------------------------------------------------ FAMILY
  family: [
    { name: 'Dr. Suresh Raghunathan', relation: 'Father of the Bride', photo: '/src/assets/images/family-1.jpg' },
    { name: 'Kavitha Raghunathan', relation: 'Mother of the Bride', photo: '/src/assets/images/family-2.jpg' },
    { name: 'Ramesh Srinivasan', relation: 'Father of the Groom', photo: '/src/assets/images/family-3.jpg' },
    { name: 'Lakshmi Srinivasan', relation: 'Mother of the Groom', photo: '/src/assets/images/family-4.jpg' },
  ],

  // --------------------------------------------------- SCRATCH SURPRISE
  // The scratch card (2nd section, right after the Hero) reveals the
  // wedding date automatically from `weddingDate` above — no need to
  // duplicate the date here. `subtitle` is the line shown under the date
  // once revealed; customize freely.
  scratchSurprise: {
    subtitle: "Mark your calendar — we can't wait to celebrate with you.",
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
    { id: 'moon', icon: '🌙', message: 'The moonlight blesses your journey together 🌙' },
    { id: 'diya', icon: '🪔', message: 'May your home always glow with warmth 🪔' },
    { id: 'peacock', icon: '🦚', message: 'The peacock dances for the joy in your hearts 🦚' },
    { id: 'lotus', icon: '🌷', message: 'A lotus blooms — pure beginnings, endless love 🪷' },
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
    peacockIcon: '/src/assets/images/peacock-placeholder.svg',
  },

  // ------------------------------------------------------------ ANIMATION
  animation: {
    doorOpenDurationS: 1.8,
    lenisSmoothness: 1.1, // higher = smoother/slower
    reduceMotionRespected: true,
  },
};

export default config;

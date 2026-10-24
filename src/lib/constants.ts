import type { EnquiryData } from '../types/enquiry';

export const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
];

export const STANDARD_EVENTS = [
  { id: 'wedding', label: 'Wedding / Muhurtham', description: 'Main ceremonial ritual & vows' },
  { id: 'engagement', label: 'Engagement / Ring Ceremony', description: 'Formal betrothal celebration' },
  { id: 'reception', label: 'Reception Party', description: 'Evening dinner & celebration' },
  { id: 'haldi', label: 'Haldi / Chooda Ceremony', description: 'Vibrant turmeric & blessing ritual' },
  { id: 'sangeet', label: 'Sangeet & Dance Night', description: 'Musical performances & dance party' },
  { id: 'mehndi', label: 'Mehndi Ceremony', description: 'Henna & intimate family gathering' },
  { id: 'cocktail', label: 'Cocktail / Welcome Dinner', description: 'Relaxed pre-wedding get-together' },
  { id: 'other', label: 'Other Special Function', description: 'Custom ritual or destination gathering' },
];

export const AVAILABLE_EXTRAS = [
  { id: 'photobooth', label: 'Interactive Photobooth', description: 'Instant physical printouts & digital sharing for guests' },
  { id: 'sfx_fireworks', label: 'SFX & Cold Sparks', description: 'Safe cold-pyro fountains & dry-ice low fog for couple entry' },
  { id: 'butterfly', label: 'Butterfly Effect & Confetti', description: 'Dreamy visual shower effect for stage & varmala moments' },
  { id: 'drone', label: 'Drone Cinematic Coverage', description: 'Sweeping aerial 4K perspectives of venue and procession' },
  { id: 'same_day_edit', label: 'Same-Day Reel / Teaser', description: 'Quick-turnaround 60s vertical video to post the next morning' },
  { id: 'luxury_album', label: 'Handcrafted Flushmount Albums', description: 'Italian leather & matte fine-art archival prints' },
];

export const AVAILABLE_DELIVERABLES = [
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'highlights', label: 'Highlights Film', icon: '🎬' },
  { id: 'teaser', label: 'Teaser Video', icon: '🎞️' },
  { id: 'full_video', label: 'Full Video', icon: '📹' },
  { id: 'cam_reels', label: 'Cam Reels', icon: '🎥' },
  { id: 'iphone_reel', label: 'iPhone Reel', icon: '📱' },
  { id: 'albums', label: 'Luxury Albums', icon: '📖' },
];

export const INITIAL_ENQUIRY_DATA: EnquiryData = {
  contactName: '',
  countryCode: '+91',
  whatsappNumber: '',
  coverageFor: 'both',
  primaryDate: '',
  primaryLocation: '',
  events: [
    {
      id: 'default-wedding',
      type: 'Wedding / Muhurtham',
      date: '',
      location: '',
      notes: '',
    },
  ],
  photographerCount: '2',
  videography: 'yes',
  deliverables: ['photography', 'highlights', 'teaser', 'albums'],
  extras: [],
  otherExtra: '',
  specialRequests: '',
};

export const STORAGE_KEY = 'leeka_wedding_enquiry_draft_v1';

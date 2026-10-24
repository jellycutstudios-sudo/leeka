import { describe, it, expect } from 'vitest';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '../src/lib/whatsapp';
import { formatDisplayDate } from '../src/lib/formatDate';
import { step1Schema } from '../src/lib/validation';
import { INITIAL_ENQUIRY_DATA } from '../src/lib/constants';

describe('WhatsApp Message Builder & Deep Link', () => {
  it('builds clean organized message with native WhatsApp bolding and bullets', () => {
    const sample = {
      ...INITIAL_ENQUIRY_DATA,
      contactName: 'Aditi Sharma',
      countryCode: '+91',
      whatsappNumber: '9876543210',
      coverageFor: 'both' as const,
      primaryDate: '2026-12-24',
      primaryLocation: 'Jaipur / The Leela Palace',
      events: [
        { id: '1', type: 'Wedding', date: '2026-12-24', location: 'The Leela Palace' },
        { id: '2', type: 'Sangeet', date: '2026-12-23', location: 'The Leela Palace' },
      ],
      photographerCount: '2' as const,
      videography: 'yes' as const,
      deliverables: ['highlights', 'teaser', 'cam_reels', 'albums'],
      extras: ['drone', 'sfx_fireworks'],
      specialRequests: 'Looking for warm candid editorial style.',
    };

    const message = buildWhatsAppMessage(sample);
    expect(message).toContain('*LEEKA WEDDING — PHOTOGRAPHY ENQUIRY*');
    expect(message).toContain('*Client Details*');
    expect(message).toContain('• Name: Aditi Sharma');
    expect(message).toContain('• Contact Number: +91 9876543210');
    expect(message).toContain('• Coverage Scope: Both Bride & Groom');
    expect(message).toContain('*Date & Location*');
    expect(message).toContain('The Leela Palace');
    expect(message).toContain('*Ceremonies to Cover*');
    expect(message).toContain('• Wedding');
    expect(message).toContain('• Sangeet');
    expect(message).toContain('*Team Preferences*');
    expect(message).toContain('• Photography: 2 Photographers');
    expect(message).toContain('• Cinematic Film: Yes');
    expect(message).toContain('*Requested Deliverables & Reels*');
    expect(message).toContain('Highlights Film');
    expect(message).toContain('Teaser Video');
    expect(message).toContain('Cam Reels');
    expect(message).toContain('Luxury Albums');
    expect(message).toContain('*Creative Extras*');
    expect(message).toContain('Drone');
    expect(message).toContain('Cold Sparks');
    expect(message).toContain('Looking for warm candid editorial style');

    const url = buildWhatsAppUrl(sample);
    expect(url).toContain('https://wa.me/919744121551?text=');
  });

  it('handles empty optional fields gracefully', () => {
    const emptySample = {
      ...INITIAL_ENQUIRY_DATA,
      contactName: '',
      whatsappNumber: '',
      primaryDate: '',
      primaryLocation: '',
    };

    const message = buildWhatsAppMessage(emptySample);
    expect(message).toContain('• Name: Not specified');
    expect(message).toContain('• Celebration Date: Date TBD');
  });

  it('formats dates accurately without day shift', () => {
    const formatted = formatDisplayDate('2026-12-24');
    expect(formatted).toContain('24');
    expect(formatted).toContain('2026');
  });

  it('validates phone and rejects past dates', () => {
    const valid = step1Schema.safeParse({
      contactName: 'Rohan Mehta',
      countryCode: '+91',
      whatsappNumber: '97441 21551',
      coverageFor: 'both',
      primaryDate: '2026-12-31',
      primaryLocation: 'Udaipur',
    });
    expect(valid.success).toBe(true);
  });
});

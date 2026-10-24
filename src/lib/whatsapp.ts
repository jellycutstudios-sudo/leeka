import type { EnquiryData } from '../types/enquiry';
import { formatDisplayDate } from './formatDate';
import { AVAILABLE_EXTRAS } from './constants';

/**
 * Gets the configured Leeka Wedding WhatsApp number.
 * Defaults to 919744121551 if not set in environment.
 */
export function getBusinessWhatsAppNumber(): string {
  const envNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  if (envNumber && typeof envNumber === 'string') {
    const cleaned = envNumber.replace(/\D/g, '');
    if (cleaned.length >= 8) {
      return cleaned;
    }
  }
  return '919744121551';
}

/**
 * Maps coverage type to luxury label.
 */
function getCoverageLabel(coverage: EnquiryData['coverageFor']): string {
  switch (coverage) {
    case 'bride':
      return "Bride's Side";
    case 'groom':
      return "Groom's Side";
    case 'both':
      return 'Both Bride & Groom';
    default:
      return 'Not specified';
  }
}

/**
 * Maps photographer choice to human label.
 */
function getPhotographerLabel(count: EnquiryData['photographerCount']): string {
  switch (count) {
    case '1':
      return '1 Photographer';
    case '2':
      return '2 Photographers (Candid + Traditional)';
    case '3_plus':
      return '3+ Multi-Camera Crew';
    case 'not_sure':
      return 'Open / Need studio advice';
    default:
      return 'Flexible';
  }
}

/**
 * Maps videography choice to human label.
 */
function getVideographyLabel(choice: EnquiryData['videography']): string {
  switch (choice) {
    case 'yes':
      return 'Yes (Cinematic Film & Teaser)';
    case 'no':
      return 'No (Photography Only)';
    case 'not_sure':
      return 'Open / Send pricing with & without film';
    default:
      return 'Not specified';
  }
}

/**
 * Generates a clean, organized, understandable template for WhatsApp.
 * Uses native WhatsApp bolding (*text*) and clean bullet points for instant scannability.
 */
export function buildWhatsAppMessage(data: EnquiryData): string {
  const lines: string[] = [];

  // Header & Greeting
  lines.push('*LEEKA WEDDING — PHOTOGRAPHY ENQUIRY*');
  lines.push('');
  lines.push('Hi Leeka Wedding team, I would like to check your availability for our celebration:');
  lines.push('');

  // 1. Client Details
  lines.push('*Client Details*');
  lines.push(`• Name: ${data.contactName || 'Not specified'}`);
  lines.push(`• Contact Number: ${data.countryCode} ${data.whatsappNumber || 'Not specified'}`);
  lines.push(`• Coverage Scope: ${getCoverageLabel(data.coverageFor)}`);
  lines.push('');

  // 2. Date & Location
  lines.push('*Date & Location*');
  lines.push(
    `• Celebration Date: ${
      data.primaryDate ? formatDisplayDate(data.primaryDate) : 'Date TBD'
    }`
  );
  lines.push(`• Venue / City: ${data.primaryLocation || 'Not specified'}`);
  lines.push('');

  // 3. Ceremonies to Cover
  lines.push('*Ceremonies to Cover*');
  if (data.events && data.events.length > 0) {
    data.events.forEach((ev) => {
      const details: string[] = [];
      if (ev.date && ev.date !== data.primaryDate) {
        details.push(formatDisplayDate(ev.date));
      }
      if (ev.location && ev.location !== data.primaryLocation) {
        details.push(ev.location);
      }
      if (ev.notes) {
        details.push(ev.notes);
      }
      const extraInfo = details.length > 0 ? ` (${details.join(', ')})` : '';
      lines.push(`• ${ev.type}${extraInfo}`);
    });
  } else {
    lines.push('• Wedding / Muhurtham');
  }
  lines.push('');

  // 4. Team Preferences
  lines.push('*Team Preferences*');
  lines.push(`• Photography: ${getPhotographerLabel(data.photographerCount)}`);
  lines.push(`• Cinematic Film: ${getVideographyLabel(data.videography)}`);
  lines.push('');

  // 5. Creative Extras (only if selected)
  const selectedExtraLabels = data.extras
    .map((extraId) => {
      const found = AVAILABLE_EXTRAS.find((e) => e.id === extraId);
      return found ? found.label : extraId;
    })
    .filter(Boolean);

  if (data.otherExtra && data.otherExtra.trim()) {
    selectedExtraLabels.push(`Custom: ${data.otherExtra.trim()}`);
  }

  if (selectedExtraLabels.length > 0) {
    lines.push('*Creative Extras*');
    selectedExtraLabels.forEach((item) => {
      lines.push(`• ${item}`);
    });
    lines.push('');
  }

  // 6. Special Requests / Notes (if any)
  if (data.specialRequests && data.specialRequests.trim()) {
    lines.push('*Special Notes*');
    lines.push(data.specialRequests.trim());
    lines.push('');
  }

  // Closing
  lines.push('Looking forward to hearing about your availability and packages!');

  return lines.join('\n');
}

/**
 * Builds the complete wa.me deep link URL.
 */
export function buildWhatsAppUrl(data: EnquiryData): string {
  const businessNumber = getBusinessWhatsAppNumber();
  const messageText = buildWhatsAppMessage(data);
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${businessNumber}?text=${encodedText}`;
}

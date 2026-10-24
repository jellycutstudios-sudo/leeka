export type CoverageTarget = 'bride' | 'groom' | 'both';

export type PhotographerCount = 'not_sure' | '1' | '2' | '3_plus';

export type VideographyChoice = 'yes' | 'no' | 'not_sure';

export interface EventItem {
  id: string;
  type: string;
  date?: string;
  location?: string;
  notes?: string;
}

export interface EnquiryData {
  // Step 1: Contact & Occasion
  contactName: string;
  countryCode: string;
  whatsappNumber: string;
  coverageFor: CoverageTarget;
  primaryDate: string; // YYYY-MM-DD
  primaryLocation: string;

  // Step 2: Coverage & Crew
  events: EventItem[];
  photographerCount: PhotographerCount;
  videography: VideographyChoice;

  // Step 3: Extras & Review
  extras: string[];
  otherExtra: string;
  specialRequests: string;
}

export type StepNumber = 1 | 2 | 3 | 4; // 1 = Contact & Occasion, 2 = Coverage, 3 = Review, 4 = Handoff Done

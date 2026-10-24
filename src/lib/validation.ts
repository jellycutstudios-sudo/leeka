import { z } from 'zod';
import { getTodayDateString } from './formatDate';

export const step1Schema = z.object({
  contactName: z
    .string()
    .trim()
    .min(2, { message: 'Please provide your full name (minimum 2 characters)' }),
  countryCode: z.string().min(1, { message: 'Country code is required' }),
  whatsappNumber: z
    .string()
    .trim()
    .transform((val) => val.replace(/[\s\-()]/g, ''))
    .refine((val) => /^\d{7,15}$/.test(val), {
      message: 'Please enter a valid contact number (7 to 15 digits)',
    }),
  coverageFor: z.enum(['bride', 'groom', 'both'], {
    message: 'Please select who you need coverage for',
  }),
  primaryDate: z
    .string()
    .min(1, { message: 'Please select your wedding / main celebration date' })
    .refine(
      (val) => {
        const today = getTodayDateString();
        return val >= today;
      },
      { message: 'Event date cannot be in the past' }
    ),
  primaryLocation: z
    .string()
    .trim()
    .min(2, { message: 'Please specify the celebration city or venue' }),
});

export const step2Schema = z.object({
  events: z
    .array(
      z.object({
        id: z.string(),
        type: z.string().min(1, { message: 'Event type is required' }),
        date: z.string().optional(),
        location: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .min(1, { message: 'Please select at least one event to be covered' }),
  photographerCount: z.enum(['not_sure', '1', '2', '3_plus']).optional(),
  videography: z.enum(['yes', 'no', 'not_sure']).optional(),
  deliverables: z.array(z.string()).optional(),
});

export const fullEnquirySchema = step1Schema.extend({
  events: step2Schema.shape.events,
  photographerCount: step2Schema.shape.photographerCount.optional(),
  videography: step2Schema.shape.videography.optional(),
  deliverables: z.array(z.string()).optional(),
  extras: z.array(z.string()),
  otherExtra: z.string().optional(),
  specialRequests: z.string().optional(),
});

export type Step1Errors = Partial<Record<keyof z.infer<typeof step1Schema>, string>>;
export type Step2Errors = Partial<Record<keyof z.infer<typeof step2Schema>, string>>;

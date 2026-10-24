# Leeka Wedding — Premium Enquiry Experience
## Antigravity implementation plan | MVP v1

### Objective
Build a mobile-first, luxury wedding photography enquiry experience that feels like a native app. It should collect only the information necessary to qualify an enquiry and open a neatly formatted WhatsApp message addressed to Leeka Wedding. **Do not build a booking/payment system**: enquiries remain pending until staff confirm availability and pricing.

### Recommended stack
- React + Vite + TypeScript (single-page application)
- Tailwind CSS for responsive styling; CSS variables for design tokens
- Motion for subtle transitions; respect `prefers-reduced-motion`
- Lucide React for small consistent icons
- React Hook Form + Zod for accessible form state and validation (or equivalent lightweight typed approach)
- Cloudflare Pages for static deployment
- No database, server, authentication, third-party form service, or WhatsApp Business API in v1

### UX architecture
1. Welcome / entry section: Leeka Wedding wordmark, tasteful optional optimized wedding photograph, concise intro, “Plan Your Day” CTA. On small screens, ensure CTA and purpose are visible without excessive scrolling.
2. Step 1 — Contact and occasion: contact name (required), WhatsApp number (required), coverage for Bride / Groom / Both (required), primary wedding/event date (required), location/city (required).
3. Step 2 — Coverage: select events (Wedding, Engagement, Haldi, Mehndi, Reception, Other), photo team size (Not sure / 1 / 2 / 3+), videography (Yes / No / Not sure). Events default to Wedding when relevant; provide an unobtrusive optional 'Add another event' area with event name/date/location only when needed. Do not force clients to know crew size.
4. Step 3 — Extras and review: optional Photobooth, SFX, Fireworks, Butterfly effect, Other; editable concise summary; prominent “Continue to WhatsApp” CTA.
5. Success wording must be truthful: opening WhatsApp is NOT confirmation of message delivery. Show “WhatsApp will open with your enquiry. Tap Send to share it with us.” Do not show “Enquiry submitted” before an actual verified submission.

### Premium visual direction
- Warm ivory `#F8F6F2`, charcoal `#242424`, restrained champagne `#B59A70`.
- Editorial serif display heading paired with highly legible sans-serif body type; load only necessary font weights and subset fonts.
- Spacious but compact on mobile; large touch targets (>=44px); restrained shadows and borders; excellent contrast.
- Clear step progress 1/3, 2/3, 3/3; inline error messages; Back/Continue controls; smooth, short transitions (150–250ms); no animated loaders between steps.
- Avoid stock-template gradients, glassmorphism, excessive animation, autoplay video, oversized hero media, and decorative clutter.

### Data model
```ts
type Enquiry = {
  contactName: string;
  whatsappNumber: string;
  coverageFor: 'bride' | 'groom' | 'both';
  primaryDate: string; // YYYY-MM-DD, local date; do not convert to UTC
  primaryLocation: string;
  events: Array<{ type: string; date?: string; location?: string }>;
  photographerCount: 'not_sure' | '1' | '2' | '3_plus';
  videography: 'yes' | 'no' | 'not_sure';
  extras: string[];
  otherExtra?: string;
};
```
- Require only name, valid phone, coverage choice, primary date, location, and at least one event; all other questions optional or have 'Not sure'.
- Use a locale-aware date picker or native date input with readable formatted display; reject impossible/past dates if appropriate and show clear error.
- Validate phone numbers for plausible length and digits; use an international prefix picker or default +91 with an editable country code. Do not assume all customers are Indian.
- Persist in-progress form state to sessionStorage only (optional); do not put personal data in analytics or error logs. Explain any persistence and clear after handoff if chosen.

### WhatsApp handoff
- Store business number in a configurable environment variable such as `VITE_WHATSAPP_NUMBER` (digits only, country code included; this is public client configuration, not a secret).
- On CTA click, validate all required fields, build readable message with explicit labels and line breaks, encode using `encodeURIComponent`, and navigate to `https://wa.me/<number>?text=<encoded-message>`.
- Example heading: `LEEKA WEDDING — NEW ENQUIRY`; include contact, WhatsApp, coverage, primary date/location, events, photo crew preference, video preference, extras. Show “Not specified” where helpful rather than fake defaults.
- Avoid emojis or elaborate ASCII borders that clutter the message. Handle missing/invalid configured number with a clear user-friendly fallback.
- A wa.me link **cannot** automatically send the message or verify delivery. Do not claim otherwise. For fully automatic delivery, a separately scoped backend and official WhatsApp Business Platform integration would be needed.

### Performance and app-like behavior
- Single-page app, all steps held in memory; no full reloads, network requests, or blocking spinners on step changes.
- Bundle-split where useful, avoid large dependencies; lazy-load noncritical imagery; pre-size images to avoid layout shift; serve modern WebP/AVIF; avoid hero video.
- Self-host or optimize fonts; preload only critical assets. Do not register a service worker unless offline support is explicitly required.
- Keep UI responsive under slow 4G; optimize initial load, avoid excessive JavaScript, and test actual low-end Android devices.
- Target Lighthouse mobile Performance >=90 where realistically achievable, Accessibility >=95, and no significant layout shifts. Treat metrics as test targets, not guaranteed outcomes.

### Accessibility and quality
- Semantic HTML, keyboard navigation, visible focus states, proper labels, accessible error summaries, reduced-motion support, screen-reader announcement of step changes.
- Preserve form state when navigating Back. Prevent duplicate fields or accidental resets. Disable Continue only when necessary and always explain errors.
- Test: empty fields, phone formats, past dates, multiple events, long locations, extras, back/forward, WhatsApp installed/not installed, iOS Safari, Android Chrome, desktop, slow network, refresh, small screens.
- Privacy: no hidden tracking; include a short privacy note that details are shared through WhatsApp and used to respond to the enquiry.

### Suggested project structure
```
src/
  components/{Button,Progress,FormField,ChoiceCard}.tsx
  features/enquiry/{EnquiryFlow,StepContact,StepCoverage,StepReview}.tsx
  lib/{validation,whatsapp,formatDate}.ts
  styles/globals.css
  App.tsx
```

### Implementation stages and acceptance gates
1. Scaffold Vite React TypeScript project, Tailwind, Motion, Lucide, form validation. Define brand tokens.
2. Build responsive welcome + reusable UI components. Confirm visual hierarchy at 360px, 390px, tablet, desktop.
3. Implement three-step flow, typed state, validation, conditional events/extras, edit/back behavior.
4. Implement WhatsApp message preview + deep link. Unit-test encoding and missing fields.
5. Add accessibility, mobile keyboard handling, reduced-motion, privacy note, optimized assets.
6. Test production build locally; run Lighthouse and real-device checks; fix issues.
7. Deploy static `dist/` to Cloudflare Pages (build command `npm run build`, output directory `dist`). Configure the production WhatsApp number and optional custom domain; verify deep links on the deployed URL.
8. **Stop for owner review** before adding features or major changes. Provide screenshots of mobile/desktop, a working URL, test results, and a short list of recommended refinements.

### Definition of done
- User can complete the enquiry quickly on a phone without page reloads between steps.
- Required information is captured without overwhelming questions; optional selections are genuinely optional.
- WhatsApp opens with a correctly encoded, readable message addressed to the configured business number.
- No false claims of confirmed booking or successful submission.
- Premium design, accessible inputs, fast loading, and working deployment.

### Instruction to Antigravity
Implement this plan as a polished, production-ready MVP. Prioritize the mobile experience, fast interactions, and tasteful editorial design. Do not add a dashboard, payment gateway, database, chatbot, or complex calendar. First deliver the working MVP for review; document any assumptions and ask only about blockers such as the actual WhatsApp business number, logo assets, and final brand photography.

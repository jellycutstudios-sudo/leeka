import React from 'react';
import { getBusinessWhatsAppNumber } from '../lib/whatsapp';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  const rawNumber = getBusinessWhatsAppNumber();

  return (
    <footer className="w-full mt-6 pt-3 pb-3 flex flex-col items-center gap-1.5 text-center select-none">
      {/* Brand & Subtitle */}
      <p className="font-editorial text-sm sm:text-[15px] font-semibold tracking-[0.2em] text-[#241A12] uppercase">
        Leeka Wedding
      </p>
      <p className="text-[10px] text-[#827161] font-sans tracking-wide">
        Fine Art Cinematography & Photography
      </p>

      {/* Clean Single Row: Handles & Studio Line */}
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] text-[#634E3C] pt-1">
        <a
          href="https://www.instagram.com/leekawedding/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-[#1A140F] transition-colors"
        >
          <InstagramIcon className="text-[#8E6D52]" />
          <span>@leekawedding</span>
        </a>

        <span className="text-[#D5C5B5] text-[9px]">•</span>

        <a
          href="https://www.instagram.com/leeka.sfx/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-[#1A140F] transition-colors"
        >
          <InstagramIcon className="text-[#8E6D52]" />
          <span>@leeka.sfx</span>
        </a>

        <span className="text-[#D5C5B5] text-[9px]">•</span>

        <a
          href={`https://wa.me/${rawNumber}?text=Hi%20Leeka%20Wedding%20Team%2C%20I%20have%20a%20quick%20question%20regarding%20booking.`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1A140F] transition-colors"
        >
          +91 97441 21551
        </a>
      </div>
    </footer>
  );
};

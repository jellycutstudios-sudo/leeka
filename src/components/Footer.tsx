import React from 'react';
import { ShieldCheck, MessageCircle, Heart } from 'lucide-react';
import { getBusinessWhatsAppNumber } from '../lib/whatsapp';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
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
    <footer className="w-full mt-7 pt-4 pb-3 flex flex-col items-center gap-3.5 select-none">
      {/* Delicate Gradient Divider with Diamond Accent */}
      <div className="w-full flex items-center justify-center gap-2">
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D5C5B5]/70" />
        <span className="w-1.5 h-1.5 rotate-45 border border-[#8E6D52]/60 bg-[#FAF6F0]" />
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D5C5B5]/70" />
      </div>

      {/* Social Portfolios: Instagram */}
      <div className="flex items-center gap-2">
        <a
          href="https://www.instagram.com/leekawedding/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/75 hover:bg-white border border-[#DFD6CA] text-[11px] font-semibold text-[#5A4330] hover:text-[#1A140F] shadow-2xs hover:shadow-xs transition-all active:scale-95"
          title="Leeka Wedding on Instagram"
        >
          <InstagramIcon className="w-3.5 h-3.5 text-[#C13584]" />
          <span>@leekawedding</span>
        </a>

        <a
          href="https://www.instagram.com/leeka.sfx/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/75 hover:bg-white border border-[#DFD6CA] text-[11px] font-semibold text-[#5A4330] hover:text-[#1A140F] shadow-2xs hover:shadow-xs transition-all active:scale-95"
          title="Leeka SFX on Instagram"
        >
          <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
          <span>@leeka.sfx</span>
        </a>
      </div>

      {/* Trust Reassurance & Direct Studio Line */}
      <div className="w-full flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 text-[11px] text-[#6B5A4D]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8E6D52] shrink-0" />
          <span>Direct Studio Enquiry • Privacy Assured</span>
        </div>

        <span className="text-[#C8B8A6] hidden sm:inline">•</span>

        <a
          href={`https://wa.me/${rawNumber}?text=Hi%20Leeka%20Wedding%20Team%2C%20I%20have%20a%20quick%20question%20regarding%20booking.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#8E6D52] font-semibold hover:text-[#5C4532] transition-colors group cursor-pointer"
        >
          <MessageCircle className="w-3 h-3 text-[#25D366] shrink-0" />
          <span className="underline underline-offset-3 decoration-[#8E6D52]/30 group-hover:decoration-[#8E6D52]">
            Studio Line: +91 97441 21551
          </span>
        </a>
      </div>

      {/* Studio Signature & Branding */}
      <div className="flex flex-col items-center gap-0.5 text-center">
        <p className="font-editorial text-sm sm:text-[15px] font-semibold tracking-[0.18em] text-[#2D251E] uppercase">
          Leeka Wedding
        </p>
        <p className="text-[10px] sm:text-[11px] text-[#806E5F] font-sans tracking-wide">
          Fine Art Cinematography & Bespoke Wedding Photography
        </p>
        <p className="text-[9px] text-[#A69788] mt-0.5 font-sans flex items-center gap-1">
          Crafted with care <Heart className="w-2.5 h-2.5 text-[#8E6D52] fill-[#8E6D52]/30 inline" /> for your celebration
        </p>
      </div>
    </footer>
  );
};

import React from 'react';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import { getBusinessWhatsAppNumber } from '../lib/whatsapp';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const rawNumber = getBusinessWhatsAppNumber();

  return (
    <footer className="w-full mt-12 border-t border-[#E8E4DC] py-8 px-4 bg-[#F3F0EA]/50 text-center">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
          <ShieldCheck className="w-4 h-4 text-[#B59A70] shrink-0" />
          <span>
            Privacy protected: We do not store or sell your data. Your enquiry connects directly with our studio team via WhatsApp.
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#5A5A5A] pt-2">
          <a
            href={`https://wa.me/${rawNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#242424] transition-colors underline decoration-[#B59A70]/60 underline-offset-4"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            Direct Studio Line: +91 97441 21551
          </a>
        </div>

        <p className="text-[11px] text-[#8C877D] tracking-wide">
          © {currentYear} Leeka Wedding. Cinematic Photography & Luxury Wedding Films.
        </p>
      </div>
    </footer>
  );
};

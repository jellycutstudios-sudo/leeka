import React from 'react';
import { Sparkles, Calendar, Camera, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/Button';

interface WelcomeScreenProps {
  onStart: () => void;
  hasDraft?: boolean;
  onResume?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  hasDraft = false,
  onResume,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center animate-fadeIn">
      {/* Editorial badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFECE6] border border-[#E0DCD4] mb-4">
        <Sparkles className="w-3.5 h-3.5 text-[#B59A70]" />
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5A5A5A]">
          2026 – 2027 Wedding Season
        </span>
      </div>

      {/* Main Editorial Headline */}
      <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#242424] leading-[1.15] mb-3">
        Capturing the Timeless Poetry <br />
        <span className="italic font-normal text-[#B59A70]">of Your Wedding Story</span>
      </h2>

      <p className="text-sm sm:text-base text-[#5A5A5A] max-w-md mx-auto mb-6 leading-relaxed">
        Thoughtful cinematography and candid fine-art photography crafted for couples who cherish authentic, intimate moments.
      </p>

      {/* Optimized Hero Photograph */}
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg border border-[#E8E4DC] mb-6 aspect-[4/3] bg-[#EFECE6]">
        <img
          src="/hero-wedding.jpg"
          alt="Leeka Wedding couple portrait"
          className="w-full h-full object-cover object-center"
          loading="eager"
          width="600"
          height="450"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
          <p className="text-white/95 text-xs tracking-wider uppercase font-medium">
            Fine Art Wedding Moments • Kerala & Worldwide
          </p>
        </div>
      </div>

      {/* Value Badges (Mobile Compact) */}
      <div className="grid grid-cols-2 gap-2.5 w-full max-w-md mb-6 text-left">
        <div className="p-3 rounded-xl bg-white/80 border border-[#E8E4DC] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#B59A70] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#242424]">Fast Availability</p>
            <p className="text-[11px] text-[#737373]">Direct response in minutes</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/80 border border-[#E8E4DC] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#B59A70] flex items-center justify-center shrink-0">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#242424]">Custom Crew</p>
            <p className="text-[11px] text-[#737373]">Tailored to your itinerary</p>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="w-full max-w-md flex flex-col gap-2.5">
        <Button
          onClick={onStart}
          variant="primary"
          size="lg"
          fullWidth
          className="group shadow-md"
        >
          <span>Plan Your Day</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>

        {hasDraft && onResume && (
          <Button
            onClick={onResume}
            variant="secondary"
            size="md"
            fullWidth
          >
            Resume Saved Enquiry
          </Button>
        )}
      </div>

      {/* Trust reassurance */}
      <div className="flex items-center gap-1.5 mt-4 text-[11px] text-[#8C877D]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#B59A70]" />
        <span>Takes under 2 minutes • No payment or signup required</span>
      </div>
    </div>
  );
};

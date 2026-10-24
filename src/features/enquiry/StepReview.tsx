import React, { useState } from 'react';
import {
  User,
  Users,
  Calendar,
  MapPin,
  Sparkles,
  Camera,
  Video,
  ChevronRight,
  Copy,
  Check,
  Flower2,
  Flame,
  Camera as CameraIcon,
  Film,
} from 'lucide-react';
import type { EnquiryData } from '../../types/enquiry';
import { formatDisplayDate } from '../../lib/formatDate';
import { AVAILABLE_DELIVERABLES } from '../../lib/constants';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '../../lib/whatsapp';

interface StepReviewProps {
  data: EnquiryData;
  onChange: (patch: Partial<EnquiryData>) => void;
  onEditStep: (step: number) => void;
  onBack: () => void;
  onHandoffComplete: () => void;
}

const EXTRAS_OPTIONS = [
  { id: 'drone', label: 'Drone', icon: <span className="text-sm">🚁</span> },
  { id: 'sfx_fireworks', label: 'Cold Sparks', icon: <Flame className="w-3.5 h-3.5 text-amber-600" /> },
  { id: 'photobooth', label: 'Photobooth', icon: <CameraIcon className="w-3.5 h-3.5 text-[#8C7E72]" /> },
  { id: 'butterfly', label: 'Butterfly Effect', icon: <span className="text-sm">🦋</span> },
];

export const StepReview: React.FC<StepReviewProps> = ({
  data,
  onChange,
  onEditStep,
  onHandoffComplete,
}) => {
  const [copied, setCopied] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(data);
  const messagePreview = buildWhatsAppMessage(data);

  const toggleExtra = (extraId: string) => {
    const exists = data.extras.includes(extraId);
    const updated = exists
      ? data.extras.filter((id) => id !== extraId)
      : [...data.extras, extraId];
    onChange({ extras: updated });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messagePreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onHandoffComplete();
  };

  const coverageScopeLabel =
    data.coverageFor === 'both' ? 'Both' : data.coverageFor === 'bride' ? 'Bride' : 'Groom';

  const crewSizeLabel =
    data.photographerCount === '1'
      ? '1 Photographer'
      : data.photographerCount === '2'
      ? '2 Photographers'
      : data.photographerCount === '3_plus'
      ? '3+ Photographers'
      : 'Not sure';

  const videoLabel =
    data.videography === 'yes' ? 'Yes' : data.videography === 'no' ? 'No' : 'Not sure';

  const ceremoniesList =
    data.events.map((e) => e.type).join(', ') || 'Wedding / Muhurtham';

  const deliverablesList =
    (data.deliverables || [])
      .map((id) => {
        const found = AVAILABLE_DELIVERABLES.find((d) => d.id === id);
        return found ? found.label : id;
      })
      .join(', ') || 'None selected';

  return (
    <div className="w-full flex flex-col gap-5 animate-fadeIn">
      {/* Frosted Glass Panel Container */}
      <div className="glass-panel rounded-[32px] p-6 sm:p-7 flex flex-col gap-5 relative overflow-hidden">
        {/* Header with Dried Botanical Art */}
        <div className="flex items-start justify-between gap-3 pt-1">
          <div className="flex-1 pr-1">
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[#2D251E] leading-tight">
              Review
            </h2>
            <p className="text-xs sm:text-[13px] text-[#786C60] mt-1.5 leading-relaxed font-sans">
              Here&apos;s a summary of your enquiry. You can edit any detail before sending.
            </p>
          </div>

          <div className="w-12 h-12 shrink-0 opacity-80 flex items-center justify-center">
            <Flower2 className="w-8 h-8 text-[#A88669]/60 stroke-[1.5]" />
          </div>
        </div>

        {/* Summary Rows List */}
        <div className="flex flex-col divide-y divide-[#EAE3D9]/70 text-xs sm:text-sm">
          {/* Row 1: Contact */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <User className="w-4 h-4 text-[#8C7E72] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[11px] text-[#8C7E72] block">Contact</span>
                <p className="font-medium text-[#2D251E] truncate">
                  {data.contactName || 'Not specified'}
                </p>
                <p className="text-[11px] text-[#786C60]">
                  {data.countryCode} {data.whatsappNumber || 'Not specified'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="px-2.5 py-1 text-[11px] font-medium text-[#6B5E52] bg-white/70 hover:bg-white border border-[#E6DDD2] rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Edit
            </button>
          </div>

          {/* Row 2: Coverage scope */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Users className="w-4 h-4 text-[#8C7E72] shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] text-[#8C7E72] block">Coverage scope</span>
                <p className="font-medium text-[#2D251E]">{coverageScopeLabel}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="px-2.5 py-1 text-[11px] font-medium text-[#6B5E52] bg-white/70 hover:bg-white border border-[#E6DDD2] rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Edit
            </button>
          </div>

          {/* Row 3: Wedding date */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Calendar className="w-4 h-4 text-[#8C7E72] shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] text-[#8C7E72] block">Wedding date</span>
                <p className="font-medium text-[#2D251E]">
                  {data.primaryDate ? formatDisplayDate(data.primaryDate) : 'Date TBD'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="px-2.5 py-1 text-[11px] font-medium text-[#6B5E52] bg-white/70 hover:bg-white border border-[#E6DDD2] rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Edit
            </button>
          </div>

          {/* Row 4: City / Venue */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <MapPin className="w-4 h-4 text-[#8C7E72] shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] text-[#8C7E72] block">City / Venue</span>
                <p className="font-medium text-[#2D251E] truncate">
                  {data.primaryLocation || 'Not specified'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="px-2.5 py-1 text-[11px] font-medium text-[#6B5E52] bg-white/70 hover:bg-white border border-[#E6DDD2] rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Edit
            </button>
          </div>

          {/* Row 5: Ceremonies */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Sparkles className="w-4 h-4 text-[#8C7E72] shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] text-[#8C7E72] block">Ceremonies</span>
                <p className="font-medium text-[#2D251E] truncate">{ceremoniesList}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="px-2.5 py-1 text-[11px] font-medium text-[#6B5E52] bg-white/70 hover:bg-white border border-[#E6DDD2] rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Edit
            </button>
          </div>

          {/* Row 6: Crew size */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Camera className="w-4 h-4 text-[#8C7E72] shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] text-[#8C7E72] block">Crew size</span>
                <p className="font-medium text-[#2D251E]">{crewSizeLabel}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="px-2.5 py-1 text-[11px] font-medium text-[#6B5E52] bg-white/70 hover:bg-white border border-[#E6DDD2] rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Edit
            </button>
          </div>

          {/* Row 7: Cinematic film */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Video className="w-4 h-4 text-[#8C7E72] shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] text-[#8C7E72] block">Cinematic film</span>
                <p className="font-medium text-[#2D251E]">{videoLabel}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="px-2.5 py-1 text-[11px] font-medium text-[#6B5E52] bg-white/70 hover:bg-white border border-[#E6DDD2] rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Edit
            </button>
          </div>

          {/* Row 8: Deliverables & Reels (if any selected) */}
          {data.deliverables && data.deliverables.length > 0 && (
            <div className="py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Film className="w-4 h-4 text-[#8C7E72] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] text-[#8C7E72] block">Services & Deliverables</span>
                  <p className="font-medium text-[#2D251E] truncate">{deliverablesList}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="px-2.5 py-1 text-[11px] font-medium text-[#6B5E52] bg-white/70 hover:bg-white border border-[#E6DDD2] rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Section: Add Creative Extras (Optional) */}
        <div className="border-t border-[#EAE3D9] pt-3 flex flex-col gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#9C7C5F]" />
              <span className="text-xs font-semibold text-[#2D251E] tracking-wide">
                Add creative extras (optional)
              </span>
            </div>
            <p className="text-[11px] text-[#8C7E72] pl-5">
              Make your celebration even more memorable.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mt-1">
            {EXTRAS_OPTIONS.map((item) => {
              const active = data.extras.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleExtra(item.id)}
                  className={`flex items-center justify-start gap-2.5 py-3 px-3.5 sm:px-4 rounded-2xl text-xs font-medium transition-all duration-200 cursor-pointer select-none active:scale-[0.98] ${
                    active
                      ? 'bg-gradient-to-r from-[#EEDFD3] to-[#DFCEBF] border border-[#CBB8A7] text-[#4A3D31] font-semibold shadow-xs'
                      : 'bg-white/70 border border-[#E6DDD2] text-[#6B5E52] hover:bg-white'
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* WhatsApp Green Explanation Box */}
        <div className="p-3.5 rounded-2xl bg-[#EBF7EE] border border-[#BCE7C6] flex items-center gap-3 mt-1">
          <div className="w-7 h-7 rounded-full bg-[#25D366]/20 text-[#1E8A44] flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div className="text-[11px] sm:text-xs text-[#205C35] leading-snug">
            <p className="font-semibold text-[#184F2B]">
              WhatsApp will open with your enquiry.
            </p>
            <p className="text-[#2B6D41]">
              Tap Send to share it with our studio team.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action Button (Lush Emerald Green with WhatsApp Icon and Chevron) */}
      <button
        type="button"
        onClick={handleOpenWhatsApp}
        className="w-full bg-gradient-to-r from-[#2AA657] to-[#1E8A44] text-white rounded-2xl py-4 px-6 flex items-center justify-between font-medium tracking-wide shadow-[0_6px_20px_rgba(30,138,68,0.25)] hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer select-none text-sm sm:text-base"
      >
        <div className="flex items-center gap-2.5">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>Open WhatsApp</span>
        </div>
        <ChevronRight className="w-4 h-4 text-white/90" />
      </button>

      {/* Secondary Action Button (Copy Enquiry Message) */}
      <button
        type="button"
        onClick={handleCopy}
        className="w-full bg-white/70 hover:bg-white border border-[#E6DDD2] text-[#6B5E52] hover:text-[#2D251E] rounded-2xl py-3 px-4 flex items-center justify-center gap-2 text-xs font-medium transition-all cursor-pointer shadow-2xs select-none"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Message copied to clipboard!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-[#8C7E72]" />
            <span>Copy enquiry message</span>
          </>
        )}
      </button>
    </div>
  );
};

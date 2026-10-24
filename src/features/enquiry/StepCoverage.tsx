import React, { useState } from 'react';
import {
  Sparkles,
  ChevronRight,
  Gem,
  Music,
  Sun,
  Flower2,
  Wine,
  MoreHorizontal,
  Camera,
  BookOpen,
  Film,
  Clapperboard,
  Video,
  Smartphone,
  Tv,
  Check,
  Plus,
} from 'lucide-react';
import type { EnquiryData, EventItem } from '../../types/enquiry';
import { AVAILABLE_DELIVERABLES } from '../../lib/constants';
import { step2Schema, type Step2Errors } from '../../lib/validation';

interface StepCoverageProps {
  data: EnquiryData;
  onChange: (patch: Partial<EnquiryData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CEREMONY_OPTIONS = [
  {
    id: 'wedding',
    label: 'Wedding',
    icon: (
      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
      </svg>
    ),
  },
  { id: 'engagement', label: 'Engagement', icon: <Gem className="w-3.5 h-3.5" /> },
  { id: 'sangeet', label: 'Sangeet', icon: <Music className="w-3.5 h-3.5" /> },
  { id: 'haldi', label: 'Haldi', icon: <Sun className="w-3.5 h-3.5" /> },
  { id: 'mehndi', label: 'Mehndi', icon: <Flower2 className="w-3.5 h-3.5" /> },
  { id: 'reception', label: 'Reception', icon: <Wine className="w-3.5 h-3.5" /> },
];

const DELIVERABLE_ICONS: Record<string, React.ReactNode> = {
  photography: <Camera className="w-3.5 h-3.5" />,
  albums: <BookOpen className="w-3.5 h-3.5" />,
  highlights: <Film className="w-3.5 h-3.5" />,
  teaser: <Clapperboard className="w-3.5 h-3.5" />,
  cam_reels: <Video className="w-3.5 h-3.5" />,
  iphone_reel: <Smartphone className="w-3.5 h-3.5" />,
  full_video: <Tv className="w-3.5 h-3.5" />,
};

export const StepCoverage: React.FC<StepCoverageProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const [errors, setErrors] = useState<Step2Errors>({});
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTitle, setCustomTitle] = useState('');

  const validateAndProceed = () => {
    const result = step2Schema.safeParse({
      events: data.events,
      deliverables: data.deliverables,
    });

    if (!result.success) {
      const fieldErrors: Step2Errors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof Step2Errors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onNext();
  };

  const isSelected = (label: string) => {
    return data.events.some((e) => e.type.toLowerCase() === label.toLowerCase());
  };

  const toggleEvent = (label: string) => {
    const exists = isSelected(label);
    let updated: EventItem[];

    if (exists) {
      if (data.events.length <= 1) return;
      updated = data.events.filter((e) => e.type.toLowerCase() !== label.toLowerCase());
    } else {
      updated = [
        ...data.events,
        {
          id: `event-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          type: label,
          date: data.primaryDate || '',
          location: data.primaryLocation || '',
        },
      ];
    }

    onChange({ events: updated });
    if (errors.events) setErrors((prev) => ({ ...prev, events: undefined }));
  };

  const addCustom = () => {
    if (!customTitle.trim()) return;
    onChange({
      events: [
        ...data.events,
        {
          id: `custom-${Date.now()}`,
          type: customTitle.trim(),
          date: data.primaryDate || '',
          location: data.primaryLocation || '',
        },
      ],
    });
    setCustomTitle('');
    setShowCustomInput(false);
  };

  const toggleDeliverable = (id: string) => {
    const current = data.deliverables || [];
    const exists = current.includes(id);
    const updated = exists ? current.filter((x) => x !== id) : [...current, id];
    onChange({ deliverables: updated });
  };

  return (
    <div className="w-full flex flex-col gap-5 animate-fadeIn">
      {/* Frosted Glass Panel */}
      <div className="glass-panel rounded-[32px] p-6 sm:p-7 flex flex-col gap-5 relative overflow-hidden">
        {/* Header with Botanical Art */}
        <div className="flex items-start justify-between gap-3 pt-1">
          <div className="flex-1 pr-1">
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[#1A140F] leading-tight">
              Coverage
            </h2>
            <p className="text-xs sm:text-[13px] text-[#4D4034] mt-1.5 leading-relaxed font-sans">
              Choose what you&apos;d like us to capture.
            </p>
          </div>

          <div className="w-12 h-12 shrink-0 opacity-80 flex items-center justify-center">
            <Flower2 className="w-8 h-8 text-[#8E6D52] stroke-[1.8]" />
          </div>
        </div>

        {/* Section 1: Select Ceremonies */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8E6D52]" />
              <span className="text-xs font-bold text-[#1A140F] tracking-wide">
                Select ceremonies
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold text-[#63452B] bg-[#8E6D52]/15 border border-[#8E6D52]/30 px-2.5 py-0.5 rounded-full tracking-wider">
              Select multiple
            </span>
          </div>
          <span className="text-[11px] text-[#524438] -mt-0.5 pl-5">
            Choose all celebrations to be covered
          </span>

          <div className="grid grid-cols-2 gap-2.5 mt-1.5">
            {CEREMONY_OPTIONS.map((item) => {
              const active = isSelected(item.label);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleEvent(item.label)}
                  className={`flex items-center justify-between py-3 px-3.5 sm:px-4 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none active:scale-[0.98] ${
                    active
                      ? 'bg-gradient-to-r from-[#F6EDE4] to-[#EBDECE] border-2 border-[#8E6D52] text-[#140E0A] font-bold shadow-xs ring-1 ring-[#8E6D52]/20'
                      : 'bg-white border-1.5 border-[#D5C5B5] text-[#221810] hover:border-[#8E6D52] hover:bg-[#FAF6F1]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`shrink-0 ${active ? 'text-[#8E6D52]' : 'text-[#6E533C]'}`}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {/* Multi-select checkmark circle */}
                  <div
                    className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center transition-all duration-200 ml-1 ${
                      active
                        ? 'bg-[#8E6D52] text-white shadow-2xs'
                        : 'border-2 border-[#B4A08E] bg-white'
                    }`}
                  >
                    {active && <Check className="w-2.5 h-2.5 stroke-[3] text-white" />}
                  </div>
                </button>
              );
            })}

            {/* Custom Button */}
            <button
              type="button"
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="flex items-center justify-between py-3 px-3.5 sm:px-4 rounded-2xl text-xs sm:text-sm font-medium bg-white border-1.5 border-[#D5C5B5] text-[#221810] hover:border-[#8E6D52] hover:bg-[#FAF6F1] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MoreHorizontal className="w-3.5 h-3.5 text-[#6E533C] shrink-0" />
                <span>Custom</span>
              </div>
              <Plus className="w-3.5 h-3.5 text-[#8E6D52] shrink-0 ml-1" />
            </button>
          </div>

          {/* Expandable Custom Event Input */}
          {showCustomInput && (
            <div className="mt-2 p-3 bg-white rounded-2xl border-1.5 border-[#D5C5B5] flex items-center gap-2 shadow-xs">
              <input
                type="text"
                placeholder="Custom ceremony name..."
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustom();
                  }
                }}
                className="flex-1 bg-transparent text-xs text-[#1A140F] placeholder:text-[#918171] outline-none"
              />
              <button
                type="button"
                onClick={addCustom}
                className="px-3.5 py-1.5 bg-[#8E6D52] hover:bg-[#73543B] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-2xs"
              >
                Add
              </button>
            </div>
          )}

          {errors.events && (
            <p className="text-[11px] text-rose-700 font-semibold pl-1">{errors.events}</p>
          )}
        </div>

        {/* Section 2: Services & Deliverables */}
        <div className="border-t border-[#EAE3D9] pt-3 flex flex-col gap-3">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8E6D52]" />
                <label className="text-xs font-bold text-[#1A140F] tracking-wide">
                  Services & Deliverables
                </label>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#63452B] bg-[#8E6D52]/15 border border-[#8E6D52]/30 px-2.5 py-0.5 rounded-full tracking-wider">
                Select multiple
              </span>
            </div>
            <p className="text-[11px] text-[#524438] pl-5 mt-0.5">
              Choose what you&apos;d like included.
            </p>
          </div>

          {/* Group A: Photography & Wedding Album */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-[#5C4532] tracking-wider uppercase pl-0.5">
              Photography & Keepsake
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {AVAILABLE_DELIVERABLES.filter((d) => d.category === 'photo').map((item) => {
                const active = (data.deliverables || []).includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleDeliverable(item.id)}
                    className={`flex items-center justify-between py-3 px-3.5 sm:px-4 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none active:scale-[0.98] ${
                      active
                        ? 'bg-gradient-to-r from-[#F6EDE4] to-[#EBDECE] border-2 border-[#8E6D52] text-[#140E0A] font-bold shadow-xs ring-1 ring-[#8E6D52]/20'
                        : 'bg-white border-1.5 border-[#D5C5B5] text-[#221810] hover:border-[#8E6D52] hover:bg-[#FAF6F1]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`shrink-0 ${active ? 'text-[#8E6D52]' : 'text-[#6E533C]'}`}>
                        {DELIVERABLE_ICONS[item.id] || <Sparkles className="w-3.5 h-3.5" />}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {/* Multi-select checkmark circle */}
                    <div
                      className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center transition-all duration-200 ml-1 ${
                        active
                          ? 'bg-[#8E6D52] text-white shadow-2xs'
                          : 'border-2 border-[#B4A08E] bg-white'
                      }`}
                    >
                      {active && <Check className="w-2.5 h-2.5 stroke-[3] text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group B: Films & Reels */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-[#5C4532] tracking-wider uppercase pl-0.5">
              Films & Reels
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {AVAILABLE_DELIVERABLES.filter((d) => d.category === 'film').map((item) => {
                const active = (data.deliverables || []).includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleDeliverable(item.id)}
                    className={`flex items-center justify-between py-3 px-3.5 sm:px-4 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none active:scale-[0.98] last:col-span-2 ${
                      active
                        ? 'bg-gradient-to-r from-[#F6EDE4] to-[#EBDECE] border-2 border-[#8E6D52] text-[#140E0A] font-bold shadow-xs ring-1 ring-[#8E6D52]/20'
                        : 'bg-white border-1.5 border-[#D5C5B5] text-[#221810] hover:border-[#8E6D52] hover:bg-[#FAF6F1]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`shrink-0 ${active ? 'text-[#8E6D52]' : 'text-[#6E533C]'}`}>
                        {DELIVERABLE_ICONS[item.id] || <Sparkles className="w-3.5 h-3.5" />}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {/* Multi-select checkmark circle */}
                    <div
                      className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center transition-all duration-200 ml-1 ${
                        active
                          ? 'bg-[#8E6D52] text-white shadow-2xs'
                          : 'border-2 border-[#B4A08E] bg-white'
                      }`}
                    >
                      {active && <Check className="w-2.5 h-2.5 stroke-[3] text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Button (Review >) */}
      <button
        type="button"
        onClick={validateAndProceed}
        className="relative w-full bg-gradient-to-r from-[#8E6D52] to-[#715239] text-white rounded-2xl py-4 px-6 flex items-center justify-center font-medium tracking-wide shadow-[0_6px_20px_rgba(113,82,57,0.25)] hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer select-none text-sm sm:text-base"
      >
        <span>Review</span>
        <ChevronRight className="w-4 h-4 absolute right-6 text-white/90" />
      </button>
    </div>
  );
};

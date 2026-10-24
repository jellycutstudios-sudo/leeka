import React, { useState } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  Users,
  Video,
  ChevronRight,
  Trash2,
  Calendar,
  MapPin,
  Gem,
  Music,
  Leaf,
  Flower2,
  Wine,
  MoreHorizontal,
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
  { id: 'wedding', label: 'Wedding', icon: <span className="text-sm">💍</span> },
  { id: 'engagement', label: 'Engagement', icon: <Gem className="w-3.5 h-3.5" /> },
  { id: 'sangeet', label: 'Sangeet', icon: <Music className="w-3.5 h-3.5" /> },
  { id: 'haldi', label: 'Haldi', icon: <Leaf className="w-3.5 h-3.5" /> },
  { id: 'mehndi', label: 'Mehndi', icon: <Flower2 className="w-3.5 h-3.5" /> },
  { id: 'reception', label: 'Reception', icon: <Wine className="w-3.5 h-3.5" /> },
];

export const StepCoverage: React.FC<StepCoverageProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const [errors, setErrors] = useState<Step2Errors>({});
  const [showOverrides, setShowOverrides] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTitle, setCustomTitle] = useState('');

  const validateAndProceed = () => {
    const result = step2Schema.safeParse({
      events: data.events,
      photographerCount: data.photographerCount,
      videography: data.videography,
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

  const updateEventField = (id: string, field: 'date' | 'location', val: string) => {
    onChange({
      events: data.events.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    });
  };

  const removeEvent = (id: string) => {
    if (data.events.length <= 1) return;
    onChange({ events: data.events.filter((e) => e.id !== id) });
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
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[#2D251E] leading-tight">
              Coverage
            </h2>
            <p className="text-xs sm:text-[13px] text-[#786C60] mt-1.5 leading-relaxed font-sans">
              Tell us which events you&apos;d like us to cover and a few more preferences.
            </p>
          </div>

          <div className="w-12 h-12 shrink-0 opacity-80 flex items-center justify-center">
            <Flower2 className="w-8 h-8 text-[#A88669]/60 stroke-[1.5]" />
          </div>
        </div>

        {/* Section 1: Select Ceremonies */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#9C7C5F]" />
            <span className="text-xs font-semibold text-[#2D251E] tracking-wide">
              Select ceremonies
            </span>
          </div>
          <span className="text-[11px] text-[#8C7E72] -mt-1 pl-5">
            Choose all that apply
          </span>

          <div className="grid grid-cols-2 gap-2.5 mt-1.5">
            {CEREMONY_OPTIONS.map((item) => {
              const active = isSelected(item.label);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleEvent(item.label)}
                  className={`flex items-center justify-start gap-2.5 py-3 px-3.5 sm:px-4 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none active:scale-[0.98] ${
                    active
                      ? 'bg-gradient-to-r from-[#EEDFD3] to-[#DFCEBF] border border-[#CBB8A7] text-[#4A3D31] font-semibold shadow-xs ring-1 ring-[#A88669]/20'
                      : 'bg-white/70 border border-[#E6DDD2] text-[#6B5E52] hover:bg-white/90'
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}

            {/* Custom Button */}
            <button
              type="button"
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="flex items-center justify-start gap-2.5 py-3 px-3.5 sm:px-4 rounded-2xl text-xs sm:text-sm font-medium bg-white/70 border border-[#E6DDD2] text-[#6B5E52] hover:bg-white/90 transition-all cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4 text-[#8C7E72] shrink-0" />
              <span>Custom</span>
            </button>
          </div>

          {/* Expandable Custom Event Input */}
          {showCustomInput && (
            <div className="mt-2 p-3 bg-white/80 rounded-2xl border border-[#E6DDD2] flex items-center gap-2">
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
                className="flex-1 bg-transparent text-xs text-[#2D251E] outline-none"
              />
              <button
                type="button"
                onClick={addCustom}
                className="px-3 py-1.5 bg-[#8E6D52] text-white rounded-xl text-xs font-medium cursor-pointer"
              >
                Add
              </button>
            </div>
          )}

          {errors.events && (
            <p className="text-[11px] text-rose-700 font-medium pl-1">{errors.events}</p>
          )}
        </div>

        {/* Section 2: Per-event Overrides */}
        <div className="border-t border-[#EAE3D9] pt-3">
          <button
            type="button"
            onClick={() => setShowOverrides(!showOverrides)}
            className="w-full flex items-center justify-between text-left py-1 cursor-pointer group select-none"
          >
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-[#8C7E72] shrink-0" />
              <div>
                <p className="text-xs font-medium text-[#2D251E] group-hover:text-[#8E6D52] transition-colors">
                  Per-event overrides
                </p>
                <p className="text-[11px] text-[#8C7E72]">
                  Customize coverage, hours or special notes for each event
                </p>
              </div>
            </div>
            <ChevronRight
              className={`w-4 h-4 text-[#8C7E72] transition-transform duration-200 ${
                showOverrides ? 'transform rotate-90' : ''
              }`}
            />
          </button>

          {showOverrides && (
            <div className="mt-3 flex flex-col gap-2 pt-2 border-t border-[#EAE3D9]/60">
              {data.events.map((ev, idx) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-2xl bg-white/60 border border-[#E6DDD2] text-xs flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2D251E]">
                      {idx + 1}. {ev.type}
                    </span>
                    {data.events.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEvent(ev.id)}
                        className="text-[#A19588] hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/80 border border-[#E6DDD2]">
                      <Calendar className="w-3.5 h-3.5 text-[#8C7E72]" />
                      <input
                        type="date"
                        value={ev.date || data.primaryDate}
                        onChange={(e) => updateEventField(ev.id, 'date', e.target.value)}
                        className="bg-transparent text-[11px] text-[#2D251E] outline-none w-full cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/80 border border-[#E6DDD2]">
                      <MapPin className="w-3.5 h-3.5 text-[#8C7E72]" />
                      <input
                        type="text"
                        placeholder="Venue"
                        value={ev.location || data.primaryLocation}
                        onChange={(e) => updateEventField(ev.id, 'location', e.target.value)}
                        className="bg-transparent text-[11px] text-[#2D251E] outline-none w-full placeholder:text-[#A19588]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Photography Crew Size */}
        <div className="border-t border-[#EAE3D9] pt-3 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#9C7C5F]" />
            <label className="text-xs font-semibold text-[#2D251E] tracking-wide">
              Photography crew size
            </label>
          </div>

          <div
            className="bg-[#EFE9DF]/80 p-1 rounded-2xl flex items-center border border-[#E4DCCF]"
            role="radiogroup"
            aria-label="Photography crew size"
          >
            {(
              [
                { id: 'not_sure', label: 'Not sure' },
                { id: '1', label: '1' },
                { id: '2', label: '2' },
                { id: '3_plus', label: '3+' },
              ] as const
            ).map((item) => {
              const active = data.photographerCount === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onChange({ photographerCount: item.id })}
                  className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer select-none text-center ${
                    active
                      ? 'bg-gradient-to-r from-[#9C7C5F] to-[#826246] text-white shadow-xs'
                      : 'text-[#6B5E52] hover:text-[#2D251E]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Cinematic Film */}
        <div className="border-t border-[#EAE3D9] pt-3 flex flex-col gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-[#9C7C5F]" />
              <label className="text-xs font-semibold text-[#2D251E] tracking-wide">
                Cinematic film
              </label>
            </div>
            <p className="text-[11px] text-[#8C7E72] mt-0.5 pl-5">
              Add a beautifully edited cinematic film to your collection.
            </p>
          </div>

          <div
            className="bg-[#EFE9DF]/80 p-1 rounded-2xl flex items-center border border-[#E4DCCF]"
            role="radiogroup"
            aria-label="Cinematic film"
          >
            {(
              [
                { id: 'not_sure', label: 'Not sure' },
                { id: 'yes', label: 'Yes' },
                { id: 'no', label: 'No' },
              ] as const
            ).map((item) => {
              const active = data.videography === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onChange({ videography: item.id })}
                  className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer select-none text-center ${
                    active
                      ? 'bg-gradient-to-r from-[#9C7C5F] to-[#826246] text-white shadow-xs'
                      : 'text-[#6B5E52] hover:text-[#2D251E]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 5: Preferred Deliverables & Reels */}
        <div className="border-t border-[#EAE3D9] pt-3 flex flex-col gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#9C7C5F]" />
              <label className="text-xs font-semibold text-[#2D251E] tracking-wide">
                Preferred Deliverables & Reels (Optional)
              </label>
            </div>
            <p className="text-[11px] text-[#8C7E72] pl-5">
              Select all media formats you&apos;d like included in your custom proposal.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mt-1">
            {AVAILABLE_DELIVERABLES.map((item) => {
              const active = (data.deliverables || []).includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleDeliverable(item.id)}
                  className={`flex items-center justify-start gap-2.5 py-3 px-3.5 sm:px-4 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none active:scale-[0.98] ${
                    active
                      ? 'bg-gradient-to-r from-[#EEDFD3] to-[#DFCEBF] border border-[#CBB8A7] text-[#4A3D31] font-semibold shadow-xs ring-1 ring-[#A88669]/20'
                      : 'bg-white/70 border border-[#E6DDD2] text-[#6B5E52] hover:bg-white'
                  }`}
                >
                  <span className="shrink-0 text-sm">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
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

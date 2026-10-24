import React, { useState } from 'react';
import { User, MapPin, ChevronRight, Phone } from 'lucide-react';
import type { EnquiryData, CoverageTarget } from '../../types/enquiry';
import { COUNTRY_CODES } from '../../lib/constants';
import { getTodayDateString } from '../../lib/formatDate';
import { step1Schema, type Step1Errors } from '../../lib/validation';
import { LuxuryDatePicker } from '../../components/LuxuryDatePicker';

interface StepContactProps {
  data: EnquiryData;
  onChange: (patch: Partial<EnquiryData>) => void;
  onNext: () => void;
}

export const StepContact: React.FC<StepContactProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const [errors, setErrors] = useState<Step1Errors>({});
  const today = getTodayDateString();

  const validateAndProceed = () => {
    const result = step1Schema.safeParse({
      contactName: data.contactName,
      countryCode: data.countryCode,
      whatsappNumber: data.whatsappNumber,
      coverageFor: data.coverageFor,
      primaryDate: data.primaryDate,
      primaryLocation: data.primaryLocation,
    });

    if (!result.success) {
      const fieldErrors: Step1Errors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof Step1Errors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      const firstErrorField = Object.keys(fieldErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setErrors({});
    onNext();
  };

  const handleCoverageSelect = (scope: CoverageTarget) => {
    onChange({ coverageFor: scope });
    if (errors.coverageFor) {
      setErrors((prev) => ({ ...prev, coverageFor: undefined }));
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 animate-fadeIn">
      {/* Frosted Glass Panel Container */}
      <div className="glass-panel rounded-[32px] p-6 sm:p-7 flex flex-col gap-5 relative overflow-hidden">
        {/* Header with Gold Rings Accent */}
        <div className="flex items-start justify-between gap-3 pt-1">
          <div className="flex-1 pr-1">
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[#1A140F] leading-tight">
              Contact & Occasion
            </h2>
            <p className="text-xs sm:text-[13px] text-[#4D4034] mt-1.5 leading-relaxed font-sans">
              Let&apos;s start with a few details about you and your special day.
            </p>
          </div>

          <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-[#D5C5B5] bg-[#FAF6F0]">
            <img
              src="/rings.jpg"
              alt="Wedding rings"
              className="w-full h-full object-cover object-center transform scale-110"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 mt-1">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contactName"
              className="text-xs font-bold text-[#221810] pl-1 tracking-wide"
            >
              Full name
            </label>
            <div
              className={`glass-input rounded-2xl flex items-center px-4 py-3.5 gap-3 ${
                errors.contactName ? 'border-rose-400 bg-rose-50/30' : ''
              }`}
            >
              <User className="w-4 h-4 text-[#6B5542] shrink-0" />
              <input
                type="text"
                id="contactName"
                autoComplete="name"
                placeholder="e.g. Aditi Sharma"
                value={data.contactName}
                onChange={(e) => {
                  onChange({ contactName: e.target.value });
                  if (errors.contactName) setErrors((prev) => ({ ...prev, contactName: undefined }));
                }}
                className="w-full bg-transparent text-sm text-[#140E0A] font-medium placeholder:text-[#918171] outline-none"
              />
            </div>
            {errors.contactName && (
              <p className="text-[11px] text-rose-700 font-semibold pl-1">{errors.contactName}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="whatsappNumber"
              className="text-xs font-bold text-[#221810] pl-1 tracking-wide"
            >
              Contact number
            </label>
            <div
              className={`glass-input rounded-2xl flex items-center px-3 py-2.5 gap-2.5 ${
                errors.whatsappNumber ? 'border-rose-400 bg-rose-50/30' : ''
              }`}
            >
              {/* Country Code Pill */}
              <div className="relative flex items-center border-r border-[#D5C5B5] pr-2 shrink-0">
                <select
                  aria-label="Country calling code"
                  value={data.countryCode}
                  onChange={(e) => onChange({ countryCode: e.target.value })}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-[#140E0A] outline-none cursor-pointer appearance-none pr-4"
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.flag} {item.code}
                    </option>
                  ))}
                </select>
                <ChevronRight className="w-3 h-3 text-[#6B5542] absolute right-0 pointer-events-none transform rotate-90" />
              </div>

              {/* Number Input */}
              <input
                type="tel"
                id="whatsappNumber"
                autoComplete="tel"
                placeholder="98765 43210"
                value={data.whatsappNumber}
                onChange={(e) => {
                  onChange({ whatsappNumber: e.target.value });
                  if (errors.whatsappNumber) setErrors((prev) => ({ ...prev, whatsappNumber: undefined }));
                }}
                className="w-full bg-transparent text-sm text-[#140E0A] font-medium placeholder:text-[#918171] outline-none"
              />

              <Phone className="w-4 h-4 text-[#6B5542] shrink-0" />
            </div>
            {errors.whatsappNumber && (
              <p className="text-[11px] text-rose-700 font-semibold pl-1">{errors.whatsappNumber}</p>
            )}
          </div>

          {/* Coverage Scope Segmented Control */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#221810] pl-1 tracking-wide">
              Coverage scope
            </label>
            <div
              className="bg-[#ECE2D5] p-1 rounded-2xl flex items-center border-1.5 border-[#D5C5B5]"
              role="radiogroup"
              aria-label="Coverage scope"
            >
              {(
                [
                  { id: 'both', label: 'Both' },
                  { id: 'bride', label: 'Bride' },
                  { id: 'groom', label: 'Groom' },
                ] as const
              ).map((option) => {
                const isSelected = data.coverageFor === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleCoverageSelect(option.id)}
                    className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none text-center ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#8E6D52] to-[#715239] text-white shadow-xs'
                        : 'text-[#423326] hover:text-[#1A140F]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wedding Date */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="primaryDate"
              className="text-xs font-bold text-[#221810] pl-1 tracking-wide"
            >
              Wedding date
            </label>
            <LuxuryDatePicker
              value={data.primaryDate}
              minDate={today}
              placeholder="Select celebration date"
              hasError={!!errors.primaryDate}
              onChange={(val) => {
                onChange({
                  primaryDate: val,
                  events: data.events.map((ev, idx) =>
                    idx === 0 && !ev.date ? { ...ev, date: val } : ev
                  ),
                });
                if (errors.primaryDate) setErrors((prev) => ({ ...prev, primaryDate: undefined }));
              }}
            />
            {errors.primaryDate && (
              <p className="text-[11px] text-rose-700 font-semibold pl-1">{errors.primaryDate}</p>
            )}
          </div>

          {/* City / Venue */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="primaryLocation"
              className="text-xs font-bold text-[#221810] pl-1 tracking-wide"
            >
              City / Venue
            </label>
            <div
              className={`glass-input rounded-2xl flex items-center justify-between px-4 py-3.5 gap-3 ${
                errors.primaryLocation ? 'border-rose-400 bg-rose-50/30' : ''
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <MapPin className="w-4 h-4 text-[#6B5542] shrink-0" />
                <input
                  type="text"
                  id="primaryLocation"
                  placeholder="e.g. Jaipur / The Leela Palace"
                  value={data.primaryLocation}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      primaryLocation: val,
                      events: data.events.map((ev, idx) =>
                        idx === 0 && !ev.location ? { ...ev, location: val } : ev
                      ),
                    });
                    if (errors.primaryLocation) setErrors((prev) => ({ ...prev, primaryLocation: undefined }));
                  }}
                  className="w-full bg-transparent text-sm text-[#2D251E] placeholder:text-[#A19588] outline-none"
                />
              </div>
              <ChevronRight className="w-4 h-4 text-[#8C7E72] shrink-0" />
            </div>
            {errors.primaryLocation && (
              <p className="text-[11px] text-rose-700 font-medium pl-1">{errors.primaryLocation}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Button (Bronze Pill with Chevron) */}
      <button
        type="button"
        onClick={validateAndProceed}
        className="relative w-full bg-gradient-to-r from-[#8E6D52] to-[#715239] text-white rounded-2xl py-4 px-6 flex items-center justify-center font-medium tracking-wide shadow-[0_6px_20px_rgba(113,82,57,0.25)] hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer select-none text-sm sm:text-base"
      >
        <span>Continue</span>
        <ChevronRight className="w-4 h-4 absolute right-6 text-white/90" />
      </button>
    </div>
  );
};

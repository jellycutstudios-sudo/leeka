import React from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import type { StepNumber } from '../types/enquiry';

interface TopNavProps {
  currentStep: StepNumber;
  totalSteps?: number;
  onBack?: () => void;
  canGoBack?: boolean;
  onStepClick?: (step: StepNumber) => void;
}

const STEPS_CONFIG: { step: StepNumber; label: string }[] = [
  { step: 1, label: 'Details' },
  { step: 2, label: 'Coverage' },
  { step: 3, label: 'Review' },
];

export const TopNav: React.FC<TopNavProps> = ({
  currentStep,
  onBack,
  canGoBack = false,
  onStepClick,
}) => {
  return (
    <header className="w-full max-w-md mx-auto pt-3 pb-2 px-1 flex flex-col gap-3 select-none">
      {/* Top Bar: Back Action, Luxury Wordmark, and Step Pill */}
      <div className="flex items-center justify-between">
        {/* Back Button with subtle glass styling */}
        <div className="w-9 h-9 flex items-center justify-start">
          {canGoBack && onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go to previous step"
              className="w-8.5 h-8.5 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-md border border-[#DFD6CA] text-[#5C4532] hover:text-[#1A140F] hover:bg-white active:scale-95 shadow-2xs transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>
          ) : (
            <span className="w-8.5 h-8.5" />
          )}
        </div>

        {/* Brand identity: Refined Editorial serif wordmark */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-3 bg-[#B89B7D]/50 hidden sm:block" />
            <span className="font-editorial text-lg sm:text-xl font-semibold tracking-[0.22em] text-[#1A140F] uppercase">
              LEEKA
            </span>
            <span className="h-[1px] w-3 bg-[#B89B7D]/50 hidden sm:block" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-[0.2em] text-[#8E6D52] uppercase -mt-0.5">
            Wedding Enquiry
          </span>
        </div>

        {/* Step indicator pill */}
        <div className="w-9 flex justify-end">
          <div className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[#8E6D52]/10 border border-[#8E6D52]/25 text-[#73543B] whitespace-nowrap">
            {currentStep}/3
          </div>
        </div>
      </div>

      {/* 3-Segment Stepper with Clean Progress & Meaningful Step Names */}
      <div className="grid grid-cols-3 gap-2 pt-0.5">
        {STEPS_CONFIG.map(({ step, label }) => {
          const isCompleted = currentStep > step;
          const isCurrent = currentStep === step;
          const canClick = isCompleted && Boolean(onStepClick);

          return (
            <button
              key={step}
              type="button"
              disabled={!canClick}
              onClick={() => canClick && onStepClick?.(step)}
              className={`flex flex-col gap-1.5 text-left transition-all ${
                canClick ? 'cursor-pointer hover:opacity-85' : 'cursor-default'
              }`}
            >
              {/* Segmented Bar */}
              <div
                className={`h-[3.5px] w-full rounded-full transition-all duration-300 relative overflow-hidden ${
                  isCompleted
                    ? 'bg-[#8E6D52]'
                    : isCurrent
                    ? 'bg-gradient-to-r from-[#8E6D52] to-[#A88669] shadow-[0_1px_4px_rgba(142,109,82,0.3)]'
                    : 'bg-[#E3D7CA]'
                }`}
              />

              {/* Step Label & Micro Indicator */}
              <div className="flex items-center gap-1 px-0.5">
                {isCompleted ? (
                  <Check className="w-2.5 h-2.5 text-[#8E6D52] stroke-[3] shrink-0" />
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                      isCurrent ? 'bg-[#8E6D52]' : 'bg-[#D1C2B2]'
                    }`}
                  />
                )}
                <span
                  className={`text-[11px] sm:text-xs tracking-tight transition-colors truncate ${
                    isCurrent
                      ? 'font-bold text-[#1A140F]'
                      : isCompleted
                      ? 'font-medium text-[#73543B]'
                      : 'font-normal text-[#9A8A7A]'
                  }`}
                >
                  {label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </header>
  );
};

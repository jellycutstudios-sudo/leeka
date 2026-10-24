import React from 'react';
import { ChevronLeft } from 'lucide-react';
import type { StepNumber } from '../types/enquiry';

interface TopNavProps {
  currentStep: StepNumber;
  totalSteps?: number;
  onBack?: () => void;
  canGoBack?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentStep,
  totalSteps = 3,
  onBack,
  canGoBack = false,
}) => {
  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div className="w-full max-w-md mx-auto pt-4 pb-2 px-2 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {/* Back button */}
        <div className="w-10">
          {canGoBack && onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go to previous step"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#574D43] hover:text-[#2D251E] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
          ) : (
            <span className="w-9 h-9 block" />
          )}
        </div>

        {/* Title */}
        <h1 className="font-editorial text-lg sm:text-xl font-semibold tracking-wide text-[#1A140F]">
          Wedding Booking
        </h1>

        {/* Step indicator */}
        <div className="w-20 text-right">
          <span className="text-xs font-serif italic text-[#5C4D3E] font-medium">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      </div>

      {/* Sleek thin progress line */}
      <div className="w-full h-[2.5px] bg-[#DDD0C2] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#8E6D52] to-[#6E4F36] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

import React from 'react';

interface ProgressProps {
  currentStep: number; // 1, 2, or 3
  totalSteps?: number;
  stepNames?: string[];
  onStepClick?: (step: number) => void;
}

export const Progress: React.FC<ProgressProps> = ({
  currentStep,
  totalSteps = 3,
  stepNames = ['Occasion', 'Coverage', 'Review'],
  onStepClick,
}) => {
  return (
    <nav
      aria-label="Enquiry progress"
      className="w-full max-w-lg mx-auto py-3 px-1"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#B59A70]">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-medium text-[#5A5A5A]">
          {stepNames[currentStep - 1]}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2" role="list">
        {stepNames.map((name, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isClickable = isCompleted && onStepClick;

          return (
            <div
              key={name}
              role="listitem"
              onClick={() => isClickable && onStepClick(stepNum)}
              className={`flex flex-col gap-1 ${
                isClickable ? 'cursor-pointer group' : ''
              }`}
              title={isClickable ? `Return to Step ${stepNum}: ${name}` : undefined}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#B59A70]'
                    : isCompleted
                    ? 'bg-[#242424]'
                    : 'bg-[#E8E4DC]'
                }`}
              />
              <span
                className={`text-[11px] truncate transition-colors ${
                  isCurrent
                    ? 'font-semibold text-[#242424]'
                    : isCompleted
                    ? 'text-[#5A5A5A] group-hover:text-[#242424]'
                    : 'text-[#9E9E9E]'
                }`}
              >
                {stepNum}. {name}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

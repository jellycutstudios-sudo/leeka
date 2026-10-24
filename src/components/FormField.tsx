import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required = false,
  hint,
  error,
  children,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-[#242424] tracking-wide"
        >
          {label}
          {required && (
            <span className="text-[#B59A70] ml-1" title="Required">
              *
            </span>
          )}
        </label>
        {hint && !error && (
          <span className="text-xs text-[#737373]">{hint}</span>
        )}
      </div>

      <div className="relative">{children}</div>

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-rose-700 font-medium flex items-center gap-1 mt-0.5"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

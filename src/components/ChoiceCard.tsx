import React from 'react';
import { Check } from 'lucide-react';

interface ChoiceCardProps {
  id: string;
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  badge?: string;
  isMulti?: boolean;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  id,
  title,
  description,
  selected,
  onClick,
  icon,
  badge,
  isMulti = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role={isMulti ? 'checkbox' : 'radio'}
      aria-checked={selected}
      tabIndex={0}
      id={id}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex items-start justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer min-h-[58px] select-none ${
        selected
          ? 'bg-[#FAF7F2] border-[#B59A70] shadow-xs ring-1 ring-[#B59A70]/30'
          : 'bg-white border-[#E8E4DC] hover:border-[#B59A70]/60 hover:bg-[#FDFBF7]'
      }`}
    >
      <div className="flex items-start gap-3.5 pr-3">
        {icon && (
          <div
            className={`mt-0.5 shrink-0 transition-colors ${
              selected ? 'text-[#B59A70]' : 'text-[#737373] group-hover:text-[#242424]'
            }`}
          >
            {icon}
          </div>
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-semibold tracking-wide transition-colors ${
                selected ? 'text-[#242424]' : 'text-[#333333]'
              }`}
            >
              {title}
            </span>
            {badge && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#B59A70]/15 text-[#8F764F]">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      <div
        className={`shrink-0 w-5 h-5 mt-0.5 transition-all duration-200 flex items-center justify-center ${
          isMulti ? 'rounded-md' : 'rounded-full'
        } ${
          selected
            ? 'bg-[#B59A70] text-white border border-[#B59A70]'
            : 'border border-[#D1CCC2] bg-white group-hover:border-[#B59A70]'
        }`}
      >
        {selected && (
          isMulti ? (
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-white" />
          )
        )}
      </div>
    </div>
  );
};

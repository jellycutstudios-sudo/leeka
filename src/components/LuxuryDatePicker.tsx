import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown, X, Sparkles } from 'lucide-react';
import { formatDisplayDate, getTodayDateString } from '../lib/formatDate';

interface LuxuryDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (dateStr: string) => void;
  minDate?: string;
  placeholder?: string;
  hasError?: boolean;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AVAILABLE_YEARS = [2026, 2027, 2028, 2029];

export const LuxuryDatePicker: React.FC<LuxuryDatePickerProps> = ({
  value,
  onChange,
  minDate = getTodayDateString(),
  placeholder = 'Select date',
  hasError = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [viewYear, setViewYear] = useState<number>(() => {
    if (value && value.includes('-')) {
      const d = new Date(value + 'T00:00:00');
      if (!isNaN(d.getTime())) return d.getFullYear();
    }
    return 2026;
  });

  const [viewMonth, setViewMonth] = useState<number>(() => {
    if (value && value.includes('-')) {
      const d = new Date(value + 'T00:00:00');
      if (!isNaN(d.getTime())) return d.getMonth();
    }
    return 0;
  });

  const openPicker = () => {
    if (value && value.includes('-')) {
      const d = new Date(value + 'T00:00:00');
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
    setIsOpen(true);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => Math.max(AVAILABLE_YEARS[0], y - 1));
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => Math.min(AVAILABLE_YEARS[AVAILABLE_YEARS.length - 1], y + 1));
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Days in viewMonth
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayWeekday = new Date(viewYear, viewMonth, 1).getDay();

  // Helper to format date as YYYY-MM-DD
  const makeDateString = (day: number) => {
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${viewYear}-${mm}-${dd}`;
  };

  const handleSelectDay = (day: number) => {
    const dateStr = makeDateString(day);
    if (minDate && dateStr < minDate) return;
    onChange(dateStr);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Trigger Box */}
      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPicker();
          }
        }}
        className={`glass-input rounded-2xl flex items-center justify-between px-4 py-3.5 gap-3 cursor-pointer select-none group transition-all ${
          hasError ? 'border-rose-400 bg-rose-50/30' : ''
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <CalendarIcon className="w-4 h-4 text-[#6B5542] shrink-0 group-hover:text-[#8E6D52] transition-colors" />
          <span
            className={`text-sm truncate ${
              value ? 'text-[#140E0A] font-semibold' : 'text-[#918171]'
            }`}
          >
            {value ? formatDisplayDate(value) : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[#6B5542] shrink-0 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180 text-[#8E6D52]' : ''
          }`}
        />
      </div>

      {/* Luxury Calendar Modal with Rich Dark Frosted Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1E1712]/65 backdrop-blur-md animate-fadeIn">
          {/* Backdrop Click Dismiss */}
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

          {/* Calendar Card */}
          <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-[#FAF7F2] rounded-t-[32px] sm:rounded-[32px] border border-white/90 p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.3)] flex flex-col gap-4 animate-slideUp">
            {/* Header: Title & Close */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#EAE3D9]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A88669]" />
                <h3 className="font-editorial text-lg font-medium text-[#2D251E]">
                  Select Wedding Date
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#8C7E72] hover:text-[#2D251E] hover:bg-black/5 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Year Selector Tabs (Effortless 1-tap Year Switching) */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium text-[#7D7166] pl-0.5">Year</span>
              <div className="flex items-center gap-1.5 p-1 bg-[#EFE9DF]/80 rounded-2xl border border-[#E4DCCF]">
                {AVAILABLE_YEARS.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setViewYear(y)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                      viewYear === y
                        ? 'bg-gradient-to-r from-[#9C7C5F] to-[#826246] text-white shadow-2xs font-semibold'
                        : 'text-[#6B5E52] hover:text-[#2D251E]'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            {/* Month Selector Bar with Interactive Month Dropdown & Chevrons */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium text-[#7D7166] pl-0.5">Month</span>
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B5E52] hover:bg-white border border-[#E6DDD2]/80 transition-all cursor-pointer shadow-2xs active:scale-95"
                  title="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Direct Month Dropdown Pill */}
                <div className="relative flex-1">
                  <select
                    aria-label="Select month"
                    value={viewMonth}
                    onChange={(e) => setViewMonth(Number(e.target.value))}
                    className="w-full font-editorial text-base sm:text-lg font-semibold text-[#2D251E] bg-white/90 border border-[#E6DDD2] rounded-xl px-4 py-1.5 pr-8 cursor-pointer shadow-2xs hover:border-[#8E6D52] transition-colors appearance-none text-center"
                  >
                    {MONTH_NAMES.map((name, idx) => (
                      <option key={name} value={idx}>
                        {name} {viewYear}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8C7E72] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B5E52] hover:bg-white border border-[#E6DDD2]/80 transition-all cursor-pointer shadow-2xs active:scale-95"
                  title="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekdays Row */}
            <div className="grid grid-cols-7 gap-1 text-center pt-1 border-t border-[#EAE3D9]/60">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <span key={d} className="text-[11px] font-semibold text-[#8C7E72] py-0.5">
                  {d}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Empty leading slots */}
              {Array.from({ length: firstDayWeekday }).map((_, i) => (
                <div key={`empty-${i}`} className="h-9 w-9 mx-auto" />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = makeDateString(day);
                const isSelected = value === dateStr;
                const isPast = minDate ? dateStr < minDate : false;

                return (
                  <button
                    key={dateStr}
                    type="button"
                    disabled={isPast}
                    onClick={() => handleSelectDay(day)}
                    className={`h-9 w-9 mx-auto rounded-full text-xs font-medium flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${
                      isPast
                        ? 'text-[#C9BFB5] cursor-not-allowed opacity-40'
                        : isSelected
                        ? 'bg-gradient-to-r from-[#9C7C5F] to-[#826246] text-white shadow-sm font-semibold scale-105 ring-2 ring-[#826246]/20'
                        : 'text-[#2D251E] hover:bg-[#EEDFD3] hover:text-[#2D251E]'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2.5 border-t border-[#EAE3D9] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                }}
                className="text-xs text-[#8C7E72] hover:text-rose-600 font-medium cursor-pointer py-1"
              >
                Clear date
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-gradient-to-r from-[#8E6D52] to-[#715239] hover:brightness-105 text-white text-xs font-medium rounded-xl transition-all cursor-pointer shadow-xs active:scale-98"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

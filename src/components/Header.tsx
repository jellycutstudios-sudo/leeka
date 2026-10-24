import React from 'react';
import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  hasDraft?: boolean;
  onReset?: () => void;
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  hasDraft = false,
  onReset,
  onLogoClick,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#F8F6F2]/90 backdrop-blur-md border-b border-[#E8E4DC]/80 transition-all">
      <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <button
          onClick={onLogoClick}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A70] rounded-sm"
          title="Leeka Wedding Home"
        >
          <h1 className="font-editorial text-2xl sm:text-3xl font-semibold tracking-[0.2em] text-[#242424] uppercase transition-colors group-hover:text-[#B59A70]">
            Leeka Wedding
          </h1>
          <p className="text-[10px] tracking-[0.25em] text-[#737373] uppercase font-medium">
            Fine Art Wedding Stories
          </p>
        </button>

        <div className="flex items-center gap-3">
          {hasDraft && onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#737373] hover:text-[#242424] hover:bg-[#EFECE6] rounded-full transition-colors cursor-pointer"
              title="Clear draft and start fresh"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Start over</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFECE6]/80 border border-[#E0DCD4] text-[11px] font-medium text-[#5A5A5A]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="hidden xs:inline">Bookings Open</span>
            <span className="xs:hidden">Open</span>
          </div>
        </div>
      </div>
    </header>
  );
};

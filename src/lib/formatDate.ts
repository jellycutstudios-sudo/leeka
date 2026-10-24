/**
 * Formats a YYYY-MM-DD local string into a human-readable luxury date.
 * Does NOT parse into UTC to prevent timezone day-shift issues.
 */
export function formatDisplayDate(dateStr: string): string {
  if (!dateStr || !dateStr.includes('-')) return '';
  
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return dateStr;

  const date = new Date(year, month, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Returns today's date formatted as YYYY-MM-DD in the user's local timezone.
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface ParsedDate {
  year: number;
  month: number; // 0-indexed: 0 = Jan, 11 = Dec
  day: number;
}

export function parseDateString(dateStr?: string): ParsedDate | null {
  if (!dateStr || !dateStr.includes('-')) return null;
  const [yStr, mStr, dStr] = dateStr.split('-');
  const year = parseInt(yStr, 10);
  const month = parseInt(mStr, 10) - 1;
  const day = parseInt(dStr, 10);
  if (isNaN(year) || isNaN(month)) return null;
  return { year, month, day: isNaN(day) ? 1 : day };
}

export function getDefaultCalendarView(
  value?: string,
  minDate?: string
): { year: number; month: number } {
  const valParsed = parseDateString(value);
  if (valParsed) {
    return { year: valParsed.year, month: valParsed.month };
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const minParsed = parseDateString(minDate);
  if (minParsed) {
    if (
      minParsed.year > currentYear ||
      (minParsed.year === currentYear && minParsed.month > currentMonth)
    ) {
      return { year: minParsed.year, month: minParsed.month };
    }
  }

  return { year: currentYear, month: currentMonth };
}

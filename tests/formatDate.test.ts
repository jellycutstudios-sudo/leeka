import { describe, it, expect } from 'vitest';
import {
  parseDateString,
  getDefaultCalendarView,
  formatDisplayDate,
  getTodayDateString,
} from '../src/lib/formatDate';

describe('Date Utilities & Calendar Logic', () => {
  it('parses YYYY-MM-DD correctly into 0-indexed month and day', () => {
    const parsed = parseDateString('2026-10-25');
    expect(parsed).toEqual({
      year: 2026,
      month: 9, // October
      day: 25,
    });
  });

  it('handles invalid or empty date strings safely', () => {
    expect(parseDateString('')).toBeNull();
    expect(parseDateString(undefined)).toBeNull();
    expect(parseDateString('invalid-date')).toBeNull();
  });

  it('getDefaultCalendarView returns current month and year when value is empty', () => {
    const now = new Date();
    const result = getDefaultCalendarView('', getTodayDateString());
    expect(result.year).toBe(now.getFullYear());
    expect(result.month).toBe(now.getMonth());
  });

  it('getDefaultCalendarView returns selected date month and year when value is set', () => {
    const result = getDefaultCalendarView('2027-05-18', '2026-10-25');
    expect(result.year).toBe(2027);
    expect(result.month).toBe(4); // May is index 4
  });

  it('getDefaultCalendarView jumps to future minDate when minDate is far in future and no value set', () => {
    const result = getDefaultCalendarView('', '2028-02-01');
    expect(result.year).toBe(2028);
    expect(result.month).toBe(1); // February is index 1
  });

  it('formats display date correctly without day-shift or timezone issues', () => {
    const formatted = formatDisplayDate('2026-10-25');
    expect(formatted).toContain('2026');
    expect(formatted).toContain('25');
    expect(formatted).toContain('Oct');
  });
});

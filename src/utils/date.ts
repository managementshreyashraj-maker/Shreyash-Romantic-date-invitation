export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MONTHS = [
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

/** Strip time so two calendar days compare by date only. */
export function atStartOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Whole-month comparison: is `month/year` strictly before `ref`? */
export function isMonthBefore(year: number, month: number, ref: Date): boolean {
  const refYear = ref.getFullYear();
  const refMonth = ref.getMonth();
  if (year < refYear) return true;
  if (year === refYear && month < refMonth) return true;
  return false;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** 0 = Sunday … 6 = Saturday, matching JS Date. */
export function firstWeekday(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatDateLong(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

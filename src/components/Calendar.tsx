import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  WEEKDAYS,
  MONTHS,
  atStartOfDay,
  isMonthBefore,
  daysInMonth,
  firstWeekday,
  isSameDay,
} from '../utils/date';

type Props = {
  viewYear: number;
  viewMonth: number;
  selected: Date | null;
  today: Date;
  onChangeView: (year: number, month: number) => void;
  onSelect: (day: Date) => void;
  /** Optional key to force a re-mount animation when the month changes. */
  animKey: string;
};

/**
 * Reusable mobile-first calendar grid.
 *
 * - Starts from the device's local current month.
 * - Past days are visually disabled and not selectable.
 * - A single selected day is highlighted with the blush-pink accent.
 * - Month navigation cannot go before the current month.
 */
export default function Calendar({
  viewYear,
  viewMonth,
  selected,
  today,
  onChangeView,
  onSelect,
  animKey,
}: Props) {
  const todayNorm = useMemo(() => atStartOfDay(today), [today]);

  const cells = useMemo(() => {
    const total = daysInMonth(viewYear, viewMonth);
    const lead = firstWeekday(viewYear, viewMonth);
    const trail = (7 - ((lead + total) % 7)) % 7;
    const items: (Date | null)[] = [];

    for (let i = 0; i < lead; i++) items.push(null);
    for (let d = 1; d <= total; d++) items.push(new Date(viewYear, viewMonth, d));
    for (let i = 0; i < trail; i++) items.push(null);

    return items;
  }, [viewYear, viewMonth]);

  const canGoBack = !isMonthBefore(viewYear, viewMonth, today) &&
    !(viewYear === today.getFullYear() && viewMonth === today.getMonth());

  const prevMonth = () => {
    if (!canGoBack) return;
    if (viewMonth === 0) onChangeView(viewYear - 1, 11);
    else onChangeView(viewYear, viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) onChangeView(viewYear + 1, 0);
    else onChangeView(viewYear, viewMonth + 1);
  };

  return (
    <div className="w-full rounded-3xl border border-blush-200/60 bg-white/80 p-4 shadow-soft backdrop-blur-sm sm:p-6">
      {/* Month / year header with navigation. */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            prevMonth();
          }}
          disabled={!canGoBack}
          aria-label="Previous month"
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            canGoBack
              ? 'bg-blush-100 text-blush-700 active:scale-90'
              : 'cursor-not-allowed bg-blush-100/40 text-blush-300'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <h3 className="font-display text-lg font-semibold text-blush-700 sm:text-xl">
          {MONTHS[viewMonth]} {viewYear}
        </h3>

        <button
          onPointerDown={(e) => {
            e.preventDefault();
            nextMonth();
          }}
          aria-label="Next month"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-blush-100 text-blush-700 transition-transform active:scale-90"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Weekday labels. */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="py-1 text-center text-[0.7rem] font-semibold uppercase tracking-wide text-blush-500/70 sm:text-xs"
          >
            {w.charAt(0)}
          </div>
        ))}
      </div>

      {/* Day grid — re-keyed on month change to animate. */}
      <div
        key={animKey}
        className="animate-month-change grid grid-cols-7 gap-1"
      >
        {cells.map((day, i) => {
          if (!day) return <div key={i} aria-hidden="true" />;

          const past = day < todayNorm;
          const isSelected = selected ? isSameDay(day, selected) : false;
          const isToday = isSameDay(day, todayNorm);

          return (
            <button
              key={i}
              disabled={past}
              onPointerDown={(e) => {
                e.preventDefault();
                if (!past) onSelect(day);
              }}
              aria-label={day.toDateString()}
              aria-pressed={isSelected}
              className={`relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition-all duration-150 active:scale-90 sm:text-base ${
                isSelected
                  ? 'bg-blush-600 text-white shadow-soft'
                  : past
                  ? 'cursor-not-allowed text-blush-300'
                  : 'text-blush-700 hover:bg-blush-100'
              }`}
            >
              {day.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-blush-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

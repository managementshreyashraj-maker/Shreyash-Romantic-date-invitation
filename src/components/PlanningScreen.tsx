import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import Calendar from './Calendar';
import { formatDateLong } from '../utils/date';

type Props = {
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
  onContinue: () => void;
  onBack: () => void;
};

export default function PlanningScreen({
  selectedDate,
  onSelectDate,
  onContinue,
  onBack,
}: Props) {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const changeView = (year: number, month: number) => {
    setViewYear(year);
    setViewMonth(month);
  };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col items-center overflow-hidden px-6 pb-6 pt-10 safe-x safe-top safe-bottom">
      <FloatingHearts count={8} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 30%, rgba(255, 240, 232, 0.9) 0%, rgba(255, 243, 236, 0) 60%)',
        }}
      />

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        <h2
          className="animate-fade-in-up font-display text-[2rem] leading-tight text-blush-700 sm:text-4xl"
          style={{ animationDelay: '0.05s' }}
        >
          Pick a date <span className="text-blush-600">❤️</span>
        </h2>

        <p
          className="animate-fade-in-up mt-2 text-base text-blush-600/70 sm:text-lg"
          style={{ animationDelay: '0.15s' }}
        >
          When should we make it happen?
        </p>

        {/* Calendar */}
        <div
          className="animate-fade-in-up mt-6 w-full max-w-sm"
          style={{ animationDelay: '0.25s' }}
        >
          <Calendar
            viewYear={viewYear}
            viewMonth={viewMonth}
            selected={selectedDate}
            today={today}
            onChangeView={changeView}
            onSelect={onSelectDate}
            animKey={`${viewYear}-${viewMonth}`}
          />
        </div>

        {/* Confirmation + continue */}
        <div
          className="animate-fade-in-up mt-6 w-full max-w-sm"
          style={{ animationDelay: '0.35s' }}
        >
          <div
            className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-3 transition-all duration-300 ${
              selectedDate
                ? 'bg-blush-100/70 opacity-100'
                : 'bg-transparent opacity-60'
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-500">
              {selectedDate ? 'Date selected' : 'No date yet'}
            </p>
            <p className="font-display text-base font-medium text-blush-700 sm:text-lg">
              {selectedDate ? formatDateLong(selectedDate) : 'Tap a day to choose'}
            </p>
          </div>

          <button
            onPointerDown={(e) => {
              if (!selectedDate) {
                e.preventDefault();
                return;
              }
              onContinue();
            }}
            disabled={!selectedDate}
            aria-label="Continue to time selection"
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all duration-200 active:scale-95 sm:text-lg ${
              selectedDate
                ? 'animate-soft-pulse bg-blush-600 text-white shadow-soft'
                : 'cursor-not-allowed bg-blush-200/50 text-blush-400'
            }`}
          >
            CONTINUE <ArrowRight className="h-5 w-5" />
          </button>

          <button
            onPointerDown={onBack}
            className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border-2 border-blush-500 bg-white px-6 py-2.5 text-sm font-semibold text-blush-700 shadow-sm transition-transform duration-200 active:scale-95"
            aria-label="Back to celebration"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {selectedDate && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-blush-500">
              <Check className="h-3.5 w-3.5" /> Looks good? Continue when you're ready.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

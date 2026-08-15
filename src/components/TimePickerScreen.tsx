import { Clock, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import { formatDateLong } from '../utils/date';

const TIME_OPTIONS = [
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
];

type Props = {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectTime: (t: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

export default function TimePickerScreen({
  selectedDate,
  selectedTime,
  onSelectTime,
  onContinue,
  onBack,
}: Props) {
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
          Pick a time <span className="text-blush-600">⏰</span>
        </h2>

        <p
          className="animate-fade-in-up mt-2 text-base text-blush-600/70 sm:text-lg"
          style={{ animationDelay: '0.15s' }}
        >
          What time should we meet?
        </p>

        {selectedDate && (
          <p
            className="animate-fade-in-up mt-1 text-sm text-blush-500"
            style={{ animationDelay: '0.2s' }}
          >
            for {formatDateLong(selectedDate)}
          </p>
        )}

        {/* Time options card */}
        <div
          className="animate-fade-in-up mt-6 w-full max-w-sm rounded-3xl border border-blush-200/60 bg-white/80 p-5 shadow-soft backdrop-blur-sm sm:p-6"
          style={{ animationDelay: '0.25s' }}
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-blush-500">
            <Clock className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              Evening times
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {TIME_OPTIONS.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    onSelectTime(time);
                  }}
                  aria-pressed={isSelected}
                  className={`flex h-14 items-center justify-center rounded-2xl text-base font-semibold transition-all duration-150 active:scale-95 sm:h-16 sm:text-lg ${
                    isSelected
                      ? 'bg-blush-600 text-white shadow-soft'
                      : 'border border-blush-200 bg-white text-blush-700 active:bg-blush-100'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirmation + continue */}
        <div
          className="animate-fade-in-up mt-6 w-full max-w-sm"
          style={{ animationDelay: '0.35s' }}
        >
          <div
            className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-3 transition-all duration-300 ${
              selectedTime
                ? 'bg-blush-100/70 opacity-100'
                : 'bg-transparent opacity-60'
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-500">
              {selectedTime ? 'Time selected' : 'No time yet'}
            </p>
            <p className="font-display text-base font-medium text-blush-700 sm:text-lg">
              {selectedTime ? selectedTime : 'Tap a time to choose'}
            </p>
          </div>

          <button
            onPointerDown={(e) => {
              if (!selectedTime) {
                e.preventDefault();
                return;
              }
              onContinue();
            }}
            disabled={!selectedTime}
            aria-label="Continue to food selection"
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all duration-200 active:scale-95 sm:text-lg ${
              selectedTime
                ? 'animate-soft-pulse bg-blush-600 text-white shadow-soft'
                : 'cursor-not-allowed bg-blush-200/50 text-blush-400'
            }`}
          >
            CONTINUE <ArrowRight className="h-5 w-5" />
          </button>

          <button
            onPointerDown={onBack}
            className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border-2 border-blush-500 bg-white px-6 py-2.5 text-sm font-semibold text-blush-700 shadow-sm transition-transform duration-200 active:scale-95"
            aria-label="Change date"
          >
            <ArrowLeft className="h-4 w-4" /> CHANGE DATE
          </button>

          {selectedTime && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-blush-500">
              <Check className="h-3.5 w-3.5" /> Looks good? Continue when you're ready.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

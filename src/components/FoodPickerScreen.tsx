import { ArrowLeft, ArrowRight, Check, Heart } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import { formatDateLong } from '../utils/date';

type FoodOption = {
  emoji: string;
  name: string;
  description: string;
};

const FOOD_OPTIONS: FoodOption[] = [
  { emoji: '🍔', name: 'Burgers', description: 'Classic and delicious' },
  { emoji: '🍕', name: 'Pizza', description: 'A slice of happiness' },
  { emoji: '🍗', name: 'Briyani', description: 'Warm & cozy' },
  { emoji: '🌯', name: 'Roll', description: 'A little spicy 🌶️' },
  { emoji: '🍝', name: 'Pasta', description: 'Comfort food' },
  { emoji: '☕', name: 'coffee', description: 'Something special' },
];

type Props = {
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedFood: string | null;
  onSelectFood: (f: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

export default function FoodPickerScreen({
  selectedDate,
  selectedTime,
  selectedFood,
  onSelectFood,
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
          One more thing... <span className="text-blush-600">❤️</span>
        </h2>

        <p
          className="animate-fade-in-up mt-2 text-base text-blush-600/70 sm:text-lg"
          style={{ animationDelay: '0.15s' }}
        >
          What should we eat?
        </p>

        {(selectedDate || selectedTime) && (
          <p
            className="animate-fade-in-up mt-1 text-sm text-blush-500"
            style={{ animationDelay: '0.2s' }}
          >
            {selectedDate && formatDateLong(selectedDate)}
            {selectedDate && selectedTime && ' · '}
            {selectedTime}
          </p>
        )}

        {/* Food grid */}
        <div
          className="animate-fade-in-up mt-6 grid w-full max-w-sm grid-cols-2 gap-3 sm:max-w-md sm:gap-4"
          style={{ animationDelay: '0.25s' }}
        >
          {FOOD_OPTIONS.map((food) => {
            const isSelected = selectedFood === food.name;
            return (
              <button
                key={food.name}
                onPointerDown={(e) => {
                  e.preventDefault();
                  onSelectFood(food.name);
                }}
                aria-pressed={isSelected}
                className={`flex flex-col items-center gap-1 rounded-2xl border-2 px-3 py-5 text-center shadow-sm transition-all duration-150 active:scale-95 sm:py-6 ${
                  isSelected
                    ? 'scale-[1.03] border-blush-600 bg-blush-600 text-white shadow-soft'
                    : 'border-blush-200 bg-white/90 text-blush-700 active:bg-blush-100'
                }`}
              >
                <span className="text-3xl sm:text-4xl">{food.emoji}</span>
                <span className="font-display text-base font-semibold sm:text-lg">
                  {food.name}
                </span>
                <span
                  className={`text-xs ${
                    isSelected ? 'text-white/80' : 'text-blush-600/60'
                  }`}
                >
                  {food.description}
                </span>
                {isSelected && (
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
                    <Heart className="h-3 w-3 fill-white" strokeWidth={0} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Confirmation + continue */}
        <div
          className="animate-fade-in-up mt-6 w-full max-w-sm"
          style={{ animationDelay: '0.35s' }}
        >
          <div
            className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-3 transition-all duration-300 ${
              selectedFood
                ? 'bg-blush-100/70 opacity-100'
                : 'bg-transparent opacity-60'
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-500">
              {selectedFood ? 'Food selected' : 'No food yet'}
            </p>
            <p className="font-display text-base font-medium text-blush-700 sm:text-lg">
              {selectedFood ? selectedFood : 'Tap a card to choose'}
            </p>
          </div>

          <button
            onPointerDown={(e) => {
              if (!selectedFood) {
                e.preventDefault();
                return;
              }
              onContinue();
            }}
            disabled={!selectedFood}
            aria-label="See our date"
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all duration-200 active:scale-95 sm:text-lg ${
              selectedFood
                ? 'animate-soft-pulse bg-blush-600 text-white shadow-soft'
                : 'cursor-not-allowed bg-blush-200/50 text-blush-400'
            }`}
          >
            SEE OUR DATE <ArrowRight className="h-5 w-5" />
          </button>

          <button
            onPointerDown={onBack}
            className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border-2 border-blush-500 bg-white px-6 py-2.5 text-sm font-semibold text-blush-700 shadow-sm transition-transform duration-200 active:scale-95"
            aria-label="Change time"
          >
            <ArrowLeft className="h-4 w-4" /> CHANGE TIME
          </button>

          {selectedFood && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-blush-500">
              <Check className="h-3.5 w-3.5" /> Looks delicious? Continue when you're ready.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useMemo } from 'react';
import FloatingHearts from './FloatingHearts';
import ConfettiBurst from './ConfettiBurst';
import { ArrowRight, Heart } from 'lucide-react';

export default function CelebrationScreen({ onPlan }: { onPlan: () => void }) {
  // Confetti positions are stable per mount.
  const confetti = useMemo(() => ConfettiBurst.generate(16), []);

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col items-center justify-center overflow-hidden px-6 safe-x safe-top safe-bottom">
      <FloatingHearts count={10} />
      <ConfettiBurst pieces={confetti} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 35%, rgba(255, 235, 225, 0.85) 0%, rgba(255, 243, 236, 0) 62%)',
        }}
      />

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        {/* Pulsing heart at top/center. */}
        <div
          className="animate-heart-pop mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-blush-100 shadow-glow sm:h-32 sm:w-32"
          style={{ animationDelay: '0.1s' }}
        >
          <Heart
            className="animate-celebrate-pulse h-14 w-14 fill-blush-600 text-blush-600 sm:h-16 sm:w-16"
            strokeWidth={0}
          />
        </div>

        <h2
          className="animate-fade-in-up font-display text-[2.4rem] leading-[1.1] text-blush-700 sm:text-6xl"
          style={{ animationDelay: '0.25s' }}
        >
          NO WAY. 😭❤️❤️❤️
        </h2>

        <p
          className="animate-fade-in-up mt-4 font-display text-2xl font-semibold text-blush-600 sm:text-3xl"
          style={{ animationDelay: '0.4s' }}
        >
          YOU SAID YES!
        </p>

        <p
          className="animate-fade-in-up mt-4 max-w-xs text-base leading-relaxed text-blush-600/70"
          style={{ animationDelay: '0.55s' }}
        >
          Okay... this just made my day.
        </p>

        {/* Primary CTA at the bottom portion of the screen. */}
        <div
          className="animate-fade-in-up mt-12 w-full px-2"
          style={{ animationDelay: '0.7s' }}
        >
          <button
            onPointerDown={onPlan}
            className="animate-soft-pulse mx-auto flex items-center gap-2 rounded-full bg-blush-600 px-10 py-4 text-lg font-semibold text-white shadow-soft transition-transform duration-200 active:scale-95"
            aria-label="Let's plan the date"
          >
            LET'S PLAN IT <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

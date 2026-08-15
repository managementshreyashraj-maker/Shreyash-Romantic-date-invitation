import { useRef } from 'react';
import { Heart } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import { useEvasiveNo } from '../hooks/useEvasiveNo';

export default function OpeningScreen({ onYes }: { onYes: () => void }) {
  const buttonAreaRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);

  const { noRef, style: noStyle, dodge } = useEvasiveNo({
    containerRef: buttonAreaRef,
    yesRef,
  });

  const handleYes = () => {
    // eslint-disable-next-line no-console
    console.log('Date invitation: accepted ❤️');
    onYes();
  };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col items-center justify-center overflow-hidden px-6 safe-x safe-top safe-bottom">
      <FloatingHearts count={12} />

      {/* Soft radial glow behind the content for warmth. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 38%, rgba(255, 240, 232, 0.9) 0%, rgba(255, 243, 236, 0) 60%)',
        }}
      />

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        <p
          className="animate-fade-in-up mb-5 text-sm font-medium uppercase tracking-[0.32em] text-blush-500"
          style={{ animationDelay: '0.05s' }}
        >
          A little question
        </p>

        <h1
          className="animate-fade-in-up font-display text-[2.1rem] leading-[1.15] text-blush-700 sm:text-5xl"
          style={{ animationDelay: '0.15s' }}
        >
          Will you go on a
          <br />
          date with me?{' '}
          <span className="text-blush-600">❤️</span>
        </h1>

        <p
          className="animate-fade-in-up mt-5 max-w-xs text-base leading-relaxed text-blush-600/70"
          style={{ animationDelay: '0.3s' }}
        >
          Just say the word and we'll plan something lovely together.
        </p>

        {/* Dedicated button area — also the dodge boundary for NO. */}
        <div
          ref={buttonAreaRef}
          className="relative z-30 mt-10 flex h-72 w-full flex-col items-center justify-center gap-6 sm:h-80"
        >
          {/* YES: wrapper handles the entrance fade, button handles the pulse.
               Splitting them avoids two `animation` shorthands clobbering
               each other (which left the button stuck at opacity:0). */}
          <div
            className="animate-fade-in-up relative z-20"
            style={{ animationDelay: '0.45s' }}
          >
            <button
              ref={yesRef}
              onPointerDown={handleYes}
              className="animate-soft-pulse flex items-center gap-2 rounded-full bg-blush-600 px-12 py-4 text-lg font-semibold text-white shadow-soft transition-transform duration-200 active:scale-95"
              aria-label="Yes, I'll go on a date with you"
            >
              YES <Heart className="h-5 w-5 fill-white" strokeWidth={0} />
            </button>
          </div>

          {/* NO: starts in normal flow below YES. Only switches to
               absolute positioning once the user actually interacts. */}
          <button
            ref={noRef}
            onPointerDown={(e) => {
              e.preventDefault();
              dodge();
            }}
            className="animate-fade-in-up rounded-full border-2 border-blush-500 bg-white px-8 py-3 text-sm font-semibold text-blush-700 shadow-sm transition-transform duration-200 active:scale-95"
            style={{ ...noStyle, animationDelay: '0.55s' }}
            aria-label="No, decline the invitation"
          >
            NO
          </button>
        </div>

        <p
          className="animate-fade-in-up mt-4 text-xs text-blush-600/50"
          style={{ animationDelay: '0.7s' }}
        >
          (You can also press NO with the keyboard if you really mean it.)
        </p>
      </div>
    </section>
  );
}

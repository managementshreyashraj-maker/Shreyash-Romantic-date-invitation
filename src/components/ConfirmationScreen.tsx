import { useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  CalendarDays,
  Clock,
  UtensilsCrossed,
  ArrowLeft,
  Sparkles,
  Heart,
} from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import ConfettiBurst from './ConfettiBurst';
import { formatDateLong } from '../utils/date';

const EMAILJS_SERVICE_ID = 'service_rif2l95';
const EMAILJS_TEMPLATE_ID = 'template_zn1e1f8';
const EMAILJS_PUBLIC_KEY = 'eqa8tkTQjn54wS-5T';

type Props = {
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedFood: string | null;
  onBack: () => void;
};

export default function ConfirmationScreen({
  selectedDate,
  selectedTime,
  selectedFood,
  onBack,
}: Props) {
  const [confirmed, setConfirmed] = useState(false);
  const confirmedRef = useRef(false);
  const burstPieces = useMemo(() => ConfettiBurst.generate(24), []);

  const handleConfirm = () => {
    if (confirmedRef.current) return;
    confirmedRef.current = true;
    setConfirmed(true);

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          date: dateStr,
          time: timeStr,
          food: foodStr,
          to_email: 'managementshreyashraj@gmail.com',
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      .catch(() => {
        confirmedRef.current = false;
      });
  };

  const dateStr = selectedDate ? formatDateLong(selectedDate) : '—';
  const timeStr = selectedTime ?? '—';
  const foodStr = selectedFood ?? '—';

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col items-center justify-center overflow-y-auto overflow-x-hidden px-6 py-8 safe-x safe-top safe-bottom">
      <FloatingHearts count={confirmed ? 16 : 12} />
      {confirmed && <ConfettiBurst pieces={burstPieces} />}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 35%, rgba(255, 235, 225, 0.85) 0%, rgba(255, 243, 236, 0) 62%)',
        }}
      />

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        {!confirmed ? (
          <>
            {/* Pre-confirmation */}
            <div
              className="animate-heart-pop mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blush-100 shadow-glow sm:h-24 sm:w-24"
              style={{ animationDelay: '0.1s' }}
            >
              <Sparkles
                className="h-10 w-10 animate-sparkle-twinkle text-blush-600 sm:h-12 sm:w-12"
                strokeWidth={1.5}
              />
            </div>

            <h2
              className="animate-fade-in-up font-display text-[2.2rem] leading-[1.1] text-blush-700 sm:text-5xl"
              style={{ animationDelay: '0.25s' }}
            >
              IT'S A DATE! <span className="text-blush-600">❤️</span>
            </h2>

            <p
              className="animate-fade-in-up mt-3 text-base text-blush-600/80 sm:text-lg"
              style={{ animationDelay: '0.35s' }}
            >
              Looks like we have a plan. I can't wait! 🥰
            </p>

            {/* Summary card */}
            <div
              className="animate-fade-in-up mt-7 flex w-full max-w-sm flex-col gap-3 rounded-3xl border border-blush-200/60 bg-white/80 p-5 shadow-soft backdrop-blur-sm sm:p-6"
              style={{ animationDelay: '0.45s' }}
            >
              <SummaryRow
                emoji="📅"
                icon={<CalendarDays className="h-5 w-5" strokeWidth={1.5} />}
                label="DATE"
                value={dateStr}
              />
              <div className="h-px bg-blush-100" />
              <SummaryRow
                emoji="⏰"
                icon={<Clock className="h-5 w-5" strokeWidth={1.5} />}
                label="TIME"
                value={timeStr}
              />
              <div className="h-px bg-blush-100" />
              <SummaryRow
                emoji="🍽️"
                icon={<UtensilsCrossed className="h-5 w-5" strokeWidth={1.5} />}
                label="FOOD"
                value={foodStr}
              />
            </div>

            {/* Confirm button — wrapped so fade-in-up and soft-pulse don't conflict. */}
            <div
              className="animate-fade-in-up mt-7 w-full max-w-sm"
              style={{ animationDelay: '0.6s' }}
            >
              <button
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleConfirm();
                }}
                aria-label="Confirm our date"
                className="animate-soft-pulse flex w-full items-center justify-center gap-2 rounded-full bg-blush-600 px-8 py-4 text-base font-semibold text-white shadow-soft transition-all duration-200 active:scale-95 sm:text-lg"
                style={{
                  visibility: 'visible',
                  opacity: 1,
                  pointerEvents: 'auto',
                  zIndex: 30,
                  minHeight: '48px',
                }}
              >
                CONFIRM OUR DATE <Heart className="h-5 w-5 fill-white" strokeWidth={0} />
              </button>
            </div>

            <button
              onPointerDown={onBack}
              className="animate-fade-in-up mt-4 inline-flex items-center gap-2 rounded-full border-2 border-blush-500 bg-white px-6 py-2.5 text-sm font-semibold text-blush-700 shadow-sm transition-transform duration-200 active:scale-95"
              style={{
                animationDelay: '0.7s',
                visibility: 'visible',
                opacity: 1,
                pointerEvents: 'auto',
                zIndex: 30,
                minHeight: '48px',
              }}
              aria-label="Change food"
            >
              <ArrowLeft className="h-4 w-4" /> CHANGE FOOD
            </button>
          </>
        ) : (
          <>
            {/* Post-confirmation success state */}
            <div
              className="animate-heart-pop relative mb-6 flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28"
              style={{ animationDelay: '0.05s' }}
            >
              <span className="absolute inset-0 rounded-full bg-blush-300/40 blur-2xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-blush-100 shadow-glow sm:h-28 sm:w-28">
                <Heart
                  className="h-12 w-12 animate-heart-beat fill-blush-600 text-blush-600 sm:h-14 sm:w-14"
                  strokeWidth={0}
                />
              </div>
            </div>

            <h2
              className="animate-fade-in-up font-display text-[2.4rem] leading-[1.1] text-blush-700 sm:text-5xl"
              style={{ animationDelay: '0.2s' }}
            >
              IT'S OFFICIAL! <span className="text-blush-600">❤️</span>
            </h2>

            <p
              className="animate-fade-in-up mt-4 text-lg font-medium text-blush-600 sm:text-xl"
              style={{ animationDelay: '0.35s' }}
            >
              See you on {dateStr} at {timeStr}!
            </p>

            <p
              className="animate-fade-in-up mt-2 text-base text-blush-700 sm:text-lg"
              style={{ animationDelay: '0.45s' }}
            >
              🍽️ {foodStr}
            </p>

            <p
              className="animate-fade-in-up mt-5 max-w-xs text-sm text-blush-500 sm:text-base"
              style={{ animationDelay: '0.55s' }}
            >
              Your date is officially planned. 🥰
            </p>
          </>
        )}
      </div>
    </section>
  );
}

function SummaryRow({
  icon,
  emoji,
  label,
  value,
}: {
  icon: React.ReactNode;
  emoji: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 text-left">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blush-100 text-lg">
        {emoji}
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blush-500">
          {label}
        </span>
        <span className="truncate font-display text-base font-medium text-blush-700 sm:text-lg">
          {value}
        </span>
      </div>
    </div>
  );
}

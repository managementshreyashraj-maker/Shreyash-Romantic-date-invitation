import { useMemo } from 'react';

type Heart = {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  emoji: string;
};

const HEART_EMOJIS = ['❤️', '💕', '💗', '🤍', '💘'];

/**
 * Soft animated layer of tiny floating hearts drifting upward.
 * Decorative only — aria-hidden so screen readers ignore it.
 */
export default function FloatingHearts({ count = 12 }: { count?: number }) {
  const hearts = useMemo<Heart[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 12 + Math.random() * 16,
      duration: 9 + Math.random() * 8,
      delay: Math.random() * 9,
      opacity: 0.28 + Math.random() * 0.32,
      emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="animate-float-heart absolute bottom-0 select-none"
          style={
            {
              left: h.left,
              fontSize: `${h.size}px`,
              '--heart-duration': `${h.duration}s`,
              '--heart-delay': `${h.delay}s`,
              '--heart-opacity': h.opacity,
            } as React.CSSProperties
          }
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

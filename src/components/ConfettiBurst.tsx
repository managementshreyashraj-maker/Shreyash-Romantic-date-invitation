import { useMemo } from 'react';

type Piece = {
  id: number;
  left: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  color: string;
  drift: number;
};

const COLORS = ['#ec7d8f', '#f4a9b6', '#e05a72', '#ffd6dd', '#fff3ec'];

/**
 * Lightweight confetti burst — a handful of small heart/dot particles that
 * drift down once and fade out. Decorative only (aria-hidden).
 */
export default function ConfettiBurst({ pieces }: { pieces: Piece[] }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="animate-confetti-fall absolute top-0 block rounded-full"
          style={
            {
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              transform: `rotate(${p.rotation}deg)`,
              '--confetti-delay': `${p.delay}s`,
              '--confetti-duration': `${p.duration}s`,
              '--confetti-drift': `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

ConfettiBurst.generate = (count: number): Piece[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 0.6,
    duration: 2.2 + Math.random() * 1.8,
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
    color: COLORS[i % COLORS.length],
    drift: -40 + Math.random() * 80,
  }));

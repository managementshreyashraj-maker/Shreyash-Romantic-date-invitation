import { useCallback, useEffect, useRef, useState } from 'react';

type Position = { x: number; y: number };

type Bounds = {
  width: number;
  height: number;
  elWidth: number;
  elHeight: number;
  offsetX: number;
  offsetY: number;
};

const EDGE_PADDING = 16;
const YES_BUFFER = 28;
const MIN_TRAVEL = 0.6;

/**
 * Computes a random position for the NO button that:
 *  - stays fully inside the container,
 *  - respects edge padding,
 *  - never overlaps the YES button's bounding box (plus a buffer),
 *  - and moves a meaningful distance away from its current spot.
 */
function randomSafePosition(
  current: Position,
  bounds: Bounds,
  yesRect: DOMRect | null
): Position {
  const { width, height, elWidth, elHeight, offsetX, offsetY } = bounds;

  const maxX = Math.max(EDGE_PADDING, width - elWidth - EDGE_PADDING);
  const maxY = Math.max(EDGE_PADDING, height - elHeight - EDGE_PADDING);

  const yes = yesRect
    ? {
        left: yesRect.left - offsetX,
        right: yesRect.right - offsetX,
        top: yesRect.top - offsetY,
        bottom: yesRect.bottom - offsetY,
      }
    : null;

  let candidate: Position = { x: EDGE_PADDING, y: EDGE_PADDING };
  let attempts = 0;

  do {
    candidate = {
      x: EDGE_PADDING + Math.random() * (maxX - EDGE_PADDING),
      y: EDGE_PADDING + Math.random() * (maxY - EDGE_PADDING),
    };
    attempts++;

    const candRight = candidate.x + elWidth;
    const candBottom = candidate.y + elHeight;

    const overlapsYes =
      yes !== null &&
      candRight > yes.left - YES_BUFFER &&
      candidate.x < yes.right + YES_BUFFER &&
      candBottom > yes.top - YES_BUFFER &&
      candidate.y < yes.bottom + YES_BUFFER;

    const tooClose =
      Math.abs(candidate.x - current.x) < elWidth * MIN_TRAVEL &&
      Math.abs(candidate.y - current.y) < elHeight * MIN_TRAVEL;

    if (!overlapsYes && !tooClose) break;
  } while (attempts < 40);

  return candidate;
}

/**
 * Hook that powers the playful, evasive NO button.
 *
 * The button starts in normal flow (no absolute positioning) at a known,
 * visible spot. Only when the user actually interacts does it switch to
 * absolute positioning and dodge to a random safe location. On the very
 * first dodge we capture its current on-screen position first, then animate
 * away on the next frame so the transition is smooth rather than a jump.
 *
 * The button stays focusable and operable via keyboard, giving an accessible
 * "decline" path that never traps the user.
 */
export function useEvasiveNo({
  containerRef,
  yesRef,
}: {
  containerRef: React.RefObject<HTMLElement>;
  yesRef: React.RefObject<HTMLElement>;
}) {
  const noRef = useRef<HTMLButtonElement>(null);
  const posRef = useRef<Position | null>(null);
  const [pos, setPos] = useState<Position | null>(null);

  const computeBounds = useCallback((): Bounds | null => {
    const container = containerRef.current;
    const el = noRef.current;
    if (!container || !el) return null;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    return {
      width: containerRect.width,
      height: containerRect.height,
      elWidth: elRect.width,
      elHeight: elRect.height,
      offsetX: containerRect.left,
      offsetY: containerRect.top,
    };
  }, [containerRef]);

  const dodge = useCallback(() => {
    const bounds = computeBounds();
    if (!bounds || !noRef.current) return;

    const yesRect = yesRef.current?.getBoundingClientRect() ?? null;

    if (posRef.current === null) {
      // First dodge: pin to current rendered position, then animate away
      const elRect = noRef.current.getBoundingClientRect();
      const current: Position = {
        x: elRect.left - bounds.offsetX,
        y: elRect.top - bounds.offsetY,
      };
      posRef.current = current;
      setPos(current);

      requestAnimationFrame(() => {
        const next = randomSafePosition(current, bounds, yesRect);
        posRef.current = next;
        setPos(next);
      });
    } else {
      const next = randomSafePosition(posRef.current, bounds, yesRect);
      posRef.current = next;
      setPos(next);
    }
  }, [computeBounds, yesRef]);

  // Keep the button inside the container when the viewport changes.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      const bounds = computeBounds();
      if (!bounds || posRef.current === null) return;
      const maxX = Math.max(EDGE_PADDING, bounds.width - bounds.elWidth - EDGE_PADDING);
      const maxY = Math.max(EDGE_PADDING, bounds.height - bounds.elHeight - EDGE_PADDING);
      const clamped: Position = {
        x: Math.min(posRef.current.x, maxX),
        y: Math.min(posRef.current.y, maxY),
      };
      posRef.current = clamped;
      setPos(clamped);
    });
    ro.observe(container);
    window.addEventListener('orientationchange', dodge);

    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', dodge);
    };
  }, [containerRef, computeBounds, dodge]);

  const style: React.CSSProperties = pos
    ? {
        position: 'absolute',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        margin: 0,
        transition:
          'left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    : {};

  return { noRef, style, dodge };
}

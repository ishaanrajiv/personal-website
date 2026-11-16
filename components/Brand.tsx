import { useId } from 'react';

import { MARK } from '@/lib/mark';

interface BrandProps {
  className?: string;
}

interface PiecesProps {
  ink: string;
  dot: string;
}

/** The mark's three pieces. The colours are CSS variables, which only resolve in `style`. */
function MarkPieces({ ink, dot }: PiecesProps) {
  return (
    <>
      <circle {...MARK.dot} style={{ fill: dot }} />
      <rect {...MARK.stem} style={{ fill: ink }} />
      <path
        d={MARK.hook.d}
        fill="none"
        strokeWidth={MARK.hook.strokeWidth}
        strokeLinecap="round"
        opacity={MARK.hook.opacity}
        style={{ stroke: ink }}
      />
    </>
  );
}

/** The bare "ir" mark for pages: navy pieces (cream in dark mode) with the i's dot in Sky. */
export function Mark({ className }: BrandProps) {
  return (
    <svg viewBox={MARK.viewBox} className={className} aria-hidden="true">
      <MarkPieces ink="rgb(var(--lit))" dot="var(--mark-dot)" />
    </svg>
  );
}

/** The mark on its tile, following the site theme: a Night tile in dark mode, a Sky-washed cream tile in light. */
export function AppIcon({ className }: BrandProps) {
  const tile = useId();

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={tile} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--icon-tile-top)' }} />
          <stop offset="1" style={{ stopColor: 'var(--icon-tile-bottom)' }} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22.5" fill={`url(#${tile})`} />
      <rect x=".5" y=".5" width="99" height="99" rx="22" fill="none" style={{ stroke: 'rgb(var(--icon-hairline) / 0.08)' }} />
      <MarkPieces ink="rgb(var(--lit))" dot="var(--icon-dot)" />
    </svg>
  );
}

/** "Ishaan Rajiv" in Geist Medium, tracked −0.025em as in the shared design language. */
export function Wordmark({ className }: BrandProps) {
  return (
    <span className={`font-wordmark font-medium tracking-[-0.025em] ${className ?? ''}`}>
      Ishaan Rajiv
    </span>
  );
}

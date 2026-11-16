import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { MARK } from '@/lib/mark';

// Colours from the shared design language, for the generated icons (see app/globals.css).
export const NAVY = '#232838';
export const CREAM = '#F3EBDD';
export const SKY = '#7DBEE8';
export const SKY_ON_PAPER = '#2690D4';
export const PAPER = '#F2EDED';
export const NIGHT_TILE = ['#1C1A17', '#0B0A09'] as const;

export function loadGeist() {
  return readFile(join(process.cwd(), 'app/fonts/Geist-Medium.ttf'));
}

/**
 * The mark's three pieces for an ImageResponse <svg>. They are plain elements with colour
 * attributes because the image renderer skips components and CSS variables inside an SVG.
 */
export function markPieces(ink: string, dot: string) {
  return [
    <circle key="dot" {...MARK.dot} fill={dot} />,
    <rect key="stem" {...MARK.stem} fill={ink} />,
    <path
      key="hook"
      d={MARK.hook.d}
      fill="none"
      stroke={ink}
      strokeWidth={MARK.hook.strokeWidth}
      strokeLinecap="round"
      opacity={MARK.hook.opacity}
    />,
  ];
}

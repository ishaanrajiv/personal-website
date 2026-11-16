import { ImageResponse } from 'next/og';

import { CREAM, NIGHT_TILE, SKY, markPieces } from '@/lib/brand-image';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// The dark-mode icon (Night tile, cream pieces, Sky dot), full bleed: iOS rounds the corners itself.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={NIGHT_TILE[0]} />
            <stop offset="1" stopColor={NIGHT_TILE[1]} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#tile)" />
        {markPieces(CREAM, SKY)}
      </svg>
    ),
    size,
  );
}

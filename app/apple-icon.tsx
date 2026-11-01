import { ImageResponse } from 'next/og';

import { MonogramTile, loadOutfit } from '@/lib/brand-image';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Full-bleed tile: iOS rounds the corners itself.
export default async function AppleIcon() {
  return new ImageResponse(<MonogramTile size={180} radius={0} />, {
    ...size,
    fonts: [{ name: 'Outfit', data: await loadOutfit(), weight: 500, style: 'normal' }],
  });
}

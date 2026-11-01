import { ImageResponse } from 'next/og';

import { INK, MonogramTile, PAPER, loadOutfit } from '@/lib/brand-image';

export const alt = 'Ishaan Rajiv';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 72,
          padding: '0 110px',
          background: PAPER,
          color: INK,
          fontFamily: 'Outfit',
        }}
      >
        <MonogramTile size={240} radius={54} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 104, letterSpacing: -3, lineHeight: 1 }}>Ishaan Rajiv</div>
          <div style={{ fontSize: 42, marginTop: 24, opacity: 0.62, letterSpacing: -0.5 }}>
            Analytics lead · builder · writer
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Outfit', data: await loadOutfit(), weight: 500, style: 'normal' }] },
  );
}

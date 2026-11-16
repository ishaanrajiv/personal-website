import { ImageResponse } from 'next/og';

import { NAVY, PAPER, SKY_ON_PAPER, loadGeist, markPieces } from '@/lib/brand-image';
import { MARK } from '@/lib/mark';

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
          color: '#000000',
          fontFamily: 'Geist',
        }}
      >
        <svg width="240" height="240" viewBox={MARK.viewBox}>
          {markPieces(NAVY, SKY_ON_PAPER)}
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 104, letterSpacing: -2.6, lineHeight: 1 }}>Ishaan Rajiv</div>
          <div style={{ fontSize: 42, marginTop: 24, color: 'rgba(60, 60, 67, 0.6)', letterSpacing: -0.5 }}>
            Analytics lead · builder
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Geist', data: await loadGeist(), weight: 500, style: 'normal' }] },
  );
}

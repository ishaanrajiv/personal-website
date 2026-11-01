import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Brand colours shared with the Lyrate site (see app/globals.css).
export const INK = '#232838';
export const ON_INK = '#F3EBDD';
export const PAPER = '#F2EDED';

export function loadOutfit() {
  return readFile(join(process.cwd(), 'app/fonts/Outfit-Medium.ttf'));
}

/** The "IR" monogram as an ImageResponse element. Pass a radius of 0 for a full-bleed tile. */
export function MonogramTile({ size, radius }: { size: number; radius: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius,
        background: INK,
        color: ON_INK,
        fontFamily: 'Outfit',
        fontSize: size * 0.46,
        letterSpacing: -size * 0.01,
        paddingTop: size * 0.03,
      }}
    >
      IR
    </div>
  );
}

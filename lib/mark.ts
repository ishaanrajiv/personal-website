// The "ir" mark from the shared design language, on a 100×100 grid: the i's dot (lit),
// the i's stem, and an r drawn as one hooked stroke at 60%.
export const MARK = {
  /** The grid cropped to the mark, for use without a tile. */
  viewBox: '17 17 66 66',
  dot: { cx: 29.75, cy: 28, r: 8 },
  stem: { x: 23, y: 41, width: 13.5, height: 39, rx: 6.75 },
  hook: { d: 'M49.75 73.25V61.75a14 14 0 0 1 14-14h6', strokeWidth: 13.5, opacity: 0.6 },
} as const;

interface BrandProps {
  className?: string;
}

/** "IR" in Outfit Medium on an ink tile. Ink and paper swap with the theme. */
export function Monogram({ className }: BrandProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect width="100" height="100" rx="22.5" className="fill-ink" />
      <text
        x="50"
        y="53"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="46"
        letterSpacing="-1"
        className="fill-on-ink font-wordmark"
      >
        IR
      </text>
    </svg>
  );
}

/** "Ishaan Rajiv" in Outfit Medium, tracked like the Lyrate wordmark. */
export function Wordmark({ className }: BrandProps) {
  return (
    <span className={`font-wordmark font-medium tracking-[-0.025em] ${className ?? ''}`}>
      Ishaan Rajiv
    </span>
  );
}

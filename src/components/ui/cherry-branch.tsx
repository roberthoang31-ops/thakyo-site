type CherryBranchProps = {
  className?: string;
};

/** Decorative, lightweight illustration; all meaningful text stays in HTML. */
export function CherryBranch({ className = "" }: CherryBranchProps) {
  const blossoms = [
    { x: 84, y: 127, rotate: 12, scale: 0.75 },
    { x: 125, y: 89, rotate: -10, scale: 0.9 },
    { x: 176, y: 111, rotate: 26, scale: 0.7 },
    { x: 197, y: 58, rotate: 4, scale: 0.95 },
    { x: 239, y: 90, rotate: -15, scale: 0.8 },
    { x: 272, y: 45, rotate: 20, scale: 0.7 },
    { x: 309, y: 79, rotate: -6, scale: 0.9 },
    { x: 327, y: 27, rotate: 8, scale: 0.65 },
  ];

  return (
    <svg
      viewBox="0 0 400 190"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#705140" strokeLinecap="round">
        <path d="M403 14C321 82 222 107 76 149L17 178" strokeWidth="3" />
        <path
          d="M354 52 325 29M291 81 274 45M246 96 238 90M195 112 195 58M154 125 126 91M92 146 84 128"
          strokeWidth="1.6"
        />
        <path
          d="m291 81 18-2m-114 33-19-1m-31 16-21 22m103-49-15 40m151-92 5 31"
          strokeWidth="1.3"
        />
      </g>
      {blossoms.map(({ x, y, rotate, scale }) => (
        <g
          key={`${x}-${y}`}
          transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
        >
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx="0"
              cy="-8"
              rx="5.7"
              ry="8.4"
              transform={`rotate(${angle})`}
              fill="#ba7d72"
              fillOpacity="0.65"
            />
          ))}
          <circle r="3" fill="#b18a51" />
        </g>
      ))}
      <g fill="#ba7d72" fillOpacity="0.55">
        <ellipse
          cx="126"
          cy="151"
          rx="3"
          ry="5"
          transform="rotate(24 126 151)"
        />
        <ellipse
          cx="211"
          cy="142"
          rx="3"
          ry="5"
          transform="rotate(-22 211 142)"
        />
        <ellipse cx="364" cy="82" rx="3" ry="5" transform="rotate(35 364 82)" />
      </g>
    </svg>
  );
}

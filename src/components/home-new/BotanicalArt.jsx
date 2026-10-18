export default function BotanicalArt({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 200 420"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      {/* bloom */}
      <path d="M100 78 C82 70 70 48 74 18 C86 36 94 54 100 78Z" />
      <path d="M100 78 C118 70 130 48 126 18 C114 36 106 54 100 78Z" />
      <path d="M100 78 C94 52 94 30 100 8 C106 30 106 52 100 78Z" />
      <path d="M78 22 L74 12 M86 18 L84 8 M114 18 L116 8 M122 22 L126 12 M100 8 L100 0" />
      <path d="M82 84 C90 80 110 80 118 84" />

      {/* stem */}
      <path d="M100 84 C97 140 104 190 99 250 C95 310 103 360 100 420" />

      {/* tendrils */}
      <path d="M99 150 C76 146 64 126 74 112 C82 102 96 110 90 120 C86 126 78 122 80 116" />
      <path d="M101 182 C124 178 136 158 126 144 C118 134 104 142 110 152 C114 158 122 154 120 148" />

      {/* leaves */}
      <path d="M99 250 C70 244 38 220 22 178 C56 186 86 212 99 250Z" />
      <path d="M60 214 L44 202 M76 228 L60 214" />
      <path d="M100 290 C130 282 162 256 180 214 C146 222 114 250 100 290Z" />
      <path d="M140 254 L156 242 M124 268 L140 254" />
      <path d="M100 352 C74 346 46 326 30 292 C60 298 88 320 100 352Z" />
      <path d="M100 380 C126 372 152 352 166 322 C138 330 112 350 100 380Z" />

      {/* stitch dots */}
      <g fill="currentColor" stroke="none">
        <circle cx="62" cy="196" r="2" />
        <circle cx="54" cy="188" r="2" />
        <circle cx="146" cy="232" r="2" />
        <circle cx="154" cy="226" r="2" />
        <circle cx="58" cy="312" r="2" />
        <circle cx="140" cy="342" r="2" />
      </g>
    </svg>
  );
}

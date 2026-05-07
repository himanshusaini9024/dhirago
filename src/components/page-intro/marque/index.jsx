"use client";

export default function Marquee() {
  const items = [
    "Slow Fashion",
    "Natural Fibres",
    "Handcrafted in India",
    "Earth Tones",
    "Artisan Made",
    "Conscious Living",
    "Seed to Stitch",
    "Natural Dyes",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="marquee">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <svg width="4" height="4" viewBox="0 0 4 4">
              <circle cx="2" cy="2" r="2" fill="var(--clay)" />
            </svg>
          </span>
        ))}
      </div>

      {/* STYLES */}
      <style jsx>{`
        .marquee {
          overflow: hidden;
          border-top: 1px solid rgba(184, 153, 110, 0.2);
          border-bottom: 1px solid rgba(184, 153, 110, 0.2);
          padding: 13px 0;
          background: var(--warm-white);
        }

        .marquee-inner {
          display: flex;
          width: max-content;
          animation: scroll 28s linear infinite;
        }

        .marquee-item {
          font-family: "Cormorant Garamond", serif;
          font-size: 14px;
          font-style: italic;
          font-weight: 400;
          color: var(--muted);
          letter-spacing: 0.06em;
          margin-right: 56px;
          display: inline-flex;
          align-items: center;
          gap: 56px;
          white-space: nowrap;
        }

        /* 🔥 SMOOTH LUXURY SCROLL */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* OPTIONAL: slow on hover (premium feel) */
        .marquee:hover .marquee-inner {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    image:
      "https://11-11.in/cdn/shop/files/LANDOUR_SHOOT_BANNER.webp?v=1781252214&width=1800",
    alt: "Women Everyday Landour",
  },
  {
    image:
      "https://11-11.in/cdn/shop/files/MUL_STORY_BANNER_2.webp?v=1778918921&width=1800",
    alt: "The Mul Story",
  },
  {
    image:
      "https://11-11.in/cdn/shop/files/RESORT_26.webp?v=1778050083&width=1800",
    alt: "Slower Summer",
  },
  {
    image:
      "https://11-11.in/cdn/shop/files/BANNER_af8adc9c-c64f-4bec-9732-a1c621a95f11.webp?v=1773747446&width=1800",
    alt: "Leisure Edit",
  },
  {
    image:
      "https://11-11.in/cdn/shop/files/MEETTHEMAKERS1.webp?v=1778240611&width=1800",
    alt: "Meet The Makers",
  },
  {
    image:
      "https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/ponduru4.jpeg",
    alt: "Ponduru Cotton",
  },
];

const DURATION = 6000;
const FADE_MS = 900;

function CrossfadeImage({ src, alt }) {
  const [displayed, setDisplayed] = useState(src);
  const [incoming, setIncoming] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (src === displayed) return;
    setIncoming(src);
    setFading(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setFading(true));
    });
    const t = setTimeout(() => {
      setDisplayed(src);
      setIncoming(null);
      setFading(false);
    }, FADE_MS + 50);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [src, displayed]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={displayed}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {incoming && (
        <img
          src={incoming}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: fading ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-out`,
          }}
        />
      )}
    </div>
  );
}

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  const restartTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIdx((c) => (c + 1) % slides.length);
    }, DURATION);
  };

  useEffect(() => {
    restartTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const select = (i) => {
    if (i === idx) return;
    setIdx(i);
    restartTimer();
  };

  const slide = slides[idx];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#f5f5f5]
                 h-[70vw] max-h-[520px] min-h-[280px]
                 md:max-h-none md:min-h-[640px]"
      aria-label="Home banner"
    >
      <CrossfadeImage src={slide.image} alt={slide.alt} />

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-8">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to item ${i + 1}`}
            aria-current={i === idx ? "true" : undefined}
            onClick={() => select(i)}
            className={`h-[6px] w-[6px] rounded-full transition-all duration-300 ${
              i === idx ? "bg-white scale-110" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

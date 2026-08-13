"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    image:
      `https://images.dhirago.com/ecommerce/Home/bstnew.png?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`,
    alt: "banner1",
  },
  {
    image:
      `https://images.dhirago.com/ecommerce/Home/bts1.png?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`,
    alt: "banner2",
  },
  {
    image:
      `https://images.dhirago.com/ecommerce/Home/bts.png?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`,
    alt: "banner3",
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
                 aspect-[3/4] md:aspect-[14/9]  h-[70vw] max-h-[520px] min-h-[280px]
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

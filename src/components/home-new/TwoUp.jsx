"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { serif } from "./theme";

/**
 * Full-bleed home banner / carousel.
 * Uses intrinsic image ratio (width 100%, height auto) — no stretch/crop box.
 * panels[].src, .alt, .href, .caption?, .width?, .height?
 */
export default function TwoUp({ panels = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (panels.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % panels.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [panels.length]);

  if (!panels.length) return null;

  const goTo = (index) => {
    setActiveIndex((index + panels.length) % panels.length);
  };

  const active = panels[activeIndex];
  const activeW = active.width || 2400;
  const activeH = active.height || 1600;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#1d1a15]"
      aria-label="Home banner"
    >
      {/* Height follows the active slide’s natural aspect ratio */}
      <div
        className="relative w-full"
        style={{ aspectRatio: `${activeW} / ${activeH}` }}
      >
        {panels.map((panel, i) => {
          const w = panel.width || 2400;
          const h = panel.height || 1600;
          return (
            <div
              key={panel.src || panel.alt || i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === activeIndex
                  ? "z-10 opacity-100"
                  : "pointer-events-none z-0 opacity-0"
              }`}
              aria-hidden={i !== activeIndex}
            >
              <Link
                href={panel.href || "/collections/shirts"}
                tabIndex={i === activeIndex ? 0 : -1}
                className="absolute inset-0 block"
              >
                <Image
                  src={panel.src}
                  alt={panel.alt || "Dhirago"}
                  width={w}
                  height={h}
                  priority={i === 0}
                  sizes="100vw"
                  quality={90}
                  className="h-full w-full object-contain object-center"
                  style={{ width: "100%", height: "100%" }}
                />

                {panel.caption ? (
                  <span
                    className={`${serif.className} pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xl italic text-white drop-shadow-lg md:bottom-16 md:text-3xl`}
                  >
                    {panel.caption}
                  </span>
                ) : null}
              </Link>
            </div>
          );
        })}

        {panels.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous banner"
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-black backdrop-blur transition hover:bg-white md:left-6 md:h-12 md:w-12"
            >
              &#8592;
            </button>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next banner"
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-black backdrop-blur transition hover:bg-white md:right-6 md:h-12 md:w-12"
            >
              &#8594;
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
              {panels.map((panel, i) => (
                <button
                  key={panel.src || panel.alt || i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to banner ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-white"
                      : "w-3 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

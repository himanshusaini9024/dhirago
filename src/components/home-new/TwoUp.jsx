"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { serif } from "./theme";

/**
 * Full-bleed home banner / carousel.
 * Desktop: landscape art (panels[].src).
 * Mobile: portrait art (panels[].srcMobile) so text/model stay readable.
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
  const desktopW = active.width || 1920;
  const desktopH = active.height || 1080;
  const hasMobileArt = panels.some((p) => p.srcMobile);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#1d1a15]"
      aria-label="Home banner"
    >
      <div
        className={
          hasMobileArt
            ? "relative w-full aspect-[3/4] md:aspect-[16/9]"
            : "relative w-full"
        }
        style={
          hasMobileArt
            ? undefined
            : { aspectRatio: `${desktopW} / ${desktopH}` }
        }
      >
        {panels.map((panel, i) => {
          const w = panel.width || 1920;
          const h = panel.height || 1080;
          const mw = panel.mobileWidth || 1080;
          const mh = panel.mobileHeight || 1440;
          const mobileSrc = panel.srcMobile || panel.src;
          const isActive = i === activeIndex;

          return (
            <div
              key={panel.src || panel.alt || i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive
                  ? "z-10 opacity-100"
                  : "pointer-events-none z-0 opacity-0"
              }`}
              aria-hidden={!isActive}
            >
              <Link
                href={panel.href || "/collections/shirts"}
                tabIndex={isActive ? 0 : -1}
                className="absolute inset-0 block"
              >
                {/* Mobile portrait */}
                <Image
                  src={mobileSrc}
                  alt={panel.alt || "Dhirago"}
                  width={mw}
                  height={mh}
                  priority={i === 0}
                  sizes="100vw"
                  quality={90}
                  className={`h-full w-full object-cover object-center ${
                    panel.srcMobile ? "md:hidden" : "md:object-contain"
                  }`}
                />

                {/* Desktop landscape */}
                {panel.srcMobile ? (
                  <Image
                    src={panel.src}
                    alt={panel.alt || "Dhirago"}
                    width={w}
                    height={h}
                    priority={i === 0}
                    sizes="100vw"
                    quality={90}
                    className="hidden h-full w-full object-contain object-center md:block"
                  />
                ) : null}

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
              className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-black backdrop-blur transition hover:bg-white md:left-6 md:h-12 md:w-12"
            >
              &#8592;
            </button>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next banner"
              className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-black backdrop-blur transition hover:bg-white md:right-6 md:h-12 md:w-12"
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

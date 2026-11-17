"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { serif } from "./theme";
import Reveal from "./Reveal";

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

  const activePanel = panels[activeIndex];

  const goTo = (index) => {
    setActiveIndex((index + panels.length) % panels.length);
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[4/5] w-full md:aspect-[16/9]">
        {panels.map((panel, i) => (
          <div
            key={panel.alt || i}
            className={`absolute inset-0  ${
              i === activeIndex
                ? "z-10 opacity-100"
                : "z-0 opacity-0 pointer-events-none"
            }`}
            aria-hidden={i !== activeIndex}
          >
            <Link
              href={panel.href || "/collections/shirts"}
              tabIndex={i === activeIndex ? 0 : -1}
              className="group absolute inset-0 block"
            >
              <Image
                src={panel.src}
                alt={panel.alt || "Dhirago collection"}
                fill
                priority={i === 0}
                sizes="100vw"
                quality={85}
               className={`object-cover `}
              />

              {panel.caption && (
                <span
                  className={`${serif.className} pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xl italic text-white drop-shadow-lg md:bottom-16 md:text-3xl`}
                >
                  {panel.caption}
                </span>
              )}
            </Link>
          </div>
        ))}

        {/* Previous / Next buttons */}
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

            {/* Slide indicators */}
            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
              {panels.map((panel, i) => (
                <button
                  key={panel.alt || i}
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
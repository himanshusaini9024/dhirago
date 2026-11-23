"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { serif } from "./theme";

/** Time each slide stays fully visible before auto-advancing */
const SLIDE_HOLD_MS = 4500;
/** Crossfade duration */
const FADE_MS = 900;
/** Min horizontal drag (px) to count as a slide change */
const SWIPE_THRESHOLD = 48;

export default function TwoUp({ panels = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef({
    active: false,
    startX: 0,
    startY: 0,
    deltaX: 0,
    locked: null, // null | "x" | "y"
    moved: false,
  });

  const goTo = useCallback(
    (index) => {
      setActiveIndex((index + panels.length) % panels.length);
    },
    [panels.length],
  );

  useEffect(() => {
    if (panels.length <= 1 || paused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % panels.length);
    }, SLIDE_HOLD_MS);

    return () => clearInterval(timer);
  }, [panels.length, paused, activeIndex]);

  const onPointerDown = (e) => {
    if (panels.length <= 1) return;
    // Only primary button / touch
    if (e.pointerType === "mouse" && e.button !== 0) return;

    drag.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      deltaX: 0,
      locked: null,
      moved: false,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setPaused(true);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;

    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;

    if (d.locked == null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      d.locked = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
    }

    if (d.locked === "x") {
      d.deltaX = dx;
      d.moved = Math.abs(dx) > 6;
      // Prevent the page from scrolling while swiping slides horizontally
      e.preventDefault?.();
    }
  };

  const finishDrag = (e) => {
    const d = drag.current;
    if (!d.active) return;

    const dx = d.deltaX;
    d.active = false;
    d.locked = null;

    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      /* already released */
    }

    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      // Swipe left → next, swipe right → previous
      goTo(activeIndex + (dx < 0 ? 1 : -1));
    }

    // Brief pause after manual swipe, then resume autoplay
    setTimeout(() => setPaused(false), 400);
  };

  const onClickCapture = (e) => {
    // If the user dragged, don't follow the banner link
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  if (!panels.length) return null;

  return (
    <section
      className="relative w-full overflow-hidden touch-pan-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative aspect-[4/5] w-full cursor-grab select-none active:cursor-grabbing md:aspect-[16/9]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onClickCapture={onClickCapture}
      >
        {panels.map((panel, i) => {
          const desktopSrc = panel.src;
          const mobileSrc = panel.srcMobile || panel.src;
          const position = panel.position || "object-center";
          const isActive = i === activeIndex;

          return (
            <div
              key={panel.alt || i}
              className={`absolute inset-0 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? "z-10 opacity-100 pointer-events-auto"
                  : "z-0 opacity-0 pointer-events-none"
              }`}
              style={{ transitionDuration: `${FADE_MS}ms` }}
              aria-hidden={!isActive}
            >
              <Link
                href={panel.href || "/collections/shirts"}
                tabIndex={isActive ? 0 : -1}
                draggable={false}
                className="group absolute inset-0 block"
              >
                <Image
                  src={mobileSrc}
                  alt={panel.alt || "Dhirago collection"}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={85}
                  draggable={false}
                  className={`pointer-events-none object-cover md:hidden ${position}`}
                />
                <Image
                  src={desktopSrc}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={85}
                  draggable={false}
                  className={`pointer-events-none hidden object-cover md:block ${position}`}
                  aria-hidden="true"
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
          );
        })}

        {panels.length > 1 && (
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
            {panels.map((panel, i) => (
              <button
                key={panel.alt || i}
                type="button"
                onClick={() => {
                  goTo(i);
                  setPaused(true);
                  setTimeout(() => setPaused(false), 400);
                }}
                aria-label={`Go to banner ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
                className={`h-1 rounded-full transition-all duration-500 ease-out ${
                  i === activeIndex
                    ? "w-7 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

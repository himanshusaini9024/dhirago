"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { OrnamentDivider } from "./Ornament";
import { josefin, serif } from "./theme";

const AUTOPLAY_MS = 2700;
const SWIPE_THRESHOLD = 50;
const RATIO_STYLE = { aspectRatio: "600 / 637" };
const DOT_IDLE = "#914c37";
const DOT_ACTIVE = "#fff";

function LoopSlider({ slides, href, sizes, className = "", dotSize = 8 }) {
  const total = slides.length;
  // Track holds [last clone, ...slides, first clone] so the loop wraps seamlessly.
  const track = total > 1 ? [slides[total - 1], ...slides, slides[0]] : slides;
  const [current, setCurrent] = useState(total > 1 ? 1 : 0);
  const [animate, setAnimate] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(0);
  const drag = useRef({ active: false, startX: 0, offset: 0 });
  const viewportRef = useRef(null);
  const wrapping = useRef(false);

  // Measure viewport so translate uses px (avoids % / track-width bugs).
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const jumpTo = useCallback((index) => {
    wrapping.current = true;
    setAnimate(false);
    setCurrent(index);
    // Re-enable animation on the next frame after the silent jump paints.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrapping.current = false;
        setAnimate(true);
      });
    });
  }, []);

  const go = useCallback((next) => {
    if (wrapping.current || total < 2) return;
    setAnimate(true);
    setCurrent(next);
  }, [total]);

  // Autoplay
  useEffect(() => {
    if (total < 2 || dragging || wrapping.current) return;
    const t = setTimeout(() => go(current + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [current, dragging, total, go]);

  // When we land on a clone, snap back to the real slide.
  // Timer fallback covers browsers that skip transitionend (tab blur, etc.).
  useEffect(() => {
    if (total < 2) return;
    if (current !== total + 1 && current !== 0) return;

    const snap = () => jumpTo(current === 0 ? total : 1);
    const t = setTimeout(snap, animate ? 720 : 0);
    return () => clearTimeout(t);
  }, [current, total, animate, jumpTo]);

  // Safety: if index ever drifts past the track, pull it back.
  useEffect(() => {
    if (total < 2) return;
    if (current > total + 1) jumpTo(1);
    else if (current < 0) jumpTo(total);
  }, [current, total, jumpTo]);

  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "transform") return;
    if (current === total + 1) jumpTo(1);
    else if (current === 0) jumpTo(total);
  };

  const startDrag = (x) => {
    if (total < 2 || wrapping.current) return;
    drag.current = { active: true, startX: x, offset: 0 };
    setDragging(true);
    setAnimate(false);
  };

  const moveDrag = (x) => {
    if (!drag.current.active) return;
    drag.current.offset = x - drag.current.startX;
    setDragOffset(drag.current.offset);
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    const { offset } = drag.current;
    drag.current.active = false;
    setDragging(false);
    setDragOffset(0);
    if (Math.abs(offset) > SWIPE_THRESHOLD) go(offset < 0 ? current + 1 : current - 1);
    else setAnimate(true);
  };

  const activeDot = total > 1 ? ((current - 1) % total + total) % total : 0;
  const tx = width ? -(current * width) + dragOffset : 0;

  return (
    <div
      ref={viewportRef}
      className={`relative select-none overflow-hidden ${className}`}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
      onTouchEnd={endDrag}
      onMouseDown={(e) => e.button === 0 && startDrag(e.clientX)}
      onMouseMove={(e) => moveDrag(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      <div
        className="flex h-full"
        style={{
          transform: `translate3d(${tx}px, 0, 0)`,
          transition: animate && width ? "transform 700ms ease" : "none",
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {track.map((slide, i) => (
          <Link
            key={`${slide.src}-${i}`}
            href={href}
            draggable={false}
            onClick={(e) => Math.abs(drag.current.offset) > 5 && e.preventDefault()}
            style={{
              ...RATIO_STYLE,
              flex: "0 0 auto",
              width: width ? `${width}px` : "100%",
            }}
            className="relative block overflow-hidden bg-[#ece9e4]"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes={sizes}
              quality={75}
              // Below-fold carousel — never eager-load all slides/clones.
              loading="lazy"
              draggable={false}
              className={`object-cover ${slide.position || ""}`}
            />
          </Link>
        ))}
      </div>

      {total > 1 && (
        <div
          className="absolute left-1/2 z-[1] flex -translate-x-1/2 items-center justify-center"
          style={{ bottom: dotSize === 8 ? 22 : 15, gap: 5 }}
        >
          {slides.map((s, i) => (
            <button
              key={`${s.src}-dot-${i}`}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(i + 1);
              }}
              className="cursor-pointer rounded-full border-0 p-0"
              style={{
                width: dotSize,
                height: dotSize,
                background: i === activeDot ? DOT_ACTIVE : DOT_IDLE,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MeetTheMaker({ portrait, slides = [], href = "/handwork" }) {
  return (
    <section className="w-full overflow-hidden" aria-label="Meet the makers">
      <div className="flex w-full flex-col md:flex-row">
        <div className="relative flex items-center justify-center overflow-hidden px-6 py-16 md:w-1/2 md:px-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-w-[440px] flex-col items-center text-center"
          >
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-1 ring-[#6b5d4a]/30 ring-offset-4 ring-offset-[#f6f1e7] md:h-36 md:w-36">
              {portrait && (
                <Image
                  src={portrait}
                  alt="Dhirago artisan at work"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              )}
            </div>
            <h2
              className={`${serif.className} mt-7 text-[20px] font-medium uppercase tracking-[0.18em] text-[#3d342a] md:text-[24px]`}
            >
              Meet the Makers
            </h2>
            <OrnamentDivider className="mt-2" />
            <p
              className={`${josefin.className} mt-6 text-[17px] italic font-light leading-[1.75] text-[#4a3f33] md:text-[17px]`}
            >
              Each piece crafted at Dhirago is a result of value chain that nurtures artisans around India. Preserving the knowledge and practices passed down through generations. Every stitch reflects there craftsmanship and patience.
            </p>
            <p
              className={`${josefin.className} mt-4 text-[17px] italic font-light leading-[1.75] text-[#4a3f33] md:text-[17px]`}
            >
              No two hands leave quite the same impression.
            </p>
            <Link
              href={href}
              className={`${josefin.className} mt-7 text-[15px] italic text-[#3d342a] underline decoration-[#3d342a]/30 underline-offset-[6px] transition-colors hover:decoration-[#3d342a]`}
            >
              Read more…
            </Link>
          </motion.div>
        </div>

        {/* One slider only — mounting desktop+mobile duplicates every slide in the DOM. */}
        <LoopSlider
          slides={slides}
          href={href}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full md:w-1/2"
        />
      </div>
    </section>
  );
}

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
  const drag = useRef({ active: false, startX: 0, offset: 0 });

  const go = useCallback((next) => {
    setAnimate(true);
    setCurrent(next);
  }, []);

  useEffect(() => {
    if (total < 2 || dragging) return;
    const t = setTimeout(() => go(current + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [current, dragging, total, go]);

  const onTransitionEnd = (e) => {
    if (e.propertyName !== "transform") return;
    if (current === total + 1) {
      setAnimate(false);
      setCurrent(1);
    } else if (current === 0) {
      setAnimate(false);
      setCurrent(total);
    }
  };

  const startDrag = (x) => {
    if (total < 2) return;
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

  const activeDot = total > 1 ? (current - 1 + total) % total : 0;

  return (
    <div
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
        className="flex w-full will-change-transform"
        style={{
          transform: `translate3d(calc(-${current * 100}% + ${dragOffset}px), 0, 0)`,
          transition: animate ? "transform 700ms ease" : "none",
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {track.map((slide, i) => (
          <Link
            key={`${slide.src}-${i}`}
            href={href}
            draggable={false}
            onClick={(e) => Math.abs(drag.current.offset) > 5 && e.preventDefault()}
            style={{ ...RATIO_STYLE, flex: "0 0 100%" }}
            className="relative block w-full overflow-hidden"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes={sizes}
              quality={80}
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
              In the hands of our artisans, a simple thread becomes something
              lasting. Each stitch carries generations of skill, patience and
              instinct — no two pieces are ever quite the same.
            </p>
            <p
              className={`${josefin.className} mt-4 text-[17px] italic font-light leading-[1.75] text-[#4a3f33] md:text-[17px]`}
            >
              Worked slowly, these details reveal themselves over time.
            </p>
            <Link
              href={href}
              className={`${josefin.className} mt-7 text-[15px] italic text-[#3d342a] underline decoration-[#3d342a]/30 underline-offset-[6px] transition-colors hover:decoration-[#3d342a]`}
            >
              Read more…
            </Link>
          </motion.div>
        </div>

        <LoopSlider
          slides={slides}
          href={href}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="hidden w-1/2 md:block"
        />
        <LoopSlider slides={slides} href={href} sizes="100vw" dotSize={6} className="w-full md:hidden" />
      </div>
    </section>
  );
}

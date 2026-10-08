"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { OrnamentHeading } from "./Ornament";
import { serif } from "./theme";

export default function MoodCarousel({ title, items = [] }) {
  const trackRef = useRef(null);
  if (!items.length) return null;

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20">
      {title && <OrnamentHeading className="mb-10 md:mb-12">{title}</OrnamentHeading>}

      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-3 scroll-px-4 overflow-x-auto px-4 [scrollbar-width:none] md:scroll-px-12 md:gap-6 md:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.href + item.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.9, delay: Math.min(i, 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-[22vw]"
            >
              <Link href={item.href} className="group relative block aspect-[2/3] overflow-hidden bg-[#e7dfd1]">
                {item.src && (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 38vw, 62vw"
                    quality={75}
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                  />
                )}
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/25" />
                <span
                  className={`${serif.className} absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[24px] italic text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] md:text-[28px]`}
                >
                  {item.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {[
          { dir: -1, label: "Previous", path: "M9 2L4 7L9 12", pos: "left-3 md:left-5" },
          { dir: 1, label: "Next", path: "M5 2L10 7L5 12", pos: "right-3 md:right-5" },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            aria-label={b.label}
            onClick={() => scrollBy(b.dir)}
            className={`absolute top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#2b241c] shadow-sm transition-colors hover:bg-[#2b241c] hover:text-white md:flex ${b.pos}`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d={b.path} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
    </section>
  );
}

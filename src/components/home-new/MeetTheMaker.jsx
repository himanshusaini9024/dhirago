"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BotanicalArt from "./BotanicalArt";
import { OrnamentDivider } from "./Ornament";
import { serif } from "./theme";
import Reveal from "./Reveal";

const INTERVAL = 5000;

export default function MeetTheMaker({ portrait, slides = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => clearTimeout(t);
  }, [index, slides.length]);

  return (
    <Reveal delay={0.06} y={16}>
      <section className="grid md:grid-cols-2">
        <div className="relative flex items-center justify-center overflow-hidden px-6 py-16 md:px-14 md:py-20">
          {/* <BotanicalArt className="pointer-events-none absolute -left-6 top-0 h-full w-auto text-[#6b5d4a] opacity-[0.12]" />
        <BotanicalArt flip className="pointer-events-none absolute -right-6 top-0 h-full w-auto text-[#6b5d4a] opacity-[0.12]" /> */}

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
              className={`${serif.className} mt-6 text-[17px] italic font-light leading-[1.75] text-[#4a3f33] md:text-[19px]`}
            >
              In the hands of our artisans, a simple thread becomes something
              lasting. Each stitch carries generations of skill, patience and
              instinct — no two pieces are ever quite the same.
            </p>
            <p
              className={`${serif.className} mt-4 text-[17px] italic font-light leading-[1.75] text-[#4a3f33] md:text-[19px]`}
            >
              Worked slowly, these details reveal themselves over time.
            </p>
            <Link
              href="/handwork"
              className={`${serif.className} mt-7 text-[17px] italic text-[#3d342a] underline decoration-[#3d342a]/30 underline-offset-[6px] transition-colors hover:decoration-[#3d342a]`}
            >
              Read more…
            </Link>
          </motion.div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden bg-[#e7dfd1] md:aspect-auto md:min-h-[640px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.2 },
                scale: { duration: 6, ease: "linear" },
              }}
            >
              {slides[index]?.src && (
                <Image
                  src={slides[index].src}
                  alt={slides[index].alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  quality={78}
                  className={`object-cover ${slides[index].position || ""}`}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((s, i) => (
              <button
                key={s.alt}
                type="button"
                aria-label={`Show image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-[6px] rounded-full transition-all duration-500 ${i === index ? "w-6 bg-white" : "w-[6px] bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

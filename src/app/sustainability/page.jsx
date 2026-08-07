"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Fixed set of delay classes — kept as literal strings so Tailwind's
// static scanner can find them (dynamic template strings won't work).
const DELAY_CLASSES = {
  0: "",
  100: "delay-[100ms]",
  200: "delay-[200ms]",
};

import { Josefin_Sans, Cormorant_Garamond } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  const delayClass = DELAY_CLASSES[delay] || "";
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${delayClass} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[26px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Shared font stack applied via the font's generated className.
// (Interpolating the font object itself, as before, rendered "[object Object]"
// and silently dropped Josefin Sans across the whole page.)
const FONT = josefin.className;

export default function OurKissaPage() {
  return (
    <div
      className={`bg-white min-h-screen text-[#2a2a2a] ${FONT}`}
    >
      {/* ══════════════════════════════════════════
          HERO
          Explicit height at every breakpoint — fill-mode
          Image needs a sized parent, not just at lg+.
          ══════════════════════════════════════════ */}
      <section className="relative w-full h-[60vh] sm:h-[75vh] md:h-[85vh] lg:h-screen overflow-hidden">
        <Image
          src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06811-2.jpg"
          alt="A young man wearing a handwoven muslin shirt by a lakeside"
          fill
          priority
          sizes="100vw"
          className="object-cover transition-all duration-700"
          unoptimized
        />
      </section>

      <section className="py-10 sm:py-14 md:py-20 px-5 sm:px-8 md:px-16 lg:px-24 max-w-[75rem] mx-auto">
        <p className="font-futura font-light text-center leading-[1.85] text-[clamp(13px,1.3vw,1.131rem)] text-[#444444]">
          We believe the finest garments are those that become more themselves
          with time. The moment you put on a garment, there is a shift from
          being an individual to becoming an interconnected member of society -
          cloth connects our bodies & minds to a team of makers who brings each
          piece to life. The materiality of the garment connects us to the
          environment & where we stand in relationship to it.
        </p>
      </section>

      {/* ══════════════════════════════════════════
          IMAGE COLLAGE
          Widths now come purely from the grid tracks
          (w-full inside each cell) instead of a fixed
          lg:w-[24rem], so images always fill their column
          at every breakpoint instead of leaving gaps.
          ══════════════════════════════════════════ */}
      <section className="px-5 sm:px-8 md:px-16 lg:px-24 py-10 sm:py-14 md:py-20 max-w-[86rem] mx-auto">
        <div
          className="
            flex flex-col gap-3
            md:grid md:gap-4 md:grid-cols-3 md:grid-rows-[1fr_auto]
          "
        >
          {/* Row: two small squares side by side, even on mobile */}
          <div className="flex gap-3 md:contents">
            {/* Image 1 */}
            <Reveal className="w-1/2 md:w-full md:col-start-1 md:row-start-1">
              <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-[6/7] overflow-hidden">
                <Image
                  src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06273.jpg"
                  alt="Natural wood grain texture"
                  fill
                  sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </Reveal>

            {/* Image 2 */}
            <Reveal delay={100} className="w-1/2 md:w-full md:col-start-2 md:row-start-1">
              <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-[6/7] overflow-hidden">
                <Image
                  src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06299.jpg"
                  alt="White flower growing through a crack in stone"
                  fill
                  sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </Reveal>
          </div>

          {/* Image 3 — tall feature image, full width on mobile, spans both rows on desktop */}
          <Reveal
            delay={200}
            className="w-full md:col-start-3 md:row-start-1 md:row-span-2"
          >
            <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-full min-h-[220px] sm:min-h-[280px] overflow-hidden">
              <Image
                src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06355.jpg"
                alt="Hands holding red berry branches"
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className="object-cover"
                unoptimized
              />
            </div>
          </Reveal>

          {/* Caption */}
          <Reveal
            delay={100}
            className="md:col-start-1 md:col-span-2 md:row-start-2 flex items-end pt-2 md:pt-6"
          >
            <p
              className={`${josefin.className} italic leading-[1.6] text-[clamp(14px,1.7vw,1.35rem)] text-[#333333] tracking-[0.01em]`}
            >
              We wandered to choose what is traditionally beautiful, but to
              notice what lingered. Forms without names. Colours without
              hierarchy.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-10 sm:py-14 md:py-20 px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-[51rem] mx-auto mt-4 sm:mt-8 md:mt-16">
          <p className="font-futura font-light leading-[1.9] text-[clamp(13px,1.3vw,1.01rem)] text-[#444444] tracking-[0.03em] mb-3">
            At DHIRAGO, endurance begins long before a garment is worn. It
            begins with thoughtful choices—natural fibres selected for their
            lasting character and a commitment to making only what deserves
            to remain. The looks developed are safe for the skin and
            transitions seamlessly between cultures from day to evening wear.
            Relaxed silhouettes created with a sartorial touch that echo the
            brand's philosophy 'the beauty of time'
          </p>
          <p className="font-futura font-light leading-[1.9] text-[clamp(13px,1.3vw,1.01rem)] text-[#444444] tracking-[0.03em]">
            The label maintains its unique vision by departing from
            mainstream manufacturing, producing small batch slow-made
            clothing in collaboration with groups of artisans. Every
            collection is developed in considered quantities, allowing
            greater attention to every fabric, every stitch, and every
            finish. Materials are used with care, leftover fabrics are
            thoughtfully repurposed wherever possible, and every decision is
            guided by respect for both the craft and the resources behind it.
            For us, making something enduring is not simply about how long it
            lasts—it is about creating something worthy of being kept,
            returned to, and valued for years to come.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SUSTAINABILITY BAND
          min-h scales gently by breakpoint instead of
          jumping from a fixed 280px straight to a clamp
          that only kicked in past 600px.
          ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden flex items-center min-h-[260px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[500px]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')] bg-cover bg-center bg-scroll lg:bg-fixed" />
        <div className="absolute inset-0 [background:linear-gradient(135deg,rgba(22,37,24,0.92)_0%,rgba(22,37,24,0.75)_40%,rgba(22,37,24,0.55)_70%,rgba(22,37,24,0.8)_100%)]" />
        <div className="relative z-[2] max-w-[1200px] mx-auto w-full px-6 py-10 sm:px-10 sm:py-14 md:px-20 md:py-16 lg:px-24 lg:py-20">
          <Reveal>
            <p className="font-futura font-light leading-[1.9] text-[clamp(14px,1.3vw,1.01rem)] text-white tracking-[0.03em] max-w-full text-center">
              "Sustainability is not a feature — it is the quiet discipline
              behind every decision we make."
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CLOSING STRIP ── */}
    </div>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
});

/* ── Reveal helper (same pattern as BetterMaterials) ──────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, from = "bottom", className = "" }) {
  const [ref, visible] = useReveal();
  const transforms = {
    bottom: visible ? "translateY(0)" : "translateY(28px)",
    left:   visible ? "translateX(0)" : "translateX(-40px)",
    right:  visible ? "translateX(0)" : "translateX(40px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: transforms[from],
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Small flower/mark divider used under the hero subtitle ──── */
function FlowerMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="18"
      height="18"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="16"
          cy="9"
          rx="2.4"
          ry="6.5"
          fill="#C4A882"
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="1.6" fill="#F7F3EE" />
    </svg>
  );
}

/* ── Text + image rows (The Beginning / Udaipur) ──────────────── */
const storyBlocks = [
  {
    eyebrow: "The Beginning",
    paragraphs: [
      [
        "Every city leaves behind something.",
        "For us,",
        "it was patience.",
      ],
      [
        "It was old walls, quiet courtyards, morning light",
        "and stories passed down through hands.",
      ],
    ],
    image: "/images/first-story/2.jpeg",
    alt: "A carved stone window in Udaipur lit by afternoon shadow",
    imageFirst: false,

  },
  {
    eyebrow: "Materials",
    paragraphs: [
      ["A city of lakes.", "A city of light."],
      [
        "A city that teaches you",
        "to slow down and",
        "notice the beautiful.",
      ],
    ],
    image: "/images/first-story/fabric.webp",
    alt: "Carved stone pillars overlooking Lake Pichola",
    imageFirst: true,

  },
];

/* ── Craft cards ───────────────────────────────────────────────── */
const craftItems = [
  {
    title: "Hand Block Printing",
    desc: "Carved by hand. Printed with intention. Each piece, one impression at a time.",
    image: "/images/first-story/craft1.jpg",
    alt: "Artisan hand block printing on fabric",
  },
  {
    title: "Screen Printing",
    desc: "Where detail meets clarity. Bringing intricate drawings to life on fabric with precision and care.",
    image: "/images/first-story/craft2.jpg",
    alt: "Screen printing frame and ink tray",
  },
];

/* ══════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════ */
export default function OurStory() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* ══ 1. HERO ══════════════════════════════════════════════ */}
      <section className="relative w-full h-[68vh] sm:h-[78vh] md:h-[68vh] overflow-hidden bg-gradient-to-br from-amber-200 via-orange-100 to-stone-300">
        <Image
          src="/images/first-story/first.jpg"
          alt="Lakeside view of Udaipur at golden hour"
          fill
          priority
          className="object-cover"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <Reveal>
            <h1
              className={`text-white text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.10em] uppercase drop-shadow-lg ${josefin.className}`}
            >
              The First Story
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 text-white/90 text-xs sm:text-sm  font-medium tracking-[0.15em] leading-7 sm:leading-8">
              Every story begins somewhere.
              <br />
              Ours begins in Udaipur.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <FlowerMark className="mt-6" />
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-white/80 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <span className="relative block w-px h-10 bg-white/30 overflow-hidden">
            <span className="scroll-line-runner absolute top-0 left-0 w-px h-4 bg-white" />
          </span>
        </div>
        <style jsx>{`
          @keyframes scrollRunner {
            0%   { transform: translateY(-16px); opacity: 0; }
            30%  { opacity: 1; }
            100% { transform: translateY(40px); opacity: 0; }
          }
          .scroll-line-runner {
            animation: scrollRunner 1.8s ease-in-out infinite;
          }
        `}</style>
      </section>

<br />
      {/* ══ 2. TEXT + IMAGE ROWS (with panorama break in between) ═ */}
      <section className="relative">
        {storyBlocks.map((block, i) => (
          <div key={block.eyebrow}>
            <div className={`flex flex-col ${block.imageFirst ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
              {/* TEXT PANEL */}
              <Reveal
                from="left"
                className={`w-full lg:w-5/12 flex items-center bg-[#F7F3EE] px-6 sm:px-10 md:px-14 lg:px-16 py-12 sm:py-16 md:py-20 ${block.imageFirst ? "lg:pl-[15em]" : "lg:pl-[15em]"}`}
              >
                <div className="max-w-[26rem]">
                  <span className="block text-[10px] sm:text-[11px] font-normal tracking-[0.4em] uppercase text-[#1C1814] mb-4">
                    {block.eyebrow}
                  </span>
                  <div className="w-9 h-px bg-[#C4A882] mb-6" />
                  <div className="space-y-5">
                    {block.paragraphs.map((lines, pIdx) => (
                      <p
                        key={pIdx}
                        className="font-futura text-sm md:text-[15px] text-[#3A3229] leading-7 md:leading-8"
                      >
                        {lines.map((line, lIdx) => (
                          <span key={lIdx}>
                            {line}
                            {lIdx < lines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* IMAGE PANEL */}
              <Reveal
                from="right"
                className="relative w-full lg:w-6/12 h-[260px] sm:h-[340px] md:h-[620px]  overflow-hidden bg-gradient-to-br from-stone-200 via-amber-100 to-stone-300"
              >
                <Image
                  src={block.image}
                  alt={block.alt}
                  fill
                  className="object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </Reveal>
            </div>

            {/* Full-bleed panorama break — sits between The Beginning and Udaipur */}
            {i === 0 && (
              <>
              <br />
              <div className="relative w-full h-[220px] sm:h-[300px] md:h-[620px] overflow-hidden bg-gradient-to-br from-sky-100 via-amber-50 to-stone-200">
                <Image
                  src="/images/first-story/mid.webp"
                  alt="Panoramic view of Udaipur's lakeside city"
                  fill
                  className="object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
              </>
            )}
            <br />
          </div>
        ))}
      </section>
<br />

      {/* ══ 4. THE BEAUTY OF TIME — overlay section ═════════════ */}
      <section className="relative w-full h-[420px] sm:h-[460px] md:h-[620px] overflow-hidden bg-gradient-to-br from-stone-300 via-stone-200 to-amber-100">
        <Image
          src="/images/first-story/udp.jpg"
          alt="Weathered stone texture in Udaipur"
          fill
          className="object-cover"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

        <div className="relative h-full flex items-center px-6 sm:px-12 md:px-20 lg:px-28">
          <Reveal from="left" className="max-w-[24rem]">
            <span
              className={`block text-white text-lg sm:text-xl md:text-2xl font-light tracking-[0.12em] uppercase mb-5 ${josefin.className}`}
            >
              The Beauty of Time
            </span>
            <div className="w-9 h-px bg-[#C4A882] mb-6" />
            <p className="font-futura text-white/85 text-sm md:text-[15px] leading-7 md:leading-8">
              Time softens stone.
              <br />
              It deepens colour.
              <br />
              It gives meaning to the work of skilled hands.
              <br />
              That understanding became Dhirago.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 5. CRAFT — two-card grid ═════════════════════════════ */}
      <section className="py-14 md:py-24 px-5 sm:px-10 md:px-16 lg:px-24 bg-white">
        <Reveal className="text-center mb-10 md:mb-16">
          <span className="block text-[10px] sm:text-[11px] font-medium tracking-[0.5em] uppercase text-[#1C1814]">
            Craft
          </span>
          <div className="w-9 h-px bg-[#C4A882] mx-auto mt-5" />
        </Reveal>

        <div className="max-w-[64rem] mx-auto grid grid-cols-2 gap-4 sm:gap-8 md:gap-12">
          {craftItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 120} className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-[4/5] sm:aspect-square overflow-hidden bg-gradient-to-br from-stone-200 via-amber-100 to-stone-300">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
              <span className="mt-5 sm:mt-6 text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-[#1C1814]">
                {item.title}
              </span>
              <p className="mt-3 font-futura text-xs sm:text-sm text-[#3A3229] leading-6 sm:leading-7 max-w-[16rem]">
                {item.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>


 <section className="relative w-full h-[420px] sm:h-[460px] md:h-[620px] overflow-hidden bg-gradient-to-br from-stone-300 via-stone-200 to-amber-100">
        <Image
          src="/images/first-story/collection.png"
          alt="Weathered stone texture in Udaipur"
          fill
          className="object-cover"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

        <div className="relative h-full flex items-center px-6 sm:px-12 md:px-20 lg:px-28">
          <Reveal from="left" className="max-w-[24rem]">
            <span
              className={`block text-white text-lg sm:text-xl md:text-2xl font-light tracking-[0.12em] uppercase mb-5 ${josefin.className}`}
            >
              The Collections
            </span>
            <div className="w-9 h-px bg-[#C4A882] mb-6" />
            <p className="font-futura text-white/85 text-sm md:text-[15px] leading-7 md:leading-8">
              Time softens stone.
              <br />
              It deepens colour.
              <br />
              It gives meaning to the work of skilled hands.
              <br />
              That understanding became Dhirago.
            </p>
          </Reveal>
        </div>
      </section>

              <br />

          <section className="relative w-full h-[46vh] sm:h-[52vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/images/first-story/udp.jpg"
          alt="Detail of Dhirago linen fabric"
          fill
          className="object-cover"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-stone-300 via-stone-200 to-amber-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <Reveal>
            <span
              className={`text-white text-sm sm:text-base md:text-lg font-medium tracking-[0.35em] uppercase ${josefin.className}`}
            >
              A Story That Continues
            </span>
          </Reveal>
          <Reveal delay={150}>
            <div className="w-9 h-px bg-[#C4A882] mx-auto my-5" />
          </Reveal>
          <Reveal delay={250}>
            <p className="text-white/85 text-xs sm:text-sm  font-medium leading-7 sm:leading-7 tracking-[0.05em] max-w-[26rem]">
              This is only the beginning.
              <br />
              The story is in the making,
              <br />
              one garment, one detail, one moment at a time.
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
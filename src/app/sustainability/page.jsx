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
      { threshold: 0.1 }
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

const pillars = [
  {
    num: "01",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4 C10 4 4 10 4 18 C4 26 10 32 18 32 C26 32 32 26 32 18" stroke="#8DB88A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 4 L26 12 L18 12" stroke="#8DB88A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="4" stroke="#8DB88A" strokeWidth="1.2" />
      </svg>
    ),
    title: "Natural Fibres",
    body: "Linen and organic cotton selected for biodegradability and lower environmental impact. Linen requires minimal irrigation and fewer chemical inputs — a low-resource fibre from the ground up.",
  },
  {
    num: "02",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="16" width="6" height="14" stroke="#8DB88A" strokeWidth="1.5" />
        <rect x="15" y="10" width="6" height="20" stroke="#8DB88A" strokeWidth="1.5" />
        <rect x="24" y="6" width="6" height="24" stroke="#8DB88A" strokeWidth="1.5" />
        <line x1="4" y1="32" x2="32" y2="32" stroke="#8DB88A" strokeWidth="1.2" />
      </svg>
    ),
    title: "Small-Batch Production",
    body: "Production follows a small-batch model — better control over quantities, reduced excess inventory. Fabric utilisation is carefully managed by minimising cutting waste through efficient pattern planning.",
  },
  {
    num: "03",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M8 28 L14 20 L20 24 L28 12" stroke="#8DB88A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 18 C4 10.3 10.3 4 18 4 C25.7 4 32 10.3 32 18 C32 25.7 25.7 32 18 32 C10.3 32 4 25.7 4 18" stroke="#8DB88A" strokeWidth="1.2" strokeDasharray="2 3" />
      </svg>
    ),
    title: "Zero-Waste Approach",
    body: "Recycled and leftover materials are incorporated wherever possible within the production cycle, reducing the need for new raw resources. Packaging is selected with consideration  environmental impact.",
  },
];

function LeafDeco({ size = 200, opacity = 0.07 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ opacity }}>
      <path d="M100 180 C60 160 20 120 30 70 C40 20 100 10 100 10 C100 10 160 20 170 70 C180 120 140 160 100 180Z" stroke="#8DB88A" strokeWidth="1" />
      <line x1="100" y1="180" x2="100" y2="10" stroke="#8DB88A" strokeWidth="0.7" />
      {[0.25, 0.42, 0.58, 0.73].map((t, i) => {
        const y = 180 - t * 170;
        const spread = 28 + i * 8;
        return (
          <g key={i}>
            <path d={`M100 ${y} Q${100 - spread * 0.6} ${y - 12} ${100 - spread} ${y - 6}`} stroke="#8DB88A" strokeWidth="0.5" fill="none" />
            <path d={`M100 ${y} Q${100 + spread * 0.6} ${y - 12} ${100 + spread} ${y - 6}`} stroke="#8DB88A" strokeWidth="0.5" fill="none" />
          </g>
        );
      })}
    </svg>
  );
}

// Shared font stack applied via Tailwind arbitrary property (no <style> tag, no CSS vars).
const FONT = josefin;

export default function OurKissaPage() {
  return (
    <div className={`bg-[rgba(255,255,255,1.0)] min-h-screen text-[#2a2a2a] ${FONT}`}>

      {/* ── OUR KISSA HEADING ── */}
      <Reveal>
        <div className="pt-10 pb-7 min-[600px]:pt-16 min-[600px]:pb-10">
          <div className="max-w-[880px] mx-auto px-5 min-[600px]:px-6">
            <h1 className={`text-[clamp(28px,5vw,52px)] font-light text-[#111111] leading-[1.1] ${FONT}`}>
              our Kissa
            </h1>
          </div>
        </div>
      </Reveal>

      {/* ── HERO IMAGE ── */}
      <Reveal delay={100}>
        <div className="pb-9 min-[600px]:pb-14 flex justify-center">
          <div className="w-full max-w-[880px] mx-auto px-5 min-[600px]:px-6">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
              alt="Kissa-goi products"
              className="w-full max-w-full h-auto block aspect-[4/3] min-[600px]:aspect-[3/2] object-cover"
            />
          </div>
        </div>
      </Reveal>

      {/* ── INTRO TEXT ── */}
      <Reveal>
        <div className="pb-8 min-[600px]:pb-12">
          <div className="max-w-[880px] mx-auto px-5 min-[600px]:px-6">
            <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
              Material choice, controlled production, and long-term wearability define sustainability at Dhirago.
            </p>
            <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
              The brand works with natural fibres such as linen and organic cotton, selected for their biodegradability and lower environmental impact compared to synthetic alternatives. Linen, in particular, is a low-resource fibre, requiring minimal irrigation and fewer chemical inputs during cultivation.
            </p>
            <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
              Production follows a small-batch model, allowing better control over quantities and reducing excess inventory. Fabric utilisation is carefully managed by minimising cutting waste, with pattern planning and efficient material use.
            </p>
            <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
              Operations are kept low-impact, with limited reliance on heavy industrial methods and a preference for controlled, resource-efficient techniques.
            </p>
            <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
              Recycled and leftover materials are incorporated wherever possible within the production cycle, reducing the need for new raw resources and limiting material waste. Packaging and auxiliary components are also selected with consideration for reduced environmental impact.
            </p>
          </div>
        </div>
      </Reveal>

      <hr className="border-0 border-t border-[#e8e4de] m-0" />

      {/* ── KOSHISH SECTION ── */}
      <Reveal className="py-10 min-[600px]:py-[clamp(48px,8vw,80px)]">
        <section>
          <div className="max-w-[1200px] mx-auto px-5 min-[600px]:px-[clamp(1.5rem,5vw,5rem)]">
            <div className="grid grid-cols-1 gap-6 items-center min-[600px]:gap-8 min-[900px]:grid-cols-2 min-[900px]:gap-[clamp(32px,5vw,80px)]">
              <div>
                <h2            className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
>
                  Koshish, our zero waste initiative
                </h2>
                <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
                  We are dedicated to becoming a zero-waste company. To that end, we create one-of-a-kind products out of all the accumulated scraps through our{" "}
                  <a href="#" className="text-[#2a2a2a] underline underline-offset-2 font-normal">
                    Koshish edit
                  </a>
                  .
                </p>
                <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
                  To know more about Koshish,{" "}
                  <a href="#" className="text-[#2a2a2a] underline underline-offset-2 font-normal">
                    click here
                  </a>
                  .
                </p>
                <a
                  href="#"
                  className={`inline-block mt-6 px-[22px] py-[10px] bg-[#111111] text-white text-[11px] font-normal tracking-[0.12em] uppercase no-underline border-none cursor-pointer transition-colors duration-200 hover:bg-[#333333] ${FONT}`}
                >
                  Shop Koshish
                </a>
              </div>
              <div className="order-first min-[900px]:order-none">
                <img
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80"
                  alt="Koshish zero waste"
                  className="w-full h-auto block aspect-[16/9] max-h-[220px] min-[600px]:max-h-[300px] min-[900px]:aspect-[4/3] min-[900px]:max-h-none object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <hr className="border-0 border-t border-[#e8e4de] m-0" />

      {/* ── FOUR PILLARS ── */}
      <section className="relative overflow-hidden bg-[rgba(255,255,255,1.0)] py-10 min-[600px]:py-[clamp(48px,8vw,80px)]">
        <div className="max-w-[1200px] mx-auto px-5 min-[600px]:px-[clamp(1.5rem,5vw,5rem)]">
          <Reveal>
          
            <h2            className={`${josefin.className} uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
>
              Three Pillars of Responsibility
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[600px]:gap-[1.2rem] min-[900px]:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group relative overflow-hidden border border-[rgba(141,184,138,0.2)] bg-[rgba(255,255,255,0.55)] px-[1.2rem] py-[1.4rem] min-[600px]:px-[clamp(1.2rem,2.5vw,2rem)] min-[600px]:py-[clamp(1.5rem,3vw,2.5rem)] transition-[border-color,background-color,transform] duration-[400ms] hover:border-[rgba(141,184,138,0.4)] hover:bg-[rgba(141,184,138,0.06)] hover:-translate-y-1">
                  <div className="absolute top-0 left-0 w-[3px] h-0 bg-gradient-to-b from-[#8DB88A] to-[#C4A882] transition-[height] duration-500 group-hover:h-full" />
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-[0.8rem] text-[rgba(74,114,72,0.45)] font-thin">{p.num}</span>
                    <h3 className={`text-[clamp(12px,1.2vw,13px)] font-normal tracking-[0.08em] uppercase text-[#162518] ${FONT}`}>
                      {p.title}
                    </h3>
                  </div>
                  <p   className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] ">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SUSTAINABILITY — REAL BACKGROUND IMAGE
          ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden flex items-center min-h-[280px] min-[600px]:min-h-[clamp(300px,50vw,520px)]">
        {/* Background image layer */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')] bg-cover bg-center bg-scroll min-[900px]:bg-fixed" />
        {/* Dark overlay */}
        <div className="absolute inset-0 [background:linear-gradient(135deg,rgba(22,37,24,0.92)_0%,rgba(22,37,24,0.75)_40%,rgba(22,37,24,0.55)_70%,rgba(22,37,24,0.8)_100%)]" />
        {/* Leaf deco top-right */}
        <div className="hidden min-[900px]:block absolute right-[clamp(2rem,8vw,6rem)] top-1/2 -translate-y-1/2 opacity-[0.12] pointer-events-none">
          <LeafDeco size={340} opacity={1} />
        </div>
        {/* Content */}
        <div className="relative z-[2] max-w-[1200px] mx-auto w-full px-6 py-12 min-[600px]:px-[clamp(1.5rem,5vw,5rem)] min-[600px]:py-[clamp(3rem,6vw,5rem)]">
          <Reveal>
           
            <p   className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#ffffff] tracking-[0.03em] max-w-full text-center">
              "Sustainability is not a feature — it is the quiet discipline behind every decision we make."
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CLOSING STRIP ── */}

    </div>
  );
}
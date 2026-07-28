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

// Shared font stack applied via Tailwind arbitrary property (no <style> tag, no CSS vars).
const FONT = josefin;

export default function OurKissaPage() {
  return (
    <div
      className={`bg-[rgba(255,255,255,1.0)] min-h-screen text-[#2a2a2a] ${FONT}`}
    >
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-16 lg:px-24  max-w-[64rem] mx-auto">
        <h2
          className={`${josefin.className} uppercase leading-[1.90]  text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          Made to Endure
        </h2>
        <p className="font-futura font-light text-center leading-[1.75] text-[clamp(12px,1.3vw,1.01rem)] leading-[1.85] text-[#444444] ">
          We believe the finest garments are those that become more themselves
          with time. The moment you put on a garment, there is a shift from
          being an individual to becoming an interconnected member of society -
          cloth connects our bodies & minds to a team of makers who brings each
          piece to life. The materiality of the garment connects us to the
          environment & where we stand in relationship to it.
        </p>
      </section>
      {/* ══════════════════════════════════════════
          cropsection — start
          Left sets height; right flex-1 fills it.
          Max-width keeps desktop proportions close
          to the mobile editorial reference (tall right).
          ══════════════════════════════════════════ */}
    <section className="w-full leading-none">
        <img
          src="/images/za-blog-image.jpg"
          alt="Hand Embroidery"
          className="w-full h-auto block max-h-screen object-cover"
        />
      </section>
      {/* ══════════════════════════════════════════
          cropsection — end
          ══════════════════════════════════════════ */}

  <section className="py-14 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24">

      
        <div className="max-w-[51rem] mx-auto mt-5 md:mt-16 ">
        
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
            At DHIRAGO, endurance begins long before a garment is worn. It begins with thoughtful choices—natural fibres selected for their lasting character and a commitment to making only what deserves to remain. The looks developed are safe for the skin and transitions seamlessly between cultures from day to evening wear. Relaxed silhouettes created with a sartorial touch that echo the brand’s philosophy ‘the beauty of time’
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
            The label maintains its unique vision by departing from mainstream manufacturing, producing small batch slow-made clothing in collaboration with groups of artisans.  Every collection is developed in considered quantities, allowing greater attention to every fabric, every stitch, and every finish. Materials are used with care, leftover fabrics are thoughtfully repurposed wherever possible, and every decision is guided by respect for both the craft and the resources behind it.
            For us, making something enduring is not simply about how long it lasts—it is about creating something worthy of being kept, returned to, and valued for years to come..
          </p>
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
        <div className="hidden min-[900px]:block absolute right-[clamp(2rem,8vw,6rem)] top-1/2 -translate-y-1/2 opacity-[0.12] pointer-events-none"></div>
        {/* Content */}
        <div className="relative z-[2] max-w-[1200px] mx-auto w-full px-6 py-12 min-[600px]:px-[clamp(1.5rem,5vw,5rem)] min-[600px]:py-[clamp(3rem,6vw,5rem)]">
          <Reveal>
            <p className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#ffffff] tracking-[0.03em] max-w-full text-center">
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

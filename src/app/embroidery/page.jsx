"use client";

import { Josefin_Sans, Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const processSteps = [
  {
    title: "PANEL MARKING",
    desc: "The journey of every garment begins from here- where fabric panels are carefully cut and marked according to the design blueprint, creating the foundation upon which the handwork unfolds.",
  },
  {
    title: "KHAKHA PINNING",
    desc: "The journey continues with our embroidery artisan, Ahmed bhai and his team. Here, the design is carefully traced onto paper and perforated by hand to create a khakha—a traditional stencil used to transfer the artwork onto the fabric. Serving as the blueprint for the embroidery, it ensures every detail is placed with precision before the handwork begins.",
  },
  {
    title: "CHAPPAI (MARKING THE EMBROIDERY)",
    desc: "Using the khakha as a guide, the design is delicately transferred onto the fabric using choona (lime) for darker fabrics and neel (indigo) for lighter ones. This meticulous process ensures every motif is positioned with precision, creating the foundation for embroidery that unfolds clarity.",
  },
  {
    title: "SETTING THE ADDA",
    desc: "Once marked, fabric is then carefully mounted onto a traditional wooden adda, where it is stretched and secured in place. With the canvas prepared, the embroidery enters its most intricate and time-intensive stage, guided by patience, precision, and skilled craftsmanship.",
  },
  {
    title: "HAND EMBROIDERY",
    desc: "With patience and precision, the embroidery slowly takes shape. Depending on the intricacy of the design, a single panel may require several days of dedicated handwork. Every stitch is executed with care and precision.",
  },
];

const photos = [
  "https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06299.jpg",
  "https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06358.jpg",
  "https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06360.jpg",
  "https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06273.jpg",
];

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: visible
          ? `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
          : "opacity 0.35s ease 0ms, transform 0.35s ease 0ms",
      }}
    >
      {children}
    </div>
  );
}

const sectionPad = "px-5 sm:px-8 lg:px-16";
const container = `max-w-[1200px] mx-auto ${sectionPad}`;
const heading = `${josefin.className} uppercase text-[clamp(13px,1.5vw,15px)] text-[#333] tracking-[0.12em] leading-[1.6]`;
const body =
  "font-futura font-light leading-[1.9] text-[clamp(13px,1.35vw,1.07rem)] text-[#444] tracking-[0.02em]";

export default function HandEmbroideryPage() {
  return (
    <div className="bg-white text-[#2a2a2a] overflow-x-hidden">
      {/* HERO */}

      <section className="w-full leading-none">
        <Image
          src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06358.jpg?v=1"
          alt="A young man wearing a handwoven muslin shirt by a lakeside"
          width={2000}
          height={800}
          priority
          sizes="100vw"
          className="object-cover transition-all duration-700"
          unoptimized
        />
      </section>

      {/* INTRO */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="text-left max-w-[560px] mx-auto lg:mx-0 w-full">
              <h2 className={`${heading} mb-5 sm:mb-6`}>
                A Touch of Embroidery, a Shade of Elegance
              </h2>
              <p className={`${body} mb-4`}>
                DHIRAGO works with indigenous textile techniques and natural
                fabrics, thoughtfully integrating time-honoured crafts such as,
                Sashiko hand stitching, and Kantha embroidery and Tangaliya
                inspired weaving into its garments. Each technique is applied
                through controlled, manual execution—Sashiko through repetitive
                reinforcement stitching, Kantha through layered running stitches
                and tangaliya through its distinctive pattern language.
                Meticulously hand embroidered, each piece reflects our devotion
                to slow, thoughtful designs.
              </p>
              <p className={body}>
                These practices are deeply rooted in India’s cultural heritage
                and are incorporated with finesse, creating garments that remain
                connected to tradition while expressed with a modern
                sensibility. By continuing these techniques, DHIRAGO upholds its
                commitment to preserving age-old craftsmanship and celebrating
                India’s rich textile legacy, presenting ethical and
                heritage-driven making as a form of true luxury.
              </p>
            </div>

            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] aspect-[9/16] overflow-hidden bg-[#111]">
                <video
                  src="https://kardo.co/wp-content/uploads/2025/06/reel-2-2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="pt-4 lg:pt-20 pb-10 lg:pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
          <h2
            className={`${josefin.className} uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4 text-center`}
          >
            PROCESS
          </h2>
          <div className="max-w-[1020px] mx-auto text-[#464646] tracking-[1.6px]">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className={`mb-11 ${i === processSteps.length - 1 ? "mb-0" : ""}`}
              >
                <span className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
                  {step.title}
                </span>
                <span className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444] tracking-[0.03em] block">
                  {step.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GRID */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className={container}>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:gap-5">
            {photos.map((src, i) => (
              <div
                key={src}
                className="group relative aspect-[4/3] overflow-hidden bg-[#f0eeea]"
              >
                <img
                  src={src}
                  alt={`Embroidery process ${i + 1}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY / HERITAGE */}

      <section className="py-[clamp(1rem,5vw,9rem)] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
          <div
            className="story-grid grid gap-[clamp(2rem,5vw,4rem)] items-center
                       grid-cols-1 lg:grid-cols-[1fr_1.25fr]"
          >
            <div>
              <Reveal>
                <h2
                  className={`${josefin.className} uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
                >
                  At DHIRAGO, every stitch begins with a story
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className={`${body} mb-4`}>
                  Hand embroidery preserves the rhythm of traditional
                  craftsmanship, where each stitch is guided by hand, creating
                  subtle variations that make every piece unique.
                </p>
                <p className={`${body} mb-4`}>
                  From khakha marking to the wooden adda, every stage is shaped
                  by patience and precision—bringing fine detail and expressive
                  artwork to fabric with care.
                </p>
                <p className={`${body} mb-4`}>
                  Together, these techniques celebrate the dialogue between
                  heritage and contemporary design, allowing every garment to
                  carry both the touch of the artisan and the spirit of
                  thoughtful making.
                </p>
                <p className={body}>
                  It is here that exquisite craftsmanship meets material
                  excellence—where detail is not an addition, but becomes a
                  signature of the piece.
                </p>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <div className="relative w-full overflow-hidden bg-black/5 h-[clamp(360px,48vw,550px)] lg:left-[5rem]">
                <Image
                  src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/ud.png?v=1"
                  alt="A young man wearing a handwoven muslin shirt by a lakeside"
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-all duration-700"
                  unoptimized
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-12 sm:py-14 lg:py-16 border-t border-b border-[#e8e4de]">
        <div className={`${container} text-center`}>
          <p
            className={`${cormorant.className} italic text-[clamp(18px,2.4vw,26px)] leading-[1.55] text-[#444] max-w-[720px] mx-auto`}
          >
            &quot;An exceptionally skilled artisan, with the most brilliant
            hands—we couldn&apos;t have asked for anyone better.&quot;
          </p>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
/* ── Reveal helper ─────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
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

function Reveal({ children, delay = 0, from = "bottom" }) {
  const [ref, visible] = useReveal();
  const transforms = {
    bottom: visible ? "translateY(0)" : "translateY(28px)",
    left:   visible ? "translateX(0)" : "translateX(-36px)",
    right:  visible ? "translateX(0)" : "translateX(36px)",
  };
  return (
    <div
      ref={ref}
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

/* ── Data ──────────────────────────────────────────────────── */
const linenQualities = [
  { icon: "◈", title: "Longer Staple Length",    body: "European flax is known for its longer staple length, which directly enhances durability and smoothness — a fibre built with strength from within." },
  { icon: "◎", title: "Rain-Fed Cultivation",    body: "Cultivated from premium flax grown in naturally balanced coastal environments of France and Belgium." },
  { icon: "◇", title: "Naturally Antibacterial", body: "Linen is inherently antibacterial and cooling against the skin. A fibre that takes care of the wearer." },
  { icon: "○", title: "Fabric of Royalty",       body: "A timeless material refined through centuries of use and admired for understated luxury." },
  { icon: "△", title: "Eco-Conscious",           body: "Minimal chemical inputs during cultivation, biodegradable by nature and respectful to the earth." },
  { icon: "□", title: "Softens Over Time",       body: "The more it is worn and washed, the softer and richer it becomes." },
];

const elements = [
  {
    label: "Materials",
    path: (
      <>
        <circle cx="32" cy="32" r="20" stroke="#1C1814" strokeWidth="1.2" />
        <path d="M14 26C18 20 28 16 36 22C44 28 46 40 40 46" stroke="#1C1814" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M26 14C24 20 24 32 30 40C34 46 40 50 44 48" stroke="#1C1814" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    label: "Fusing",
    path: (
      <>
        <path d="M12 22L32 14L52 22L32 30Z" stroke="#1C1814" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
        <path d="M12 32L32 24L52 32L32 40Z" stroke="#1C1814" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
        <path d="M12 42L32 34L52 42L32 50Z" stroke="#1C1814" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      </>
    ),
  },
  {
    label: "Buttons",
    path: (
      <>
        <circle cx="32" cy="32" r="22" stroke="#1C1814" strokeWidth="1.2" />
        <circle cx="32" cy="32" r="16" stroke="#1C1814" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="26" cy="26" r="3" stroke="#1C1814" strokeWidth="1.2" fill="none" />
        <circle cx="38" cy="26" r="3" stroke="#1C1814" strokeWidth="1.2" fill="none" />
        <circle cx="26" cy="38" r="3" stroke="#1C1814" strokeWidth="1.2" fill="none" />
        <circle cx="38" cy="38" r="3" stroke="#1C1814" strokeWidth="1.2" fill="none" />
      </>
    ),
  },
  {
    label: "Stitching",
    path: (
      <>
        <line x1="14" y1="50" x2="46" y2="18" stroke="#1C1814" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M44 16L50 14L48 20Z" stroke="#1C1814" strokeWidth="1" strokeLinejoin="round" fill="none" />
        <path d="M22 42C28 36 18 24 28 18C38 12 44 24 36 30C28 36 34 46 42 44" stroke="#1C1814" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    label: "Finishing",
    path: (
      <>
        <path d="M32 12C32 12 33 24 40 28C33 32 32 44 32 44C32 44 31 32 24 28C31 24 32 12 32 12Z" stroke="#1C1814" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
        <path d="M48 16C48 16 48.5 20 51 21.5C48.5 23 48 27 48 27C48 27 47.5 23 45 21.5C47.5 20 48 16 48 16Z" stroke="#1C1814" strokeWidth="1" strokeLinejoin="round" fill="none" />
      </>
    ),
  },
];

const constructionDetails = [
  { num: "01", label: "Collar Precision",  desc: "Every collar is cut, interfaced, and pressed to a standard that holds its shape through years of wear — clean, sharp, and quietly authoritative." },
  { num: "02", label: "Placket Fusing",    desc: "An extra layer of fabric fused to plackets, cuffs, and collars adds structural strength without adding stiffness — a hidden architecture of durability." },
  { num: "03", label: "Stitch Neatness",   desc: "Every seam is sewn with consistency in tension, spacing, and direction. The inside of a Dhirago garment is as considered as the outside." },
  { num: "04", label: "Cuff Construction", desc: "Fused cuffs resist fraying and deformation over time, ensuring the garment maintains its refined appearance with each wear and wash." },
];

const materials = [
  {
    id: "european-linen",
    label: "EUROPEAN LINEN",
    image: "/images/european-linen.jpg",
    description1: "Every piece begins with a simple belief – true quality comes from the material. We use 60 count European linen a finer, more refined yarn - this linen is cultivated from premium flax fibres grown in a naturally balanced environment. The crop relies solely on rain-fed irrigation, requiring no artificial watering and producing minimal waste, making it as responsible as it is refined.",
    description2: "The quality of linen begins with the selection of fibre—European flax is known for its longer staple length, which directly enhances the durability, smoothness, it's soft on the skin, yet strong in its legacy. Often regarded as the fabric of royalty, linen carries a legacy of understated luxury. It is naturally cooling, antibacterial, and eco-conscious. This exceptional material is brought to life through Indian craftsmanship.",
  },
];

/* ══════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════ */
export default function BetterMaterials() {
  const videoRef = useRef(null);
  const [activeQuality, setActiveQuality] = useState(0);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ══ 1. HERO VIDEO ══════════════════════════════════════ */}
      <section className="relative w-full h-[42vh] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.shopify.com/videos/c/o/v/644f293d948d41519141b0df449f8ab7.mp4"
          autoPlay loop muted playsInline
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 className="text-white font-futura text-2xl sm:text-4xl md:text-5xl font-light text-center drop-shadow-lg tracking-widest uppercase">
            Better Materials
          </h1>
        </div>
      </section>

      {/* ══ 2. INTRO ═══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-16 lg:px-24 text-center max-w-[64rem] mx-auto">
        <h2 className="text-xl md:text-[31.75px] font-futura font-light text-stone-800 leading-snug mb-5">
          Behind every great garment, is a carefully chosen material.
        </h2>
        <p className="text-sm md:text-base text-stone-800 md:leading-9 leading-7 font-futura text-center">
          Every piece of clothing we design has its own story. And the raw materials we choose are the words that
          narrate it. We take our materials quite seriously and sweat over every little detail — where it&apos;s
          made, how it&apos;s made, who makes it — so we know the final product is good for you as well as our planet.
        </p>
      </section>

      {/* ══ 3. MATERIALS — stacked ═════════════════════════════ */}
      {materials.map((mat, index) => (
        <section key={mat.id} className="px-4 sm:px-8 md:px-16 lg:px-24 mb-20">

          {/* Full-width image */}
          <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] overflow-hidden rounded-sm">
            <Image
              src={mat.image}
              alt={mat.label}
              fill
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-sky-100 to-blue-300" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <h3
                className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-[0.2em] drop-shadow-xl"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.35)" }}
              >
                {mat.label.charAt(0) + mat.label.slice(1).toLowerCase()}.
              </h3>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-[60rem] mx-auto mt-10 md:mt-16">
            <p className="text-sm md:text-base font-futura text-justify text-stone-800 !leading-8 mb-4">
              {mat.description1}
            </p>
            <p className="text-sm md:text-base font-futura text-justify text-stone-800 !leading-8">
              {mat.description2}
            </p>
          </div>

          {index < materials.length - 1 && (
            <div className="max-w-5xl mx-auto mt-16">
              <div className="h-px bg-stone-100" />
            </div>
          )}
        </section>
      ))}

      {/* ══ 4. MATERIAL QUALITIES ══════════════════════════════ */}
      <div className="py-14 md:py-24 px-4 sm:px-8 md:px-16 lg:px-20 bg-[#F7F3EE]">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

            {/* LEFT — clickable quality list */}
            <Reveal from="left">
              <span className="block text-[9px] font-light tracking-[0.55em] uppercase text-[#A08870] mb-6">
                Material Qualities
              </span>

              {linenQualities.map((q, i) => (
                <div
                  key={i}
                  onClick={() => setActiveQuality(i)}
                  className={`
                    py-4 md:py-5 border-b border-black/10 cursor-pointer
                    transition-all duration-300 ease-in-out
                    first:border-t first:border-black/10
                    ${activeQuality === i ? "pl-3" : "pl-0 hover:pl-3"}
                  `}
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <span className={`text-base w-5 text-center transition-opacity duration-300 text-[#C4A882] ${activeQuality === i ? "opacity-100" : "opacity-30"}`}>
                      {q.icon}
                    </span>
                    <span className={`font-futura text-sm md:text-base font-normal tracking-[0.07em] uppercase transition-colors duration-300 ${activeQuality === i ? "text-[#1C1814]" : "text-[#1C1814]/30"}`}>
                      {q.title}
                    </span>
                  </div>
                </div>
              ))}
            </Reveal>

            {/* RIGHT — sticky detail card */}
            <div className="lg:sticky lg:top-20 mt-8 lg:mt-0">
              <Reveal>
                <div className="bg-[#C4A882]/[0.07] border border-[#C4A882]/25 px-6 sm:px-8 lg:px-10 py-8 md:py-10">
                  <div className="text-3xl md:text-[2.2rem] text-[#C4A882] mb-5">
                    {linenQualities[activeQuality].icon}
                  </div>
                  <h3 className="font-futura text-xl md:text-[clamp(0.589rem,2.5vw,0.992rem)] font-normal tracking-[0.06em] uppercase text-[#1C1814] mb-4 leading-[1.3]">
                    {linenQualities[activeQuality].title}
                  </h3>
                  <p className="text-sm md:text-[clamp(13px,1.4vw,15px)] font-futura font-light leading-[1.9] text-[#4A4035] text-justify">
                    {linenQualities[activeQuality].body}
                  </p>
                  <div className="w-12 h-px bg-[#C4A882] mt-7" />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </div>

      {/* ══ 5. HALLMARKS SECTION ═══════════════════════════════ */}
      <section className="py-14 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24">

        {/* Full-width image */}
        <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] overflow-hidden rounded-sm">
          <Image
            src="/images/european-linen.jpg"
            alt="European Linen"
            fill
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-sky-100 to-blue-300" />
        </div>

        {/* Hallmarks copy */}
        <div className="max-w-[40rem] mx-auto mt-10 md:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-stone-900 mb-6">
            The Hallmarks of a great garment.
          </h3>
          <p className="text-sm md:text-base font-futura text-justify text-stone-800 !leading-8 mb-4">
            Every inch of a Dhirago piece reflects an approach of craftsmanship – where precision and attention
            to details are never compromised. It's evident in how our fabrics feels on your skin, to how the
            collar sits and the neatness of every stitch, everything is thoughtfully done.
          </p>
          <p className="text-sm md:text-base font-futura text-justify text-stone-800 !leading-8">
            All the garments are made to maximise the wear, this is done by adding an extra layer of fabric to
            placket, cuffs and collars to give them added layer of strength. This is called fusing. It enhances
            durability while giving the garment a sharper, more refined finish.
          </p>
        </div>

        {/* ── Five Elements of Craft ── */}
        <div className="mt-14 md:mt-20 py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-20 bg-white border-y border-[#C4A882]/15">
          <div className="max-w-[1160px] mx-auto">
            <span className="block text-center text-[9px] font-light tracking-[0.55em] uppercase text-[#A08870] mb-10 md:mb-12">
              The Five Elements of Craft
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 items-start">
              {elements.map((el, i) => (
                <div key={i} className="flex flex-col items-center gap-3 md:gap-4">
                  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" className="sm:w-14 sm:h-14">
                    {el.path}
                  </svg>
                  <span className="text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.45em] uppercase text-[#1C1814] font-normal text-center">
                    {el.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. CONSTRUCTION DETAILS ════════════════════════════ */}
      <div className="pt-4 pb-14 md:pb-24 px-4 sm:px-8 md:px-16 lg:px-20 bg-[#ffffff]">
        <div className="max-w-[1160px] mx-auto">
          <span className="block text-[9px] font-light tracking-[0.55em] uppercase text-[#A08870] mb-8 md:mb-10">
            Construction Details
          </span>

          {constructionDetails.map((d, i) => (
            <div
              key={i}
              className={`py-5 md:py-6 border-t border-[#C4A882]/25 ${i === constructionDetails.length - 1 ? "border-b border-[#C4A882]/25" : ""}`}
            >
              {/* 
                Mobile:  number + label on one row, desc full-width below
                Desktop: number | label | desc in 3 columns
              */}
              <div className="grid grid-cols-[44px_1fr] md:grid-cols-[72px_1fr_2fr] gap-3 md:gap-6 items-start">
                <span className="font-futura text-base md:text-[1.1rem] text-[#C4A882]/50 font-extralight leading-tight">
                  {d.num}
                </span>
                <span className="font-futura text-sm md:text-[clamp(0.9rem,1.5vw,0.879rem)] font-normal tracking-[0.04em] uppercase text-[#1C1814] leading-snug">
                  {d.label}
                </span>
                <p className="col-span-2 text-justify md:col-span-1 md:col-start-3 text-sm md:text-[clamp(13px,1.4vw,15px)] font-light leading-[1.85] text-[#6B5B4E] text-justify m-0 pl-[47px] md:pl-0 mt-1 md:mt-0">
                  {d.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ 7. QUOTE BLOCK ═════════════════════════════════════ */}
      <div className="py-12 md:py-20 px-4 sm:px-8 md:px-16 lg:px-20 bg-[#F7F3EE] border-t border-[#C4A882]/20 text-center">
        <p className="font-futura font-light text-[#1C1814] leading-[1.6] text-[clamp(1rem,2.5vw,1.3rem)] max-w-[780px] mx-auto mb-8">
          &ldquo;Everything is thoughtfully done — from how the fabric feels on your skin, to how the collar sits,
          to the neatness of every stitch.&rdquo;
        </p>
        <div className="w-px h-[60px] bg-gradient-to-b from-[#C4A882] to-transparent mx-auto" />
      </div>

    </div>
  );
}
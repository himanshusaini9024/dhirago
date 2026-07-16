"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
});
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
    description1: "Every piece begins with a simple belief – true quality comes from the material. We use 60 count European linen, a finer and more refined yarn— carefully sourced through trusted textile partners who share our commitment to exceptional quality. Crafted from premium European flax fibres, this linen is renowned for its natural breathability and refined texture. Grown primarily through rain-fed cultivation with minimal environmental impact, it is a material valued as much for its sustainability as for its timeless elegance.",
    description2: "European flax is known for its longer staple length, which directly enhances the durability, smoothness, it’s soft on the skin, yet strong in its legacy. Often regarded as the fabric of royalty, linen carries a legacy of understated luxury. It is naturally cooling, antibacterial, and eco-conscious. This exceptional material is brought to life through Indian craftsmanship. From selecting the finest linen to the precision of the final stitch, attention to detail remains uncompromised.",
  },
];

const photos = [
  "https://ekdulari.com/cdn/shop/files/about-page-img-3_2048x.jpg?v=1772560626g",
  "https://kardo.co/wp-content/uploads/2025/06/DSC00757-1024x1024.jpg",
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
          <h1 className={`text-white  text-xl sm:text-4xl md:text-4xl font-light text-center drop-shadow-lg tracking-widest uppercase ${josefin.className}`}>
            Essence of fine garment
          </h1>
        </div>
      </section>

      {/* ══ 2. INTRO ═══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-16 lg:px-24 text-center max-w-[64rem] mx-auto">
        <h2 className={`${josefin.className} uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}>
          True craftsmanship starts with the material
        </h2>
        <p className="font-futura font-light leading-[1.75] text-[clamp(14px,1.3vw,1.01rem)] leading-[1.85] text-[#444444] tracking-[0.03em]">
          Every garment begins with a story. The materials we choose become its foundation, shaping its character, comfort, and longevity. We are deliberate about every fabric—where it comes from, how it is produced, and the hands involved in its making—ensuring each piece is crafted with care for both the wearer and the world it belongs to.
        </p>
      </section>

      {/* ══ 3. MATERIALS — stacked ═════════════════════════════ */}
    

         <section className="pt-16 lg:pt-10">
         <div className="grid grid-cols-2 gap-5 max-w-[1200px] mx-auto px-5 lg:px-[60px]">
        {photos.map((src, i) => (
          <div key={i} className="group aspect-[3.5/4] overflow-hidden leading-none">
            <img
              src={src}
              alt={`Process ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>
        ))}
      </div>
      </section>

      <section className="pt-10 lg:pt-12 pb-16 lg:pb-20">
      
         <div className="max-w-[68rem]  mx-auto mt-1 md:mt-4 text-align">
        
          <p className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
            Every piece begins with a simple belief—true quality begins with the material. At DHIRAGO, we work with thoughtfully sourced natural fabrics, chosen not only for how they look, but for how they feel, and endure over time.
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
            From premium European linen to finely woven cottons and other natural fibres, each textile is selected through trusted partners who share our commitment to exceptional quality, responsible sourcing, and lasting craftsmanship. Every fabric is chosen for its breathability, comfort and refined texture.
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
            These fibres are cultivated with respect for the environment, relying on responsible farming practices and minimal resources. Their lasting quality reflects a quieter approach to making—one that values longevity over excess.
          </p>
        </div>
      </section>

      {/* ══ 4. MATERIAL QUALITIES ══════════════════════════════ */}
     <section className="lg:w-1/2 relative lg:left-[30rem]" style={{ overflow: "hidden", minHeight: "57vh", display: "flex", alignItems: "center" }}>

          <video
            src="/videos/udaipur1.mp4"
            autoPlay loop muted playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(10,16,24,0.82) 0%,rgba(10,16,24,0.55) 55%,rgba(10,16,24,0.25) 100%)" }} />

          
        </section>

      {/* ══ 5. HALLMARKS SECTION ═══════════════════════════════ */}
      <section className="py-14 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24">

        {/* Full-width image */}
        {/* <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] overflow-hidden rounded-sm">
          <Image
            src="/images/european-linen.jpg"
            alt="European Linen"
            fill
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-sky-100 to-blue-300" />
        </div> */}

        {/* Hallmarks copy */}
        <div className="max-w-[51rem] mx-auto mt-10 md:mt-16 ">
          <h3 className={`${josefin.className} text-center uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}>
            The Hallmarks of a great garment
          </h3>
          <p className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
            Every inch of a Dhirago piece reflects an approach of craftsmanship – where precision and attention
            to details are never compromised. It's evident in how our fabrics feels on your skin, to how the
            collar sits and the neatness of every stitch, everything is thoughtfully done.
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
            All the garments are made to maximise the wear, this is done by adding an extra layer of fabric to
            placket, cuffs and collars to give them added layer of strength. It enhances
            durability while giving the garment a sharper, more refined finish.
          </p>
        </div>

        {/* ── Five Elements of Craft ── */}
        <div className="mt-14 md:mt-20 py-4 md:py-16 px-4 sm:px-8 md:px-16 lg:px-20 bg-white border-y border-[#C4A882]/15">
          <div className="max-w-[1160px] mx-auto">
            <span  className={`block text-center uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4 font-medium text-stone-900 mb-4 md:mb-12 ${josefin.className}`}>
              The Five Elements of Craft
              
            </span><br />
            <div className="grid  grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-2 items-start">
              {elements.map((el, i) => (
                <div key={i} className="flex flex-col items-center gap-3 md:gap-6">
                  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" className="sm:w-20 sm:h-20">
                    {el.path}
                  </svg>
                  <span className="text-[clamp(14px,1.3vw,1.01rem)]  tracking-[0.4em] sm:tracking-[0.45em] uppercase text-[#1C1814] font-normal text-center">
                    {el.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. CONSTRUCTION DETAILS ════════════════════════════ */}
    

      {/* ══ 7. QUOTE BLOCK ═════════════════════════════════════ */}
      <div className="py-12 md:py-20 px-4 sm:px-8 md:px-16 lg:px-20 border-t border-[#C4A882]/20 text-center">
        <p className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
          &ldquo;Everything is thoughtfully done — from how the fabric feels on your skin, to how the collar sits,
          to the neatness of every stitch.&rdquo;
        </p>
        <div className="w-px h-[60px] bg-gradient-to-b from-[#C4A882] to-transparent mx-auto" />
      </div>

    </div>
  );
}
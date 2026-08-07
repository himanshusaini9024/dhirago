"use client";

import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
});

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

const photos = [
  "https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/better-materail/dsc03796.jpg",
  "https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/better-materail/dsc06268.jpg",
];

/* Shared layout tokens — same padding / type on every breakpoint */
const pad = "px-5 sm:px-8 lg:px-16";
const wide = `w-full max-w-[1200px] mx-auto ${pad}`;
const copy = `w-full max-w-[720px] mx-auto ${pad}`;
const sectionY = "py-12 sm:py-16 lg:py-20";
const heading = `${josefin.className} uppercase text-center text-[13px] sm:text-[14px] lg:text-[15px] text-[#333] tracking-[0.08em] leading-[1.7]`;
const body =
  "font-futura font-light text-center text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.9] text-[#444] tracking-[0.03em]";

export default function BetterMaterials() {
  return (
    <div className="bg-white text-[#2a2a2a] overflow-x-hidden">
      {/* HERO — zoomed crop hides model face  scale-[1.35] object-[center_70%]*/}
      <section className="relative w-full h-[50vh] min-h-[320px] max-h-[920px] sm:h-[65vh] lg:h-screen overflow-hidden bg-[#1a1a1a]">
        <img
          src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06401.jpg?v=1"
          alt="Better Materials"
          className="absolute inset-0 w-full h-full object-cover "
        />
      </section>

      {/* INTRO */}
      <section className="py-14 md:py-28 px-5 sm:px-8 md:px-16 lg:px-24  max-w-[64rem] mx-auto">
        <h2 className={`${josefin.className} uppercase leading-[1.90] text-center text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}>
          True craftsmanship starts with the material
        </h2>
        <p className="font-futura text-center font-light leading-[1.75] text-[clamp(12px,1.3vw,1.131rem)] leading-[1.85] text-[#444444] tracking-[0.03em]">
          Every garment begins with a story. The materials we choose become its foundation, shaping its character, comfort, and longevity. We are deliberate about every fabric—where it comes from, how it is produced, and the hands involved in its making—ensuring each piece is crafted with care for both the wearer and the world it belongs to.
        </p>
      </section>

      {/* PHOTO PAIR */}
      <section className="pb-4 sm:pb-6">
        <div className={wide}>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
           {photos.map((src, i) => (
  <div
    key={i}
    className="group relative aspect-[3.5/4] overflow-hidden rounded-sm"
  >
    <Image
      src={src}
      alt={`Material detail ${i + 1}`}
      fill
      className="object-cover"
      sizes="(max-width: 640px) 50vw, 25vw"
      unoptimized
    />
  </div>
))}
          </div>
        </div>
      </section>

      {/* MATERIAL STORY */}
      <section className="pt-10 lg:pt-20 pb-16 lg:pb-24 px-5">
      
         <div className="max-w-[79rem]  mx-auto mt-1 md:mt-4 text-center">
        
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.131rem)]  text-[#444444] tracking-[0.03em] mb-3">
            Every piece begins with a simple belief—true quality begins with the material. At DHIRAGO, we work with thoughtfully sourced natural fabrics, chosen not only for how they look, but for how they feel, and endure over time.
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.131rem)]  text-[#444444] tracking-[0.03em] mb-3">
            From premium European linen to finely woven cottons and other natural fibres, each textile is selected through trusted partners who share our commitment to exceptional quality, responsible sourcing, and lasting craftsmanship. Every fabric is chosen for its breathability, comfort and refined texture.
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.131rem)]  text-[#444444] tracking-[0.03em]">
            These fibres are cultivated with respect for the environment, relying on responsible farming practices and minimal resources. Their lasting quality reflects a quieter approach to making—one that values longevity over excess.
          </p>
        </div>
      </section>

      {/* CENTERED VIDEO — not full width */}
      <section className={pad}>
        <div className="relative mx-auto w-full max-w-[980px] aspect-video overflow-hidden bg-[#111]">
          <video
            src="/videos/udaipur1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* HALLMARKS */}
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
        <div className="max-w-[51rem] mx-auto mt-5 md:mt-16 ">
          <h3 className={`${josefin.className} text-center uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}>
            The Hallmarks of a great garment
          </h3>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
            Every inch of a Dhirago piece reflects an approach of craftsmanship – where precision and attention
            to details are never compromised. It's evident in how our fabrics feels on your skin, to how the
            collar sits and the neatness of every stitch, everything is thoughtfully done.
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
            All the garments are made to maximise the wear, this is done by adding an extra layer of fabric to
            placket, cuffs and collars to give them added layer of strength. It enhances
            durability while giving the garment a sharper, more refined finish.
          </p>
        </div>

        {/* ── Five Elements of Craft ── */}
        <div className="mt-14 md:mt-20 py-4 md:py-16 px-4 sm:px-8 md:px-16 lg:px-20 bg-white border-y border-[#C4A882]/15">
          <div className="max-w-[1160px] mx-auto">
            <span  className={`block text-center uppercase leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4 font-medium text-stone-900 mb-4 md:mb-12 ${josefin.className}`}>
              The Five Elements of Craft
              
            </span><br />
            <div className="grid  grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-2 items-start">
              {elements.map((el, i) => (
                <div key={i} className="flex flex-col items-center gap-3 md:gap-6">
                  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" className="sm:w-20 sm:h-20">
                    {el.path}
                  </svg>
                  <span className="text-[clamp(12px,1.3vw,1.01rem)]  tracking-[0.1em] sm:tracking-[0.45em] uppercase text-[#1C1814] font-normal text-center">
                    {el.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className={sectionY}>
        <div className={`${copy} text-center`}>
          <p className={body}>
            &ldquo;Everything is thoughtfully done — from how the fabric feels
            on your skin, to how the collar sits, to the neatness of every
            stitch.&rdquo;
          </p>
        </div>
      </section>
    </div>
  );
}

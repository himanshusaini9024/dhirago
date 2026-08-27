"use client";

import { Josefin_Sans,Cormorant_Garamond } from "next/font/google";
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
        <path
          d="M14 26C18 20 28 16 36 22C44 28 46 40 40 46"
          stroke="#1C1814"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M26 14C24 20 24 32 30 40C34 46 40 50 44 48"
          stroke="#1C1814"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
  },
  {
    label: "Fusing",
    path: (
      <>
        <path
          d="M12 22L32 14L52 22L32 30Z"
          stroke="#1C1814"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M12 32L32 24L52 32L32 40Z"
          stroke="#1C1814"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M12 42L32 34L52 42L32 50Z"
          stroke="#1C1814"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
  },
  {
    label: "Buttons",
    path: (
      <>
        <circle cx="32" cy="32" r="22" stroke="#1C1814" strokeWidth="1.2" />
        <circle
          cx="32"
          cy="32"
          r="16"
          stroke="#1C1814"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />
        <circle
          cx="26"
          cy="26"
          r="3"
          stroke="#1C1814"
          strokeWidth="1.2"
          fill="none"
        />
        <circle
          cx="38"
          cy="26"
          r="3"
          stroke="#1C1814"
          strokeWidth="1.2"
          fill="none"
        />
        <circle
          cx="26"
          cy="38"
          r="3"
          stroke="#1C1814"
          strokeWidth="1.2"
          fill="none"
        />
        <circle
          cx="38"
          cy="38"
          r="3"
          stroke="#1C1814"
          strokeWidth="1.2"
          fill="none"
        />
      </>
    ),
  },
  {
    label: "Stitching",
    path: (
      <>
        <line
          x1="14"
          y1="50"
          x2="46"
          y2="18"
          stroke="#1C1814"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M44 16L50 14L48 20Z"
          stroke="#1C1814"
          strokeWidth="1"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M22 42C28 36 18 24 28 18C38 12 44 24 36 30C28 36 34 46 42 44"
          stroke="#1C1814"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
  },
  {
    label: "Finishing",
    path: (
      <>
        <path
          d="M32 12C32 12 33 24 40 28C33 32 32 44 32 44C32 44 31 32 24 28C31 24 32 12 32 12Z"
          stroke="#1C1814"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M48 16C48 16 48.5 20 51 21.5C48.5 23 48 27 48 27C48 27 47.5 23 45 21.5C47.5 20 48 16 48 16Z"
          stroke="#1C1814"
          strokeWidth="1"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
  },
];
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});
const sectionPad = "px-5 sm:px-8 lg:px-16";
const container = `max-w-[1200px] mx-auto ${sectionPad}`;

const photos = [
  "https://images.dhirago.com/ecommerce/better-materail/dsc03796.jpg",
  "https://images.dhirago.com/ecommerce/better-materail/dsc06268.jpg",
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
    <div className="bg-white text-[#2a2a2a]">
      {/* HERO — taller on mobile + zoomed crop for proper framing */}

      <section className="w-full leading-none">
        <Image
          src={`https://images.dhirago.com/ecommerce/banner/dsc06401.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}
          alt="A young man wearing a handwoven muslin shirt by a lakeside"
          width={2000}
          height={800}
          priority
          sizes="100vw"
          className="block h-auto w-full object-contain object-center"
          quality={85}
        />
      </section>

      {/* INTRO */}
      <section className="py-14 md:py-28 px-5 sm:px-8 md:px-16 lg:px-24  max-w-[64rem] mx-auto">
        <h1
          className={`${josefin.className} uppercase leading-[1.90] text-center text-[clamp(11px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
        >
          True craftsmanship starts with the material
        </h1>
        <p className="font-futura text-center font-light leading-[1.75] text-[clamp(12px,1.3vw,1.07rem)] leading-[1.85] text-[#444444] tracking-[0.03em]">
          Every garment begins with a story. The materials we choose become its
          foundation, shaping its character, comfort, and longevity. We are
          deliberate about every fabric—where it comes from, how it is produced,
          and the hands involved in its making—ensuring each piece is crafted
          with care for both the wearer and the world it belongs to. A fine material is not only defined by how it begins, but by how beautifully it continues.
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
                  quality={75}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIAL STORY */}
      <section className="pt-10 lg:pt-20 pb-16 lg:pb-24 px-5">
        <div className="max-w-[79rem]  mx-auto mt-1 md:mt-4 text-center">
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444] tracking-[0.03em] mb-3">
            Before craftsmanship, before detail, and before form, there is cloth. Long before a silhouette takes place, it is the material that determines how a garment will feel, move, breathe, and eventually age. We are drawn to fabrics with an inherent richness—materials valued across generations for their quality, resilience, and ability to become more soften with time.
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444] tracking-[0.03em] mb-3">
            From fine European linen and indigenous Kala cotton to organic cottons. Each is chosen for what makes it distinct: its natural texture, breathability, tactile quality, enduring strength, and the story held within its making. Rooted in textile traditions that have been valued across generations, these materials are not chosen simply for how they appear when new, but for how they soften, settle, and develop character through time.
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444] tracking-[0.03em] mb-3">
            Linen is among the world's oldest known textile fibres, valued for centuries for its strength, breathability, and distinctive natural texture. Our fine European linen is made from flax and selected for its lightness, refined hand-feel, effortless drape, and enduring quality. What makes linen particularly beautiful is the way it lives: initially crisp, it gradually softens with wear while developing gentle creases and a character unique to its wearer. Rather than losing its beauty with age, linen becomes more personal with time—an expression of everything we value in a material. 
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444] tracking-[0.03em] ">
            Indigenous to Kutch, Kala cotton is a hardy, rain-fed fibre with generations of cultivation and weaving tradition behind it. Naturally breathable and resilient, its distinctive texture and subtle irregularities preserve the character of the handwoven cloth. Alongside carefully selected organic cottons, these fibres offer softness, comfort, and an enduring character that becomes more personal with wear.
          </p>
        </div>
      </section>

      {/* CENTERED VIDEO — not full width */}
      <section className={pad}>
        <div className="relative mx-auto w-full max-w-[980px] aspect-video ">
          {/* <video
            src="/videos/udaipur1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          /> */}

          <Image
            src={
              `https://images.dhirago.com/ecommerce/better-materail/craft.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`
            }
            alt={`Material detail`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 25vw"
            quality={85}
          />
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
          <h3
            className={`${josefin.className} text-center uppercase leading-[1.90] text-[clamp(11px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
          >
            The Hallmarks of a great garment
          </h3>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444] tracking-[0.03em] mb-3">
            Every inch of a DHIRAGO piece reflects a considered approach to craftsmanship, where precision and attention to detail are never compromised. It can be felt in the quality of the fabric against the skin, seen in the way a collar holds its form, and discovered in the neatness of every stitch. From proportion and construction to the smallest finishing details, each element is thoughtfully considered to create a garment that feels refined from the inside out.
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444] tracking-[0.03em]">
            Our garments are constructed with longevity in mind. Additional layers of fabric are carefully incorporated into areas that experience greater wear, including the placket, cuffs, and collars, providing added strength and structure. This considered construction not only enhances durability but also helps the garment retain its shape and refined finish through repeated wear.
          </p>
          <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444] tracking-[0.03em]">
            Often, it is these quieter details—the ones that may not be noticed at first glance—that define the quality of a well-made garment and allow it to remain with you for years to come.
          </p>
        </div>

        {/* ── Five Elements of Craft ── */}
        <div className="mt-14 md:mt-20 py-4 md:py-16 px-4 sm:px-8 md:px-16 lg:px-20 bg-white border-y border-[#C4A882]/15">
          <div className="max-w-[1160px] mx-auto">
            <span
              className={`block text-center uppercase leading-[1.90] text-[13px] text-[#333333] tracking-[0.03em] mb-4 font-medium text-stone-900 mb-4 md:mb-12 ${josefin.className}`}
            >
              The Five Elements of Craft
            </span>
            <br />
            <div className="grid  grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-2 items-start">
              {elements.map((el, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 md:gap-6"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 64 64"
                    fill="none"
                    className="sm:w-20 sm:h-20"
                  >
                    {el.path}
                  </svg>
                  <span className="text-[13px]  tracking-[0.1em] sm:tracking-[0.45em] uppercase text-[#1C1814] font-normal text-center">
                    {el.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>




              <section className="w-full ">
                    <div className="mx-auto flex w-full max-w-[1800px] items-center justify-center px-2 sm:px-5 md:px-8 lg:px-10">
                      <div className="relative mx-auto w-full overflow-hidden bg-white min-h-[72svh] sm:min-h-0 sm:aspect-[1500/1042]">
                        <Image
                src={`https://images.dhirago.com/ecommerce/banner/pi1.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}
            
                          // src={`https://images.dhirago.com/ecommerce/banner/embor.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}2`}
                          alt="Hand-embroidered Dhirago garments photographed in daylight"
                          fill
                          sizes="100vw"
                          className="object-cover object-center sm:object-contain"
                          quality={90}
                        />
                      </div>
                    </div>
                  </section>

      {/* QUOTE */}
     <section className="py-12 sm:py-14 lg:py-16 border-t border-b border-[#e8e4de]">
        <div className={`${container} text-center`}>
          <p
            className={`${cormorant.className} italic text-[clamp(18px,2.4vw,26px)] leading-[1.55] text-[#444] max-w-[720px] mx-auto`}
          >
            &quot;Everything is thoughtfully done — from how the fabric feels on your skin, to how the collar sits, to the neatness of every stitch&quot;
          </p>
        </div>
      </section>
    </div>
  );
}

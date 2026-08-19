"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Josefin_Sans, Cormorant_Garamond } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const sectionPad = "px-5 sm:px-8 lg:px-16";
const container = `max-w-[1200px] mx-auto ${sectionPad}`;
/* Same scroll reveal as About — fade + rise when section enters view */
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

const FONT = josefin.className;

export default function OurKissaPage() {
  return (
    <div className={`bg-white min-h-screen text-[#2a2a2a] ${FONT}`}>
      {/* HERO */}
      {/* <section className="relative w-full h-[60vh] sm:h-[75vh] md:h-[85vh] lg:h-screen overflow-hidden">
        <Image
          src="https://images.dhirago.com/ecommerce/banner/dsc06358.jpg?v=1"
          alt="A young man wearing a handwoven muslin shirt by a lakeside"
          fill
          priority
          sizes="100vw"
          className="object-cover transition-all duration-700"
          unoptimized
        />
      </section> */}

      <section className="w-full leading-none ">
        <Image
          src={`https://images.dhirago.com/ecommerce/banner/dsc06358.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}
          alt="A young man wearing a handwoven muslin shirt by a lakeside"
          width={2000}
          height={800}
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />
      </section>

      <section className="pt-4 pb-1 sm:pt-5 sm:pb-1 md:pt-4 md:pb-0 px-5 sm:px-8 md:px-16 lg:p-20 max-w-[75rem] mx-auto lg:relative lg:top-[4rem] ">
        <Reveal>
          <p className="font-futura font-light text-center leading-[1.85] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444]">
            A wall gathers colour slowly with time. Stone softens at the edges, pigments fade into unexpected shades, and sunlight leaves its quiet traces across the surface. Seasons pass, hands touch, and generations leave behind marks that no one could have planned or recreated. What may once have seemed like wear gradually becomes part of its character. The surface no longer holds the perfection of something new; instead, it carries the beauty of everything it has lived through. Perhaps that is what makes old things so compelling—they do not remain untouched, they become entirely their own. 
          </p>
        </Reveal>
      </section>

      {/* Single large editorial image — crop top white margin from sus.png */}
      <section className="w-full py-0 -mt-1 sm:mt-0 ">
        <div className="mx-auto w-full max-w-[1700px] px-2 sm:px-5 md:px-8 lg:px-10">
          <Reveal>
            <div className="relative w-full overflow-hidden bg-white aspect-[1500/1042] leading-none">
              <Image
                src={`https://images.dhirago.com/ecommerce/banner/sus.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}

                alt="Sustainability editorial"
                fill
                sizes="100vw"
                className="object-contain object-center md:object-cover md:object-[center_80%] md:scale-[1]"
                quality={90}
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pt-3 pb-6 sm:pt-4 sm:pb-8 md:pt-5 md:pb-10 px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-[51rem] mx-auto">
          <Reveal>
            <p className="font-futura font-light leading-[1.9] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444] tracking-[0.03em] mb-3">
              In much the same way, we believe a garment should not be defined only by how it looks when it is new, but by how beautifully it continues to live. Natural fibres are chosen for the way they soften, settle, and develop character through wear, while relaxed silhouettes and considered construction allow each piece to remain relevant beyond a season. The intention is not to preserve a garment exactly as it began, but to create something with the quality to evolve&apos;
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="font-futura font-light leading-[1.9] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444] tracking-[0.03em] mb-3">
              This thinking extends to the way each piece is made. Rather than following the pace of mainstream production, DHIRAGO works in considered quantities, allowing greater attention to the material, handwork, construction, and finishing of every garment. Fabrics are used thoughtfully, remaining materials are repurposed wherever possible, and skilled hands remain an integral part of the making process.
            </p>
          </Reveal>
          <p className="font-futura font-light leading-[1.9] text-[clamp(12px,1.3vw,1.07rem)]  text-[#444444] tracking-[0.03em]">
            For us, endurance is not simply measured by how long something lasts. It is found in the desire to keep it—to wear it often, return to it over the years, and allow it to gather a character that could belong to no one else.
          </p>
        </div>
      </section>


         <section className="py-12 sm:py-14 lg:py-16 border-t border-b border-[#e8e4de]">
        <div className={`${container} text-center`}>
          <p
            className={`${cormorant.className} italic text-[clamp(18px,2.4vw,26px)] leading-[1.55] text-[#444] max-w-[720px] mx-auto`}
          >
            &quot;Timeless is not what remains unchanged, but what continues to hold meaning as it changes.&quot;
          </p>
        </div>
      </section>

      

      {/* SUSTAINABILITY BAND */}
     

         <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center">
          <div
            className="absolute inset-0 scale-[1.03] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/DSC06480.jpg')" }}
          />

          <div className=" inset-0 bg-gradient-to-b from-[rgba(8,12,18,0.45)] to-[rgba(8,12,18,0.6)]" />

          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[length:28px_28px] sm:bg-[length:36px_36px] lg:bg-[length:42px_42px]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
            }}
          />

      
        </section>
    </div>
  );
}

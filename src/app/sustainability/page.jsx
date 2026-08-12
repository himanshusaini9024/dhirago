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

      <section className="w-full leading-none">
        <Image
          src={`https://images.dhirago.com/ecommerce/banner/dsc06358.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}
          alt="A young man wearing a handwoven muslin shirt by a lakeside"
          width={2000}
          height={800}
          priority
          sizes="100vw"
          className="block h-auto w-full object-cover object-center"
        />
      </section>

      <section className="pt-4 pb-1 sm:pt-5 sm:pb-1 md:pt-10 md:pb-2 px-5 sm:px-8 md:px-16 lg:px-24 max-w-[75rem] mx-auto">
        <Reveal>
          <p className="font-futura font-light text-center leading-[1.85] text-[clamp(13px,1.3vw,1.07rem)] text-[#444444]">
            We believe the finest garments are those that become more themselves
            with time. The moment you put on a garment, there is a shift from
            being an individual to becoming an interconnected member of society -
            cloth connects our bodies & minds to a team of makers who brings each
            piece to life. The materiality of the garment connects us to the
            environment & where we stand in relationship to it.
          </p>
        </Reveal>
      </section>

      {/* Single large editorial image — crop top white margin from sus.png */}
      <section className="w-full py-0 -mt-1 sm:mt-0">
        <div className="mx-auto w-full max-w-[1700px] px-2 sm:px-5 md:px-8 lg:px-10">
          <Reveal>
            <div className="relative w-full overflow-hidden bg-white aspect-[1500/1189] leading-none">
              <Image
                src={`https://images.dhirago.com/ecommerce/banner/sus.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}

                alt="Sustainability editorial"
                fill
                sizes="100vw"
                className="object-cover object-[center_78%] scale-[1.22] sm:scale-[1.16] md:scale-[1.12]"
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
            <p className="font-futura font-light leading-[1.9] text-[clamp(13px,1.3vw,1.07rem)] text-[#444444] tracking-[0.03em] mb-3">
              At DHIRAGO, endurance begins long before a garment is worn. It
              begins with thoughtful choices—natural fibres selected for their
              lasting character and a commitment to making only what deserves
              to remain. The looks developed are safe for the skin and
              transitions seamlessly between cultures from day to evening wear.
              Relaxed silhouettes created with a sartorial touch that echo the
              brand&apos;s philosophy &apos;the beauty of time&apos;
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="font-futura font-light leading-[1.9] text-[clamp(13px,1.3vw,1.07rem)] text-[#444444] tracking-[0.03em]">
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
          </Reveal>
        </div>
      </section>


         <section className="py-12 sm:py-14 lg:py-16 border-t border-b border-[#e8e4de]">
        <div className={`${container} text-center`}>
          <p
            className={`${cormorant.className} italic text-[clamp(18px,2.4vw,26px)] leading-[1.55] text-[#444] max-w-[720px] mx-auto`}
          >
            &quot;Sustainability is not a feature —
            it is the quiet discipline behind every decision we make.&quot;
          </p>
        </div>
      </section>

      

      {/* SUSTAINABILITY BAND */}
     

         <section className="relative min-h-[70vh] sm:min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 scale-[1.03] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/DSC06480.jpg')" }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,12,18,0.45)] to-[rgba(8,12,18,0.6)]" />

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

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
  weight: ["700", "700"],
  style: ["normal", "italic"],
});

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
          src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06358.jpg?v=1"
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
          src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06358.jpg?v=1"
          alt="A young man wearing a handwoven muslin shirt by a lakeside"
          width={2000}
          height={800}
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-center transition-all duration-700"
          unoptimized
        />
  </section>

      <section className="py-10 sm:py-14 md:py-20 px-5 sm:px-8 md:px-16 lg:px-24 max-w-[75rem] mx-auto">
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

      {/* IMAGE COLLAGE — full-width Dulari layout */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-8 sm:py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1500px]">
          {/* Mobile */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="flex gap-3">
              <Reveal className="w-1/2">
                <div className="relative w-full aspect-[3/4] overflow-hidden border border-black">
                  <Image
                    src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06360.jpg"
                    alt="Natural wood grain texture"
                    fill
                    sizes="50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </Reveal>
              <Reveal delay={100} className="w-1/2">
                <div className="relative w-full aspect-[3/4] overflow-hidden border border-black">
                  <Image
                    src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06355.jpg"
                    alt="White flower growing through a crack in stone"
                    fill
                    sizes="50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <div className="relative w-full aspect-[3/4] overflow-hidden border border-black">
                <Image
                  src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06299.jpg"
                  alt="Hands holding red berry branches"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p
                className={`${cormorant.className}  max-w-[3rem] text-[clamp(18px,4vw,22px)] leading-[1.45] text-[#1a1a1a] pt-1`}
              >
                We wandered to choose what is traditionally beautiful, but to
                notice what lingered. Forms without names. Colours without
                hierarchy.
              </p>
            </Reveal>
          </div>

          {/* Desktop: left = 2 images + caption | right = tall image full height */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-4 lg:gap-[18px] items-stretch">
            <div className="col-span-2 flex flex-col gap-4 lg:gap-[18px]">
              <div className="grid grid-cols-2 gap-4 lg:gap-[18px]">
                <Reveal>
                  <div className="relative w-full aspect-[3/4] overflow-hidden border border-black">
                    <Image
                      src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06360.jpg"
                      alt="Natural wood grain texture"
                      fill
                      sizes="(max-width: 1280px) 30vw, 420px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </Reveal>
                <Reveal delay={100}>
                  <div className="relative w-full aspect-[3/4] overflow-hidden border border-black">
                    <Image
                      src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06355.jpg"
                      alt="White flower growing through a crack in stone"
                      fill
                      sizes="(max-width: 1280px) 30vw, 420px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </Reveal>
              </div>

              <Reveal delay={150} className="mt-auto pt-1 lg:pt-16   max-w-[31rem]">
                <p
                  className={`${cormorant.className} relative left-[15em]  text-[clamp(20px,2.15vw,22px)] font-normal leading-[1.3] text-[#1a1a1a]`}
                >
                  We wandered to choose what is traditionally beautiful, but to
                  notice what lingered. Forms without names. Colours without
                  hierarchy.
                </p>
              </Reveal>
            </div>

            <Reveal delay={200} className="h-full">
              <div className="relative w-full h-full min-h-[480px] overflow-hidden border border-black">
                <Image
                  src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/banner/dsc06299.jpg"
                  alt="Hands holding red berry branches"
                  fill
                  sizes="(max-width: 1280px) 32vw, 460px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 md:py-20 px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-[51rem] mx-auto mt-4 sm:mt-8 md:mt-16">
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

      {/* SUSTAINABILITY BAND */}
      <section className="relative overflow-hidden flex items-center min-h-[260px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[500px]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')] bg-cover bg-center bg-scroll lg:bg-fixed" />
        <div className="absolute inset-0 [background:linear-gradient(135deg,rgba(22,37,24,0.92)_0%,rgba(22,37,24,0.75)_40%,rgba(22,37,24,0.55)_70%,rgba(22,37,24,0.8)_100%)]" />
        <div className="relative z-[2] max-w-[1200px] mx-auto w-full px-6 py-10 sm:px-10 sm:py-14 md:px-20 md:py-16 lg:px-24 lg:py-20">
          <Reveal>
            <p className="font-futura font-light leading-[1.9] text-[clamp(14px,1.3vw,1.07rem)] text-white tracking-[0.03em] max-w-full text-center">
              &quot;Sustainability is not a feature — it is the quiet discipline
              behind every decision we make.&quot;
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const IMGURL = process.env.NEXT_PUBLIC_IMG_URL;

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
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const Categorybaner = ({ catbanner, catbannerMobile, slug }) => {
  const desktopBanner = catbanner || "/images/fallback-banner.jpg";
  const mobileBanner =
    catbannerMobile || catbanner || "/images/fallback-banner-mobile.jpg";

  return (
    <section className="relative flex min-h-[clamp(225px,50vw,100vh)] items-center overflow-hidden">
      <Image
        src={`${IMGURL}${mobileBanner}`}
        alt={slug ? `${slug.replace(/-/g, " ")} banner` : "Category banner"}
        fill
        priority
        sizes="100vw"
        quality={75}
        className="object-center object-cover block md:hidden"
      />

      <Image
        src={`${IMGURL}${desktopBanner}`}
        alt={slug ? `${slug.replace(/-/g, " ")} banner` : "Category banner"}
        fill
        priority
        sizes="100vw"
        quality={75}
        className="object-cover object-center hidden md:block"
      />

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-[clamp(1.5rem,5vw,5rem)]">
        <Reveal className="flex flex-col items-center text-center">
          <div className="mb-6 h-px w-12 bg-[var(--green-light)]" />
          <h1 className="max-w-full text-[clamp(25px,2.8vw,32px)] font-medium uppercase tracking-[0.23em] text-[#F0EBE0]  leading-[1.55]">
            {slug?.replace(/-/g, " ")}
          </h1>
        </Reveal>
      </div>
    </section>
  );
};

export default Categorybaner;
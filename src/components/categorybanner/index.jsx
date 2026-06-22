"use client";
import { useEffect, useRef, useState } from "react";

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
      // `delay` is a per-instance runtime number, so it can't be baked into a static
      // Tailwind class name — this is the one unavoidable inline style in this file.
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const Categorybaner = ({ catbanner, slug }) => {
  const banner = catbanner || "/images/fallback-banner.jpg";
  console.log('banner',banner)
  return (
    <section className="relative flex min-h-[clamp(300px,50vw,100vh)] items-center overflow-hidden">
      {/* Background image layer — the URL is data-driven (per category), so it can't
          be expressed as a static Tailwind class; kept as the one unavoidable inline
          style here. */}
      <div
        style={{ backgroundImage: `url(${banner})` }}
        // style={{ backgroundImage: `url(https://11-11.in/cdn/shop/collections/SHIRT.webp?v=1770982613&width=2000)` }}    
        className="absolute inset-0 bg-fixed bg-cover bg-center "
      />

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-[clamp(1.5rem,5vw,5rem)] ">
        <Reveal className="flex flex-col items-center text-center">
          <div className="mb-6 h-px w-12 bg-[var(--green-light)]" />
          <h2 className="max-w-full text-[clamp(18px,2.8vw,32px)] font-normal  uppercase tracking-[0.33em] text-[#F0EBE0] [font-family:var(--font)] leading-[1.55]">
            {slug?.replace(/-/g, " ")}
          </h2>
        </Reveal>
      </div>
    </section>
  );
};

export default Categorybaner;
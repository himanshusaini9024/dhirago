"use client";


import Image from "next/image";
import Link from "next/link";
import BotanicalArt from "./BotanicalArt";
import { useEffect, useRef, useState } from "react";

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

export default function EditorialBanner({ src, alt, href, position = "object-center" ,delay = 0}) {
  return (
       <Reveal delay={delay}>


    <section className="relative px-0 pt-10 md:px-1 md:pt-16">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden sm:aspect-[16/10] md:aspect-[16/8]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          quality={78}
          className={`object-cover ${position}`}
        />
      </Link>

      {/* <BotanicalArt className="pointer-events-none absolute -top-2 left-0 h-[55%] w-auto text-[#1a1a1a] md:-top-6 md:left-2 md:h-[95%]" />
      <BotanicalArt flip className="pointer-events-none absolute -top-2 right-0 h-[55%] w-auto text-[#1a1a1a] md:-top-6 md:right-2 md:h-[95%]" /> */}
    </section>
    </Reveal>

  );
}

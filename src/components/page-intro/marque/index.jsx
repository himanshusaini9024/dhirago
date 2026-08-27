"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

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
      { threshold: 0.1 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      style={{
        padding: "clamp(4rem, 14vw, 9rem) 0",
        background: "#ffffff",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1090,
          margin: "0 auto",
          padding: "clamp(1.5rem, 5vw, 3.5rem) clamp(1.1rem, 4vw, 2rem)",
        }}
      >
        <Reveal>
          <h2 className="sr-only">
            Collectible menswear made to be remembered
          </h2>
          <p
            className={`font-normal lg:text-justify  text-[clamp(0.7rem,1.35vw,1rem)] leading-[1.90] font-futura`}
            style={{ color: "#555555" }}
          >
            &ldquo;The offering begins with a simple instinct—to make something
            worth remembering. Each piece is conceived as an object to collect
            and keep, quietly becoming part of a life.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}

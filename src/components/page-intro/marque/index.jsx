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
        { threshold: 0.1 }
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
              <p
                className="font-futura lg:text-justify"
                style={{
              fontSize: "clamp(15px, 1.3vw, 19px)",

                  fontWeight: 100,

                  color: "#111111",
                  lineHeight: 1.5,
                  marginBottom: "1rem",
                }}
              >
                "Everything is thoughtfully done — from how the fabric feels on
                your skin, to how the collar sits,to the neatness of every
                stitch."
              </p>

            </Reveal>
          </div>
        </section>
  );
}
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
            padding: "clamp(4rem, 8vw, 7rem) 0",
            background: "#ffffff",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: "0 clamp(1.5rem, 4vw, 3rem)",
            }}
          >
            <Reveal>
              <p
                className="font-futura"
                style={{
              fontSize: "clamp(11px, 1.3vw, 19px)",

                  fontWeight: 300,
                  textAlign:"justify",
                  color: "#1C1814",
                  lineHeight: 1.5,
                  marginBottom: "2rem",
                }}
              >
                "Everything is thoughtfully done — from how the fabric feels on
                your skin, to how the collar sits, <br />to the neatness of every
                stitch."
              </p>

              <div
                style={{
                  width: 1,
                  height: 60,
                  background:
                    "linear-gradient(to bottom, #C4A882, transparent)",
                  margin: "0 auto",
                }}
              />
            </Reveal>
          </div>
        </section>
  );
}
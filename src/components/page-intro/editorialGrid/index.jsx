"use client";
import { useEffect, useState, useRef } from "react";

const IMAGES = [
  "/images/bg2.avif",
  "/images/bg3.avif",
];

export default function RunwayHero() {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);

  // ⏱ Slow cinematic autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % IMAGES.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // 👁 Scroll activation (luxury reveal)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 🖱 Ultra subtle parallax
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;

      el.style.setProperty("--px", `${x}px`);
      el.style.setProperty("--py", `${y}px`);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section ref={containerRef} className={`runway ${active ? "active" : ""}`}>
      
      {/* Background layers */}
      {IMAGES.map((img, i) => (
        <div
          key={i}
          className={`bg ${i === index ? "show" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Soft wash */}
      <div className="overlay" />

      {/* Grain */}
      <div className="grain" />

      {/* Light sweep */}
      <div className="light" />

      {/* Content */}
      <div className="content">
        <p>
          <strong>DHIRAGO</strong> is a premium menswear luxury brand—a menswear
          practice built from the logic of a lake city, with one core idea:
          calmness made wearable.
          <br /><br />
          Rooted in Udaipur’s lake-light and stone stillness, our design
          language follows water’s logic: hold, reflect, and move without noise.
          Marble courtyards, jharokha shadows, and the softened edge of evening
          water inform a minimal palette and silhouettes that feel composed
          rather than decorated.
        </p>
      </div>

      <style jsx>{`
        .runway {
          position: relative;
          height: 95vh;
          overflow: hidden;
          --px: 0px;
          --py: 0px;
        }

        /* Background */
        .bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.08) translate(var(--px), var(--py));
          transition: opacity 4s ease;
        }

        .bg.show {
          opacity: 1;
          animation: zoom 14s ease forwards;
        }

        /* Cinematic zoom */
        @keyframes zoom {
          from { transform: scale(1.08) translate(var(--px), var(--py)); }
          to { transform: scale(1.15) translate(var(--px), var(--py)); }
        }

        /* Soft overlay */
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(245,240,232,0.38);
          backdrop-filter: blur(1.2px);
        }

        

        /* Grain */
        .grain {
          position: absolute;
          inset: 0;
          background: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.05;
          pointer-events: none;
        }

        /* Light sweep */
        .light {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 40%,
            rgba(255,255,255,0.15),
            transparent 60%
          );
          animation: sweep 12s linear infinite;
          opacity: 0.4;
        }

        @keyframes sweep {
          from { transform: translateX(-120%); }
          to { transform: translateX(120%); }
        }

        /* Content */
        .content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 100px;
        }

        .content p {
          max-width: 540px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(16px, 1.3vw, 20px);
          line-height: 1.9;
          color: #1a1714;
          letter-spacing: 0.03em;
        }

        .content strong {
          font-weight: 600;
        }

        /* Scroll reveal */
        .runway .content {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1.6s ease;
        }

        .runway.active .content {
          opacity: 1;
          transform: translateY(0);
        }

        /* Mobile */
        @media (max-width: 900px) {
          .content {
            justify-content: center;
            padding: 40px 20px;
          }
        }
      `}</style>
    </section>
  );
}
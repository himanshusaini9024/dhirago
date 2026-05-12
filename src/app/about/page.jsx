"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
// ─── REVEAL COMPONENT ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // if (entry.isIntersecting) setVisible(true);
        setVisible(entry.isIntersecting);

      },
      { threshold: 0.12 },
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
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── HERON SVG ───────────────────────────────────────────────────────────────
function HeronSVG() {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 160, height: 160 }}
    >
      <g opacity="0.85">
        <ellipse
          cx="80"
          cy="88"
          rx="22"
          ry="30"
          stroke="#6B5B4E"
          strokeWidth="1.2"
        />
        <path
          d="M80 58 Q72 42 68 28 Q66 20 72 16 Q78 12 80 20 Q82 28 80 38 Q78 48 80 58"
          stroke="#6B5B4E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <ellipse
          cx="74"
          cy="14"
          rx="7"
          ry="5"
          stroke="#6B5B4E"
          strokeWidth="1.2"
        />
        <line
          x1="80"
          y1="13"
          x2="96"
          y2="11"
          stroke="#6B5B4E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="76" cy="13" r="1.2" fill="#6B5B4E" />
        <path
          d="M70 10 Q66 4 60 2"
          stroke="#C4A882"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M70 10 Q65 6 58 6"
          stroke="#C4A882"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M62 80 Q42 72 34 88 Q40 96 62 94"
          stroke="#6B5B4E"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M96 82 Q108 76 112 86 Q108 94 96 96"
          stroke="#6B5B4E"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="72"
          y1="116"
          x2="68"
          y2="145"
          stroke="#6B5B4E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <line
          x1="88"
          y1="116"
          x2="92"
          y2="145"
          stroke="#6B5B4E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M68 145 Q60 148 56 148 M68 145 Q66 152 64 152 M68 145 Q72 150 70 153"
          stroke="#6B5B4E"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M92 145 Q100 148 104 148 M92 145 Q94 152 96 152 M92 145 Q88 150 90 153"
          stroke="#6B5B4E"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M30 148 Q80 144 130 148"
          stroke="#C4A882"
          strokeWidth="0.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M38 152 Q80 149 122 152"
          stroke="#C4A882"
          strokeWidth="0.3"
          strokeLinecap="round"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}

// ─── CRAFT CARD ───────────────────────────────────────────────────────────────
function CraftCard({ num, name, desc, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "#EDE6D9" : "#F5F0E8",
          padding: "clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2.5rem)",
          transition: "background 0.4s",
          height: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3.5rem",
            fontWeight: 300,
            color: "#E8E0D0",
            lineHeight: 1,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          {num}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.3rem",
            fontWeight: 400,
            color: "#1C1814",
            marginBottom: "1rem",
            letterSpacing: "0.02em",
          }}
        >
          {name}
        </div>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "13px",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "#6B5B4E",
            margin: 0,
          }}
        >
          {desc}
        </p>
      </div>
    </Reveal>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
// Deep navy / midnight blue palette for all dark sections
// Primary: #0F1C2E  Mid: #152338  Accent navy: #1A2D45
const S = {
  eyebrow: {
    fontFamily: "'Jost', sans-serif",
    fontSize: 9,
    letterSpacing: "0.5em",
    textTransform: "uppercase",
    color: "#A8937E",
    marginBottom: "1.5rem",
  },
  eyebrowLight: {
    fontFamily: "'Jost', sans-serif",
    fontSize: 9,
    letterSpacing: "0.5em",
    textTransform: "uppercase",
    color: "#C4A882",
    marginBottom: "2rem",
  },
  rule: { width: 40, height: 1, background: "#C4A882", marginBottom: "2rem" },
  bodyDark: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "clamp(13px, 1.5vw, 15px)",
    fontWeight: 300,
    lineHeight: 1.95,
    color: "#3D3530",
    marginBottom: "1.5rem",
  },
  bodyLight: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "clamp(13px, 1.5vw, 15px)",
    fontWeight: 300,
    lineHeight: 2,
    color: "rgba(245,240,232,0.65)",
    marginBottom: "1.5rem",
  },
  sectionInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 clamp(1.25rem, 4vw, 3rem)",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
    gap: "clamp(2.5rem, 6vw, 6rem)",
    alignItems: "center",
  },
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.9; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .hero-content > * {
          animation: fadeIn 1.2s ease forwards;
        }
        .hero-content > *:nth-child(1) { animation-delay: 0.2s; opacity: 0; }
        .hero-content > *:nth-child(2) { animation-delay: 0.5s; opacity: 0; }
        .hero-content > *:nth-child(3) { animation-delay: 0.8s; opacity: 0; }

        /* Noise texture overlay for depth */
        .noise-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .gold-rule-animate {
          background: linear-gradient(90deg, transparent, #C4A882, #E8D5B0, #C4A882, transparent);
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <div
        style={{ background: "#F5F0E8", color: "#3D3530", overflowX: "hidden" }}
      >
        {/* ══════════ HERO ══════════ */}
        {/* Deep midnight navy — celestial, premium */}
        <section
          className="noise-overlay"
          style={{
            position: "relative",
            height: "100vh",
            minHeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "#0F1C2E",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <video
              src="/videos/banner.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            
          </div>

          {/* Deep navy-tinted overlay */}
          <div style={{ position: "absolute", inset: 0 }} />

          {/* Subtle vignette ring */}
          <div style={{ position: "absolute", inset: 0 }} />

          {/* Play button */}

          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              color: "rgba(245,240,232,0.35)",
              fontFamily: "'Jost', sans-serif",
              fontSize: 9,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 1,
                height: 50,
                background: "linear-gradient(to bottom, #C4A882, transparent)",
                animation: "scrollPulse 2s ease-in-out infinite",
              }}
            />
            scroll
          </div>
        </section>
        {/* ══════════ THE NAME ══════════ */}
        {/* ══ THE NAME — Centred heading, content below ══ */}
        <section
          style={{
            padding: "clamp(5rem, 11vw, 9rem) 0",
            background: "#FAFAF7",
          }}
        >
          <div
            style={{
              maxWidth: 980,
              margin: "0 auto",
              padding: "0 clamp(1.5rem, 5vw, 3rem)",
              textAlign: "center",
            }}
          >
            {/* Eyebrow */}
            <Reveal>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.9rem",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.48em",
                  textTransform: "uppercase",
                  color: "#9A8C7E",
                  marginBottom: "2.5rem",
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: "1px",
                    background: "#B8975A",
                    display: "block",
                  }}
                />
                Our Name
                <span
                  style={{
                    width: 24,
                    height: "1px",
                    background: "#B8975A",
                    display: "block",
                  }}
                />
              </span>
            </Reveal>

            {/* Single heading — no nowrap, scales cleanly */}
            <Reveal delay={100}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.3rem, 2.2vw, 3.6rem)",
                  lineHeight: 1.2,
                  letterSpacing: "0.01em",
                  color: "#1A1714",
                  marginBottom: "3rem",
                }}
              >
                A Label woven in stillness,{" "}
                <em style={{ fontStyle: "italic", color: "#B8975A" }}>
                  defined by craftsmanship
                </em>
              </h2>
            </Reveal>

            {/* Thin gold rule */}
            <Reveal delay={200}>
              <div
                style={{
                  width: 56,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, #B8975A, transparent)",
                  margin: "0 auto 3rem",
                }}
              />
            </Reveal>

            {/* Body paragraphs */}
            <Reveal delay={280}>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(0.88rem, 1.2vw, 1.5rem)",
                  lineHeight: 2.0,
                  color: "#4A4239",
                  marginBottom: "1.5rem",
                }}
              >
                Dhirago originates from a narrative that simplicity holds depth
                and life is meant to be felt, not rushed. The name is inspired
                by <em style={{ fontStyle: "italic" }}>Dheera</em> — a state of
                calm and composure, reflecting a mindset that values quiet
                clarity over constant distraction.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  // fontSize: "clamp(0.88rem, 1.4vw, 2rem)",
                  fontSize: "clamp(0.88rem, 1.2vw, 1.5rem)",


                  // fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
                  lineHeight: 2.0,
                  color: "#4A4239",
                  marginBottom: "1.5rem",
                }}
              >
                At its core, we believe simplicity is not just a design choice,
                but a way of thinking. Minimal and responsibly crafted, each
                piece carries a quiet sense of stillness. In a world that moves
                quickly, Dhirago offers a sense of ease — inviting you to slow
                down and experience things more thoughtfully.
              </p>
            </Reveal>
            <Reveal delay={440}>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  // fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
                  // fontSize: "clamp(0.88rem, 1.4vw, 2rem)",
                  fontSize: "clamp(0.88rem, 1.2vw, 1.5rem)",

                  lineHeight: 2.0,
                  color: "#4A4239",
                  marginBottom: 0,
                }}
              >
                As a conscious luxury label, each piece is shaped with time,
                patience, and care. We work with 60-count European linen and
                organically sourced fibres, valued for their breathability,
                texture, and the way they soften and evolve over time.
              </p>
            </Reveal>
          </div>
        </section>

     <section
  style={{
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  }}
>
  {/* ── Full-bleed background video ── */}
  <video
    src="/videos/udaipur1.mp4"
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
    }}
  />

  {/* ── Overlay: dark gradient so text reads cleanly ── */}
  <div style={{
    position: "absolute", inset: 0, zIndex: 1,
    background: "linear-gradient(to right, rgba(10,16,24,0.82) 0%, rgba(10,16,24,0.55) 55%, rgba(10,16,24,0.25) 100%)",
  }} />

  {/* ── Content ── */}
  <div style={{ ...S.sectionInner, position: "relative", zIndex: 2, padding: "clamp(5rem, 12vw, 10rem) clamp(1.25rem, 4vw, 3rem)" }}>

    {/* Eyebrow */}
    <Reveal>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <span style={{ display: "block", width: 32, height: "1px", background: "#B8975A", opacity: 0.7 }} />
        <p style={{
          fontFamily: "'Jost', sans-serif", fontSize: 9,
          letterSpacing: "0.52em", textTransform: "uppercase",
          color: "#B8975A", margin: 0,
        }}>
          Our Inspiration
        </p>
      </div>
    </Reveal>

    {/* Main heading */}
    <Reveal delay={100}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: "clamp(2.8rem, 5vw, 3.2rem)",
        
        color: "#F5F0E8",
        lineHeight: 1.08,
        letterSpacing: "0.01em",
        marginBottom: "clamp(2rem, 5vw, 3.5rem)",
        maxWidth: 720,
      }}>
        Udaipur —{" "}
        <em style={{ fontStyle: "italic", color: "#C4A882" }}>
          the city of still water
        </em>
      </h2>
    </Reveal>

    {/* Gold rule */}
    <Reveal delay={180}>
      <div style={{ width: 48, height: "1px", background: "#B8975A", marginBottom: "clamp(2rem, 4vw, 3rem)", opacity: 0.7 }} />
    </Reveal>

    {/* Two-col text layout */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
      gap: "clamp(2rem, 5vw, 5rem)",
      alignItems: "start",
      maxWidth: 860,
    }}>

      <Reveal delay={240}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 300,
          fontSize: "clamp(1.2rem, 2.6vw, 1.75rem)",
          color: "#F5F0E8", lineHeight: 1.6,
          letterSpacing: "0.02em", margin: 0,
          borderLeft: "1px solid rgba(196,168,130,0.4)",
          paddingLeft: "1.5rem",
        }}>
          "The lakes do not rush — they hold the sky, the light, the moment."
        </p>
      </Reveal>

      <div>
        <Reveal delay={320}>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300,
            // fontSize: "clamp(0.85rem, 1.3vw, 0.95rem)",
             fontSize: "clamp(1.3rem, 1.2vw, 1rem)",

            lineHeight: 1.7, color: "rgba(245,240,232,0.72)",
            marginBottom: "1.25rem",
          }}>
            Udaipur — a city built around water, where reflection softens
            everything into calm and completeness. Here, water was held and
            preserved over time, allowed to settle into its own stillness —
            where calm was not found, but gently formed through intention.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300,
            // fontSize: "clamp(0.85rem, 1.3vw, 0.95rem)",
             fontSize: "clamp(1.3rem, 1.2vw, 1rem)",

            lineHeight: 1.7, color: "rgba(245,240,232,0.72)",
            marginBottom: "2.5rem",
          }}>
            Dhirago draws from this belief — that when something is held with
            care and intention, it transforms into something lasting. Every
            piece we create carries this quiet inheritance from the still
            waters of Rajasthan.
          </p>
        </Reveal>
        <Reveal delay={460}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.75rem",
            fontFamily: "'Jost', sans-serif", fontSize: 9,
            letterSpacing: "0.45em", textTransform: "uppercase",
            color: "rgba(196,168,130,0.6)",
          }}>
            <span style={{ width: 24, height: "1px", background: "#B8975A", display: "block", opacity: 0.6 }} />
            Udaipur, Rajasthan
          </div>
        </Reveal>
      </div>

    </div>
  </div>
</section>

      <section
  style={{
    padding: "clamp(4rem, 10vw, 9rem) 0",
    background: "#F0EDE6",
  }}
>
  <div style={S.sectionInner}>

    {/* ── Centred eyebrow ── */}
    <Reveal>
      <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "1rem",
          fontFamily: "'Jost', sans-serif", fontSize: 9,
          letterSpacing: "0.5em", textTransform: "uppercase", color: "#A8937E",
        }}>
          <span style={{ width: 28, height: "1px", background: "#C4A882", display: "block" }} />
          Our Symbol
          <span style={{ width: 28, height: "1px", background: "#C4A882", display: "block" }} />
        </span>
      </div>
    </Reveal>

    {/* ── Two-col: image left, text right ── */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
      gap: "clamp(3rem, 7vw, 7rem)",
      alignItems: "center",
    }}>

      {/* LEFT — heron image */}
      <Reveal>
        <div style={{ position: "relative" }}>
          {/* Main heron photo */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <Image
              src="/images/heron.jpeg"
              alt="The Heron — symbol of Dhirago"
              width={600} height={750}
              style={{
                width: "100%",
                height: "clamp(400px, 55vw, 680px)",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            {/* Subtle warm tint overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(240,237,230,0.35) 0%, transparent 40%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Floating wordmark over image bottom */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              position: "absolute", bottom: "2rem", left: "50%",
              transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "0.55rem",
              background: "rgba(240,237,230,0.88)",
              backdropFilter: "blur(8px)",
              padding: "1rem 2rem",
            }}
          >
            <div style={{ width: 44, height: "1px", background: "linear-gradient(90deg, transparent, #C4A882, transparent)" }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              letterSpacing: "0.5em", paddingLeft: "0.5em",
              color: "#1A1714", textTransform: "uppercase", lineHeight: 1,
            }}>
              Dhirago
            </span>
            <span style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 300,
              fontSize: 8, letterSpacing: "0.38em", paddingLeft: "0.38em",
              textTransform: "uppercase", color: "#A8937E", lineHeight: 1,
            }}>
              Conscious Luxury · Est. 2026
            </span>
            <div style={{ width: 44, height: "1px", background: "linear-gradient(90deg, transparent, #C4A882, transparent)" }} />
          </motion.div>
        </div>
      </Reveal>

      {/* RIGHT — text */}
      <div>
        <Reveal delay={150}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            color: "#1A1714", lineHeight: 1.2,
            marginBottom: "0.5rem",
            letterSpacing: "0.01em",
          }}>
            The{" "}
            <em style={{ fontStyle: "italic", color: "#7A6448" }}>Heron</em>
          </h3>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
            color: "#6B5B4E", lineHeight: 1.3,
            marginBottom: "2.5rem",
            letterSpacing: "0.01em",
          }}>
            quiet balance, understated strength
          </h3>
        </Reveal>


        

        

        <Reveal delay={230}>
          <div style={{ width: 36, height: "1px", background: "#C4A882", marginBottom: "2rem" }} />
        </Reveal>

        <Reveal delay={310}>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300,
            fontSize: "clamp(0.88rem, 1.1vw, 1.2rem)",
            lineHeight: 2, color: "#4A4239", marginBottom: "1.4rem",
          }}>
            Our logo takes shape from the heron — a quiet symbol of balance,
            clarity, and understated strength. The heron is not just a symbol
            for us; it is a reflection of our philosophy — calm, deliberate,
            and enduring.
          </p>
        </Reveal>
        <Reveal delay={390}>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300,
            fontSize: "clamp(0.88rem, 1.1vw, 1.2rem)",

            lineHeight: 2, color: "#4A4239", marginBottom: "2.5rem",
          }}>
            Standing still at the water's edge, the heron does not chase. It
            waits with intention. This is how we approach our craft —
            patient, purposeful, and present.
          </p>
        </Reveal>

        {/* Pull quote */}
        <Reveal delay={460}>
          <blockquote style={{
            borderLeft: "2px solid #C4A882",
            paddingLeft: "1.5rem",
            margin: 0,
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              color: "#6B5B4E", lineHeight: 1.65,
              margin: 0, letterSpacing: "0.02em",
            }}>
              "It does not chase. It waits — and in waiting, it finds."
            </p>
          </blockquote>
        </Reveal>
      </div>

    </div>
  </div>
</section>


  {/* ══════════ CRAFTSMANSHIP ══════════ */}
        <section
          style={{
            padding: "clamp(4rem, 10vw, 9rem) 0",
            background: "#F5F0E8",
          }}
        >
          <div style={S.sectionInner}>
            <Reveal>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "2rem",
                  marginBottom: "clamp(3rem, 6vw, 5rem)",
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                    color: "#0F1C2E",
                    letterSpacing: "0.01em",
                  }}
                >
                  Craftsmanship
                </h2>
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "#A8937E",
                  }}
                >
                  Heritage Techniques
                </span>
              </div>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: 1,
                background: "#E8E0D0",
                border: "1px solid #E8E0D0",
              }}
            >
              <CraftCard
                num="01"
                name="Handloom Weaving"
                desc="Drawing from centuries-old tradition, each thread is laid with intention. The handloom preserves a rhythm that machines cannot replicate — a living breath within every cloth."
                delay={0}
              />
              <CraftCard
                num="02"
                name="Hand Painting & Miniature Art"
                desc="Intricate detailing borrowed from the miniature art traditions of India — each motif rendered by hand, carrying the imprint of its maker and the memory of its heritage."
                delay={100}
              />
              <CraftCard
                num="03"
                name="Sashiko & Kantha"
                desc="Ancient Japanese and Indian needlework, thoughtfully incorporated. Each stitch carries the weight of tradition, the warmth of care, and the quiet resilience of things made to last."
                delay={200}
              />
            </div>
          </div>
        </section>

        {/* ══════════ PHILOSOPHY ══════════ */}
        {/* Rich midnight navy with subtle indigo warmth */}
        <section
          className="noise-overlay"
          style={{
            position: "relative",
            background:
              "linear-gradient(160deg, #0F1C2E 0%, #122338 50%, #0D1E35 100%)",
            padding: "clamp(5rem, 12vw, 10rem) 0",
          }}
        >
          {/* Decorative star-map dot pattern overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.05,
              backgroundImage:
                "radial-gradient(circle, #C4A882 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              ...S.sectionInner,
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Reveal>
              <p style={S.eyebrowLight}>Our Philosophy</p>
            </Reveal>
            <Reveal delay={150}>
              <blockquote
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(1.6rem, 4vw, 3rem)",
                  lineHeight: 1.4,
                  color: "#F5F0E8",
                  maxWidth: 820,
                  margin: "0 auto 4rem",
                  letterSpacing: "0.02em",
                }}
              >
                "When something is held with care and intention, it transforms
                into something lasting."
              </blockquote>
            </Reveal>
            <Reveal delay={250}>
              <p
                style={{
                  ...S.bodyLight,
                  maxWidth: 640,
                  margin: "0 auto 1.5rem",
                }}
              >
                Produced in small batches in close collaboration with artisans,
                this allows us to focus on precision and detail in a way that
                large-scale production simply cannot. The process is slower, but
                it ensures that every piece meets a certain standard of quality.
              </p>
            </Reveal>
            <Reveal delay={350}>
              <p style={{ ...S.bodyLight, maxWidth: 640, margin: "0 auto" }}>
                In honouring and preserving the richness of Indian heritage, we
                bring its legacy forward with quiet pride in every piece we
                create.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════ FABRICS ══════════ */}
        <section
          style={{
            padding: "clamp(4rem, 10vw, 9rem) 0",
            background: "#EDE6D9",
          }}
        >
          <div style={S.sectionInner}>
            <div style={S.twoCol}>
              <Reveal>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src="/images/subscribe.jpg"
                    alt="Premium Fabrics"
                    width={600}
                    height={420}
                    style={{
                      width: "100%",
                      height: "clamp(260px, 40vw, 420px)",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1.5rem",
                      left: "1.5rem",
                      background: "rgba(15,28,46,0.80)",
                      padding: "0.6rem 1.2rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 9,
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        color: "#C4A882",
                        margin: 0,
                      }}
                    >
                      60-count European Linen
                    </p>
                  </div>
                </div>
              </Reveal>

              <div>
                <Reveal>
                  <p style={S.eyebrow}>Our Materials</p>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "clamp(2rem, 4vw, 3.2rem)",
                      color: "#0F1C2E",
                      lineHeight: 1.2,
                      marginBottom: "2rem",
                    }}
                  >
                    Fabrics that
                    <br />
                    <em style={{ fontStyle: "italic", color: "#6B5B4E" }}>
                      breathe and evolve
                    </em>
                  </h2>
                </Reveal>
                <Reveal delay={150}>
                  <div style={S.rule} />
                  <p style={S.bodyDark}>
                    We work exclusively with 60-count European linen and
                    organically sourced fibres — valued for their breathability,
                    texture, and the way they soften and evolve over time. Each
                    material is chosen not just for its quality, but for the
                    story it carries.
                  </p>
                  <p style={{ ...S.bodyDark, marginBottom: 0 }}>
                    Our design philosophy embraces elegance in simplicity —
                    blending traditional Indian craftsmanship with a quiet
                    contemporary sensibility that never shouts.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

      

        {/* ══════════ HERON / LOGO ══════════ */}
        {/* Warm parchment — consistent with light sections */}

        {/* ══════════ UDAIPUR ══════════ */}
        {/* Deep navy — evokes still lake at night reflecting stars */}

        {/* ══════════ STORY / HERITAGE ══════════ */}
        <section
          style={{
            padding: "clamp(4rem, 10vw, 9rem) 0",
            background: "#F5F0E8",
          }}
        >
          <div style={S.sectionInner}>
            <div style={S.twoCol}>
              <div>
                <Reveal>
                  <p style={S.eyebrow}>Our Story</p>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "clamp(2rem, 4vw, 3.2rem)",
                      color: "#0F1C2E",
                      lineHeight: 1.2,
                      marginBottom: "2rem",
                    }}
                  >
                    A legacy
                    <br />
                    <em style={{ fontStyle: "italic", color: "#6B5B4E" }}>
                      woven in fabric
                    </em>
                  </h2>
                </Reveal>
                <Reveal delay={150}>
                  <div style={S.rule} />
                  <p style={S.bodyDark}>
                    At Dhirago, fabric is not just what we work with — it is
                    woven into our family heritage. Founded by Sanjeev Mehra and
                    now proudly carried forward by his sons, our journey spans
                    over seven generations and more than 100 years of expertise
                    in the fabric and textile trade.
                  </p>
                  <p style={{ ...S.bodyDark, marginBottom: 0 }}>
                    Our legacy began long before today&apos;s trends —
                    understanding premium fabrics is in our DNA. Operating out
                    of our original store, we quickly earned a reputation for
                    exceptional quality among both retail and wholesale
                    customers.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={100}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src="/images/subscribe.jpg"
                    alt="Our Heritage"
                    width={600}
                    height={500}
                    style={{
                      width: "100%",
                      height: "clamp(280px, 42vw, 500px)",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════ CLOSING ══════════ */}
        {/* Deepest midnight navy — ceremonial, starless sky */}
        <section
          className="noise-overlay"
          style={{
            position: "relative",
            padding: "clamp(5rem, 12vw, 11rem) 0",
            textAlign: "center",
            background: "linear-gradient(180deg, #0D1B2E 0%, #08121F 100%)",
            overflow: "hidden",
          }}
        >
          {/* Radial glow from below — moonlight on water */}
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              height: "60%",
              background:
                "radial-gradient(ellipse, rgba(196,168,130,0.07) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ ...S.sectionInner, position: "relative", zIndex: 2 }}>
            <Reveal>
              {/* Animated gold shimmer rule */}
              <div
                className="gold-rule-animate"
                style={{ width: 1, height: 80, margin: "0 auto 3.5rem" }}
              />
            </Reveal>
            <Reveal delay={100}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)",
                  color: "#F5F0E8",
                  lineHeight: 1.3,
                  maxWidth: 760,
                  margin: "0 auto 3rem",
                  letterSpacing: "0.02em",
                }}
              >
                In a world that moves quickly,
                <br />
                we choose to be still.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "#C4A882",
                  opacity: 0.7,
                }}
              >
                Dhirago · Conscious Luxury · Est. 2026
              </p>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}

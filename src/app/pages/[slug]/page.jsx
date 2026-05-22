"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import React from "react";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700"],
});

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, from = "bottom", style = {} }) {
  const [ref, visible] = useReveal();
  const t = {
    bottom: visible ? "translateY(0)" : "translateY(28px)",
    left: visible ? "translateX(0)" : "translateX(-36px)",
    right: visible ? "translateX(0)" : "translateX(36px)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: t[from],
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    let n = 0;
    const step = target / (1800 / 16);
    const t = setInterval(() => {
      n += step;
      if (n >= target) {
        setCount(target);
        clearInterval(t);
      } else setCount(Math.floor(n));
    }, 16);
    return () => clearInterval(t);
  }, [visible, target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function ProgressBar({ label, value, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ marginBottom: "1.8rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--fb)",
            fontSize: 13,
            fontWeight: 300,
            color: "#4A4035",
            letterSpacing: "0.03em",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--fb)",
            fontSize: 11,
            color: "var(--gold)",
            fontWeight: 500,
          }}
        >
          {value}%
        </span>
      </div>
      <div
        style={{
          height: 1.5,
          background: "rgba(28,24,20,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: visible ? `${value}%` : "0%",
            background: "linear-gradient(to right, #C4A882, #1C1814)",
            transition: `width 1.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

// ─── SVG atoms ────────────────────────────────────────────────────────────────
const SashikoBg = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    style={{ opacity: 1 }}
  >
    {[10, 30, 50, 70, 90, 110].map((y) => (
      <line
        key={`h${y}`}
        x1="0"
        y1={y}
        x2="120"
        y2={y}
        stroke="#C4A882"
        strokeWidth="0.8"
        strokeDasharray="6 4"
      />
    ))}
    {[10, 30, 50, 70, 90, 110].map((x) => (
      <line
        key={`v${x}`}
        x1={x}
        y1="0"
        x2={x}
        y2="120"
        stroke="#C4A882"
        strokeWidth="0.8"
        strokeDasharray="6 4"
      />
    ))}
    {[30, 70, 110].map((x) =>
      [30, 70, 110].map((y) => (
        <circle
          key={`${x}${y}`}
          cx={x}
          cy={y}
          r="2.5"
          stroke="#C4A882"
          strokeWidth="0.8"
          fill="none"
        />
      )),
    )}
  </svg>
);

const LeafSvg = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <path
      d="M100 180 C60 160 20 120 30 70 C40 20 100 10 100 10 C100 10 160 20 170 70 C180 120 140 160 100 180Z"
      stroke="#C4A882"
      strokeWidth="0.8"
    />
    <line
      x1="100"
      y1="180"
      x2="100"
      y2="10"
      stroke="#C4A882"
      strokeWidth="0.6"
    />
    {[0.25, 0.42, 0.58, 0.73].map((t, i) => {
      const y = 180 - t * 170,
        s = 28 + i * 8;
      return (
        <g key={i}>
          <path
            d={`M100 ${y} Q${100 - s * 0.6} ${y - 12} ${100 - s} ${y - 6}`}
            stroke="#C4A882"
            strokeWidth="0.4"
            fill="none"
          />
          <path
            d={`M100 ${y} Q${100 + s * 0.6} ${y - 12} ${100 + s} ${y - 6}`}
            stroke="#C4A882"
            strokeWidth="0.4"
            fill="none"
          />
        </g>
      );
    })}
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const constructionDetails = [
  {
    num: "01",
    label: "Collar Precision",
    desc: "Every collar is cut, interfaced, and pressed to a standard that holds its shape through years of wear — clean, sharp, and quietly authoritative.",
  },
  {
    num: "02",
    label: "Placket Fusing",
    desc: "An extra layer of fabric fused to plackets, cuffs, and collars adds structural strength without adding stiffness — a hidden architecture of durability.",
  },
  {
    num: "03",
    label: "Stitch Neatness",
    desc: "Every seam is sewn with consistency in tension, spacing, and direction. The inside of a Dhirago garment is as considered as the outside.",
  },
  {
    num: "04",
    label: "Cuff Construction",
    desc: "Fused cuffs resist fraying and deformation over time, ensuring the garment maintains its refined appearance with each wear and wash.",
  },
];

const linenQualities = [
  {
    icon: "◈",
    title: "Longer Staple Length",
    body: "European flax is known for its longer staple length, which directly enhances durability and smoothness — a fibre built with strength from within.",
  },
  {
    icon: "◎",
    title: "Rain-Fed Cultivation",
    body: "Cultivated from premium flax grown in naturally balanced coastal environments of France and Belgium.",
  },
  {
    icon: "◇",
    title: "Naturally Antibacterial",
    body: "Linen is inherently antibacterial and cooling against the skin. A fibre that takes care of the wearer.",
  },
  {
    icon: "○",
    title: "Fabric of Royalty",
    body: "A timeless material refined through centuries of use and admired for understated luxury.",
  },
  {
    icon: "△",
    title: "Eco-Conscious",
    body: "Minimal chemical inputs during cultivation, biodegradable by nature and respectful to the earth.",
  },
  {
    icon: "□",
    title: "Softens Over Time",
    body: "The more it is worn and washed, the softer and richer it becomes.",
  },
];

const techniques = [
  {
    id: "sashiko",
    num: "01",
    name: "Sashiko",
    origin: "Japan",
    tag: "Reinforcement Stitching",
    description:
      "A Japanese hand-stitching tradition of repetitive reinforcement stitching — applied through controlled, manual execution to create both structural strength and rhythmic visual pattern. Each line of stitching is intentional, spaced, and precise.",
  },
  {
    id: "kantha",
    num: "02",
    name: "Kantha",
    origin: "India",
    tag: "Running Stitch Embroidery",
    description:
      "Rooted in the Bengali tradition of layered running stitches, Kantha is applied with control and intent. Each pass of the needle creates a surface that breathes — textured, warm, and alive with the motion of the hand that made it.",
  },
  {
    id: "miniature",
    num: "03",
    name: "Miniature Art",
    origin: "Rajasthan",
    tag: "Hand-Painted Motifs",
    description:
      "Drawing from the tradition of Rajasthani miniature painting, every motif on a Dhirago garment is created entirely by hand. No two are identical — each carries the subtle variation of the artist's hand, making every piece a singular work.",
  },
];

const pillars = [
  {
    num: "01",
    title: "Natural Fibres",
    body: "Linen and organic cotton selected for biodegradability and lower environmental impact. Linen requires minimal irrigation and fewer chemical inputs.",
  },
  {
    num: "02",
    title: "Small-Batch Production",
    body: "Production follows a small-batch model — better control over quantities, reduced excess inventory, and careful fabric utilisation.",
  },
  {
    num: "03",
    title: "Zero-Waste Approach",
    body: "Recycled and leftover materials are incorporated wherever possible. Packaging is selected with consideration for reduced environmental impact.",
  },
  {
    num: "04",
    title: "Long-Term Wearability",
    body: "Sustainability is defined by longevity. Garments designed to be worn for years, not seasons — quality that resists the pressure of disposability.",
  },
];

const navItems = [
  { id: "essence", label: "Essence", icon: "◆" },
  { id: "linen", label: "Linen", icon: "◇" },
  { id: "embroidery", label: "Embroidery", icon: "◎" },
  { id: "sustainability", label: "Sustainability", icon: "△" },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function DhiragoPage() {
  const [activeQuality, setActiveQuality] = useState(0);
  const [activeTech, setActiveTech] = useState(0);
  const [activeSection, setActiveSection] = useState("essence");

  const refs = {
    essence: useRef(null),
    linen: useRef(null),
    embroidery: useRef(null),
    sustainability: useRef(null),
  };

  useEffect(() => {
    const obs = Object.entries(refs).map(([id, ref]) => {
      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25 },
      );
      if (ref.current) o.observe(ref.current);
      return o;
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) =>
    refs[id]?.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lato:wght@100;300;400&display=swap');

        :root {
          --bg:   #F7F3EE;
          --dark: #1C1814;
          --gold: #C4A882;
          --muted:#A08870;
          --fd:   'Josefin Sans', sans-serif;
          --fs:   'Cormorant Garamond', serif;
          --fb:   'Lato', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; background: var(--bg); }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-100%)} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse    { 0%,100%{opacity:.5} 50%{opacity:1} }

        /* ── Bottom nav ─────────────────────────────────── */
        .bottom-nav {
          position: fixed;
          bottom: 1.25rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 200;
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(28,24,20,0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(196,168,130,0.2);
          border-radius: 60px;
          padding: 0.5rem 0.75rem;
          box-shadow: 0 8px 40px rgba(0,0,0,0.25);
        }
        .nav-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 0.55rem 1.1rem;
          border-radius: 50px;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
          border: none;
          background: none;
          position: relative;
        }
        .nav-pill:hover { background: rgba(196,168,130,0.12); }
        .nav-pill.active { background: rgba(196,168,130,0.18); }
        .nav-pill-icon {
          font-size: 10px;
          color: rgba(245,240,232,0.35);
          transition: color 0.3s, transform 0.3s;
          line-height: 1;
        }
        .nav-pill.active .nav-pill-icon { color: var(--gold); transform: scale(1.2); }
        .nav-pill-label {
          font-family: var(--fb);
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.35);
          transition: color 0.3s;
          white-space: nowrap;
        }
        .nav-pill.active .nav-pill-label { color: var(--gold); }
        .nav-divider { width: 1px; height: 24px; background: rgba(196,168,130,0.15); margin: 0 0.1rem; }
        /* Logo above nav pill */
        .nav-logo-pill {
          font-family: var(--fd);
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.5);
          padding: 0 1rem;
          border-right: 1px solid rgba(196,168,130,0.15);
          margin-right: 0.25rem;
          white-space: nowrap;
        }

        /* ── Marquee ────────────────────────────────────── */
        .mq-wrap { overflow: hidden; display: flex; width: 100%; }
        .mq-track { display: flex; gap: 3.5rem; white-space: nowrap; flex-shrink: 0; padding-right: 3.5rem; animation: marquee 20s linear infinite; }
        .mq-item { font-family: var(--fb); font-size: 9px; font-weight: 400; letter-spacing: 0.45em; text-transform: uppercase; flex-shrink: 0; color: var(--dark); }

        /* ── Section label ──────────────────────────────── */
        .sec-label {
          font-family: var(--fb);
          font-size: 9px; font-weight: 300;
          letter-spacing: 0.55em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.5rem;
          display: block;
        }

        /* ── Quality rows ───────────────────────────────── */
        .q-row {
          padding: 1.2rem 0;
          border-bottom: 1px solid rgba(28,24,20,0.1);
          cursor: pointer;
          transition: padding-left 0.35s;
        }
        .q-row:first-child { border-top: 1px solid rgba(28,24,20,0.1); }
        .q-row:hover, .q-row.active { padding-left: 0.75rem; }

        /* ── Technique tabs ─────────────────────────────── */
        .t-tab {
          padding: 1.1rem 0;
          border-bottom: 1px solid rgba(28,24,20,0.1);
          cursor: pointer;
          display: flex; align-items: center; gap: 1rem;
          transition: padding-left 0.3s;
        }
        .t-tab:first-of-type { border-top: 1px solid rgba(28,24,20,0.1); }
        .t-tab:hover { padding-left: 0.5rem; }
        .t-bar { width: 2px; height: 0; background: var(--gold); transition: height 0.4s; flex-shrink: 0; }
        .t-tab.active .t-bar { height: 2.2rem; }

        /* ── Pillar cards ───────────────────────────────── */
        .p-card {
          padding: 2rem 1.6rem;
          border: 1px solid rgba(196,168,130,0.2);
          background: rgba(247,243,238,0.7);
          transition: border-color 0.4s, transform 0.35s;
          position: relative; overflow: hidden;
        }
        .p-card::before { content:''; position:absolute; top:0; left:0; width:2px; height:0; background: linear-gradient(to bottom, var(--gold), transparent); transition: height 0.5s; }
        .p-card:hover { border-color: rgba(196,168,130,0.45); transform: translateY(-3px); }
        .p-card:hover::before { height: 100%; }

        /* ── Detail rows ────────────────────────────────── */
        .d-row { border-top: 1px solid rgba(196,168,130,0.25); padding: 1.6rem 0; }
        .d-row:last-child { border-bottom: 1px solid rgba(196,168,130,0.25); }

        /* ── Thin divider line ──────────────────────────── */
        .section-sep { width: 100%; height: 1px; background: rgba(196,168,130,0.2); }

        /* ── Heading font util ──────────────────────────── */
        .hf { font-family: var(--fd); }
        .sf { font-family: var(--fs); }

        /* ── Two-col grid ───────────────────────────────── */
        .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2.5rem, 5vw, 5rem); align-items: start; }
        .g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; }
        .g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
        .g5 { display: grid; grid-template-columns: repeat(5,1fr); gap: clamp(0.8rem,2vw,1.8rem); align-items:start; }

        @media (max-width: 1024px) {
          .g2 { grid-template-columns: 1fr; }
          .g4 { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .g3 { grid-template-columns: repeat(2,1fr); }
          .g5 { grid-template-columns: repeat(3,1fr); }
          .g-heritage { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .g4 { grid-template-columns: 1fr; }
          .g5 { grid-template-columns: repeat(2,1fr); }
          .g3 { grid-template-columns: 1fr; }
          .d-row > div { grid-template-columns: 48px 1fr !important; }
          .d-row > div > *:last-child { grid-column: 1/-1; padding-left: 48px; }
          .bottom-nav { bottom: 0.75rem; padding: 0.4rem 0.5rem; }
          .nav-pill { padding: 0.45rem 0.7rem; }
          .nav-pill-label { display: none; }
          .nav-logo-pill { display: none; }
        }

        /* ── Essence hero two-col ───────────────────────── */
        @media (max-width: 768px) {
          .essence-hero-grid { grid-template-columns: 1fr !important; }
          .hero-image { min-height: 55vw !important; }
        }

        /* ── Sticky panel ───────────────────────────────── */
        .sticky { position: sticky; top: 4rem; }
        @media (max-width: 1024px) { .sticky { position: relative; top: unset; } }

        /* ── Section wrappers ───────────────────────────── */
        .sec { padding: clamp(3.5rem,7vw,6.5rem) clamp(1.5rem,5vw,5rem); background: var(--bg); }
        .inner { max-width: 1160px; margin: 0 auto; }

        /* ── Hero strips ────────────────────────────────── */
        .hero-base {
          position: relative;
          min-height: 95vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }
        .hero-content { position: relative; z-index: 3; padding: 0 clamp(1.5rem,5vw,5.5rem); padding-bottom: clamp(4rem,8vw,7rem); }
        .hero-overlay { position: absolute; inset: 0; pointer-events: none; z-index: 2; }

        .hero-h1 { font-family: var(--fd); font-weight: 100; letter-spacing: 0.08em; text-transform: uppercase; line-height: 1.05; }

        /* ── Quote block ────────────────────────────────── */
        .quote-block { padding: clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem); background: var(--bg); border-top: 1px solid rgba(196,168,130,0.2); text-align: center; }
        .quote-text { font-family: var(--fs); font-style: italic; font-weight: 300; color: var(--dark); line-height: 1.6; }

        /* ── Gold bar accent ────────────────────────────── */
        .gold-bar { width: 48px; height: 1px; background: var(--gold); }
        .gold-vbar { width: 1px; height: 60px; background: linear-gradient(to bottom, var(--gold), transparent); margin: 0 auto; }
      `}</style>

      {/* ══ BOTTOM NAV ══════════════════════════════════════════════════════════ */}
      <nav className="bottom-nav">
        <span className="nav-logo-pill">Dhirago</span>
        {navItems.map((n, i) => (
          <React.Fragment key={n.id}>
            {i > 0 && <div key={`d${i}`} className="nav-divider" />}
            <button
              key={n.id}
              className={`nav-pill${activeSection === n.id ? " active" : ""}`}
              onClick={() => scrollTo(n.id)}
            >
              <span className="nav-pill-icon">{n.icon}</span>
              <span className="nav-pill-label">{n.label}</span>
            </button>
          </React.Fragment>
        ))}
      </nav>

      {/* ══ PAGE ════════════════════════════════════════════════════════════════ */}
      <main
        style={{
          background: "var(--bg)",
          fontFamily: "var(--fb)",
          color: "var(--dark)",
          paddingBottom: "5rem",
        }}
      >
        {/* ════════════════════════════════════════════════════════
            1 — ESSENCE
        ════════════════════════════════════════════════════════ */}
        <section ref={refs.essence} id="essence">
          {/* Hero — two column: left text, right image */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              minHeight: "100vh",
            }}
            className="essence-hero-grid"
          >
            {/* LEFT — text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "clamp(5rem,8vw,7rem) clamp(2rem,5vw,5rem)",
                background: "var(--bg)",
              }}
            >
              <div style={{ animation: "fadeUp 1s ease 0.2s both" }}>
                <span className="sec-label">Why Dhirago — 01</span>
              </div>
              <div style={{ animation: "fadeUp 1s ease 0.45s both" }}>
                <h1
                  style={{
                    fontFamily: "var(--fd)",
                    fontWeight: 200,
                    fontSize: "clamp(2.2rem,5vw,3.2rem)",
                    lineHeight: 1,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--dark)",
                    marginBottom: "2.5rem",
                  }}
                >
                  The Essence
                  <br />
                  of a Fine
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "#6B5040",
                      fontWeight: 200,
                    }}
                  >
                    Garment
                  </em>
                </h1>
              </div>
              <div style={{ animation: "fadeUp 1s ease 0.65s both" }}>
                <div
                  className="gold-bar"
                  style={{
                    marginBottom: "1.8rem",
                    transformOrigin: "left",
                    animation: "lineGrow 1s ease 0.85s both",
                  }}
                />
                <p
                  style={{
                    fontSize: "clamp(14px,1.4vw,16px)",
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: "#4A4035",
                    maxWidth: 480,
                    textAlign: "justify",
                  }}
                >
                  Every inch of a Dhirago piece reflects an approach of
                  craftsmanship — where precision and attention to details are
                  never compromised. From how our fabrics feel on your skin, to
                  how the collar sits and the neatness of every stitch.
                </p>
              </div>
            </div>

            {/* RIGHT — image */}
            <div
              className="hero-image"
              style={{
                position: "relative",
                background: "var(--dark)",
                overflow: "hidden",
                minHeight: "70vh",
              }}
            >
              <Image
                src="/images/heron.jpeg"
                alt="Fine Garment Craftsmanship"
                fill
                style={{ objectFit: "cover", opacity: 0.75 }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(28,24,20,0.5) 0%, transparent 60%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "3rem",
                  left: "3rem",
                  background: "rgba(28,24,20,0.85)",
                  padding: "2rem 2.5rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--fd)",
                    fontSize: "3rem",
                    fontWeight: 300,
                    color: "#F5F0E8",
                    lineHeight: 1,
                  }}
                >
                  <Counter target={100} suffix="%" />
                </div>
                <p
                  style={{
                    fontFamily: "var(--fb)",
                    fontSize: 10,
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  Handcrafted Precision
                </p>
              </div>
            </div>
          </div>

          {/* Five Elements */}
          <div
            className="sec"
            style={{
              borderTop: "1px solid rgba(196,168,130,0.15)",
              borderBottom: "1px solid rgba(196,168,130,0.15)",
            }}
          >
            <div className="inner">
              <Reveal>
                <span
                  className="sec-label"
                  style={{
                    textAlign: "center",
                    display: "block",
                    marginBottom: "3rem",
                  }}
                >
                  The Five Elements of Craft
                </span>
              </Reveal>
              <div className="g5">
                {[
                  {
                    label: "Materials",
                    path: (
                      <>
                        <circle
                          cx="32"
                          cy="32"
                          r="20"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M14 26C18 20 28 16 36 22C44 28 46 40 40 46"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          d="M26 14C24 20 24 32 30 40C34 46 40 50 44 48"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </>
                    ),
                  },
                  {
                    label: "Fusing",
                    path: (
                      <>
                        <path
                          d="M12 22L32 14L52 22L32 30Z"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                          fill="none"
                        />
                        <path
                          d="M12 32L32 24L52 32L32 40Z"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                          fill="none"
                        />
                        <path
                          d="M12 42L32 34L52 42L32 50Z"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </>
                    ),
                  },
                  {
                    label: "Buttons",
                    path: (
                      <>
                        <circle
                          cx="32"
                          cy="32"
                          r="22"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="16"
                          stroke="var(--dark)"
                          strokeWidth="0.8"
                          strokeDasharray="3 3"
                        />
                        <circle
                          cx="26"
                          cy="26"
                          r="3"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                          fill="none"
                        />
                        <circle
                          cx="38"
                          cy="26"
                          r="3"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                          fill="none"
                        />
                        <circle
                          cx="26"
                          cy="38"
                          r="3"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                          fill="none"
                        />
                        <circle
                          cx="38"
                          cy="38"
                          r="3"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                          fill="none"
                        />
                      </>
                    ),
                  },
                  {
                    label: "Stitching",
                    path: (
                      <>
                        <line
                          x1="14"
                          y1="50"
                          x2="46"
                          y2="18"
                          stroke="var(--dark)"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M44 16L50 14L48 20Z"
                          stroke="var(--dark)"
                          strokeWidth="1"
                          strokeLinejoin="round"
                          fill="none"
                        />
                        <path
                          d="M22 42C28 36 18 24 28 18C38 12 44 24 36 30C28 36 34 46 42 44"
                          stroke="var(--dark)"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </>
                    ),
                  },
                  {
                    label: "Finishing",
                    path: (
                      <>
                        <path
                          d="M32 12C32 12 33 24 40 28C33 32 32 44 32 44C32 44 31 32 24 28C31 24 32 12 32 12Z"
                          stroke="var(--dark)"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                          fill="none"
                        />
                        <path
                          d="M48 16C48 16 48.5 20 51 21.5C48.5 23 48 27 48 27C48 27 47.5 23 45 21.5C47.5 20 48 16 48 16Z"
                          stroke="var(--dark)"
                          strokeWidth="1"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </>
                    ),
                  },
                ].map((el, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 64 64"
                        fill="none"
                      >
                        {el.path}
                      </svg>
                      <span
                        style={{
                          fontFamily: "var(--fd)",
                          fontSize: 9,
                          letterSpacing: "0.45em",
                          textTransform: "uppercase",
                          color: "var(--dark)",
                          fontWeight: 400,
                        }}
                      >
                        {el.label}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Fusing */}
          <div className="sec">
            <div className="inner">
              <div className="g2">
                <Reveal>
                  <span className="sec-label" style={{ color: "var(--gold)" }}>
                    The Technique
                  </span>
                  <h2
                    className="hf"
                    style={{
                      fontWeight: 200,
                      fontSize: "clamp(1.8rem,3vw,2.6rem)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--dark)",
                      lineHeight: 1.1,
                      marginBottom: "2rem",
                    }}
                  >
                    The Art of <em style={{ fontStyle: "italic" }}>Fusing</em>
                  </h2>
                  <p
                    style={{
                      fontSize: "clamp(14px,1.4vw,16px)",
                      fontWeight: 300,
                      lineHeight: 1.9,
                      color: "#4A4035",
                      marginBottom: "1.5rem",
                      textAlign: "justify",
                    }}
                  >
                    All garments are made to maximise wear. An extra layer of
                    fabric is added to plackets, cuffs, and collars to give them
                    added strength — this is called fusing.
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(14px,1.4vw,16px)",
                      fontWeight: 300,
                      lineHeight: 1.9,
                      color: "#4A4035",
                      textAlign: "justify",
                    }}
                  >
                    It enhances durability while giving the garment a sharper,
                    more refined finish — invisible to the eye, felt in every
                    wearing.
                  </p>
                </Reveal>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1px",
                    background: "rgba(196,168,130,0.2)",
                  }}
                >
                  {[
                    { num: "3×", label: "Placket Strength" },
                    { num: "∞", label: "Wash Retention" },
                    { num: "0mm", label: "Tolerance Error" },
                    { num: "7+", label: "Layers Checked" },
                  ].map((s, i) => (
                    <Reveal key={i} delay={i * 80}>
                      <div
                        style={{
                          background: "var(--bg)",
                          padding: "2.2rem 1.8rem",
                          textAlign: "center",
                          borderBottom:
                            i < 2 ? "1px solid rgba(196,168,130,0.2)" : "none",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--fd)",
                            fontSize: "2.2rem",
                            fontWeight: 200,
                            color: "var(--dark)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {s.num}
                        </div>
                        <p
                          style={{
                            fontFamily: "var(--fb)",
                            fontSize: 9,
                            letterSpacing: "0.35em",
                            textTransform: "uppercase",
                            color: "var(--muted)",
                            margin: 0,
                          }}
                        >
                          {s.label}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Construction Details */}
          <div className="sec" style={{ paddingTop: 0 }}>
            <div className="inner">
              <Reveal>
                <span className="sec-label" style={{ marginBottom: "2.5rem" }}>
                  Construction Details
                </span>
              </Reveal>
              {constructionDetails.map((d, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="d-row">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "72px 1fr 2fr",
                        gap: "1.5rem",
                        alignItems: "start",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--fd)",
                          fontSize: "1.1rem",
                          color: "rgba(196,168,130,0.5)",
                          fontWeight: 200,
                        }}
                      >
                        {d.num}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--fd)",
                          fontSize: "clamp(0.9rem,1.5vw,1.1rem)",
                          fontWeight: 400,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "var(--dark)",
                        }}
                      >
                        {d.label}
                      </span>
                      <p
                        style={{
                          fontSize: "clamp(13px,1.4vw,15px)",
                          fontWeight: 300,
                          lineHeight: 1.85,
                          color: "#6B5B4E",
                          margin: 0,
                          textAlign: "justify",
                        }}
                      >
                        {d.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="quote-block">
            <Reveal>
              <p
                className="quote-text"
                style={{
                  fontSize: "clamp(1.1rem,2.5vw,1.8rem)",
                  maxWidth: 780,
                  margin: "0 auto 2rem",
                }}
              >
                "Everything is thoughtfully done — from how the fabric feels on
                your skin, to how the collar sits, to the neatness of every
                stitch."
              </p>
              <div className="gold-vbar" />
            </Reveal>
          </div>
        </section>

        <div className="section-sep" />

        {/* ════════════════════════════════════════════════════════
            2 — LINEN
        ════════════════════════════════════════════════════════ */}
        <section ref={refs.linen} id="linen">
          {/* Hero */}
          <div className="hero-base">
            <Image
              src="/images/heron.jpeg"
              alt="European Linen"
              fill
              style={{ objectFit: "cover", opacity: 1 }}
              priority
            />
            <div
              className="hero-overlay"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(28,24,20,0.25) 0%, rgba(28,24,20,0.82) 100%)",
              }}
            />
            {/* Animated leaf */}
            <div
              style={{
                position: "absolute",
                right: "6%",
                top: "20%",
                animation: "float 7s ease-in-out infinite",
                opacity: 0.25,
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <LeafSvg size={260} />
            </div>
            <div
              style={{
                position: "absolute",
                right: "-2rem",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "var(--fs)",
                fontSize: "clamp(10rem,22vw,18rem)",
                fontWeight: 300,
                color: "rgba(196,168,130,0.06)",
                lineHeight: 1,
                userSelect: "none",
                zIndex: 1,
              }}
            >
              60
            </div>

            <div className="hero-content">
              <div style={{ animation: "fadeUp 1s ease 0.3s both" }}>
                <span
                  className="sec-label"
                  style={{ color: "rgba(196,168,130,0.6)" }}
                >
                  Why Dhirago — 02
                </span>
              </div>
              <div style={{ animation: "fadeUp 1s ease 0.5s both" }}>
                <h2
                  className="hero-h1"
                  style={{
                    fontSize: "clamp(2.4rem,6vw,3.8rem)",
                    color: "#F5F0E8",
                    marginBottom: "2rem",
                  }}
                >
                  60-Count
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "var(--gold)",
                      fontWeight: 100,
                    }}
                  >
                    European Linen
                  </em>
                </h2>
              </div>
              <div
                style={{ animation: "fadeUp 1s ease 0.7s both", maxWidth: 520 }}
              >
                <p
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(13px,1.5vw,16px)",
                    lineHeight: 1.85,
                    color: "rgba(245,240,232,0.5)",
                  }}
                >
                  Every piece begins with a simple belief — true quality comes
                  from the material. Sourced from the coastal regions of France
                  and Belgium.
                </p>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div
            style={{
              background: "var(--gold)",
              padding: "1.1rem 0",
              overflow: "hidden",
            }}
          >
            <div className="mq-wrap">
              {[0, 1].map((c) => (
                <div key={c} className="mq-track">
                  {[
                    "France & Belgium",
                    "Rain-Fed Flax",
                    "60-Count Yarn",
                    "Premium Fibre",
                    "Coastal Origin",
                    "Zero Waste",
                  ].map((t, i) => (
                    <span key={i} className="mq-item">
                      {t} &nbsp;·
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Qualities */}
          <div className="sec">
            <div className="inner">
              <div className="g2">
                <Reveal from="left">
                  <span className="sec-label">Material Qualities</span>
                  {linenQualities.map((q, i) => (
                    <div
                      key={i}
                      className={`q-row${activeQuality === i ? " active" : ""}`}
                      onClick={() => setActiveQuality(i)}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.2rem",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--gold)",
                            fontSize: "0.95rem",
                            width: 18,
                            textAlign: "center",
                            opacity: activeQuality === i ? 1 : 0.3,
                          }}
                        >
                          {q.icon}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--fd)",
                            fontSize: "clamp(0.85rem,1.4vw,1rem)",
                            fontWeight: 400,
                            letterSpacing: "0.07em",
                            textTransform: "uppercase",
                            color:
                              activeQuality === i
                                ? "var(--dark)"
                                : "rgba(28,24,20,0.3)",
                            transition: "color 0.3s",
                          }}
                        >
                          {q.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </Reveal>
                <div className="sticky">
                  <Reveal>
                    <div
                      style={{
                        background: "rgba(196,168,130,0.07)",
                        border: "1px solid rgba(196,168,130,0.25)",
                        padding: "2.5rem clamp(1.5rem,3vw,3rem)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "2.2rem",
                          color: "var(--gold)",
                          marginBottom: "1.2rem",
                        }}
                      >
                        {linenQualities[activeQuality].icon}
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--fd)",
                          fontSize: "clamp(1.3rem,2.5vw,1.8rem)",
                          fontWeight: 400,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--dark)",
                          marginBottom: "1.2rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {linenQualities[activeQuality].title}
                      </h3>
                      <p
                        style={{
                          fontSize: "clamp(13px,1.4vw,15px)",
                          fontWeight: 300,
                          lineHeight: 1.9,
                          color: "#4A4035",
                          textAlign: "justify",
                        }}
                      >
                        {linenQualities[activeQuality].body}
                      </p>
                      <div
                        className="gold-bar"
                        style={{ marginTop: "1.8rem" }}
                      />
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>

          {/* Bridge */}
          <div className="sec" style={{ paddingTop: 0 }}>
            <div className="inner">
              <div className="g2">
                <Reveal>
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      height: "clamp(240px,36vw,400px)",
                    }}
                  >
                    <Image
                      src="/images/heron.jpeg"
                      alt="Indian Craftsmanship"
                      fill
                      style={{ objectFit: "cover", opacity: 0.85 }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(28,24,20,0.2)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "1.2rem",
                        left: "1.2rem",
                        background: "rgba(247,243,238,0.92)",
                        padding: "0.6rem 1.2rem",
                        border: "1px solid rgba(196,168,130,0.3)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--fb)",
                          fontSize: 9,
                          letterSpacing: "0.4em",
                          textTransform: "uppercase",
                          color: "#6B5040",
                        }}
                      >
                        Indian Craftsmanship
                      </span>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={150}>
                  <span className="sec-label">Where It Comes Together</span>
                  <h3
                    style={{
                      fontFamily: "var(--fd)",
                      fontWeight: 100,
                      fontSize: "clamp(1.6rem,3vw,2.4rem)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--dark)",
                      lineHeight: 1.2,
                      marginBottom: "1.8rem",
                    }}
                  >
                    European fibre.
                    <br />
                    <em
                      style={{
                        fontStyle: "italic",
                        color: "#6B5040",
                        fontWeight: 100,
                      }}
                    >
                      Indian mastery.
                    </em>
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(13px,1.4vw,15px)",
                      fontWeight: 300,
                      lineHeight: 1.9,
                      color: "#4A4035",
                      marginBottom: "1.2rem",
                      textAlign: "justify",
                    }}
                  >
                    This exceptional material is brought to life through Indian
                    craftsmanship. From selecting the finest linen to the
                    precision of the final stitch, attention to detail remains
                    uncompromised.
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(13px,1.4vw,15px)",
                      fontWeight: 300,
                      lineHeight: 1.9,
                      color: "#4A4035",
                      textAlign: "justify",
                    }}
                  >
                    The quality of linen begins with the selection of fibre —
                    and continues through every hand that touches it.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="quote-block">
            <Reveal>
              <p
                className="quote-text"
                style={{
                  fontSize: "clamp(1.4rem,3vw,2.2rem)",
                  maxWidth: 600,
                  margin: "0 auto 2rem",
                }}
              >
                "Soft on the skin. Strong in its legacy."
              </p>
              <div className="gold-vbar" />
            </Reveal>
          </div>
        </section>

        <div className="section-sep" />

        {/* ════════════════════════════════════════════════════════
            3 — EMBROIDERY
        ════════════════════════════════════════════════════════ */}
        <section ref={refs.embroidery} id="embroidery">
          {/* Hero */}
          <div className="hero-base">
            <Image
              src="/images/heron.jpeg"
              alt="Embroidery Craftsmanship"
              fill
              style={{ objectFit: "cover", opacity: 1 }}
              priority
            />
            <div
              className="hero-overlay"
              style={{
                background:
                  "linear-gradient(160deg, rgba(28,24,20,0.5) 0%, rgba(28,24,20,0.88) 100%)",
              }}
            />
            <div
              className="hero-overlay"
              style={{
                background:
                  "radial-gradient(ellipse at 35% 55%, rgba(196,168,130,0.06) 0%, transparent 65%)",
              }}
            />
            {/* Floating kantha circle */}
            <div
              style={{
                position: "absolute",
                right: "5%",
                top: "50%",
                transform: "translateY(-50%)",
                animation: "float 7s ease-in-out infinite",
                opacity: 0.35,
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="#C4A882"
                  strokeWidth="0.8"
                  strokeDasharray="3 5"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="58"
                  stroke="#C4A882"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="38"
                  stroke="#C4A882"
                  strokeWidth="0.8"
                  strokeDasharray="3 5"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="18"
                  stroke="#C4A882"
                  strokeWidth="1"
                />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
                  const r = (a * Math.PI) / 180;
                  return (
                    <line
                      key={i}
                      x1={100 + 20 * Math.cos(r)}
                      y1={100 + 20 * Math.sin(r)}
                      x2={100 + 56 * Math.cos(r)}
                      y2={100 + 56 * Math.sin(r)}
                      stroke="#C4A882"
                      strokeWidth="0.5"
                      strokeDasharray="2 4"
                    />
                  );
                })}
              </svg>
            </div>
            <div
              style={{
                position: "absolute",
                right: "-1rem",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "var(--fs)",
                fontSize: "clamp(8rem,20vw,16rem)",
                fontWeight: 300,
                color: "rgba(196,168,130,0.06)",
                lineHeight: 1,
                userSelect: "none",
                zIndex: 1,
              }}
            >
              03
            </div>

            <div className="hero-content">
              <div style={{ animation: "fadeUp 1s ease 0.2s both" }}>
                <span
                  className="sec-label"
                  style={{ color: "rgba(196,168,130,0.6)" }}
                >
                  Why Dhirago — 03
                </span>
              </div>
              <div
                style={{
                  animation: "fadeUp 1s ease 0.45s both",
                  maxWidth: 750,
                }}
              >
                <h2
                  className="hero-h1"
                  style={{
                    fontSize: "clamp(2rem,5.5vw,3.2rem)",
                    color: "#F5F0E8",
                    marginBottom: "2rem",
                  }}
                >
                  A Touch of
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "var(--gold)",
                      fontWeight: 100,
                    }}
                  >
                    Embroidery,
                  </em>
                  <br />a Shade of Elegance
                </h2>
              </div>
              <div
                style={{
                  animation: "fadeUp 1s ease 0.65s both",
                  maxWidth: 500,
                }}
              >
                <p
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(13px,1.5vw,15px)",
                    lineHeight: 1.9,
                    color: "rgba(245,240,232,0.5)",
                    textAlign: "justify",
                  }}
                >
                  Indigenous textile techniques and natural fabrics —
                  integrating time-honoured weaving practices into garments that
                  remain connected to tradition while expressed with a modern
                  sensibility.
                </p>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                borderTop: "1px solid rgba(196,168,130,0.12)",
                padding: "1.2rem clamp(1.5rem,5vw,5.5rem)",
                display: "flex",
                gap: "2.5rem",
                flexWrap: "wrap",
                zIndex: 3,
              }}
            >
              {["Sashiko", "Kantha", "Miniature Art", "Hand Painting"].map(
                (t, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "var(--fb)",
                      fontSize: 9,
                      letterSpacing: "0.4em",
                      textTransform: "uppercase",
                      color: "rgba(245,240,232,0.2)",
                    }}
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Marquee */}
          <div
            style={{
              background: "var(--gold)",
              padding: "1.1rem 0",
              overflow: "hidden",
            }}
          >
            <div className="mq-wrap">
              {[0, 1].map((c) => (
                <div key={c} className="mq-track">
                  {[
                    "Sashiko · Japan",
                    "Kantha · India",
                    "Miniature Art · Rajasthan",
                    "Hand Painting",
                    "Heritage Craft",
                    "Indigenous Textile",
                  ].map((t, i) => (
                    <span key={i} className="mq-item">
                      {t} &nbsp;·
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Techniques */}
          <div className="sec">
            <div className="inner">
              <div className="g2">
                <div>
                  <Reveal>
                    <span className="sec-label">The Techniques</span>
                  </Reveal>
                  {techniques.map((t, i) => (
                    <div
                      key={t.id}
                      className={`t-tab${activeTech === i ? " active" : ""}`}
                      onClick={() => setActiveTech(i)}
                    >
                      <div className="t-bar" />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "0.9rem",
                            marginBottom: "0.2rem",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--fb)",
                              fontSize: "0.7rem",
                              color: "rgba(160,136,112,0.5)",
                              fontWeight: 300,
                            }}
                          >
                            {t.num}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--fd)",
                              fontSize: "clamp(0.9rem,1.6vw,1.1rem)",
                              fontWeight: 400,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color:
                                activeTech === i
                                  ? "var(--dark)"
                                  : "rgba(28,24,20,0.28)",
                              transition: "color 0.3s",
                            }}
                          >
                            {t.name}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--fb)",
                              fontSize: 9,
                              letterSpacing: "0.3em",
                              textTransform: "uppercase",
                              color: "var(--muted)",
                              marginLeft: "auto",
                            }}
                          >
                            {t.origin}
                          </span>
                        </div>
                        {activeTech === i && (
                          <p
                            style={{
                              fontFamily: "var(--fb)",
                              fontSize: 11,
                              fontWeight: 300,
                              color: "#8B7060",
                              marginTop: "0.4rem",
                            }}
                          >
                            {t.tag}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sticky">
                  <Reveal>
                    <div
                      style={{
                        position: "relative",
                        border: "1px solid rgba(196,168,130,0.25)",
                        padding: "clamp(2rem,3vw,3.5rem)",
                        overflow: "hidden",
                        background: "rgba(196,168,130,0.04)",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          right: "-10px",
                          bottom: "-10px",
                          opacity: 0.12,
                        }}
                      >
                        <SashikoBg />
                        <SashikoBg />
                      </div>
                      <div style={{ position: "relative", zIndex: 2 }}>
                        <span
                          style={{
                            fontFamily: "var(--fb)",
                            fontSize: 9,
                            letterSpacing: "0.5em",
                            textTransform: "uppercase",
                            color: "var(--gold)",
                            display: "block",
                            marginBottom: "0.9rem",
                          }}
                        >
                          {techniques[activeTech].tag}
                        </span>
                        <h3
                          style={{
                            fontFamily: "var(--fd)",
                            fontSize: "clamp(1.4rem,3vw,2rem)",
                            fontWeight: 300,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--dark)",
                            marginBottom: "1.2rem",
                            lineHeight: 1.2,
                          }}
                        >
                          {techniques[activeTech].name}
                        </h3>
                        <p
                          style={{
                            fontSize: "clamp(13px,1.4vw,15px)",
                            fontWeight: 300,
                            lineHeight: 1.9,
                            color: "#4A4035",
                            textAlign: "justify",
                          }}
                        >
                          {techniques[activeTech].description}
                        </p>
                        <div
                          className="gold-bar"
                          style={{ marginTop: "1.8rem" }}
                        />
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>

          {/* Heritage */}
          <div className="sec" style={{ paddingTop: 0 }}>
            <div className="inner">
              <Reveal>
                <div
                  className="g-heritage"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gap: "clamp(2rem,4vw,4rem)",
                    marginBottom: "clamp(2.5rem,4vw,4rem)",
                  }}
                >
                  <div>
                    <span className="sec-label">Our Commitment</span>
                    <h3
                      style={{
                        fontFamily: "var(--fd)",
                        fontWeight: 100,
                        fontSize: "clamp(1.2rem,3vw,2.2rem)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--dark)",
                        lineHeight: 1.2,
                      }}
                    >
                      Preserving India's Textile{" "}
                      <em
                        style={{
                          fontStyle: "italic",
                          color: "#6B5040",
                          fontWeight: 200,
                        }}
                      >
                        Heritage
                      </em>
                    </h3>
                  </div>
                  <div>
                    <div
                      className="gold-bar"
                      style={{ marginBottom: "1.8rem" }}
                    />
                    <p
                      style={{
                        fontSize: "clamp(13px,1.4vw,15px)",
                        fontWeight: 300,
                        lineHeight: 1.9,
                        color: "#4A4035",
                        marginBottom: "1.2rem",
                        textAlign: "justify",
                      }}
                    >
                      These practices are deeply rooted in India's cultural
                      heritage, incorporated with sophistication and finesse —
                      garments that remain connected to tradition while
                      expressed with a modern sensibility.
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(13px,1.4vw,15px)",
                        fontWeight: 300,
                        lineHeight: 1.9,
                        color: "#4A4035",
                        textAlign: "justify",
                      }}
                    >
                      By continuing these techniques, Dhirago upholds its
                      commitment to preserving age-old craftsmanship and
                      celebrating India's rich textile legacy.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    height: "clamp(240px,38vw,440px)",
                  }}
                >
                  <Image
                    src="/images/heron.jpeg"
                    alt="Heritage Craft"
                    fill
                    style={{ objectFit: "cover", opacity: 0.6 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(28,24,20,0.45)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2rem",
                      left: "2rem",
                      right: "2rem",
                      zIndex: 2,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--fs)",
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "clamp(1rem,2.5vw,1.7rem)",
                        color: "#F5F0E8",
                        maxWidth: 460,
                        lineHeight: 1.45,
                      }}
                    >
                      "Detail is not an addition — it is a signature of the
                      piece."
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="section-sep" />

        {/* ════════════════════════════════════════════════════════
            4 — SUSTAINABILITY
        ════════════════════════════════════════════════════════ */}
        <section ref={refs.sustainability} id="sustainability">
          {/* Hero */}
          <div className="hero-base">
            <Image
              src="/images/heron.jpeg"
              alt="Sustainable Fashion"
              fill
              style={{ objectFit: "cover", opacity: 1 }}
              priority
            />
            <div
              className="hero-overlay"
              style={{
                background:
                  "linear-gradient(150deg, rgba(28,24,20,0.7) 0%, rgba(28,24,20,0.55) 45%, rgba(28,24,20,0.88) 100%)",
              }}
            />
            <div
              className="hero-overlay"
              style={{
                opacity: 0.04,
                backgroundImage:
                  "radial-gradient(circle,#C4A882 1px,transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            {/* Rotating ring */}
            <div
              style={{
                position: "absolute",
                top: "8%",
                right: "6%",
                animation: "spin 50s linear infinite",
                opacity: 0.2,
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <svg width="260" height="260" viewBox="0 0 260 260">
                {[36, 58, 80, 102].map((r) => (
                  <circle
                    key={r}
                    cx="130"
                    cy="130"
                    r={r}
                    stroke="#C4A882"
                    strokeWidth="0.6"
                    fill="none"
                    strokeDasharray={`${r * 0.22} ${r * 0.16}`}
                  />
                ))}
                <text
                  x="130"
                  y="134"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                  fontSize="8"
                  fill="#C4A882"
                  letterSpacing="4"
                >
                  SUSTAINABLE
                </text>
              </svg>
            </div>
            {/* Leaf decos */}
            <div
              style={{
                position: "absolute",
                top: "-5%",
                right: "2%",
                opacity: 0.15,
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <LeafSvg size={300} />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "15%",
                left: "-3%",
                opacity: 0.1,
                transform: "scaleX(-1) rotate(-18deg)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <LeafSvg size={220} />
            </div>
            <div
              style={{
                position: "absolute",
                right: "-1rem",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "var(--fs)",
                fontSize: "clamp(8rem,20vw,16rem)",
                fontWeight: 300,
                color: "rgba(196,168,130,0.06)",
                lineHeight: 1,
                userSelect: "none",
                zIndex: 1,
              }}
            >
              04
            </div>

            <div className="hero-content">
              <div style={{ animation: "fadeUp 1s ease 0.2s both" }}>
                <span
                  className="sec-label"
                  style={{ color: "rgba(196,168,130,0.6)" }}
                >
                  Dhirago — Conscious Commitment
                </span>
              </div>
              <div
                style={{
                  animation: "fadeUp 1s ease 0.45s both",
                  maxWidth: 820,
                  marginTop: "1.5rem",
                }}
              >
                <h2
                  className="hero-h1"
                  style={{
                    fontSize: "clamp(2.4rem,6vw,3.8rem)",
                    color: "#F5F0E8",
                    marginBottom: 0,
                  }}
                >
                  Representing
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "var(--gold)",
                      fontWeight: 100,
                    }}
                  >
                    Sustainable
                  </em>
                  <br />
                  Fashion
                </h2>
              </div>
              <div
                style={{
                  animation: "fadeUp 1s ease 0.6s both",
                  margin: "2.5rem 0",
                }}
              >
                <div className="gold-bar" />
              </div>
              <div
                style={{
                  animation: "fadeUp 1s ease 0.75s both",
                  display: "flex",
                  gap: "1.2rem",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { val: "100%", label: "Natural Fibres" },
                  { val: "↓78%", label: "Waste Reduced" },
                  { val: "∞", label: "Wearability" },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      border: "1px solid rgba(196,168,130,0.25)",
                      padding: "0.9rem 1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.3rem",
                      minWidth: 100,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--fd)",
                        fontSize: "clamp(1.2rem,2.5vw,1.8rem)",
                        fontWeight: 100,
                        color: "var(--gold)",
                        lineHeight: 1,
                      }}
                    >
                      {s.val}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--fb)",
                        fontSize: 9,
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        color: "rgba(245,240,232,0.35)",
                        margin: 0,
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div
            style={{
              background: "var(--gold)",
              padding: "1.1rem 0",
              overflow: "hidden",
            }}
          >
            <div className="mq-wrap">
              {[0, 1].map((c) => (
                <div key={c} className="mq-track">
                  {[
                    "Natural Fibres",
                    "Small-Batch Production",
                    "Zero Waste",
                    "Eco Packaging",
                    "Long-Term Wear",
                    "Conscious Luxury",
                  ].map((t, i) => (
                    <span key={i} className="mq-item">
                      {t} &nbsp;·
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Intro */}
          <div className="sec">
            <div className="inner">
              <div className="g2">
                <Reveal>
                  <h3
                    style={{
                      fontFamily: "var(--fd)",
                      fontWeight: 100,
                      fontSize: "clamp(1.3rem,3vw,2.4rem)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--dark)",
                      lineHeight: 1.25,
                    }}
                  >
                    Material choice,
                    <br />
                    controlled production,
                    <br />
                    <em
                      style={{
                        fontStyle: "italic",
                        color: "#6B5040",
                        fontWeight: 200,
                      }}
                    >
                      long-term wear.
                    </em>
                  </h3>
                </Reveal>
                <Reveal delay={150}>
                  <div
                    style={{
                      width: 1,
                      height: 56,
                      background:
                        "linear-gradient(to bottom, var(--gold), transparent)",
                      marginBottom: "1.8rem",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "clamp(14px,1.5vw,16px)",
                      fontWeight: 300,
                      lineHeight: 1.95,
                      color: "#4A4035",
                      marginBottom: "1.2rem",
                      textAlign: "justify",
                    }}
                  >
                    These three principles define sustainability at Dhirago —
                    not as a trend, not as a label, but as a quiet commitment
                    embedded in every decision from fibre selection to final
                    packaging.
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(14px,1.5vw,16px)",
                      fontWeight: 300,
                      lineHeight: 1.95,
                      color: "#4A4035",
                      textAlign: "justify",
                    }}
                  >
                    Operations are kept low-impact, with limited reliance on
                    heavy industrial methods and a preference for controlled,
                    resource-efficient techniques.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="sec" style={{ paddingTop: 0 }}>
            <div className="inner">
              <Reveal>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                    marginBottom: "clamp(2.5rem,5vw,4rem)",
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--fd)",
                      fontWeight: 100,
                      fontSize: "clamp(1.3rem,2.5vw,1.9rem)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--dark)",
                    }}
                  >
                    Impact{" "}
                    <em
                      style={{
                        fontStyle: "italic",
                        color: "#6B5040",
                        fontWeight: 200,
                      }}
                    >
                      Metrics
                    </em>
                  </h3>
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background:
                        "linear-gradient(to right, rgba(196,168,130,0.3), transparent)",
                      minWidth: 40,
                    }}
                  />
                </div>
              </Reveal>
              <div className="g2">
                <div>
                  <ProgressBar
                    label="Natural Fibre Usage"
                    value={100}
                    delay={0}
                  />
                  <ProgressBar
                    label="Rain-Fed Crop Sourcing"
                    value={100}
                    delay={150}
                  />
                  <ProgressBar
                    label="Waste Reduction vs Industry"
                    value={78}
                    delay={300}
                  />
                  <ProgressBar
                    label="Chemical-Free Cultivation"
                    value={95}
                    delay={450}
                  />
                  <ProgressBar
                    label="Recycled Material Integration"
                    value={62}
                    delay={600}
                  />
                </div>
                <div
                  style={{
                    border: "1px solid rgba(196,168,130,0.2)",
                    padding: "clamp(2rem,3vw,2.8rem)",
                    background: "rgba(196,168,130,0.04)",
                  }}
                >
                  <div className="g3" style={{ gap: "1.5rem" }}>
                    {[
                      {
                        val: "100%",
                        label: "Natural Fibres",
                        sub: "Linen & Organic Cotton",
                      },
                      {
                        val: "85%",
                        label: "Small Batch",
                        sub: "vs Mass Production",
                      },
                      {
                        val: "92%",
                        label: "Eco Packaging",
                        sub: "Reduced Impact",
                      },
                    ].map((c, i) => (
                      <Reveal key={i} delay={i * 200}>
                        <div style={{ textAlign: "center" }}>
                          <div
                            style={{
                              fontFamily: "var(--fd)",
                              fontSize: "clamp(1.6rem,3vw,2.2rem)",
                              fontWeight: 100,
                              color: "var(--dark)",
                              marginBottom: "0.4rem",
                            }}
                          >
                            {c.val}
                          </div>
                          <p
                            style={{
                              fontFamily: "var(--fd)",
                              fontSize: "0.7rem",
                              fontWeight: 400,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              color: "var(--dark)",
                              marginBottom: "0.2rem",
                            }}
                          >
                            {c.label}
                          </p>
                          <p
                            style={{
                              fontFamily: "var(--fb)",
                              fontSize: 10,
                              color: "var(--muted)",
                              fontWeight: 300,
                            }}
                          >
                            {c.sub}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="sec" style={{ paddingTop: 0 }}>
            <div className="inner">
              <Reveal>
                <h3
                  style={{
                    fontFamily: "var(--fd)",
                    fontWeight: 100,
                    fontSize: "clamp(1.3rem,2.5vw,2rem)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--dark)",
                    marginBottom: "clamp(2rem,4vw,3.5rem)",
                  }}
                >
                  Four Pillars of{" "}
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "#6B5040",
                      fontWeight: 100,
                    }}
                  >
                    Responsibility
                  </em>
                </h3>
              </Reveal>
              <div className="g4">
                {pillars.map((p, i) => (
                  <Reveal key={i} delay={i * 90}>
                    <div className="p-card">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "0.6rem",
                          marginBottom: "0.9rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--fb)",
                            fontSize: "0.7rem",
                            color: "rgba(196,168,130,0.4)",
                            fontWeight: 300,
                          }}
                        >
                          {p.num}
                        </span>
                        <h4
                          style={{
                            fontFamily: "var(--fd)",
                            fontSize: "clamp(0.82rem,1.4vw,0.96rem)",
                            fontWeight: 400,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--dark)",
                          }}
                        >
                          {p.title}
                        </h4>
                      </div>
                      <p
                        style={{
                          fontSize: "clamp(12px,1.3vw,13px)",
                          fontWeight: 300,
                          lineHeight: 1.85,
                          color: "#4A4035",
                          margin: 0,
                          textAlign: "justify",
                        }}
                      >
                        {p.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Closing */}
          <div className="quote-block" style={{ paddingBottom: "6rem" }}>
            <Reveal>
              <div className="gold-vbar" style={{ marginBottom: "2.5rem" }} />
              <span
                className="sec-label"
                style={{
                  textAlign: "center",
                  display: "block",
                  marginBottom: "0.8rem",
                }}
              >
                Dhirago · Conscious Luxury · Est. 2026
              </span>
              <p
                style={{
                  fontFamily: "var(--fs)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(1rem,2vw,1.35rem)",
                  letterSpacing: "0.04em",
                  color: "var(--muted)",
                }}
              >
                Quietly committed to the earth
              </p>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}

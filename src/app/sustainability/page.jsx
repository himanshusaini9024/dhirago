"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ─── Color Tokens ─────────────────────────────────────────────────────────────
// Dark bg:   #162518  (deep forest moss)
// Mid bg:    #1C2E1E  (mid canopy)
// Light bg:  #F0EBE0  (warm linen)
// Accent:    #8DB88A  (sage green)
// Gold:      #C4A882
// ─────────────────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
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
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(26px)",
      transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
      ...style
    }}>
      {children}
    </div>
  );
}

// ─── Animated progress bar ────────────────────────────────────────────────────
function ProgressBar({ label, value, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(12px, 1.4vw, 14px)", fontWeight: 400, color: "#F0EBE0", letterSpacing: "0.02em" }}>
          {label}
        </span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: "#8DB88A", fontWeight: 500 }}>
          {value}%
        </span>
      </div>
      <div style={{ height: 2, background: "rgba(240,235,224,0.1)", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: 0,
          height: "100%",
          width: visible ? `${value}%` : "0%",
          background: "linear-gradient(to right, #8DB88A, #C4A882)",
          transition: `width 1.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

// ─── Circular progress ────────────────────────────────────────────────────────
function CircleProgress({ value, label, sublabel, delay = 0 }) {
  const [ref, visible] = useReveal();
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = visible ? circ - (value / 100) * circ : circ;
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ position: "relative", width: 130, height: 130, margin: "0 auto 1.5rem" }}>
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r={r} stroke="rgba(240,235,224,0.08)" strokeWidth="3" fill="none" />
          <circle
            cx="65" cy="65" r={r}
            stroke="#8DB88A" strokeWidth="3" fill="none"
            strokeDasharray={circ} strokeDashoffset={dash}
            strokeLinecap="round"
            transform="rotate(-90 65 65)"
            style={{ transition: `stroke-dashoffset 2.2s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", fontWeight: 600, color: "#F0EBE0" }}>{value}%</span>
        </div>
      </div>
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", fontWeight: 600, color: "#F0EBE0", marginBottom: "0.4rem" }}>{label}</p>
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: "rgba(240,235,224,0.4)", fontWeight: 300, letterSpacing: "0.03em" }}>{sublabel}</p>
    </div>
  );
}

// ─── Leaf / botanical SVG decoration ─────────────────────────────────────────
function LeafDeco({ size = 200, opacity = 0.07 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ opacity }}>
      {/* Main leaf */}
      <path d="M100 180 C60 160 20 120 30 70 C40 20 100 10 100 10 C100 10 160 20 170 70 C180 120 140 160 100 180Z" stroke="#8DB88A" strokeWidth="1" />
      {/* Veins */}
      <line x1="100" y1="180" x2="100" y2="10" stroke="#8DB88A" strokeWidth="0.7" />
      {[0.25, 0.42, 0.58, 0.73].map((t, i) => {
        const y = 180 - t * 170;
        const spread = 28 + i * 8;
        return (
          <g key={i}>
            <path d={`M100 ${y} Q${100 - spread * 0.6} ${y - 12} ${100 - spread} ${y - 6}`} stroke="#8DB88A" strokeWidth="0.5" fill="none" />
            <path d={`M100 ${y} Q${100 + spread * 0.6} ${y - 12} ${100 + spread} ${y - 6}`} stroke="#8DB88A" strokeWidth="0.5" fill="none" />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Pillars data ─────────────────────────────────────────────────────────────
const pillars = [
  {
    num: "01",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4 C10 4 4 10 4 18 C4 26 10 32 18 32 C26 32 32 26 32 18" stroke="#8DB88A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 4 L26 12 L18 12" stroke="#8DB88A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="4" stroke="#8DB88A" strokeWidth="1.2" />
      </svg>
    ),
    title: "Natural Fibres",
    body: "Linen and organic cotton selected for biodegradability and lower environmental impact. Linen requires minimal irrigation and fewer chemical inputs — a low-resource fibre from the ground up.",
  },
  {
    num: "02",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="16" width="6" height="14" stroke="#8DB88A" strokeWidth="1.5" />
        <rect x="15" y="10" width="6" height="20" stroke="#8DB88A" strokeWidth="1.5" />
        <rect x="24" y="6" width="6" height="24" stroke="#8DB88A" strokeWidth="1.5" />
        <line x1="4" y1="32" x2="32" y2="32" stroke="#8DB88A" strokeWidth="1.2" />
      </svg>
    ),
    title: "Small-Batch Production",
    body: "Production follows a small-batch model — better control over quantities, reduced excess inventory. Fabric utilisation is carefully managed by minimising cutting waste through efficient pattern planning.",
  },
  {
    num: "03",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M8 28 L14 20 L20 24 L28 12" stroke="#8DB88A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 18 C4 10.3 10.3 4 18 4 C25.7 4 32 10.3 32 18 C32 25.7 25.7 32 18 32 C10.3 32 4 25.7 4 18" stroke="#8DB88A" strokeWidth="1.2" strokeDasharray="2 3" />
      </svg>
    ),
    title: "Zero-Waste Approach",
    body: "Recycled and leftover materials are incorporated wherever possible within the production cycle, reducing the need for new raw resources. Packaging is selected with consideration for reduced environmental impact.",
  },
  {
    num: "04",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 6 L18 30 M8 16 C8 16 12 22 18 22 C24 22 28 16 28 16" stroke="#8DB88A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 10 C12 10 14 14 18 14 C22 14 24 10 24 10" stroke="#8DB88A" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Long-Term Wearability",
    body: "Sustainability is defined by longevity. Garments designed to be worn for years, not seasons — quality that resists the pressure of disposability and grows better with each wearing.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SustainabilityPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap');

        @keyframes fadeUp   { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
        @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse    { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
        @keyframes shimmer  { 0% { background-position:-200% center; } 100% { background-position:200% center; } }

        /* Woven linen noise texture */
        .linen-texture {
          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23t)' opacity='0.04'/%3E%3C/svg%3E");
        }

        /* Forest texture for dark sections */
        .forest-texture {
          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)' opacity='0.05'/%3E%3C/svg%3E");
        }

        .pillar-card {
          padding: 2.5rem 2rem;
          border: 1px solid rgba(141,184,138,0.15);
          background: rgba(141,184,138,0.03);
          transition: border-color 0.4s ease, background 0.4s ease, transform 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .pillar-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 0;
          background: linear-gradient(to bottom, #8DB88A, #C4A882);
          transition: height 0.5s ease;
        }
        .pillar-card:hover {
          border-color: rgba(141,184,138,0.35);
          background: rgba(141,184,138,0.07);
          transform: translateY(-4px);
        }
        .pillar-card:hover::before { height: 100%; }

        .stat-tag {
          display: inline-block;
          border: 1px solid rgba(141,184,138,0.3);
          padding: 0.3rem 0.9rem;
          font-family: 'Syne', sans-serif;
          font-size: 9px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #8DB88A;
        }

        .gold-shimmer {
          background: linear-gradient(90deg, transparent, #C4A882, #E8D5B0, #C4A882, transparent);
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <div style={{ background: "#F0EBE0", color: "#1C1814", fontFamily: "'Syne', sans-serif", minHeight: "100vh" }}>

        {/* ══════════ HERO ══════════ */}
        {/* Deep forest moss with layered botanical atmosphere */}
        <section style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          background: "linear-gradient(150deg, #162518 0%, #1C2E1E 40%, #142215 100%)",
        }}>

          {/* Layered image — tinted green */}
          <Image
            src="/images/subscribe.jpg"
            alt="Sustainable Fashion"
            fill
            style={{ objectFit: "cover", opacity: 0.18, mixBlendMode: "luminosity" }}
            priority
          />

          {/* Forest-canopy gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(175deg, rgba(22,37,24,0.92) 0%, rgba(28,46,30,0.55) 45%, rgba(20,34,21,0.96) 100%)",
          }} />

          {/* Fine dot grid texture */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.06,
            backgroundImage: "radial-gradient(circle, #8DB88A 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }} />

          {/* Large leaf decorations */}
          <div style={{ position: "absolute", top: "-5%", right: "3%", opacity: 0.12 }}>
            <LeafDeco size={340} opacity={1} />
          </div>
          <div style={{ position: "absolute", bottom: "10%", left: "-3%", opacity: 0.08, transform: "scaleX(-1) rotate(-20deg)" }}>
            <LeafDeco size={240} opacity={1} />
          </div>

          {/* Rotating ring — forest green */}
          <div style={{ position: "absolute", top: "8%", right: "7%", animation: "rotateSlow 40s linear infinite", opacity: 0.18 }}>
            <svg width="280" height="280" viewBox="0 0 280 280">
              {[40, 65, 90, 115].map(r => (
                <circle key={r} cx="140" cy="140" r={r} stroke="#8DB88A" strokeWidth="0.6" fill="none"
                  strokeDasharray={`${r * 0.25} ${r * 0.18}`} />
              ))}
              <text x="140" y="144" textAnchor="middle" fontFamily="Syne" fontSize="9" fill="#8DB88A" letterSpacing="5">SUSTAINABLE</text>
            </svg>
          </div>

          {/* Horizontal rule with pulse */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent 0%, rgba(141,184,138,0.15) 30%, rgba(141,184,138,0.15) 70%, transparent 100%)",
          }} />

          {/* Main content */}
          <div style={{ position: "relative", zIndex: 2, padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 6rem)", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>

            {/* Eyebrow */}
            <div style={{ animation: "fadeUp 1s ease 0.2s both" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "#8DB88A", opacity: 0.8 }}>
                Dhirago — Conscious Commitment
              </span>
            </div>

            <div style={{ animation: "fadeUp 1s ease 0.45s both", maxWidth: 860, marginTop: "2rem" }}>
              <h1 style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontSize: "clamp(3rem, 7.5vw, 7rem)", lineHeight: 1.05, color: "#F0EBE0", marginBottom: 0 }}>
                Representing<br />
                <em style={{ fontStyle: "italic", color: "#8DB88A" }}>Sustainable</em><br />
                Fashion
              </h1>
            </div>

            {/* Divider rule */}
            <div style={{ animation: "fadeUp 1s ease 0.6s both", marginTop: "3rem", marginBottom: "3rem" }}>
              <div style={{ width: 48, height: 1, background: "linear-gradient(to right, #C4A882, transparent)" }} />
            </div>

            {/* Stats row — redesigned as bordered tags */}
            <div style={{ animation: "fadeUp 1s ease 0.75s both", display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
              {[
                { val: "100%", label: "Natural Fibres" },
                { val: "↓78%", label: "Waste Reduced" },
                { val: "∞", label: "Wearability" },
              ].map((s, i) => (
                <div key={i} style={{
                  border: "1px solid rgba(141,184,138,0.25)",
                  padding: "1rem 1.75rem",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
                  minWidth: 120,
                }}>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 400, color: "#8DB88A", lineHeight: 1 }}>{s.val}</div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(240,235,224,0.4)", margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagonal cut at bottom — clip path */}
          <div style={{
            position: "absolute", bottom: -2, left: 0, right: 0,
            height: 80,
            background: "#F0EBE0",
            clipPath: "polygon(0 80px, 100% 0, 100% 80px)",
          }} />
        </section>

        {/* ══════════ INTRO TEXT ══════════ */}
        {/* Warm linen with subtle woven texture */}
        <section className="linen-texture" style={{ padding: "clamp(5rem, 10vw, 9rem) 0 clamp(4rem, 8vw, 8rem)", background: "#F0EBE0", position: "relative" }}>

          {/* Large ghost numeral for editorial feel */}
          <div style={{
            position: "absolute", right: "4%", top: "10%",
            fontFamily: "'Lora', serif", fontSize: "clamp(8rem, 18vw, 18rem)",
            fontWeight: 400, color: "rgba(141,184,138,0.07)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
            letterSpacing: "-0.04em",
          }}>
            01
          </div>

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)", position: "relative", zIndex: 2 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "5rem", alignItems: "start" }}>
              <Reveal>
                <span className="stat-tag" style={{ marginBottom: "2rem", display: "inline-block" }}>Our Definition</span>
                <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#162518", lineHeight: 1.25, marginTop: "1.5rem" }}>
                  Material choice,<br />controlled production,<br /><em style={{ fontStyle: "italic", color: "#4A7248" }}>long-term wear.</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                {/* Vertical accent line */}
                <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, #8DB88A, transparent)", marginBottom: "2rem" }} />
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 300, lineHeight: 1.95, color: "#4A4035", marginBottom: "1.5rem" }}>
                  These three principles define sustainability at Dhirago. Not as a trend, not as a label — but as a quiet commitment embedded in every decision from fibre selection to final packaging.
                </p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 300, lineHeight: 1.95, color: "#4A4035" }}>
                  Operations are kept low-impact, with limited reliance on heavy industrial methods and a preference for controlled, resource-efficient techniques.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════ IMPACT METRICS ══════════ */}
        {/* Mid canopy green */}
        <section className="forest-texture" style={{
          padding: "clamp(5rem, 8vw, 8rem) 0",
          background: "linear-gradient(160deg, #1C2E1E 0%, #162518 60%, #1E3020 100%)",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Ghost numeral */}
          <div style={{
            position: "absolute", left: "-2%", bottom: "-5%",
            fontFamily: "'Lora', serif", fontSize: "clamp(8rem, 20vw, 22rem)",
            fontWeight: 400, color: "rgba(141,184,138,0.04)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
          }}>
            02
          </div>

          {/* Leaf deco */}
          <div style={{ position: "absolute", top: "-10%", right: "-2%", opacity: 0.08, transform: "rotate(15deg)" }}>
            <LeafDeco size={280} opacity={1} />
          </div>

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)", position: "relative", zIndex: 2 }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "clamp(3rem, 6vw, 5rem)", flexWrap: "wrap" }}>
                <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F0EBE0" }}>
                  Impact <em style={{ fontStyle: "italic", color: "#8DB88A" }}>Metrics</em>
                </h2>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(141,184,138,0.25), transparent)", minWidth: 60 }} />
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "5rem", alignItems: "start" }}>

              {/* Progress bars */}
              <div>
                <ProgressBar label="Natural Fibre Usage" value={100} delay={0} />
                <ProgressBar label="Rain-Fed Crop Sourcing" value={100} delay={150} />
                <ProgressBar label="Waste Reduction vs Industry" value={78} delay={300} />
                <ProgressBar label="Chemical-Free Cultivation" value={95} delay={450} />
                <ProgressBar label="Recycled Material Integration" value={62} delay={600} />
              </div>

              {/* Circle stats — in a card container */}
              <div style={{
                display: "flex", flexWrap: "wrap", gap: "2rem",
                justifyContent: "center",
                border: "1px solid rgba(141,184,138,0.12)",
                padding: "3rem 2rem",
                background: "rgba(141,184,138,0.04)",
              }}>
                <CircleProgress value={100} label="Natural Fibres" sublabel="Linen & Organic Cotton" delay={200} />
                <CircleProgress value={85} label="Small Batch" sublabel="vs Mass Production" delay={400} />
                <CircleProgress value={92} label="Eco Packaging" sublabel="Reduced Impact" delay={600} />
              </div>

            </div>
          </div>
        </section>

        {/* ══════════ FOUR PILLARS ══════════ */}
        {/* Warm linen — alternates back to light */}
        <section className="linen-texture" style={{ padding: "clamp(5rem, 8vw, 8rem) 0", background: "#EDE7D9", position: "relative", overflow: "hidden" }}>

          <div style={{
            position: "absolute", right: "-3%", top: "5%",
            fontFamily: "'Lora', serif", fontSize: "clamp(8rem, 20vw, 22rem)",
            fontWeight: 400, color: "rgba(141,184,138,0.06)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
          }}>03</div>

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)", position: "relative", zIndex: 2 }}>
            <Reveal>
              <span className="stat-tag" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Core Principles</span>
              <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#162518", marginTop: "1.2rem", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
                Four Pillars of <em style={{ fontStyle: "italic", color: "#4A7248" }}>Responsibility</em>
              </h2>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.5rem" }}>
              {pillars.map((p, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="pillar-card" style={{ background: "rgba(255,255,255,0.55)" }}>
                    <div style={{ marginBottom: "1.5rem" }}>{p.icon}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
                      <span style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", color: "rgba(74,114,72,0.4)" }}>{p.num}</span>
                      <h3 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1rem, 1.8vw, 1.2rem)", fontWeight: 500, color: "#162518" }}>{p.title}</h3>
                    </div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(12px, 1.3vw, 13px)", fontWeight: 300, lineHeight: 1.85, color: "#4A4035", margin: 0 }}>
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ IMAGE + QUOTE ══════════ */}
        {/* Deep forest with diagonal intro */}
        <section className="forest-texture" style={{
          padding: "clamp(5rem, 8vw, 8rem) 0",
          background: "linear-gradient(180deg, #162518 0%, #1C2E1E 100%)",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Diagonal cut at top */}
          <div style={{
            position: "absolute", top: -2, left: 0, right: 0,
            height: 80,
            background: "#EDE7D9",
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 80px)",
          }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)", position: "relative", zIndex: 2 }}>
            <Reveal>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src="/images/subscribe.jpg"
                  alt="Sustainable Craftsmanship"
                  width={1200} height={480}
                  style={{ width: "100%", height: "clamp(280px, 42vw, 480px)", objectFit: "cover", display: "block", opacity: 0.5 }}
                />
                {/* Forest-green tint overlay — cohesion with dark sections */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(22,37,24,0.88) 0%, rgba(22,37,24,0.15) 55%, rgba(22,37,24,0.7) 100%)" }} />

                <div style={{ position: "absolute", top: "50%", left: "clamp(2rem, 6vw, 5rem)", transform: "translateY(-50%)", maxWidth: 520 }}>
                  <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)", fontWeight: 400, color: "#F0EBE0", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                    "Sustainability is not a feature — it is the quiet discipline behind every decision we make."
                  </p>
                  <div style={{ width: 40, height: 1, background: "#8DB88A" }} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════ CLOSING ══════════ */}
        <section className="forest-texture" style={{
          padding: "clamp(4rem, 8vw, 7rem) 0",
          textAlign: "center",
          background: "linear-gradient(180deg, #1C2E1E 0%, #162518 100%)",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Leaf pair — centred */}
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.06 }}>
            <LeafDeco size={320} opacity={1} />
          </div>

          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2 }}>
            <Reveal>
              {/* Animated gold shimmer rule */}
              <div className="gold-shimmer" style={{ width: 1, height: 70, margin: "0 auto 3rem" }} />
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 400, fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#8DB88A", marginBottom: "1rem" }}>
                Dhirago · Conscious Luxury · Est. 2026
              </p>
              <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "rgba(240,235,224,0.35)", fontWeight: 400, marginTop: "0.5rem" }}>
                Quietly committed to the earth
              </p>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
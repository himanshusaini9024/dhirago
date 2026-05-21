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

function ProgressBar({ label, value, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
        <span className="font-futura" style={{ fontSize: "clamp(12px, 1.4vw, 14px)", fontWeight: 400, color: "#F0EBE0", letterSpacing: "0.02em" }}>
          {label}
        </span>
        <span className="font-futura" style={{ fontSize: 11, color: "#8DB88A", fontWeight: 500 }}>
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
          <span className="heading-font" style={{ fontSize: "1.4rem", fontWeight: 100, color: "#F0EBE0" }}>{value}%</span>
        </div>
      </div>
      <p className="heading-font" style={{ fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase", color: "#F0EBE0", marginBottom: "0.4rem" }}>{label}</p>
      <p className="font-futura" style={{ fontSize: 11, color: "rgba(240,235,224,0.4)", fontWeight: 100, letterSpacing: "0.03em" }}>{sublabel}</p>
    </div>
  );
}

function LeafDeco({ size = 200, opacity = 0.07 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ opacity }}>
      <path d="M100 180 C60 160 20 120 30 70 C40 20 100 10 100 10 C100 10 160 20 170 70 C180 120 140 160 100 180Z" stroke="#8DB88A" strokeWidth="1" />
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

export default function SustainabilityPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap');

        .heading-font { font-family: ${josefin.style.fontFamily}; }
        .font-futura  { font-family: "Century Gothic", Futura, "Trebuchet MS", sans-serif; }

        @keyframes fadeUp      { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
        @keyframes rotateSlow  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmer     { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
        @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }

        .linen-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23t)' opacity='0.04'/%3E%3C/svg%3E");
        }
        .forest-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)' opacity='0.05'/%3E%3C/svg%3E");
        }

        /* ── Pillar cards ─────────────────────────────────── */
        .pillar-card {
          padding: 2.5rem 2rem;
          border: 1px solid rgba(141,184,138,0.2);
          background: rgba(255,255,255,0.55);
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
        .pillar-card:hover { border-color: rgba(141,184,138,0.4); background: rgba(141,184,138,0.06); transform: translateY(-4px); }
        .pillar-card:hover::before { height: 100%; }

        .stat-tag {
          display: inline-block;
          border: 1px solid rgba(141,184,138,0.35);
          padding: 0.3rem 0.9rem;
          font-size: 9px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #4A7248;
        }

        .gold-shimmer {
          background: linear-gradient(90deg, transparent, #C4A882, #E8D5B0, #C4A882, transparent);
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }

        /* ── Responsive ─────────────────────────────────────── */
        .intro-grid   { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 5rem; align-items: start; }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 5rem; align-items: start; }
        .pillars-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 1.2rem; }
        .hero-stats   { display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center; }
        .hero-strip   { display: flex; gap: 4rem; flex-wrap: wrap; }

        @media (max-width: 768px) {
          .hero-stats { gap: 1rem; }
          .intro-grid, .metrics-grid { gap: 3rem; }
          .circles-box { padding: 2rem 1.5rem !important; }
        }

        @media (max-width: 540px) {
          .hero-strip  { gap: 2rem; }
        }

        @media (max-width: 400px) {
          .pillars-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ background: "#F0EBE0", color: "#1C1814", fontFamily: "'Century Gothic', Futura, 'Trebuchet MS', sans-serif", minHeight: "100vh" }}>

        {/* ══ HERO ════════════════════════════════════════════ */}
        <section style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          background: "linear-gradient(150deg, #162518 0%, #1C2E1E 40%, #142215 100%)",
        }}>
          <Image src="/images/subscribe.jpg" alt="Sustainable Fashion" fill style={{ objectFit: "cover", opacity: 0.18, mixBlendMode: "luminosity" }} priority />

          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(175deg, rgba(22,37,24,0.92) 0%, rgba(28,46,30,0.55) 45%, rgba(20,34,21,0.96) 100%)" }} />

          {/* Dot grid */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle, #8DB88A 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

          {/* Leaf decos */}
          <div style={{ position: "absolute", top: "-5%", right: "3%", opacity: 0.12, pointerEvents: "none" }}><LeafDeco size={340} opacity={1} /></div>
          <div style={{ position: "absolute", bottom: "10%", left: "-3%", opacity: 0.08, transform: "scaleX(-1) rotate(-20deg)", pointerEvents: "none" }}><LeafDeco size={240} opacity={1} /></div>

          {/* Rotating ring */}
          <div style={{ position: "absolute", top: "8%", right: "7%", animation: "rotateSlow 40s linear infinite", opacity: 0.18, pointerEvents: "none" }}>
            <svg width="280" height="280" viewBox="0 0 280 280">
              {[40, 65, 90, 115].map(r => (
                <circle key={r} cx="140" cy="140" r={r} stroke="#8DB88A" strokeWidth="0.6" fill="none" strokeDasharray={`${r * 0.25} ${r * 0.18}`} />
              ))}
              <text x="140" y="144" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill="#8DB88A" letterSpacing="5">SUSTAINABLE</text>
            </svg>
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2, padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 6rem)", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
            <div style={{ animation: "fadeUp 1s ease 0.2s both" }}>
              <span className="font-futura" style={{ fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "#8DB88A", opacity: 0.8 }}>
                Dhirago — Conscious Commitment
              </span>
            </div>

            <div style={{ animation: "fadeUp 1s ease 0.45s both", maxWidth: 860, marginTop: "2rem" }}>
              <h1 className="heading-font" style={{ fontWeight: 100, fontSize: "clamp(3rem, 7.5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "0.05em", color: "#F0EBE0", marginBottom: 0 }}>
                Representing<br />
                <em style={{ fontStyle: "italic", color: "#8DB88A", fontWeight: 200 }}>Sustainable</em><br />
                Fashion
              </h1>
            </div>

            <div style={{ animation: "fadeUp 1s ease 0.6s both", marginTop: "3rem", marginBottom: "3rem" }}>
              <div style={{ width: 48, height: 1, background: "linear-gradient(to right, #C4A882, transparent)" }} />
            </div>

            <div style={{ animation: "fadeUp 1s ease 0.75s both" }} className="hero-stats">
              {[
                { val: "100%", label: "Natural Fibres" },
                { val: "↓78%", label: "Waste Reduced" },
                { val: "∞", label: "Wearability" },
              ].map((s, i) => (
                <div key={i} style={{ border: "1px solid rgba(141,184,138,0.25)", padding: "1rem 1.75rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", minWidth: 110 }}>
                  <div className="heading-font" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 100, color: "#8DB88A", lineHeight: 1 }}>{s.val}</div>
                  <p className="font-futura" style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(240,235,224,0.4)", margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagonal cut */}
          <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 80, background: "#F0EBE0", clipPath: "polygon(0 80px, 100% 0, 100% 80px)" }} />
        </section>

        {/* ══ MARQUEE STRIP ═══════════════════════════════════ */}
        <section style={{ background: "#8DB88A", padding: "1.3rem 0", overflow: "hidden" }}>
          <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
            {[0, 1].map(clone => (
              <div key={clone} style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap", flexShrink: 0, paddingRight: "4rem", animation: "marqueeScroll 22s linear infinite" }}>
                {["Natural Fibres", "Small-Batch Production", "Zero Waste", "Eco Packaging", "Long-Term Wear", "Conscious Luxury"].map((t, i) => (
                  <span key={i} className="font-futura" style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "#162518", flexShrink: 0 }}>
                    {t} &nbsp;·
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ══ INTRO TEXT ══════════════════════════════════════ */}
        <section className="linen-texture" style={{ padding: "clamp(5rem, 10vw, 9rem) 0 clamp(4rem, 8vw, 8rem)", background: "#F0EBE0", position: "relative" }}>
          <div style={{ position: "absolute", right: "4%", top: "10%", fontFamily: "serif", fontSize: "clamp(8rem, 18vw, 18rem)", fontWeight: 400, color: "rgba(141,184,138,0.07)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>01</div>

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)", position: "relative", zIndex: 2 }}>
            <div className="intro-grid">
              <Reveal>
                <span className="font-futura stat-tag" style={{ marginBottom: "2rem", display: "inline-block" }}>Our Definition</span>
                <h2 className="heading-font" style={{ fontWeight: 100, fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#162518", lineHeight: 1.25, marginTop: "1.5rem" }}>
                  Material choice,<br />controlled production,<br />
                  <em style={{ fontStyle: "italic", color: "#4A7248", fontWeight: 200 }}>long-term wear.</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, #8DB88A, transparent)", marginBottom: "2rem" }} />
                <p className="font-futura" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", fontWeight: 100, lineHeight: 1.95, color: "#4A4035", marginBottom: "1.5rem", textAlign: "justify" }}>
                  These three principles define sustainability at Dhirago. Not as a trend, not as a label — but as a quiet commitment embedded in every decision from fibre selection to final packaging.
                </p>
                <p className="font-futura" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", fontWeight: 100, lineHeight: 1.95, color: "#4A4035", textAlign: "justify" }}>
                  Operations are kept low-impact, with limited reliance on heavy industrial methods and a preference for controlled, resource-efficient techniques.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ IMPACT METRICS ══════════════════════════════════ */}
        <section className="forest-texture" style={{ padding: "clamp(5rem, 8vw, 8rem) 0", background: "linear-gradient(160deg, #1C2E1E 0%, #162518 60%, #1E3020 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "-2%", bottom: "-5%", fontFamily: "serif", fontSize: "clamp(8rem, 20vw, 22rem)", fontWeight: 400, color: "rgba(141,184,138,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>02</div>
          <div style={{ position: "absolute", top: "-10%", right: "-2%", opacity: 0.08, transform: "rotate(15deg)", pointerEvents: "none" }}><LeafDeco size={280} opacity={1} /></div>

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)", position: "relative", zIndex: 2 }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "clamp(3rem, 6vw, 5rem)", flexWrap: "wrap" }}>
                <h2 className="heading-font" style={{ fontWeight: 100, fontSize: "clamp(2rem, 4vw, 2rem)", letterSpacing: "0.08em", textTransform: "uppercase", color: "#F0EBE0" }}>
                  Impact <em style={{ fontStyle: "italic", color: "#8DB88A", fontWeight: 200 }}>Metrics</em>
                </h2>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(141,184,138,0.25), transparent)", minWidth: 60 }} />
              </div>
            </Reveal>

            <div className="metrics-grid">
              <div>
                <ProgressBar label="Natural Fibre Usage" value={100} delay={0} />
                <ProgressBar label="Rain-Fed Crop Sourcing" value={100} delay={150} />
                <ProgressBar label="Waste Reduction vs Industry" value={78} delay={300} />
                <ProgressBar label="Chemical-Free Cultivation" value={95} delay={450} />
                <ProgressBar label="Recycled Material Integration" value={62} delay={600} />
              </div>

              <div className="circles-box" style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", border: "1px solid rgba(141,184,138,0.12)", padding: "3rem 2rem", background: "rgba(141,184,138,0.04)" }}>
                <CircleProgress value={100} label="Natural Fibres" sublabel="Linen & Organic Cotton" delay={200} />
                <CircleProgress value={85} label="Small Batch" sublabel="vs Mass Production" delay={400} />
                <CircleProgress value={92} label="Eco Packaging" sublabel="Reduced Impact" delay={600} />
              </div>
            </div>
          </div>
        </section>

        {/* ══ FOUR PILLARS ════════════════════════════════════ */}
        <section className="linen-texture" style={{ padding: "clamp(5rem, 8vw, 8rem) 0", background: "#EDE7D9", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: "-3%", top: "5%", fontFamily: "serif", fontSize: "clamp(8rem, 20vw, 22rem)", fontWeight: 400, color: "rgba(141,184,138,0.06)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>03</div>

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)", position: "relative", zIndex: 2 }}>
            <Reveal>
              <span className="font-futura stat-tag" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Core Principles</span>
              <h2 className="heading-font" style={{ fontWeight: 100, fontSize: "clamp(2rem, 2vw, 1rem)", letterSpacing: "0.01em", textTransform: "uppercase", color: "#162518", marginTop: "1.2rem", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
                Four Pillars of <em style={{ fontStyle: "italic", color: "#4A7248", fontWeight: 100 }}>Responsibility</em>
              </h2>
            </Reveal>

            <div className="pillars-grid">
              {pillars.map((p, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="pillar-card">
                    <div style={{ marginBottom: "1.5rem" }}>{p.icon}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
                      <span className="font-futura" style={{ fontSize: "0.8rem", color: "rgba(74,114,72,0.45)", fontWeight: 100 }}>{p.num}</span>
                      <h3 className="heading-font" style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#162518" }}>{p.title}</h3>
                    </div>
                    <p className="font-futura" style={{ textalign:"justify",fontSize: "clamp(15px, 1.3vw, 13px)", fontWeight: 100, lineHeight: 1.85, color: "#4A4035", margin: 0 }}>
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ IMAGE + QUOTE ════════════════════════════════════ */}
        <section className="forest-texture" style={{ padding: "clamp(5rem, 8vw, 8rem) 0", background: "linear-gradient(180deg, #162518 0%, #1C2E1E 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -2, left: 0, right: 0, height: 80, background: "#EDE7D9", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 80px)" }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)", position: "relative", zIndex: 2 }}>
            <Reveal>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Image src="/images/subscribe.jpg" alt="Sustainable Craftsmanship" width={1200} height={480} style={{ width: "100%", height: "clamp(280px, 42vw, 480px)", objectFit: "cover", display: "block", opacity: 0.5 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(22,37,24,0.88) 0%, rgba(22,37,24,0.15) 55%, rgba(22,37,24,0.7) 100%)" }} />
                <div style={{ position: "absolute", top: "50%", left: "clamp(2rem, 6vw, 5rem)", transform: "translateY(-50%)", maxWidth: 520 }}>
                  <p className="heading-font" style={{  fontWeight: 400, fontSize: "clamp(1.1rem, 0.99vw, 1.8rem)", letterSpacing: "0.03em", color: "#F0EBE0", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                    "Sustainability is not a feature — it is the quiet discipline behind every decision we make."
                  </p>
                  <div style={{ width: 40, height: 1, background: "#8DB88A" }} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ CLOSING ══════════════════════════════════════════ */}
        <section className="forest-texture" style={{ padding: "clamp(4rem, 8vw, 7rem) 0", textAlign: "center", background: "linear-gradient(180deg, #1C2E1E 0%, #162518 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.06, pointerEvents: "none" }}><LeafDeco size={320} opacity={1} /></div>

          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2 }}>
            <Reveal>
              <div className="gold-shimmer" style={{ width: 1, height: 70, margin: "0 auto 3rem" }} />
              <p className="font-futura" style={{ fontWeight: 400, fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#8DB88A", marginBottom: "1rem" }}>
                Dhirago · Conscious Luxury · Est. 2026
              </p>
              <p className="heading-font" style={{ fontStyle: "italic", fontWeight: 200, fontSize: "clamp(1rem, 2vw, 1.25rem)", letterSpacing: "0.04em", color: "rgba(240,235,224,0.35)", marginTop: "0.5rem" }}>
                Quietly committed to the earth
              </p>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
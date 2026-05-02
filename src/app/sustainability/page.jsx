"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

// Animated progress bar
function ProgressBar({ label, value, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(12px, 1.4vw, 14px)", fontWeight: 400, color: "#F5F0E8", letterSpacing: "0.02em" }}>
          {label}
        </span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: "#8DB88A", fontWeight: 400 }}>
          {value}%
        </span>
      </div>
      <div style={{ height: 2, background: "rgba(245,240,232,0.1)", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          height: "100%",
          width: visible ? `${value}%` : "0%",
          background: "linear-gradient(to right, #8DB88A, #C4A882)",
          transition: `width 1.6s ease ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

// Circular progress
function CircleProgress({ value, label, sublabel, delay = 0 }) {
  const [ref, visible] = useReveal();
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = visible ? circ - (value / 100) * circ : circ;

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ position: "relative", width: 130, height: 130, margin: "0 auto 1.5rem" }}>
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r={r} stroke="rgba(245,240,232,0.08)" strokeWidth="3" fill="none" />
          <circle
            cx="65" cy="65" r={r}
            stroke="#8DB88A"
            strokeWidth="3"
            fill="none"
            strokeDasharray={circ}
            strokeDashoffset={dash}
            strokeLinecap="round"
            transform="rotate(-90 65 65)"
            style={{ transition: `stroke-dashoffset 2s ease ${delay}ms` }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", fontWeight: 600, color: "#F5F0E8" }}>{value}%</span>
        </div>
      </div>
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.4rem" }}>{label}</p>
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: "rgba(245,240,232,0.4)", fontWeight: 300, letterSpacing: "0.03em" }}>{sublabel}</p>
    </div>
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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
        @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .pillar-card {
          padding: 3rem 2.5rem;
          border: 1px solid rgba(141,184,138,0.15);
          transition: border-color 0.4s, background 0.4s;
        }
        .pillar-card:hover {
          border-color: rgba(141,184,138,0.4);
          background: rgba(141,184,138,0.04);
        }
      `}</style>

      <div style={{ background: "#0B0F0B", color: "#F5F0E8", fontFamily: "'Syne', sans-serif", minHeight: "100vh" }}>

        {/* HERO */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
          <Image src="/images/subscribe.jpg" alt="Sustainable Fashion" fill style={{ objectFit: "cover", opacity: 0.25 }} priority />

          {/* Green gradient overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(11,15,11,0.9) 0%, rgba(20,32,20,0.6) 50%, rgba(11,15,11,0.95) 100%)" }} />

          {/* Rotating circle */}
          <div style={{ position: "absolute", top: "8%", right: "8%", animation: "rotateSlow 30s linear infinite", opacity: 0.15 }}>
            <svg width="300" height="300" viewBox="0 0 300 300">
              {[30, 50, 70, 90, 110, 130].map(r => (
                <circle key={r} cx="150" cy="150" r={r} stroke="#8DB88A" strokeWidth="0.5" fill="none" strokeDasharray={`${r * 0.3} ${r * 0.15}`} />
              ))}
              <text x="150" y="155" textAnchor="middle" fontFamily="Syne" fontSize="10" fill="#8DB88A" letterSpacing="4">SUSTAINABLE</text>
            </svg>
          </div>

          <div style={{ position: "relative", zIndex: 2, padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 6rem)", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
            
            <div style={{ animation: "fadeUp 1s ease 0.5s both" }}>
              <h1 style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontSize: "clamp(3rem, 7.5vw, 7rem)", lineHeight: 1.05, color: "#F5F0E8", marginBottom: "2.5rem", maxWidth: 900 }}>
                Representing<br /><em style={{ fontStyle: "italic", color: "#8DB88A" }}>Sustainable</em><br />Fashion
              </h1>
            </div>
            <div style={{ animation: "fadeUp 1s ease 0.7s both", display: "flex", gap: "4rem", flexWrap: "wrap" }}>
              {[
                { val: "100%", label: "Natural Fibres" },
                { val: "↓", label: "Waste Reduced" },
                { val: "∞", label: "Wearability" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "2rem", fontWeight: 400, color: "#8DB88A", marginBottom: "0.25rem" }}>{s.val}</div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTRO TEXT */}
        <section style={{ padding: "clamp(4rem, 8vw, 8rem) 0", background: "#0E130E" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "4rem", alignItems: "center" }}>
              <Reveal>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 400, fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#8DB88A", marginBottom: "2rem" }}>
                  Our Definition
                </p>
                <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#F5F0E8", lineHeight: 1.25 }}>
                  Material choice,<br />controlled production,<br /><em style={{ fontStyle: "italic", color: "#8DB88A" }}>long-term wear.</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <div style={{ width: 1, height: 80, background: "linear-gradient(to bottom, #8DB88A, transparent)", marginBottom: "2rem" }} />
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 300, lineHeight: 1.9, color: "rgba(245,240,232,0.55)", marginBottom: "1.5rem" }}>
                  These three principles define sustainability at Dhirago. Not as a trend, not as a label — but as a quiet commitment embedded in every decision from fibre selection to final packaging.
                </p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 300, lineHeight: 1.9, color: "rgba(245,240,232,0.55)" }}>
                  Operations are kept low-impact, with limited reliance on heavy industrial methods and a preference for controlled, resource-efficient techniques.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* IMPACT METRICS */}
        <section style={{ padding: "clamp(4rem, 8vw, 8rem) 0", background: "#0B0F0B" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>
            <Reveal>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 400, fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#8DB88A", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
                Impact Metrics
              </p>
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

              {/* Circle stats */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
                <CircleProgress value={100} label="Natural Fibres" sublabel="Linen & Organic Cotton" delay={200} />
                <CircleProgress value={85} label="Small Batch" sublabel="vs Mass Production" delay={400} />
                <CircleProgress value={92} label="Eco Packaging" sublabel="Reduced Impact" delay={600} />
              </div>

            </div>
          </div>
        </section>

        {/* FOUR PILLARS */}
        <section style={{ padding: "clamp(4rem, 8vw, 8rem) 0", background: "#0E130E" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>
            <Reveal>
              <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F5F0E8", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
                Four Pillars of <em style={{ fontStyle: "italic", color: "#8DB88A" }}>Responsibility</em>
              </h2>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.5rem" }}>
              {pillars.map((p, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="pillar-card">
                    <div style={{ marginBottom: "1.5rem" }}>{p.icon}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
                      <span style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", color: "rgba(141,184,138,0.4)" }}>{p.num}</span>
                      <h3 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1rem, 1.8vw, 1.25rem)", fontWeight: 400, color: "#F5F0E8" }}>{p.title}</h3>
                    </div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(12px, 1.3vw, 13px)", fontWeight: 300, lineHeight: 1.85, color: "rgba(245,240,232,0.5)", margin: 0 }}>
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGE + CLOSING QUOTE */}
        <section style={{ padding: "clamp(4rem, 8vw, 8rem) 0", background: "#0B0F0B" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>
            <Reveal>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Image src="/images/subscribe.jpg" alt="Sustainable Craftsmanship" width={1200} height={480} style={{ width: "100%", height: "clamp(280px, 42vw, 480px)", objectFit: "cover", display: "block", opacity: 0.55 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(11,15,11,0.85) 0%, rgba(11,15,11,0.2) 60%, rgba(11,15,11,0.7) 100%)" }} />
                <div style={{ position: "absolute", top: "50%", left: "clamp(2rem, 6vw, 5rem)", transform: "translateY(-50%)", maxWidth: 520 }}>
                  <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)", fontWeight: 400, color: "#F5F0E8", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                    "Sustainability is not a feature — it is the quiet discipline behind every decision we make."
                  </p>
                  <div style={{ width: 40, height: 1, background: "#8DB88A" }} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CLOSING */}
        <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0", textAlign: "center", background: "#0E130E" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 2rem" }}>
            <Reveal>
              <div style={{ width: 1, height: 70, background: "linear-gradient(to bottom, #8DB88A, transparent)", margin: "0 auto 3rem" }} />
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 400, fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#8DB88A" }}>
                Dhirago · Conscious Luxury · Est. 2026
              </p>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ─── Color tokens ─────────────────────────────────────────────────────────────
// Dark sections: deep indigo #1F1D3A → #252345 (replaces #1C1814 black)
// Light sections: warm parchment #F0EBE0 (as requested)
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
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
      ...style
    }}>
      {children}
    </div>
  );
}

// ─── Decorative patterns ──────────────────────────────────────────────────────
function SashikoPattern({ size = 120, opacity = 0.12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" style={{ opacity }}>
      {[10, 30, 50, 70, 90, 110].map(y => (
        <line key={`h${y}`} x1="0" y1={y} x2="120" y2={y} stroke="#C4A882" strokeWidth="1" strokeDasharray="6 4" />
      ))}
      {[10, 30, 50, 70, 90, 110].map(x => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="120" stroke="#C4A882" strokeWidth="1" strokeDasharray="6 4" />
      ))}
      {[30, 70, 110].map(x => [30, 70, 110].map(y => (
        <circle key={`d${x}${y}`} cx={x} cy={y} r="3" stroke="#C4A882" strokeWidth="1" fill="none" />
      )))}
    </svg>
  );
}

function KanthaPattern({ opacity = 0.1 }) {
  return (
    <svg width={200} height={200} viewBox="0 0 200 200" fill="none" style={{ opacity }}>
      <circle cx="100" cy="100" r="80" stroke="#C4A882" strokeWidth="0.8" strokeDasharray="3 5" />
      <circle cx="100" cy="100" r="60" stroke="#C4A882" strokeWidth="0.8" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="40" stroke="#C4A882" strokeWidth="0.8" strokeDasharray="3 5" />
      <circle cx="100" cy="100" r="20" stroke="#C4A882" strokeWidth="1" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 22 * Math.cos(rad);
        const y1 = 100 + 22 * Math.sin(rad);
        const x2 = 100 + 78 * Math.cos(rad);
        const y2 = 100 + 78 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C4A882" strokeWidth="0.7" strokeDasharray="2 4" />;
      })}
    </svg>
  );
}

const techniques = [
  {
    id: "sashiko",
    num: "01",
    name: "Sashiko",
    origin: "Japan",
    tag: "Reinforcement Stitching",
    description: "A Japanese hand-stitching tradition of repetitive reinforcement stitching — applied through controlled, manual execution to create both structural strength and rhythmic visual pattern. Each line of stitching is intentional, spaced, and precise.",
    detail: "Sashiko through repetitive reinforcement stitching ensures precision and consistency across construction — where the technique becomes the texture.",
    pattern: <SashikoPattern size={160} opacity={0.25} />,
  },
  {
    id: "kantha",
    num: "02",
    name: "Kantha",
    origin: "India",
    tag: "Running Stitch Embroidery",
    description: "Rooted in the Bengali tradition of layered running stitches, Kantha is applied with control and intent. Each pass of the needle creates a surface that breathes — textured, warm, and alive with the motion of the hand that made it.",
    detail: "Kantha through layered running stitches ensures that every surface tells the story of its making — a tradition carried forward in every piece.",
    pattern: <KanthaPattern opacity={0.2} />,
  },
  {
    id: "miniature",
    num: "03",
    name: "Miniature Art",
    origin: "Rajasthan",
    tag: "Hand-Painted Motifs",
    description: "Drawing from the tradition of Rajasthani miniature painting, every motif on a Dhirago garment is created entirely by hand. No two are identical — each carries the subtle variation of the artist's hand, making every piece a singular work.",
    detail: "Exquisite craftsmanship meets material excellence — where detail is not an addition, but a signature of the piece.",
    pattern: (
      <svg width={160} height={160} viewBox="0 0 160 160" fill="none" style={{ opacity: 0.2 }}>
        <rect x="40" y="40" width="80" height="80" stroke="#C4A882" strokeWidth="0.8" />
        <rect x="50" y="50" width="60" height="60" stroke="#C4A882" strokeWidth="0.6" transform="rotate(15 80 80)" />
        <rect x="55" y="55" width="50" height="50" stroke="#C4A882" strokeWidth="0.5" transform="rotate(-15 80 80)" />
        <circle cx="80" cy="80" r="15" stroke="#C4A882" strokeWidth="0.8" />
        <circle cx="80" cy="80" r="5" fill="#C4A882" />
        {[0, 60, 120, 180, 240, 300].map((a, i) => {
          const r = (a * Math.PI) / 180;
          return <line key={i} x1={80 + 18 * Math.cos(r)} y1={80 + 18 * Math.sin(r)} x2={80 + 38 * Math.cos(r)} y2={80 + 38 * Math.sin(r)} stroke="#C4A882" strokeWidth="0.6" />;
        })}
      </svg>
    ),
  },
];

export default function EmbroideryPage() {
  const [active, setActive] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Mulish:wght@200;300;400;600&display=swap');

        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(35px); } to { opacity:1; transform:translateY(0); } }

        .tech-tab {
          padding: 1.2rem 0;
          border-bottom: 1px solid rgba(245,240,232,0.1);
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .tech-tab:hover .tech-tab-name { color: #F5F0E8; }
        .tech-tab-indicator { width: 3px; height: 0; background: #C4A882; transition: height 0.4s; flex-shrink: 0; }
        .tech-tab.active .tech-tab-indicator { height: 2.5rem; }
        .tech-tab.active .tech-tab-name { color: #F5F0E8; }
      `}</style>

      <div style={{ background: "#F0EBE0", color: "#1C1814", fontFamily: "'Mulish', sans-serif", minHeight: "100vh" }}>

        {/* ══════════ HERO ══════════ */}
        {/* Deep indigo replaces near-black: richer, more distinguished */}
        <section style={{
          position: "relative",
          minHeight: "100vh",
          display: "grid",
          gridTemplateRows: "1fr auto",
          background: "linear-gradient(155deg, #000000 0%, #000000 55%, #000000 100%)",
          overflow: "hidden",
        }}>

          {/* Subtle noise texture */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* Background stitch grid */}
          <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "repeat(6, 1fr)", opacity: 0.04, zIndex: 1 }}>
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <SashikoPattern size={80} opacity={1} />
              </div>
            ))}
          </div>

          {/* Radial glow — warm gold from centre */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 30% 55%, rgba(196,168,130,0.06) 0%, transparent 60%)",
            pointerEvents: "none", zIndex: 1,
          }} />

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(4rem, 8vw, 7rem) clamp(2rem, 5vw, 6rem)", zIndex: 2, paddingBottom: "2rem" }}>
            <div style={{ animation: "fadeUp 1s ease 0.5s both", maxWidth: 900 }}>
              <h1 style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400, fontSize: "clamp(3rem, 7vw, 6.5rem)", lineHeight: 1.05, color: "#ffffff", marginBottom: "1.5rem" }}>
                A Touch of<br /><em style={{ fontStyle: "italic", color: "#fffdfd" }}>Embroidery,</em><br />a Shade of Elegance
              </h1>
            </div>
            <div style={{ animation: "fadeUp 1s ease 0.7s both" }}>
              <p style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 300, fontSize: "clamp(13px, 1.5vw, 16px)", lineHeight: 1.9, color: "rgba(255, 255, 255, 0.55)", maxWidth: 560 }}>
                Indigenous textile techniques and natural fabrics — integrating time-honoured weaving practices into garments that remain connected to tradition while expressed with a modern sensibility.
              </p>
            </div>
          </div>

          {/* Floating Kantha pattern */}
          <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", animation: "float 6s ease-in-out infinite", opacity: 0.6, zIndex: 1 }}>
            <KanthaPattern opacity={0.35} />
          </div>

          {/* Bottom technique strip */}
          <div style={{ borderTop: "1px solid rgba(196,168,130,0.2)", padding: "2rem clamp(2rem, 5vw, 6rem)", display: "flex", gap: "4rem", zIndex: 2, flexWrap: "wrap" }}>
            {["Sashiko", "Kantha", "Miniature Art", "Hand Painting"].map((t, i) => (
              <span key={i} style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 200, fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)" }}>
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ══════════ TECHNIQUES ══════════ */}
        {/* Mid indigo — slightly lighter than hero for depth separation */}
        <section style={{
          padding: "clamp(4rem, 8vw, 8rem) 0",
          background: "linear-gradient(180deg, #232140 0%, #1E1C3A 100%)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "5rem", alignItems: "start" }}>

              {/* Left — tab list */}
              <div>
                <Reveal>
                  <p style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 200, fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#C4A882", marginBottom: "2.5rem" }}>
                    The Techniques
                  </p>
                </Reveal>
                {techniques.map((t, i) => (
                  <div
                    key={t.id}
                    className={`tech-tab${active === i ? " active" : ""}`}
                    onClick={() => setActive(i)}
                  >
                    <div className="tech-tab-indicator" />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.3rem" }}>
                        <span style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.85rem", color: "rgba(196,168,130,0.5)" }}>{t.num}</span>
                        <span className="tech-tab-name" style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: active === i ? "#F5F0E8" : "rgba(245,240,232,0.45)", transition: "color 0.3s" }}>
                          {t.name}
                        </span>
                        <span style={{ fontFamily: "'Mulish', sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(196,168,130,0.5)", marginLeft: "auto" }}>
                          {t.origin}
                        </span>
                      </div>
                      {active === i && (
                        <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: "clamp(12px, 1.3vw, 13px)", fontWeight: 300, lineHeight: 1.8, color: "rgba(245,240,232,0.45)", marginTop: "0.75rem", marginBottom: 0, paddingBottom: "0.5rem" }}>
                          {t.tag}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right — detail panel */}
              <div style={{ position: "sticky", top: "6rem" }}>
                <Reveal>
                  <div style={{
                    position: "relative",
                    border: "1px solid rgba(196,168,130,0.15)",
                    padding: "3.5rem",
                    overflow: "hidden",
                    minHeight: 360,
                    background: "rgba(255,255,255,0.03)", /* very subtle inset lift */
                  }}>
                    {/* Background pattern */}
                    <div style={{ position: "absolute", right: "-20px", bottom: "-20px" }}>
                      {techniques[active].pattern}
                    </div>
                    <div style={{ position: "relative", zIndex: 2 }}>
                      <span style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 200, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "#C4A882", display: "block", marginBottom: "1rem" }}>
                        {techniques[active].tag}
                      </span>
                      <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400, color: "#F5F0E8", marginBottom: "1.5rem", lineHeight: 1.2 }}>
                        {techniques[active].name}
                      </h3>
                      <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: "clamp(13px, 1.4vw, 15px)", fontWeight: 300, lineHeight: 1.9, color: "rgba(245,240,232,0.55)", marginBottom: "1.5rem" }}>
                        {techniques[active].description}
                      </p>
                      <div style={{ width: 30, height: 1, background: "#C4A882", marginTop: "2rem" }} />
                    </div>
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════ HERITAGE STATEMENT ══════════ */}
        {/* Warm parchment as requested */}
        <section style={{ padding: "clamp(4rem, 8vw, 8rem) 0", background: "#F0EBE0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>

            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
                <div>
                  <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#B09880", marginBottom: "1.5rem" }}>
                    Our Commitment
                  </p>
                  <h2 style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1C1814", lineHeight: 1.2 }}>
                    Preserving India&apos;s Textile <em style={{ fontStyle: "italic", color: "#6B5040" }}>Heritage</em>
                  </h2>
                </div>
                <div>
                  <div style={{ width: 40, height: 1, background: "#C4A882", marginBottom: "2rem" }} />
                  <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: "clamp(13px, 1.5vw, 16px)", fontWeight: 300, lineHeight: 1.9, color: "#4A4035", marginBottom: "1.5rem" }}>
                    These practices are deeply rooted in India&apos;s cultural heritage, incorporated with sophistication and finesse, creating garments that remain connected to tradition while expressed with a modern sensibility and quiet artistry.
                  </p>
                  <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: "clamp(13px, 1.5vw, 16px)", fontWeight: 300, lineHeight: 1.9, color: "#4A4035" }}>
                    By continuing these techniques, Dhirago upholds its commitment to preserving age-old craftsmanship and celebrating India&apos;s rich textile legacy — presenting ethical and heritage-driven making as a form of true luxury.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Full-width image */}
            <Reveal>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Image src="/images/subscribe.jpg" alt="Heritage Craft" width={1200} height={500} style={{ width: "100%", height: "clamp(280px, 45vw, 500px)", objectFit: "cover", display: "block" }} />
                {/* Indigo-tinted overlay for brand cohesion */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(30,26,55,0.40)" }} />
                <div style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem" }}>
                  <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#F5F0E8", maxWidth: 500, lineHeight: 1.4 }}>
                    "Detail is not an addition — it is a signature of the piece."
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

      </div>
    </>
  );
}
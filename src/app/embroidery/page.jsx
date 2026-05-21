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
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
      ...style
    }}>
      {children}
    </div>
  );
}

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
        return <line key={i} x1={100 + 22 * Math.cos(rad)} y1={100 + 22 * Math.sin(rad)} x2={100 + 78 * Math.cos(rad)} y2={100 + 78 * Math.sin(rad)} stroke="#C4A882" strokeWidth="0.7" strokeDasharray="2 4" />;
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .heading-font { font-family: ${josefin.style.fontFamily}; }
        .font-futura  { font-family: "Century Gothic", Futura, "Trebuchet MS", sans-serif; }

        @keyframes float  { 0%,100% { transform: translateY(-50%) translateX(0); } 50% { transform: translateY(calc(-50% - 12px)) translateX(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(35px); } to { opacity:1; transform:translateY(0); } }
        @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }

        /* ── Technique tabs ─────────────────────────────────── */
        .tech-tab {
          padding: 1.2rem 0;
          border-bottom: 1px solid rgba(28,24,20,0.1);
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .tech-tab:first-of-type { border-top: 1px solid rgba(28,24,20,0.1); }
        .tech-tab:hover .tech-tab-name  { color: #1C1814; }
        .tech-tab-indicator { width: 3px; height: 0; background: #C4A882; transition: height 0.4s; flex-shrink: 0; }
        .tech-tab.active .tech-tab-indicator { height: 2.5rem; }
        .tech-tab.active .tech-tab-name  { color: #1C1814; }

        /* ── Responsive ─────────────────────────────────────── */
        .techniques-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        .heritage-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 5rem;
          align-items: start;
          margin-bottom: clamp(3rem, 6vw, 5rem);
        }
        .sticky-panel { position: sticky; top: 6rem; }

        @media (max-width: 900px) {
          .techniques-grid { grid-template-columns: 1fr; gap: 3rem; }
          .heritage-grid   { grid-template-columns: 1fr; gap: 2.5rem; }
          .sticky-panel    { position: relative; top: unset; }
          .hero-strip      { gap: 2.5rem !important; }
        }

        @media (max-width: 600px) {
          .hero-strip      { gap: 2rem !important; }
          .tech-panel      { padding: 2rem !important; }
          .hero-heading    { font-size: clamp(2.2rem, 10vw, 3.5rem) !important; }
        }
      `}</style>

      <div style={{ background: "#FAFAF7", color: "#1C1814", fontFamily: "'Century Gothic', Futura, 'Trebuchet MS', sans-serif", minHeight: "100vh" }}>

        {/* ══ HERO ════════════════════════════════════════════ */}
        <section style={{
          position: "relative",
          minHeight: "100vh",
          display: "grid",
          gridTemplateRows: "1fr auto",
          background: "#000",
          overflow: "hidden",
        }}>
          {/* Background stitch grid */}
          <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "repeat(6, 1fr)", opacity: 0.04, zIndex: 1, pointerEvents: "none" }}>
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <SashikoPattern size={80} opacity={1} />
              </div>
            ))}
          </div>

          {/* Radial warm glow */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 55%, rgba(196,168,130,0.07) 0%, transparent 60%)", pointerEvents: "none", zIndex: 1 }} />

          {/* Hero content */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(4rem, 8vw, 7rem) clamp(2rem, 5vw, 6rem)", zIndex: 2, paddingBottom: "2rem" }}>
            <div style={{ animation: "fadeUp 1s ease 0.5s both", maxWidth: 900 }}>
              <p className="font-futura" style={{ fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#C4A882", marginBottom: "2rem", fontWeight: 400 }}>
                Why Dhirago — 03
              </p>
              <h1 className="heading-font hero-heading" style={{ fontWeight: 100, fontSize: "clamp(1.8rem, 7vw, 3rem)", lineHeight: 1.05, letterSpacing: "0.05em", color: "#F5F0E8", marginBottom: "2rem" }}>
                A Touch of<br />
                <em style={{ fontStyle: "italic", color: "#D4B896", fontWeight: 100 }}>Embroidery,</em><br />
                a Shade of Elegance
              </h1>
            </div>
            <div style={{ animation: "fadeUp 1s ease 0.7s both" }}>
              <p className="font-futura" style={{ fontWeight: 100, fontSize: "clamp(23px, 1.5vw, 25px)", lineHeight: 1.9, color: "rgba(245,240,232,0.6)", maxWidth: 520, textAlign: "justify" }}>
                Indigenous textile techniques and natural fabrics — integrating time-honoured weaving practices into garments that remain connected to tradition while expressed with a modern sensibility.
              </p>
            </div>
          </div>

          {/* Floating Kantha */}
          <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", animation: "float 6s ease-in-out infinite", opacity: 0.5, zIndex: 1, pointerEvents: "none" }}>
            <KanthaPattern opacity={0.35} />
          </div>

          {/* Bottom strip */}
          <div style={{ borderTop: "1px solid rgba(196,168,130,0.2)", padding: "1.8rem clamp(2rem, 5vw, 6rem)", display: "flex", gap: "4rem", zIndex: 2, flexWrap: "wrap" }} className="hero-strip">
            {["Sashiko", "Kantha", "Miniature Art", "Hand Painting"].map((t, i) => (
              <span key={i} className="font-futura" style={{ fontWeight: 300, fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ══ MARQUEE STRIP ═══════════════════════════════════ */}
        <section style={{ background: "#C4A882", padding: "1.3rem 0", overflow: "hidden" }}>
          <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
            {[0, 1].map(clone => (
              <div key={clone} style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap", flexShrink: 0, paddingRight: "4rem", animation: "marqueeScroll 22s linear infinite" }}>
                {["Sashiko · Japan", "Kantha · India", "Miniature Art · Rajasthan", "Hand Painting", "Heritage Craft", "Indigenous Textile"].map((t, i) => (
                  <span key={i} className="font-futura" style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "#1C1814", flexShrink: 0 }}>
                    {t} &nbsp;·
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ══ TECHNIQUES ══════════════════════════════════════ */}
        <section style={{ padding: "clamp(4rem, 8vw, 8rem) 0", background: "#FAFAF7" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>
            <div className="techniques-grid">

              {/* Left — tab list */}
              <div>
                <Reveal>
                  <p className="font-futura" style={{ fontWeight: 300, fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#B09880", marginBottom: "2.5rem" }}>
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
                        <span className="font-futura" style={{ fontSize: "0.75rem", color: "rgba(176,152,128,0.6)", fontWeight: 300 }}>{t.num}</span>
                        <span className="tech-tab-name heading-font" style={{
                          fontSize: "clamp(1rem, 2vw, 1.3rem)",
                          fontWeight: 400,
                          letterSpacing: "0.08em",
                          color: active === i ? "#1C1814" : "rgba(28,24,20,0.35)",
                          transition: "color 0.3s",
                        }}>
                          {t.name}
                        </span>
                        <span className="font-futura" style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#B09880", marginLeft: "auto" }}>
                          {t.origin}
                        </span>
                      </div>
                      {active === i && (
                        <p className="font-futura" style={{ fontSize: "clamp(12px, 1.3vw, 13px)", fontWeight: 300, lineHeight: 1.8, color: "#6B5B4E", marginTop: "0.75rem", marginBottom: 0, paddingBottom: "0.5rem" }}>
                          {t.tag}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right — detail panel */}
              <div className="sticky-panel">
                <Reveal>
                  <div className="tech-panel" style={{
                    position: "relative",
                    border: "1px solid rgba(196,168,130,0.3)",
                    padding: "3.5rem",
                    overflow: "hidden",
                    minHeight: 360,
                    background: "rgba(196,168,130,0.05)",
                  }}>
                    <div style={{ position: "absolute", right: "-20px", bottom: "-20px" }}>
                      {techniques[active].pattern}
                    </div>
                    <div style={{ position: "relative", zIndex: 2 }}>
                      <span className="font-futura" style={{ fontWeight: 300, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "#C4A882", display: "block", marginBottom: "1rem" }}>
                        {techniques[active].tag}
                      </span>
                      <h3 className="heading-font" style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1C1814", marginBottom: "1.5rem", lineHeight: 1.2 }}>
                        {techniques[active].name}
                      </h3>
                      <p className="font-futura" style={{ fontSize: "clamp(13px, 1.4vw, 15px)", fontWeight: 300, lineHeight: 1.9, color: "#4A4035", marginBottom: "1.5rem", textAlign: "justify" }}>
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

        {/* ══ HERITAGE STATEMENT ══════════════════════════════ */}
        <section style={{ padding: "clamp(4rem, 8vw, 8rem) 0", background: "#F0EBE0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>

            <Reveal>
              <div className="heritage-grid">
                <div>
                  <p className="font-futura" style={{ fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#B09880", marginBottom: "1.5rem" }}>
                    Our Commitment
                  </p>
                  <h2 className="heading-font" style={{ fontWeight: 100, fontSize: "clamp(1.3rem, 4vw, 2.8rem)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#1C1814", lineHeight: 1.2 }}>
                    Preserving India&apos;s Textile{" "}
                    <em style={{ fontStyle: "italic", color: "#6B5040", fontWeight: 200 }}>Heritage</em>
                  </h2>
                </div>
                <div>
                  <div style={{ width: 40, height: 1, background: "#C4A882", marginBottom: "2rem" }} />
                  <p className="font-futura" style={{ fontSize: "clamp(15px, 1.5vw, 15px)", fontWeight: 300, lineHeight: 1.9, color: "#4A4035", marginBottom: "1.5rem", textAlign: "justify" }}>
                    These practices are deeply rooted in India&apos;s cultural heritage, incorporated with sophistication and finesse, creating garments that remain connected to tradition while expressed with a modern sensibility and quiet artistry.
                  </p>
                  <p className="font-futura" style={{ fontSize: "clamp(15px, 1.5vw, 15px)", fontWeight: 300, lineHeight: 1.9, color: "#4A4035", textAlign: "justify" }}>
                    By continuing these techniques, Dhirago upholds its commitment to preserving age-old craftsmanship and celebrating India&apos;s rich textile legacy — presenting ethical and heritage-driven making as a form of true luxury.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Full-width image */}
            <Reveal>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src="/images/subscribe.jpg"
                  alt="Heritage Craft"
                  width={1200}
                  height={500}
                  style={{ width: "100%", height: "clamp(280px, 45vw, 500px)", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(28,24,20,0.45)" }} />
                <div style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem", right: "2.5rem" }}>
                  <p className="heading-font" style={{ fontStyle: "italic", fontWeight: 200, fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)", letterSpacing: "0.04em", color: "#F5F0E8", maxWidth: 500, lineHeight: 1.4 }}>
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
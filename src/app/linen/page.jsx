"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function RevealLeft({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-40px)",
        transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const qualities = [
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

export default function LinenPage() {
  const [activeQuality, setActiveQuality] = useState(0);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500&display=swap");

        .heading-font {
          font-family: ${josefin.style.fontFamily};
        }

        .font-futura {
          font-family: "Century Gothic", Futura, "Trebuchet MS", sans-serif;
        }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }

        /* ── Quality rows ──────────────────────────────────── */
        .quality-row {
          border-bottom: 1px solid rgba(28, 24, 20, 0.12);
          padding: 1.6rem 0;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .quality-row:first-child {
          border-top: 1px solid rgba(28, 24, 20, 0.12);
        }
        .quality-row:hover,
        .quality-row.active {
          padding-left: 1rem;
        }

        /* ── Grids ─────────────────────────────────────────── */
        .quality-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
          gap: 5rem;
          align-items: start;
        }
        .craft-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: 4rem;
          align-items: center;
        }

        /* ── Tablet ────────────────────────────────────────── */
        @media (max-width: 992px) {
          .quality-grid,
          .craft-grid { gap: 3rem; }
          .sticky-panel {
            position: relative !important;
            top: unset !important;
          }
        }

        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 768px) {
          .hero-section   { min-height: 85vh !important; }
          .hero-heading   { font-size: clamp(2.5rem, 12vw, 4rem) !important; line-height: 1.1 !important; }
          .hero-description { max-width: 100% !important; text-align: justify; }
          .quality-panel  { padding: 2rem !important; }
          .bridge-image   { height: 320px !important; }
        }

        /* ── Small mobile ──────────────────────────────────── */
        @media (max-width: 540px) {
          .hero-content { bottom: 5% !important; }
          .quality-row  { padding: 1.2rem 0; }
          .quality-row:hover,
          .quality-row.active { padding-left: 0.5rem; }
          .quality-title  { font-size: 0.95rem !important; }
          .quality-panel  { padding: 1.5rem !important; }
          .closing-quote  { font-size: 1.7rem !important; }
        }
      `}</style>

      <div style={{ background: "#0F0D0A", color: "#F5F0E8", fontFamily: "'Outfit', sans-serif", minHeight: "100vh" }}>

        {/* ── HERO ───────────────────────────────────────────── */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
          <Image src="/images/subscribe.jpg" alt="European Linen" fill style={{ objectFit: "cover", opacity: 0.35 }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,13,10,0.3) 0%, rgba(15,13,10,0.85) 100%)" }} />

          {/* Large number watermark */}
          <div style={{ position: "absolute", right: "-2rem", top: "50%", transform: "translateY(-50%)", fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(12rem, 25vw, 22rem)", fontWeight: 700, color: "rgba(196,168,130,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
            60
          </div>

          <div style={{ position: "absolute", bottom: "8%", left: 0, right: 0, padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
           
            <div style={{ animation: "fadeSlide 1s ease 0.5s both" }}>
              <h1 
                className={` ${josefin.className} uppercase tracking-[0.2em]`}
              style={{ fontWeight: 100, fontSize: "clamp(3rem, 7vw, 4rem)", lineHeight: 1.08, color: "#F5F0E8", maxWidth: 800, marginBottom: "2rem" }}>
                60-Count<br /><em style={{ fontStyle: "italic", color: "#D4B896" }}>European Linen</em>
              </h1>
            </div>
            <div style={{ animation: "fadeSlide 1s ease 0.7s both" }}>
              <p className="font-futura" style={{  fontWeight: 300, fontSize: "clamp(13px, 1.5vw, 16px)", lineHeight: 1.8, color: "rgba(245,240,232,0.6)", maxWidth: 560 }}>
                Every piece begins with a simple belief — true quality comes from the material. Sourced from the coastal regions of France and Belgium.
              </p>
            </div>
          </div>
        </section>

        {/* ── ORIGIN STRIP ───────────────────────────────────── */}
        <section style={{ background: "#C4A882", padding: "1.3rem 0", overflow: "hidden" }}>
          <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
            {/* Two identical tracks — second one creates the seamless loop */}
            {[0, 1].map((clone) => (
              <div
                key={clone}
                style={{
                  display: "flex",
                  gap: "4rem",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  paddingRight: "4rem",
                  animation: "marqueeScroll 22s linear infinite",
                }}
              >
                {["France & Belgium", "Rain-Fed Flax", "60-Count Yarn", "Premium Fibre", "Coastal Origin", "Zero Waste"].map((t, i) => (
                  <span
                    key={i}
                    className="font-futura"
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.4em",
                      textTransform: "uppercase",
                      color: "#1C1814",
                      flexShrink: 0,
                    }}
                  >
                    {t} &nbsp;·
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── QUALITIES ──────────────────────────────────────── */}
        <section style={{ padding: "clamp(4rem, 8vw, 8rem) 0", background: "#FAFAF7" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>
            <div className="quality-grid">

              {/* LEFT — list */}
              <RevealLeft>
                <p
                  style={{
                    fontWeight: 300,
                    fontSize: 10,
                    letterSpacing: "0.55em",
                    textTransform: "uppercase",
                    color: "#B09880",
                    marginBottom: "2.5rem",
                  }}
                >
                  Material Qualities
                </p>

                <div>
                  {qualities.map((q, i) => (
                    <div
                      key={i}
                      className={`quality-row ${activeQuality === i ? "active" : ""}`}
                      onClick={() => setActiveQuality(i)}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                        <span
                          style={{
                            color: "#C4A882",
                            fontSize: "1rem",
                            width: 20,
                            textAlign: "center",
                            opacity: activeQuality === i ? 1 : 0.35,
                          }}
                        >
                          {q.icon}
                        </span>
                        <span
                          className={` ${josefin.className} uppercase `}
                          style={{
                            fontSize: "clamp(1rem, 1.5vw, 0.1rem)",
                            fontWeight: 400,
                            color: activeQuality === i ? "#1C1814" : "rgba(28,24,20,0.4)",
                            transition: "0.3s",
                          }}
                        >
                          {q.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealLeft>

              {/* RIGHT — sticky panel */}
              <div className="sticky-panel" style={{ position: "sticky", top: "8rem" }}>
                <Reveal>
                  <div
                    className="quality-panel"
                    style={{
                      background: "rgba(196,168,130,0.07)",
                      border: "1px solid rgba(196,168,130,0.25)",
                      padding: "3rem",
                    }}
                  >
                    <div style={{ fontSize: "2.5rem", color: "#C4A882", marginBottom: "1.5rem" }}>
                      {qualities[activeQuality].icon}
                    </div>

                    <h3
                      className="heading-font"
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                        fontWeight: 400,
                        color: "#1C1814",
                        marginBottom: "1.5rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {qualities[activeQuality].title}
                    </h3>

                    <p
                      className="font-futura"
                      style={{
                        fontSize: "clamp(13px, 1.4vw, 15px)",
                        fontWeight: 300,
                        lineHeight: 1.9,
                        color: "#4A4035",
                        textAlign: "justify",
                      }}
                    >
                      {qualities[activeQuality].body}
                    </p>

                    <div style={{ width: 40, height: 1, background: "#C4A882", marginTop: "2rem" }} />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── BRIDGE ─────────────────────────────────────────── */}
        <section style={{ padding: "clamp(4rem, 8vw, 8rem) 0", background: "#F0EBE0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>
            <div className="craft-grid">

              <Reveal>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src="/images/subscribe.jpg"
                    alt="Indian Craftsmanship"
                    width={560}
                    height={420}
                    className="bridge-image"
                    style={{
                      width: "100%",
                      height: "clamp(260px, 38vw, 420px)",
                      objectFit: "cover",
                      opacity: 0.85,
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "1.5rem",
                      left: "1.5rem",
                      background: "rgba(250,250,247,0.88)",
                      padding: "0.8rem 1.5rem",
                      border: "1px solid rgba(196,168,130,0.3)",
                    }}
                  >
                    <p
                      className="font-futura"
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        color: "#6B5040",
                        margin: 0,
                      }}
                    >
                      Indian Craftsmanship
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <p
                  className="font-futura"
                  style={{
                    fontWeight: 300,
                    fontSize: 10,
                    letterSpacing: "0.55em",
                    textTransform: "uppercase",
                    color: "#B09880",
                    marginBottom: "2rem",
                  }}
                >
                  Where It Comes Together
                </p>

                <h2
                  className="heading-font"
                  style={{
                    fontWeight: 100,
                    fontSize: "clamp(2rem, 2vw, 1.5rem)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#1C1814",
                    lineHeight: 1.2,
                    marginBottom: "2rem",
                  }}
                >
                  European fibre.
                  <br />
                  <em style={{ fontStyle: "italic", color: "#6B5040", fontWeight: 100 }}>
                    Indian mastery.
                  </em>
                </h2>

                <p
                  className="font-futura"
                  style={{
                    fontSize: "clamp(13px, 1.4vw, 15px)",
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: "#4A4035",
                    marginBottom: "1.5rem",
                    textAlign: "justify",
                  }}
                >
                  This exceptional material is brought to life through Indian craftsmanship.
                  From selecting the finest linen to the precision of the final stitch,
                  attention to detail remains uncompromised.
                </p>

                <p
                  className="font-futura"
                  style={{
                    fontSize: "clamp(13px, 1.4vw, 15px)",
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: "#4A4035",
                    textAlign: "justify",
                  }}
                >
                  The quality of linen begins with the selection of fibre — and continues
                  through every hand that touches it.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CLOSING QUOTE ──────────────────────────────────── */}
        <section
          style={{
            padding: "clamp(4rem, 8vw, 7rem) 0",
            textAlign: "center",
            background: "#FAFAF7",
            borderTop: "1px solid #E8E0D0",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 2rem" }}>
            <Reveal>
              <div
                className="heading-font closing-quote"
                style={{
                  fontStyle: "italic",
                  fontSize: "clamp(1.8rem, 3.5vw, 1rem)",
                  fontWeight: 100,
                  color: "#1C1814",
                  lineHeight: 1.5,
                  marginBottom: "2rem",
                  letterSpacing: "0.02em",
                }}
              >
                "Soft on the skin. Strong in its legacy."
              </div>

              <div
                style={{
                  width: 1,
                  height: 70,
                  background: "linear-gradient(to bottom, #C4A882, transparent)",
                  margin: "0 auto",
                }}
              />
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
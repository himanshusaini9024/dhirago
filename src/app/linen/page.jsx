"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
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
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
      ...style
    }}>
      {children}
    </div>
  );
}

function RevealLeft({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-40px)",
      transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const qualities = [
  { icon: "◈", title: "Longer Staple Length", body: "European flax is known for its longer staple length, which directly enhances durability and smoothness — a fibre built with strength from within." },
  { icon: "◎", title: "Rain-Fed Cultivation", body: "Cultivated from premium flax grown in naturally balanced coastal environments of France and Belgium. The crop relies solely on rain-fed irrigation — no artificial watering, minimal waste." },
  { icon: "◇", title: "Naturally Antibacterial", body: "Linen is inherently antibacterial and cooling against the skin. A fibre that takes care of the wearer, as thoughtfully as it was made." },
  { icon: "○", title: "Fabric of Royalty", body: "Often regarded as the fabric of royalty, linen carries a legacy of understated luxury — refined by centuries of use and unchanged by trend." },
  { icon: "△", title: "Eco-Conscious", body: "Minimal chemical inputs during cultivation, biodegradable by nature. A material that respects the earth as much as the person who wears it." },
  { icon: "□", title: "Softens Over Time", body: "60-count linen is soft on the skin yet strong in its legacy — the more it is worn and washed, the better it becomes. Quality that deepens with time." },
];

export default function LinenPage() {
  const [activeQuality, setActiveQuality] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@200;300;400;500&display=swap');
        @keyframes fadeSlide { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .quality-row {
          border-bottom: 1px solid rgba(196,168,130,0.2);
          padding: 1.8rem 0;
          cursor: pointer;
          transition: padding-left 0.4s;
        }
        .quality-row:first-child { border-top: 1px solid rgba(196,168,130,0.2); }
        .quality-row:hover { padding-left: 1rem; }
        .quality-row.active { padding-left: 1rem; }
      `}</style>

      <div style={{ background: "#0F0D0A", color: "#F5F0E8", fontFamily: "'Outfit', sans-serif", minHeight: "100vh" }}>

        {/* FULL-BLEED HERO */}
        <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
          <Image src="/images/subscribe.jpg" alt="European Linen" fill style={{ objectFit: "cover", opacity: 0.35 }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,13,10,0.3) 0%, rgba(15,13,10,0.85) 100%)" }} />

          {/* Large number watermark */}
          <div style={{ position: "absolute", right: "-2rem", top: "50%", transform: "translateY(-50%)", fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(12rem, 25vw, 22rem)", fontWeight: 700, color: "rgba(196,168,130,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
            60
          </div>

          <div style={{ position: "absolute", bottom: "8%", left: 0, right: 0, padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
           
            <div style={{ animation: "fadeSlide 1s ease 0.5s both" }}>
              <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 400, fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1.08, color: "#F5F0E8", maxWidth: 800, marginBottom: "2rem" }}>
                60-Count<br /><em style={{ fontStyle: "italic", color: "#D4B896" }}>European Linen</em>
              </h1>
            </div>
            <div style={{ animation: "fadeSlide 1s ease 0.7s both" }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "clamp(13px, 1.5vw, 16px)", lineHeight: 1.8, color: "rgba(245,240,232,0.6)", maxWidth: 560 }}>
                Every piece begins with a simple belief — true quality comes from the material. Sourced from the coastal regions of France and Belgium.
              </p>
            </div>
          </div>
        </section>

        {/* ORIGIN STRIP */}
        <section style={{ background: "#C4A882", padding: "1.5rem 0", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "4rem", animation: "none", whiteSpace: "nowrap" }}>
            {["France & Belgium", "Rain-Fed Flax", "60-Count Yarn", "Premium Fibre", "Coastal Origin", "Zero Waste", "France & Belgium", "Rain-Fed Flax", "60-Count Yarn"].map((t, i) => (
              <span key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "#1C1814", flexShrink: 0 }}>
                {t} &nbsp;·
              </span>
            ))}
          </div>
        </section>

        {/* QUALITIES INTERACTIVE */}
        <section style={{ padding: "clamp(4rem, 8vw, 8rem) 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "5rem", alignItems: "start" }}>

              {/* Left — list */}
              <RevealLeft>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 200, fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#C4A882", marginBottom: "2.5rem" }}>
                  Material Qualities
                </p>
                <div>
                  {qualities.map((q, i) => (
                    <div
                      key={i}
                      className={`quality-row${activeQuality === i ? " active" : ""}`}
                      onClick={() => setActiveQuality(i)}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                        <span style={{ color: "#C4A882", fontSize: "1rem", width: 20, textAlign: "center", opacity: activeQuality === i ? 1 : 0.4, transition: "opacity 0.3s" }}>
                          {q.icon}
                        </span>
                        <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", fontWeight: 400, color: activeQuality === i ? "#F5F0E8" : "rgba(245,240,232,0.5)", transition: "color 0.3s" }}>
                          {q.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealLeft>

              {/* Right — detail panel */}
              <div style={{ position: "sticky", top: "8rem" }}>
                <Reveal>
                  <div style={{ background: "rgba(196,168,130,0.06)", border: "1px solid rgba(196,168,130,0.15)", padding: "3rem" }}>
                    <div style={{ fontSize: "2.5rem", color: "#C4A882", marginBottom: "1.5rem" }}>
                      {qualities[activeQuality].icon}
                    </div>
                    <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 400, color: "#F5F0E8", marginBottom: "1.5rem", lineHeight: 1.3 }}>
                      {qualities[activeQuality].title}
                    </h3>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(13px, 1.4vw, 15px)", fontWeight: 300, lineHeight: 1.9, color: "rgba(245,240,232,0.6)" }}>
                      {qualities[activeQuality].body}
                    </p>
                    <div style={{ width: 40, height: 1, background: "#C4A882", marginTop: "2rem" }} />
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* CRAFTSMANSHIP BRIDGE */}
        <section style={{ padding: "clamp(4rem, 8vw, 8rem) 0", background: "#a19482" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 5rem)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "4rem", alignItems: "center" }}>

              <Reveal>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Image src="/images/subscribe.jpg" alt="Indian Craftsmanship" width={560} height={420} style={{ width: "100%", height: "clamp(260px, 38vw, 420px)", objectFit: "cover", opacity: 0.8, display: "block" }} />
                  <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", background: "rgba(15,13,10,0.8)", padding: "0.8rem 1.5rem", backdropFilter: "blur(4px)" }}>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#C4A882", margin: 0 }}>Indian Craftsmanship</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 200, fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", color: "#C4A882", marginBottom: "2rem" }}>
                  Where It Comes Together
                </p>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#F5F0E8", lineHeight: 1.25, marginBottom: "2rem" }}>
                  European fibre.<br /><em style={{ fontStyle: "italic", color: "#D4B896" }}>Indian mastery.</em>
                </h2>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(13px, 1.4vw, 15px)", fontWeight: 300, lineHeight: 1.9, color: "rgba(245,240,232,0.55)", marginBottom: "1.5rem" }}>
                  This exceptional material is brought to life through Indian craftsmanship. From selecting the finest linen to the precision of the final stitch, attention to detail remains uncompromised.
                </p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(13px, 1.4vw, 15px)", fontWeight: 300, lineHeight: 1.9, color: "rgba(245,240,232,0.55)" }}>
                  The quality of linen begins with the selection of fibre — and continues through every hand that touches it.
                </p>
              </Reveal>

            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0", textAlign: "center", background: "#0F0D0A" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 2rem" }}>
            <Reveal>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)", fontWeight: 400, color: "#F5F0E8", lineHeight: 1.5, marginBottom: "2rem" }}>
                "Soft on the skin. Strong in its legacy."
              </div>
              <div style={{ width: 1, height: 70, background: "linear-gradient(to bottom, #C4A882, transparent)", margin: "0 auto" }} />
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}

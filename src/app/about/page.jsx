"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ─── REVEAL COMPONENT ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
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
        <ellipse cx="80" cy="88" rx="22" ry="30" stroke="#6B5B4E" strokeWidth="1.2" />
        <path
          d="M80 58 Q72 42 68 28 Q66 20 72 16 Q78 12 80 20 Q82 28 80 38 Q78 48 80 58"
          stroke="#6B5B4E" strokeWidth="1.2" strokeLinecap="round"
        />
        <ellipse cx="74" cy="14" rx="7" ry="5" stroke="#6B5B4E" strokeWidth="1.2" />
        <line x1="80" y1="13" x2="96" y2="11" stroke="#6B5B4E" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="76" cy="13" r="1.2" fill="#6B5B4E" />
        <path d="M70 10 Q66 4 60 2" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" />
        <path d="M70 10 Q65 6 58 6" stroke="#C4A882" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M62 80 Q42 72 34 88 Q40 96 62 94" stroke="#6B5B4E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M96 82 Q108 76 112 86 Q108 94 96 96" stroke="#6B5B4E" strokeWidth="1" strokeLinecap="round" />
        <line x1="72" y1="116" x2="68" y2="145" stroke="#6B5B4E" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="88" y1="116" x2="92" y2="145" stroke="#6B5B4E" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M68 145 Q60 148 56 148 M68 145 Q66 152 64 152 M68 145 Q72 150 70 153" stroke="#6B5B4E" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M92 145 Q100 148 104 148 M92 145 Q94 152 96 152 M92 145 Q88 150 90 153" stroke="#6B5B4E" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M30 148 Q80 144 130 148" stroke="#C4A882" strokeWidth="0.5" strokeLinecap="round" opacity="0.5" />
        <path d="M38 152 Q80 149 122 152" stroke="#C4A882" strokeWidth="0.3" strokeLinecap="round" opacity="0.3" />
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
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 300, color: "#E8E0D0", lineHeight: 1, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
          {num}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400, color: "#1C1814", marginBottom: "1rem", letterSpacing: "0.02em" }}>
          {name}
        </div>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 300, lineHeight: 1.8, color: "#6B5B4E", margin: 0 }}>
          {desc}
        </p>
      </div>
    </Reveal>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const S = {
  eyebrow: { fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "#A8937E", marginBottom: "1.5rem" },
  eyebrowLight: { fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "#C4A882", marginBottom: "2rem" },
  rule: { width: 40, height: 1, background: "#C4A882", marginBottom: "2rem" },
  bodyDark: { fontFamily: "'Jost', sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 300, lineHeight: 1.95, color: "#3D3530", marginBottom: "1.5rem" },
  bodyLight: { fontFamily: "'Jost', sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 300, lineHeight: 2, color: "rgba(245,240,232,0.55)", marginBottom: "1.5rem" },
  sectionInner: { maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.25rem, 4vw, 3rem)" },
  twoCol: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "clamp(2.5rem, 6vw, 6rem)", alignItems: "center" },
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
        .hero-content > * {
          animation: fadeIn 1.2s ease forwards;
        }
        .hero-content > *:nth-child(1) { animation-delay: 0.2s; opacity: 0; }
        .hero-content > *:nth-child(2) { animation-delay: 0.5s; opacity: 0; }
        .hero-content > *:nth-child(3) { animation-delay: 0.8s; opacity: 0; }
      `}</style>

      <div style={{ background: "#F5F0E8", color: "#3D3530", overflowX: "hidden" }}>

        {/* ══════════ HERO ══════════ */}
        <section style={{ position: "relative", height: "100vh", minHeight: 600, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#1C1814" }}>

          <div style={{ position: "absolute", inset: 0 }}>
            <video
        src="/videos/banner.mp4"
        autoPlay
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
            {/* <Image src="/images/subscribe.jpg" alt="Dhirago Hero" fill priority style={{ objectFit: "cover", opacity: 0.4 }} /> */}
          </div>

          <div style={{ position: "absolute", inset: 0, background: "rgba(20,16,12,0.62)" }} />

          {/* Play button */}
          <button
            aria-label="Play video"
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", border: "1px solid rgba(196,168,130,0.4)", borderRadius: "50%", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", cursor: "pointer", zIndex: 3 }}
          >
            <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "9px 0 9px 16px", borderColor: "transparent transparent transparent #C4A882", marginLeft: 4 }} />
          </button>

          <div className="hero-content" style={{ position: "relative", zIndex: 2, textAlign: "center", color: "#F5F0E8", padding: "0 1.5rem" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: "0.5em", color: "#C4A882", textTransform: "uppercase", marginBottom: "2rem", opacity: 0.9 }}>
              Dhirago — Est. 2026
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(3.5rem, 9vw, 7.5rem)", lineHeight: 1.05, color: "#F5F0E8", letterSpacing: "0.02em", marginBottom: "1.5rem" }}>
              Woven in<br />Stillness
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(1rem, 2vw, 1.3rem)", fontWeight: 300, color: "rgba(245,240,232,0.65)", maxWidth: 520, margin: "0 auto", letterSpacing: "0.03em" }}>
              A label defined by craftsmanship, shaped by quiet intention
            </p>
          </div>

          <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, color: "rgba(245,240,232,0.35)", fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase" }}>
            <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, #C4A882, transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
            scroll
          </div>
        </section>

        {/* ══════════ THE NAME ══════════ */}
        <section style={{ padding: "clamp(4rem, 10vw, 9rem) 0", background: "#F5F0E8" }}>
          <div style={S.sectionInner}>
            <div style={S.twoCol}>
              <Reveal>
                <p style={S.eyebrow}>Our Name</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.2, color: "#1C1814", letterSpacing: "0.01em" }}>
                  The state of<br /><em style={{ fontStyle: "italic", color: "#6B5B4E" }}>Dheera</em>
                </h2>
              </Reveal>

              <div>
                <Reveal><div style={S.rule} /></Reveal>
                <Reveal delay={150}>
                  <p style={S.bodyDark}>
                    Dhirago originates from a narrative that simplicity holds depth and life is meant to be felt, not rushed. The name is inspired by <em>Dheera</em> — a state of calm and composure, reflecting a mindset that values quiet clarity over constant distraction.
                  </p>
                </Reveal>
                <Reveal delay={250}>
                  <p style={S.bodyDark}>
                    At its core, we believe simplicity is not just a design choice, but a way of thinking. Minimal and responsibly crafted, each piece carries a quiet sense of stillness. In a world that moves quickly, Dhirago offers a sense of ease — inviting you to slow down and experience things more thoughtfully.
                  </p>
                </Reveal>
                <Reveal delay={350}>
                  <p style={{ ...S.bodyDark, marginBottom: 0 }}>
                    As a conscious luxury label, each piece is shaped with time, patience, and care. We work with 60-count European linen and organically sourced fibres, valued for their breathability, texture, and the way they soften and evolve over time.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ PHILOSOPHY ══════════ */}
        <section style={{ background: "#1C1814", padding: "clamp(5rem, 12vw, 10rem) 0" }}>
          <div style={{ ...S.sectionInner, textAlign: "center" }}>
            <Reveal>
              <p style={S.eyebrowLight}>Our Philosophy</p>
            </Reveal>
            <Reveal delay={150}>
              <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.6rem, 4vw, 3rem)", lineHeight: 1.4, color: "#F5F0E8", maxWidth: 820, margin: "0 auto 4rem", letterSpacing: "0.02em" }}>
                "When something is held with care and intention, it transforms into something lasting."
              </blockquote>
            </Reveal>
            <Reveal delay={250}>
              <p style={{ ...S.bodyLight, maxWidth: 640, margin: "0 auto 1.5rem" }}>
                Produced in small batches in close collaboration with artisans, this allows us to focus on precision and detail in a way that large-scale production simply cannot. The process is slower, but it ensures that every piece meets a certain standard of quality.
              </p>
            </Reveal>
            <Reveal delay={350}>
              <p style={{ ...S.bodyLight, maxWidth: 640, margin: "0 auto" }}>
                In honouring and preserving the richness of Indian heritage, we bring its legacy forward with quiet pride in every piece we create.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════ FABRICS ══════════ */}
        <section style={{ padding: "clamp(4rem, 10vw, 9rem) 0", background: "#EDE6D9" }}>
          <div style={S.sectionInner}>
            <div style={S.twoCol}>
              <Reveal>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src="/images/subscribe.jpg"
                    alt="Premium Fabrics"
                    width={600} height={420}
                    style={{ width: "100%", height: "clamp(260px, 40vw, 420px)", objectFit: "cover", display: "block" }}
                  />
                  <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", background: "rgba(28,24,20,0.7)", padding: "0.6rem 1.2rem" }}>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#C4A882", margin: 0 }}>
                      60-count European Linen
                    </p>
                  </div>
                </div>
              </Reveal>

              <div>
                <Reveal>
                  <p style={S.eyebrow}>Our Materials</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#1C1814", lineHeight: 1.2, marginBottom: "2rem" }}>
                    Fabrics that<br /><em style={{ fontStyle: "italic", color: "#6B5B4E" }}>breathe and evolve</em>
                  </h2>
                </Reveal>
                <Reveal delay={150}>
                  <div style={S.rule} />
                  <p style={S.bodyDark}>
                    We work exclusively with 60-count European linen and organically sourced fibres — valued for their breathability, texture, and the way they soften and evolve over time. Each material is chosen not just for its quality, but for the story it carries.
                  </p>
                  <p style={{ ...S.bodyDark, marginBottom: 0 }}>
                    Our design philosophy embraces elegance in simplicity — blending traditional Indian craftsmanship with a quiet contemporary sensibility that never shouts.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ CRAFTSMANSHIP ══════════ */}
        <section style={{ padding: "clamp(4rem, 10vw, 9rem) 0", background: "#F5F0E8" }}>
          <div style={S.sectionInner}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: "2rem", marginBottom: "clamp(3rem, 6vw, 5rem)", flexWrap: "wrap" }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#1C1814", letterSpacing: "0.01em" }}>
                  Craftsmanship
                </h2>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#A8937E" }}>
                  Heritage Techniques
                </span>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 1, background: "#E8E0D0", border: "1px solid #E8E0D0" }}>
              <CraftCard num="01" name="Handloom Weaving" desc="Drawing from centuries-old tradition, each thread is laid with intention. The handloom preserves a rhythm that machines cannot replicate — a living breath within every cloth." delay={0} />
              <CraftCard num="02" name="Hand Painting & Miniature Art" desc="Intricate detailing borrowed from the miniature art traditions of India — each motif rendered by hand, carrying the imprint of its maker and the memory of its heritage." delay={100} />
              <CraftCard num="03" name="Sashiko & Kantha" desc="Ancient Japanese and Indian needlework, thoughtfully incorporated. Each stitch carries the weight of tradition, the warmth of care, and the quiet resilience of things made to last." delay={200} />
            </div>
          </div>
        </section>

        {/* ══════════ HERON / LOGO ══════════ */}
        <section style={{ padding: "clamp(4rem, 10vw, 9rem) 0", background: "#E8E0D0" }}>
          <div style={S.sectionInner}>
            <div style={S.twoCol}>
              <Reveal>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
                  <HeronSVG />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.8rem", letterSpacing: "0.3em", color: "#1C1814", textTransform: "uppercase" }}>
                    Dhirago
                  </span>
                </div>
              </Reveal>

              <div>
                <Reveal delay={150}>
                  <p style={S.eyebrow}>Our Symbol</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#1C1814", lineHeight: 1.25, marginBottom: "2rem" }}>
                    The <em style={{ fontStyle: "italic", color: "#6B5B4E" }}>Heron</em> —<br />quiet balance,<br />understated strength
                  </h3>
                </Reveal>
                <Reveal delay={250}>
                  <div style={S.rule} />
                  <p style={S.bodyDark}>
                    Our logo takes shape from the heron — a quiet symbol of balance, clarity, and understated strength. The heron is not just a symbol for us; it is a reflection of our philosophy — calm, deliberate, and enduring.
                  </p>
                  <p style={{ ...S.bodyDark, marginBottom: 0 }}>
                    Standing still at the water&apos;s edge, the heron does not chase. It waits with intention. This is how we approach our craft — patient, purposeful, and present.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ UDAIPUR ══════════ */}
        <section style={{ background: "#1C1814", padding: "clamp(5rem, 12vw, 10rem) 0", overflow: "hidden" }}>
          <div style={S.sectionInner}>
            <Reveal>
              <p style={S.eyebrowLight}>Our Inspiration</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "#F5F0E8", lineHeight: 1.08, marginBottom: "clamp(3rem, 6vw, 5rem)", maxWidth: 750 }}>
                Udaipur —<br />the city of<br /><em style={{ fontStyle: "italic", color: "#C4A882" }}>still water</em>
              </h2>
            </Reveal>

            <Reveal>
              <div style={{ position: "relative", width: "100%", height: "clamp(260px, 50vw, 520px)", overflow: "hidden", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
                <Image
                  src="/images/subscribe.jpg"
                  alt="Udaipur — City of Lakes"
                  fill
                  style={{ objectFit: "cover", opacity: 0.65 }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,24,20,0.65) 0%, transparent 55%)" }} />
                <p style={{ position: "absolute", bottom: "1.5rem", right: "2rem", fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(196,168,130,0.5)", margin: 0 }}>
                  Udaipur, Rajasthan
                </p>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "clamp(2rem, 5vw, 5rem)", alignItems: "start" }}>
              <Reveal>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.3rem, 3vw, 1.9rem)", color: "#F5F0E8", lineHeight: 1.5, letterSpacing: "0.02em" }}>
                  The lakes do not rush — they hold the sky, the light, the moment.
                </p>
              </Reveal>
              <Reveal delay={150}>
                <p style={{ ...S.bodyLight, marginBottom: "1.5rem" }}>
                  Udaipur — a city built around water, where reflection softens everything into calm and completeness. Here, water was held and preserved over time, allowed to settle into its own stillness — where calm was not found, but gently formed through intention.
                </p>
                <p style={{ ...S.bodyLight, marginBottom: 0 }}>
                  Dhirago draws from this belief — that when something is held with care and intention, it transforms into something lasting. Every piece we create carries this quiet inheritance from the still waters of Rajasthan.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════ STORY / HERITAGE ══════════ */}
        <section style={{ padding: "clamp(4rem, 10vw, 9rem) 0", background: "#F5F0E8" }}>
          <div style={S.sectionInner}>
            <div style={S.twoCol}>
              <div>
                <Reveal>
                  <p style={S.eyebrow}>Our Story</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#1C1814", lineHeight: 1.2, marginBottom: "2rem" }}>
                    A legacy<br /><em style={{ fontStyle: "italic", color: "#6B5B4E" }}>woven in fabric</em>
                  </h2>
                </Reveal>
                <Reveal delay={150}>
                  <div style={S.rule} />
                  <p style={S.bodyDark}>
                    At Dhirago, fabric is not just what we work with — it is woven into our family heritage. Founded by Sanjeev Mehra and now proudly carried forward by his sons, our journey spans over seven generations and more than 100 years of expertise in the fabric and textile trade.
                  </p>
                  <p style={{ ...S.bodyDark, marginBottom: 0 }}>
                    Our legacy began long before today&apos;s trends — understanding premium fabrics is in our DNA. Operating out of our original store, we quickly earned a reputation for exceptional quality among both retail and wholesale customers.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={100}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src="/images/subscribe.jpg"
                    alt="Our Heritage"
                    width={600} height={500}
                    style={{ width: "100%", height: "clamp(280px, 42vw, 500px)", objectFit: "cover", display: "block" }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════ CLOSING ══════════ */}
        <section style={{ padding: "clamp(5rem, 12vw, 11rem) 0", background: "#1C1814", textAlign: "center" }}>
          <div style={S.sectionInner}>
            <Reveal>
              <div style={{ width: 1, height: 80, background: "linear-gradient(to bottom, #C4A882, transparent)", margin: "0 auto 3.5rem" }} />
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: "#F5F0E8", lineHeight: 1.3, maxWidth: 760, margin: "0 auto 3rem", letterSpacing: "0.02em" }}>
                In a world that moves quickly,<br />we choose to be still.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#C4A882", opacity: 0.7 }}>
                Dhirago · Conscious Luxury · Est. 2026
              </p>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
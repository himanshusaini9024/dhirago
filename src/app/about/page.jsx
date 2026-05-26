"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import { motion } from "framer-motion";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ─── REVEAL — bidirectional scroll animation ──────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: visible
          ? `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
          : "opacity 0.35s ease 0ms, transform 0.35s ease 0ms",
      }}
    >
      {children}
    </div>
  );
}

// ─── CRAFT CARD ──────────────────────────────────────────────────────────────
function CraftCard({ num, name, desc, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "#EDE6D9" : "#F5F0E8",
          padding: "clamp(1.5rem,4vw,3rem) clamp(1.25rem,3vw,2.5rem)",
          transition: "background 0.4s",
          height: "100%",
        }}
      >
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "3.5rem", fontWeight: 300, color: "#E8E0D0", lineHeight: 1, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
          {num}
        </div>
        <div className={`${josefin.className} uppercase `} style={{  fontSize: num === "02" ? "1rem" : "1.1rem", fontWeight: 400, color: "#1C1814", marginBottom: "1rem", letterSpacing: "0.12em" }}>
          {name}
        </div>
        <p className="font-futura" style={{ fontSize: "13px", textAlign: "justify", fontWeight: 300, lineHeight: 1.8, color: "#6B5B4E", margin: 0 }}>
          {desc}
        </p>
      </div>
    </Reveal>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const S = {
  inner: { maxWidth: 1400, margin: "0 auto", padding: "0 clamp(1.25rem,4vw,3rem)" },
  eyebrow: { fontSize: "1.02rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "#A8937E", marginBottom: "1.5rem" },
  eyebrowLight: { fontSize: "1.12rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "#C4A882", marginBottom: "2rem" },
  rule: { width: 40, height: 1, background: "#C4A882", marginBottom: "2rem" },
  bodyDark: { fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 300, lineHeight: 1.95, color: "#3D3530", textAlign: "justify", marginBottom: "1.5rem" },
  bodyLight: { fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 300, lineHeight: 2, color: "rgba(245,240,232,0.65)", marginBottom: "1.5rem" },
  twoCol: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "clamp(2.5rem,6vw,6rem)", alignItems: "center" },
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroVideoRef = useRef(null);
  const udaipurVideoRef = useRef(null);

  // Force autoplay on mount + after tab switch / page refresh
  useEffect(() => {
    const videos = [heroVideoRef.current, udaipurVideoRef.current];
    const tryPlay = () => videos.forEach(v => v?.play().catch(() => {}));
    tryPlay();
    document.addEventListener("visibilitychange", tryPlay);
    window.addEventListener("focus", tryPlay);
    return () => {
      document.removeEventListener("visibilitychange", tryPlay);
      window.removeEventListener("focus", tryPlay);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        @keyframes scrollPulse {
          0%,100% { opacity:0.3; transform:translateY(-4px); }
          50%      { opacity:1;   transform:translateY(6px); }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position:200% center; }
        }

        .noise-overlay::after {
          content:'';
          position:absolute; inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events:none; z-index:1;
        }

        .gold-rule-animate {
          background:linear-gradient(90deg,transparent,#C4A882,#E8D5B0,#C4A882,transparent);
          background-size:200% auto;
          animation:shimmer 4s linear infinite;
        }

        /* ── Udaipur responsive layout ── */
        .udaipur-desktop { display: grid; }
        .udaipur-mobile  { display: none; }

        @media (max-width: 700px) {
          .udaipur-desktop { display: none !important; }
          .udaipur-mobile  { display: block; }
          .craft-grid      { grid-template-columns: 1fr !important; }
          .story-grid      { grid-template-columns: 1fr !important; }
          .fab-grid        { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ background: "#F5F0E8", color: "#3D3530", overflowX: "hidden" }}>

        {/* ════════════════════════════════════════════════════════
            01. HERO — pure autoplay, no text, scroll cue
        ════════════════════════════════════════════════════════ */}
        <section
          className="noise-overlay"
          style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden", background: "#06101A" }}
        >
          <video
            ref={heroVideoRef}
            src="/videos/banner.mp4"
            autoPlay loop muted playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          />
          {/* Bottom fade only */}
         

          {/* Scroll cue */}
          <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, color: "rgba(245,240,232,0.4)", fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase" }}>
            <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom,#C4A882,transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
            scroll
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            02. THE NAME / OUR STORY — centred heading + body
        ════════════════════════════════════════════════════════ */}
        <section style={{ padding: "clamp(5rem,11vw,9rem) 0", background: "#FAFAF7" }}>
          <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 clamp(1.5rem,5vw,3rem)", textAlign: "center" }}>

            <Reveal>
              <span className={`${josefin.className} uppercase`} style={{ display: "inline-flex", alignItems: "center", gap: "0.9rem", fontSize: "0.75rem", letterSpacing: "0.48em", textTransform: "uppercase", color: "#9A8C7E", marginBottom: "2.5rem" }}>
                <span style={{ width: 24, height: "1px", background: "#B8975A", display: "block" }} />
                Our Story
                <span style={{ width: 24, height: "1px", background: "#B8975A", display: "block" }} />
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h2 className={`${josefin.className} uppercase`} style={{ fontWeight: 300, fontSize: "clamp(1.1rem,2.2vw,1.5rem)", lineHeight: 1.2, letterSpacing: "0.1em", color: "#1A1714", marginBottom: "3rem" }}>
                A Label woven in stillness,{" "}
                <em style={{ fontStyle: "italic", color: "#B8975A" }}>defined by craftsmanship</em>
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <div style={{ width: 56, height: "1px", background: "linear-gradient(90deg,transparent,#B8975A,transparent)", margin: "0 auto 3rem" }} />
            </Reveal>

            <Reveal delay={260}>
              <p className="font-futura" style={{ fontWeight: 300, textAlign: "justify", fontSize: "clamp(0.88rem,1.2vw,1.088rem)", lineHeight: 2, color: "#4A4239", marginBottom: "1.5rem" }}>
                DHIRAGO originates from a narrative that simplicity holds depth and life is meant to be felt, not rushed. The name is inspired by <em style={{ fontStyle: "italic" }}>"Dheera"</em> a state of calmness, reflecting a mindset that values quiet clarity over constant distraction. Minimally and responsibly crafted, each piece carries a quiet sense of stillness. In a world that moves quickly, it offers a sense of ease — inviting you to slow down and experience things more thoughtfully.
              </p>
            </Reveal>
            <Reveal delay={340}>
              <p className="font-futura" style={{ fontWeight: 300, textAlign: "justify", fontSize: "clamp(0.88rem,1.2vw,1.088rem)", lineHeight: 2, color: "#4A4239", marginBottom: "1.5rem" }}>
                As a conscious luxury label, DHIRAGO works with 60 count European linen and organically sourced fibres, valued for its breathability, texture, and the way it softens and evolves over time. Produced in small batches in close collaboration with artisans. This allows to focus on precision and detail in a way that large-scale production simply cannot. The process is slower, but it ensures that every piece meets a certain standards and quality.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <p className="font-futura" style={{ fontWeight: 300, textAlign: "justify", fontSize: "clamp(0.88rem,1.2vw,1.088rem)", lineHeight: 2, color: "#4A4239", marginBottom: 0 }}>
                Craftsmanship lies at the heart of Dhirago, our designs draw from heritage techniques and time honoured practices including hand painting and the intricate detailing of miniature art. Handwork techniques like sashiko, kantha and tangaliya inspired weaving are thoughtfully incorporated — each carrying the imprint of tradition and care. In doing so, we honour and preserve the richness of Indian heritage — bringing its legacy forward with quiet pride in every piece we create.
              </p>
            </Reveal>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            03. UDAIPUR — full-bleed video bg
            Desktop: big italic quote LEFT | body paras RIGHT
            Mobile:  heading → 4 stacked bordered paragraphs
        ════════════════════════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>

          <video
            ref={udaipurVideoRef}
            src="/videos/udaipur1.mp4"
            autoPlay loop muted playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(10,16,24,0.82) 0%,rgba(10,16,24,0.55) 55%,rgba(10,16,24,0.25) 100%)" }} />

          <div style={{ ...S.inner, position: "relative", zIndex: 2, padding: "clamp(5rem,12vw,10rem) clamp(1.25rem,4vw,3rem)" }}>

            {/* Eyebrow — both views */}
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ display: "block", width: 32, height: "1px", background: "#B8975A", opacity: 0.7 }} />
                <p className={`${josefin.className}`} style={{ fontSize: "clamp(0.6rem,1vw,0.75rem)", letterSpacing: "0.52em", textTransform: "uppercase", color: "#B8975A", margin: 0 }}>
                  Our Inspiration
                </p>
              </div>
            </Reveal>

            {/* Heading — both views */}
            <Reveal delay={100}>
              <h2 className={`${josefin.className} uppercase`} style={{ fontWeight: 300, fontSize: "clamp(1.5rem,4.5vw,3.2rem)", color: "#F5F0E8", lineHeight: 1.08, marginBottom: "clamp(2rem,5vw,3.5rem)", maxWidth: 720 }}>
                Udaipur —{" "}
                <em style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, color: "#C4A882", textTransform: "none" }}>
                  the city of lake
                </em>
              </h2>
            </Reveal>

            {/* Gold rule — both views */}
            <Reveal delay={180}>
              <div style={{ width: 48, height: "1px", background: "#B8975A", marginBottom: "clamp(2rem,4vw,3rem)", opacity: 0.7 }} />
            </Reveal>

            {/* ── DESKTOP: quote left | body right ── */}
            <div
              className="udaipur-desktop"
              style={{
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))",
                gap: "clamp(2.5rem,6vw,5rem)",
                alignItems: "center",
                maxWidth: 900,
              }}
            >
              {/* Left — big italic quote */}
              <Reveal delay={240}>
                <div style={{ borderLeft: "1px solid rgba(196,168,130,0.4)", paddingLeft: "1.75rem" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.3rem,2.8vw,2rem)", color: "#F5F0E8", lineHeight: 1.6, letterSpacing: "0.02em", margin: 0 }}>
                    "The lakes do not rush — they hold the sky, the light, the moment."
                  </p>
                </div>
              </Reveal>

              {/* Right — body + location */}
              <div>
                <Reveal delay={320}>
                  <p className="font-futura" style={{ fontWeight: 300, fontSize: "clamp(13px,1.35vw,17px)", lineHeight: 2, color: "rgba(245,240,232,0.72)", marginBottom: "1.4rem" }}>
                    A city built around water, where water reflection softens everything into calm and completeness. Here, water was held and preserved over the time, allowed to settle into its own stillness — where calm was not found, but it gently formed through intention.
                  </p>
                </Reveal>
                <Reveal delay={400}>
                  <p className="font-futura" style={{ fontWeight: 300, fontSize: "clamp(13px,1.35vw,17px)", lineHeight: 2, color: "rgba(245,240,232,0.72)", marginBottom: "2rem" }}>
                    Dhirago draws from this belief — that when something is held with care and intention it transforms into something lasting. Every piece we create carries this quiet inheritance from the still waters of Rajasthan.
                  </p>
                </Reveal>
                <Reveal delay={460}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(196,168,130,0.6)" }}>
                    <span style={{ width: 22, height: "1px", background: "#B8975A", display: "block", opacity: 0.55 }} />
                    Udaipur, Rajasthan
                  </div>
                </Reveal>
              </div>
            </div>

            {/* ── MOBILE: 4 stacked paragraphs with left gold border ── */}
            <div className="udaipur-mobile " style={{ borderLeft: "1px solid rgba(196,168,130,0.4)"}}>
              {[
                "A city built around water, where water reflection softens everything into calm and completeness.",
                "The lakes do not rush — they hold the sky, the light, the moment.",
                "Here, Water was held and preserved over the time, allowed to settle into its own stillness — where calm was not found, but it gently formed through intention.",
                "Dhirago draws from this belief — that when something is held with care and intention it transforms into something lasting.",
              ].map((text, i) => (
                <Reveal key={i} delay={240 + i * 80}>
                  <p className="font-futura" style={{ fontWeight: 100, fontSize: "clamp(0.88rem,2.6vw,1.45rem)", color: "rgba(245,240,232,0.72)", lineHeight: 1.6, letterSpacing: "0.02em", margin: 0,  paddingLeft: "1.5rem", marginBottom: "1.5rem", textAlign: "justify" }}>
                    {text}
                  </p>
                </Reveal>
              ))}
              <Reveal delay={620}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(196,168,130,0.6)", marginTop: "0.5rem" }}>
                  <span style={{ width: 22, height: "1px", background: "#B8975A", display: "block", opacity: 0.55 }} />
                  Udaipur, Rajasthan
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            04. OUR SYMBOL — heron photo left, text right
        ════════════════════════════════════════════════════════ */}
        <section style={{ padding: "clamp(4rem,10vw,9rem) 0", background: "#F0EDE6" }}>
          <div style={S.inner}>

            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "clamp(3rem,6vw,5rem)" }}>
                <span className={`${josefin.className}`} style={{ display: "inline-flex", alignItems: "center", gap: "1rem", fontSize: "clamp(0.6rem,1vw,0.75rem)", letterSpacing: "0.5em", textTransform: "uppercase", color: "#A8937E" }}>
                  <span style={{ width: 28, height: "1px", background: "#C4A882", display: "block" }} />
                  Our Symbol
                  <span style={{ width: 28, height: "1px", background: "#C4A882", display: "block" }} />
                </span>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "clamp(3rem,7vw,7rem)", alignItems: "center" }}>

              {/* LEFT — heron photo + floating wordmark */}
              <Reveal>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <Image
                      src="/images/heron.jpeg"
                      alt="The Heron — symbol of Dhirago"
                      width={600} height={750}
                      style={{ width: "100%", height: "clamp(400px,55vw,680px)", objectFit: "cover", objectPosition: "center", display: "block" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(240,237,230,0.35) 0%,transparent 40%)", pointerEvents: "none" }} />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.55rem", background: "rgba(240,237,230,0.88)", backdropFilter: "blur(8px)", padding: "1rem 2rem" }}
                  >
                    <div style={{ width: 44, height: "1px", background: "linear-gradient(90deg,transparent,#C4A882,transparent)" }} />
                    <span className={`${josefin.className} uppercase`} style={{ fontWeight: 300, fontSize: "clamp(1rem,2vw,1.3rem)", letterSpacing: "0.5em", paddingLeft: "0.5em", color: "#1A1714", lineHeight: 1 }}>
                      Dhirago
                    </span>
                    <span className="font-futura" style={{ fontWeight: 300, fontSize: 8, letterSpacing: "0.38em", paddingLeft: "0.38em", textTransform: "uppercase", color: "#A8937E", lineHeight: 1 }}>
                      Conscious Luxury · Est. 2026
                    </span>
                    <div style={{ width: 44, height: "1px", background: "linear-gradient(90deg,transparent,#C4A882,transparent)" }} />
                  </motion.div>
                </div>
              </Reveal>

              {/* RIGHT — text */}
              <div>
                <Reveal delay={150}>
                  <h3 className={`${josefin.className} uppercase`} style={{ fontWeight: 300, fontSize: "clamp(1.5rem,3.5vw,2.5rem)", color: "#1A1714", lineHeight: 1.2, marginBottom: "0.5rem", letterSpacing: "0.06em" }}>
                    The <em style={{ color: "#7A6448" }}>Heron</em>
                  </h3>
                  <h3 className={`${josefin.className} uppercase`} style={{ fontWeight: 300, fontSize: "clamp(0.85rem,1.8vw,1.1rem)", color: "#6B5B4E", lineHeight: 1.3, marginBottom: "2.5rem", letterSpacing: "0.08em" }}>
                    a reflection of Dhirago
                  </h3>
                </Reveal>
                <Reveal delay={230}>
                  <div style={{ width: 36, height: "1px", background: "#C4A882", marginBottom: "2rem" }} />
                </Reveal>
                <Reveal delay={310}>
                  <p className="font-futura" style={{ fontWeight: 300, textAlign: "justify", fontSize: "clamp(0.88rem,1.1vw,1.2rem)", lineHeight: 2, color: "#4A4239", marginBottom: "1.4rem" }}>
                    The HERON forms the identity of Dhirago as a symbol of balance, patience, and quiet strength. Calm in its presence and deliberate in its movement, the bird reflects our approach to craftsmanship — thoughtful, refined, and intentional.
                  </p>
                </Reveal>
                <Reveal delay={390}>
                  <p className="font-futura" style={{ fontWeight: 300, textAlign: "justify", fontSize: "clamp(0.88rem,1.1vw,1.2rem)", lineHeight: 2, color: "#4A4239", marginBottom: "2.5rem" }}>
                    Its connection to water and nature also represents the calm spirit of Udaipur, the city that inspires our brand. At Dhirago, the heron reflects a process rooted in patience, detail, and timeless design — where every piece is created to endure beyond seasons.
                  </p>
                </Reveal>
                <Reveal delay={460}>
                  <blockquote style={{ borderLeft: "2px solid #C4A882", paddingLeft: "1.5rem", margin: 0 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem,2vw,1.4rem)", color: "#6B5B4E", lineHeight: 1.65, margin: 0, letterSpacing: "0.02em" }}>
                      "It does not chase. It waits — and in waiting, it finds."
                    </p>
                  </blockquote>
                </Reveal>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            05. CRAFTSMANSHIP — 3 hover cards
        ════════════════════════════════════════════════════════ */}
        <section style={{ padding: "clamp(4rem,10vw,9rem) 0", background: "#F5F0E8" }}>
          <div style={S.inner}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: "2rem", marginBottom: "clamp(3rem,6vw,5rem)", flexWrap: "wrap" }}>
                <h2 className={`${josefin.className} uppercase`} style={{ fontWeight: 200, fontSize: "clamp(2.2rem,5vw,1.8rem)", color: "#0F1C2E", letterSpacing: "0.08em" }}>
                  Craftsmanship
                </h2>
              </div>
            </Reveal>
            <div className="craft-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 1, background: "#E8E0D0", border: "1px solid #E8E0D0" }}>
              <CraftCard num="01" name="Thoughtful Construction" desc="Attention to the finer details that shapes look and longevity of the garment. From the selection of Natural fabrics to the precision of stitching, finishing and structuring every element is carefully handled." delay={0} />
              <CraftCard num="02" name="Hand Painting & Miniature Art" desc="Intricate detailing borrowed from the miniature art traditions of India — each motif rendered by hand, carrying the imprint of its maker and the memory of its heritage." delay={100} />
              <CraftCard num="03" name="Sashiko & Kantha" desc="Ancient Japanese and Indian needlework, thoughtfully incorporated. Each stitch carries the weight of tradition, the warmth of care, and the quiet resilience of things made to last." delay={200} />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            06. PHILOSOPHY — heron bg image, centred quote
        ════════════════════════════════════════════════════════ */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/heron.jpeg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", transform: "scale(1.03)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(8,12,18,0.45),rgba(8,12,18,0.6))" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.7) 1px,transparent 1px)", backgroundSize: "42px 42px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", padding: "0 2rem", textAlign: "center" }}>
            <Reveal>
              <p className={`${josefin.className} uppercase`} style={{ fontSize: "0.75rem", letterSpacing: "0.5em", color: "#C4A882", marginBottom: "2rem" }}>
                Our Philosophy
              </p>
            </Reveal>
            <Reveal delay={120}>
              <blockquote className={`${josefin.className} uppercase`} style={{   fontWeight: 300, fontSize: "clamp(1rem,4vw,1.7rem)", lineHeight: 1.45, color: "#F5F0E8", letterSpacing: "0.02em"}}>
                When something is held with care and intention,<br />it transforms into something lasting.
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            07. FABRICS — image left, text right
        ════════════════════════════════════════════════════════ */}
        <section style={{ padding: "clamp(4rem,10vw,9rem) 0", background: "#EDE6D9" }}>
          <div style={S.inner}>
            <div className="fab-grid" style={S.twoCol}>
              <Reveal>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src="/images/subscribe.jpg" alt="Premium Fabrics"
                    width={600} height={420}
                    style={{ width: "100%", height: "clamp(260px,40vw,420px)", objectFit: "cover", display: "block" }}
                  />
                  <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", background: "rgba(15,28,46,0.80)", padding: "0.6rem 1.2rem" }}>
                    <p className="font-futura" style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#C4A882", margin: 0 }}>
                      60-count European Linen
                    </p>
                  </div>
                </div>
              </Reveal>
              <div>
                <Reveal>
                  <h4 className={`${josefin.className} uppercase`} style={{ fontWeight: 300, fontSize: "clamp(1.6rem,3.5vw,2.8rem)", color: "#0F1C2E", lineHeight: 1.2, marginBottom: "1rem", letterSpacing: "0.06em" }}>
                    Fabrics{" "}
                    
                    <em className={`${josefin.className}  `} style={{ fontSize:"clamp(1.6rem,3.5vw,1.1rem)" , color: "#6B5B4E", textTransform: "none" }}>that breathe and evolve</em>
                  </h4>
                </Reveal>
                <Reveal delay={150}>
                  <div style={S.rule} />
                  <p className="font-futura" style={{ ...S.bodyDark }}>
                    We work with 60 count European linen and organically sourced fibres, valued for their breathability, natural texture, and the way they soften and evolve over time — sourced from the coastal regions of France and Belgium, this linen is cultivated from premium flax fibres grown in a naturally balanced environment.
                  </p>
                  <p className="font-futura" style={{ ...S.bodyDark, marginBottom: 0 }}>
                    Our designs are curated with the blend of exceptional material and traditional craftsmanship with a quiet contemporary sensibility that never shouts.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            08. PALETTE / THE STORY — text left, image right
        ════════════════════════════════════════════════════════ */}
        <section style={{ padding: "clamp(4rem,10vw,9rem) 0", background: "#F5F0E8" }}>
          <div style={S.inner}>
            <div className="story-grid" style={S.twoCol}>
              <div>
                <Reveal>
                  <p className={`${josefin.className} uppercase`} style={{ fontSize: "0.7rem", letterSpacing: "0.5em", color: "#A8937E", marginBottom: "1.5rem" }}>
                    Our Story
                  </p>
                  <h2 className={`${josefin.className} uppercase`} style={{ fontWeight: 200, fontSize: "clamp(1.6rem,3.5vw,1.1rem)", color: "#0F1C2E", lineHeight: 1.2, marginBottom: "1rem", letterSpacing: "0.06em" }}>
                    The Palette of{" "}
                    <em style={{ fontSize:"clamp(1.6rem,3.5vw,2.5rem)",fontWeight:300, color: "#6B5B4E", textTransform: "none" }}>DHIRAGO</em>
                  </h2>
                </Reveal>
                <Reveal delay={150}>
                  <div style={S.rule} />
                  <p className="font-futura" style={{ ...S.bodyDark }}>
                    DHIRAGO finds inspiration in the landscapes and subtle textures found in natural surroundings. The colour palette is shaped by tones that feel familiar and enduring — warm beiges, earthy browns, ecru, soft sky blues, muted lavenders, gentle greens, and sun-washed mustards. Rather than following seasonal colour trends, the focus remains on shades that feel timeless, calm, and easy to live with.
                  </p>
                  <p className="font-futura" style={{ ...S.bodyDark, marginBottom: 0 }}>
                    Designed with clean lines and relaxed silhouettes, the garments are created to become a natural part of everyday life. They are made to move effortlessly between moments — from workdays to slow weekends, casual gatherings to evening plans. At the heart of each piece is a belief that clothing should feel personal and comfortable, allowing individuality to come through naturally rather than demanding attention.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={100}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src="/images/subscribe.jpg" alt="Our Heritage"
                    width={600} height={500}
                    style={{ width: "100%", height: "clamp(280px,42vw,500px)", objectFit: "cover", display: "block" }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            09. CLOSING — dark, shimmer rule, large quote
        ════════════════════════════════════════════════════════ */}
        <section className="noise-overlay" style={{ position: "relative", padding: "clamp(5rem,12vw,11rem) 0", textAlign: "center", background: "linear-gradient(180deg,#0D1B2E 0%,#08121F 100%)", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)", width: "80%", height: "60%", background: "radial-gradient(ellipse,rgba(196,168,130,0.07) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ ...S.inner, position: "relative", zIndex: 2 }}>
            <Reveal>
              <div className="gold-rule-animate" style={{ width: 1, height: 80, margin: "0 auto 3.5rem" }} />
            </Reveal>
            <Reveal delay={100}>
              <p className="font-futura" style={{   fontWeight: 200, fontSize: "clamp(1.8rem,4.5vw,2.1rem)", color: "#F5F0E8", lineHeight: 1.3, maxWidth: 760, margin: "0 auto 3rem", letterSpacing: "0.02em" }}>
                In a world that moves quickly we choose to be still.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-futura" style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#C4A882", opacity: 0.7 }}>
                Dhirago · Conscious Luxury
              </p>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
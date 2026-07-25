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
      { threshold: 0.1 },
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
          background: hovered ? "#EDE6D9" : "rgba(255,255,255,8.1)",
          padding: "clamp(1.5rem,4vw,3rem) clamp(1.25rem,3vw,2.5rem)",
          transition: "background 0.4s",
          height: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "2.5rem",
            fontWeight: 300,
            color: "#E8E0D0",
            lineHeight: 1,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          {num}
        </div>
        <div
          className={`${josefin.className} uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-6`}
        >
          {name}
        </div>
        <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
          {desc}
        </p>
      </div>
    </Reveal>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const S = {
  inner: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 clamp(1.25rem,4vw,3rem)",
  },
  eyebrow: {
    fontSize: "1.02rem",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
    color: "#A8937E",
    marginBottom: "1.5rem",
  },
  eyebrowLight: {
    fontSize: "1.12rem",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
    color: "#C4A882",
    marginBottom: "2rem",
  },
  rule: { width: 40, height: 1, background: "#C4A882", marginBottom: "2rem" },
  bodyDark: {
    fontSize: "clamp(13px,1.5vw,1.088rem)",
    fontWeight: 300,
    lineHeight: 1.95,
    color: "#3D3530",
    textAlign: "justify",
    marginBottom: "1.5rem",
  },
  bodyLight: {
    fontSize: "clamp(13px,1.5vw,15px)",
    fontWeight: 300,
    lineHeight: 2,
    color: "rgba(245,240,232,0.65)",
    marginBottom: "1.5rem",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
    gap: "clamp(2.5rem,6vw,6rem)",
    alignItems: "center",
  },
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroVideoRef = useRef(null);
  const udaipurVideoRef = useRef(null);

  // Force autoplay on mount + after tab switch / page refresh
  useEffect(() => {
    const videos = [heroVideoRef.current, udaipurVideoRef.current];
    const tryPlay = () => videos.forEach((v) => v?.play().catch(() => {}));
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

      <div
        style={{ background: "#F5F0E8", color: "#3D3530", overflowX: "hidden" }}
      >
        {/* ════════════════════════════════════════════════════════
            01. HERO — pure autoplay, no text, scroll cue
        ════════════════════════════════════════════════════════ */}
        <section
          className="noise-overlay"
          style={{
            position: "relative",
            height: "100vh",
            minHeight: 600,
            overflow: "hidden",
            background: "#06101A",
          }}
        >
          <video
            ref={heroVideoRef}
            src="/videos/banner.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
          {/* Bottom fade only */}

          {/* Scroll cue */}
          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              color: "rgba(245,240,232,0.4)",
              fontFamily: "'Jost',sans-serif",
              fontSize: 9,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 1,
                height: 50,
                background: "linear-gradient(to bottom,#C4A882,transparent)",
                animation: "scrollPulse 2s ease-in-out infinite",
              }}
            />
            scroll
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            02. THE NAME / OUR STORY — centred heading + body
        ════════════════════════════════════════════════════════ */}
        <section
          style={{ padding: "clamp(5rem,11vw,9rem) 0", background: "#FAFAF7" }}
        >
          <div
            style={{
              maxWidth: 980,
              margin: "0 auto",
              padding: "0 clamp(1.5rem,5vw,3rem)",
              textAlign: "center",
            }}
          >
            <Reveal delay={100}>
              <h2
                className={`${josefin.className} uppercase leading-[1.90] text-[clamp(11px,1.3vw,1.01rem)]  text-[#333333] tracking-[0.01em] mb-6`}
              >
                A Label woven in stillness,defined by craftsmanship
              </h2>
            </Reveal>
          </div>
          <div
            style={{
              maxWidth: "850px",
              margin: "0 auto",
              padding: "0 24px",
            }}
          >
            <Reveal delay={260}>
              <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
                DHIRAGO originates from a narrative that simplicity holds depth
                and life is meant to be felt, not rushed. The name is inspired
                by <em style={{ fontStyle: "italic" }}>"Dheera"</em> a state of
                calmness that values clarity and thoughtful living. In a world
                that moves quickly, it offers a sense of ease—inviting you to
                slow down and experience beauty found in small details. DHIRAGO
                crafts menswear that celebrates simplicity, comfort, and the
                beauty of well-considered details.
              </p>
            </Reveal>
            <Reveal delay={340}>
              <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
                As a conscious luxury label, DHIRAGO works with 60 count
                European linen and organically sourced fabric, valued for its
                breathability, texture, and the way it softens over time.
                Produced in small batches in close collaboration with artisans,
                where each item is hand-cut, sewn by a single tailor from
                beginning to end and carefully hand-finished.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
                Craftsmanship lies at the heart of DHIRAGO, our designs draw
                from heritage techniques and time honoured practices like block
                printing, natural dye and intricate detailing of miniature art
                alongside handwork traditions inspired from sashiko, kantha and
                tangaliya weaving. We actively collaborate with karigars across
                India to create piece that celebrate traditional craftsmanship
                while remaining relevant to modern wardrobe.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            03. UDAIPUR — full-bleed video bg
            Desktop: big italic quote LEFT | body paras RIGHT
            Mobile:  heading → 4 stacked bordered paragraphs
        ════════════════════════════════════════════════════════ */}
        <section
          aria-label="Udaipur — the city of lakes"
          className="relative overflow-hidden flex min-h-screen items-center"
        
        >
          <video
            ref={udaipurVideoRef}
            src="/videos/udaipur1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"

          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background:
                "linear-gradient(to right, rgba(10,16,24,0.85) 0%, rgba(10,16,24,0.6) 50%, rgba(10,16,24,0.28) 100%)",
            }}
          />

          <div
            style={{
              ...S.inner,
              position: "relative",
              zIndex: 2,
              padding: "clamp(5rem,12vw,10rem) clamp(1.25rem,4vw,3rem)",
            }}
          >
            <Reveal>
              <p
                className={josefin.className}
                style={{
                  fontSize: "clamp(0.6rem,1vw,1.01rem)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  margin: "0 0 1.5rem",
                }}
              >
                Udaipur — the city of lakes
              </p>
            </Reveal>

            <div
              className="udaipur-grid"
              style={{
                display: "flex",
                gap: "clamp(1.5rem,4vw,3rem)",
                maxWidth: 780,
                alignItems: "stretch",
              }}
            >
              {/* Water-level rail: fills upward on reveal — the section's one signature move */}
              <div
                aria-hidden="true"
                className="udaipur-rail hidden"
                style={{
                  position: "relative",
                  width: 2,
                  flexShrink: 0,
                  background: "rgba(196,168,130,0.18)",
                  overflow: "hidden",
                }}
              >
                <div
                  className=" udaipur-rail-fill"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(to top, #C4A882, rgba(196,168,130,0.3))",
                  }}
                />
              </div>

              <div>
                {[
                  "A city built around water, where reflection softens everything into calm and completeness.",
                  "The lakes do not rush — they hold the sky, the light, the moment.",
                  "Here, water is held and preserved through time, allowed to settle into its own stillness — calm not found, but gently formed through intention.",
                  "DHIRAGO draws from this belief —  that when something is held with care and intention it transforms into something lasting.",
                ].map((text, i) => (
                  <Reveal key={i} delay={220 + i * 90}>
                    <p
                      className="font-futura font-light"
                      style={{
                        lineHeight: 1.9,
                        fontSize: "clamp(12px,1.3vw,1.01rem)",
                        color: "#ffffff",
                        letterSpacing: "0.03em",
                        marginBottom: "1.4rem",
                        maxWidth: 560,
                      }}
                    >
                      {text}
                    </p>
                  </Reveal>
                ))}

            
              </div>
            </div>
          </div>

          <style jsx>{`
            .udaipur-rail-fill {
              transform: translateY(100%);
              animation: udaipurFill 1.6s ease-out 0.3s forwards;
            }
            @keyframes udaipurFill {
              to {
                transform: translateY(0%);
              }
            }
            @media (max-width: 640px) {
              .udaipur-coords {
                display: none;
              }
              .udaipur-grid {
                gap: 1.25rem !important;
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .udaipur-rail-fill {
                animation: none;
                transform: translateY(0%);
              }
            }
          `}</style>
        </section>

        {/* ════════════════════════════════════════════════════════
            04. OUR SYMBOL — heron photo left, text right
        ════════════════════════════════════════════════════════ */}
        <section
          style={{ padding: "clamp(4rem,10vw,9rem) 0", background: "rgba(255,255,255,1.0)" }}
        >
          <div style={S.inner}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(min(100%,300px),1fr))",
                gap: "clamp(3rem,7vw,7rem)",
                alignItems: "center",
              }}
            >
              {/* LEFT — heron photo + floating wordmark */}
              <Reveal>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <Image
                      src="/images/heron.jpeg"
                      alt="The Heron — symbol of Dhirago"
                      width={600}
                      height={750}
                      style={{
                        width: "100%",
                        height: "clamp(400px,55vw,680px)",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top,rgba(240,237,230,0.35) 0%,transparent 40%)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
              </Reveal>

              {/* RIGHT — text */}
              <div>
                <Reveal delay={150}>
                  <h3
                    className={`${josefin.className} uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-6`}
                  >
                    The Heron a reflection of Dhirago
                  </h3>
                </Reveal>

                <Reveal delay={310}>
                  <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
                    The heron is DHIRAGO's mark - a symbol of balance, patience,
                    and quiet strength. Calmness in its presence and deliberate
                    in its movement, the bird reflects our approach to
                    craftsmanship — thoughtful, refined, and intentional. Its
                    connection to water and nature also represents the calm
                    spirit of Udaipur, the city that inspires our brand.
                  </p>
                </Reveal>
                {/* <Reveal delay={390}>
                  <p className="font-futura" style={{ fontWeight: 300, textAlign: "justify", fontSize: "clamp(0.88rem,1.1vw,1.2rem)", lineHeight: 2, color: "#4A4239", marginBottom: "2.5rem" }}>
                    Its connection to water and nature also represents the calm spirit of Udaipur, the city that inspires our brand. At Dhirago, the heron reflects a process rooted in patience, detail, and timeless design — where every piece is created to endure beyond seasons.
                  </p>
                </Reveal> */}
                {/* <Reveal delay={460}>
                  <blockquote style={{ borderLeft: "2px solid #C4A882", paddingLeft: "1.5rem", margin: 0 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem,2vw,1.4rem)", color: "#6B5B4E", lineHeight: 1.65, margin: 0, letterSpacing: "0.02em" }}>
                      "It does not chase. It waits — and in waiting, it finds."
                    </p>
                  </blockquote>
                </Reveal> */}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            05. CRAFTSMANSHIP — 3 hover cards
        ════════════════════════════════════════════════════════ */}
        <section
          style={{ padding: "clamp(4rem,10vw,9rem) 0", background: "rgba(255,255,255,1.0)" }}
        >
          <div style={S.inner}>
            <Reveal>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "2rem",
                  marginBottom: "clamp(1rem,1vw,1rem)",
                  flexWrap: "wrap",
                }}
              >
                <h2
                  className={`${josefin.className} uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-6`}
                >
                  Craftsmanship
                </h2>
              </div>
            </Reveal>
            <div
              className="craft-grid"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(min(100%,260px),1fr))",
                gap: 1,
                background: "#E8E0D0",
                border: "1px solid #E8E0D0",
              }}
            >
              <CraftCard
                num="01"
                name="High quality"
                desc="Quality begins with the fabric itself. Carefully sourced from trusted partners, each material is chosen for its natural character, exceptional comfort, and lasting durability. Every garment undergoes multiple stages of inspection and refinement before it reaches you"
                delay={0}
              />
              <CraftCard
                num="02"
                name="Artisan partnership"
                desc="Our biggest passion is working with rural artisans to sustain traditional craft techniques and textiles. We collaborate directly with them to design original textiles and handmade garments. Our aim is to bridge the gap between old craftsmanship and modern wardrobes."
                delay={100}
              />
              <CraftCard
                num="03"
                name="Thoughtful construction"
                desc="Attention to the finer details that shapes look and longevity of the garment. From the selection of Natural fabrics to the precision of stitching, finishing and structuring every element is carefully handled."
                delay={200}
              />
            </div>
          </div>
        </section>

        <section
          style={{ padding: "clamp(1rem,10vw,9rem) 0", background: "rgba(255,255,255,1.0)" }}
        >
          <div style={S.inner}>
            <div className="story-grid" style={S.twoCol}>
              <div>
                <Reveal>
                  <h2
                    className={`${josefin.className} uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
                  >
                    The Palette of DHIRAGO
                  </h2>
                </Reveal>
                <Reveal delay={150}>
                  <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3">
                    DHIRAGO finds inspiration in the landscapes and subtle
                    textures found in natural surroundings. The colour palette
                    is shaped by tones that feel familiar and enduring — warm
                    beiges, earthy browns, ecru, soft sky blues, muted
                    lavenders, gentle greens, and sun-washed mustards. Rather
                    than following seasonal colour trends, the focus remains on
                    shades that feel timeless, calm, and easy to live with.
                  </p>
                  <p className=" font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] ">
                    Designed with clean lines and relaxed silhouettes, the
                    garments are created to become a natural part of everyday
                    life. They are made to move effortlessly between moments —
                    from workdays to slow weekends, casual gatherings to evening
                    plans. Each piece is a belief that clothing should feel
                    personal and comfortable, allowing individuality to come
                    naturally rather than demanding attention.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={100}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "clamp(320px, 46vw, 560px)",
                  }}
                >
                  {/* Back image - offset up and to the right */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "62%",
                      height: "78%",
                      overflow: "hidden",
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src="/images/heron.jpeg"
                      alt="Our Heritage"
                      width={600}
                      height={500}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  {/* Front image - offset down and to the left, sits on top */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "62%",
                      height: "78%",
                      overflow: "hidden",
                      zIndex: 2,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                    }}
                  >
                    <Image
                      src="/images/hero-mul-story.jpeg"
                      alt="Our Heritage"
                      width={600}
                      height={500}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            06. PHILOSOPHY — heron bg image, centred quote
        ════════════════════════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/images/heron.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transform: "scale(1.03)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom,rgba(8,12,18,0.45),rgba(8,12,18,0.6))",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              backgroundImage:
                "radial-gradient(circle,rgba(255,255,255,0.7) 1px,transparent 1px)",
              backgroundSize: "42px 42px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "900px",
              padding: "0 2rem",
              textAlign: "center",
            }}
          >
            <Reveal delay={120}>
              <blockquote
                className={`${josefin.className} uppercase font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#ffffff] tracking-[0.23em]`}
              >
                When something is held with care and intention,
                
                it transforms into something lasting.
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            07. FABRICS — image left, text right
        ════════════════════════════════════════════════════════ */}

        {/* ════════════════════════════════════════════════════════
            08. PALETTE / THE STORY — text left, image right
        ════════════════════════════════════════════════════════ */}

        {/* ════════════════════════════════════════════════════════
            09. CLOSING — dark, shimmer rule, large quote
        ════════════════════════════════════════════════════════ */}
      </div>
    </>
  );
}

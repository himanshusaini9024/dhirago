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


export default function HandEmbroideryPage() {
      const [active, setActive] = useState(0);
    
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --white: #ffffff;
          --black: #000000;
          --text: #1a1a1a;
          --muted: #666666;
          --border: #e0e0e0;
          --ff-serif: 'Cormorant Garamond', serif;
          --ff-sans: 'Century Gothic", Futura, "Trebuchet MS", sans-serif;
          --ff-mono: 'Courier New', Courier, monospace;
        }

        body { font-family: var(--ff-sans); background: var(--white); color: var(--text); }

        /* NAV */
        .k-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: var(--white); border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 68px;
        }
        .k-nav-logo {
          font-family: var(--ff-sans); font-size: 13px; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase;
          text-decoration: none; color: var(--black);
        }
        .k-nav-center { display: flex; gap: 36px; list-style: none; }
        .k-nav-center a {
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          text-decoration: none; color: var(--black);
        }
        .k-nav-right { display: flex; gap: 28px; }
        .k-nav-right a {
          font-family: var(--ff-sans); font-size: 10px; font-weight: 400;
          letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; color: var(--black);
        }

        /* HERO */
        .k-hero { width: 100%; line-height: 0; }
        .k-hero img { width: 100%; height: auto; display: block; max-height: 100vh; object-fit: cover; }

        /* SHARED WRAP */
        .k-wrap { max-width: 1280px; margin: 0 auto; padding: 0 64px; }

        /* INTRO */
        .k-intro { padding: 96px 0; }
        .k-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .k-intro-heading {
          font-family: var(--ff-sans); font-size: 12px; font-weight: 600;
          letter-spacing: 0.25em; text-transform: uppercase; line-height: 1.7;
          margin-bottom: 28px; color: var(--black);
        }
        .k-intro-body {
                  font-family: 'Century Gothic", Futura, "Trebuchet MS", sans-serif;

           font-size: 13px; font-weight: 300;
          line-height: 2.1; color: var(--muted); letter-spacing: 0.02em;
        }
        .k-video-wrap { width: 100%; max-width: 340px; aspect-ratio: 9/16; overflow: hidden; background: #111; margin-left: auto; }
        .k-video-wrap video { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* ═══════════════════════════════════════
           PROCESS SECTION — matches image 2
           ═══════════════════════════════════════ */
        .k-process {
          padding: 80px 0 100px;
        }
        .k-process-title {
          font-family: var(--ff-serif);
          font-size: 37px;
          font-weight: 360;
          text-transform: uppercase;
          color: var(--black);
          text-align: center;
          margin-bottom: 60px;
        }
        .k-process-list {
          max-width: 1020px;
          color : #464646 !important;
          margin: 0 auto;
          letter-spacing : 1.6px !important;
        }
        .k-process-item {
          margin-bottom: 44px;
        }
        .k-process-item:last-child {
          margin-bottom: 0;
        }
        .k-process-item-title {
          font-family: 'Century Gothic", Futura, "Trebuchet MS", sans-serif;
          font-size: 13px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          display: block !important;
          margin-bottom: 10px !important;
        }
        .k-process-item-desc {
          font-family: 'Century Gothic", Futura, "Trebuchet MS", sans-serif;
          font-size: 13px !important;
          font-weight: 300 !important;
          line-height: 1.85 !important;
          text-align:justify;
          color: #1a1a1a !important;
          display: block !important;
        }

        /* PHOTO GRID */
         .k-photo-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 60px;
        }
        .k-photo-item { aspect-ratio: 4/3; overflow: hidden; line-height: 0; }
        .k-photo-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
        .k-photo-item:hover img { transform: scale(1.04); }
 @media (max-width: 640px) {
          .k-photo-grid { grid-template-columns: 1fr; padding: 0 20px; }
        }
        /* ARTIST */
        .k-artist-label { padding: 80px 0 0; }
        .k-artist-label h2 {
          font-family: var(--ff-sans); font-size: 12px; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase; color: var(--black);
          line-height: 1.8; margin-bottom: 0;
        }
        .k-artist-body { padding: 48px 0 80px; }
        .k-artist-grid { display: grid; grid-template-columns: 5fr 7fr; gap: 64px; align-items: start; }
        .k-artist-grid img { width: 100%; display: block; }
        .k-artist-bio p {
                  font-family: 'Century Gothic", Futura, "Trebuchet MS", sans-serif ;
font-size: 13px; font-weight: 300;
          line-height: 2.1; color: var(--muted); letter-spacing: 0.02em;
          margin-bottom: 22px;
        }

        /* QUOTE */
        .k-quote {
          padding: 60px 0 80px;
          border-top: 1px solid var(--border);
          text-align: center;
        }
        .k-quote p {
          font-family: var(--ff-sans); font-size: 13px; font-weight: 300;
          line-height: 2; color: var(--black); letter-spacing: 0.03em;
        }


        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .k-wrap { padding: 0 32px; }
          .k-intro-grid { grid-template-columns: 1fr; gap: 48px; }
          .k-video-wrap { max-width: 100%; aspect-ratio: 16/9; }
          .k-artist-grid { grid-template-columns: 1fr; }
          .k-nav-center { display: none; }
        }
        @media (max-width: 640px) {
          .k-wrap { padding: 0 20px; }
          .k-nav { padding: 0 20px; }
          .k-photo-grid { grid-template-columns: 1fr 1fr; }
        }


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
        
         .techniques-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }

            @media (max-width: 900px) {
          .techniques-grid { grid-template-columns: 1fr; gap: 3rem; }
          .heritage-grid   { grid-template-columns: 1fr; gap: 2.5rem; }
          .sticky-panel    { position: relative; top: unset; }
        }

        @media (max-width: 600px) {
          .tech-panel      { padding: 2rem !important; }
          .hero-heading    { font-size: clamp(2.2rem, 10vw, 3.5rem) !important; }
        }
      `}</style>

      {/* NAV */}

      {/* HERO */}
      <section className="k-hero">
        <img
          src="https://kardo.co/wp-content/uploads/2025/06/Hand-embroidery-scaled.jpg"
          alt="Hand Embroidery"
        />
      </section>

      {/* WHAT IS HAND EMBROIDERY */}
      <section className="k-intro">
        <div className="k-wrap">
          <div className="k-intro-grid">
            <div>
              <h2 className="k-intro-heading">
                A Touch ofEmbroidery
                <br />a Shade of Elegance
              </h2>
              <p className="k-intro-body">
                Indigenous textile techniques and natural fabrics — integrating
                time-honoured weaving practices into garments that remain
                connected to tradition while expressed with a modern
                sensibility.
              </p>
            </div>
            <div>
              <div className="k-video-wrap">
                <video
                  src="https://kardo.co/wp-content/uploads/2025/06/reel-2-2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="k-process">
        <div className="k-wrap">
          <h2 className="k-process-title">PROCESS</h2>
          <div className="k-process-list">
            {[
              {
                title: "PANEL MARKING",
                desc: "The journey of every garment begins from here- where fabric panels are carefully cut and marked according to the design blueprint, creating the foundation upon which the handwork unfolds.",
              },
              {
                title: "KHAKHA PINNING",
                desc: "The journey continues with our embroidery artisan, Ahmed bhai and his team. Here, the design is carefully traced onto paper and perforated by hand to create a khakha—a traditional stencil used to transfer the artwork onto the fabric. Serving as the blueprint for the embroidery, it ensures every detail is placed with precision before the handwork begins.",
              },
              {
                title: "CHAPPAI (MARKING THE EMBROIDERY)",
                desc: "Using the khakha as a guide, the design is delicately transferred onto the fabric using choona (lime) for darker fabrics and neel (indigo) for lighter ones. This meticulous process ensures every motif is positioned with precision, creating the foundation for embroidery that unfolds clarity.",
              },
              {
                title: "SETTING THE ADDA",
                desc: "Once marked, fabric is then carefully mounted onto a traditional wooden adda, where it is stretched and secured in place. With the canvas prepared, the embroidery enters its most intricate and time-intensive stage, guided by patience, precision, and skilled craftsmanship.",
              },
              {
                title: "HAND EMBROIDERY",
                desc: "With patience and precision, the embroidery slowly takes shape. Depending on the intricacy of the design, a single panel may require several days of dedicated handwork. Every stitch is executed with care and precision.",
              },
            ].map((step) => (
              <div key={step.title} className="k-process-item">
                <span className="k-process-item-title">{step.title}</span>
                <span className="k-process-item-desc">{step.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GRID */}
      <div className="k-photo-grid">
        {[
          "https://kardo.co/wp-content/uploads/2025/06/DSC00774-1024x1024.jpg",
          "https://kardo.co/wp-content/uploads/2025/06/DSC00825-2-1024x1024.jpg",
          "https://kardo.co/wp-content/uploads/2025/06/DSC00856-1024x1024.jpg",
          "https://kardo.co/wp-content/uploads/2025/06/DSC00757-1024x1024.jpg",
        ].map((src, i) => (
          <div key={i} className="k-photo-item">
            <img src={src} alt={`Process ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      {/* MEET THE ARTIST */}
      <section className="k-artist-label">
        <div className="k-wrap">
          <h2>MEET THE ARTIST:</h2>
          <h2>MOHAMMAD ASHRAF</h2>
        </div>
      </section>

      <section className="k-artist-body">
        <div className="k-wrap">
          <div className="k-artist-grid">
            <div>
              <img
                src="https://kardo.co/wp-content/uploads/2025/06/DSC00742-1-844x1024.jpg"
                alt="Mohammad Ashraf"
                loading="lazy"
              />
            </div>
            <div className="k-artist-bio">
              <p>
                Ashraf began his journey with embroidery in the workshops of
                Bombay's City Centre, where he learned the foundational grammar
                of the needle and frame. He moved to Delhi over two decades ago
                with a friend, both seeking new possibilities. That journey led
                him to jewelry designer Olivia Dar, the wife of our founder,
                Rikki Kher—a meeting that shaped the course of his craft. He has
                worked with her since, and in 2020, joined Kardo.
              </p>
              <p>
                There's a quiet, deliberate gesture to his way of working—each
                movement unhurried, each decision exacting. The needle answers a
                calm held in his fingers, his attention attuned to the subtle
                pull of the thread. What is drawn forth is never rushed, never
                overstated—only composed, thoughtful, and complete in its
                stillness.
              </p>
              <p>
                More than an artisan at our studio, Ashraf is a custodian of a
                tradition—continuing its evolution, thread by thread, in the
                present.
              </p>
            </div>
          </div>
        </div>
      </section>


          <section style={{ padding: "clamp(1rem, 8vw, 8rem) 0", background: "#FAFAF7" }}>
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

      {/* QUOTE */}
      <section className="k-quote">
        <div className="k-wrap">
          <p>
            "An exceptionally skilled artisan, with the most brilliant
            <br />
            hands—we couldn't have asked for anyone better."
          </p>
        </div>
      </section>
    </>
  );
}

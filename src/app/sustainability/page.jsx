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
];

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

export default function OurKissaPage() {
  const observerRef = useRef(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach(el => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #faf8f5;
          --white: #ffffff;
          --black: #111111;
          --text: #2a2a2a;
          --muted: #666;
          --light-border: #e8e4de;
          --green-dark: #162518;
          --green-mid: #4A7248;
          --green-light: #8DB88A;
          --sand: #EDE7D9;
          --font: "Century Gothic", Futura, "Trebuchet MS", sans-serif;
        }

        body { background: var(--cream); color: var(--text); font-family: var(--font); }

        /* ── PAGE WRAP ── */
        .ks-page { background: var(--cream); min-height: 100vh; }

        /* ── SHARED ── */
        .ks-center-col { max-width: 680px; margin: 0 auto; padding: 0 24px; }
        .ks-wide-col   { max-width: 1200px; margin: 0 auto; padding: 0 clamp(1.5rem, 5vw, 5rem); }

        /* ── HERO HEADING ── */
        .ks-hero-heading { padding: 64px 0 40px; }
        .ks-hero-heading h1 {
          font-family: var(--font);
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 300;
          color: var(--black);
          line-height: 1.1;
        }

        /* ── HERO IMAGE ── */
        .ks-hero-image { padding: 0 0 56px; display: flex; justify-content: center; }
        .ks-hero-image img {
          width: 100%; max-width: 600px; height: auto; display: block;
          aspect-ratio: 3/2; object-fit: cover;
        }

        /* ── INTRO TEXT ── */
        .ks-intro-text { padding: 0 0 48px; }
        .ks-intro-text p {
          font-family: var(--font); font-size: clamp(13px, 1.5vw, 16px);
          font-weight: 300; line-height: 1.75; color: var(--muted);
          letter-spacing: 0.01em; margin-bottom: 18px;
        }
        .ks-intro-text p:last-of-type { margin-bottom: 0; }

        /* ── MEET LINK ── */
        .ks-meet-link-wrap { padding: 4px 0 80px; }
        .ks-meet-link {
          font-family: var(--font); font-size: 12px; font-weight: 400;
          letter-spacing: 0.03em; color: var(--text);
          text-decoration: underline; text-underline-offset: 3px; transition: color 0.2s;
        }
        .ks-meet-link:hover { color: var(--black); }

        /* ── DIVIDER ── */
        .ks-divider { border: none; border-top: 1px solid var(--light-border); margin: 0; }

        /* ── KOSHISH SECTION ── */
        .ks-koshish { padding: clamp(48px, 8vw, 80px) 0; }
        .ks-koshish-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
        }
        .ks-koshish-text h2 {
          font-family: var(--font); font-size: clamp(14px, 1.8vw, 17px);
          font-weight: 500; letter-spacing: 0.04em;
          color: var(--black); margin-bottom: 20px; line-height: 1.5;
        }
        .ks-koshish-text p {
          font-family: var(--font); font-size: clamp(13px, 1.4vw, 15px);
          font-weight: 300; line-height: 1.95; color: var(--muted);
          margin-bottom: 14px; letter-spacing: 0.01em;
        }
        .ks-inline-link { color: var(--text); text-decoration: underline; text-underline-offset: 2px; font-weight: 400; }
        .ks-koshish-btn {
          display: inline-block; margin-top: 24px; padding: 10px 22px;
          background: var(--black); color: var(--white);
          font-family: var(--font); font-size: 11px; font-weight: 400;
          letter-spacing: 0.12em; text-transform: uppercase;
          text-decoration: none; border: none; cursor: pointer;
          transition: background 0.2s;
        }
        .ks-koshish-btn:hover { background: #333; }
        .ks-koshish-image img {
          width: 100%; height: auto; display: block;
          aspect-ratio: 4/3; object-fit: cover;
        }

        /* ── PILLAR CARDS ── */
        .pillars-section {
          padding: clamp(48px, 8vw, 80px) 0;
          background: var(--sand);
          position: relative; overflow: hidden;
        }
        .pillars-label {
          display: inline-block;
          border: 1px solid rgba(141,184,138,0.35);
          padding: 0.3rem 0.9rem;
          font-size: 9px; letter-spacing: 0.4em;
          text-transform: uppercase; color: var(--green-mid);
          margin-bottom: 1.5rem;
        }
        .pillars-heading {
          font-family: var(--font); font-weight: 100;
          font-size: clamp(18px, 2.5vw, 26px);
          letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--green-dark);
          margin-bottom: clamp(2rem, 5vw, 4rem);
        }
        .pillars-heading em { font-style: italic; color: var(--green-mid); font-weight: 100; }
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }
        .pillar-card {
          padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1.2rem, 2.5vw, 2rem);
          border: 1px solid rgba(141,184,138,0.2);
          background: rgba(255,255,255,0.55);
          transition: border-color 0.4s, background 0.4s, transform 0.4s;
          position: relative; overflow: hidden;
        }
        .pillar-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; width: 3px; height: 0;
          background: linear-gradient(to bottom, #8DB88A, #C4A882);
          transition: height 0.5s;
        }
        .pillar-card:hover { border-color: rgba(141,184,138,0.4); background: rgba(141,184,138,0.06); transform: translateY(-4px); }
        .pillar-card:hover::before { height: 100%; }
        .pillar-num { font-size: 0.8rem; color: rgba(74,114,72,0.45); font-weight: 100; }
        .pillar-title {
          font-family: var(--font); font-size: clamp(11px, 1.2vw, 13px);
          font-weight: 400; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--green-dark);
        }
        .pillar-body {
          font-family: var(--font); font-size: clamp(12px, 1.2vw, 13px);
          font-weight: 100; line-height: 1.85; color: #4A4035;
        }

        /* ── SUSTAINABILITY BG IMAGE SECTION ── */
        .sustain-section {
          position: relative;
          overflow: hidden;
          min-height: clamp(300px, 50vw, 520px);
          display: flex; align-items: center;
        }
        .sustain-bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .sustain-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            135deg,
            rgba(22,37,24,0.92) 0%,
            rgba(22,37,24,0.75) 40%,
            rgba(22,37,24,0.55) 70%,
            rgba(22,37,24,0.8) 100%
          );
        }
        .sustain-content {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto;
          padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 5rem);
          width: 100%;
        }
        .sustain-quote {
          font-family: var(--font);
          font-style: italic; font-weight: 200;
          font-size: clamp(18px, 2.8vw, 32px);
          letter-spacing: 0.03em;
          color: #F0EBE0;
          line-height: 1.55;
          max-width: 100%;
          margin-bottom: 2rem;
        }
        .sustain-rule {
          width: 48px; height: 1px;
          background: var(--green-light);
          margin-bottom: 1.5rem;
        }
        .sustain-tag {
          font-family: var(--font); font-size: 9px;
          letter-spacing: 0.45em; text-transform: uppercase;
          color: var(--green-light);
        }
        .sustain-deco {
          position: absolute; right: clamp(2rem, 8vw, 6rem);
          top: 50%; transform: translateY(-50%);
          opacity: 0.12; pointer-events: none;
        }

        /* ── CLOSING STRIP ── */
        .closing-strip {
          padding: clamp(4rem, 8vw, 7rem) 0;
          text-align: center;
          background: linear-gradient(180deg, #1C2E1E 0%, #162518 100%);
          position: relative; overflow: hidden;
        }
        .closing-line {
          width: 1px; height: 70px;
          background: linear-gradient(to bottom, transparent, var(--green-light), transparent);
          margin: 0 auto 3rem;
        }
        .closing-brand {
          font-family: var(--font); font-weight: 400;
          font-size: 9px; letter-spacing: 0.55em;
          text-transform: uppercase; color: var(--green-light);
          margin-bottom: 1rem;
        }
        .closing-sub {
          font-family: var(--font); font-style: italic;
          font-weight: 200; font-size: clamp(14px, 2vw, 20px);
          letter-spacing: 0.04em; color: rgba(240,235,224,0.35);
          margin-top: 0.5rem;
        }

        /* ── FADE-UP ── */
        .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fd2 { transition-delay: 0.12s; }
        .fd3 { transition-delay: 0.22s; }

        /* ══════════════════════════════════════
           RESPONSIVE — MOBILE FIRST
           ══════════════════════════════════════ */

        /* Tablet */
        @media (max-width: 900px) {
          .ks-koshish-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .ks-koshish-image { order: -1; }
          .ks-koshish-image img { aspect-ratio: 16/9; max-height: 300px; width: 100%; object-fit: cover; }

          .pillars-grid { grid-template-columns: 1fr 1fr; }

          .sustain-bg { background-attachment: scroll; }
          .sustain-deco { display: none; }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .ks-center-col { padding: 0 20px; }
          .ks-wide-col   { padding: 0 20px; }

          .ks-hero-heading { padding: 40px 0 28px; }
          .ks-hero-image   { padding: 0 0 36px; }
          .ks-hero-image img { max-width: 100%; aspect-ratio: 4/3; }

          .ks-intro-text { padding: 0 0 32px; }
          .ks-meet-link-wrap { padding: 4px 0 48px; }

          .ks-koshish { padding: 40px 0; }
          .ks-koshish-grid { grid-template-columns: 1fr; gap: 24px; }
          .ks-koshish-image img { aspect-ratio: 16/9; max-height: 220px; }

          .pillars-section { padding: 40px 0; }
          .pillars-grid { grid-template-columns: 1fr; gap: 1rem; }
          .pillar-card { padding: 1.4rem 1.2rem; }

          .sustain-section { min-height: 280px; }
          .sustain-quote { font-size: 18px; }
          .sustain-content { padding: 3rem 1.5rem; }

          .closing-strip { padding: 3rem 1.5rem; }
        }
      `}</style>

      <div className="ks-page">

        {/* ── OUR KISSA HEADING ── */}
        <div className="ks-hero-heading fade-up">
          <div className="ks-center-col">
            <h1>our Kissa</h1>
          </div>
        </div>

        {/* ── HERO IMAGE ── */}
        <div className="ks-hero-image fade-up fd2">
          <div className="ks-center-col" style={{ width: "100%" }}>
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
              alt="Kissa-goi products"
            />
          </div>
        </div>

        {/* ── INTRO TEXT ── */}
        <div className="ks-intro-text fade-up">
          <div className="ks-center-col">
            <p>Material choice, controlled production, and long-term wearability define sustainability at Dhirago.</p>
            <p>The brand works with natural fibres such as linen and organic cotton, selected for their biodegradability and lower environmental impact compared to synthetic alternatives. Linen, in particular, is a low-resource fibre, requiring minimal irrigation and fewer chemical inputs during cultivation.</p>
            <p>Production follows a small-batch model, allowing better control over quantities and reducing excess inventory. Fabric utilisation is carefully managed by minimising cutting waste, with pattern planning and efficient material use.</p>
            <p>Operations are kept low-impact, with limited reliance on heavy industrial methods and a preference for controlled, resource-efficient techniques.</p>
            <p>Recycled and leftover materials are incorporated wherever possible within the production cycle, reducing the need for new raw resources and limiting material waste. Packaging and auxiliary components are also selected with consideration for reduced environmental impact.</p>
          </div>
        </div>

        <hr className="ks-divider" />

        {/* ── KOSHISH SECTION ── */}
        <section className="ks-koshish fade-up">
          <div className="ks-wide-col">
            <div className="ks-koshish-grid">
              <div className="ks-koshish-text">
                <h2>Koshish, our zero waste initiative</h2>
                <p>We are dedicated to becoming a zero-waste company. To that end, we create one-of-a-kind products out of all the accumulated scraps through our <a href="#" className="ks-inline-link">Koshish edit</a>.</p>
                <p>To know more about Koshish, <a href="#" className="ks-inline-link">click here</a>.</p>
                <a href="#" className="ks-koshish-btn">Shop Koshish</a>
              </div>
              <div className="ks-koshish-image fd2">
                <img
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80"
                  alt="Koshish zero waste"
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="ks-divider" />

        {/* ── FOUR PILLARS ── */}
        <section className="pillars-section">
          <div className="ks-wide-col">
            <Reveal>
              <span className="pillars-label">Core Principles</span>
              <h2 className="pillars-heading">
                Four Pillars of <em>Responsibility</em>
              </h2>
            </Reveal>
            <div className="pillars-grid">
              {pillars.map((p, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="pillar-card">
                    <div style={{ marginBottom: "1.5rem" }}>{p.icon}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
                      <span className="pillar-num">{p.num}</span>
                      <h3 className="pillar-title">{p.title}</h3>
                    </div>
                    <p className="pillar-body">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SUSTAINABILITY — REAL BACKGROUND IMAGE
            ══════════════════════════════════════════ */}
        <section className="sustain-section">
          {/* Background image layer */}
          <div className="sustain-bg" />
          {/* Dark overlay */}
          <div className="sustain-overlay" />
          {/* Leaf deco top-right */}
          <div className="sustain-deco">
            <LeafDeco size={340} opacity={1} />
          </div>
          {/* Content */}
          <div className="sustain-content">
            <Reveal>
              <div className="sustain-rule" />
              <p className="sustain-tag">Dhirago · Philosophy</p>
              <p className="sustain-quote" style={{ marginTop: "1.5rem" }}>
                "Sustainability is not a feature — it is the quiet discipline behind every decision we make."
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── CLOSING STRIP ── */}
     

      </div>
    </>
  );
}
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES  (injected once via <style> tag)
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

  :root {
    --fb-serif: 'Cormorant Garamond', Georgia, serif;
    --fb-sans : 'Jost', sans-serif;
    --fb-white: #ffffff;
    --fb-sand : #c9b99a;
    --fb-charcoal: #1a1712;
    --fb-black: #0e0d0b;
    --ease-expo: cubic-bezier(0.16,1,0.3,1);
    --ease-slide: cubic-bezier(0.77,0,0.18,1);
  }

  /* ── Hero Carousel ────────────────────── */
  .fb-hc-slide .fb-hc-bg { transform: scale(1); transition: transform 10s ease-out; }
  .fb-hc-slide.active .fb-hc-bg { transform: scale(1.07); }

  .fb-hc-slide .fb-hc-tag,
  .fb-hc-slide .fb-hc-title,
  .fb-hc-slide .fb-hc-sub,
  .fb-hc-slide .fb-hc-cta {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity .75s var(--ease-expo), transform .75s var(--ease-expo);
  }
  .fb-hc-slide.active .fb-hc-tag  { opacity:1; transform:translateY(0); transition-delay:.08s; }
  .fb-hc-slide.active .fb-hc-title{ opacity:1; transform:translateY(0); transition-delay:.22s; }
  .fb-hc-slide.active .fb-hc-sub  { opacity:1; transform:translateY(0); transition-delay:.34s; }
  .fb-hc-slide.active .fb-hc-cta  { opacity:1; transform:translateY(0); transition-delay:.46s; }

  /* ── Promo card link reveal ───────────── */
  .fb-promo-card .fb-promo-link {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity .35s, transform .35s, gap .3s, color .3s;
  }
  .fb-promo-card:hover .fb-promo-link { opacity:1; transform:translateY(0); }

  /* ── Marquee ──────────────────────────── */
  @keyframes fb-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .fb-marquee-track { animation: fb-marquee 28s linear infinite; }
  .fb-marquee-track:hover { animation-play-state: paused; }

  /* ── Shared hover helpers ─────────────── */
  .fb-zoom-on-hover { transition: transform .8s var(--ease-expo); }
  .fb-zoom-parent:hover .fb-zoom-on-hover { transform: scale(1.05); }
  .fb-promo-card:hover .fb-zoom-on-hover  { transform: scale(1.06); }
  .fb-feat-wrap:hover .fb-zoom-on-hover   { transform: scale(1.03); }

  /* ── CTA underline button ─────────────── */
  .fb-cta-line { transition: border-color .3s, gap .3s; }
  .fb-cta-line:hover { border-color: #fff !important; gap: 18px !important; }
  .fb-cta-line:hover svg { transform: translateX(5px); }
  .fb-cta-line svg { transition: transform .3s; }

  /* ── Ghost button ─────────────────────── */
  .fb-ghost-btn { transition: background .3s, border-color .3s; }
  .fb-ghost-btn:hover { background: rgba(255,255,255,.2) !important; border-color: rgba(255,255,255,.65) !important; }

  /* ── Split banner link ────────────────── */
  .fb-sb-link { transition: color .3s, border-color .3s; }
  .fb-sb-link:hover { color: #fff !important; border-color: #fff !important; }

  /* ── Arrow buttons ────────────────────── */
  .fb-arrow-btn { transition: background .3s, border-color .3s; }
  .fb-arrow-btn:hover { background: rgba(255,255,255,.2) !important; border-color: rgba(255,255,255,.55) !important; }

  /* ── Dot nav ──────────────────────────── */
  .fb-dot { transition: background .3s, height .3s; }
`;

function InjectStyles() {
  useEffect(() => {
    if (document.getElementById("fb-global-styles")) return;
    const el = document.createElement("style");
    el.id = "fb-global-styles";
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
  }, []);
  return null;
}

/* ─────────────────────────────────────────────────────────────
   ARROW ICON
───────────────────────────────────────────────────────────── */
const ArrowRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0 }}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const ArrowLeft = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   COMPONENT 1 — HERO CAROUSEL BANNER
───────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    bg: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1400&q=80",
    bgPos: "62% center",
    overlay: "linear-gradient(to right,rgba(0,0,0,.75) 30%,rgba(0,0,0,.08) 70%)",
    tag: "New Arrivals — SS'26",
    title: ["Rise", "with Purpose"],
    sub: "100% European Linen",
    cta: "Shop New In",
  },
  {
    bg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80",
    bgPos: "42% center",
    overlay: "linear-gradient(to right,rgba(0,0,0,.68) 35%,rgba(0,0,0,.06) 72%)",
    tag: "The Collection",
    title: ["Crafted", "Masterfully."],
    sub: "Quiet confidence, refined",
    cta: "Explore Collection",
  },
  {
    bg: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1400&q=80",
    bgPos: "50% 25%",
    overlay: "linear-gradient(135deg,rgba(180,140,100,.5) 0%,rgba(0,0,0,.72) 60%)",
    tag: "Masters of Linen",
    title: ["Spirit of", "Modern India"],
    sub: "Strong fabrics, precise fits",
    cta: "Discover More",
  },
];

const DURATION = 5200;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const goTo = useCallback((idx) => {
    const next = ((idx % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setCurrent(next);
  }, []);

  const startProgress = useCallback(() => {
    if (!progressRef.current) return;
    const el = progressRef.current;
    el.style.transition = "none";
    el.style.width = "0%";
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.transition = `width ${DURATION}ms linear`;
        el.style.width = "100%";
      })
    );
  }, []);

  useEffect(() => {
    startProgress();
    if (paused) return;
    timerRef.current = setTimeout(() => goTo(current + 1), DURATION);
    return () => clearTimeout(timerRef.current);
  }, [current, paused, goTo, startProgress]);

  /* Touch swipe */
  const touchX = useRef(0);

  const s = {
    section: {
      position: "relative",
      overflow: "hidden",
      background: "var(--fb-black)",
      fontFamily: "var(--fb-sans)",
    },
    track: {
      display: "flex",
      transition: "transform .95s var(--ease-slide)",
      transform: `translateX(-${current * 100}%)`,
    },
    slide: {
      minWidth: "100%",
      height: 580,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-end",
    },
    bg: {
      position: "absolute",
      inset: 0,
      backgroundSize: "cover",
    },
    content: {
      position: "relative",
      zIndex: 2,
      padding: "0 56px 64px",
      maxWidth: 640,
    },
    tag: {
      display: "block",
      fontSize: 9,
      fontWeight: 400,
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.55)",
      marginBottom: 16,
    },
    title: {
      fontFamily: "var(--fb-serif)",
      fontWeight: 300,
      fontSize: 72,
      lineHeight: 1.0,
      color: "#fff",
      letterSpacing: "-0.01em",
      marginBottom: 20,
    },
    sub: {
      fontSize: 11,
      fontWeight: 300,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.7)",
      marginBottom: 36,
    },
    cta: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      fontSize: 10,
      fontWeight: 400,
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "#fff",
      borderBottom: "1px solid rgba(255,255,255,.55)",
      paddingBottom: 5,
      cursor: "pointer",
      textDecoration: "none",
    },
    dots: {
      position: "absolute",
      right: 52,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    dot: (active) => ({
      width: 2,
      height: active ? 40 : 22,
      background: active ? "#fff" : "rgba(255,255,255,.25)",
      cursor: "pointer",
      border: "none",
      padding: 0,
    }),
    counter: {
      position: "absolute",
      right: 56,
      bottom: 64,
      zIndex: 10,
      fontSize: 9,
      fontWeight: 300,
      letterSpacing: "0.24em",
      color: "rgba(255,255,255,.4)",
    },
    progress: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: 2,
      background: "rgba(255,255,255,.85)",
      width: "0%",
      zIndex: 10,
    },
    arrow: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      width: 44,
      height: 44,
      border: "1px solid rgba(255,255,255,.25)",
      background: "rgba(255,255,255,.1)",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(8px)",
    },
  };

  return (
    <section
      style={s.section}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
      }}
      aria-label="Hero banner carousel"
    >
      <div style={s.track}>
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`fb-hc-slide${i === current ? " active" : ""}`}
            style={s.slide}
          >
            <div
              className="fb-hc-bg"
              style={{ ...s.bg, backgroundImage: `url('${slide.bg}')`, backgroundPosition: slide.bgPos }}
            />
            <div style={{ position: "absolute", inset: 0, background: slide.overlay }} />
            <div style={s.content}>
              <span className="fb-hc-tag" style={s.tag}>{slide.tag}</span>
              <h2 className="fb-hc-title" style={s.title}>
                {slide.title[0]}<br />
                <em style={{ fontStyle: "italic", fontWeight: 300 }}>{slide.title[1]}</em>
              </h2>
              <p className="fb-hc-sub" style={s.sub}>{slide.sub}</p>
              <a className="fb-hc-cta fb-cta-line" href="#" style={s.cta}>
                {slide.cta} <ArrowRight />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        className="fb-arrow-btn"
        style={{ ...s.arrow, left: 24 }}
        onClick={() => goTo(current - 1)}
        aria-label="Previous slide"
      >
        <ArrowLeft />
      </button>
      <button
        className="fb-arrow-btn"
        style={{ ...s.arrow, left: 80 }}
        onClick={() => goTo(current + 1)}
        aria-label="Next slide"
      >
        <ArrowRight size={18} />
      </button>

      {/* Dots */}
      <nav style={s.dots} aria-label="Slide navigation">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className="fb-dot"
            style={s.dot(i === current)}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </nav>

      {/* Counter */}
      <span style={s.counter} aria-hidden="true">
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </span>

      {/* Progress bar */}
      <div ref={progressRef} style={s.progress} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT 2 — SPLIT BANNER  (Photo + Copy)
───────────────────────────────────────────────────────────── */
export function SplitBanner({
  photoUrl = "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=900&q=80",
  photoPosition = "38% center",
  eyebrow = "SS'26 Editorial",
  title = ["Masters", "of Linen"],
  body = "Built around clarity and purpose — strong fabrics, precise fits, and long‑term wearability. Each garment reflects quiet confidence and the spirit of modern craftsmanship.",
  ctaLabel = "View Lookbook",
  ctaHref = "#",
  reverse = false,
}) {
  const s = {
    wrap: {
      display: "flex",
      flexDirection: reverse ? "row-reverse" : "row",
      width: "100%",
      minHeight: 440,
      overflow: "hidden",
      fontFamily: "var(--fb-sans)",
    },
    photo: {
      flex: "0 0 55%",
      position: "relative",
      overflow: "hidden",
    },
    photoBg: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url('${photoUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: photoPosition,
    },
    photoOverlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,.18)" },
    copy: {
      flex: "0 0 45%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "56px 52px",
      background: "#1c1a15",
      position: "relative",
    },
    copyLine: {
      position: "absolute",
      left: reverse ? "auto" : 0,
      right: reverse ? 0 : "auto",
      top: "20%",
      bottom: "20%",
      width: 1,
      background: "rgba(255,255,255,.08)",
    },
    eyebrow: {
      fontSize: 9,
      fontWeight: 400,
      letterSpacing: "0.36em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.55)",
      marginBottom: 28,
    },
    title: {
      fontFamily: "var(--fb-serif)",
      fontSize: 58,
      fontWeight: 300,
      lineHeight: 0.95,
      color: "#fff",
      marginBottom: 28,
    },
    divider: { width: 40, height: 1, background: "rgba(255,255,255,.25)", margin: "0 auto 28px" },
    body: {
      fontSize: 12,
      fontWeight: 300,
      letterSpacing: "0.04em",
      lineHeight: 2.0,
      color: "rgba(255,255,255,.58)",
      marginBottom: 40,
      maxWidth: 300,
    },
    link: {
      fontSize: 10,
      fontWeight: 400,
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.8)",
      borderBottom: "1px solid rgba(255,255,255,.3)",
      paddingBottom: 4,
      cursor: "pointer",
      textDecoration: "none",
    },
  };

  return (
    <div style={s.wrap}>
      <div className="fb-zoom-parent" style={s.photo}>
        <div className="fb-zoom-on-hover fb-hc-bg" style={s.photoBg} />
        <div style={s.photoOverlay} />
      </div>
      <div style={s.copy}>
        <div style={s.copyLine} />
        <p style={s.eyebrow}>{eyebrow}</p>
        <h3 style={s.title}>
          {title[0]}<br />
          <em style={{ fontStyle: "italic" }}>{title[1]}</em>
        </h3>
        <div style={s.divider} />
        <p style={s.body}>{body}</p>
        <a className="fb-sb-link" href={ctaHref} style={s.link}>{ctaLabel}</a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT 3 — WIDE FEATURE BANNER  (Full-width centered)
───────────────────────────────────────────────────────────── */
export function FeatureBanner({
  photoUrl = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80",
  season = "Limited Edition · SS'26",
  titleLines = ["Softer", "Hand Feel."],
  ctaLabel = "Shop the Edit",
  ctaHref = "#",
  height = 360,
}) {
  const s = {
    wrap: {
      width: "100%",
      height,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      fontFamily: "var(--fb-sans)",
    },
    bg: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url('${photoUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center 30%",
    },
    overlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,.50)" },
    content: { position: "relative", zIndex: 2 },
    season: {
      fontSize: 9,
      fontWeight: 400,
      letterSpacing: "0.4em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.55)",
      marginBottom: 14,
    },
    title: {
      fontFamily: "var(--fb-serif)",
      fontSize: 80,
      fontWeight: 300,
      lineHeight: 0.92,
      color: "#fff",
      marginBottom: 36,
    },
    cta: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      fontSize: 10,
      fontWeight: 400,
      letterSpacing: "0.26em",
      textTransform: "uppercase",
      color: "#fff",
      border: "1px solid rgba(255,255,255,.35)",
      padding: "13px 32px",
      backdropFilter: "blur(6px)",
      background: "rgba(255,255,255,.08)",
      cursor: "pointer",
      textDecoration: "none",
    },
  };

  return (
    <div className="fb-feat-wrap" style={s.wrap}>
      <div className="fb-zoom-on-hover" style={s.bg} />
      <div style={s.overlay} />
      <div style={s.content}>
        <p style={s.season}>{season}</p>
        <h3 style={s.title}>
          {titleLines[0]}
          <span style={{ display: "block", fontStyle: "italic" }}>{titleLines[1]}</span>
        </h3>
        <a className="fb-ghost-btn" href={ctaHref} style={s.cta}>
          {ctaLabel} <ArrowRight />
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT 4 — MARQUEE ANNOUNCEMENT BANNER
───────────────────────────────────────────────────────────── */
const DEFAULT_ITEMS = [
  "Free shipping on orders over ₹1,999",
  "New SS'26 collection — now live",
  "100% European linen — sustainably sourced",
  "Easy 30-day returns",
  "Crafted for the modern Indian gentleman",
];

export function MarqueeBanner({ items = DEFAULT_ITEMS, bg = "#c9b99a", color = "#1a1712" }) {
  const doubled = [...items, ...items];

  const s = {
    wrap: { overflow: "hidden", background: bg, padding: "13px 0", whiteSpace: "nowrap", fontFamily: "var(--fb-sans)" },
    track: { display: "inline-flex" },
    item: {
      display: "inline-flex",
      alignItems: "center",
      gap: 20,
      padding: "0 28px",
      fontSize: 10,
      fontWeight: 400,
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color,
    },
    dot: { width: 4, height: 4, borderRadius: "50%", background: "rgba(26,23,18,.4)", flexShrink: 0 },
  };

  return (
    <div style={s.wrap} role="marquee" aria-label="Announcements">
      <div className="fb-marquee-track" style={s.track}>
        {doubled.map((text, i) => (
          <span key={i} style={s.item}>
            {text} <span style={s.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT 5 — PRODUCT PROMO CARD GRID
───────────────────────────────────────────────────────────── */
const DEFAULT_CARDS = [
  {
    bg: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    bgPos: "60% center",
    tag: "Linen Shirts",
    title: ["Classic", "Linen"],
    cta: "Shop Now",
    href: "#",
  },
  {
    bg: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80",
    bgPos: "50% 20%",
    tag: "New In",
    title: ["Resort", "Edit"],
    cta: "Explore",
    href: "#",
  },
  {
    bg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bgPos: "45% center",
    tag: "Occasion Wear",
    title: ["The", "Collection"],
    cta: "View All",
    href: "#",
  },
];

export function PromoCardGrid({ cards = DEFAULT_CARDS, height = 420 }) {
  const s = {
    grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: "#111", fontFamily: "var(--fb-sans)" },
    card: { position: "relative", height, overflow: "hidden", cursor: "pointer" },
    bg: {
      position: "absolute",
      inset: 0,
      backgroundSize: "cover",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top,rgba(0,0,0,.72) 0%,rgba(0,0,0,.1) 55%)",
      transition: "background .4s",
    },
    body: { position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 28px 32px" },
    cardTag: {
      fontSize: 9,
      fontWeight: 400,
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: "var(--fb-sand)",
      marginBottom: 8,
      display: "block",
    },
    cardTitle: {
      fontFamily: "var(--fb-serif)",
      fontSize: 30,
      fontWeight: 300,
      lineHeight: 1.1,
      color: "#fff",
      marginBottom: 16,
    },
    cardLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: 9,
      fontWeight: 400,
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.6)",
      textDecoration: "none",
    },
  };

  return (
    <div style={s.grid}>
      {cards.map((card, i) => (
        <div key={i} className="fb-promo-card" style={s.card}>
          <div
            className="fb-zoom-on-hover"
            style={{ ...s.bg, backgroundImage: `url('${card.bg}')`, backgroundPosition: card.bgPos }}
          />
          <div style={s.overlay} />
          <div style={s.body}>
            <span style={s.cardTag}>{card.tag}</span>
            <h4 style={s.cardTitle}>
              {card.title[0]}<br />{card.title[1]}
            </h4>
            <a className="fb-promo-link" href={card.href} style={s.cardLink}>
              {card.cta} <ArrowRight size={12} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DEFAULT EXPORT — Full page demo
───────────────────────────────────────────────────────────── */
export default function FashionBanners() {
  return (
    <div style={{ background: "#0e0d0b" }}>
      <InjectStyles />

      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Marquee */}
      <MarqueeBanner />

      {/* 3. Split Banner */}
      <SplitBanner />

      {/* 4. Feature Banner */}
      <FeatureBanner />

      {/* 5. Promo Cards */}
      <PromoCardGrid />

      {/* 6. Reversed split */}
      <SplitBanner
        photoUrl="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=900&q=80"
        photoPosition="50% center"
        eyebrow="About the brand"
        title={["Clarity &", "Purpose"]}
        body="We built Andamen around strong fabrics, precise fits, and long‑term wearability. Each garment reflects quiet confidence and the spirit of modern India."
        ctaLabel="Our Story"
        reverse
      />
    </div>
  );
}
"use client";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    product: "https://11-11.in/cdn/shop/files/MEETTHEMAKERS1.webp?v=1778240611&width=1800",
    ambient: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=80&fit=crop",
    label: "The Mist Shirt",
    subtitle: "Linen · Sun-washed Yellow",
    tag: "New Season",
    price: "₹ 3,800",
  },
  {
    product: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&fit=crop",
    ambient: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=80&fit=crop",
    label: "The Dusk Drape",
    subtitle: "Handwoven · Sage Khadi",
    tag: "Limited Edition",
    price: "₹ 6,400",
  },
];

const mobileBanners = slides.flatMap((s) => [
  { img: s.product, label: s.label, subtitle: s.subtitle, tag: s.tag, price: s.price, type: "product" },
  { img: s.ambient, label: s.label, subtitle: s.subtitle, tag: s.tag, price: s.price, type: "ambient" },
]);

const DURATION = 6000;
const FADE_MS = 800;

// CrossfadeImage: keeps OLD image mounted underneath so there's never a black frame
function CrossfadeImage({ src, alt, className }) {
  const [displayed, setDisplayed] = useState(src);
  const [incoming, setIncoming] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (src === displayed) return;
    // Mount new image on top at opacity-0
    setIncoming(src);
    setFading(false);
    // Tiny rAF delay so browser paints it at opacity-0 first
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setFading(true));
    });
    // After transition finishes, promote incoming → displayed
    const t = setTimeout(() => {
      setDisplayed(src);
      setIncoming(null);
      setFading(false);
    }, FADE_MS + 50);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Layer 1 — current (always visible) */}
      <img
        src={displayed}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Layer 2 — incoming (fades in on top) */}
      {incoming && (
        <img
          src={incoming}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: fading ? 1 : 0,
            transform: fading ? "scale(1)" : "scale(1.04)",
            transition: `opacity ${FADE_MS}ms ease-out, transform ${FADE_MS + 200}ms ease-out`,
          }}
        />
      )}
    </div>
  );
}

export default function Hero() {
  const [desktopIdx, setDesktopIdx] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);

  // Text transition only (no image flash)
  const [dTextKey, setDTextKey] = useState(0);
  const [mTextKey, setMTextKey] = useState(0);

  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const desktopTimerRef = useRef(null);
  const mobileTimerRef = useRef(null);

  const startProgress = () => {
    clearInterval(progressRef.current);
    setProgress(0);
    const t0 = Date.now();
    progressRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - t0) / DURATION) * 100, 100));
    }, 30);
  };

  // Desktop auto-advance
  useEffect(() => {
    startProgress();
    desktopTimerRef.current = setInterval(() => {
      setDesktopIdx((c) => (c + 1) % slides.length);
      setDTextKey((k) => k + 1);
      startProgress();
    }, DURATION);
    return () => { clearInterval(desktopTimerRef.current); clearInterval(progressRef.current); };
  }, []);

  const goToDesktop = (idx) => {
    if (idx === desktopIdx) return;
    setDesktopIdx(idx);
    setDTextKey((k) => k + 1);
    startProgress();
    clearInterval(desktopTimerRef.current);
    desktopTimerRef.current = setInterval(() => {
      setDesktopIdx((c) => (c + 1) % slides.length);
      setDTextKey((k) => k + 1);
      startProgress();
    }, DURATION);
  };

  // Mobile auto-advance
  useEffect(() => {
    mobileTimerRef.current = setInterval(() => {
      setMobileIdx((c) => (c + 1) % mobileBanners.length);
      setMTextKey((k) => k + 1);
    }, DURATION);
    return () => clearInterval(mobileTimerRef.current);
  }, []);

  const goToMobile = (idx) => {
    if (idx === mobileIdx) return;
    setMobileIdx(idx);
    setMTextKey((k) => k + 1);
    clearInterval(mobileTimerRef.current);
    mobileTimerRef.current = setInterval(() => {
      setMobileIdx((c) => (c + 1) % mobileBanners.length);
      setMTextKey((k) => k + 1);
    }, DURATION);
  };

  const ds = slides[desktopIdx];
  const mb = mobileBanners[mobileIdx];

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP  (md+)  —  full-viewport split
      ══════════════════════════════════════ */}
      <section className="relative hidden md:flex w-full h-screen bg-[#0d0d0d] overflow-hidden">

        {/* Left — product */}
        <CrossfadeImage
          src={ds.product}
          alt={ds.label}
          className="w-1/2 h-full"
        />

        {/* Right — ambient */}
        <CrossfadeImage
          src={ds.ambient}
          alt=""
          className="w-1/2 h-full"
        />

        {/* Centre hairline */}
        <div className="absolute left-1/2 top-0 -translate-x-px w-px h-full bg-white/15 z-10 pointer-events-none" />

        {/* Bottom scrim */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0d0d0d]/90 to-transparent pointer-events-none z-10" />
        {/* Side vignettes */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-t from-[#0d0d0d]/50 via-transparent to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-t from-[#0d0d0d]/60 via-transparent to-transparent pointer-events-none z-10" />

        {/* Tag — top left */}
        <div className="absolute top-8 left-10 z-20">
          <span className="inline-block text-[9px] tracking-[0.28em] uppercase text-white/50 border border-white/15 px-3 py-1.5">
            {ds.tag}
          </span>
        </div>

        {/* Counter — top right */}
        <div className="absolute top-8 right-10 z-20 flex items-center gap-3">
          <span className="text-[10px] tracking-[0.2em] text-white/30 font-light">0{desktopIdx + 1}</span>
          <div className="relative w-10 h-px bg-white/20">
            <div className="absolute top-0 left-0 h-full bg-white/70" style={{ width: `${progress}%`, transition: "width 0.1s linear" }} />
          </div>
          <span className="text-[10px] tracking-[0.2em] text-white/20 font-light">0{slides.length}</span>
        </div>

        {/* Text — bottom left */}
        <div key={dTextKey} className="absolute bottom-14 left-10 z-20 max-w-xs animate-[fadeUp_0.8s_ease-out_both]">
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/40 mb-3">{ds.subtitle}</p>
          <h1 className="text-5xl xl:text-6xl font-light tracking-tight text-white leading-none mb-5">{ds.label}</h1>
          <div className="flex items-center gap-5">
            <button className="bg-white text-[#0d0d0d] px-7 py-3 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-white/90 active:scale-95 transition-all">
              Shop Now
            </button>
            <span className="text-2xl font-light italic text-white/80 tracking-wide">{ds.price}</span>
          </div>
        </div>

        {/* Indicators — bottom right */}
        <div className="absolute bottom-14 right-10 z-20 flex flex-col gap-4">
          {slides.map((s, i) => (
            <button key={i} onClick={() => goToDesktop(i)} className="flex items-center gap-3 group" aria-label={`Go to ${s.label}`}>
              <span className={`text-[9px] tracking-[0.2em] font-light transition-colors duration-400 ${i === desktopIdx ? "text-white" : "text-white/25 group-hover:text-white/50"}`}>
                0{i + 1}
              </span>
              <div className={`h-px transition-all duration-500 ${i === desktopIdx ? "w-10 bg-white" : "w-4 bg-white/20 group-hover:w-6 group-hover:bg-white/40"}`} />
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          MOBILE  (below md)
          Fixed height ~85vh so it feels like
          a compact banner, not full screen
      ══════════════════════════════════════ */}
      <section className="relative md:hidden w-full bg-[#0d0d0d] overflow-hidden" style={{ height: "85vw", maxHeight: "520px", minHeight: "610px" }}>

        {/* Full-bleed crossfade image */}
        <CrossfadeImage src={mb.img} alt={mb.label} className="absolute inset-0 w-full h-full" />

        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/85 via-[#0d0d0d]/10 to-transparent pointer-events-none z-10" />

        {/* Top progress bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10 z-30">
          <div className="h-full bg-white/60" style={{ width: `${progress}%`, transition: "width 0.1s linear" }} />
        </div>

        {/* Segmented progress pills — Instagram style */}
        <div className="absolute top-3 left-4 right-4 z-30 flex gap-1">
          {mobileBanners.map((_, i) => (
            <div key={i} className="flex-1 h-[2px] bg-white/20 overflow-hidden rounded-full">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: i < mobileIdx ? "100%" : i === mobileIdx ? `${progress}%` : "0%",
                  transition: i === mobileIdx ? "width 0.1s linear" : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Tag — top left */}
        <div className="absolute top-8 left-4 z-20 mt-2">
          <span className="inline-block text-[7px] tracking-[0.25em] uppercase text-white/55 border border-white/20 px-2 py-1">
            {mb.tag}
          </span>
        </div>

        {/* Type label — top right */}
        <div className="absolute top-8 right-4 z-20 mt-2">
          <span className="text-[7px] tracking-[0.25em] uppercase text-white/30">
            {mb.type === "product" ? "Look" : "Story"}
          </span>
        </div>

        {/* Bottom text */}
        <div key={mTextKey} className="absolute bottom-5 left-4 right-4 z-20 animate-[fadeUp_0.7s_ease-out_both]">
          <p className="text-[7px] tracking-[0.28em] uppercase text-white/40 mb-1">{mb.subtitle}</p>
          <h1 className="text-3xl font-light tracking-tight text-white leading-none mb-4">{mb.label}</h1>
          <div className="flex items-center gap-4">
            <button className="text-[8px] tracking-[0.22em] uppercase text-white font-medium pb-[2px] border-b border-white/50 active:opacity-60 transition-opacity">
              Shop Men
            </button>
            <div className="w-px h-3 bg-white/25" />
            <button className="text-[8px] tracking-[0.22em] uppercase text-white font-medium pb-[2px] border-b border-white/50 active:opacity-60 transition-opacity">
              Shop Women
            </button>
            <span className="ml-auto text-base font-light italic text-white/60">{mb.price}</span>
          </div>
        </div>

        {/* Tap zones for prev / next */}
        <button
          className="absolute left-0 top-0 w-1/3 h-full z-20 opacity-0"
          onClick={() => goToMobile((mobileIdx - 1 + mobileBanners.length) % mobileBanners.length)}
          aria-label="Previous"
        />
        <button
          className="absolute right-0 top-0 w-1/3 h-full z-20 opacity-0"
          onClick={() => goToMobile((mobileIdx + 1) % mobileBanners.length)}
          aria-label="Next"
        />
      </section>

      {/* Keyframe for text entrance */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
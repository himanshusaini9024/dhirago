"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = "https://res.cloudinary.com/ds48lk80f/";

// ── CSS injection (scrollbar hide + cursors) ─────────────────────────────────
const INJECT_ID = "upg-css";
const INJECT_CSS = [
  ".upg-noscroll::-webkit-scrollbar{display:none}",
  ".upg-noscroll{-ms-overflow-style:none;scrollbar-width:none}",
  ".upg-cursor{cursor:crosshair}",
  ".upg-zoom{cursor:zoom-in}",
].join("");

function injectCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById(INJECT_ID)) return;
  const s = document.createElement("style");
  s.id = INJECT_ID;
  s.textContent = INJECT_CSS;
  document.head.appendChild(s);
}

export default function UltraPremiumGallery({ images }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const wrapperRef = useRef(null);
  const rightColRef = useRef(null);
  const imgRefs = useRef([]);
  const observerRef = useRef(null);
  // Prevent observer from fighting goTo() clicks
  const suppressObserver = useRef(false);

  const count = Array.isArray(images) ? images.length : 0;

  // ── Inject global CSS once ────────────────────────────────────────────────
  useEffect(() => {
    injectCSS();
  }, []);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (isOpen) {
        if (e.key === "ArrowRight") setOpenIdx((p) => Math.min(count - 1, p + 1));
        if (e.key === "ArrowLeft") setOpenIdx((p) => Math.max(0, p - 1));
        if (e.key === "Escape") setIsOpen(false);
      } else {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(active + 1);
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(active - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, active, count]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Scroll-lock: engage when gallery enters viewport ─────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      if (inView && !isLocked) setIsLocked(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLocked]);

  // ── Intercept wheel events while locked ──────────────────────────────────
  useEffect(() => {
    const gallery = rightColRef.current;
    if (!gallery) return;

    const handleWheel = (e) => {
      if (!isLocked) return;

      const atTop = gallery.scrollTop <= 0;
      const atBottom =
        gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight - 2;

      if (e.deltaY > 0) {
        if (!atBottom) {
          e.preventDefault();
          gallery.scrollTop += e.deltaY;
        } else {
          setIsLocked(false);
        }
      } else if (e.deltaY < 0) {
        if (!atTop) {
          e.preventDefault();
          gallery.scrollTop += e.deltaY;
        } else {
          setIsLocked(false);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isLocked]);

  // ── Body overflow toggle ──────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);

  // ── goTo: navigate left preview + scroll right column ────────────────────
  const goTo = useCallback(
    (i) => {
      if (i < 0 || i >= count) return;
      setDirection(i > active ? 1 : -1);
      setActive(i);

      // Suppress observer briefly so scroll doesn't fight the click
      suppressObserver.current = true;
      setTimeout(() => {
        suppressObserver.current = false;
      }, 700);

      const el = imgRefs.current[i];
      const col = rightColRef.current;
      if (el && col) {
        col.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      }
    },
    [active, count],
  );

  // ── IntersectionObserver: sync active when user scrolls right col ─────────
  // NOTE: `active` is intentionally NOT in the dep array — we only rebuild
  // the observer when the images list changes.
  useEffect(() => {
    const col = rightColRef.current;
    if (!col || count === 0) return;

    if (observerRef.current) observerRef.current.disconnect();

    const obs = new IntersectionObserver(
      (entries) => {
        if (suppressObserver.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = imgRefs.current.indexOf(entry.target);
            if (i !== -1) {
              setDirection((prev) => (i > prev ? 1 : -1));
              setActive(i);
            }
          }
        });
      },
      { root: col, threshold: 0.5 },
    );

    imgRefs.current.forEach((el) => el && obs.observe(el));
    observerRef.current = obs;

    return () => obs.disconnect();
  }, [images, count]); // ← removed `active` to prevent constant re-registration

  // ── 3-D tilt ─────────────────────────────────────────────────────────────
  const onMouseMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRotate({
      x: -((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 8,
      y: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 8,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setHovering(false);
  }, []);

  // ── Lightbox open — always sync to main active ────────────────────────────
  const openLightbox = useCallback((i) => {
    setOpenIdx(i);
    setIsOpen(true);
  }, []);

  if (count === 0) return null;

  const tiltGradient =
    "radial-gradient(ellipse at " +
    (50 + rotate.y * 3) +
    "% " +
    (50 - rotate.x * 3) +
    "%, rgba(255,255,255,0.18) 0%, transparent 65%)";

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          OUTER WRAPPER
          Desktop: CSS grid — sticky left | scrollable right
          Mobile : single column
      ══════════════════════════════════════════════════════ */}
      <div ref={wrapperRef} className="upg-root w-full">

        {/* ── LEFT: sticky preview (desktop only) ── */}
        <div className="upg-left hidden lg:flex flex-col gap-4">
          <div style={{ position: "sticky", top: "80px" }}>

            {/* Main animated image */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  rotateX: direction >= 0 ? 10 : -10,
                  rotateY: direction >= 0 ? -14 : 14,
                  y: direction >= 0 ? 24 : -24,
                }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  rotateX: direction >= 0 ? -8 : 8,
                  rotateY: direction >= 0 ? 14 : -14,
                  y: direction >= 0 ? -20 : 20,
                }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ perspective: "1200px" }}
                className="relative overflow-hidden rounded-2xl"
              >
                {/* 3-D tilt layer */}
                <motion.div
                  style={{
                    rotateX: rotate.x,
                    rotateY: rotate.y,
                    scale: hovering ? 1.02 : 1,
                    transformStyle: "preserve-3d",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative"
                  onMouseMove={(e) => { onMouseMove(e); setHovering(true); }}
                  onMouseLeave={onMouseLeave}
                  onClick={() => openLightbox(active)}
                >
                  <img
                    src={BASE + images[active].url}
                    alt={images[active].alt || "Product " + (active + 1)}
                    className="w-full object-cover upg-zoom"
                    style={{
                      height: "clamp(460px, 60vh, 680px)",
                      objectPosition: "center top",
                      display: "block",
                    }}
                  />

                  {/* Tilt sheen */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: tiltGradient,
                      pointerEvents: "none",
                      mixBlendMode: "overlay",
                    }}
                  />

                  {/* Shimmer on image change */}
                  <motion.div
                    key={"sh-" + active}
                    initial={{ x: "-120%" }}
                    animate={{ x: "220%" }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.22) 50%,transparent 60%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Zoom hint */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "14px",
                      right: "14px",
                      background: "rgba(0,0,0,0.38)",
                      backdropFilter: "blur(6px)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      padding: "5px 10px",
                      borderRadius: "20px",
                      pointerEvents: "none",
                      opacity: hovering ? 1 : 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    ZOOM
                  </div>
                </motion.div>

                {/* Bottom gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "80px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.12), transparent)",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail strip */}
            <div
              className="upg-noscroll"
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "12px",
                overflowX: "auto",
                paddingBottom: "4px",
              }}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={"View image " + (i + 1)}
                  style={{
                    flexShrink: 0,
                    width: "60px",
                    height: "76px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: i === active ? "2px solid #111" : "2px solid transparent",
                    padding: 0,
                    cursor: "pointer",
                    transition: "border-color 0.2s, transform 0.2s",
                    transform: i === active ? "scale(1)" : "scale(0.94)",
                    background: "#f5f5f5",
                    outline: "none",
                  }}
                >
                  <img
                    src={BASE + img.url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      display: "block",
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Image counter */}
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: "#888",
                fontWeight: 500,
              }}
            >
              {active + 1} &nbsp;/&nbsp; {count}
            </div>
          </div>
        </div>

        {/* ── RIGHT: scrollable image stack ── */}
        <div
          ref={rightColRef}
          className="upg-right upg-noscroll"
          style={{
            overflowY: "auto",
            maxHeight: "calc(100vh - 80px)",
            position: "sticky",
            top: "80px",
          }}
        >
          {/* ── MOBILE: swipe slider ── */}
          <div className="lg:hidden relative w-full overflow-hidden">
            <motion.div
              className="flex"
              drag="x"
              // FIX: Framer Motion dragConstraints require pixel numbers, not % strings
              dragConstraints={{
                left: -((count - 1) * 400),
                right: 0,
              }}
              dragElastic={0.1}
              style={{ width: `${count * 100}%` }}
              animate={{ x: `-${(active / count) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50 && active < count - 1) setActive((p) => p + 1);
                else if (info.offset.x > 50 && active > 0) setActive((p) => p - 1);
              }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  style={{ width: `${100 / count}%`, flexShrink: 0 }}
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={BASE + img.url}
                    alt={img.alt || `Product ${i + 1}`}
                    className="w-full object-cover"
                    style={{ height: "70vh" }}
                  />
                </div>
              ))}
            </motion.div>

            {/* Mobile dot indicators */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "8px",
              }}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to image ${i + 1}`}
                  style={{
                    height: "6px",
                    width: i === active ? "24px" : "8px",
                    borderRadius: "3px",
                    background: i === active ? "#000" : "#ccc",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── DESKTOP: stacked scrollable images ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {images.map((img, i) => (
              <div
                key={i}
                ref={(el) => { imgRefs.current[i] = el; }}
                onClick={() => openLightbox(i)}
                className="hidden lg:block"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  cursor: "zoom-in",
                  borderRadius: "4px",
                  background: "#f5f5f3",
                }}
              >
                <motion.img
                  src={img.url ? BASE + img.url : "/placeholder.jpg"}
                  alt={img.alt || "Product view " + (i + 1)}
                  loading={i === 0 ? "eager" : "lazy"}
                  onLoad={() => setLoaded((p) => ({ ...p, [i]: true }))}
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />

                {/* Loading skeleton */}
                {!loaded[i] && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)",
                      backgroundSize: "200% 100%",
                      animation: "upg-skeleton 1.4s ease infinite",
                    }}
                  />
                )}

                {/* Active border */}
                {i === active && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "2px solid rgba(0,0,0,0.15)",
                      borderRadius: "4px",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Skeleton keyframe + grid layout ── */}
      <style>{`
        @keyframes upg-skeleton {
          0%   { background-position: 200% 0 }
          100% { background-position: -200% 0 }
        }
        .upg-root {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          align-items: start;
        }
        @media (max-width: 1023px) {
          .upg-root { grid-template-columns: 1fr }
          .upg-left { display: none !important }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          FULLSCREEN LIGHTBOX
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.96)",
              zIndex: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setIsOpen(false)}
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close lightbox"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              &#x2715;
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); setOpenIdx((p) => Math.max(0, p - 1)); }}
              aria-label="Previous image"
              disabled={openIdx === 0}
              style={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                color: "#fff",
                fontSize: "22px",
                cursor: openIdx === 0 ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: openIdx === 0 ? 0.3 : 1,
                transition: "opacity 0.2s",
              }}
            >
              &#8249;
            </button>

            {/* Lightbox image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={openIdx}
                src={BASE + images[openIdx].url}
                alt={images[openIdx].alt || "Product"}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  maxHeight: "86vh",
                  maxWidth: "84vw",
                  objectFit: "contain",
                  borderRadius: "10px",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                }}
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); setOpenIdx((p) => Math.min(count - 1, p + 1)); }}
              aria-label="Next image"
              disabled={openIdx === count - 1}
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                color: "#fff",
                fontSize: "22px",
                cursor: openIdx === count - 1 ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: openIdx === count - 1 ? 0.3 : 1,
                transition: "opacity 0.2s",
              }}
            >
              &#8250;
            </button>

            {/* Counter */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "rgba(255,255,255,0.45)",
                fontSize: "12px",
                letterSpacing: "0.14em",
                fontWeight: 500,
                userSelect: "none",
              }}
            >
              {openIdx + 1} / {count}
            </div>

            {/* Thumbnail strip in lightbox */}
            <div
              className="upg-noscroll"
              style={{
                position: "absolute",
                bottom: "52px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                maxWidth: "80vw",
                padding: "4px",
              }}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setOpenIdx(i); }}
                  aria-label={"Image " + (i + 1)}
                  style={{
                    flexShrink: 0,
                    width: "48px",
                    height: "60px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border:
                      i === openIdx
                        ? "2px solid rgba(255,255,255,0.9)"
                        : "2px solid rgba(255,255,255,0.2)",
                    padding: 0,
                    cursor: "pointer",
                    opacity: i === openIdx ? 1 : 0.5,
                    transition: "all 0.2s",
                    background: "#111",
                    outline: "none",
                  }}
                >
                  <img
                    src={BASE + img.url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      display: "block",
                    }}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
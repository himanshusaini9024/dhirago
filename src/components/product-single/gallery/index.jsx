"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = "https://res.cloudinary.com/ds48lk80f/";

function injectCSS() {
  const CSS_ID = "dhg-v8";
  if (typeof document === "undefined" || document.getElementById(CSS_ID)) return;
  const s = document.createElement("style");
  s.id = CSS_ID;
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600&display=swap');
    .dhg-ns::-webkit-scrollbar { display: none; }
    .dhg-ns { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes dhgsk5 {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
  document.head.appendChild(s);
}

export default function Gallery({ images }) {
  const [active,   setActive]   = useState(0);
  const [isOpen,   setIsOpen]   = useState(false);
  const [openIdx,  setOpenIdx]  = useState(0);
  const [loaded,   setLoaded]   = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const stackRef    = useRef(null);
  const imgRefs     = useRef([]);
  const observerRef = useRef(null);
  const suppress    = useRef(false);

  // For JS-driven scroll (no overflow:auto on stack)
  const scrollY      = useRef(0);   // current scroll offset in px
  const maxScroll    = useRef(0);   // max scrollable px
  const rafPending   = useRef(false);

  const count = Array.isArray(images) ? images.length : 0;

  useEffect(() => {
    injectCSS();
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Keyboard nav for lightbox
  useEffect(() => {
    const fn = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") setOpenIdx(p => Math.min(count - 1, p + 1));
      if (e.key === "ArrowLeft")  setOpenIdx(p => Math.max(0, p - 1));
      if (e.key === "Escape")     setIsOpen(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, count]);

  // ── DESKTOP SCROLL ENGINE ─────────────────────────────────────────────────
  // Strategy: intercept ALL wheel events globally. While gallery has images
  // left to scroll, consume the event and move the stack via translateY.
  // Only pass through to page when gallery is truly at top/bottom boundary.
  useEffect(() => {
    if (isMobile) return;

    const applyScroll = (delta) => {
      const stack = stackRef.current;
      if (!stack) return;

      // Recalculate max each time (images may load and change height)
      maxScroll.current = stack.scrollHeight - stack.clientHeight;

      const prev = scrollY.current;
      scrollY.current = Math.max(0, Math.min(maxScroll.current, scrollY.current + delta));

      if (scrollY.current === prev) return false; // at boundary, didn't move
      
      if (!rafPending.current) {
        rafPending.current = true;
        requestAnimationFrame(() => {
          if (stackRef.current) {
            stackRef.current.scrollTop = scrollY.current;
          }
          rafPending.current = false;
        });
      }
      return true; // moved
    };

    // Update active thumbnail via IntersectionObserver on the stack
    const setupObserver = () => {
      const col = stackRef.current;
      if (!col || count === 0) return;
      if (observerRef.current) observerRef.current.disconnect();
      const obs = new IntersectionObserver(
        (entries) => {
          if (suppress.current) return;
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const i = imgRefs.current.indexOf(entry.target);
              if (i !== -1) setActive(i);
            }
          });
        },
        { root: col, threshold: 0.5 },
      );
      imgRefs.current.forEach(el => el && obs.observe(el));
      observerRef.current = obs;
    };
    setupObserver();

    const onWheel = (e) => {
      const stack = stackRef.current;
      if (!stack) return;

      maxScroll.current = stack.scrollHeight - stack.clientHeight;
      const atTop    = scrollY.current <= 0;
      const atBottom = scrollY.current >= maxScroll.current - 1;

      // If gallery can absorb this scroll direction → consume it
      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        e.preventDefault();
        e.stopPropagation();
        applyScroll(e.deltaY);
      }
      // else: fall through to normal page scroll
    };

    // MUST be { passive: false } and on document to intercept before browser
    document.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", onWheel);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isMobile, count, images]);

  // Thumbnail click
  const goTo = useCallback((i) => {
    if (i < 0 || i >= count) return;
    setActive(i);
    suppress.current = true;
    setTimeout(() => { suppress.current = false; }, 800);
    const el  = imgRefs.current[i];
    const col = stackRef.current;
    if (el && col) {
      const target = el.offsetTop;
      scrollY.current = Math.max(0, Math.min(maxScroll.current, target));
      col.scrollTop = scrollY.current;
    }
  }, [count]);

  // Mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 40 && dy < 60) {
      if (dx < 0) setActive(p => Math.min(count - 1, p + 1));
      else        setActive(p => Math.max(0, p - 1));
    }
  };

  const openLightbox = useCallback((i) => { setOpenIdx(i); setIsOpen(true); }, []);

  if (count === 0) return null;

  // ── MOBILE ────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <div style={{ width: "100%", background: "#edeae3" }}>
          <div
            style={{ overflow: "hidden", width: "100%", touchAction: "pan-y" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div style={{
              display: "flex",
              transition: "transform 0.38s cubic-bezier(0.16,1,0.3,1)",
              transform: `translateX(-${active * 100}%)`,
              willChange: "transform",
            }}>
              {images.map((img, i) => (
                <div key={i} onClick={() => openLightbox(i)} style={{
                  flexShrink: 0, width: "100%", aspectRatio: "3/4",
                  background: "#edeae3", overflow: "hidden",
                  cursor: "zoom-in", position: "relative",
                }}>
                  <img
                    src={img.url ? BASE + img.url : "/placeholder.jpg"}
                    alt={img.alt || `Product ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    onLoad={() => setLoaded(p => ({ ...p, [i]: true }))}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                  />
                  {!loaded[i] && (
                    <div style={{
                      position: "absolute", inset: 0, zIndex: 1,
                      background: "linear-gradient(90deg,#edeae3 25%,#e5e1d9 50%,#edeae3 75%)",
                      backgroundSize: "200% 100%", animation: "dhgsk5 1.6s ease infinite",
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: "flex", justifyContent: "center",
            gap: "6px", padding: "10px 0 12px", background: "#fff",
          }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? "18px" : "6px", height: "6px", borderRadius: "3px",
                background: i === active ? "#1a1a1a" : "#ccc9c2",
                border: "none", padding: 0, cursor: "pointer", transition: "all 0.25s ease",
              }} />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                position: "fixed", inset: 0, background: "rgba(5,5,5,0.97)",
                zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onClick={() => setIsOpen(false)}
            >
              <button onClick={() => setIsOpen(false)} style={{
                position: "absolute", top: "18px", right: "20px",
                background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: "18px", cursor: "pointer",
              }}>✕</button>
              <AnimatePresence mode="wait">
                <motion.img key={openIdx} src={BASE + images[openIdx].url} alt=""
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }}
                  style={{ maxHeight: "90vh", maxWidth: "92vw", objectFit: "contain" }}
                  onClick={e => e.stopPropagation()}
                />
              </AnimatePresence>
              <div style={{
                position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)",
                color: "rgba(255,255,255,0.25)", fontSize: "9.5px", letterSpacing: "0.24em",
                fontFamily: "'Josefin Sans', sans-serif",
              }}>{openIdx + 1} / {count}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // ── DESKTOP ───────────────────────────────────────────────────────────────
  return (
    <>
      <div style={{
        display: "grid",
        gridTemplateColumns: "146px minmax(500px, 700px)",
        justifyContent: "center",
        height: "calc(100vh - 64px)",
        position: "sticky",
        top: "64px",
        overflow: "hidden",
        margin: "0 auto",
      }}>
        {/* Thumbnail strip */}
        <div className="dhg-ns" style={{
          display: "flex", flexDirection: "column", gap: "5px",
          overflowY: "auto", padding: "4px 0 12px 4px",
        }}>
          {images.map((img, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`View image ${i + 1}`}
              style={{
                position: "relative", width: "55px", height: "95px",
                padding: 0, border: "1px solid black", background: "none",
                cursor: "pointer", flexShrink: 0, outline: "none",
              }}
            >
              <div style={{
                position: "absolute", left: 0, top: "4px", bottom: "4px", width: "2px",
                background: i === active ? "#1a1a1a" : "transparent", transition: "background 0.2s",
              }} />
              <div style={{
                marginLeft: "3px", width: "45px", height: "93%",
                overflow: "hidden", background: "#edeae3", outline: "1px solid #c4c0b9",
              }}>
                <img src={BASE + img.url} alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Image stack — overflow:auto so scrollTop works, but scrollbar hidden */}
        <div
          ref={stackRef}
          className="dhg-ns"
          style={{
            overflowY: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {images.map((img, i) => (
            <div key={i}
              ref={el => { imgRefs.current[i] = el; }}
              onClick={() => openLightbox(i)}
              style={{
                position: "relative", flexShrink: 0,
                width: "88%", aspectRatio: "4/5",
                background: "#edeae3", cursor: "zoom-in", overflow: "hidden",
              }}
            >
              <motion.img
                src={img.url ? BASE + img.url : "/placeholder.jpg"}
                alt={img.alt || `Product ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                onLoad={() => setLoaded(p => ({ ...p, [i]: true }))}
                whileHover={{ scale: 1.013 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center top", display: "block",
                }}
              />
              {!loaded[i] && (
                <div style={{
                  position: "absolute", inset: 0, zIndex: 1,
                  background: "linear-gradient(90deg,#edeae3 25%,#e5e1d9 50%,#edeae3 75%)",
                  backgroundSize: "200% 100%", animation: "dhgsk5 1.6s ease infinite",
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.17 }}
            style={{
              position: "fixed", inset: 0, background: "rgba(5,5,5,0.97)",
              zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onClick={() => setIsOpen(false)}
          >
            <button onClick={() => setIsOpen(false)} style={{
              position: "absolute", top: "18px", right: "20px",
              background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: "18px", cursor: "pointer",
            }}>✕</button>

            <button onClick={e => { e.stopPropagation(); setOpenIdx(p => Math.max(0, p - 1)); }}
              disabled={openIdx === 0}
              style={{
                position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", color: "#fff", fontSize: "32px",
                cursor: openIdx === 0 ? "default" : "pointer", opacity: openIdx === 0 ? 0.1 : 0.38,
              }}>‹</button>

            <AnimatePresence mode="wait">
              <motion.img key={openIdx}
                src={BASE + images[openIdx].url} alt={images[openIdx].alt || "Product"}
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }}
                style={{ maxHeight: "90vh", maxWidth: "88vw", objectFit: "contain", display: "block" }}
                onClick={e => e.stopPropagation()} draggable={false}
              />
            </AnimatePresence>

            <button onClick={e => { e.stopPropagation(); setOpenIdx(p => Math.min(count - 1, p + 1)); }}
              disabled={openIdx === count - 1}
              style={{
                position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", color: "#fff", fontSize: "32px",
                cursor: openIdx === count - 1 ? "default" : "pointer", opacity: openIdx === count - 1 ? 0.1 : 0.38,
              }}>›</button>

            <div style={{
              position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.2)", fontSize: "9.5px", letterSpacing: "0.24em",
              fontFamily: "'Josefin Sans', sans-serif",
            }}>{openIdx + 1} / {count}</div>

            <div className="dhg-ns" style={{
              position: "absolute", bottom: "38px", left: "50%", transform: "translateX(-50%)",
              display: "flex", gap: "4px", overflowX: "auto", maxWidth: "80vw",
            }}>
              {images.map((img, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setOpenIdx(i); }} style={{
                  flexShrink: 0, width: "36px", height: "46px", padding: 0, border: "none",
                  outline: i === openIdx ? "1.5px solid rgba(255,255,255,0.65)" : "none",
                  outlineOffset: "2px", opacity: i === openIdx ? 1 : 0.2,
                  cursor: "pointer", background: "#181818", transition: "opacity 0.18s",
                }}>
                  <img src={BASE + img.url} alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
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
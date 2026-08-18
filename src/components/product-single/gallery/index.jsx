"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sortProductImages } from "../../../utils/sortProductImages";

const BASE = process.env.NEXT_PUBLIC_IMG_URL;

function injectCSS() {
  const CSS_ID = "dhg-pdp";
  if (typeof document === "undefined" || document.getElementById(CSS_ID)) return;
  const s = document.createElement("style");
  s.id = CSS_ID;
  s.textContent = `
    .dhg-ns::-webkit-scrollbar { display: none; }
    .dhg-ns { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes dhgsk5 {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
  document.head.appendChild(s);
}

export default function Gallery({ images: rawImages }) {
  const images = useMemo(() => sortProductImages(rawImages), [rawImages]);
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const stackRef = useRef(null);
  const imgRefs = useRef([]);
  const observerRef = useRef(null);
  const suppress = useRef(false);
  const scrollY = useRef(0);
  const maxScroll = useRef(0);
  const rafPending = useRef(false);

  const count = images.length;

  useEffect(() => {
    injectCSS();
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") setOpenIdx((p) => Math.min(count - 1, p + 1));
      if (e.key === "ArrowLeft") setOpenIdx((p) => Math.max(0, p - 1));
      if (e.key === "Escape") {
        if (zoomed) setZoomed(false);
        else setIsOpen(false);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, count, zoomed]);

  useEffect(() => {
    if (!isOpen) setZoomed(false);
  }, [isOpen, openIdx]);

  // Desktop: wheel anywhere scrolls gallery; content column scrolls on its own
  useEffect(() => {
    if (isMobile || count === 0) return;

    const applyScroll = (delta) => {
      const stack = stackRef.current;
      if (!stack) return false;

      maxScroll.current = Math.max(0, stack.scrollHeight - stack.clientHeight);
      const prev = scrollY.current;
      scrollY.current = Math.max(
        0,
        Math.min(maxScroll.current, scrollY.current + delta),
      );
      if (scrollY.current === prev) return false;

      if (!rafPending.current) {
        rafPending.current = true;
        requestAnimationFrame(() => {
          if (stackRef.current) stackRef.current.scrollTop = scrollY.current;
          rafPending.current = false;
        });
      }
      return true;
    };

    const setupObserver = () => {
      const col = stackRef.current;
      if (!col) return;
      if (observerRef.current) observerRef.current.disconnect();
      const obs = new IntersectionObserver(
        (entries) => {
          if (suppress.current) return;
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const i = imgRefs.current.indexOf(entry.target);
            if (i !== -1) setActive(i);
          });
        },
        { root: col, threshold: 0.45 },
      );
      imgRefs.current.forEach((el) => el && obs.observe(el));
      observerRef.current = obs;
    };
    setupObserver();

    const syncFromStack = () => {
      const stack = stackRef.current;
      if (!stack) return;
      scrollY.current = stack.scrollTop;
      maxScroll.current = Math.max(0, stack.scrollHeight - stack.clientHeight);
    };
    const stackEl = stackRef.current;
    stackEl?.addEventListener("scroll", syncFromStack, { passive: true });

    const getContentEl = () =>
      stackRef.current
        ?.closest("[data-pdp-grid]")
        ?.querySelector("[data-pdp-content]");

    const applyContentScroll = (delta) => {
      const el = getContentEl();
      if (!el) return false;
      const max = Math.max(0, el.scrollHeight - el.clientHeight);
      const prev = el.scrollTop;
      const next = Math.max(0, Math.min(max, prev + delta));
      if (next === prev) return false;
      el.scrollTop = next;
      return true;
    };

    const onWheel = (e) => {
      if (isOpen) return;
      if (
        e.target?.closest?.(
          "[data-radix-dialog-content], .size-chart, .MensSizeChart",
        )
      ) {
        return;
      }

      const stack = stackRef.current;
      if (!stack) return;

      const grid = stack.closest("[data-pdp-grid]");
      if (grid) {
        const r = grid.getBoundingClientRect();
        if (r.bottom < 40) return;
      }

      maxScroll.current = Math.max(0, stack.scrollHeight - stack.clientHeight);
      scrollY.current = stack.scrollTop;
      const pageY = window.scrollY || document.documentElement.scrollTop || 0;
      const pageMax = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );

      // Page has already moved past the product block — keep scrolling the page
      if (e.deltaY < 0 && pageY > 2) {
        e.preventDefault();
        e.stopPropagation();
        window.scrollBy(0, e.deltaY);
        return;
      }

      const movedContent = applyContentScroll(e.deltaY);
      const movedGallery = applyScroll(e.deltaY);

      if (movedContent || movedGallery) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Gallery + content finished — continue the page so the section below can show
      if (
        (e.deltaY > 0 && pageY < pageMax - 1) ||
        (e.deltaY < 0 && pageY > 1)
      ) {
        e.preventDefault();
        e.stopPropagation();
        window.scrollBy(0, e.deltaY);
      }
    };

    document.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      document.removeEventListener("wheel", onWheel, { capture: true });
      stackEl?.removeEventListener("scroll", syncFromStack);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isMobile, count, images, isOpen]);

  const goTo = useCallback(
    (i) => {
      if (i < 0 || i >= count) return;
      setActive(i);
      suppress.current = true;
      setTimeout(() => {
        suppress.current = false;
      }, 500);

      const col = stackRef.current;
      const el = imgRefs.current[i];
      if (!col || !el) return;

      maxScroll.current = Math.max(0, col.scrollHeight - col.clientHeight);
      const target = Math.min(el.offsetTop, Math.max(0, maxScroll.current));
      scrollY.current = target;
      col.scrollTo({ top: target, behavior: "smooth" });
    },
    [count],
  );

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 40 && dy < 60) {
      if (dx < 0) setActive((p) => Math.min(count - 1, p + 1));
      else setActive((p) => Math.max(0, p - 1));
    }
  };

  const openLightbox = useCallback((i) => {
    setOpenIdx(i);
    setZoomed(false);
    setIsOpen(true);
  }, []);

  const setOriginFromEvent = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  const handleLightboxImgClick = (e) => {
    e.stopPropagation();
    setOriginFromEvent(e);
    setZoomed((z) => !z);
  };

  const handleLightboxImgMove = (e) => {
    if (!zoomed) return;
    setOriginFromEvent(e);
  };

  if (count === 0) return null;

  if (isMobile) {
    return (
      <>
        <div className="w-full bg-[#edeae3]">
          <div
            className="w-full overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex will-change-transform transition-transform duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="relative aspect-[3/4] w-full shrink-0 cursor-zoom-in overflow-hidden bg-[#edeae3]"
                >
                  <img
                    src={img.url ? BASE + img.url : "/placeholder.jpg"}
                    alt={img.alt || `Product ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    onLoad={() => setLoaded((p) => ({ ...p, [i]: true }))}
                    className="block h-full w-full object-cover object-top"
                  />
                  {!loaded[i] && (
                    <div
                      className="absolute inset-0 z-[1]"
                      style={{
                        background:
                          "linear-gradient(90deg,#edeae3 25%,#e5e1d9 50%,#edeae3 75%)",
                        backgroundSize: "200% 100%",
                        animation: "dhgsk5 1.6s ease infinite",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-1.5 bg-white px-0 py-2.5 pb-3">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className="h-1.5 rounded-sm border-0 p-0 transition-all duration-[250ms]"
                style={{
                  width: i === active ? 18 : 6,
                  background: i === active ? "#1a1a1a" : "#ccc9c2",
                }}
              />
            ))}
          </div>
        </div>

        <Lightbox
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          openIdx={openIdx}
          setOpenIdx={setOpenIdx}
          count={count}
          images={images}
          zoomed={zoomed}
          origin={origin}
          onImgClick={handleLightboxImgClick}
          onImgMove={handleLightboxImgMove}
          mobile
        />
      </>
    );
  }

  return (
    <>
      {/* 11-11 desktop: sticky viewport, internal image scroll */}
      <div className="hidden w-full md:flex md:h-[calc(100vh-135px)] md:sticky md:top-32 md:items-start md:gap-5 md:overflow-hidden lg:gap-20">
        <div className="dhg-ns flex h-full w-[61px] shrink-0 flex-col gap-2 overflow-y-auto pb-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              className={`h-[87px] w-[61px] shrink-0 cursor-pointer overflow-hidden border bg-[#edeae3] p-0 outline-none ${
                i === active ? "border-[#1c1c1c]" : "border-transparent"
              }`}
            >
              <img
                src={BASE + img.url}
                alt=""
                className="block h-full w-full object-cover object-top"
              />
            </button>
          ))}
        </div>

        <div
          ref={stackRef}
          className="dhg-ns flex h-full max-w-[100%] flex-1 flex-col gap-[30px] overflow-y-auto overscroll-contain"
        >
          {images.map((img, i) => (
            <div
              key={i}
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              onClick={() => openLightbox(i)}
              className="relative h-[calc(100vh-155px)] min-h-[1000px] w-[full] shrink-0 cursor-zoom-in overflow-hidden bg-[#edeae3]"
            >
              <motion.img
                src={img.url ? BASE + img.url : "/placeholder.jpg"}
                // src="/images/p1.jpg"
                alt={img.alt || `Product ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                onLoad={() => setLoaded((p) => ({ ...p, [i]: true }))}
                whileHover={{ scale: 1.008 }}
                // transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block h-full w-full object-cover object-top"
              />
              {!loaded[i] && (
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    background:
                      "linear-gradient(90deg,#edeae3 25%,#e5e1d9 50%,#edeae3 75%)",
                    backgroundSize: "200% 100%",
                    animation: "dhgsk5 1.6s ease infinite",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        openIdx={openIdx}
        setOpenIdx={setOpenIdx}
        count={count}
        images={images}
        zoomed={zoomed}
        origin={origin}
        onImgClick={handleLightboxImgClick}
        onImgMove={handleLightboxImgMove}
      />
    </>
  );
}

function Lightbox({
  isOpen,
  setIsOpen,
  openIdx,
  setOpenIdx,
  count,
  images,
  zoomed,
  origin,
  onImgClick,
  onImgMove,
  mobile,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: mobile ? 0.2 : 0.17 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(5,5,5,0.97)]"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-5 top-[18px] cursor-pointer border-0 bg-transparent text-lg text-white/35"
          >
            ✕
          </button>

          {!mobile && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIdx((p) => Math.max(0, p - 1));
                }}
                disabled={openIdx === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 border-0 bg-transparent text-[32px] text-white disabled:cursor-default disabled:opacity-10"
                style={{ opacity: openIdx === 0 ? 0.1 : 0.38 }}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIdx((p) => Math.min(count - 1, p + 1));
                }}
                disabled={openIdx === count - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 border-0 bg-transparent text-[32px] text-white disabled:cursor-default"
                style={{ opacity: openIdx === count - 1 ? 0.1 : 0.38 }}
              >
                ›
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.img
              key={openIdx}
              src={BASE + images[openIdx].url}
              alt={images[openIdx].alt || "Product"}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: zoomed ? (mobile ? 2.2 : 2.4) : 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: mobile ? 0.2 : 0.22 }}
              className="block max-h-[90vh] max-w-[88vw] object-contain"
              style={{
                cursor: zoomed ? "zoom-out" : "zoom-in",
                transformOrigin: `${origin.x}% ${origin.y}%`,
              }}
              onClick={onImgClick}
              onMouseMove={onImgMove}
              draggable={false}
            />
          </AnimatePresence>

          <div
            className="absolute bottom-3.5 left-1/2 -translate-x-1/2 font-['Josefin_Sans',sans-serif] text-[9.5px] tracking-[0.24em] text-white/20"
          >
            {openIdx + 1} / {count}
          </div>

          {!mobile && (
            <div className="dhg-ns absolute bottom-[38px] left-1/2 flex max-w-[80vw] -translate-x-1/2 gap-1 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenIdx(i);
                  }}
                  className="h-[46px] w-9 shrink-0 cursor-pointer border-0 bg-[#181818] p-0 transition-opacity duration-[180ms]"
                  style={{
                    outline:
                      i === openIdx
                        ? "1.5px solid rgba(255,255,255,0.65)"
                        : "none",
                    outlineOffset: "2px",
                    opacity: i === openIdx ? 1 : 0.2,
                  }}
                >
                  <img
                    src={BASE + img.url}
                    alt=""
                    className="block h-full w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

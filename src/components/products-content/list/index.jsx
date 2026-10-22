"use client";

import { useEffect, useState, useRef, useMemo, useSyncExternalStore, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Josefin_Sans, Cormorant_Garamond } from "next/font/google";
import ProductItem from "../../product-item";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

// A restrained editorial serif, used only for the handful of moments that
// carry the "premium boutique" signature: the drawer title and the price figure.

// Century Gothic body/utility stack as a reusable Tailwind arbitrary value.
const BODY_FONT = "font-[Century_Gothic,Futura,'Trebuchet_MS',sans-serif]";

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <line x1="1" y1="4" x2="15" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="1" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="5" cy="4" r="2" fill="white" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="11" cy="8" r="2" fill="white" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="5" cy="12" r="2" fill="white" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Fewer columns — larger cards (slider left) */
const GridSparseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <rect x="1" y="1" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="7.5" y="1" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="1" y="7.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="7.5" y="7.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

/** More columns — denser grid (slider right) */
const GridDenseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <rect x="1" y="1" width="3.2" height="3.2" stroke="currentColor" strokeWidth="1.1" />
    <rect x="5.4" y="1" width="3.2" height="3.2" stroke="currentColor" strokeWidth="1.1" />
    <rect x="9.8" y="1" width="3.2" height="3.2" stroke="currentColor" strokeWidth="1.1" />
    <rect x="1" y="5.4" width="3.2" height="3.2" stroke="currentColor" strokeWidth="1.1" />
    <rect x="5.4" y="5.4" width="3.2" height="3.2" stroke="currentColor" strokeWidth="1.1" />
    <rect x="9.8" y="5.4" width="3.2" height="3.2" stroke="currentColor" strokeWidth="1.1" />
    <rect x="1" y="9.8" width="3.2" height="3.2" stroke="currentColor" strokeWidth="1.1" />
    <rect x="5.4" y="9.8" width="3.2" height="3.2" stroke="currentColor" strokeWidth="1.1" />
    <rect x="9.8" y="9.8" width="3.2" height="3.2" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

const COL_OPTIONS = [3, 4, 5];
const COLS_STORAGE_KEY = "dhirago.collection.cols";
const COLS_EVENT = "dhirago-collection-cols";

const COL_IMAGE_SIZES = {
  3: "(max-width: 768px) 50vw, 33vw",
  4: "(max-width: 768px) 50vw, 25vw",
  5: "(max-width: 768px) 50vw, 20vw",
};

function readStoredCols() {
  try {
    const saved = Number(window.localStorage.getItem(COLS_STORAGE_KEY));
    return COL_OPTIONS.includes(saved) ? saved : 4;
  } catch {
    return 4;
  }
}

function subscribeCols(onStoreChange) {
  const handler = () => onStoreChange();
  window.addEventListener(COLS_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(COLS_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export default function ProductList({ initialProducts, slug }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);
  const [products] = useState(initialProducts);
  const [sort, setSort] = useState("popular");
  const [openSort, setOpenSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const cols = useSyncExternalStore(subscribeCols, readStoredCols, () => 4);
  const [filters, setFilters] = useState({ size: [], color: [], maxPrice: 10000 });
  const [debouncedPrice, setDebouncedPrice] = useState(10000);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setColumnCount = useCallback(
    (value) => {
      const next = Number(value);
      if (!COL_OPTIONS.includes(next) || next === cols) return;

      try {
        window.localStorage.setItem(COLS_STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new Event(COLS_EVENT));

      // Analytics: track density-slider usage (GTM/GA4 + gtag)
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "grid_density_change",
          grid_columns: next,
          collection_slug: slug || "",
        });
        if (typeof window.gtag === "function") {
          window.gtag("event", "grid_density_change", {
            event_category: "collection",
            event_label: `${slug || "collection"}:${next}`,
            value: next,
            grid_columns: next,
          });
        }
      } catch {
        /* ignore analytics errors */
      }
    },
    [cols, slug],
  );

  useEffect(() => {
    const t = setTimeout(() => setDebouncedPrice(filters.maxPrice), 300);
    return () => clearTimeout(t);
  }, [filters.maxPrice]);

  useEffect(() => {
    const size = searchParams.get("size");
    const color = searchParams.get("color");
    const price = searchParams.get("price");
    const sortParam = searchParams.get("sort") || "popular";
    setFilters({
      size: size ? size.split(",") : [],
      color: color ? color.split(",") : [],
      maxPrice: price ? Number(price) : 10000,
    });
    setSort(sortParam);
    setIsInitialized(true);
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const button = document.getElementById("filterBtn");
      if (!footer || !button) return;
      button.style.display = footer.getBoundingClientRect().top < window.innerHeight ? "none" : "flex";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    const params = new URLSearchParams();
    if (filters.size.length) params.set("size", filters.size.join(","));
    if (filters.color.length) params.set("color", filters.color.join(","));
    if (debouncedPrice < 10000) params.set("price", debouncedPrice.toString());
    if (sort && sort !== "popular") params.set("sort", sort);
    const newQuery = params.toString();
    const currentQuery = searchParams.toString();
    if (newQuery !== currentQuery)
      router.replace(`/collections/${slug}${newQuery ? `?${newQuery}` : ""}`, { scroll: false });
  }, [filters.size, filters.color, debouncedPrice, sort, isInitialized]);

  const sizes = [...new Set(products.flatMap((p) => (p.size ? p.size.split(",") : [])))];
  const colors = [...new Set(products.map((p) => p.color).filter(Boolean))];

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (p) =>
          (!filters.size.length || filters.size.some((s) => p.size?.includes(s))) &&
          (!filters.color.length || filters.color.includes(p.color)) &&
          p.currentPrice <= filters.maxPrice,
      )
      .sort((a, b) => {
        if (sort === "low") return a.currentPrice - b.currentPrice;
        if (sort === "high") return b.currentPrice - a.currentPrice;

        // Default / popular: admin sort_order (asc), nulls last
        const ao = a.sort_order;
        const bo = b.sort_order;
        const aNull = ao === null || ao === undefined || ao === "";
        const bNull = bo === null || bo === undefined || bo === "";
        if (aNull && bNull) return (b.id || 0) - (a.id || 0);
        if (aNull) return 1;
        if (bNull) return -1;
        const diff = Number(ao) - Number(bo);
        return diff !== 0 ? diff : (b.id || 0) - (a.id || 0);
      });
  }, [products, filters, sort]);

  const sortLabels = {
    popular: "Featured",
    low: "Price: Low → High",
    high: "Price: High → Low",
  };
  const activeCount = filters.size.length + filters.color.length;
  const pricePct = Math.round((filters.maxPrice / 10000) * 100);

  // 11-11 style: bar lives below the banner, then becomes fixed under the site header.
  const [barFixed, setBarFixed] = useState(false);
  const [barHeight, setBarHeight] = useState(52);
  const sentinelRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const headerOffset = () => (window.innerWidth >= 1024 ? 120 : 72);

    const update = () => {
      const sentinel = sentinelRef.current;
      const bar = barRef.current;
      if (bar) setBarHeight(bar.offsetHeight);
      if (!sentinel) return;
      setBarFixed(sentinel.getBoundingClientRect().top <= headerOffset());
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={`${josefin.className} bg-white min-h-screen`}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .dhg-cols-slider { height: 18px; }
            .dhg-cols-slider::-webkit-slider-runnable-track { height: 1px; background: #1c1814; }
            .dhg-cols-slider::-moz-range-track { height: 1px; background: #1c1814; border: none; }
            .dhg-cols-slider::-webkit-slider-thumb {
              -webkit-appearance: none; appearance: none;
              width: 12px; height: 12px; margin-top: -5.5px;
              border-radius: 9999px; background: #1c1814; border: none; cursor: pointer;
            }
            .dhg-cols-slider::-moz-range-thumb {
              width: 12px; height: 12px; border-radius: 9999px;
              background: #1c1814; border: none; cursor: pointer;
            }
          `,
        }}
      />

      {/* Marks the natural place of the bar (always under the banner). */}
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden />
      {barFixed && <div style={{ height: barHeight }} aria-hidden />}

      {/* ── PRODUCT COUNT BAR (like 11-11 "167 PRODUCTS") ── */}
      <div
        ref={barRef}
        className={`z-40 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 bg-[#f7f7f5] px-4 md:px-10 py-3 border-y border-black/10 ${
          barFixed
            ? "fixed left-0 right-0 top-[100px] lg:top-[150px]"
            : "relative"
        }`}
      >
        {/* Left — grid density slider (desktop) */}
        <div className="hidden md:flex items-center gap-3 justify-self-start" title={`${cols} products per row`}>
          <button
            type="button"
            aria-label="Show 3 products per row"
            onClick={() => setColumnCount(3)}
            className={`p-0.5 transition-colors ${cols === 3 ? "text-[#1C1814]" : "text-[#1C1814]/35 hover:text-[#1C1814]/70"}`}
          >
            <GridSparseIcon />
          </button>
          <input
            type="range"
            min={3}
            max={5}
            step={1}
            value={cols}
            onChange={(e) => setColumnCount(e.target.value)}
            aria-label="Products per row"
            aria-valuetext={`${cols} products per row`}
            className="dhg-cols-slider w-[110px] lg:w-[140px] cursor-pointer appearance-none bg-transparent outline-none"
          />
          <button
            type="button"
            aria-label="Show 5 products per row"
            onClick={() => setColumnCount(5)}
            className={`p-0.5 transition-colors ${cols === 5 ? "text-[#1C1814]" : "text-[#1C1814]/35 hover:text-[#1C1814]/70"}`}
          >
            <GridDenseIcon />
          </button>
        </div>
        <div className="md:hidden" />

        {/* Center — product count */}
        <div className="flex flex-col items-center justify-center gap-1.5 justify-self-center text-center">
          <span className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-[#1a1a1a] font-normal whitespace-nowrap">
            {filteredProducts.length} Products
          </span>
          {(filters.size.length > 0 || filters.color.length > 0) && (
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[...filters.size, ...filters.color].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 px-[0.85rem] py-[0.3rem] border border-[#C4A882]/50 bg-gradient-to-b from-[#FBF9F4] to-[#F5F0E6] text-[10px] tracking-[0.15em] uppercase text-[#1C1814] whitespace-nowrap"
                >
                  {item}
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        size: filters.size.filter((s) => s !== item),
                        color: filters.color.filter((c) => c !== item),
                      })
                    }
                    className="bg-transparent border-none cursor-pointer text-[#8a7a63] hover:text-[#1C1814] p-0 flex"
                  >
                    <CloseIcon />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right — sort */}
        <div className="relative hidden md:flex items-center justify-self-end gap-4">
          <span className="hidden lg:block h-4 w-px bg-black/15" aria-hidden />
          <button
            className={`flex items-center gap-2 bg-transparent text-[11px] tracking-[0.14em] uppercase cursor-pointer whitespace-nowrap transition-opacity duration-200 hover:opacity-60 ${
              openSort ? "text-[#1C1814]" : "text-[#1C1814]"
            }`}
            aria-label="Sort products"
            aria-expanded={openSort}
            onClick={() => setOpenSort(!openSort)}
          >
            <span className={BODY_FONT}>Sort by{sort !== "popular" ? `: ${sortLabels[sort]}` : ""}</span>
            <span className={`transition-transform duration-300 ${openSort ? "rotate-180" : ""}`}>
              <ChevronDown />
            </span>
          </button>
          <AnimatePresence>
            {openSort && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-[calc(100%+8px)] bg-white border border-black/10 min-w-[210px] z-[100] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.18)]"
              >
                {Object.entries(sortLabels).map(([key, label], i) => (
                  <div
                    key={key}
                    className={`${BODY_FONT} relative px-5 py-3 text-[11px] tracking-[0.12em] uppercase cursor-pointer transition-colors duration-200 hover:bg-black/[0.03] ${
                      i !== 0 ? "border-t border-black/5" : ""
                    } ${sort === key ? "text-[#9A7B4F]" : "text-[#1C1814]"}`}
                    onClick={() => {
                      setSort(key);
                      setOpenSort(false);
                    }}
                  >
                    {label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="md:hidden" />
      </div>

      {/* ── PRODUCT GRID ───────────────────────────────────── */}
      <div
        className="grid grid-cols-2 gap-3 px-2 py-0 transition-[gap] duration-300 md:gap-8 md:px-12 md:py-6 lg:gap-10"
        style={
          isDesktop
            ? { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }
            : undefined
        }
      >
        {filteredProducts.map((item, index) => (
          <ProductItem
            key={item.id}
            id={item.id}
            sku={item.sku}
            slug={item.slug}
            color={item.color}
            name={item.name}
            currentPrice={item.currentPrice}
            price={item.price ?? item.mrp}
            mrp={item.mrp ?? item.price}
            discount={item.discount}
            images={item.image}
            category={item.category || slug}
            priority={index < cols}
            imageSizes={COL_IMAGE_SIZES[cols] || COL_IMAGE_SIZES[4]}
          />
        ))}
      </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-14 gap-3 md:px-12 px-4 md:py-6 py-2">
  {Array.from({ length: 11 }, (_, index) => {
    const item = filteredProducts[index % filteredProducts.length];

    return (
      <ProductItem
        key={`${item.id}-${index}`}
        id={item.id}
        sku={item.sku}
        slug={item.slug}
        color={item.color}
        name={item.name}
        currentPrice={item.currentPrice}
        images={item.image}
        category={item.category || slug}
      />
    );
  })}
</div> */}

      {/* ── FLOAT BUTTON ───────────────────────────────────── */}
      <div id="filterBtn" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ y: -2 }}
          className="flex items-center gap-[0.6rem] px-[1.8rem] py-3 bg-gradient-to-b from-[#241F1A] to-[#151210] text-[#E8E0D0] border border-[#C4A882]/30 text-[10px] font-normal tracking-[0.25em] uppercase cursor-pointer transition-shadow duration-300 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_36px_-6px_rgba(0,0,0,0.55)]"
          aria-label="Open filters"
          onClick={() => setShowFilters(true)}
        >
          <FilterIcon />
          Filter &amp; Sort
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-gradient-to-b from-[#D8BE94] to-[#B8956A] text-[#1C1814] text-[9px] font-semibold ml-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              {activeCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* ── FILTER DRAWER ──────────────────────────────────── */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-40 backdrop-blur-[3px] ${isDesktop ? "bg-[#1C1814]/30" : "bg-[#1C1814]/45"}`}
              onClick={() => setShowFilters(false)}
            />

            <motion.div
              initial={isDesktop ? { x: "-100%" } : { y: "100%" }}
              animate={isDesktop ? { x: 0 } : { y: 0 }}
              exit={isDesktop ? { x: "-100%" } : { y: "100%" }}
              transition={{ type: "spring", stiffness: 110, damping: 22 }}
              onTouchStart={(e) => setTouchStartY(e.touches[0].clientY)}
              onTouchMove={(e) => setTouchEndY(e.touches[0].clientY)}
              onTouchEnd={() => {
                if (!isDesktop && touchStartY - touchEndY < -80) setShowFilters(false);
              }}
              className={`fixed z-50 bg-[#FCFBF8] flex flex-col ${
                isDesktop
                  ? "top-0 left-0 h-screen w-[400px] border-r border-[#C4A882]/25 shadow-[24px_0_60px_-20px_rgba(28,24,20,0.25)]"
                  : "bottom-0 left-0 right-0 max-h-[88vh] border-t border-[#C4A882]/25 shadow-[0_-16px_50px_-16px_rgba(28,24,20,0.3)]"
              }`}
            >
              {!isDesktop && (
                <div className="flex justify-center pt-4 flex-shrink-0">
                  <div className="w-9 h-[3px] rounded-full bg-[#1C1814]/20" />
                </div>
              )}

              {/* Header — fixed height */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-[#C4A882]/20 flex-shrink-0 bg-gradient-to-b from-[#FDFCFA] to-[#FCFBF8]">
                <div>
                  <h2 className={`${josefin.className} text-[1.35rem]  font-light tracking-[0.01em] text-[#111111]`}>
                    Refine Your Selection
                  </h2>
                  {activeCount > 0 && (
                    <p className={`${BODY_FONT} text-[11px] text-[#9A7B4F] mt-1 tracking-[0.04em]`}>
                      {activeCount} filter{activeCount > 1 ? "s" : ""} active
                    </p>
                  )}
                </div>
                <button
                  aria-label="Close filters"
                  onClick={() => setShowFilters(false)}
                  className="bg-transparent border border-transparent hover:border-[#1C1814]/15 cursor-pointer text-[#1C1814] p-2 transition-colors duration-200 rounded-full"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Body — grows, scrolls */}
              <div className="flex-1 overflow-y-auto [-webkit-overflow-scrolling:touch] p-8 flex flex-col gap-10">
                {/* SORT */}
                <div>
                  <p className="text-[9px] font-medium tracking-[0.45em] uppercase text-[#8a7a63] mb-5 flex items-center gap-3">
                    Sort By
                    <span className="flex-1 h-px bg-gradient-to-r from-[#C4A882]/40 to-transparent" />
                  </p>
                  <div className="flex flex-col gap-2">
                    {Object.entries(sortLabels).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setSort(key)}
                        className={`${BODY_FONT} flex items-center justify-between py-[0.85rem] px-4 border text-[12px] tracking-[0.06em] cursor-pointer transition-all duration-250 ${
                          sort === key
                            ? "bg-gradient-to-b from-[#241F1A] to-[#171310] border-[#1C1814] text-[#E8E0D0] shadow-[0_4px_14px_-4px_rgba(28,24,20,0.35)]"
                            : "bg-transparent border-[#1C1814]/[0.12] text-[#1C1814] hover:border-[#C4A882]/60 hover:bg-[#C4A882]/[0.05]"
                        }`}
                      >
                        {label}
                        {sort === key && (
                          <span className="text-[#C4A882]">
                            <CheckIcon />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SIZE */}
                <div>
                  <p className="text-[9px] font-medium tracking-[0.45em] uppercase text-[#8a7a63] mb-5 flex items-center gap-3">
                    Size
                    <span className="flex-1 h-px bg-gradient-to-r from-[#C4A882]/40 to-transparent" />
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => {
                      const active = filters.size.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => {
                            const updated = active ? filters.size.filter((s) => s !== size) : [...filters.size, size];
                            setFilters((prev) => ({ ...prev, size: updated }));
                          }}
                          className={`px-[1.2rem] py-2 border text-[11px] tracking-[0.15em] uppercase cursor-pointer transition-all duration-250 ${
                            active
                              ? "bg-gradient-to-b from-[#241F1A] to-[#171310] text-[#E8E0D0] border-[#1C1814] shadow-[0_3px_10px_-3px_rgba(28,24,20,0.35)]"
                              : "bg-transparent text-[#1C1814] border-[#1C1814]/20 hover:border-[#C4A882] hover:text-[#8a6a3f]"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* COLOR */}
                {colors.length > 0 && (
                  <div>
                    <p className="text-[9px] font-medium tracking-[0.45em] uppercase text-[#8a7a63] mb-5 flex items-center gap-3">
                      Colour
                      <span className="flex-1 h-px bg-gradient-to-r from-[#C4A882]/40 to-transparent" />
                    </p>
                    <div className="flex flex-wrap gap-5">
                      {colors.map((color) => {
                        const active = filters.color.includes(color);
                        return (
                          <div
                            key={color}
                            onClick={() => {
                              const updated = active ? filters.color.filter((c) => c !== color) : [...filters.color, color];
                              setFilters((prev) => ({ ...prev, color: updated }));
                            }}
                            className="flex flex-col items-center gap-[0.45rem] cursor-pointer group"
                          >
                            {/* NOTE: backgroundColor is unavoidably inline — `color` is
                                arbitrary catalog data a static Tailwind class can't express. */}
                            <span
                              style={{ backgroundColor: color }}
                              className={`w-7 h-7 rounded-full border-2 border-[#FCFBF8] outline outline-1 outline-offset-[3px] shadow-[0_1px_4px_rgba(28,24,20,0.15)] transition-all duration-250 group-hover:scale-110 group-hover:shadow-[0_2px_10px_rgba(28,24,20,0.25)] ${
                                active ? "outline-[#C4A882] outline-2" : "outline-[#1C1814]/15"
                              }`}
                            />
                            <span
                              className={`${BODY_FONT} text-[9px] tracking-[0.1em] capitalize transition-colors duration-200 ${
                                active ? "text-[#8a6a3f]" : "text-[#6B5B4E]"
                              }`}
                            >
                              {color}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* PRICE */}
                <div>
                  <div className="flex justify-between items-baseline mb-6">
                    <p className="text-[9px] font-medium tracking-[0.45em] uppercase text-[#8a7a63]">Max Price</p>
                    <span className={`${josefin.className} text-[1.4rem]  font-light text-[#1C1814] tracking-[0.02em]`}>
                      ₹{filters.maxPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="py-2">
                    {/*
                      NOTE: the fill gradient tracks a runtime percentage (pricePct), so it's
                      set via a CSS custom property (--fill) rather than a hardcoded style
                      object — the one value Tailwind's static classes can't express, since
                      it changes on every drag.
                    */}
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={filters.maxPrice}
                      style={{ "--fill": `${pricePct}%` }}
                      onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                      className="w-full h-[3px] rounded outline-none cursor-pointer appearance-none
                        bg-[linear-gradient(to_right,#B8956A_0%,#1C1814_var(--fill),rgba(28,24,20,0.12)_var(--fill),rgba(28,24,20,0.12)_100%)]
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-b [&::-webkit-slider-thumb]:from-[#2b241d] [&::-webkit-slider-thumb]:to-[#171310] [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#FCFBF8] [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(28,24,20,0.4),0_0_0_1px_#C4A882]
                        [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200 active:[&::-webkit-slider-thumb]:scale-125
                        [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#1C1814]
                        [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#FCFBF8]
                        [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(28,24,20,0.4),0_0_0_1px_#C4A882] [&::-moz-range-track]:h-[3px] [&::-moz-range-track]:rounded"
                    />
                  </div>
                  <div className="flex justify-between mt-[0.5rem]">
                    <span className={`${BODY_FONT} text-[10px] text-[#1C1814]/60`}>₹0</span>
                    <span className={`${BODY_FONT} text-[10px] text-[#1C1814]/60`}>₹10,000</span>
                  </div>
                </div>
              </div>

              {/* Footer — fixed at bottom, never overlaps scroll */}
              <div className="flex-shrink-0 flex gap-3 px-8 py-5 border-t border-[#C4A882]/20 bg-[#FCFBF8]">
                <button
                  onClick={() => setFilters({ size: [], color: [], maxPrice: 10000 })}
                  className={`${josefin.className} flex-1 py-[0.9rem] border border-[#1C1814]/20 bg-transparent text-[10px] tracking-[0.25em] uppercase text-[#1C1814] cursor-pointer transition-all duration-250 hover:border-[#1C1814]/50 hover:bg-[#1C1814]/[0.03]`}
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className={`${josefin.className} flex-[2] py-[0.9rem] border border-[#1C1814] bg-gradient-to-b from-[#241F1A] to-[#151210] text-[10px] tracking-[0.25em] uppercase text-[#E8E0D0] cursor-pointer transition-shadow duration-250 shadow-[0_6px_20px_-6px_rgba(28,24,20,0.4)] hover:shadow-[0_8px_24px_-6px_rgba(28,24,20,0.5)]`}
                >
                  View {filteredProducts.length} Pieces
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
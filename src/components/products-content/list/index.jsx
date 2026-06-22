"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Josefin_Sans } from "next/font/google";
import ProductItem from "../../product-item";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M2 4L6 8L10 4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M1 1L13 13M13 1L1 13"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <line
      x1="1"
      y1="4"
      x2="15"
      y2="4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <line
      x1="1"
      y1="8"
      x2="15"
      y2="8"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <line
      x1="1"
      y1="12"
      x2="15"
      y2="12"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle
      cx="5"
      cy="4"
      r="2"
      fill="white"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle
      cx="11"
      cy="8"
      r="2"
      fill="white"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle
      cx="5"
      cy="12"
      r="2"
      fill="white"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

export default function ProductList({ initialProducts, slug }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);
  const [products] = useState(initialProducts);
  const [sort, setSort] = useState("popular");
  const [openSort, setOpenSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [filters, setFilters] = useState({
    size: [],
    color: [],
    maxPrice: 10000,
  });
  const [debouncedPrice, setDebouncedPrice] = useState(10000);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      button.style.display =
        footer.getBoundingClientRect().top < window.innerHeight
          ? "none"
          : "flex";
      
       
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
      router.replace(`/collections/${slug}${newQuery ? `?${newQuery}` : ""}`, {
        scroll: false,
      });
  }, [filters.size, filters.color, debouncedPrice, sort, isInitialized]);

  const sizes = [
    ...new Set(products.flatMap((p) => (p.size ? p.size.split(",") : []))),
  ];
  const colors = [...new Set(products.map((p) => p.color).filter(Boolean))];

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (p) =>
          (!filters.size.length ||
            filters.size.some((s) => p.size?.includes(s))) &&
          (!filters.color.length || filters.color.includes(p.color)) &&
          p.currentPrice <= filters.maxPrice,
      )
      .sort((a, b) => {
        if (sort === "low") return a.currentPrice - b.currentPrice;
        if (sort === "high") return b.currentPrice - a.currentPrice;
        return 0;
      });
  }, [products, filters, sort]);
  const sortLabels = {
    popular: "Sort",
    low: "Price: Low → High",
    high: "Price: High → Low",
  };
  const activeCount = filters.size.length + filters.color.length;

  const bannerRef = useRef(null);
  const [stickyBar, setStickyBar] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setStickyBar(window.innerWidth >= 1024 ? window.scrollY > window.innerHeight - 80
        : window.scrollY > 240
);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <style>{`
        .heading-font { font-family: ${josefin.style.fontFamily}; }
        .font-futura  { font-family: "Century Gothic", Futura, "Trebuchet MS", sans-serif; }

        .size-pill {
          padding: 0.45rem 1.1rem;
          border: 1px solid rgba(28,24,20,0.25);
          font-family: ${josefin.style.fontFamily};
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #1C1814;
          background: transparent;
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s, color 0.25s;
        }
        .size-pill:hover  { border-color: #1C1814; }
        .size-pill.active { background: #1C1814; color: #E8E0D0; border-color: #1C1814; }

        .drawer-size-pill {
          padding: 0.5rem 1.2rem;
          border: 1px solid rgba(28,24,20,0.2);
          font-family: ${josefin.style.fontFamily};
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #1C1814;
          background: transparent;
          cursor: pointer;
          transition: all 0.25s;
        }
        .drawer-size-pill:hover  { border-color: #1C1814; }
        .drawer-size-pill.active { background: #1C1814; color: #E8E0D0; border-color: #1C1814; }

        .color-swatch {
          width: 28px; height: 28px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
          outline: 2px solid transparent;
          transition: outline 0.2s, transform 0.2s;
        }
        .color-swatch:hover  { transform: scale(1.12); }
        .color-swatch.active { outline: 2px solid #1C1814; outline-offset: 3px; }

        .sort-btn {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border: 1px solid rgba(28,24,20,0.2);
          background: transparent;
          font-family: "Century Gothic", Futura, "Trebuchet MS", sans-serif;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #1C1814; cursor: pointer; transition: border-color 0.25s;
          white-space: nowrap;
        }
        .sort-btn:hover { border-color: #1C1814; }

        .sort-option {
          padding: 0.75rem 1.2rem;
          font-family: "Century Gothic", Futura, "Trebuchet MS", sans-serif;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #1C1814; cursor: pointer; transition: background 0.2s;
        }
        .sort-option:hover  { background: rgba(196,168,130,0.12); }
        .sort-option.active { color: #C4A882; }

        /* ── Premium range slider ─────────────────────────── */
        input[type=range].premium-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%; height: 2px;
          background: rgba(28,24,20,0.15);
          outline: none; cursor: pointer;
          border-radius: 2px;
        }
        input[type=range].premium-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #1C1814;
          cursor: pointer;
          border: 3px solid #FAFAF7;
          box-shadow: 0 0 0 1px #1C1814;
          transition: transform 0.2s;
        }
        input[type=range].premium-range:active::-webkit-slider-thumb { transform: scale(1.25); }
        input[type=range].premium-range::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #1C1814;
          cursor: pointer;
          border: 3px solid #FAFAF7;
          box-shadow: 0 0 0 1px #1C1814;
        }
        input[type=range].premium-range::-moz-range-track {
          height: 2px; background: rgba(28,24,20,0.15); border-radius: 2px;
        }

        .filter-float-btn {
          display: flex; align-items: center; gap: 0.6rem;
          padding: 0.75rem 1.8rem;
          background: #1C1814; color: #E8E0D0; border: none;
          font-family: ${josefin.style.fontFamily};
          font-size: 10px; font-weight: 400; letter-spacing: 0.25em;
          text-transform: uppercase; cursor: pointer; transition: background 0.3s;
        }
        .filter-float-btn:hover { background: #2e2820; }

        .active-tag {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.3rem 0.85rem;
          border: 1px solid rgba(28,24,20,0.2);
          font-family: ${josefin.style.fontFamily};
          font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          color: #1C1814; white-space: nowrap;
        }

        .drawer-section-title {
          font-family: ${josefin.style.fontFamily};
          font-size: 9px; font-weight: 400; letter-spacing: 0.45em;
          text-transform: uppercase; color: #B09880; margin-bottom: 1.25rem;
        }

        .product-count {
          text-align:center;
          font-family: ${josefin.style.fontFamily};;
          font-size: 14px; letter-spacing: 0.1em;  color: #4a4036;;
        }
      `}</style>

      <div className="bg-white min-h-screen">
        {/* ── HEADER ─────────────────────────────────────────── */}
        {/* <div style={{ textAlign: "center", padding: "clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem) 2.5rem", borderBottom: "1px solid rgba(196,168,130,0.2)" }}>
          <h1 className="heading-font" style={{ fontWeight: 400, fontSize: "clamp(1.2rem, 4vw, 1rem)", letterSpacing: "0.25em", textTransform: "uppercase", color: "#1C1814", marginBottom: "1.25rem" }}>
            {slug?.replace(/-/g, " ")}
          </h1>
          <p className="font-futura" style={{ maxWidth: 660, margin: "0 auto 2.5rem", fontSize: "clamp(12px, 1.3vw, 15px)", fontWeight: 300, lineHeight: 1.9, color: "#6B5B4E" }}>
            Influenced by the archives of the House, the collection of elegant shirts and overshirts serve as staples for the modern-day Dhirago man's wardrobe.
          </p>
          <div style={{ width: 40, height: 1, background: "#C4A882", margin: "0 auto 2.5rem" }} />
          <p className="heading-font" style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "#1C1814", marginBottom: "1.25rem" }}>
            Select Your Size
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.6rem" }}>
            {sizes.map((size) => {
              const active = filters.size.includes(size);
              return (
                <motion.button
                  key={size}
                  whileTap={{ scale: 0.94 }}
                  className={`size-pill ${active ? "active" : ""}`}
                  onClick={() => {
                    const updated = active
                      ? filters.size.filter((s) => s !== size)
                      : [...filters.size, size];
                    setFilters((prev) => ({ ...prev, size: updated }));
                  }}
                >
                  {size}
                </motion.button>
              );
            })}
          </div>
        </div> */}
        {stickyBar && <div style={{ height: "70px" }} />}
        {/* ── TOP BAR ────────────────────────────────────────── */}
        <div
          className={`justify-center`}
          style={{
            position: stickyBar ? "fixed" : "relative",
            top: stickyBar ? (isDesktop ? "80px" : "60px") : "0px", // desktop header height
            left: 0,
            right: 0,
            width: "100%",
            zIndex: 40,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem 2rem",
            borderBottom: "1px solid rgba(196,168,130,0.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              flexWrap: "wrap",
            }}
          >
            <span className="product-count font-normal">
              {filteredProducts.length} Products
            </span>
            {[...filters.size, ...filters.color].map((item) => (
              <span key={item} className="active-tag">
                {item}
                <button
                  onClick={() =>
                    setFilters({
                      ...filters,
                      size: filters.size.filter((s) => s !== item),
                      color: filters.color.filter((c) => c !== item),
                    })
                  }
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#1C1814",
                    padding: 0,
                    display: "flex",
                  }}
                >
                  <CloseIcon />
                </button>
              </span>
            ))}
          </div>

          <div className="relative lg:left-[44%] hidden md:block">
            <button
              className="sort-btn"
              aria-label="Sort products"
              aria-expanded={openSort}
              onClick={() => setOpenSort(!openSort)}
            >
              {sortLabels[sort]} <ChevronDown />
            </button>
            <AnimatePresence>
              {openSort && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 6px)",
                    background: "#FAFAF7",
                    border: "1px solid rgba(196,168,130,0.3)",
                    minWidth: 200,
                    zIndex: 100,
                  }}
                >
                  {Object.entries(sortLabels).map(([key, label]) => (
                    <div
                      key={key}
                      className={`sort-option ${sort === key ? "active" : ""}`}
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
        </div>

        {/* ── PRODUCT GRID ───────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-14 gap-6 md:px-12 px-2 py-6">
          {Array.from({ length: 20 }).map((_, i) => {
            const item = filteredProducts[i % filteredProducts.length];

            return (
              <ProductItem
                key={i}
                id={item.id}
                slug={item.slug}
                sku={item.sku}
                color={item.color}
                name={item.name}
                currentPrice={item.currentPrice}
                images={item.image}
              />
            );
          })}

               {/* {filteredProducts.map((item) => (
            <ProductItem key={item.id} id={item.id} sku={item.sku} slug={item.slug} color={item.color} name={item.name} currentPrice={item.currentPrice} images={item.image} />
          ))} */}
        </div>

        {/* ── FLOAT BUTTON ───────────────────────────────────── */}
        <div
          id="filterBtn"
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
          }}
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="filter-float-btn"
            aria-label="Open filters"
            onClick={() => setShowFilters(true)}
          >
            <FilterIcon />
            Filter & Sort
            {activeCount > 0 && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#C4A882",
                  color: "#1C1814",
                  fontSize: 9,
                  fontWeight: 600,
                  marginLeft: 2,
                }}
              >
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
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 40,
                  background: isDesktop
                    ? "rgba(28,24,20,0.25)"
                    : "rgba(28,24,20,0.4)",
                  backdropFilter: "blur(2px)",
                }}
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
                  if (!isDesktop && touchStartY - touchEndY < -80)
                    setShowFilters(false);
                }}
                style={{
                  position: "fixed",
                  zIndex: 50,
                  background: "#FAFAF7",
                  /* ── KEY: flex column so footer is always in flow ── */
                  display: "flex",
                  flexDirection: "column",
                  ...(isDesktop
                    ? {
                        top: 0,
                        left: 0,
                        height: "100vh",
                        width: 400,
                        borderRight: "1px solid rgba(196,168,130,0.25)",
                      }
                    : {
                        bottom: 0,
                        left: 0,
                        right: 0,
                        maxHeight: "88vh",
                        borderTop: "1px solid rgba(196,168,130,0.25)",
                      }),
                }}
              >
                {/* Drag handle — mobile only */}
                {!isDesktop && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "1rem 0 0",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 3,
                        borderRadius: 99,
                        background: "rgba(28,24,20,0.2)",
                      }}
                    />
                  </div>
                )}

                {/* Header — fixed height */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.5rem 2rem",
                    borderBottom: "1px solid rgba(196,168,130,0.2)",
                    flexShrink: 0,
                  }}
                >
                  <div>
                    <h2
                      className="heading-font"
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 400,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "#1C1814",
                      }}
                    >
                      Refine
                    </h2>
                    {activeCount > 0 && (
                      <p
                        className="font-futura"
                        style={{ fontSize: 11, color: "#B09880", marginTop: 2 }}
                      >
                        {activeCount} filter{activeCount > 1 ? "s" : ""} active
                      </p>
                    )}
                  </div>
                  <button
                    aria-label="Close filters"
                    onClick={() => setShowFilters(false)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#1C1814",
                      padding: "0.25rem",
                    }}
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Body — grows, scrolls */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2.5rem",
                  }}
                >
                  {/* SORT */}
                  <div>
                    <p className="drawer-section-title">Sort By</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      {Object.entries(sortLabels).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setSort(key)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0.85rem 1rem",
                            border: "1px solid",
                            borderColor:
                              sort === key ? "#1C1814" : "rgba(28,24,20,0.12)",
                            background:
                              sort === key ? "#1C1814" : "transparent",
                            cursor: "pointer",
                            fontFamily: `"Century Gothic", Futura, "Trebuchet MS", sans-serif`,
                            fontSize: 12,
                            letterSpacing: "0.06em",
                            color: sort === key ? "#E8E0D0" : "#1C1814",
                            transition: "all 0.25s",
                          }}
                        >
                          {label}
                          {sort === key && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M1.5 5L4 7.5L8.5 2.5"
                                stroke="#C4A882"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SIZE */}
                  <div>
                    <p className="drawer-section-title">Size</p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      {sizes.map((size) => {
                        const active = filters.size.includes(size);
                        return (
                          <button
                            key={size}
                            className={`drawer-size-pill ${active ? "active" : ""}`}
                            onClick={() => {
                              const updated = active
                                ? filters.size.filter((s) => s !== size)
                                : [...filters.size, size];
                              setFilters((prev) => ({
                                ...prev,
                                size: updated,
                              }));
                            }}
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
                      <p className="drawer-section-title">Colour</p>
                      <div
                        style={{
                          display: "flex",
                          gap: "1.25rem",
                          flexWrap: "wrap",
                        }}
                      >
                        {colors.map((color) => {
                          const active = filters.color.includes(color);
                          return (
                            <div
                              key={color}
                              onClick={() => {
                                const updated = active
                                  ? filters.color.filter((c) => c !== color)
                                  : [...filters.color, color];
                                setFilters((prev) => ({
                                  ...prev,
                                  color: updated,
                                }));
                              }}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "0.4rem",
                                cursor: "pointer",
                              }}
                            >
                              <div
                                className={`color-swatch ${active ? "active" : ""}`}
                                style={{ backgroundColor: color }}
                              />
                              <span
                                className="font-futura"
                                style={{
                                  fontSize: 9,
                                  letterSpacing: "0.1em",
                                  textTransform: "capitalize",
                                  color: "#6B5B4E",
                                }}
                              >
                                {color}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* PRICE — always last, always visible via scroll */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <p className="drawer-section-title" style={{ margin: 0 }}>
                        Max Price
                      </p>
                      <span
                        className="heading-font"
                        style={{
                          fontSize: "1rem",
                          fontWeight: 300,
                          color: "#1C1814",
                          letterSpacing: "0.05em",
                        }}
                      >
                        ₹{filters.maxPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    {/* Wrapper adds vertical padding so thumb is not clipped */}
                    <div style={{ padding: "0.5rem 0" }}>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={filters.maxPrice}
                        className="premium-range"
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            maxPrice: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.4rem",
                      }}
                    >
                      <span
                        className="font-futura"
                        style={{ fontSize: 10, color: "rgba(28,24,20,0.75)" }}
                      >
                        ₹0
                      </span>
                      <span
                        className="font-futura"
                        style={{ fontSize: 10, color: "rgba(28,24,20,0.75)" }}
                      >
                        ₹10,000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer — fixed at bottom, never overlaps scroll */}
                <div
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    gap: "0.75rem",
                    padding: "1.25rem 2rem",
                    borderTop: "1px solid rgba(196,168,130,0.2)",
                    background: "#FAFAF7",
                  }}
                >
                  <button
                    onClick={() =>
                      setFilters({ size: [], color: [], maxPrice: 10000 })
                    }
                    style={{
                      flex: 1,
                      padding: "0.9rem",
                      border: "1px solid rgba(28,24,20,0.2)",
                      background: "transparent",
                      fontFamily: josefin.style.fontFamily,
                      fontSize: 10,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "#1C1814",
                      cursor: "pointer",
                    }}
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    style={{
                      flex: 2,
                      padding: "0.9rem",
                      border: "none",
                      background: "#1C1814",
                      fontFamily: josefin.style.fontFamily,
                      fontSize: 10,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "#E8E0D0",
                      cursor: "pointer",
                    }}
                  >
                    View {filteredProducts.length} Pieces
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

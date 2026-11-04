"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../store/reducers/cart";
import { openCartDrawer } from "../../../lib/cartDrawer";

const BASE_URL = process.env.NEXT_PUBLIC_IMG_URL || "";

function imageUrl(image) {
  const path = typeof image === "string" ? image : image?.url;
  if (!path) return "/images/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function formatPrice(value) {
  return `₹ ${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ direction = "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-5 w-5 ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SelectChevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const QuickAddModal = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [imgIndex, setImgIndex] = useState(0);
  const [size, setSize] = useState("");
  const [error, setError] = useState("");

  const images = useMemo(
    () => (product?.images || []).filter(Boolean),
    [product?.images],
  );
  const sizes = product?.sizes || [];
  const activeImage = images[imgIndex] || images[0];
  const mrp = Number(product?.mrp ?? product?.price) || 0;
  const selling = Number(product?.currentPrice) || mrp;

  useEffect(() => {
    if (!isOpen) return;
    setImgIndex(0);
    setError("");
    setSize(sizes[0]?.label || "");
  }, [isOpen, product?.id, sizes]);

  useEffect(() => {
    if (imgIndex >= images.length && images.length) setImgIndex(0);
  }, [imgIndex, images.length]);

  const changeImage = useCallback(
    (direction) => {
      if (images.length < 2) return;
      setImgIndex((current) =>
        direction === "next"
          ? (current + 1) % images.length
          : (current - 1 + images.length) % images.length,
      );
    },
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") changeImage("previous");
      if (event.key === "ArrowRight") changeImage("next");
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, changeImage]);

  const handleAdd = () => {
    if (!size) {
      setError("Please select a size");
      return;
    }

    dispatch(
      addProduct({
        count: 1,
        product: {
          id: product.id,
          name: product.name,
          sku: product.sku,
          slug: product.slug,
          thumb: images[0] || "",
          price: selling,
          special_price: selling,
          currentPrice: selling,
          mrp: mrp || selling,
          originalPrice: mrp || selling,
          discount: product.discount || 0,
          category: product.category || null,
          size: size.toLowerCase(),
          color: product.color,
        },
      }),
    );
    onClose();
    openCartDrawer();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-0 md:items-center md:p-6 lg:p-10"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          role="presentation"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 28, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            className="relative flex max-h-[96svh] w-full flex-col overflow-hidden bg-white text-[#111] shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:max-h-[min(820px,calc(100vh-3rem))] md:max-w-[980px] md:flex-row"
          >
            {/* ---------- Mobile header ---------- */}
            <div className="relative flex shrink-0 items-center justify-center border-b border-black/10 px-12 py-4 md:hidden">
              <h2 className="text-[13px] font-medium uppercase tracking-[0.18em]">
                Choose Options
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close quick view"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-[#111]"
              >
                <CloseIcon />
              </button>
            </div>

            {/* ---------- Gallery ---------- */}
            <div className="relative flex min-h-0 w-full flex-col bg-[#f4f4f4] md:w-[52%]">
              <div className="relative aspect-[3/4] w-full overflow-hidden md:aspect-auto md:min-h-0 md:flex-1">
                {activeImage ? (
                  <img
                    src={imageUrl(activeImage)}
                    alt={product?.name || "Product preview"}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full min-h-[280px] items-center justify-center text-xs uppercase tracking-[0.16em] text-black/40">
                    Image unavailable
                  </div>
                )}

                {/* Mobile side arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => changeImage("previous")}
                      aria-label="Previous product image"
                      className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-black/70 transition hover:text-black md:left-3"
                    >
                      <ChevronIcon direction="left" />
                    </button>
                    <button
                      type="button"
                      onClick={() => changeImage("next")}
                      aria-label="Next product image"
                      className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-black/70 transition hover:text-black md:right-3"
                    >
                      <ChevronIcon />
                    </button>
                  </>
                )}
              </div>

              {/* Desktop dots under image */}
              {images.length > 1 && (
                <div className="hidden items-center justify-center gap-2 py-4 md:flex">
                  {images.map((_, index) => (
                    <button
                      type="button"
                      key={`dot-${index}`}
                      onClick={() => setImgIndex(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-current={index === imgIndex ? "true" : undefined}
                      className={`h-1.5 w-1.5 rounded-full transition ${
                        index === imgIndex ? "bg-black" : "bg-black/25 hover:bg-black/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ---------- Details ---------- */}
            <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-y-auto bg-white px-5 pb-6 pt-5 sm:px-8 md:w-[48%] md:px-10 md:pb-10 md:pt-12">
              {/* Desktop close */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close quick view"
                className="absolute right-4 top-4 hidden h-10 w-10 items-center justify-center text-[#111] md:flex"
              >
                <CloseIcon />
              </button>

              <div className="text-center md:mt-2 md:text-left">
                <h2
                  id="quick-view-title"
                  className="text-[15px] font-futura font-medium uppercase leading-snug tracking-[0.08em] sm:text-[16px] md:pr-8 md:text-[15px]"
                >
                  {product?.name}
                </h2>

                {/* <p className="mt-3 text-[14px] tracking-[0.02em] text-[#111] md:mt-4 md:text-[15px]">
                  <span className="mr-1 text-[12px] uppercase tracking-[0.08em] text-black/55">
                    MRP
                  </span>
                  {formatPrice(mrp > 0 ? mrp : selling)}
                </p>
                <p className="mt-1 hidden text-[11px] text-black/45 md:block">
                  (Incl. of all taxes)
                </p>

                {mrp > selling && (
                  <p className="mt-1 text-[12px] text-[#1f8a4c] md:mt-2">
                    Selling {formatPrice(selling)}
                    {Number(product?.discount) > 0
                      ? ` · ${Math.round(Number(product.discount))}% Off`
                      : ""}
                  </p>
                )} */}
                <p className="mt-6 flex flex-wrap items-baseline gap-2 text-[17px] tracking-[0.01em]"><span>{formatPrice(Math.round(selling))}</span><span className="text-[13px] text-black/40 line-through">{formatPrice(mrp > 0 ? mrp : selling)}</span><span className="text-[12px] text-[#1f8a4c]">{Number(product?.discount) > 0
                      ? ` · ${Math.round(Number(product.discount))}% Off`
                      : ""}</span></p>
              </div>

              <div className="mt-6 md:mt-8">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[12px] font-medium uppercase tracking-[0.14em]">
                    Size:
                  </p>
                  <Link
                    href={`/product/${product?.slug}`}
                    onClick={onClose}
                    className="text-[12px] text-black/60 underline underline-offset-4 transition hover:text-black"
                  >
                    View Size Guide
                  </Link>
                </div>

                <div className="relative">
                  <select
                    value={size}
                    onChange={(e) => {
                      setSize(e.target.value);
                      setError("");
                    }}
                    aria-label="Select size"
                    className={`h-11 w-full appearance-none border bg-white px-3 pr-10 text-[13px] text-[#111] outline-none transition focus:border-black ${
                      error ? "border-[#c0392b]" : "border-[#d0d0d0]"
                    }`}
                  >
                    {!size && <option value="">Select size</option>}
                    {sizes.map((item) => (
                      <option key={item.id || item.label} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
                {error && (
                  <p className="mt-2 text-xs text-[#9a3f35]">{error}</p>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3 md:mt-7">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex h-12 w-full items-center justify-center bg-black text-[12px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#222]"
                >
                  Add to Cart
                </button>

                <Link
                  href="/handwork"
                  onClick={onClose}
                  className="flex h-12 w-full items-center justify-center border border-black bg-white text-[12px] font-medium uppercase tracking-[0.2em] text-black transition hover:bg-[#f7f7f7]"
                >
                  Meet the Makers
                </Link>
              </div>

              <div className="mt-5 hidden text-center md:mt-8 md:block">
                <Link
                  href={`/product/${product?.slug}`}
                  onClick={onClose}
                  className="text-[13px] text-black/70 underline underline-offset-4 transition hover:text-black"
                >
                  View details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickAddModal;

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../store/reducers/cart";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const BASE_URL = process.env.NEXT_PUBLIC_IMG_URL || "";

function imageUrl(image) {
  const path = typeof image === "string" ? image : image?.url;
  if (!path) return "/images/placeholder.png";
  return path.startsWith("http") || path.startsWith("/")
    ? `${BASE_URL}${path}`
    : `${BASE_URL}${path}`;
}

function formatPrice(value) {
  return `₹ ${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({ direction = "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.2"
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

  useEffect(() => {
    if (!isOpen) return;
    setImgIndex(0);
    setError("");
    setSize(sizes[0]?.label || "");
  }, [isOpen, product?.id, sizes]);

  useEffect(() => {
    if (imgIndex >= images.length && images.length) setImgIndex(0);
  }, [imgIndex, images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

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
          price: product.currentPrice,
          category: product.category || null,
          size: size.toLowerCase(),
          color: product.color,
        },
      }),
    );
    onClose();
  };

  const changeImage = (direction) => {
    if (images.length < 2) return;
    setImgIndex((current) =>
      direction === "next"
        ? (current + 1) % images.length
        : (current - 1 + images.length) % images.length,
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#171717]/55 p-0 backdrop-blur-[3px] md:items-center md:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          role="presentation"
        >
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            className="relative flex max-h-[94svh] w-full flex-col overflow-hidden bg-[#f8f7f4] text-[#1b1b1b] shadow-[0_24px_80px_rgba(0,0,0,0.2)] md:max-h-[min(760px,calc(100vh-4rem))] md:max-w-[1120px] md:flex-row"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1b1b1b] transition hover:bg-white md:right-5 md:top-5"
            >
              <CloseIcon />
            </button>

            {/* Gallery */}
            <div className="relative flex min-h-0 w-full flex-col bg-[#eeeae4] md:w-[56%] md:flex-row">
              <div className="relative order-1 min-h-0 flex-1 overflow-hidden md:order-2">
                {activeImage ? (
                  <img
                    src={imageUrl(activeImage)}
                    alt={product?.name || "Product preview"}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.16em] text-black/40">
                    Image unavailable
                  </div>
                )}

                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 md:bottom-5 md:right-5">
                    <button
                      type="button"
                      onClick={() => changeImage("previous")}
                      aria-label="Previous product image"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
                    >
                      <ArrowIcon direction="left" />
                    </button>
                    <button
                      type="button"
                      onClick={() => changeImage("next")}
                      aria-label="Next product image"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
                    >
                      <ArrowIcon />
                    </button>
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="order-2 flex shrink-0 gap-2 overflow-x-auto p-3 md:order-1 md:w-[92px] md:flex-col md:overflow-y-auto md:overflow-x-hidden md:p-4">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={`${imageUrl(image)}-${index}`}
                      onClick={() => setImgIndex(index)}
                      aria-label={`View product image ${index + 1}`}
                      aria-current={index === imgIndex ? "true" : undefined}
                      className={`relative h-16 w-12 shrink-0 overflow-hidden bg-white md:h-[78px] md:w-full ${
                        index === imgIndex
                          ? "ring-1 ring-[#1b1b1b] ring-offset-2 ring-offset-[#eeeae4]"
                          : "opacity-60 transition hover:opacity-100"
                      }`}
                    >
                      <img
                        src={imageUrl(image)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product information */}
            <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto bg-[#f8f7f4] px-5 pb-5 pt-8 sm:px-8 md:w-[44%] md:px-12 md:pb-10 md:pt-16">
              <div className="mb-8 border-b border-black/10 pb-7 md:mb-10">
                <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-black/45">
                  Quick view
                </p>
                <h2
                  id="quick-view-title"
                  className={`max-w-[420px] text-[22px] font-normal leading-[1.2] tracking-[-0.02em] sm:text-[20px] ${josefin.className}`}
                >
                  {product?.name}
                </h2>
                {product?.sku && (
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-black/45">
                    {product.sku}
                  </p>
                )}
                <p className="mt-6 text-[17px] tracking-[0.01em]">
                  {formatPrice(product?.currentPrice)}
                </p>
              </div>

              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/60">
                    Select size
                  </p>
                  <Link
                    href={`/product/${product?.slug}`}
                    onClick={onClose}
                    className="text-[10px] uppercase tracking-[0.16em] text-black/55 underline underline-offset-4 transition hover:text-black"
                  >
                    Size guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((item) => {
                    const selected = size === item.label;
                    return (
                      <button
                        key={item.id || item.label}
                        type="button"
                        onClick={() => {
                          setSize(item.label);
                          setError("");
                        }}
                        className={`flex h-11 min-w-[48px] items-center justify-center border px-4 text-[11px] uppercase tracking-[0.12em] transition ${
                          selected
                            ? "border-[#1b1b1b] bg-[#1b1b1b] text-white"
                            : "border-black/20 bg-transparent text-[#1b1b1b] hover:border-black"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                {error && <p className="mt-3 text-xs text-[#9a3f35]">{error}</p>}
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex h-13 min-h-[52px] w-full items-center justify-center bg-[#1b1b1b] px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-black"
                >
                  Add to bag
                </button>
                <Link
                  href={`/product/${product?.slug}`}
                  onClick={onClose}
                  className="flex min-h-[48px] items-center justify-center border border-black/25 px-6 text-[10px] uppercase tracking-[0.2em] transition hover:border-black hover:bg-white"
                >
                  View full details
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

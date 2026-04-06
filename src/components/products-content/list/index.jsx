"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductItem from "../../product-item";

export default function ProductList({ initialProducts, slug }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products] = useState(initialProducts);
  const [sort, setSort] = useState("popular");

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);

  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  const [filters, setFilters] = useState({
    size: [],
    color: [],
    maxPrice: 10000,
  });

  // ✅ Sync URL
  useEffect(() => {
    const size = searchParams.get("size");
    const color = searchParams.get("color");
    const sortParam = searchParams.get("sort") || "popular";

    setFilters({
      size: size ? size.split(",") : [],
      color: color ? color.split(",") : [],
      maxPrice: 10000,
    });

    setSort(sortParam);
  }, [searchParams]);

  // ✅ Update URL
  const updateURL = (newFilters, newSort = sort) => {
    const params = new URLSearchParams();

    if (newFilters.size.length) params.set("size", newFilters.size.join(","));
    if (newFilters.color.length)
      params.set("color", newFilters.color.join(","));
    if (newSort) params.set("sort", newSort);

    router.push(`/collections/${slug}?${params.toString()}`, {
      scroll: false,
    });
  };

  // Filters data
  const sizes = [
    ...new Set(products.flatMap((p) => (p.size ? p.size.split(",") : []))),
  ];
  const colors = [...new Set(products.map((p) => p.color).filter(Boolean))];

  // Apply filters
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        return (
          (!filters.size.length ||
            filters.size.some((s) => product.size?.includes(s))) &&
          (!filters.color.length || filters.color.includes(product.color)) &&
          product.currentPrice <= filters.maxPrice
        );
      })
      .sort((a, b) => {
        if (sort === "low") return a.currentPrice - b.currentPrice;
        if (sort === "high") return b.currentPrice - a.currentPrice;
        return 0;
      });
  }, [products, filters, sort]);

  return (
    <div className="bg-white min-h-screen">
      {/* HEADER */}
      <div className="text-center pt-14 pb-8 px-4">
        <h1 className="text-[15px] md:text-[25px] categoryheading tracking-[4px] md:tracking-[8px] font-light uppercase">
          {slug?.replace("-", " ")}
        </h1>

        <p className="max-w-xl mx-auto text-[12px] md:text-[18px] p-4 mt-4 tracking-wide font-light leading-relaxed">
          Influenced by the archives of the House, the collection of elegant
          shirts and overshirts serve as staples for the modern-day Dhirago
          man's wardrobe.
        </p>

        <p className=" text-[12px] md:text-[17px] font-semibold text-black-700 mt-4 tracking-[3px]">
          SELECT YOUR SIZE
        </p>

        <div className="flex justify-center flex-wrap gap-3 mt-4">
          {sizes.map((size) => {
            const active = filters.size.includes(size);

            return (
              <motion.button
                key={size}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  const updated = active
                    ? filters.size.filter((s) => s !== size)
                    : [...filters.size, size];

                  setFilters({ ...filters, size: updated });
                }}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200
                      ${
                        active
                          ? "bg-black text-white border-black shadow-sm"
                          : "border-gray-300 hover:border-black"
                      }`}
              >
                {size}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* TOP BAR */}
      {/* <div className="hidden md:flex sticky top-0 z-40 bg-white border-b justify-center items-center px-4 md:px-8 h-[55px]">
        <button
          onClick={() =>
            window.innerWidth < 768
              ? setShowMobileFilters(true)
              : setShowDesktopFilters(true)
          }
          className="flex-1 max-w-[10rem] bg-black text-white py-3 text-sm rounded-full hover:opacity-90 transition"
        >
          Filters
          {filters.size.length + filters.color.length > 0 && (
            <span className="text-[10px] bg-black text-white px-2 py-[2px] rounded-full">
              {filters.size.length + filters.color.length}
            </span>
          )}
        </button>

        
      </div> */}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setShowDesktopFilters(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-xl border backdrop-blur-md text-sm font-medium active:scale-95 transition"
        >
          {/* ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h18M6 12h12M10 20h4"
            />
          </svg>
          Filter & Sort
        </button>
      </div>

      {/* ================= MOBILE FILTER ================= */}
      <AnimatePresence>
        {(showMobileFilters || showDesktopFilters) && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[6px]"
              onClick={() => {
                setShowMobileFilters(false);
                setShowDesktopFilters(false);
              }}
            />

            {/* DRAWER */}
            <motion.div
              initial={showDesktopFilters ? { x: "-100%" } : { y: "100%" }}
              animate={showDesktopFilters ? { x: 0 } : { y: 0 }}
              exit={showDesktopFilters ? { x: "-100%" } : { y: "100%" }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 20,
                mass: 0.8,
              }}
              className={`fixed z-50 bg-white/90 backdrop-blur-xl shadow-2xl
        ${
          showDesktopFilters
            ? "top-0 left-0 h-full w-[380px]"
            : "left-0 right-0 mx-auto w-full max-w-md  bottom-0 w-full rounded-t-3xl max-h-[90vh]"
        }`}
            >
              {/* HANDLE (Mobile) */}
              {!showDesktopFilters && (
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />
              )}

              {/* HEADER */}
              <div className="flex items-center justify-between px-6 pb-4 border-b">
                <h2 className="text-lg font-medium tracking-wide">Filters</h2>

                <button
                  onClick={() => {
                    setShowMobileFilters(false);
                    setShowDesktopFilters(false);
                  }}
                  className="text-sm text-gray-500 hover:text-black transition"
                >
                  ✕
                </button>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setSort(!sort)}
                  className="w-full flex justify-between items-center px-4 py-3 border rounded-xl bg-white"
                >
                  <span>
                    {sort === "popular"
                      ? "Sort"
                      : sort === "low"
                        ? "Price: Low → High"
                        : "Price: High → Low"}
                  </span>
                  <span>⌄</span>
                </button>

                {sort && (
                  <div className="absolute w-full mt-2 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
                    {[
                      { label: "Popular", value: "popular" },
                      { label: "Low → High", value: "low" },
                      { label: "High → Low", value: "high" },
                    ].map((item) => (
                      <div
                        key={item.value}
                        onClick={() => {
                          setSort(item.value);
                          updateURL(filters, item.value);
                          setOpenSort(false);
                        }}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                {/* SIZE */}
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.05 } },
                  }}
                >
                  <p className="text-xs uppercase text-gray-400 mb-3">Size</p>

                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => {
                      const active = filters.size.includes(size);

                      return (
                        <motion.button
                          key={size}
                          whileTap={{ scale: 0.92 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => {
                            const updated = active
                              ? filters.size.filter((s) => s !== size)
                              : [...filters.size, size];

                            setFilters({ ...filters, size: updated });
                          }}
                          className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200
                      ${
                        active
                          ? "bg-black text-white border-black shadow-sm"
                          : "border-gray-300 hover:border-black"
                      }`}
                        >
                          {size}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* COLOR */}
                <motion.div>
                  <p className="text-xs uppercase text-gray-400 mb-3">Color</p>

                  <div className="flex flex-wrap gap-4">
                    {colors.map((color) => {
                      const active = filters.color.includes(color);

                      return (
                        <motion.div
                          key={color}
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.1 }}
                          onClick={() => {
                            const updated = active
                              ? filters.color.filter((c) => c !== color)
                              : [...filters.color, color];

                            setFilters({ ...filters, color: updated });
                          }}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <div
                            className={`w-7 h-7 rounded-full border transition-all
                        ${
                          active
                            ? "ring-2 ring-black scale-110"
                            : "hover:scale-110"
                        }`}
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-sm">{color}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* PRICE */}
                <motion.div>
                  <p className="text-xs uppercase text-gray-400 mb-3">Price</p>

                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        maxPrice: Number(e.target.value),
                      })
                    }
                    className="w-full accent-black bg-black h-[1px]"
                  />

                  <p className="text-xs text-gray-500 mt-2">
                    Up to ₹{filters.maxPrice}
                  </p>
                </motion.div>
              </div>

              {/* ACTION BAR */}
              <div className="p-4 border-t bg-white/80 backdrop-blur flex gap-3">
                <button
                  onClick={() =>
                    setFilters({ size: [], color: [], maxPrice: 10000 })
                  }
                  className="flex-1 border py-3 text-sm rounded-full hover:bg-gray-100 transition"
                >
                  Reset
                </button>

                <button
                  onClick={() => {
                    updateURL(filters);
                    setShowMobileFilters(false);
                    setShowDesktopFilters(false);
                  }}
                  className="flex-1 bg-black text-white py-3 text-sm rounded-full hover:opacity-90 transition"
                >
                  View {filteredProducts.length}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE FLOATING FILTER BUTTON */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-xl border backdrop-blur-md text-sm font-medium active:scale-95 transition"
        >
          {/* ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h18M6 12h12M10 20h4"
            />
          </svg>
          Filter & Sort
        </button>
      </div>

      {/* PRODUCTS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-8 py-6"
      >
        {filteredProducts.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            slug={item.slug}
            name={item.name}
            currentPrice={item.currentPrice}
            images={item.image}
          />
        ))}
      </motion.div>
    </div>
  );
}

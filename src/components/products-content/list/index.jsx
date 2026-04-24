"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductItem from "../../product-item";

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

  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  // ✅ Detect screen
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [debouncedPrice, setDebouncedPrice] = useState(filters.maxPrice);

useEffect(() => {
  const t = setTimeout(() => {
    setDebouncedPrice(filters.maxPrice);
  }, 300); // smooth delay

  return () => clearTimeout(t);
}, [filters.maxPrice]);

  // ✅ Sync URL
 useEffect(() => {
  const size = searchParams.get("size");
  const color = searchParams.get("color");
  const price = searchParams.get("price");
  const sortParam = searchParams.get("sort") || "popular";

  setFilters({
    size: size ? size.split(",") : [],
    color: color ? color.split(",") : [],
    maxPrice: price ? Number(price) : 10000, // ✅ FIX
  });

  setSort(sortParam);

  setIsInitialized(true);
}, [searchParams]);

  // ✅ Update URL
  // const updateURL = (newFilters, newSort = sort) => {
  //   const params = new URLSearchParams();

  //   if (newFilters.size.length) params.set("size", newFilters.size.join(","));
  //   if (newFilters.color.length)
  //     params.set("color", newFilters.color.join(","));
  //    if (newSort && newSort !== "popular") params.set("sort", newSort);
  // const query = params.toString();
  //   // router.push(`/collections/${slug}?${params.toString()}`, {
  //   //   scroll: false,
  //   // });
  //    router.replace(`/collections/${slug}${query ? `?${query}` : ""}`, {
  //   scroll: false,
  // });
  // };

 useEffect(() => {
  if (!isInitialized) return;

  const params = new URLSearchParams();

  if (filters.size.length) params.set("size", filters.size.join(","));
  if (filters.color.length)
    params.set("color", filters.color.join(","));

  // ✅ USE DEBOUNCED VALUE
  if (debouncedPrice < 10000)
    params.set("price", debouncedPrice.toString());

  if (sort && sort !== "popular") params.set("sort", sort);

  const newQuery = params.toString();
  const currentQuery = searchParams.toString();

  if (newQuery !== currentQuery) {
    router.replace(`/collections/${slug}${newQuery ? `?${newQuery}` : ""}`, {
      scroll: false,
    });
  }
}, [filters.size, filters.color, debouncedPrice, sort, isInitialized]);

  // Data
  const sizes = [
    ...new Set(products.flatMap((p) => (p.size ? p.size.split(",") : []))),
  ];
  const colors = [...new Set(products.map((p) => p.color).filter(Boolean))];

  // Filtering
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

  const activeCount = filters.size.length + filters.color.length;

  return (
    <div className="bg-white min-h-screen">
      {/* HEADER */}
      <div className="text-center md:pt-1 pt-4 pb-8 px-4">
        <h1 className="text-[15px] md:text-[25px] categoryheading tracking-[4px] md:tracking-[8px] font-light uppercase">
          {slug?.replace("-", " ")}
        </h1>

        <p className="md:max-w-[55rem] max-w-[27rem] mx-auto text-[11px] md:text-[15px] p-4 mt-1 tracking-wide text-[black] leading-relaxed">
          Influenced by the archives of the House, the collection of elegant
          shirts and overshirts serve as staples for the modern-day Dhirago
          man's wardrobe.
        </p>

        <p className=" text-[12px] md:text-[17px] font-semibold text-black mt-4 tracking-[3px]">
          SELECT YOUR SIZE
        </p>

        <div className="flex justify-center flex-wrap gap-6 mt-4">
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

                  // setFilters({ ...filters, size: updated });
                  setFilters((prev) => {
                    const newFilters = { ...prev, size: updated };
                    return newFilters;
                  });
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200
                      ${
                        active
                          ? "bg-black text-white border-black shadow-sm"
                          : "border-gray-300 hover:border-black"
                      }`}
                        style={{
    color: active ? "white" : "black",
    border:"1px solid black",
    borderRadius:"3px"
   
  }}
              >
                {size}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE FILTERS */}
      {activeCount > 0 && (
        <div className="flex gap-2 px-4 overflow-x-auto pb-3">
          {[...filters.size, ...filters.color].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 px-3 py-1 bg-black text-white text-xs rounded-full"
            >
              {item}
              <button
                onClick={() => {
                  setFilters({
                    ...filters,
                    size: filters.size.filter((s) => s !== item),
                    color: filters.color.filter((c) => c !== item),
                  });
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* FLOAT BUTTON */}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setShowFilters(true)}
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
      {/* DRAWER */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-40 ${
                isDesktop ? "bg-black/20" : "bg-black/30 backdrop-blur-sm"
              }`}
              onClick={() => setShowFilters(false)}
            />

            {/* FILTER PANEL */}
            <motion.div
              initial={isDesktop ? { x: "-100%" } : { y: "100%" }}
              animate={isDesktop ? { x: 0 } : { y: 0 }}
              exit={isDesktop ? { x: "-100%" } : { y: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onTouchStart={(e) => setTouchStartY(e.touches[0].clientY)}
              onTouchMove={(e) => setTouchEndY(e.touches[0].clientY)}
              onTouchEnd={() => {
                if (!isDesktop && touchStartY - touchEndY > 80) {
                  setShowFilters(false);
                }
              }}
              className={`fixed z-50 bg-white/80 backdrop-blur-2xl shadow-2xl
              ${
                isDesktop
                  ? "top-0 left-0 h-full w-[380px] border-r"
                  : "bottom-0 left-0 right-0 rounded-t-3xl max-h-[90vh]"
              }`}
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-5 border-b">
                <h2 className="text-lg font-medium">Filters & Sort</h2>
                <button onClick={() => setShowFilters(false)}>✕</button>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-8 overflow-y-auto">
                {/* SORT */}
                <div className="relative">
                  <button
                    onClick={() => setOpenSort(!openSort)}
                    className="w-full flex justify-between border p-3 rounded-xl "
                  >
                    {sort === "popular"
                      ? "Sort"
                      : sort === "low"
                        ? "Low → High"
                        : "High → Low"}
                    <span>⌄</span>
                  </button>

                  <AnimatePresence>
                    {openSort && (
                      <motion.div className="absolute w-full bg-white border rounded-xl mt-2 shadow-lg text-transform: uppercase">
                        {["popular", "low", "high"].map((s) => (
                          <div
                            key={s}
                            onClick={() => {
                              setSort(s);
                              setOpenSort(false);
                            }}
                            className="p-3 hover:bg-gray-100 cursor-pointer"
                          >
                            {s}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* SIZE */}
                <div>
                  <p className="text-xs text-gray-400 mb-3">SIZE</p>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => {
                      const active = filters.size.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => {
                            const updated = active
                              ? filters.size.filter((s) => s !== size)
                              : [...filters.size, size];

                            // setFilters({ ...filters, size: updated });
                            setFilters((prev) => {
                              const newFilters = { ...prev, size: updated };
                              return newFilters;
                            });
                          }}
                          className={`px-4 py-1.5 rounded-full border text-sm ${
                            active
                              ? "bg-black text-white"
                              : "hover:border-black"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* COLOR */}
                <div>
                  <p className="text-xs text-gray-400 mb-3">COLOR</p>
                  <div className="flex gap-4 flex-wrap">
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
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <div
                            className={`w-8 h-8 rounded-full ${
                              active ? "ring-2 ring-black" : ""
                            }`}
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-[10px]">{color}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* PRICE */}
                <div>
                  <p className="text-xs text-gray-400 mb-3">PRICE</p>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxPrice: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-black bg-black h-[1px]"
                  />
                  <p className="text-xs mt-2">₹{filters.maxPrice}</p>
                </div>
              </div>

              {/* ACTION */}
              <div className="p-4 border-t flex gap-3">
                <button
                  onClick={() =>
                    setFilters({ size: [], color: [], maxPrice: 10000 })
                  }
                  className="flex-1 border py-3 rounded-full"
                >
                  Reset
                </button>

                <button
                  onClick={() => {
                    // updateURL(filters, sort);
                    setShowFilters(false);
                  }}
                  className="flex-1 bg-black text-white py-3 rounded-full"
                >
                  Show {filteredProducts.length}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PRODUCTS */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-1 md:px-4 px-2 py-6">
  {Array.from({ length: 20 }).map((_, i) => {
    const item = filteredProducts[i % filteredProducts.length];

    return (
      <ProductItem
        key={i}
        id={item.id}
        slug={item.slug}
        color={item.color}
        name={item.name}
        currentPrice={item.currentPrice}
        images={item.image}
      />
    );
  })}
</div>
    </div>
  );
}

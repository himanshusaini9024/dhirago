"use client";

import { some } from "lodash";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { addProduct } from "../../../store/reducers/cart";
import { toggleFavProduct } from "../../../store/reducers/user";

import productsColors from "../../../utils/data/products-colors";
import productsSizes from "../../../utils/data/products-sizes";
import MensSizeChart from "../MensSizeChart";

const Content = ({ product }) => {
  const dispatch = useDispatch();
  const [activeDrawer, setActiveDrawer] = useState(null); // Stores the ID of the open drawer

  const menuItems = [
    {
      id: "measurements",
      title: "PRODUCT MEASUREMENTS",
      content:
        "The measurements may vary slightly due to the handmade process. The garment is measured on a flat surface.",
    },
    {
      id: "composition",
      title: "COMPOSITION, CARE & ORIGIN",
      content:
        "100% cotton. Outer shell: 100% OCS certified organically grown cotton. Made in India.",
    },
    {
      id: "shipping",
      title: "SHIPPING, EXCHANGES AND RETURNS",
      content:
        "Free shipping on orders over ₹2,990. 7-day return policy applies.",
    },
  ];

  const [openSizeChart, setOpenSizeChart] = useState(false);
  const generateVariants = (product) => {
    const sizes = product.sizes?.split(",") || [];
    const colors = product.colors?.split(",") || [];

    let variants = [];

    colors.forEach((color) => {
      sizes.forEach((size) => {
        variants.push({
          color: color.trim().toLowerCase(),
          size: size.trim().toLowerCase(),
          price: product.currentPrice,
          image: product.images?.[0] || "",
          stock: product.quantityAvailable,
        });
      });
    });

    return variants;
  };

  // ✅ Memoized variants (important)
  const variants = useMemo(() => generateVariants(product), [product]);

  const [count, setCount] = useState(1);
  const [color, setColor] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [activeVariant, setActiveVariant] = useState(null);

  const favProducts = useSelector((state) => state.user?.favProducts || []);

  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id,
  );

  const findVariant = (selectedColor) => {
    return variants.find((v) => v.color === selectedColor?.toLowerCase());
  };

  // ⭐ Auto select first variant
  useEffect(() => {
    if (variants.length) {
      const first = variants[0];
      setColor(first.color);
      setActiveVariant(first);
    }
  }, [variants]);

  const toggleFav = () => {
    dispatch(toggleFavProduct({ id: product.id }));
  };

  const addToCart = () => {
    if (!itemSize || itemSize === "Select size") {
      alert("Please select size");
      return;
    }

    if (!color) {
      alert("Please select color");
      return;
    }

    console.log("ADD:", {
      color,
      size: itemSize,
      count,
    });

    dispatch(
      addProduct({
        count,
        product: {
          id: product.id,
          name: product.name,
          thumb: product.images ? product.images[0] : "",
          price: product.currentPrice,
          color: color.toLowerCase(),
          size: itemSize.toLowerCase(),
        },
      }),
    );
  };
  const availableColors = [...new Set(variants.map((v) => v.color))];

  return (
    <section className="font-[Montserrat] mt-3 w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-0">
      {/* HEADER */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-xl lg:text-2xl tracking-tight leading-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-xl ">₹,{product.price}</span>

          {product.discount && (
            <span className="bg-gradient-to-r from-black to-gray-700 text-white text-[10px] px-3 py-1 rounded-full">
              SALE
            </span>
          )}
        </div>

        <div className="w-16 h-[2px] bg-gradient-to-r from-black to-gray-300"></div>
      </div>

      {/* OPTIONS */}
      <div className="mt-10 space-y-10">
        {/* COLOR FIXED */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            Select Color
          </h4>

          <div className="flex gap-4 flex-wrap">
            {availableColors.map((colorValue, index) => {
              const colorObj = productsColors.find(
                (c) => c.label.toLowerCase() === colorValue,
              );

              if (!colorObj) return null;

              const isActive = color === colorValue;

              return (
                <motion.button
                  key={index}
                  onClick={() => {
                    setColor(colorValue);

                    const variant = findVariant(colorValue);
                    setActiveVariant(variant || null);
                  }}
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <div
                    className={`w-7 h-7  border-2 ${
                      isActive ? "border-black scale-110" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: colorObj.color }}
                  />

                  {isActive && (
                    <motion.div
                      layoutId="activeColor"
                      className="absolute inset-0  ring-2 ring-black"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* SIZE */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs uppercase tracking-widest text-gray-500">
              Select Size
            </h4>
            <span
              onClick={() => setOpenSizeChart(true)}
              className="text-xs text-black/70 cursor-pointer hover:underline relative right-[11px]"
            >
              Size guide
            </span>
          </div>

          <AnimatePresence>
            {openSizeChart && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 40 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 40 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white w-[95%] max-w-5xl rounded-2xl shadow-2xl relative max-h-[100vh] overflow-y-auto"
                >
                  <button
                    onClick={() => setOpenSizeChart(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                  >
                    ✕
                  </button>

                  <MensSizeChart />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <select
            value={itemSize}
            onChange={(e) => setItemSize(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select size</option>

            {productsSizes.map((type) => (
              <option key={type.id} value={type.label.toLowerCase()}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* QUANTITY + ACTION */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-gray-500">
            Quantity
          </h4>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border rounded-xl overflow-hidden">
              <button
                onClick={() => setCount(Math.max(1, count - 1))}
                className="px-4 py-3 hover:bg-gray-100"
              >
                −
              </button>

              <span className="px-5 text-sm">{count}</span>

              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-3 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={addToCart}
              className="flex-1 bg-gradient-to-r from-black to-gray-800 text-white py-3 rounded-xl text-sm tracking-wide shadow-lg"
            >
              Add to Cart
            </motion.button>

            {/* <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleFav}
              className={`px-4 py-3 rounded-xl border transition ${
                isFavourite ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
            >
              ❤
            </motion.button> */}
          </div>
        </div>
      </div>

      {/* TRUST */}
      <div className="mt-16 border-t border-black/10">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveDrawer(item.id)}
            className="w-full flex justify-between items-center py-5 border-b border-black/10 group hover:opacity-60 transition-opacity"
          >
            <span className="text-[10px] font-medium tracking-[2px] text-black uppercase">
              {item.title}
            </span>
            <span className="text-sm font-light">+</span>
          </button>
        ))}
      </div>

      {/* SIDE DRAWER OVERLAY */}
      <AnimatePresence>
        {activeDrawer && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDrawer(null)}
              className="fixed inset-0 bg-black/20 z-[60] cursor-pointer"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-[11px] font-bold tracking-[2px] uppercase">
                  {menuItems.find((m) => m.id === activeDrawer)?.title}
                </h2>
                <button
                  onClick={() => setActiveDrawer(null)}
                  className="text-2xl font-light hover:rotate-90 transition-transform"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <p className="text-[12px] leading-loose text-gray-700 tracking-wide uppercase">
                  {menuItems.find((m) => m.id === activeDrawer)?.content}
                </p>

                {/* If it's measurements, you could render your table here */}
                {activeDrawer === "measurements" && (
                  <div className="mt-8 border-t pt-4">
                    {/* Your MensSizeChart component could go here */}
                    <p className="text-[10px] text-gray-400 italic">
                      Table data would load here...
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Content;

"use client";

import { some } from "lodash";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { addProduct } from "../../../store/reducers/cart";
import { toggleFavProduct } from "../../../store/reducers/user";

import productsColors from "../../../utils/data/products-colors";
import productsSizes from "../../../utils/data/products-sizes";
import MensSizeChart from "../MensSizeChart";
const Content = ({ product }) => {
  const dispatch = useDispatch();
  const [activeDrawer, setActiveDrawer] = useState(null); // Stores the ID of the open drawer
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const menuItems = [
    {
      id: "measurements",
      title: "PRODUCT DESCRIPTION",
      content: product?.description || "No description available.",
      type: "text",
    },
    {
      id: "composition",
      title: "COMPOSITION, CARE & ORIGIN",
      type: "care",
    },
    {
      id: "shipping",
      title: "SHIPPING, EXCHANGES AND RETURNS",
      content: `
      <div class="accordion__body no-js-accordion" id="description-2" data-accordion-body="">
              <p>Shipping &amp; Dispatch: Ready-to-ship suits/jackets/kurtas dispatch in 2–4 days; embroidered styles (Sherwanis/Indowesterns) usually dispatch in 15–20 days. Overall production timelines range from 2–30 days; the exact timeline is shown on this product.</p><p>Delivery: Express courier after dispatch; typically 4–5 business days across most of India. Tracking is shared when your order ships.</p><p>Changes: Orders are made to your specifications; changes after confirmation aren’t guaranteed. If you’d like to request a change, email brahaanbynarains@gmail.com with your order details and we’ll try our best.</p><p>Returns/Alterations: Refunds/returns are possible in certain situations; fitting alterations can be arranged.</p><p><a href="${baseUrl}/" target="_blank" title="">Read more</a></p>
            </div>
      `,
      type: "text",
    },
  ];

  const CareContent = () => {
    return (
      <div className="space-y-6 text-[13px] text-gray-700 leading-relaxed">
        <p>
          It is advisable to wash this garment separately and avoid direct
          sunlight to prevent colour variation.
        </p>

        {/* CARE ICON LIST */}
        <div className="space-y-3">
          {[
            {
              icon: "/image/upload/v1777724031/no-bleach_nksy8e.png",
              label: "Do not bleach",
            },
            {
              icon: "/image/upload/v1777724031/iron-steam_qixmn4.png",
              label: "Iron or steam with warm heat",
            },
            {
              icon: "/image/upload/v1777724031/hand-wash_ptmbbz.png",
              label: "Separately hand wash",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.icon}`}
                  width={30}
                  height={40}
                  alt=""
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* NOTE */}
        <div className="pt-4 border-t text-[12px] text-gray-500">
          <span className="block tracking-widest text-[10px] mb-2 text-black">
            NOTE
          </span>
          Colour bleeding is normal in naturally dyed garments in the initial
          washes. Over time, the fabric develops a softer, lived-in character.
        </div>
      </div>
    );
  };

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
          price: product.price,
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
  const [sizeError, setSizeError] = useState("");
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
  // ✅ Parse measurements safely
  const measurements = useMemo(() => {
    try {
      if (!product?.measurements) return null;

      // if already object → return directly
      if (typeof product.measurements === "object") {
        return product.measurements;
      }

      // if string → parse JSON
      return JSON.parse(product.measurements);
    } catch (e) {
      console.error("Invalid measurements JSON", e);
      return null;
    }
  }, [product]);

  const addToCart = () => {
    if (!itemSize || itemSize === "Select size") {
      // setItemSize("Please select Your Size");
      setSizeError("Please select Your size");
      return;
    }
    setSizeError("");
    if (!color) {
      alert("Please select color");
      return;
    }

    dispatch(
      addProduct({
        count: 1,
        product: {
          id: product.id,
          name: product.name,
          sku: product.sku,
          thumb: product.images ? product.images[0] : "",
          price: product.price,
          slug: product.slug,
          color: color.toLowerCase(),
          size: itemSize.toLowerCase(),
        },
      }),
    );
  };
  const availableColors = [...new Set(variants.map((v) => v.color))];

  return (
    <section className="font-[Montserrat] mt-3 w-full max-w-xl mx-auto px-4  lg:px-5">
      {/* HEADER */}
      <div className="space-y-4">
        <h1 className="text-xl sm:text-xl lg:text-xl tracking-tight font-light leading-tight">
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
            Color
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
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.08 }}
                  className="relative flex items-center justify-center"
                >
                  {/* OUTER RING */}
                  <div
                    className={`lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${isActive ? "border-2 border-black" : "border border-gray-300"}
              `}
                  >
                    {/* INNER COLOR */}
                    <div
                      className=" lg:w-5 lg:h-5 w-3 h-3  rounded-full"
                      style={{ backgroundColor: colorObj.color }}
                    />
                  </div>

                  {/* ACTIVE ANIMATION RING */}
                  {isActive && (
                    <motion.div
                      layoutId="activeColor"
                      className="absolute lg:w-6 lg:h-6 w-4 h-4 rounded-full ring-1 ring-black"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
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
              className="text-xs text-black/70 cursor-pointer hover:underline relative right-[25px]"
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
                  className="bg-white w-[95%] p-[60px] max-w-5xl rounded-2xl shadow-2xl relative max-h-[100vh] overflow-y-auto"
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
            onChange={(e) => {
              setItemSize(e.target.value);
              setSizeError("");
            }}
            className={`w-full lg:w-[32rem] border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue 
    ${sizeError ? "border-red-500" : "border-gray-300"}
  `}
          >
            <option value="">Select size</option>

            {productsSizes.map((type) => (
              <option key={type.id} value={type.label.toLowerCase()}>
                {type.label}
              </option>
            ))}
          </select>
          {sizeError && (
            <p className="text-red-500 text-xs mt-2">{sizeError}</p>
          )}
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
              className="flex-1 bg-gradient-to-r from-black to-gray-800 max-w-[25rem] text-white py-3 rounded-xl text-sm tracking-wide shadow-lg"
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
      <div className="mt-16 border-t max-w-[34rem] border-black/10">
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
              // className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[70] shadow-2xl p-8 flex flex-col"
              className="fixed top-0 right-0 h-full w-full max-w-[460px] bg-white z-[70] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                {/* <h2 className="text-[11px] font-bold tracking-[2px] uppercase"> */}
                <h2 className="text-[11px] font-semibold tracking-[2px] uppercase text-black">
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
                <div className="flex-1 overflow-y-auto pr-2">
                  {(() => {
                    const activeItem = menuItems.find(
                      (m) => m.id === activeDrawer,
                    );

                    if (!activeItem) return null;

                    if (activeItem.type === "care") {
                      return <CareContent />;
                    }

                    return (
                      <div className="space-y-4 text-[13px] leading-relaxed text-gray-700">
                        {/* HTML Content */}
                        <div
                          className="prose prose-sm max-w-none
                     [&_li]:mb-2 [&_li]:list-disc [&_li]:ml-4
                     [&_p]:mb-3 [&_a]:text-black [&_a]:underline"
                          dangerouslySetInnerHTML={{
                            __html: activeItem.content,
                          }}
                        />
                      </div>
                    );
                  })()}
                </div>

                {/* If it's measurements, you could render your table here */}
                {activeDrawer === "measurements" && measurements && (
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-xs tracking-widest text-gray-500 mb-4 uppercase">
                      Garment Measurements (in inches)
                    </h3>

                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      <table className="w-full text-sm">
                        <tbody>
                          {Object.entries(measurements).map(([key, value]) => (
                            <tr
                              key={key}
                              className="border-b last:border-b-0 hover:bg-gray-50 transition"
                            >
                              <td className="px-4 py-3 text-gray-500 capitalize">
                                {key.replace(/_/g, " ")}
                              </td>
                              <td className="px-4 py-3 text-right font-medium text-black">
                                {value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

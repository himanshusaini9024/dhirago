"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../store/reducers/cart";

const QuickAddModal = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const baseURL = "https://res.cloudinary.com/ds48lk80f/";
  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => {
    if (!product?.images?.length) return;

    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % product.images.length);
    }, 2500); // smooth auto slide

    return () => clearInterval(interval);
  }, [product.images]);

  const [size, setSize] = useState("");
  const [fit, setFit] = useState("regular");

  const sizes = product?.sizes || [];

  // ✅ auto select first size
  useEffect(() => {
    if (sizes.length) {
      setSize(sizes[0].label);
    }
  }, [sizes]);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!size) return alert("Please select size");

    dispatch(
      addProduct({
        count: 1,
        product: {
          id: product.id,
          name: product.name,
          sku: product.sku,
          slug: product.slug,
          thumb: product.images?.[0] || "",
          price: product.currentPrice,
          size: size.toLowerCase(),
          color: product.color
        },
      }),
    );

    onClose();
  };

  return (
    <AnimatePresence>
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center"
      >
        <motion.div
          initial={{ y: "100%", scale: 1 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
          className="
      bg-white w-full h-[90vh] rounded-t-2xl
      md:rounded-none md:w-[95%] md:max-w-5xl md:h-[80vh]
      flex flex-col md:flex-row relative shadow-2xl
    "
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-xl z-10"
          >
            ✕
          </button>

          {/* LEFT IMAGE */}
          <div className="w-full md:w-1/2 h-[45%] md:h-full bg-[#f6f6f6] relative overflow-hidden">
            <div
              className="flex h-full transition-transform duration-700"
              style={{ transform: `translateX(-${imgIndex * 100}%)` }}
            >
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={baseURL + img.url}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full md:w-1/2 px-5 md:px-10 py-6 md:py-12 overflow-y-auto">
            <h2 className="text-[16px] md:text-[20px] mb-2">{product.name}</h2>

            <p className="text-[18px] md:text-[22px] mb-8">
              ₹ {product.currentPrice}
            </p>

            {/* SIZE */}
            <div className="mb-10">
              <p className="text-[11px] tracking-[2px] uppercase mb-3 text-gray-600">
                Select Size & Fit
              </p>

              <div className="grid grid-cols-4 md:flex gap-6 mb-4">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s.label)}
                    className={`py-2 text-sm border ${
                      size === s.label
                        ? "bg-black text-white border-black w-[35px]"
                        : "border-gray-300"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* FIT */}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col md:flex-row gap-3 mt-4">
              <button
                onClick={handleAdd}
                className="w-full py-3 text-white text-sm bg-[#b58a4b] hover:bg-[#a67c3f]"
              >
                ADD TO BAG
              </button>

              <button  
              className="w-full py-3 border border-gray-400 text-sm">
                BUY IT NOW
              </button>
            </div>

            {/* LINK */}
            <p className="mt-6 text-[11px] tracking-[2px] text-gray-600 underline cursor-pointer">
            <Link href={`/product/${product.slug}`}className="cart__btn-back">

              VIEW DETAILS & OFFERS
            </Link>

            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickAddModal;

"use client";
import { useState } from "react";
import Image from "next/image";
import Title from "../../../components/Title";
import { products } from "../../../utils/data/tabinationlist";

const categories = ["all", "T-shirt", "jacket", "pants", "hoodie", "short"];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <section className="py-16">
      {/* HEADER */}
      <div className="flex flex-col items-center justify-center gap-4 mb-10">
        <Title className="uppercase text-2xl md:text-3xl font-light tracking-wide text-center">
          Best Clothing Collection
        </Title>

        <p className="text-sm text-gray-500 text-center max-w-md leading-relaxed">
          Discover timeless pieces crafted for modern lifestyle.
        </p>
      </div>

      <div className="max-w-[95%] mx-auto">

        {/* TABS */}
        <div className="flex gap-6 justify-center mb-12 flex-wrap text-sm tracking-wide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative capitalize transition ${
                activeTab === cat
                  ? "text-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {cat}
              {activeTab === cat && (
                <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-black"></span>
              )}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">

              {/* IMAGE */}
              <div className="relative w-full h-[320px] overflow-hidden bg-gray-100">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500" />

                {/* HOVER BUTTONS */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300">

                  {/* Wishlist */}
                <button className="bg-white p-2 rounded-full shadow-md group hover:bg-black transition">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.8}
                                            stroke="currentColor"
                                            className="w-5 h-5 group-hover:fill-white transition"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.27 1-4 2.44-0.73-1.44-2.26-2.44-4-2.44C5.015 3.75 3 5.765 3 8.25c0 6 9 12 9 12s9-6 9-12z"
                                            />
                                        </svg>
                                    </button>

                  {/* Cart */}
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-black hover:text-white transition transform translate-y-5 group-hover:translate-y-0">
                    🛒
                  </button>

                </div>
              </div>

              {/* INFO */}
              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-semibold group-hover:text-black transition">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500">
                  {product.category}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-base">
                    ₹ {product.price}
                  </span>

                  <span className="text-gray-400 line-through text-sm">
                    ₹ {product.oldPrice}
                  </span>
                </div>

                {/* Optional Add to cart button */}
                <button className="w-full mt-3 border py-2 text-sm hover:bg-black hover:text-white transition">
                  Add to cart
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
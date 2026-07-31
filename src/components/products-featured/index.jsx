"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ProductItem from "../product-item"; // ✅ your existing component

const getRecentlyViewed = () => {
  return JSON.parse(localStorage.getItem("recentlyViewed")) || [];
};

export default function RecentlyViewed() {
   const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getRecentlyViewed());
  }, []);
  if (!items || items.length < 2) return null;

  return (
    <div className="mt-16 px-4 md:px-8">
      <h2 style={{ textAlign:"center", fontWeight:400}} className="text-2xl md:text-3xl uppercase font-light mb-8">
        Recently Viewed
      </h2>

      {/* ✅ SAME GRID STYLE AS SHOP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            name={item.name}
            sku={item.sku}
            slug={item.slug}
            images={item.images}
            currentPrice={item.currentPrice || 0}
            color={item.color || []}
          />
        ))}
      </div>
    </div>
  );
}
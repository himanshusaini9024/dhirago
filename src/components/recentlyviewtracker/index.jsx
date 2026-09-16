"use client";

import { useEffect } from "react";

const addToRecentlyViewed = (product) => {
  if (!product || !product.id) return;

  let items = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  // remove duplicate
  items = items.filter((item) => item.id !== product.id);

  const mrp = Number(product.mrp ?? product.price) || 0;
  const selling =
    Number(product.currentPrice ?? product.special_price ?? product.price) ||
    0;

  // minimal data (IMPORTANT) — store selling price, not MRP
  const minimalProduct = {
    id: product.id,
    name: product.name,
    images:
      product.images?.slice(0, 2).map((img) => ({
        url: img.url,
      })) || [],
    slug: product.slug,
    sku: product.sku,
    color: product.colors,
    price: mrp,
    mrp,
    special_price: selling,
    discount: Number(product.discount) || 0,
    currentPrice: selling,
  };

  items.unshift(minimalProduct);

  if (items.length > 10) {
    items = items.slice(0, 10);
  }

  localStorage.setItem("recentlyViewed", JSON.stringify(items));
};

export default function RecentlyViewedTracker({ product }) {
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product]);

  return null; // no UI
}

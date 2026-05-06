"use client";

import { useEffect } from "react";

const addToRecentlyViewed = (product) => {
  if (!product || !product.id) return;

  let items = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  // remove duplicate
  items = items.filter((item) => item.id !== product.id);

  // minimal data (IMPORTANT)
  const minimalProduct = {
    id: product.id,
    name: product.name,
    image: product.images?.[0]?.url
      ? `https://res.cloudinary.com/ds48lk80f/${product.images[0].url}`
      : "",
    slug: product.slug,
    color:product.colors,
    currentPrice: product.price,
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
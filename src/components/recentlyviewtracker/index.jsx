"use client";

import { useEffect } from "react";
import { resolveProductPrice } from "../../lib/festiveSale";

const addToRecentlyViewed = (product) => {
  if (!product || !product.id) return;

  let items = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  // remove duplicate
  items = items.filter((item) => item.id !== product.id);

  const { selling, mrp, discount } = resolveProductPrice(product);

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
    discount,
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

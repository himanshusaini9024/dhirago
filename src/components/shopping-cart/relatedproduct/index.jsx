"use client";

import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import ProductItem from "../../../components/product-item";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_RELATED = 8;

async function fetchCategoryProducts(slug) {
  try {
    const res = await fetch(`${API_URL}/api/category/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.category) ? data.category : [];
  } catch (error) {
    console.error("Related products fetch error:", error);
    return [];
  }
}

async function fetchProductCategory(slug) {
  try {
    const res = await fetch(`${API_URL}/api/product/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.category || null;
  } catch {
    return null;
  }
}

function normalizeProduct(item) {
  return {
    id: item.id,
    name: item.name,
    sku: item.sku,
    slug: item.slug,
    images: item.images || item.image || [],
    currentPrice: item.currentPrice ?? item.price ?? 0,
    color: item.color || item.colors || [],
    category: item.category || null,
  };
}

export default function RelatedProduct() {
  const { cartItems } = useSelector((state) => state.cart);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const cartKey = useMemo(
    () =>
      cartItems
        .map((item) => `${item.id}:${item.category || item.slug || ""}`)
        .sort()
        .join("|"),
    [cartItems],
  );

  useEffect(() => {
    if (!cartItems.length) {
      setItems([]);
      return;
    }

    let cancelled = false;
    const cartIds = new Set(cartItems.map((item) => String(item.id)));

    const loadRelated = async () => {
      setLoading(true);

      // Prefer category stored on cart items; resolve missing ones from PDP API
      const categoryCounts = new Map();

      await Promise.all(
        cartItems.map(async (item) => {
          let category = item.category;
          if (!category && item.slug) {
            category = await fetchProductCategory(item.slug);
          }
          if (!category) return;
          const key = String(category).toLowerCase().trim();
          if (!key) return;
          categoryCounts.set(
            key,
            (categoryCounts.get(key) || 0) + (item.quantity || 1),
          );
        }),
      );

      // Most common categories first
      const rankedCategories = [...categoryCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([slug]) => slug);

      if (!rankedCategories.length) {
        if (!cancelled) {
          setItems([]);
          setLoading(false);
        }
        return;
      }

      const results = await Promise.all(
        rankedCategories.slice(0, 3).map(async (slug) => ({
          slug,
          products: await fetchCategoryProducts(slug),
        })),
      );

      const seen = new Set();
      const related = [];

      for (const { slug, products } of results) {
        for (const product of products) {
          const id = String(product.id);
          if (cartIds.has(id) || seen.has(id)) continue;
          seen.add(id);
          related.push(
            normalizeProduct({
              ...product,
              category: product.category || slug,
            }),
          );
          if (related.length >= MAX_RELATED) break;
        }
        if (related.length >= MAX_RELATED) break;
      }

      if (!cancelled) {
        setItems(related);
        setLoading(false);
      }
    };

    loadRelated();

    return () => {
      cancelled = true;
    };
  }, [cartKey, cartItems]);

  if (!cartItems.length) return null;
  if (loading) return null;
  if (!items.length) return null;

  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
      <h2
        style={{ textAlign: "center", fontWeight: 400 }}
        className="text-2xl md:text-3xl uppercase font-light mb-8"
      >
        Related Products
      </h2>

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
            category={item.category || null}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useSelector } from "react-redux";
import { useEffect, useMemo, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItem from "../../../components/product-item";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_RELATED = 12;

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
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
    <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 pb-10 border-t border-gray-100 px-4 md:px-8 lg:px-12">
      <h2
        className={`${josefin.className} text-center text-[13px] sm:text-[15px] uppercase tracking-[0.18em] font-normal text-[#1a1a1a] mb-8 sm:mb-10`}
      >
        You May Also Like
      </h2>

      <div className="relative group/slider">
        <button
          ref={prevRef}
          aria-label="Previous"
          className="hidden sm:flex absolute -left-1 lg:-left-4 top-[38%] -translate-y-1/2 z-10 w-9 h-9 items-center justify-center bg-white border border-black/10 shadow-sm opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hover:bg-black hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          ref={nextRef}
          aria-label="Next"
          className="hidden sm:flex absolute -right-1 lg:-right-4 top-[38%] -translate-y-1/2 z-10 w-9 h-9 items-center justify-center bg-white border border-black/10 shadow-sm opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hover:bg-black hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 12 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          className="!overflow-hidden"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductItem
                id={item.id}
                name={item.name}
                sku={item.sku}
                slug={item.slug}
                images={item.images}
                currentPrice={item.currentPrice || 0}
                color={item.color || []}
                category={item.category || null}
                hideQuickAdd
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
    <div className="mt-16 px-4 md:px-1">
      <h2
        style={{
          textAlign: "center",
          fontWeight: 500,
          letterSpacing: "0.10em",
        }}
        className="text-2xl md:text-3xl uppercase font-light mb-12"
      >
        Recently Viewed
      </h2>

      <Swiper
        slidesPerView={2}
        spaceBetween={12}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
        }}
        className="w-full md:!px-8 px-[0.1em]"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="h-auto md:!mr-[4rem] md:!w-[422px]">
            <div className="w-full">
              <ProductItem
                id={item.id}
                name={item.name}
                sku={item.sku}
                slug={item.slug}
               images={item.images || []}
                currentPrice={item.currentPrice || 0}
                color={item.color || []}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItem from "../product-item";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const getRecentlyViewed = () => {
  return JSON.parse(localStorage.getItem("recentlyViewed")) || [];
};

export default function RecentlyViewed() {
  const [items, setItems] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setItems(getRecentlyViewed());
  }, []);

  if (!items || items.length < 2) return null;

  return (
    <div className="mt-12 sm:mt-16 mb-10 px-4 md:px-8 lg:px-12">
      <h2
        className={`${josefin.className} text-center text-[13px] sm:text-[15px] uppercase tracking-[0.18em] font-normal text-[#1a1a1a] mb-8 sm:mb-10`}
      >
        Recently Viewed
      </h2>

      <div className="relative group/slider">
        {/* Nav arrows */}
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
                hideQuickAdd
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Current Red Linen Shirt",
    price: 5999,
    image: "/images/products/product-1.jpg",
    video: "/videos/bannervideo.mp4",
    tag: "BEST SELLER",
  },
  {
    id: 2,
    name: "Mist Grey Linen Dobby Shirt",
    price: 5999,
    image: "/images/products/product-2.jpg",
    video: "/videos/banner.mp4",
    tag: "BEST SELLER",
  },
  {
    id: 3,
    name: "Blush Pink Linen Structure Shirt",
    price: 5999,
    image: "/images/products/product-3.jpg",
    video: "/videos/bannervideo.mp4",
    tag: "BEST SELLER",
  },
  {
    id: 4,
    name: "Blush Pink Linen Shirt",
    price: 5999,
    image: "/images/products/product-4.jpg",
    video: "/videos/bannervideo.mp4",
    tag: "TRENDING",
  },
  {
    id: 4,
    name: "Blush Pink Linen Shirt",
    price: 5999,
    image: "/images/products/product-5.jpg",
    video: "/videos/bannervideo.mp4",
    tag: "TRENDING",
  },{
    id: 4,
    name: "Blush Pink Linen Shirt",
    price: 5999,
    image: "/images/products/product-6.jpg",
    video: "/videos/bannervideo.mp4",
    tag: "TRENDING",
  },{
    id: 4,
    name: "Blush Pink Linen Shirt",
    price: 5999,
    video: "/videos/bannervideo.mp4",
    image: "/images/products/product-7.jpg",
    tag: "TRENDING",
  }
];

export default function Bestsellers() {
  const containerRef = useRef(null);

  return (
    <section className="py-16">
      {/* ✅ CONTAINER (side spacing like premium sites) */}
      <div className="max-w-[95%] mx-auto">

        {/* Heading */}
        <h2 className="text-xl lg:text-2xl font-light tracking-wide mb-8">
          Bestsellers
        </h2>

        {/* Horizontal Scroll */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[75%] sm:min-w-[45%] lg:min-w-[28%] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div className="group cursor-pointer">
      {/* IMAGE + VIDEO */}
      <div
        className="relative overflow-hidden rounded-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image */}
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={500}
          className="w-full h-[420px] object-cover transition duration-700 group-hover:opacity-0"
        />

        {/* Video */}
        <video
          ref={videoRef}
          src={product.video}
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-700"
        />

        {/* Tag */}
        <span className="absolute top-3 left-3 bg-white/90 text-[10px] tracking-wide px-2 py-1">
          {product.tag}
        </span>
      </div>

      {/* INFO */}
      <div className="mt-4 space-y-1">
        <h3 className="text-[14px] font-light tracking-wide text-gray-900">
          {product.name}
        </h3>

        <p className="text-[13px] text-gray-500 tracking-wide">
          ₹ {product.price}
        </p>
      </div>
    </div>
  );
}
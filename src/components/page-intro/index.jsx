"use client";

import "swiper/css";

import { useEffect, useState } from "react";

const PageIntro = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden text-white">
        {/* VIDEO BACKGROUND */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/banner1.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* TOP CENTER LOGO */}

        {/* BOTTOM CONTENT */}
        <div className="absolute bottom-[4rem]  w-full flex justify-center z-10 text-center px-4">
          <div
            className={`transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Small subtitle */}
            <p className="text-xs tracking-widest uppercase mb-3 opacity-80">
              Men’s Fashion
            </p>
            <h1 className="hidden">Premium Men's Shirts Online in India</h1>
            {/* Main heading */}
            <h2 className="text-2xl text-white md:text-4xl lg:text-5xl font-light tracking-wide ">
              Heritage Revisited
            </h2>
          </div>
        </div>
      </section>

      <section className="hidden max-w-5xl mx-auto py-20">
        <h2>Premium Shirts Designed for Modern Men</h2>

        <p>
          Dhirago is an Indian premium menswear brand creating timeless shirts,
          crafted from breathable cotton fabrics with modern tailoring. Our
          collections include Casual Shirts Formal Shirts Oversized Shirts
          Premium Cotton Shirts Summer Shirts Office Wear Luxury Essentials
        </p>
      </section>
    </>
  );
};

export default PageIntro;

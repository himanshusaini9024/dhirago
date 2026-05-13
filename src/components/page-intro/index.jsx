"use client";

import "swiper/css";

import { useEffect, useState } from "react";

const PageIntro = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
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
      <div className="absolute bottom-10 w-full flex justify-center z-10 text-center px-4">
        <div
          className={`transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Small subtitle */}
          <p className="text-xs tracking-widest uppercase mb-3 opacity-80">
            Men’s Spring Summer 2026
          </p>

          {/* Main heading */}
          <h2 className="text-2xl text-white md:text-4xl lg:text-5xl font-light tracking-wide mb-6">
            Heritage Revisited
          </h2>

          {/* Button */}
          <button className="border border-white px-6 py-2 text-sm tracking-wide hover:bg-white hover:text-black transition duration-300">
            Discover
          </button>
        </div>
      </div>

    </section>
  );
};

export default PageIntro;
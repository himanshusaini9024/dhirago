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
      {/*
        Desktop: full-viewport cinematic hero (landscape crop).
        Mobile: portrait video block (like Dior) — not full screen —
        so the next section can sit below; text centered on the video.
      */}
      <section
        className="
          relative w-full overflow-hidden text-white
          aspect-[3/4] max-h-[85svh]
          md:aspect-auto md:h-screen md:max-h-none
        "
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="
            absolute inset-0 h-full w-full object-cover
            object-[center_25%]
            md:object-center
          "
        >
          <source
            src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/Home/video-1-1.mp4"
            type="video/mp4"
          />
        </video>

        {/* Soft overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent md:bg-none" />
        <div className="absolute inset-0 hidden bg-black/30 md:block" />

        {/* Centered copy on the video (Dior-style mobile) */}
       
      </section>

      <section className="mx-auto hidden max-w-5xl py-20">
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

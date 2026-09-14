"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const v = process.env.NEXT_PUBLIC_IMAGE_VERSION || "";
const POSTER = `https://images.dhirago.com/ecommerce/banner/dsc06401.webp?${v}`;
const VIDEO = `https://images.dhirago.com/ecommerce/Home/homefooter.mp4?${v}`;

export default function ProductsFeatured() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full overflow-hidden text-white
        aspect-[3/4] md:aspect-[16/9]
        mt-12 lg:mt-16 md:mt-0 md:px-10 md:pt-10
      "
      aria-label="Home editorial video"
    >
      <div className="relative h-full w-full overflow-hidden md:rounded-sm bg-neutral-200">
        <Image
          src={POSTER}
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover object-center md:grayscale"
        />

        {shouldLoad && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={POSTER}
            className="absolute inset-0 h-full w-full object-cover object-center md:grayscale"
          >
            <source src={VIDEO} type="video/mp4" />
          </video>
        )}
      </div>
    </section>
  );
}

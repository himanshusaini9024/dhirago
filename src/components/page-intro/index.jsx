"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const POSTER = `https://images.dhirago.com/ecommerce/banner/dsc06401.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION || ""}`;
const VIDEO = `https://images.dhirago.com/ecommerce/Home/video-1-1.mp4?${process.env.NEXT_PUBLIC_IMAGE_VERSION || ""}`;

const PageIntro = () => {
  const videoRef = useRef(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    // Don't start the large MP4 until the browser is idle / after first paint.
    // Mobile LCP should be the poster image, not a 25MB video download.
    let cancelled = false;
    const start = () => {
      if (!cancelled) setLoadVideo(true);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }

    const t = setTimeout(start, 1800);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!loadVideo || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [loadVideo]);

  return (
    <section
      className="
          relative w-full overflow-hidden text-white
          aspect-[3/4] md:aspect-[16/9]
        "
      aria-label="Home intro"
    >
      <Image
        src={POSTER}
        alt="Dhirago"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
        quality={75}
      />

      {loadVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={POSTER}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={VIDEO} type="video/mp4" />
        </video>
      )}
    </section>
  );
};

export default PageIntro;

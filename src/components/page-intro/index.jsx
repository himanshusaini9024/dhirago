"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Dedicated hero poster — keep OG share image (dhirago-og.webp) separate for social cards.
// Cache-bust query is for browsers only; sitemap/schema use the clean CDN URL.
const POSTER = `https://images.dhirago.com/ecommerce/dhirago-og.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION || ""}`;
const MOBPOSTER = `https://images.dhirago.com/ecommerce/dhirago-og-512x640.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION || ""}`;
const VIDEO = `https://images.dhirago.com/ecommerce/Home/video-1-1.mp4?${process.env.NEXT_PUBLIC_IMAGE_VERSION || ""}`;
const VIDEO_INDEX_URL = "https://images.dhirago.com/ecommerce/Home/video-1-1.mp4";

const MD_UP = "(min-width: 768px)";

const PageIntro = () => {
  const videoRef = useRef(null);
  const [loadVideo, setLoadVideo] = useState(false);
  // Desktop uses POSTER; mobile uses MOBPOSTER (matches md:aspect swap).
  const [posterSrc, setPosterSrc] = useState(MOBPOSTER);

  useEffect(() => {
    const mq = window.matchMedia(MD_UP);
    const sync = () => setPosterSrc(mq.matches ? POSTER : MOBPOSTER);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

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
      {/* CSS swap: mobile MOBPOSTER / desktop POSTER (only mobile gets priority preload) */}
      <Image
        src={MOBPOSTER}
        alt="Dhirago"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center md:hidden"
        quality={75}
      />
      <Image
        src={POSTER}
        alt="Dhirago"
        fill
        sizes="100vw"
        className="object-cover object-center hidden md:block"
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
          poster={posterSrc}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={VIDEO} type="video/mp4" />
        </video>
      )}

      {/* Crawlable markup: hero video is JS-deferred for LCP, so expose a stable URL for indexers. */}
      <noscript>
        <video
          muted
          playsInline
          poster={POSTER}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={VIDEO_INDEX_URL} type="video/mp4" />
        </video>
      </noscript>
    </section>
  );
};

export default PageIntro;

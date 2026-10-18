"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cdn, serif } from "./theme";

const POSTER = cdn("dhirago-og.webp");
const VIDEO = cdn("Home/hometop.mp4");

const fade = (delay) => ({
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function CinematicHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [loadVideo, setLoadVideo] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const start = () => setLoadVideo(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback?.(id);
    }
    const t = setTimeout(start, 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loadVideo) videoRef.current?.play().catch(() => {});
  }, [loadVideo]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[78svh] min-h-[480px] w-full overflow-hidden bg-[#1d1a15] md:h-[88vh] md:max-h-[860px]"
      aria-label="Dhirago — The First Story"
    >
      <motion.div style={{ y: mediaY }} className="absolute inset-0 -top-[4%] h-[112%]">
        <Image src={POSTER} alt="Dhirago — The First Story" fill priority sizes="100vw" quality={80} className="object-cover" />
        {loadVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={POSTER}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={VIDEO} type="video/mp4" />
          </video>
        )}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.45)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />

      {/* <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="absolute inset-x-0 bottom-[16%] z-10 flex items-center justify-center gap-4 px-4 text-[#f3e6c8] md:bottom-[22%] md:gap-12"
      >
        <motion.span {...fade(0.5)} className={`${serif.className} text-[18px] italic font-light md:text-[30px]`}>
          the
        </motion.span>
        <motion.h2
          {...fade(0.2)}
          className={`${serif.className} text-center text-[40px] font-light uppercase leading-none tracking-[0.04em] text-[#f3e6c8] md:text-[88px]`}
        >
          First Story
        </motion.h2>
        <motion.span {...fade(0.7)} className={`${serif.className} text-[18px] italic font-light md:text-[30px]`}>
          2026
        </motion.span>
      </motion.div> */}
    </section>
  );
}

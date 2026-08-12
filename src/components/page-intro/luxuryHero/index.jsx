"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cormorant_Garamond,
  Josefin_Sans,
  Great_Vibes,
} from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

function PostageStamp() {
  return (
    <div
      className="relative select-none"
      style={{
        width: 72,
        height: 86,
        background: "#E8F0E6",
        clipPath:
          "polygon(6% 0%, 14% 3%, 22% 0%, 30% 3%, 38% 0%, 46% 3%, 54% 0%, 62% 3%, 70% 0%, 78% 3%, 86% 0%, 94% 3%, 100% 0%, 100% 6%, 97% 14%, 100% 22%, 97% 30%, 100% 38%, 97% 46%, 100% 54%, 97% 62%, 100% 70%, 97% 78%, 100% 86%, 97% 94%, 100% 100%, 94% 97%, 86% 100%, 78% 97%, 70% 100%, 62% 97%, 54% 100%, 46% 97%, 38% 100%, 30% 97%, 22% 100%, 14% 97%, 6% 100%, 0% 97%, 0% 94%, 3% 86%, 0% 78%, 3% 70%, 0% 62%, 3% 54%, 0% 46%, 3% 38%, 0% 30%, 3% 22%, 0% 14%, 3% 6%, 0% 0%)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      }}
      aria-hidden
    >
      <div className="flex h-full flex-col items-center justify-center px-1.5 pt-1 pb-2">
        <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
          <ellipse cx="20" cy="28" rx="10" ry="4" fill="#C5D4B8" opacity="0.55" />
          <path
            d="M20 28 C18 20 12 16 10 10 C14 12 17 16 20 22 C23 16 26 12 30 10 C28 16 22 20 20 28Z"
            fill="#7A9B6D"
          />
          <circle cx="12" cy="11" r="4.2" fill="#E8A0B0" />
          <circle cx="11" cy="10" r="1.4" fill="#F5C4CE" />
          <circle cx="20" cy="8" r="4.5" fill="#F0B429" />
          <circle cx="20" cy="7.5" r="1.5" fill="#F7D56A" />
          <circle cx="28" cy="12" r="3.8" fill="#E891A4" />
          <circle cx="27.5" cy="11" r="1.2" fill="#F5C4CE" />
          <circle cx="16" cy="15" r="2.4" fill="#F2C14E" />
        </svg>
        <span
          className={`${cormorant.className} mt-0.5 text-[13px] font-medium tracking-[0.12em]`}
          style={{ color: "#C4A882" }}
        >
          SS26
        </span>
      </div>
    </div>
  );
}

function ExploreArrow() {
  return (
    <svg
      width="36"
      height="14"
      viewBox="0 0 36 14"
      fill="none"
      className="ml-1.5 inline-block translate-y-[1px]"
      aria-hidden
    >
      <path
        d="M1 8 C6 2, 10 12, 15 7 C19 3, 22 11, 27 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 4 L31 7 L24 11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function LuxurySection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#FCFAF8" }}
    >
      {/* Postage stamp — top right */}
      {/* <motion.div
        initial={{ opacity: 0, y: -8, rotate: -4 }}
        whileInView={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="absolute right-[clamp(1.25rem,4vw,3.5rem)] top-[clamp(1.25rem,3vw,2.5rem)] z-10"
      >
        <PostageStamp />
      </motion.div> */}

      {/* Left-aligned editorial copy */}
      <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-[clamp(1rem,6vw,2rem)] lg:py-[clamp(3.5rem,9vw,7rem)] py-[clamp(2.5rem,1vw,1rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-[640px] text-left"
        >
          <h2
            className={`${josefin.className} uppercase leading-[1.90] text-[clamp(11px,1.3vw,1.01rem)]  text-[#333333] tracking-[0.01em] lg:mb-6 `}

            // className={`${josefin.className} text-[0.910rem] md:text-[clamp(1.25rem,3.4vw,1.15rem)] font-medium leading-[1.25] tracking-[-0.01em]`}
            // style={{ color: "#2D2D2D" }}
          >
            Immerse yourself in the slow way of life with Dhirago.
          </h2>

          <p
            className={`font-futura lg:mt-6 mt-3 md:w-[1200px] text-[clamp(0.7rem,1.35vw,1.07rem)] font-normal leading-[2.45]`}
            style={{ color: "#555555" }}
          >
            DHIRAGO is a luxury Indian menswear label rooted in traditional textiles and enduring craft. Shaped through natural fabrics, distinctive embroidery and block print technique. Each garment is made with patience, refined through many hands and celebrated for comfort and thoughtful details.DHIRAGO was born from this way of seeing the world. More than menswear, it is an invitation to embrace simplicity, value craftsmanship, and find meaning in the details.
          </p>

          
            <div className="lg:mt-9 mt-3 flex gap-3">
              {/* Filled primary button */}
              <Link
                href="/about"
                className="border border-[#14171A] px-8 py-3.5 text-[11px] font-semibold uppercase  text-[#14171A] transition-colors hover:border-[#14171A] hover:bg-black hover:text-white transition"
              >
                More to explore
              </Link>
              {/* Outlined secondary button */}
            </div>
        </motion.div>
      </div>
    </section>
  );
}

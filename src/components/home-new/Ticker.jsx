"use client";

import { motion } from "framer-motion";
import { label } from "./theme";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function Ticker({ items = [] }) {
  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[#3d342a]/15 py-2.5" aria-hidden>
      <motion.div
        className="flex w-max gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {[...row, ...row].map((text, i) => (
          <span key={i} className={`${josefin.className} uppercase text-[12px] tracking-[0.12em] text-[#1a1a1a]`}>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

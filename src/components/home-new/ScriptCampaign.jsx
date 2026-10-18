"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { script, serif } from "./theme";

export default function ScriptCampaign({ src, alt, href, pre = "the", title, sub, position = "object-center" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <Link href={href} className="relative block aspect-[4/5] md:aspect-[16/8]">
        <motion.div style={{ y }}   whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10px" }} className="absolute inset-0 -top-[10%] h-[120%]">
          <Image src={src} alt={alt} fill sizes="100vw" quality={78} className={`object-cover ${position}`} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-[12%] flex flex-col items-center text-[#f3e6c8] md:bottom-[18%] md:items-end md:pr-[12%]"
        >
          <p className="leading-none">
            <span className={`${serif.className} mr-2 align-top text-[22px] italic md:text-[30px]`}>{pre}</span>
            <span className={`${script.className} text-[72px] leading-[0.9] md:text-[120px]`}>{title}</span>
          </p>
          {sub && (
            <p className={`${serif.className} mt-3 text-[11px] uppercase tracking-[0.32em] text-[#f3e6c8]/90 md:text-[13px]`}>
              {sub}
            </p>
          )}
        </motion.div>
      </Link>
    </section>
  );
}

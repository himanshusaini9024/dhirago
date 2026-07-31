"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

const BASE = process.env.NEXT_PUBLIC_IMG_URL;

export default function FinalBossUI({ product, show }) {
  if (!show) return null;

  const images = product?.images || [];
  const description = product?.description || "<p>No description available</p>";

  // 🎯 Dynamic Sections
  const DATA = [
    {
      title: "DESCRIPTION",
      content: description,
      image: images[0]?.url,
    },
    {
      title: "PREMIUM FABRICS",
      content: "<p>Crafted with high-end materials for durability and comfort.</p>",
      image: images[1]?.url || images[0]?.url,
    },
    {
      title: "SHIPPING AVAILABLE",
      content: "<p>Fast and secure delivery across the globe.</p>",
      image: images[2]?.url || images[0]?.url,
    },
    {
      title: "PERFECT FIT",
      content: "<p>Designed to match your body and style.</p>",
      image: images[3]?.url || images[0]?.url,
    },
  ];

  // ✅ MULTI OPEN ACCORDION
  const [active, setActive] = useState([0]);
  const refs = useRef([]);

  // 🧠 Scroll Sync (for right image only)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = refs.current.indexOf(e.target);
          if (e.isIntersecting && i !== -1) {
            // Only update image focus, not accordion state
            setLastVisible(i);
          }
        });
      },
      { threshold: 0.6 }
    );

    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // 👇 Separate state for image (IMPORTANT FIX)
  const [lastVisible, setLastVisible] = useState(0);

  // 🎥 Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <section
      className="w-full bg-black text-white relative overflow-hidden"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      {/* ✨ Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px at ${mouseX.get()}px ${mouseY.get()}px, rgba(255,255,255,0.08), transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-6 md:px-12 py-20">

        {/* 🔥 LEFT CONTENT */}
        <div className="flex flex-col gap-16">
          {DATA.map((item, i) => {
            const isActive = active.includes(i);

            return (
              <div key={i} ref={(el) => (refs.current[i] = el)}>

                {/* HEADER */}
                <motion.button
                  whileHover={{ x: 6 }}
                  onClick={() => {
                    setActive((prev) =>
                      prev.includes(i)
                        ? prev.filter((x) => x !== i)
                        : [...prev, i]
                    );

                    refs.current[i]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className="w-full flex justify-between items-center"
                >
                  <h3
                    className={`tracking-[0.22em] text-sm transition ${
                      isActive ? "text-white" : "text-white/40"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* ➕ Icon */}
                  <motion.div animate={{ rotate: isActive ? 45 : 0 }}>
                    <div className="relative w-4 h-4">
                      <span className="absolute w-full h-[1px] bg-white top-1/2" />
                      <span className="absolute h-full w-[1px] bg-white left-1/2" />
                    </div>
                  </motion.div>
                </motion.button>

                {/* CONTENT */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-4 !text-white/60 max-w-md text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* 🖼 RIGHT IMAGE */}
        <div className="relative hidden lg:block">
          <div className="sticky top-24 h-[620px] overflow-hidden rounded-2xl">

            <AnimatePresence mode="wait">
              <motion.img
                key={lastVisible}
                src={
                  DATA[lastVisible].image
                    ? BASE + DATA[lastVisible].image
                    : "/placeholder.jpg"
                }
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* 📱 MOBILE */}
      <div className="lg:hidden px-4 pb-12">
        <div className="flex overflow-x-auto snap-x gap-4">
          {DATA.map((item, i) => (
            <div key={i} className="min-w-full snap-center">
              <img
                src={item.image ? BASE + item.image : "/placeholder.jpg"}
                className="w-full h-[420px] object-cover rounded-xl"
              />
              <h3 className="mt-4 text-sm tracking-widest">
                {item.title}
              </h3>
              <div
                className="text-white/60 mt-2 text-sm"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
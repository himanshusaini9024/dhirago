"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = "https://res.cloudinary.com/ds48lk80f/";

export default function UltraPremiumGallery({ images }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState({});
const [rotate, setRotate] = useState({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const midX = rect.width / 2;
  const midY = rect.height / 2;

  const rotateY = ((x - midX) / midX) * 10;
  const rotateX = -((y - midY) / midY) * 10;

  setRotate({ x: rotateX, y: rotateY });
};

const resetRotate = () => {
  setRotate({ x: 0, y: 0 });
};
  const imgRefs = useRef([]);
  const containerRef = useRef(null);

  // Lazy load
  useEffect(() => {
    imgRefs.current.forEach((img) => {
      if (img) img.loading = "lazy";
    });
  }, [images]);

  // Intersection Observer (sync scroll)
  useEffect(() => {
    if (!imgRefs.current.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imgRefs.current.findIndex(
              (img) => img === entry.target,
            );
            if (index !== -1 && index !== active) {
              setDirection(index > active ? 1 : -1);
              setActive(index);
            }
          }
        });
      },
      { threshold: 0.7 },
    );

    imgRefs.current.forEach((img) => img && observer.observe(img));

    return () => {
      imgRefs.current.forEach((img) => img && observer.unobserve(img));
    };
  }, [images, active]);

  const snapTo = (index) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);

    imgRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const next = () => snapTo((active + 1) % images.length);
  const prev = () => snapTo((active - 1 + images.length) % images.length);

  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT: DRAG + SCROLL GALLERY */}
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          dragTransition={{
            bounceStiffness: 80,
            bounceDamping: 20,
          }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -80) next();
            if (info.offset.x > 80) prev();
          }}
          className="
            flex flex-nowrap lg:block
            gap-4 lg:gap-2

            overflow-x-auto lg:overflow-y-auto
            h-auto lg:h-[85vh]

            snap-x lg:snap-y snap-mandatory
            scroll-smooth
            no-scrollbar

            px-1 lg:px-0
            cursor-grab active:cursor-grabbing
          "
        >
          {images.map((img, i) => {
            const isActive = i === active;

            return (
              <motion.div
                key={i}
                onClick={() => snapTo(i)}
                className="
                  relative overflow-hidden
                  snap-center lg:snap-start
                  min-w-full lg:min-w-full
                  rounded-xm
                "
                animate={{
                  scale: isActive ? 1 : 0.96,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.img
                  ref={(el) => (imgRefs.current[i] = el)}
                  src={img?.url ? BASE + img.url : "/placeholder.jpg"}
                  alt={img?.alt || "image"}
                  onLoad={() => setLoaded((prev) => ({ ...prev, [i]: true }))}
                  className={`
                    w-full
                    h-[28rem] sm:h-[340px] md:h-[420px] lg:h-[650px]
                    object-cover
                    transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
                   
                  `}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* ACTIVE RING */}
                {isActive && (
                  <motion.div
                    layoutId="activeRing"
                    className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* RIGHT: PREMIUM PREVIEW */}
        <div className="hidden lg:block sticky top-20 h-fit">
          <AnimatePresence mode="wait">
           <motion.div
  key={active}
  initial={{
    opacity: 0,
    scale: 0.9,
    rotateX: 15,
    rotateY: direction === 1 ? -20 : 20,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
  }}
  exit={{
    opacity: 0,
    scale: 0.85,
    rotateX: -10,
    rotateY: direction === 1 ? 25 : -25,
  }}
  transition={{
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1],
  }}
  style={{ perspective: 1400 }}
  className="relative"
>
            <motion.img
  src={BASE + images[active].url}
  onClick={() => setIsOpen(true)}
  onMouseMove={handleMouseMove}
  onMouseLeave={resetRotate}
  className="
    w-full
    h-[600px] xl:h-[750px]
    object-cover
    rounded-xl
    shadow-2xl
    cursor-pointer
    will-change-transform
  "
  animate={{
    rotateX: rotate.x,
    rotateY: rotate.y,
    scale: 1.03,
  }}
  transition={{
    type: "spring",
    stiffness: 120,
    damping: 15,
    mass: 0.5,
  }}
/>
<motion.div
  style={{
    background: `
      radial-gradient(
        circle at ${50 + rotate.y * 2}% ${50 - rotate.x * 2}%,
        rgba(255,255,255,0.25),
        transparent 60%
      )
    `,
  }}
  className="
    absolute inset-0
    rounded-xl
    pointer-events-none
    mix-blend-overlay
  "
/>
<motion.div
  initial={{ x: "-100%" }}
  animate={{ x: "120%" }}
  transition={{
    duration: 1.5,
    ease: "easeInOut",
  }}
  className="
    absolute top-0 left-0
    w-[40%] h-full
    bg-gradient-to-r from-transparent via-white/20 to-transparent
    blur-2xl
    opacity-30
    pointer-events-none
  "
/>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* FULLSCREEN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-white text-2xl"
            >
              ✕
            </button>

            <button
              onClick={prev}
              className="absolute left-4 text-white text-3xl"
            >
              ‹
            </button>

            <motion.img
              key={active}
              src={BASE + images[active].url}
              className="max-h-[80vh] rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            />

            <button
              onClick={next}
              className="absolute right-4 text-white text-3xl"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

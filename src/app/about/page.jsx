"use client";

import { motion } from "framer-motion";
import Image from "next/image";
export default function AboutPage() {
  return (
    <div className=" text-[#1a1a1a]">

      {/* 🔥 HERO SECTION */}
      <section className="relative h-[30vh] w-full overflow-hidden">
        <Image
          src="/images/subscribe.jpg"
          alt="About Hero"
          fill
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <p className="tracking-[0.4em] text-xs mb-3 opacity-80">
            DHIRAGO
          </p>
          <h1 className="text-4xl md:text-6xl text-white font-serif">
            Our Story
          </h1>
        </div>
      </section>

      {/* 🔥 WELCOME SECTION */}
      <section className="max-w-4xl mx-auto text-center px-4 py-8">
        <h2 className="text-3xl md:text-4xl font-serif mb-6">
          Welcome
        </h2>

        <p className="text-xs md:text-base text-black leading-relaxed">
          Welcome to Dhirago, where timeless elegance meets masterful craftsmanship.
          Since our founding in 2026, we have dedicated ourselves to perfecting
          the art of bespoke tailoring for the discerning gentleman. Our passion
          lies in creating garments that not only fit you well, but also reflect
          your unique style and personality.
        </p>
      </section>

      {/* 🔥 FABRIC SECTION */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6 ">
        
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
              src="/images/subscribe.jpg"
            alt="Fabric"
            className="w-full h-[350px] object-cover"
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Premium Fabrics
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            At Dhirago, we source premium international fabrics from the world's
            best mills to handcraft each piece with precision and care. Our design
            philosophy embraces elegance in simplicity, blending traditional Indian
            craftsmanship with contemporary minimalism.
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            When you choose to visit Dhirago, our expert team of stylists work
            closely with you to understand your preferences and vision, delivering
            a perfect fit and flawless finish.
          </p>
        </motion.div>
      </section>

      {/* 🔥 STORY SECTION */}
      <section className="max-w-5xl mx-auto text-center px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-serif mb-6">
          Our Story
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          At Dhirago, fabric isn't just what we work with—it's woven into the very
          fabric of our family heritage. Founded by Sanjeev Mehra and now proudly
          carried forward by his sons, our journey spans over seven generations and
          more than 100 years of expertise in the fabric and textile trade.
        </p>

        <p className="text-sm text-gray-600 leading-relaxed">
          Our legacy began long before today's trends—understanding premium fabrics
          is in our DNA. Operating out of our original store, we quickly earned a
          reputation for exceptional quality among both retail and wholesale customers.
        </p>
      </section>

      {/* 🔥 EVOLUTION (OPTIONAL SECTION LIKE IMAGE BOTTOM) */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6 pb-20">
        
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Evolution
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed">
            From a legacy of fabrics to a modern luxury brand, Dhirago continues
            to evolve with time while preserving its heritage roots. Every piece
            reflects a journey of craftsmanship, precision, and timeless style.
          </p>
        </div>

        <img
            src="/images/subscribe.jpg"
          alt="Evolution"
          className="w-full h-[350px] object-cover"
        />
      </section>
    </div>
  );
}
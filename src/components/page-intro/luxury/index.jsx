"use client";

import Image from "next/image";
import { playfair } from "../../../app/font";

export default function Luxurypage() {
  return (
    <div className="relative min-h-screen">
      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* BOX 1 */}
        <div className="relative h-[50vh] lg:h-screen">
          <Image
        src="/images/portrait.jpg"

            alt="fabric"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-10 text-white">
            <h2 className={`${playfair.className} text-2xl md:text-4xl`}>
              Craftsmanship
            </h2>
            <p className="text-sm md:text-base mt-2">
              Attention to detail and skilled workmanship.
            </p>
          </div>
        </div>

        {/* BOX 2 */}
        <div className="bg-[#efefef] flex items-center h-[50vh] lg:h-screen">
          <div className="p-6 md:p-16 max-w-lg">
            <p className="text-xs tracking-widest text-gray-500 mb-3">
              WORKING WITH INTERNATIONAL BRANDS
            </p>

            <h1 className={`${playfair.className} text-3xl md:text-5xl mb-4`}>
              Fabrics
            </h1>

            <p className="text-gray-600">
              All our garments are made from the highest quality of fabric...
            </p>
          </div>
        </div>

        {/* BOX 3 */}
        <div className="relative h-[50vh] lg:h-screen">
          <Image
            src="/images/portrait.jpg"
            alt="suit"
            fill
            className="object-cover"
          />
        </div>

        {/* BOX 4 */}
        <div className="bg-white flex items-center h-[50vh] lg:h-screen">
          <div className="p-6 md:p-16 max-w-lg">
            <p className="text-xs tracking-widest text-gray-500 mb-3">
              ABOUT US
            </p>

            <h2 className={`${playfair.className} text-3xl md:text-5xl mb-4`}>
              Our Story
            </h2>

            <p className="text-gray-600">
              Welcome to Brahaan, where timeless elegance meets craftsmanship...
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 CENTER FLOATING SECTION */}
      <div className="hidden lg:flex absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
        <div>
          <h2 className={`${playfair.className} text-5xl text-gray-200`}>
            Tailored for You
          </h2>
          <p className="text-gray-300 mt-2">
            Custom-made to fit your unique needs.
          </p>

          <button className="mt-6 border border-gray-300 text-white-300 px-6 py-2 text-xs tracking-widest">
            BOOK AN APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
}

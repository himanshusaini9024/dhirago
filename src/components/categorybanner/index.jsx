"use client";

import Image from "next/image";

const Categorybaner = ({ catbanner, title = "", subtitle = "" }) => {
  let banner = "";

  try {
    const parsed = JSON.parse(catbanner || "[]");
    banner = Array.isArray(parsed) ? parsed[0] : parsed;
  } catch (e) {
    console.error("Invalid banner JSON", e);
  }

  // fallback image
  if (!banner) {
    banner = "/images/fallback-banner.jpg";
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* Banner Height Responsive */}
      <div className="relative h-[50px] sm:h-[240px] md:h-[320px] lg:h-[420px] xl:h-[150px]">
        
        {/* Background Image */}
        <Image
          src={banner}
          alt="Category Banner"
          fill
          priority
          className="object-cover object-center scale-[1.02]"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

        {/* Soft Bottom Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            
            <div className="max-w-[650px]">
              
              {/* Small Label */}
              {subtitle && (
                <p
                  className="
                    font-futura
                    uppercase
                    tracking-[0.35em]
                    text-[9px]
                    sm:text-[10px]
                    md:text-[11px]
                    text-[#D4B896]
                    mb-3
                    sm:mb-4
                  "
                >
                  {subtitle}
                </p>
              )}

              {/* Heading */}
              {title && (
                <h1
                  className="
                    font-josefin
                    uppercase
                    font-[300]
                    leading-[1.05]
                    tracking-[0.08em]
                    text-white
                    text-[1.8rem]
                    sm:text-[2.4rem]
                    md:text-[3.4rem]
                    lg:text-[4.5rem]
                    xl:text-[5.5rem]
                  "
                >
                  {title}
                </h1>
              )}

              {/* Decorative Line */}
              <div className="w-[60px] sm:w-[80px] h-[1px] bg-[#D4B896] mt-5 sm:mt-7" />
            </div>
          </div>
        </div>

        {/* Luxury Grain Overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-soft-light pointer-events-none"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
          }}
        />
      </div>
    </section>
  );
};

export default Categorybaner;
"use client";
import Image from "next/image";
const PageIntro = () => {
  return (
    <section
    className="
          relative w-full overflow-hidden text-white
          aspect-[3/4] md:aspect-[16/9]
        "
      aria-label="Home intro"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={`https://images.dhirago.com/ecommerce/banner/dsc06401.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source
          src={`https://images.dhirago.com/ecommerce/Home/video-1-1.mp4?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}
          type="video/mp4"
        />
      </video>
    </section>
  );
};

export default PageIntro;

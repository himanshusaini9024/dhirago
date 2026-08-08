"use client";
import Image from "next/image";
const PageIntro = () => {
  return (
    <section
      className="
        relative w-full overflow-hidden bg-[#111]
        h-[calc(100svh-92px)]
        lg:h-[calc(100svh-128px)]
        min-h-[420px]
      "
      aria-label="Home intro"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source
          src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/Home/video-1-1.mp4"
          type="video/mp4"
        />
      </video>
      {/* <Image
                src="https://11-11.in/cdn/shop/files/DROP_1_COMPUTER_396055b0-2726-4be2-b167-e9e8ebe40ca1.webp?v=1785920008&width=1800"
                alt="A young man wearing a handwoven muslin shirt by a lakeside"
              fill
                priority
                sizes="100vw"
                className="object-cover transition-all duration-700"
                unoptimized
              /> */}
    </section>
  );
};

export default PageIntro;

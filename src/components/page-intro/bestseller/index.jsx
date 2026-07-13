import Image from "next/image";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Hero() {
  return (
    <section className={` ${josefin.className}`}>
      <div className="relative grid md:grid-cols-2">
        {/* Image */}
        <div className="group relative w-full overflow-hidden bg-black/5">
          <Image
            src="/images/hero-mul-story.jpeg"
            alt="A young man in a handwoven muslin shirt, feeding pigeons by a lakeside at dusk"
            width={1200}
            height={1500}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-auto w-full grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
          />
        </div>

     

        {/* Copy */}
        <div className="flex items-center px-6 py-14 md:px-16 lg:px-28 ">
          <div className="max-w-md">
            <p className={`${josefin.className} mb-6  `}
              style={{
                fontSize: "clamp(0.725rem, 1.6vw, 1.112rem)",
                color: "#333333",
                letterSpacing: "0.02em",
              }}>
              The Mul Story: Woven Like Air
            </p>

            <p className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]" >
              The First Story introduces our collection of menswear, beginning in Udaipur—a city where craftsmanship is not preserved as history, but lived as tradition. Among its tranquil lakes, weathered stone, quiet courtyards, and enduring craft, we found a way of seeing that continues to shape Dhirago.
            </p>

            <p className="font-futura mt-5 font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
              At Dhirago  our 200-count{" "}
              <a href="#" className="underline decoration-[#9C8055] underline-offset-4">
                handspun
              </a>{" "}
              mul begins with this memory.
            </p>

            <p className="font-futura mt-6 font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
              Not as nostalgia, but as continuation.
            </p>

            <div className="mt-9 flex gap-3">
              {/* Filled primary button */}
              <a
                href="/collections/shirts"
                className="border border-[#14171A]/30 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#14171A] transition-colors hover:border-[#14171A]"
              >
                Shop Now
              </a>
              {/* Outlined secondary button */}
              <a
                href="/our-story"
                className="border border-[#14171A]/30 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#14171A] transition-colors hover:border-[#14171A]"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
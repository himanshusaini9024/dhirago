import Image from "next/image";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Hero() {
  return (
    <section className={`${josefin.className} mt-10 lg:mt-28 px-4 sm:px-6 md:px-0`}>
      <h3
        className={`${josefin.className} text-center uppercase leading-[1.7] md:leading-[1.9] text-[clamp(11px,1.3vw,1.07rem)] text-[#333333] tracking-[0.03em] mb-4 px-2`}
      >
        EMBROIDERED THROUGH <br className="hidden sm:block" />HANDS AND TIME
      </h3>

      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_0.777fr_0.777fr] gap-6 md:gap-8  sm:py-10 md:py-20 px-0 md:px-14">
        {/* Text content */}
        <div className="order-1 flex items-center px-1 sm:px-4 py-2 md:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto md:mx-0">
            <p
              style={{ color: "#555555" }}
              className={`font-normal text-justify text-[clamp(0.8rem,1.35vw,1.07rem)] leading-[1.75] md:leading-[2.10] font-futura`}
            >
              we works with indigenous textile techniques and natural fabrics, thoughtfully integrating time-honoured crafts such as and Kantha embroidery and Tangaliya inspired weaving, Sashiko inspired into its garments creating quiet details and distinctive pattern.
            </p>

            <p
              style={{ color: "#555555" }}
              className={`font-normal mt-3 text-justify text-[clamp(0.8rem,1.35vw,1.05rem)] leading-[1.75] md:leading-[2.10] font-futura`}
            >
              Every stitch is considered, every detail given time. Meticulously worked by hand, each piece celebrates the beauty of things made slowly — garments designed not only to endure, but to grow richer in character and more beautiful with time.
            </p>

            <div className="mt-6 md:mt-9 flex justify-center md:justify-start gap-3">
              
               <a href="/embroidery"
                className="border border-[#14171A] px-6 sm:px-8 py-3 sm:py-3.5 text-[10px] sm:text-[11px] font-semibold uppercase text-[#14171A] transition-colors hover:bg-[#14171A] hover:text-white"
              >
                Our embroidery
              </a>
            </div>
          </div>
        </div>

        {/* Images wrapper: side-by-side on mobile, becomes two independent grid items on desktop */}
        <div className="order-2 grid grid-cols-2 gap-3 sm:gap-4 md:contents">
          {/* Image 1 */}
          <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-full min-h-[200px] sm:min-h-[280px] md:min-h-[600px] lg:min-h-[680px] overflow-hidden bg-black/5 md:order-2">
            <Image
            src={`https://images.dhirago.com/ecommerce/Home/wi2.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}
              
              alt="A young man wearing a handwoven muslin shirt by a lakeside"
              fill
              priority
              sizes="(min-width: 768px) 32vw, 50vw"
              unoptimized
              className="object-cover"
              quality={85}

            />
          </div>

          {/* Image 2 */}
          <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-full min-h-[200px] sm:min-h-[280px] md:min-h-[600px] lg:min-h-[680px] overflow-hidden bg-black/5 md:order-3">
            <Image
            src={`https://images.dhirago.com/ecommerce/Home/wi.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}

              alt="A young man wearing a handwoven muslin shirt, alternate view"
              fill
              sizes="(min-width: 768px) 32vw, 50vw"
              unoptimized
              className="object-cover"
              quality={85}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
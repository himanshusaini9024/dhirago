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
        <div className="relative aspect-[3/5] w-full overflow-hidden bg-black/5">
          <Image
            src={`https://images.dhirago.com/ecommerce/Home/dsc06295.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}
            alt="A young man wearing a handwoven muslin shirt by a lakeside"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-all duration-700"
            quality={75}
          />
          {/* <img
            src="https://images.dhirago.com/ecommerce/Home/dsc06295.jpg"
            className="object-cover transition-all duration-700"
            alt="A young man wearing a handwoven muslin shirt by a lakeside"
            
          /> */}
        </div>

        {/* Copy */}
        <div className="flex items-center px-6 lg:py-16 py-8 md:px-16 lg:px-28 ">
          <div className="max-w-2xl">
            <p
           className={`${josefin.className} uppercase lg:leading-[1.90] text-[clamp(11px,1.3vw,1.01rem)]  text-[#333333] tracking-[0.01em] lg:mb-6 mb-4`}

            >
              The first story; woven with patience
            </p>

            <p
              style={{ color: "#555555" }}
              className={`font-normal lg:text-justify  text-[clamp(0.7rem,1.35vw,1.05rem)] leading-[2.10] font-futura`}
            >
              Our debut collection explores the richness of traditional
              textiles, beginning with indigo hues and unfolding into a palette
              of mustard, green, and shadowed neutrals. Natural fabrics like
              linen, woven cottons, and cotton denim are thoughtfully paired
              with Kantha embroidery, hand block printing, and
              Tangaliya-inspired craftsmanship.
            </p>

            <p
              style={{ color: "#555555" }}
              className={`font-normal mt-3 lg:text-justify  text-[clamp(0.7rem,1.35vw,1.05rem)] leading-[2.10] font-futura`}
            >
              The name DHIRAGO draws from Dheera—a state of calmness. Created in
              limited numbers, each garment is conceived as a collectible
              object, designed to endure through time. Each piece quietly
              gathers character, reflecting the beauty of time.
            </p>

            <div className="lg:mt-9 mt-3 flex gap-3">
              {/* Filled primary button */}
              <a
                href="/collections/shirts"
                className="border hover:bg-black hover:text-white transition border-[#14171A] px-8 py-3.5 text-[11px] font-semibold uppercase  text-[#14171A] transition-colors hover:border-[#14171A]"
              >
                View Our Collection
              </a>
              {/* Outlined secondary button */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

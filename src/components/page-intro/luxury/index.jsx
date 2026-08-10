import Image from "next/image";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Hero() {
  return (
    <section className={` ${josefin.className} lg:mt-20 `}>
      <div className="relative grid md:grid-cols-2">
        {/* Image */}


            <div className="flex items-center px-6 py-4 md:px-16 lg:px-28 ">
          <div className="max-w-2xl">
            <p
            className={`${josefin.className} uppercase leading-[1.90] text-[clamp(11px,1.3vw,1.01rem)]  text-[#333333] tracking-[0.01em] mb-6`}

            >
              The first story; woven with patience
            </p>

            <p
              style={{ color: "#555555" }}
              className={`font-normal lg:text-justify  text-[clamp(0.7rem,1.35vw,1.07rem)] leading-[2.10] font-futura`}
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

            <div className="mt-9 flex gap-3">
              {/* Filled primary button */}
              <a
                href="/collections/shirts"
                className="border border-[#14171A] px-8 py-3.5 text-[11px] font-semibold uppercase  text-[#14171A] transition-colors hover:border-[#14171A]"
              >
                View Our Collection
              </a>
              {/* Outlined secondary button */}
            </div>
          </div>
        </div>


        <div className="relative  w-full overflow-hidden bg-black/5">
          <Image
            src="/images/wi.jpeg"
            alt="A young man wearing a handwoven muslin shirt by a lakeside"
            width={1200}
            height={800}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-all duration-700"
            unoptimized
          />
          {/* <img
            src="https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/Home/dsc06295.jpg"
            className="object-cover transition-all duration-700"
            alt="A young man wearing a handwoven muslin shirt by a lakeside"
            
          /> */}
        </div>

        {/* Copy */}
    
      </div>
    </section>
  );
}

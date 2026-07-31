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
            <p className={`${josefin.className} mb-6  uppercase `}
              style={{
                fontSize: "clamp(0.725rem, 1.6vw, 15px)",
                color: "#333333",
                letterSpacing: "0.02em",
              }}>
              The first story; woven with patience
            </p>

            <p className="font-futura font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]" >
               Our debut collection explores the richness of traditional textiles, beginning with indigo hues and unfolding into a palette of mustard, green, and shadowed neutrals. Natural fabrics like linen, woven cottons, and cotton denim are thoughtfully paired with Kantha embroidery, hand block printing, and Tangaliya-inspired craftsmanship.

            </p>

            <p className="font-futura mt-5 font-light leading-[1.90] text-[clamp(12px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
              The name DHIRAGO draws from Dheera—a state of calmness. Created in limited numbers, each garment is conceived as a collectible object, designed to endure through time. Each piece quietly gathers character, reflecting the beauty of time.
              
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
      </div>
    </section>
  );
}
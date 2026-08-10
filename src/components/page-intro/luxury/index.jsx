import Image from "next/image";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Hero() {
  return (
    <section className={`${josefin.className} mt-10 lg:mt-28 px-4 sm:px-0`}>
      <h3
        className={`${josefin.className} text-center uppercase leading-[1.9] text-[clamp(11px,1.3vw,1.07rem)] text-[#333333] tracking-[0.03em] mb-4 px-4`}
      >
        HANDWOVEN ACROSS <br className="hidden sm:block" /> GEOGRAPHIES AND TIME
      </h3>

      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_0.777fr_0.777fr] gap-6 md:gap-8 py-20 px-14">
        {/* Text content */}
        <div className="order-1 flex items-center px-5 sm:px-6 py-6 md:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto md:mx-0">
         

            <p
              style={{ color: "#555555" }}
              className={`font-normal text-justify text-[clamp(0.75rem,1.35vw,1.07rem)] leading-[1.9] md:leading-[2.10] font-futura`}
            >
              Our debut collection explores the richness of traditional
              textiles, beginning with indigo hues and unfolding into a
              palette of mustard, green, and shadowed neutrals. Natural
              fabrics like linen, woven cottons, and cotton denim are
              thoughtfully paired with Kantha embroidery, hand block
              printing, and Tangaliya-inspired craftsmanship.
            </p>

            <p
              style={{ color: "#555555" }}
              className={`font-normal mt-3 text-justify text-[clamp(0.75rem,1.35vw,1.05rem)] leading-[1.9] md:leading-[2.10] font-futura`}
            >
              The name DHIRAGO draws from Dheera—a state of calmness. Created
              in limited numbers, each garment is conceived as a collectible
              object, designed to endure through time. Each piece quietly
              gathers character, reflecting the beauty of time.
            </p>

            <div className="mt-8 md:mt-9 flex justify-center md:justify-start gap-3">
              
              <a  href="/collections/shirts"
                className="border border-[#14171A] px-6 sm:px-8 py-3 sm:py-3.5 text-[10px] sm:text-[11px] font-semibold uppercase text-[#14171A] transition-colors hover:bg-[#14171A] hover:text-white"
              >
                View Our Collection
              </a>
            </div>
          </div>
        </div>

        {/* Image 1 */}
        <div className="order-2 relative w-full aspect-[4/5] md:aspect-auto md:h-full min-h-[320px] sm:min-h-[420px] md:min-h-[600px] lg:min-h-[680px] overflow-hidden bg-black/5">
          <Image
            src="/images/wi2.jpg"
            alt="A young man wearing a handwoven muslin shirt by a lakeside"
            fill
            priority
            sizes="(min-width: 768px) 32vw, 100vw"
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Image 2 */}
        <div className="order-3 relative w-full aspect-[4/5] md:aspect-auto md:h-full min-h-[320px] sm:min-h-[420px] md:min-h-[600px] lg:min-h-[680px] overflow-hidden bg-black/5">
          <Image
            src="/images/wi.jpeg"
            alt="A young man wearing a handwoven muslin shirt, alternate view"
            fill
            sizes="(min-width: 768px) 32vw, 100vw"
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
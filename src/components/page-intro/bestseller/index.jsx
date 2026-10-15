import Image from "next/image";
import Link from "next/link";
import ImageReveal from "../../home-new/ImageReveal";
import Reveal from "../../home-new/Reveal";
import { OrnamentDivider } from "../../home-new/Ornament";
import { josefin, serif } from "../../home-new/theme";
import { Josefin_Sans } from "next/font/google";

const josefinold = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function Hero() {
  return (
    <section className={`${josefin.className} py-14 md:py-24`}>
      <div className="relative grid items-center md:grid-cols-2">
        {/* Image */}
        <div className="relative isolate px-4 md:pl-10 md:pr-0 lg:pl-16">
          <div className="relative">
           
            <ImageReveal className="relative aspect-[3/4] w-full md:aspect-[4/5]">
              <Image
                src={`https://images.dhirago.com/ecommerce/Home/dsc06295.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}
                alt="A young man wearing a handwoven muslin shirt by a lakeside"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                quality={75}
              />
            </ImageReveal>
          </div>
        </div>

        {/* Copy */}
        <div className="flex items-center px-6 pt-14 md:px-14 md:pt-0 lg:px-24">
          <Reveal className="max-w-xl">
            <h2
              className={`${josefin.className} uppercase lg:leading-[1.90] text-[clamp(13px,1.3vw,1.01rem)]  text-[#333333] tracking-[0.01em] lg:mb-6 mb-4`}
            >
              The first story crafted with patience
             
            </h2>

            {/* <OrnamentDivider className="mt-6 !w-28" /> */}

            <p className="mt-7 text-[14px] leading-[2] font-futura text-[#555555] md:text-[15px]">
              Our debut collection explores the richness of traditional
              textiles, beginning with indigo hues and unfolding into a palette
              of mustard, greens, and shadowed neutrals. Natural fabrics like
              linen and kala cottons are thoughtfully paired with Kantha
              embroidery, hand block printing, and Tangaliya-inspired detailing.
            </p>

            <p className="mt-4 text-[14px] leading-[2] font-futura text-[#555555] md:text-[15px]">
              Created in limited numbers, each garment is conceived as a
              collectible object, designed to endure through time. As it is worn
              and lived in, it gathers character, revealing a beauty that
              deepens with age.
            </p>

            <Link
              href="/collections/shirts"
              className="group mt-9 inline-flex items-center gap-4 border-b border-[#2b241c] pb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#2b241c] transition-colors hover:border-[#b08d57] hover:text-[#b08d57]"
            >
              View Our Collection
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

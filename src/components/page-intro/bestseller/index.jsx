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
        <div className="flex items-center px-6 py-14 md:px-16 lg:px-28 text-[#14171A]">
          <div className="max-w-md">
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#14171A]">
              The Mul Story: Woven Like Air
            </p>

            <p className="font-futura text-[17px] leading-[1.85] text-[#14171A]/85">
              Before the rise of industrial yarns and calibrated counts,
              there existed a cloth so fine it moved like air itself. Woven
              along the riverbanks of Bengal, shaped by humidity, patience,
              and hand memory, muslin was never merely a textile. It was an
              atmosphere of dialogue between cotton, climate, and human
              touch.
            </p>

            <p className="font-futura mt-5 text-[17px] leading-[1.85] text-[#14171A]/85">
              At Dhirago  our 200-count{" "}
              <a href="#" className="underline decoration-[#9C8055] underline-offset-4">
                handspun
              </a>{" "}
              mul begins with this memory.
            </p>

            <p className="font-futura mt-6 text-[16px] italic text-[#14171A]">
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
import Link from "next/link";
import Reveal from "./Reveal";

export default function IntroStatement() {
  return (
    <section
      className="bordered-section section-spacing bg-white"
      aria-label="Collection introduction"
    >
      <div className="mx-auto max-w-[1020px] px-6 py-12 md:px-8 md:py-16">
          <div className="font-futura prose-intro text-start font-futura text-[13px] leading-[1.7] tracking-[0.1em] text-[#555555] md:text-[15px] md:leading-[1.75]">
            <p className="m-0">A life in details.</p>
            <p className="m-0 mt-[1.15em]">
              It is often the smallest things that give us an
          experience—the comfort of a well-worn object, the warmth of afternoon
          sunlight, or the beauty of imperfections.These everyday details stay
          with us, becoming part of our memories.
            </p>
            <p className="m-0 mt-[1.15em]">
              Our collection reflects the
          beauty found in the smallest details of life, looking at dressing
          beyond simply what we wear. It is an appreciation of the ordinary
          things that gain beauty with time.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/collections/shirts"
                className="intro-link font-futura text-[12px] uppercase tracking-[0.18em] text-[#111111] md:text-[13px]"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="intro-link font-futura text-[12px] uppercase tracking-[0.18em] text-[#111111] md:text-[13px]"
              >
                About
              </Link>
            </div>
          </div>
      </div>
    </section>
  );
}

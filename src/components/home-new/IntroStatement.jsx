import FramedButton from "./FramedButton";
import Reveal from "./Reveal";
import { josefin } from "./theme";

export default function IntroStatement() {
  return (
    <section className="px-6 py-12 md:py-24">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <p className={`${josefin.className} text-[14px] italic font-light leading-[1.5] md:leading-[1.7] text-[#3d342a] md:text-[20px]`}>
          Our debut collection begins in indigo and unfolds into mustard, greens
          and shadowed neutrals. Linen and kala cotton meet Kantha embroidery,
          hand block printing and Tangaliya-inspired detail — made in limited
          numbers, meant to gather character as they are worn.
        </p>
        <div className="mt-4">
          <FramedButton href="/collections/shirts">Discover collection</FramedButton>
        </div>
      </Reveal>
    </section>
  );
}

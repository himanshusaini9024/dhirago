import FramedButton from "./FramedButton";
import Reveal from "./Reveal";
import { josefin } from "./theme";

export default function IntroStatement() {
  return (
    <section className="px-6 py-12 md:py-24 bg-[#ffffff]">
      <Reveal className="mx-auto max-w-[1160px] text-justify ">
        {/* <p
          className={`${josefin.className} text-[14px]  font-light leading-[1.5] md:leading-[1.1] text-[#111111] md:text-[18px]`}
        > */}
           <p
            className={`font-normal lg:text-justify text-[13px]  md:text-[clamp(0.7rem,1.35vw,1rem)] md:leading-[1.4] leading-[1.7] font-futura`}
            style={{ color: "#555555" }}
          >
          A life in details It is often the smallest things that give us an
          experience—the comfort of a well-worn object, the warmth of afternoon
          sunlight, or the beauty of imperfections.
          <br /><br /> These everyday details stay
          with us, becoming part of our memories. <br /><br />
          Our collection reflects the
          beauty found in the smallest details of life, looking at dressing
          beyond simply what we wear. It is an appreciation of the ordinary
          things that gain beauty with time.
        </p>
        <div className="mt-4">
          <FramedButton href="/about">
            Discover More
          </FramedButton>
        </div>
      </Reveal>
    </section>
  );
}

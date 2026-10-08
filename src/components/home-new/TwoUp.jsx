import Image from "next/image";
import Link from "next/link";
import ImageReveal from "./ImageReveal";
import { serif } from "./theme";

export default function TwoUp({ panels = [] }) {
  return (
    <section className="grid grid-cols-2">
      {panels.map((panel, i) => (
        <Link key={panel.alt} href={panel.href} className="group relative block">
          <ImageReveal delay={i * 0.15} className="relative aspect-[3/4] md:aspect-[4/5]">
            <Image
              src={panel.src}
              alt={panel.alt}
              fill
              sizes="50vw"
              quality={78}
              className={`object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.04] ${panel.position || "object-top"}`}
            />
          </ImageReveal>
          {panel.caption && (
            <span
              className={`${serif.className} pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[18px] italic text-white drop-shadow md:bottom-8 md:text-[26px]`}
            >
              {panel.caption}
            </span>
          )}
        </Link>
      ))}
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { label } from "./theme";

export default function Spotlight({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="py-14 md:py-20">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 [scrollbar-width:none] md:gap-4 md:px-9 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative block w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[36vw]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#ece9e4]">
              {item.src && (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 36vw, (min-width: 640px) 46vw, 78vw"
                  quality={78}
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03]"
                />
              )}
            </div>
            <span
              className={`${label} absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-6 py-1.5 text-[10px] text-[#1a1a1a] md:bottom-7`}
            >
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

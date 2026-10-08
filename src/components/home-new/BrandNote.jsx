import { serif } from "./theme";

export default function BrandNote() {
  return (
    <section className="px-4 pb-14 pt-4 md:px-12 md:pb-20">
      <h2 className={`${serif.className} text-[15px] font-medium uppercase tracking-[0.1em] text-[#3d342a] md:text-[17px]`}>
        Dhirago — Luxury Indian menswear
      </h2>
      <p className={`${serif.className} mt-3 max-w-[1100px] text-[15px] leading-[1.7] text-[#4a3f33] md:text-[16px]`}>
        Dhirago makes premium men&apos;s shirts rooted in traditional Indian
        textiles. Every piece begins with a natural fabric — linen or kala cotton
        — and is shaped through hand embroidery, block printing and careful
        construction. Made in small numbers and finished by hand, our shirts are
        built to be worn, kept and remembered.
      </p>
      <p className={`${serif.className} mt-6 text-[15px] font-medium uppercase tracking-[0.1em] text-[#3d342a] md:text-[17px]`}>
        Crafted in India
      </p>
    </section>
  );
}

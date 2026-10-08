import ProductCard from "./ProductCard";
import FramedButton from "./FramedButton";
import Reveal from "./Reveal";
import { OrnamentHeading } from "./Ornament";

export default function ProductGrid({ title, products = [], cta, priority = false }) {
  if (!products.length) return null;

  return (
    <section className="px-4 py-14 md:px-9 md:py-20">
      <OrnamentHeading className="mb-10 md:mb-12">{title}</OrnamentHeading>

      <div
        className={`grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-8 md:gap-y-12 ${
          products.length === 3 ? "lg:mx-auto lg:max-w-[75%] lg:grid-cols-3" : "lg:grid-cols-4"
        }`}
      >
        {products.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 0.06} y={16}>
            <ProductCard product={p} priority={priority && i < 4} />
          </Reveal>
        ))}
      </div>

      {cta && (
        <div className="mt-12 flex justify-center md:mt-16">
          <FramedButton href={cta.href}>{cta.label}</FramedButton>
        </div>
      )}
    </section>
  );
}

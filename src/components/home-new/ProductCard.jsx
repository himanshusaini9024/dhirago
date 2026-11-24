import Image from "next/image";
import Link from "next/link";
import { formatPrice, josefin, productImage } from "./theme";
import { resolveProductPrice } from "../../lib/festiveSale";

export default function ProductCard({ product, priority = false }) {
  const front = productImage(product, 0);
  const back = productImage(product, 1);
  const { selling, mrp: listMrp, discount: off } = resolveProductPrice(product);
  const mrp = listMrp;
  const href = product?.slug ? `/product/${product.slug}` : null;

  if (!href) {
    return (
      <div className={`${josefin.className} block opacity-60`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#ece9e4]" />
        <div className="mt-[1.1rem]">
          <h6 className="text-center text-xs uppercase text-black md:text-sm">
            {product?.name || "Product"}
          </h6>
        </div>
      </div>
    );
  }

  return (
    <Link href={href} className="group block" aria-label={product.name}>
      <div className="relative aspect-[3/4] overflow-hidden bg-[#ece9e4]">
        {front && (
          <Image
            src={front}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 24vw, 50vw"
            quality={75}
            unoptimized
            className={`pointer-events-none object-cover transition-opacity duration-700 ${
              back
                ? "[@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-0"
                : ""
            }`}
          />
        )}
        {back && (
          <Image
            src={back}
            alt=""
            fill
            sizes="(min-width: 1024px) 24vw, 50vw"
            quality={75}
            unoptimized
            className="pointer-events-none object-cover opacity-0 transition-opacity duration-700 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
          />
        )}
      </div>

      <div className="mt-[1.1rem]">
        <h6 className="text-center text-xs uppercase text-black md:text-sm">
          {product.name}
        </h6>
        <div className="mt-2 flex flex-wrap items-baseline justify-center gap-2">
          <p className="text-[0.911rem] text-[#1a1a1a]">
            ₹ {selling.toLocaleString("en-IN")}
          </p>
          {mrp > selling && (
            <p className="text-[0.8rem] text-gray-400 line-through">
              {formatPrice(mrp)}
            </p>
          )}
          {off > 0 && listMrp > selling && (
            <p className="text-[0.75rem] text-[#1f8a4c]">
              {Math.round(off)}% Off
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

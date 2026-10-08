import Image from "next/image";
import Link from "next/link";
import { formatPrice, label, productImage } from "./theme";

export default function ProductCard({ product, priority = false }) {
  const front = productImage(product, 0);
  const back = productImage(product, 1);
  const selling = Number(product.currentPrice ?? product.special_price ?? product.price) || 0;
  const mrp = Number(product.mrp ?? product.price) || 0;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#ece9e4]">
        {front && (
          <Image
            src={front}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 24vw, 50vw"
            quality={75}
            className="object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
        )}
        {back && (
          <Image
            src={back}
            alt=""
            fill
            sizes="(min-width: 1024px) 24vw, 50vw"
            quality={75}
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
      </div>

      <div className={`${label} mt-3 flex items-start justify-between gap-3 text-[10px] leading-[1.5] text-[#1a1a1a] md:text-[11px]`}>
        <span className="line-clamp-2">{product.name}</span>
        <span className="shrink-0 text-right">
          {formatPrice(selling)}
          {mrp > selling && (
            <span className="block text-[9px] text-[#1a1a1a]/40 line-through">{formatPrice(mrp)}</span>
          )}
        </span>
      </div>
    </Link>
  );
}

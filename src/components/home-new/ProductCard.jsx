import Image from "next/image";
import Link from "next/link";
import { formatPrice, label,josefin, productImage } from "./theme";

export default function ProductCard({ product, priority = false }) {
  const front = productImage(product, 0);
  const back = productImage(product, 1);
  const selling = Number(product.currentPrice ?? product.special_price ?? product.price) || 0;
  const mrp = Number(product.mrp ?? product.price) || 0;
  const listMrp = Number(mrp ?? price) || 0;
  const off = Number(product.discount) || 0;

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
{/* 
      <div className={`${label} mt-3 flex items-start justify-between gap-3 text-[10px] leading-[1.5] text-[#1a1a1a] md:text-[11px]`}>
        
        <span className="line-clamp-2">{product.name}</span>
        <span className="shrink-0 text-right">
          {formatPrice(selling)}
          {mrp > selling && (
            <span className="block text-[9px] text-[#1a1a1a]/40 line-through">{formatPrice(mrp)}</span>
          )}
        </span>
      </div> */}

         <div className="mt-[1.1rem] ">
        <h6 className="text-xs md:text-sm uppercase text-black text-center">
          {product.name}
        </h6>
        <div className="mt-2 flex flex-wrap items-baseline justify-center gap-2">
          <p className="text-[0.911rem] text-[#1a1a1a]">
            ₹ {selling.toLocaleString("en-IN")}
          </p>
          {mrp > selling && (
            <p className="text-[0.8rem] text-gray-400 line-through">
               {formatPrice(mrp).toLocaleString("en-IN")}
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

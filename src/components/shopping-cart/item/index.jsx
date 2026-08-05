"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeProduct, setCount } from "../../../store/reducers/cart";

const baseURL = process.env.NEXT_PUBLIC_IMG_URL;

function getThumbUrl(thumb) {
  if (!thumb) return "/images/placeholder.png";
  if (typeof thumb === "string") {
    return thumb.startsWith("http") ? thumb : `${baseURL || ""}${thumb}`;
  }
  if (thumb.url) {
    return thumb.url.startsWith("http")
      ? thumb.url
      : `${baseURL || ""}${thumb.url}`;
  }
  return "/images/placeholder.png";
}

export default function Item({
  thumb,
  name,
  id,
  slug,
  color,
  alt,
  quantity,
  size,
  fit,
  price,
  formatINR,
}) {
  const dispatch = useDispatch();

  const updateQty = (newQty) => {
    if (newQty <= 0) {
      dispatch(removeProduct({ id, color, size }));
      return;
    }

    dispatch(
      setCount({
        product: { id, color, size },
        quantity: newQty,
      }),
    );
  };

  const format =
    typeof formatINR === "function"
      ? formatINR
      : (value) =>
          `₹ ${Number(value || 0).toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })}`;

  const meta = [color, size, fit || "Regular"]
    .filter(Boolean)
    .map((value) =>
      typeof value === "string"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value,
    )
    .join(", ");

  const lineTotal = (Number(price) || 0) * (quantity || 0);

  return (
    <div className="border-b border-[#e8e8e8] py-5 md:py-6">
      {/* Mobile card */}
      <div className="md:hidden flex gap-4">
        <Link href={`/product/${slug}`} className="shrink-0">
          <img
            src={getThumbUrl(thumb)}
            alt={alt || name}
            className="w-[88px] h-[110px] object-cover bg-[#f5f5f5]"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            href={`/product/${slug}`}
            className="block text-[14px] text-[#1a1a1a] leading-snug"
          >
            {name}
          </Link>
          <p className="text-[12px] text-[#888] mt-1">{meta}</p>
          <p className="text-[14px] text-[#1a1a1a] mt-2">{format(price)}</p>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="inline-flex items-center border border-[#cfcfcf]">
              <button
                type="button"
                onClick={() => updateQty(quantity - 1)}
                className="w-9 h-9 text-[16px] text-[#333]"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-[13px]">{quantity}</span>
              <button
                type="button"
                onClick={() => updateQty(quantity + 1)}
                className="w-9 h-9 text-[16px] text-[#333]"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => dispatch(removeProduct({ id, color, size }))}
              className="text-[11px] tracking-[0.08em] uppercase text-[#777] underline underline-offset-2"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Desktop row */}
      <div className="hidden md:grid grid-cols-[minmax(0,2.2fr)_1fr_1fr_1fr] gap-4 items-center">
        <div className="flex gap-4 min-w-0">
          <Link href={`/product/${slug}`} className="shrink-0">
            <img
              src={getThumbUrl(thumb)}
              alt={alt || name}
              className="w-[92px] h-[115px] object-cover bg-[#f5f5f5]"
            />
          </Link>

          <div className="min-w-0 pt-1">
            <Link
              href={`/product/${slug}`}
              className="block text-[15px] text-[#1a1a1a] leading-snug hover:opacity-70"
            >
              {name}
            </Link>
            <p className="text-[13px] text-[#8a8a8a] mt-1.5">{meta}</p>
            <button
              type="button"
              onClick={() => dispatch(removeProduct({ id, color, size }))}
              className="mt-3 text-[11px] tracking-[0.08em] uppercase text-[#777] underline underline-offset-2 hover:text-[#1a1a1a]"
            >
              Remove
            </button>
          </div>
        </div>

        <p className="text-center text-[14px] text-[#1a1a1a]">
          {format(price)}
        </p>

        <div className="flex justify-center">
          <div className="inline-flex items-center border border-[#cfcfcf]">
            <button
              type="button"
              onClick={() => updateQty(quantity - 1)}
              className="w-10 h-9 text-[16px] text-[#333] hover:bg-[#f7f7f7]"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-9 text-center text-[13px]">{quantity}</span>
            <button
              type="button"
              onClick={() => updateQty(quantity + 1)}
              className="w-10 h-9 text-[16px] text-[#333] hover:bg-[#f7f7f7]"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <p className="text-right text-[14px] text-[#1a1a1a]">
          {format(lineTotal)}
        </p>
      </div>
    </div>
  );
}

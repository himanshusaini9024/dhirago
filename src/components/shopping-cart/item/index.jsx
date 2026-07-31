"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeProduct, setCount } from "../../../store/reducers/cart";

const baseURL = process.env.NEXT_PUBLIC_IMG_URL;

export default function Item({
  thumb,
  name,
  id,
  slug,
  color,
  alt,
  quantity,
  size,
  price,
}) {
  const dispatch = useDispatch();

  const updateQty = (newQty) => {
  if (newQty <= 0) return;

  dispatch(
    setCount({
      product: { id, color, size },
      quantity: newQty,
    })
  );
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 items-center py-6 border-b gap-4">

      {/* PRODUCT */}
      <div className="flex gap-4 col-span-2">
        <img
          src={`${baseURL}${thumb.url}`}
          alt={alt}
          className="w-20 h-28 object-cover"
        />

        <div>
          <p className="text-sm"><Link href={`/product/${slug}`}>{name}</Link></p>
          <p className="text-xs text-gray-500 mt-1">
            {color}, {size}
          </p>

          <button
            onClick={() => dispatch(removeProduct({ id, color, size }))}
            className="text-xs underline mt-2"
          >
            REMOVE
          </button>
        </div>
      </div>

      {/* PRICE */}
      <p className="text-sm text-center">₹{price}</p>

      {/* QUANTITY */}
      <div className="flex justify-center">
        <div className="flex border">
          <button
            onClick={() => updateQty(quantity - 1)}
            className="px-3 py-1"
          >
            −
          </button>

          <span className="px-3 py-1">{quantity}</span>

          <button
            onClick={() => updateQty(quantity + 1)}
            className="px-3 py-1"
          >
            +
          </button>
        </div>
      </div>

      {/* TOTAL */}
      <p className="text-sm text-right">
        ₹{(price * quantity).toFixed(2)}
      </p>
    </div>
  );
}
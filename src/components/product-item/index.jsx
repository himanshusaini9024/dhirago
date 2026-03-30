"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { some } from "lodash";
import { toggleFavProduct } from "../../store/reducers/user";
import { useEffect, useState } from "react";

const ProductItem = ({ images, id, name, slug, currentPrice }) => {
  const dispatch = useDispatch();
  const favProducts = useSelector((state) => state.user?.favProducts || []);
  const isFavourite = some(favProducts, (productId) => productId === id);

  const toggleFav = () => {
    dispatch(toggleFavProduct({ id }));
  };

  const imageList = images || [];
  const baseURL = "https://res.cloudinary.com/ds48lk80f/";

  const [index, setIndex] = useState(0);

  // 🔥 AUTO SLIDE ALWAYS
  useEffect(() => {
    if (imageList.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imageList.length);
    }, 3000); // ⏱️ speed (change if needed)

    return () => clearInterval(interval);
  }, [imageList.length]);

  const currentImage =
    imageList[index]?.url
      ? baseURL + imageList[index].url
      : "/images/placeholder.png";

  return (
    <div className="group cursor-pointer">

      {/* IMAGE */}
      <div className="relative w-full h-[260px] md:h-[570px] overflow-hidden bg-[#f5f5f5]">

        <Link href={`/product/${slug}`}>
          <img
            src={currentImage}
            alt={name}
            className="w-full h-full object-cover transition-opacity duration-700 opacity-100"
          />
        </Link>

        {/* DOTS */}
        {imageList.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {imageList.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition ${
                  i === index ? "bg-black scale-110" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* HEART */}
        <button
          onClick={toggleFav}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md ${
            isFavourite ? "text-red-500" : "text-black"
          }`}
        >
          ♥
        </button>

        {/* ADD TO CART */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition duration-500">
          <button className="w-full bg-black text-white text-xs py-3">
            ADD TO CART
          </button>
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-4">
        <h3 className="text-sm text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">₹{currentPrice}</p>
      </div>
    </div>
  );
};

export default ProductItem;
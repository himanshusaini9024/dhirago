"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { some } from "lodash";
import { toggleFavProduct } from "../../store/reducers/user";
import { useEffect, useState } from "react";
import QuickAddModal from "./qucikview";
import productsSizes from "../../utils/data/products-sizes";
import { sortProductImages } from "../../utils/sortProductImages";

const ProductItem = ({ images, id, name, sku, slug, color, currentPrice, category }) => {
  const dispatch = useDispatch();
  const favProducts = useSelector((state) => state.user?.favProducts || []);
  const isFavourite = some(favProducts, (productId) => productId === id);

  const toggleFav = () => {
    dispatch(toggleFavProduct({ id }));
  };
  const [openModal, setOpenModal] = useState(false);
  const imageList = sortProductImages(images);
  const baseURL = process.env.NEXT_PUBLIC_IMG_URL;

  const [hovered, setHovered] = useState(false);

  // 🔥 AUTO SLIDE ALWAYS
  // useEffect(() => {
  //   if (imageList.length <= 1) return;

  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % imageList.length);
  //   }, 3000); // ⏱️ speed (change if needed)

  //   return () => clearInterval(interval);
  // }, [imageList.length]);

  

  return (
    <div className="group cursor-pointer mt-6 md:mt-0">
      {/* IMAGE */}

      <div
        className="relative w-full h-[300px] md:h-[540px] overflow-hidden bg-[#f5f5f5]"
        onMouseEnter={() => setHovered(true)}
        onTouchStart={()=>setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
        }}
        onTouchEnd={() => setHovered(false)}
      >
        <Link href={`/product/${slug}`}>
          <div className="relative w-full h-full overflow-hidden">
            {/* First Image */}
            <img
              src={
                imageList?.[0]?.url
                  ? baseURL + imageList[0].url
                  : "/images/placeholder.png"
              }
              alt={name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                hovered ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Second Image */}
            {imageList?.[1] && (
              <img
                src={baseURL + imageList[1].url}
                alt={name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  hovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        </Link>

        {/* HEART */}
        {/* <button
          onClick={toggleFav}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md ${
            isFavourite ? "text-red-500" : "text-black"
          }`}
        >
          ♥
        </button> */}

        {/* ADD TO CART */}
        <div className="absolute bottom-1 md:left-[21rem] right-[0.333rem]  w-[12%] translate-y-full group-hover:translate-y-0 transition duration-500">
          <button
            onClick={() => setOpenModal(true)}
            className="w-full bg-white text-black text-[0.676rem] md:text-xl py-3"
          >
            +
          </button>
        </div>
      </div>

      <QuickAddModal
        product={{
          id,
          name,
          slug,
          sku,
          images: imageList,
          color,
          currentPrice,
          category,
          sizes: productsSizes, // ⚠️ pass real sizes if available
        }}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

      {/* DETAILS */}
      <div className="mt-[1.1rem] ">
        <h6 className="text-xs md:text-sm uppercase text-black text-center">{name}</h6>
        <p className="mt-2 text-[0.911rem] text-gray-500 mt-1 text-center">
          Rs.{currentPrice}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;

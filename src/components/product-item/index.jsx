"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { some } from "lodash";
import { toggleFavProduct } from "../../store/reducers/user";
import { useEffect, useState } from "react";
import QuickAddModal from "./qucikview";
import productsSizes from "../../utils/data/products-sizes";


const ProductItem = ({ images, id, name,sku, slug,color, currentPrice }) => {
  const dispatch = useDispatch();
  const favProducts = useSelector((state) => state.user?.favProducts || []);
  const isFavourite = some(favProducts, (productId) => productId === id);

  const toggleFav = () => {
    dispatch(toggleFavProduct({ id }));
  };
  const [openModal, setOpenModal] = useState(false);
  const imageList = images || [];
  const baseURL = "https://res.cloudinary.com/ds48lk80f/";

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const extendedImages = [...imageList, imageList[0]];
  useEffect(() => {
    if (!hovered || imageList.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000); // slower + smoother

    return () => clearInterval(interval);
  }, [hovered, imageList.length]);

  // 🔥 Smooth loop reset
  useEffect(() => {
    if (index === imageList.length) {
      const timeout = setTimeout(() => {
        setIndex(0);
      }, 1000); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [index, imageList.length]);
  // 🔥 AUTO SLIDE ALWAYS
  // useEffect(() => {
  //   if (imageList.length <= 1) return;

  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % imageList.length);
  //   }, 3000); // ⏱️ speed (change if needed)

  //   return () => clearInterval(interval);
  // }, [imageList.length]);

  const currentImage = imageList[index]?.url
    ? baseURL + imageList[index].url
    : "/images/placeholder.png";

  return (
    <div className="group cursor-pointer">
      {/* IMAGE */}

      <div
        className="relative w-full h-[300px] md:h-[600px] overflow-hidden bg-[#f5f5f5]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setIndex(0);
        }}
      >
        <Link href={`/product/${slug}`}>
          <div className="relative w-full h-full overflow-hidden">
            {/* ✅ ZOOM LAYER */}
            <div className="w-full h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.05]">
              {/* SLIDER */}
              <div
                className={`flex h-full ${
                  index === imageList.length
                    ? ""
                    : "transition-transform duration-[2500ms] ease-[cubic-bezier(0.33,1,0.68,1)]"
                }`}
                style={{
                  transform: `translateX(-${index * 100}%)`,
                }}
              >
                {extendedImages.map((img, i) => (
                  <img
                    key={i}
                    src={
                      img?.url ? baseURL + img.url : "/images/placeholder.png"
                    }
                    alt={name}
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </div>
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
        <div className="absolute bottom-2 left-0  w-full translate-y-full group-hover:translate-y-0 transition duration-500">
          <button
            onClick={() => setOpenModal(true)}
            className="w-full bg-white text-black text-xs py-3"
          >
            🛒
            ADD TO CART
          </button>
        </div>
      </div>

      <QuickAddModal
        product={{
          id,
          name,
          slug,
          sku,
          images,
          color,
          currentPrice,
          sizes:productsSizes, // ⚠️ pass real sizes if available
        }}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

      {/* DETAILS */}
      <div className="mt-4">
        <h3 className="text-sm text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">₹{currentPrice}</p>
      </div>
    </div>
  );
};

export default ProductItem;

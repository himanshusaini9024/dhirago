"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavProduct } from "../../store/reducers/user";
import { useEffect, useMemo, useRef, useState } from "react";
import { sortProductImages } from "../../utils/sortProductImages";
import { hasSizeStock, isOneSize, isOutOfStock, sizeOptions } from "../../utils/stock";
import Image from "next/image";

const QuickAddModal = dynamic(() => import("./qucikview"), { ssr: false });

const GRID_IMAGE_SIZES = "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw";

const ProductItem = ({
  images,
  id,
  name,
  sku,
  slug,
  color,
  currentPrice,
  price,
  mrp,
  discount,
  category,
  inStock,
  sizeStock,
  hideQuickAdd = false,
  priority = false,
  imageSizes = GRID_IMAGE_SIZES,
}) => {
  const soldOut = isOutOfStock({ inStock, sizeStock });
  const sizes = useMemo(() => sizeOptions(sizeStock), [sizeStock]);
  const showSizes = hasSizeStock(sizeStock) && !isOneSize(sizeStock);
  const dispatch = useDispatch();
  const favProducts = useSelector((state) => state.user?.favProducts || []);
  const isFavourite = favProducts.includes(id);

  const toggleFav = () => {
    dispatch(toggleFavProduct({ id }));
  };
  const [openModal, setOpenModal] = useState(false);
  const imageList = sortProductImages(images);
  const baseURL = process.env.NEXT_PUBLIC_IMG_URL;

  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!touched) return;
    const handleOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setTouched(false);
      }
    };
    document.addEventListener("touchstart", handleOutside);
    return () => document.removeEventListener("touchstart", handleOutside);
  }, [touched]);

  const selling = Number(currentPrice) || 0;
  const listMrp = Number(mrp ?? price) || 0;
  const off = Number(discount) || 0;

  // 🔥 AUTO SLIDE ALWAYS
  // useEffect(() => {
  //   if (imageList.length <= 1) return;

  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % imageList.length);
  //   }, 3000); // ⏱️ speed (change if needed)

  //   return () => clearInterval(interval);
  // }, [imageList.length]);

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer mt-4 md:mt-0"
      onTouchStart={() => setTouched(true)}
    >
      {/* IMAGE */}

      <div
        className="relative w-full aspect-[4/6] md:aspect-[4/6] overflow-hidden bg-[#f5f5f5]"
        onMouseEnter={() => setHovered(true)}
        onTouchStart={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
        }}
        onTouchEnd={() => setHovered(false)}
      >
        <Link href={`/product/${slug}`}>
          <div className="relative w-full h-full overflow-hidden">
            {/* First Image */}

            <Image
              src={
                imageList?.[0]?.url
                  ? baseURL + imageList[0].url
                  : "/images/placeholder.png"
              }
              alt={name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                hovered ? "opacity-0" : "opacity-100"
              }`}
              width={600}
              height={900}
              sizes={imageSizes}
              quality={70}
              priority={priority}
            />

            {/* Second Image — only mount after hover to avoid loading 22 images upfront */}
            {hovered && imageList?.[1] && (
              <Image
                src={
                  imageList?.[1]?.url
                    ? baseURL + imageList[1].url
                    : "/images/placeholder.png"
                }
                alt={name}
                className="absolute inset-0 w-full h-full object-cover opacity-100"
                width={600}
                height={900}
                sizes={imageSizes}
                quality={70}
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

        {soldOut && (
          <span className="pointer-events-none absolute left-2 top-2 z-[4] bg-white/90 px-2 py-1 text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-[#1b1b1b]">
            Out of stock
          </span>
        )}

        {/* ADD TO CART */}
        {!hideQuickAdd && !soldOut && (
          <div className="absolute bottom-2 right-2 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition duration-500 z-[5]">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpenModal(true); }}
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white text-black text-lg md:text-xl shadow-md hover:bg-black hover:text-white transition-colors duration-200"
            >
              +
            </button>
          </div>
        )}
      </div>

      <QuickAddModal
        product={{
          id,
          name,
          slug,
          sku,
          images: imageList,
          color,
          currentPrice: selling,
          mrp: listMrp,
          price: listMrp,
          discount: off,
          category,
          sizes,
        }}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

      {/* DETAILS */}
      <div className="mt-[1.1rem] ">
        <h6 className="text-xs md:text-sm uppercase text-black text-center">
          {name}
        </h6>
        <div className="mt-2 flex flex-wrap items-baseline justify-center gap-2">
          <p className="text-[0.911rem] text-[#1a1a1a]">
            ₹ {selling.toLocaleString("en-IN")}
          </p>
          {listMrp > selling && (
            <p className="text-[0.8rem] text-gray-400 line-through">
              ₹ {listMrp.toLocaleString("en-IN")}
            </p>
          )}
          {off > 0 && listMrp > selling && (
            <p className="text-[0.75rem] text-[#1f8a4c]">
              {Math.round(off)}% Off
            </p>
          )}
        </div>
        {showSizes && !soldOut && (
          <div
            className={`mt-3 flex flex-wrap justify-center gap-1.5 md:gap-2 transition-all duration-300 ease-out ${
              touched ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
            } md:opacity-0 md:translate-y-1 md:group-hover:opacity-100 md:group-hover:translate-y-0`}
          >
            {sizes.map((s) => (
              <span
                key={s.label}
                title={s.inStock ? undefined : "Out of stock"}
                className={`relative inline-flex min-w-[30px] md:min-w-[34px] h-[26px] md:h-[28px] items-center justify-center overflow-hidden px-2 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-200 ${
                  s.inStock
                    ? "border border-[#e4e0da] bg-white text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 hover:border-[#111] hover:shadow-[0_6px_16px_-6px_rgba(0,0,0,0.25)]"
                    : "border border-dashed border-[#e6e3de] bg-[#faf9f7] text-[#b5b0a8]"
                }`}
              >
                {s.label}
                {!s.inStock && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] bg-[#cfc9c0]"
                  />
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;

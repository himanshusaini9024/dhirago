"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavProduct } from "../../store/reducers/user";
import { useState } from "react";
import productsSizes from "../../utils/data/products-sizes";
import { sortProductImages } from "../../utils/sortProductImages";
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
  hideQuickAdd = false,
  priority = false,
  imageSizes = GRID_IMAGE_SIZES,
}) => {
  const dispatch = useDispatch();
  const favProducts = useSelector((state) => state.user?.favProducts || []);
  const isFavourite = favProducts.includes(id);

  const [openModal, setOpenModal] = useState(false);
  // Hover swap only for devices with a real mouse — touch "hover" was eating the first tap
  // and sometimes blocking navigation to the product page on mobile.
  const [hovered, setHovered] = useState(false);
  const imageList = sortProductImages(images);
  const baseURL = process.env.NEXT_PUBLIC_IMG_URL;

  const selling = Number(currentPrice) || 0;
  const listMrp = Number(mrp ?? price) || 0;
  const off = Number(discount) || 0;
  const href = slug ? `/product/${slug}` : null;

  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => setHovered(false);

  return (
    <div className="group mt-4 cursor-pointer md:mt-0">
      <div
        className="relative aspect-[4/6] w-full overflow-hidden bg-[#f5f5f5] md:aspect-[4/6]"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onMouseEnter}
        onTouchEnd={onMouseLeave}
      >
        {href ? (
          <Link
            href={href}
            className="absolute inset-0 z-0 block"
            aria-label={name}
          >
            <span className="relative block h-full w-full overflow-hidden">
              <Image
                src={
                  imageList?.[0]?.url
                    ? baseURL + imageList[0].url
                    : "/images/placeholder.png"
                }
                alt={name}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  hovered && imageList?.[1] ? "opacity-0" : "opacity-100"
                }`}
                width={600}
                height={900}
                sizes={imageSizes}
                quality={70}
                priority={priority}
              />

              {/* Second image only on mouse hover (desktop). Not on touch. */}
              {hovered && imageList?.[1] && (
                <Image
                  src={
                    imageList[1].url
                      ? baseURL + imageList[1].url
                      : "/images/placeholder.png"
                  }
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100"
                  width={600}
                  height={900}
                  sizes={imageSizes}
                  quality={70}
                />
              )}
            </span>
          </Link>
        ) : (
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={
                imageList?.[0]?.url
                  ? baseURL + imageList[0].url
                  : "/images/placeholder.png"
              }
              alt={name}
              className="absolute inset-0 h-full w-full object-cover"
              width={600}
              height={900}
              sizes={imageSizes}
              quality={70}
              priority={priority}
            />
          </div>
        )}

        {/* Quick add: always visible on mobile; hover-reveal on desktop */}
        {!hideQuickAdd && (
          <div className="absolute bottom-2 right-2 z-[5] translate-y-0 transition duration-300 md:translate-y-full md:group-hover:translate-y-0 md:group-focus-within:translate-y-0">
            <button
              type="button"
              aria-label={`Quick add ${name}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenModal(true);
              }}
              className="flex h-9 w-9 items-center justify-center bg-white text-lg text-black shadow-md transition-colors duration-200 hover:bg-black hover:text-white md:h-10 md:w-10 md:text-xl"
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
          sizes: productsSizes,
        }}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

      <div className="mt-[1.1rem]">
        {href ? (
          <Link href={href} className="block">
            <h6 className="text-center text-xs uppercase text-black md:text-sm">
              {name}
            </h6>
          </Link>
        ) : (
          <h6 className="text-center text-xs uppercase text-black md:text-sm">
            {name}
          </h6>
        )}
        <div className="mt-2 flex flex-wrap items-baseline justify-center gap-2">
          <p className="text-[0.911rem] text-[#1a1a1a]">
            ₹ {Math.round(selling).toLocaleString("en-IN")}
          </p>
          {listMrp > selling && (
            <p className="text-[0.8rem] text-gray-400 line-through">
              ₹ {Math.round(listMrp).toLocaleString("en-IN")}
            </p>
          )}
          {off > 0 && listMrp > selling && (
            <p className="text-[0.75rem] text-[#1f8a4c]">
              {Math.round(off)}% Off
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

// import Swiper core and required components
import { Swiper, SwiperSlide } from "swiper/react";

import ProductItem from "../../product-item";

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;

if (typeof window !== "undefined") {
  if (window.innerWidth > 768) {
    slidesPerView = 3;
    spaceBetween = 35;
    centeredSlides = false;
  }

  if (window.innerWidth > 1024) {
    slidesPerView = 4;
    spaceBetween = 65;
    centeredSlides = false;
  }
}

const ProductsCarousel = ({ products }) => {
  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper
        loop
        watchOverflow
        className="swiper-wrapper"
        breakpoints={{
          0: {
            slidesPerView: 1.3,
            spaceBetween: 30,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 35,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 65,
            centeredSlides: false,
          },
        }}
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductItem
              id={item.id}
              name={item.name}
              price={item.price}
              sku={item.sku}
              color={item.color}
              discount={item.discount}
              currentPrice={item.currentPrice}
              images={item.images}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;
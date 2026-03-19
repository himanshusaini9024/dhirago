"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-fade";

const PageIntro = () => {
  return (
    <section className="page-intro">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="swiper-wrapper"
      >
        <SwiperSlide>
          <div className="page-intro__slide video-slide">

            <video
              autoPlay
              muted
              loop
              playsInline
              className="banner-video"
            >
              <source src="/videos/bannervideo.mp4" type="video/mp4" />
            </video>

            <div className="container">
              <div className="page-intro__slide__content">
                <h2 className="font-poppins text-2xl lg:text-5xl">New Fashion Collection</h2>

                <a href="#" className="btn-shop">
                  <i className="icon-right" />
                  Shop now
                </a>
              </div>
            </div>

          </div>
        </SwiperSlide>

        <SwiperSlide>
         <div className="page-intro__slide relative w-full h-[70vh] sm:h-[80vh] lg:h-screen overflow-hidden">
            <Image
              src="/images/slide-4.jpeg"
              alt="Login Banner"
              fill
              className="absolute inset-0 object-cover"
            />
            <div className="container">
              <div className="page-intro__slide__content">
                <h2 className="font-poppins text-2xl lg:text-5xl">Sale of the summer collection</h2>
                <a href="#" className="btn-shop">
                  <i className="icon-right" />
                  Shop now
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
         <div className="page-intro__slide relative w-full h-[70vh] sm:h-[80vh] lg:h-screen overflow-hidden">
            <Image
              src="/images/slide-6.jpg"
              alt="Login Banner"
              fill
              className="absolute inset-0 object-cover"
            />
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Make your house into a home</h2>
                <a href="#" className="btn-shop">
                  <i className="icon-right" />
                  Shop now
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping" />
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>On purchases over $199</p>
              </div>
            </li>

            <li>
              <i className="icon-shipping" />
              <div className="data-item__content">
                <h4>99% Satisfied Customers</h4>
                <p>Our clients' opinions speak for themselves</p>
              </div>
            </li>

            <li>
              <i className="icon-cash" />
              <div className="data-item__content">
                <h4>Originality Guaranteed</h4>
                <p>30 days warranty for each product from our store</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </Swiper>


    </section>
  );
};

export default PageIntro;
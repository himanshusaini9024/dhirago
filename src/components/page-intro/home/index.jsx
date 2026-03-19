"use client";
import BrandIntro from "./brandintro";

const Homecontent = () => {
  return (
    <>
      {/* 🔥 FEATURED GRID */}
      <section className="py-16">
        <div className="max-w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* LEFT LARGE */}
          <div className="relative lg:col-span-2 h-[500px] overflow-hidden group">
            <img
              src="/images/featured-1.jpg"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl lg:text-3xl font-light tracking-wide">
                New arrivals are now in
              </h3>
              <span className="text-white text-sm mt-2 tracking-wide">
                View Collection →
              </span>
            </div>
          </div>

          {/* RIGHT SIDE (FIXED GRID) */}
          <div className="grid grid-rows-2 gap-4 h-[500px]">

            {/* TOP */}
            <div className="relative overflow-hidden group">
              <img
                src="/images/featured-2.jpg"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-5">
                <h3 className="text-white text-lg font-light tracking-wide">
                  Basic t-shirts ₹1999
                </h3>
                <span className="text-white text-xs mt-1 tracking-wide">
                  Explore →
                </span>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="relative overflow-hidden group">
              <img
                src="/images/featured-3.jpg"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-5">
                <h3 className="text-white text-lg font-light tracking-wide">
                  Summer Sale
                </h3>
                <span className="text-white text-xs mt-1 tracking-wide">
                  Shop Now →
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🔥 WHY CHOOSE US (FIXED UI) */}
      <BrandIntro/>
      
    </>
  );
};

export default Homecontent;
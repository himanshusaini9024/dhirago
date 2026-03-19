"use client";

const EditorialGrid = () => {
  return (
    <section className="w-full py-12">
      {/* SMALL SIDE SPACING */}
      <div className="max-w-[95%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* LEFT SIDE */}
          <div className="relative h-[600px] lg:h-[780px] overflow-hidden group">
            <img
              src="/images/portrait.jpg"
              alt="main"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-black/20">
              <h2 className="text-white text-2xl lg:text-3xl font-light tracking-wide">
                Premium Fashion
              </h2>

              <p className="text-white/90 text-sm mt-2 max-w-xs leading-relaxed">
                Over 10 years of premium fashion. Crafted for modern lifestyle.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE (SINGLE VIDEO) */}
          <div className="relative h-[600px] lg:h-[780px] overflow-hidden group">
            <video
              src="/videos/banner.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

            {/* Text */}
            <div className="absolute bottom-4 left-4 text-white text-sm tracking-wide">
              Discover our story
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EditorialGrid;
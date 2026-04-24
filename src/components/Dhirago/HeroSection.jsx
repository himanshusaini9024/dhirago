"use client";

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[500px] flex items-end overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1600&q=80')" }}
        
      />
        {/* <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/banner1.mp4" type="video/mp4" />
      </video> */}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-16 pb-12 sm:pb-16 md:pb-24 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-4 tracking-tight uppercase">
          Timeless Fashion<br />Essence
        </h1>
        <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-sm">
          Discover fashion that transcends trends. Elevate style with classic, elegant, and enduring designs.
        </p>
        <div className="flex items-center gap-3">
          <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white/70 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200">
            <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="border-2 border-white text-white text-xs sm:text-sm font-black tracking-[0.15em] px-6 sm:px-8 py-3 hover:bg-white hover:text-black transition-all duration-200">
            EXPLORE NOW
          </button>
        </div>
      </div>
    </section>
  );
}

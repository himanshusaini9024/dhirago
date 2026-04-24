"use client";

export default function BestSellers() {
  return (
    <section className="bg-[#0d1a0e] py-14 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 uppercase">Best Sellers</h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mb-10">
          Our Best Sellers collection features the most popular styles our customers can't get enough of. From wardrobe essentials to show-stopping pieces, these fan favorites are loved by all.
        </p>

        {/* Video / Image hero */}
        <div className="relative aspect-video max-w-3xl mx-auto overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80"
            alt="Best sellers campaign"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 border-2 border-white flex items-center justify-center hover:bg-white/30 transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* Arrow */}
          <button className="absolute bottom-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
            <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Background text decoration */}
        <div className="mt-8 overflow-hidden opacity-10 select-none pointer-events-none">
          <p className="text-5xl sm:text-7xl md:text-8xl font-black text-white whitespace-nowrap">
            Cozy Winter • Stay Warm • Cozy Winter • Stay Warm •
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

export default function EditorialSection() {
  return (
    <section className="bg-gray-50 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text */}
        <div className="order-2 md:order-1">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none mb-6 uppercase">
            <span className="text-gray-300">Fashion</span> That
            <br />
            Flows With
            <br />
            The Seasons
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
            Discover fashion that transcends trends. Our curated collections bring you pieces that are as timeless as they are stylish — perfect for every season and every occasion.
          </p>
          <button className="bg-black text-white text-xs sm:text-sm font-black tracking-[0.15em] px-8 py-3 hover:bg-gray-800 transition-colors">
            SHOP NOW
          </button>
        </div>
        {/* Image */}
        <div className="order-1 md:order-2 aspect-[4/5] overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
            alt="Fashion that flows"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

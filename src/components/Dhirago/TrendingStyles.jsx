"use client";

const trending = [
  { name: "Classic Zip Front Shirt", price: "Rs. 2,604.00", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&q=80" },
  { name: "Summer Shirt", price: "Rs. 1,250.00", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80" },
  { name: "Lightweight Everyday Sweater", price: "Rs. 2,396.00", img: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=400&q=80" },
  { name: "Solid Round Neck T-shirt", price: "Rs. 2,604.00", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { name: "Skirt Set 3 Pcs Set", price: "Rs. 5,729.00", img: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=400&q=80" },
  { name: "Racerback Sports Bra", price: "Rs. 3,542.00", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80" },
];

export default function TrendingStyles() {
  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none uppercase">
            Trending Styles You<br className="hidden sm:block" /> Can't Miss!
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-lg">
            Explore our collection of top-selling fashion favorites featuring the latest trends and must-have styles loved by our customers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {trending.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden bg-gray-50 rounded mb-2 sm:mb-3">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">{p.name}</p>
              <p className="text-xs text-gray-400 mt-1">{p.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="border-2 border-black text-black text-xs sm:text-sm font-black tracking-[0.15em] px-8 py-3 hover:bg-black hover:text-white transition-all duration-200">
            VIEW ALL
          </button>
        </div>
      </div>
    </section>
  );
}

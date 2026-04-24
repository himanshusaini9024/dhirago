"use client";

const collections = [
  { name: "Sporting Wear", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=700&q=80" },
  { name: "Luxury Winter Collection", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=80" },
  { name: "Timeless Wardrobe", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&q=80" },
];

export default function CollectionsSlider() {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-wide uppercase">Collections</h2>
      </div>
      {/* Mobile: horizontal scroll. Desktop: 3-col grid */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 px-4 sm:px-6 lg:px-8 pb-2 min-w-max md:min-w-0 md:grid md:grid-cols-3">
          {collections.map((col, i) => (
            <div
              key={i}
              className="relative w-72 sm:w-80 md:w-auto flex-shrink-0 md:flex-auto group overflow-hidden rounded-xl"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={col.img}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-center justify-between">
                <h3 className="text-white text-base sm:text-lg font-bold drop-shadow">{col.name}</h3>
                <button className="bg-white text-black text-xs font-black tracking-wide px-4 py-2 hover:bg-gray-100 transition-colors flex-shrink-0 ml-3">
                  SHOP NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

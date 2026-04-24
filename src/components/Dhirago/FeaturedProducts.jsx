"use client";

const products = [
  { name: "Full Sleeve Round Neck T-shirt", price: "Rs. 4,583.00", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { name: "Loose T-shirt", price: "Rs. 3,646.00", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80" },
  { name: "Polyester Women Gym Suit", price: "Rs. 4,687.00", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80" },
  { name: "Sleeveless Crop Top", price: "Rs. 6,978.00", img: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&q=80" },
  { name: "Racer Back Sports Top", price: "Rs. 1,563.00", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80" },
  { name: "Skirt Set 3 Pcs", price: "Rs. 5,729.00", img: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=400&q=80" },
  { name: "Crop Top Co-ord Set", price: "Rs. 3,125.00", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80" },
  { name: "Cotton Cropped Trucker", price: "Rs. 2,604.00", img: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=400&q=80" },
];

export default function FeaturedProducts() {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-wide text-black uppercase">New Arrivals</h2>
      </div>
      {/* Mobile: horizontal scroll. Desktop: 8-col grid */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 px-4 sm:px-6 lg:px-8 pb-2 min-w-max lg:min-w-0 lg:grid lg:grid-cols-8">
          {products.map((p, i) => (
            <div
              key={i}
              className="w-40 sm:w-44 lg:w-auto flex-shrink-0 lg:flex-auto group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-50 rounded mb-3">
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
      </div>
    </section>
  );
}

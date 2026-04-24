"use client";
import { useState } from "react";

const items = [
  {
    name: "Stylish Layers",
    img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=700&q=80",
    thumb: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=80&q=80",
  },
  {
    name: "Street Casual",
    img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&q=80",
    thumb: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=80&q=80",
  },
  {
    name: "Power Suit",
    img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700&q=80",
    thumb: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=80&q=80",
  },
];

export default function StyleCraftedSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-neutral-900 py-14 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide uppercase">
            Style Crafted to Perfection
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-xl mx-auto">
            Discover fashion that fits every mood. From casual essentials to statement trends — the perfect style for every occasion.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden rounded-xl max-w-sm mx-auto w-full md:max-w-none">
            <img
              src={items[active].img}
              alt={items[active].name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          {/* Selector buttons */}
          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-4 px-5 py-4 rounded-full text-left transition-all duration-200 ${
                  active === i
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <img
                  src={item.thumb}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <span className="font-bold text-sm sm:text-base tracking-wide">{item.name}</span>
                {active === i && (
                  <svg className="w-4 h-4 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

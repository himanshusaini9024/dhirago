"use client";

const reviewers = [
  { img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80", name: "Alex" },
  { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", name: "Sara" },
  { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80", name: "Lily" },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", name: "Mike" },
  { img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&q=80", name: "James" },
  { img: "https://images.unsplash.com/photo-1546961342-ea5f62d9e7f2?w=100&q=80", name: "Mia" },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-sm mx-auto flex flex-col items-center gap-8">
        {/* Avatar cluster */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64">
          {/* Center lime badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#c8f000] border-4 border-white z-10 flex flex-col items-center justify-center shadow-lg">
            <span className="text-[9px] sm:text-[10px] font-black leading-tight">SALE</span>
            <span className="text-sm sm:text-base font-black leading-tight">50%</span>
            <span className="text-[8px] font-bold leading-tight">OFF</span>
          </div>
          {/* Surrounding avatars */}
          {reviewers.map((r, i) => {
            const angle = (i / reviewers.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 85;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div
                key={i}
                className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-white shadow-md"
                style={{
                  left: `calc(50% + ${x}px - 24px)`,
                  top: `calc(50% + ${y}px - 24px)`,
                }}
              >
                <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Loved by <span className="font-black text-black">10,000+</span> happy customers worldwide
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

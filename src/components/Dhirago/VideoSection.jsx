"use client";

export default function VideoSection() {
  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-3">Our Story in Motion</h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto mb-10">
          Watch how Maya brings together craftsmanship, creativity, and community to redefine modern fashion.
        </p>
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
            alt="Brand story"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-xl">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

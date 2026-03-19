"use client";

const BrandIntro = () => {
  return (
    <section className="relative h-[50vh] min-h-[500px] w-full overflow-hidden">

      {/* 🎬 BACKGROUND VIDEO */}
      <video
        src="/videos/banner.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
        <div className="max-w-2xl">

          {/* SMALL LABEL */}
          <p className="text-white/70 text-xs tracking-[3px] uppercase mb-4">
            Dhirago
          </p>

          {/* MAIN TEXT */}
          <h2 className="text-white text-3xl md:text-5xl font-light tracking-wide leading-snug">
            Defined by Detail. <br />
            Elevated by Craft.
          </h2>

          {/* SUBTEXT */}
          <p className="mt-5 text-white/70 text-sm md:text-base leading-relaxed">
            Designed for those who appreciate refined simplicity and timeless style.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <button className="text-white text-sm tracking-wide border-b border-white pb-1 hover:opacity-70 transition">
              Explore Collection →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandIntro;
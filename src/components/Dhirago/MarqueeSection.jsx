"use client";
const dark = true; 
const slow = true; 

export default function MarqueeSection({ text}) {
  const chunk = `${text}  •  ${text}  •  ${text}  •  `;
  return (
    <div
      className={`overflow-hidden py-3 md:py-4 ${
        dark
          ? "bg-neutral-900 text-white border-y border-neutral-800"
          : "bg-white text-black border-y border-gray-100"
      }`}
    >
      <div className={`flex whitespace-nowrap ${slow ? "animate-marquee-slow" : "animate-marquee"}`}>
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-xl sm:text-2xl md:text-3xl font-black tracking-widest pr-8 flex-shrink-0 select-none"
          >
            {chunk}
          </span>
        ))}
      </div>
    </div>
  );
}

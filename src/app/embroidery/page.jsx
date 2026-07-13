"use client";

import { Josefin_Sans, Cormorant_Garamond } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const processSteps = [
  {
    title: "PANEL MARKING",
    desc: "The journey of every garment begins from here- where fabric panels are carefully cut and marked according to the design blueprint, creating the foundation upon which the handwork unfolds.",
  },
  {
    title: "KHAKHA PINNING",
    desc: "The journey continues with our embroidery artisan, Ahmed bhai and his team. Here, the design is carefully traced onto paper and perforated by hand to create a khakha—a traditional stencil used to transfer the artwork onto the fabric. Serving as the blueprint for the embroidery, it ensures every detail is placed with precision before the handwork begins.",
  },
  {
    title: "CHAPPAI (MARKING THE EMBROIDERY)",
    desc: "Using the khakha as a guide, the design is delicately transferred onto the fabric using choona (lime) for darker fabrics and neel (indigo) for lighter ones. This meticulous process ensures every motif is positioned with precision, creating the foundation for embroidery that unfolds clarity.",
  },
  {
    title: "SETTING THE ADDA",
    desc: "Once marked, fabric is then carefully mounted onto a traditional wooden adda, where it is stretched and secured in place. With the canvas prepared, the embroidery enters its most intricate and time-intensive stage, guided by patience, precision, and skilled craftsmanship.",
  },
  {
    title: "HAND EMBROIDERY",
    desc: "With patience and precision, the embroidery slowly takes shape. Depending on the intricacy of the design, a single panel may require several days of dedicated handwork. Every stitch is executed with care and precision.",
  },
];

const photos = [
  "https://kardo.co/wp-content/uploads/2025/06/DSC00774-1024x1024.jpg",
  "https://kardo.co/wp-content/uploads/2025/06/DSC00825-2-1024x1024.jpg",
  "https://kardo.co/wp-content/uploads/2025/06/DSC00856-1024x1024.jpg",
  "https://kardo.co/wp-content/uploads/2025/06/DSC00757-1024x1024.jpg",
];

export default function HandEmbroideryPage() {
  return (
    <>
      {/* HERO */}
      <section className="w-full leading-none">
        <img
          src="https://kardo.co/wp-content/uploads/2025/06/Hand-embroidery-scaled.jpg"
          alt="Hand Embroidery"
          className="w-full h-auto block max-h-screen object-cover"
        />
      </section>

      {/* WHAT IS HAND EMBROIDERY */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2
                className={`${josefin.className} uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4`}
              >
                A Touch of Embroidery, a Shade of Elegance
              </h2>
              <p
                className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3"
              >
                DHIRAGO works with indigenous textile techniques and natural
                fabrics, integrating time-honoured weaving practices such as,
                Sashiko hand stitching, and Kantha embroidery into its garments.
                Each technique is applied through controlled, manual
                execution—Sashiko through repetitive reinforcement stitching,
                and Kantha through layered running stitches—ensuring precision
                and consistency across construction. We also drew from the
                tradition of miniature art where every motif is created by hand.
                It is here that exquisite craftsmanship meets material
                excellence—where detail is not an addition, but a signature of
                the piece.
              </p>
              <p  className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]">
                These practices are deeply rooted in India&rsquo;s cultural
                heritage and are incorporated with finesse, creating garments
                that remain connected to tradition while expressed with a
                modern sensibility. By continuing these techniques, DHIRAGO
                upholds its commitment to preserving age-old craftsmanship and
                celebrating India&rsquo;s rich textile legacy, presenting
                ethical and heritage-driven making as a form of true luxury
              </p>
            </div>
            <div>
              <div className="w-full max-w-full aspect-video lg:max-w-[340px] lg:aspect-[9/16] overflow-hidden bg-[#111111] ml-auto">
                <video
                  src="https://kardo.co/wp-content/uploads/2025/06/reel-2-2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="pt-16 lg:pt-20 pb-20 lg:pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
          <h2
           className={`${josefin.className} uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] mb-4 text-center`}
          >
            PROCESS
          </h2>
          <div className="max-w-[1020px] mx-auto text-[#464646] tracking-[1.6px]">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className={`mb-11 ${i === processSteps.length - 1 ? "mb-0" : ""}`}
              >
                <span
                    className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3"
                >
                  {step.title}
                </span>
                <span
                   className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] block"
                >
                  {step.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GRID */}
      <div className="grid grid-cols-2 gap-5 max-w-[1200px] mx-auto px-5 lg:px-[60px]">
        {photos.map((src, i) => (
          <div key={i} className="group aspect-[4/3] overflow-hidden leading-none">
            <img
              src={src}
              alt={`Process ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>
        ))}
      </div>

      {/* MEET THE ARTIST */}
      <section className="pt-16 lg:pt-20">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
          <h2
                      className={`${josefin.className} uppercase leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)] text-[#333333] tracking-[0.03em] `}

          >
            MEET THE ARTIST: MOHAMMAD ASHRAF
          </h2>
         
        </div>
      </section>

      <section className="pt-10 lg:pt-12 pb-16 lg:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-start">
            <div>
              <img
                src="https://kardo.co/wp-content/uploads/2025/06/DSC00742-1-844x1024.jpg"
                alt="Mohammad Ashraf"
                loading="lazy"
                className="w-full block"
              />
            </div>
            <div>
              <p
                  className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3"
              >
                Ashraf began his journey with embroidery in the workshops of
                Bombay&apos;s City Centre, where he learned the foundational
                grammar of the needle and frame. He moved to Delhi over two
                decades ago with a friend, both seeking new possibilities. That
                journey led him to jewelry designer Olivia Dar, the wife of our
                founder, Rikki Kher—a meeting that shaped the course of his
                craft. He has worked with her since, and in 2020, joined Kardo.
              </p>
              <p
                 className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em]"
              >
                There&rsquo;s a quiet, deliberate gesture to his way of
                working—each movement unhurried, each decision exacting. The
                needle answers a calm held in his fingers, his attention
                attuned to the subtle pull of the thread. What is drawn forth
                is never rushed, never overstated—only composed, thoughtful,
                and complete in its stillness.
              </p>
              <p
                 className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3"
              >
                More than an artisan at our studio, Ashraf is a custodian of a
                tradition—continuing its evolution, thread by thread, in the
                present.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-14 lg:py-16 border-t border-b border-[#e0e0e0] text-center">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
          <p
             className="font-futura font-light leading-[1.90] text-[clamp(14px,1.3vw,1.01rem)]  text-[#444444] tracking-[0.03em] mb-3"
          >
            &quot;An exceptionally skilled artisan, with the most brilliant
            <br />
            hands—we couldn&apos;t have asked for anyone better.&quot;
          </p>
        </div>
      </section>
    </>
  );
}
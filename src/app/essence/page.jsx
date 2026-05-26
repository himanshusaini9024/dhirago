"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});



function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal();

  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      start += step;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [visible, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const details = [
  {
    num: "01",
    label: "Collar Precision",
    desc:
      "Every collar is cut, interfaced, and pressed to a standard that holds its shape through years of wear — clean, sharp, and quietly authoritative.",
  },
  {
    num: "02",
    label: "Placket Fusing",
    desc:
      "An extra layer of fabric fused to plackets, cuffs, and collars adds structural strength without adding stiffness — a hidden architecture of durability.",
  },
  {
    num: "03",
    label: "Stitch Neatness",
    desc:
      "Every seam is sewn with consistency in tension, spacing, and direction. The inside of a Dhirago garment is as considered as the outside.",
  },
  {
    num: "04",
    label: "Cuff Construction",
    desc:
      "Fused cuffs resist fraying and deformation over time, ensuring the garment maintains its refined appearance with each wear and wash.",
  },
];

export default function EssencePage() {
  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap");

        @keyframes lineGrow {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .font-futura {
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
        }

        .heading-font {
          font-family: ${josefin.style.fontFamily};
        }

        .detail-card {
          border-top: 1px solid #d4c5b0;
          padding: 2rem 0;
          transition: background 0.3s;
        }

        .detail-card:last-child {
          border-bottom: 1px solid #d4c5b0;
        }

        .detail-card:hover .detail-num {
          color: #1c1814;
        }

         .craft-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(1rem, 3vw, 2rem);
          align-items: start;
        }

        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }

          .hero-image {
            min-height: 65vh;
          }

          .craft-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            row-gap: 2.5rem;
          }

          .detail-row {
            grid-template-columns: 60px 1fr !important;
          }

          .detail-desc {
            grid-column: 1 / -1;
            padding-left: 60px;
            margin-top: 1rem !important;
          }
        }

        @media (max-width: 640px) {
          .craft-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .hero-left {
            padding: 4rem 1.5rem !important;
          }

          .floating-stat {
            left: 1.2rem !important;
            right: 1.2rem;
            bottom: 1.2rem !important;
            padding: 1.5rem !important;
          }

          .fusing-stats {
            grid-template-columns: 1fr !important;
          }

          .detail-row {
            grid-template-columns: 1fr !important;
            gap: 0.8rem !important;
          }

          .detail-desc {
            padding-left: 0;
          }

          .quote-text {
            font-size: 1.5rem !important;
          }
        }
      `}</style>

      <div
        style={{
          background: "#FAFAF7",
          color: "#1C1814",
          minHeight: "100vh",
        }}
      >
        {/* HERO */}
        <section
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "100vh",
          }}
        >
          {/* LEFT */}
          <div
            className="hero-left"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(3rem, 8vw, 7rem)",
            }}
          >
            <div style={{ animation: "fadeUp 1s ease 0.2s both" }}>
              <p
                className="font-futura"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.55em",
                  textTransform: "uppercase",
                  color: "#B09880",
                  marginBottom: "1.5rem",
                }}
              >
                Why Dhirago — 01
              </p>
            </div>

            <div style={{ animation: "fadeUp 1s ease 0.4s both" }}>
              <h1
                className="heading-font uppercase"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(2.1rem, 7vw, 1rem)",
                  lineHeight: 1,
                  letterSpacing: "0.08em",
                  color: "#1C1814",
                  marginBottom: "2.5rem",
                }}
              >
                The Essence
                of a Fine
                <br />
                <em
                  style={{
                    color: "#6B5040",
                    fontWeight: 300,
                  }}
                >
                  Garment
                </em>
              </h1>
            </div>

            <div style={{ animation: "fadeUp 1s ease 0.6s both" }}>
              <div
                style={{
                  width: 50,
                  height: 1,
                  background: "#C4A882",
                  marginBottom: "2rem",
                  transformOrigin: "left",
                  animation: "lineGrow 1s ease 0.8s both",
                }}
              />

              <p
                className="font-futura"
                style={{
                  textAlign: "justify",
                  fontSize: "clamp(14px, 1.4vw, 16px)",
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: "#4A4035",
                  maxWidth: 500,
                }}
              >
                Every inch of a Dhirago piece reflects an approach of
                craftsmanship — where precision and attention to details are
                never compromised. It&apos;s evident in how our fabrics feel on
                your skin, to how the collar sits and the neatness of every
                stitch.
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="hero-image"
            style={{
              position: "relative",
              background: "#1C1814",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/subscribe.jpg"
              alt="Fine Garment Craftsmanship"
              fill
              style={{
                objectFit: "cover",
                opacity: 0.75,
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(28,24,20,0.5) 0%, transparent 60%)",
              }}
            />

            <div
              className="floating-stat"
              style={{
                position: "absolute",
                bottom: "3rem",
                left: "3rem",
                background: "rgba(28,24,20,0.85)",
                padding: "2rem 2.5rem",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="heading-font"
                style={{
                  fontSize: "3rem",
                  fontWeight: 300,
                  color: "#F5F0E8",
                  lineHeight: 1,
                }}
              >
                <Counter target={100} suffix="%" />
              </div>

              <p
                className="font-futura"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "#C4A882",
                  marginTop: 8,
                  marginBottom: 0,
                }}
              >
                Handcrafted Precision
              </p>
            </div>
          </div>
        </section>

        {/* CRAFT SECTION */}
       <section
          style={{
            background: "#FAFAF7",
            borderTop: "1px solid #E8E0D0",
            borderBottom: "1px solid #E8E0D0",
            padding: "clamp(3rem, 6vw, 5rem) 0",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>
            <Reveal>
              <p
                className="font-futura"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.55em",
                  textTransform: "uppercase",
                  color: "#000",
                  textAlign: "center",
                  marginBottom: "4rem",
                }}
              >
                The Five Elements of Craft
              </p>
            </Reveal>

            <div className="craft-grid">

              {/* 1 — MATERIALS */}
              <Reveal delay={0}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="20" stroke="#1C1814" strokeWidth="1.2" />
                    <path d="M14 26 C18 20 28 16 36 22 C44 28 46 40 40 46" stroke="#1C1814" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M18 38 C22 32 32 28 40 34" stroke="#1C1814" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M26 14 C24 20 24 32 30 40 C34 46 40 50 44 48" stroke="#1C1814" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M36 12 C36 18 34 28 28 36" stroke="#1C1814" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <line x1="10" y1="48" x2="26" y2="18" stroke="#1C1814" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="14" y1="50" x2="30" y2="20" stroke="#1C1814" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="10" cy="50" r="2" stroke="#1C1814" strokeWidth="1" fill="none" />
                    <circle cx="14" cy="52" r="2" stroke="#1C1814" strokeWidth="1" fill="none" />
                  </svg>
                  <span className="heading-font" style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "#1C1814", fontWeight: 400, textAlign: "center" }}>
                    Materials
                  </span>
                </div>
              </Reveal>

              {/* 2 — FUSING */}
              <Reveal delay={100}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M12 22 L32 14 L52 22 L32 30 Z" stroke="#1C1814" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
                    <path d="M12 32 L32 24 L52 32 L32 40 Z" stroke="#1C1814" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
                    <path d="M12 42 L32 34 L52 42 L32 50 Z" stroke="#1C1814" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="heading-font" style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "#1C1814", fontWeight: 400, textAlign: "center" }}>
                    Fusing
                  </span>
                </div>
              </Reveal>

              {/* 3 — BUTTONS */}
              <Reveal delay={200}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="22" stroke="#1C1814" strokeWidth="1.2" />
                    <circle cx="32" cy="32" r="16" stroke="#1C1814" strokeWidth="0.8" strokeDasharray="3 3" />
                    <circle cx="26" cy="26" r="3" stroke="#1C1814" strokeWidth="1.2" fill="none" />
                    <circle cx="38" cy="26" r="3" stroke="#1C1814" strokeWidth="1.2" fill="none" />
                    <circle cx="26" cy="38" r="3" stroke="#1C1814" strokeWidth="1.2" fill="none" />
                    <circle cx="38" cy="38" r="3" stroke="#1C1814" strokeWidth="1.2" fill="none" />
                  </svg>
                  <span className="heading-font" style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "#1C1814", fontWeight: 400, textAlign: "center" }}>
                    Buttons
                  </span>
                </div>
              </Reveal>

              {/* 4 — STITCHING */}
              <Reveal delay={300}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <line x1="14" y1="50" x2="46" y2="18" stroke="#1C1814" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M44 16 L50 14 L48 20 Z" stroke="#1C1814" strokeWidth="1" strokeLinejoin="round" fill="none" />
                    <ellipse cx="18" cy="46" rx="3.5" ry="2" transform="rotate(-45 18 46)" stroke="#1C1814" strokeWidth="1.1" fill="none" />
                    <path d="M22 42 C28 36 18 24 28 18 C38 12 44 24 36 30 C28 36 34 46 42 44" stroke="#1C1814" strokeWidth="1.1" strokeLinecap="round" fill="none" />
                  </svg>
                  <span className="heading-font" style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "#1C1814", fontWeight: 400, textAlign: "center" }}>
                    Stitching
                  </span>
                </div>
              </Reveal>

              {/* 5 — FINISHING */}
              <Reveal delay={400}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M32 12 C32 12 33 24 40 28 C33 32 32 44 32 44 C32 44 31 32 24 28 C31 24 32 12 32 12 Z" stroke="#1C1814" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
                    <path d="M48 16 C48 16 48.5 20 51 21.5 C48.5 23 48 27 48 27 C48 27 47.5 23 45 21.5 C47.5 20 48 16 48 16 Z" stroke="#1C1814" strokeWidth="1" strokeLinejoin="round" fill="none" />
                    <path d="M18 40 C18 40 18.3 42 19.5 42.8 C18.3 43.6 18 46 18 46 C18 46 17.7 43.6 16.5 42.8 C17.7 42 18 40 18 40 Z" stroke="#1C1814" strokeWidth="0.9" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="heading-font" style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "#1C1814", fontWeight: 400, textAlign: "center" }}>
                    Finishing
                  </span>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* FUSING */}
        <section
          style={{
            background: "#FAFAF7",

            // background:
            //   "linear-gradient(175deg, #0D1B2E 0%, #122338 40%, #152840 100%)",
            padding: "clamp(4rem, 8vw, 7rem) 0",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 clamp(1.5rem, 4vw, 5rem)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: "4rem",
                alignItems: "center",
              }}
            >
              <Reveal>
                <p
                  className="font-futura"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.55em",
                    textTransform: "uppercase",
                    color: "#C4A882",
                    marginBottom: "1.5rem",
                  }}
                >
                  The Technique
                </p>

                <h2
                  className="heading-font"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(2.0rem, 3vw, 2rem)",
                    color: "#000000",
                    lineHeight: 1.1,
                    marginBottom: "2rem",
                  }}
                >
                  The Art of
                  <em style={{ fontStyle: "italic" }}>Fusing</em>
                </h2>

                <p
                  className="font-futura"
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 16px)",
                    fontWeight: 300,
                    lineHeight: 1.9,
                  textAlign: "justify",

                    color: "#000000",
                    marginBottom: "1.5rem",
                  }}
                >
                  All garments are made to maximise wear. An extra layer of
                  fabric is added to plackets, cuffs, and collars to give them
                  added strength — this is called fusing.
                </p>

                <p
                  className="font-futura"
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 16px)",
                    fontWeight: 300,
                  textAlign: "justify",

                    lineHeight: 1.9,
                    color: "#000000",
                  }}
                >
                  It enhances durability while giving the garment a sharper,
                  more refined finish — invisible to the eye, felt in every
                  wearing.
                </p>
              </Reveal>

              <div
                className="fusing-stats"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2px",
                  background: "rgba(196,168,130,0.15)",
                }}
              >
                {[
                  { num: "3×", label: "Placket Strength" },
                  { num: "∞", label: "Wash Retention" },
                  { num: "0mm", label: "Tolerance Error" },
                  { num: "7+", label: "Layers Checked" },
                ].map((stat, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div
                      style={{
                        background: "#1C1814",
                        padding: "2.5rem 2rem",
                        textAlign: "center",
                      }}
                    >
                      <div
                        className="heading-font"
                        style={{
                          fontSize: "2.5rem",
                          fontWeight: 300,
                          color: "#C4A882",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {stat.num}
                      </div>

                      <p
                        className="font-futura"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.35em",
                          textTransform: "uppercase",
                          color: "rgba(245,240,232,0.4)",
                          margin: 0,
                        }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS */}
        <section
          style={{
            padding: "clamp(4rem, 8vw, 7rem) 0",
            background: "#FAFAF7",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 clamp(1.5rem, 4vw, 5rem)",
            }}
          >
            <Reveal>
              <p
                className="font-futura"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.55em",
                  textTransform: "uppercase",
                  color: "#B09880",
                  marginBottom: "4rem",
                }}
              >
                Construction Details
              </p>
            </Reveal>

            {details.map((d, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="detail-card">
                  <div
                    className="detail-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr 2fr",
                      gap: "2rem",
                      alignItems: "start",
                    }}
                  >
                    <span
                      className="detail-num heading-font"
                      style={{
                        fontSize: "1.2rem",
                        color: "#D4C5B0",
                        transition: "color 0.3s",
                      }}
                    >
                      {d.num}
                    </span>

                    <span
                      className="heading-font"
                      style={{
                        fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                        fontWeight: 400,
                        color: "#1C1814",
                      }}
                    >
                      {d.label}
                    </span>

                    <p
                      className="detail-desc font-futura"
                      style={{
                        fontSize: "clamp(14px, 1.4vw, 16px)",
                        fontWeight: 300,
                                          textAlign: "justify",

                        lineHeight: 1.8,
                        color: "#6B5B4E",
                        margin: 0,
                      }}
                    >
                      {d.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* QUOTE */}
        <section
          style={{
            padding: "clamp(4rem, 8vw, 7rem) 0",
            background: "#F0EBE0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: "0 clamp(1.5rem, 4vw, 3rem)",
            }}
          >
            <Reveal>
              <p
                className=" font-futura"
                style={{
                  fontSize: "clamp(0.88rem, 2vw, 1.5rem)",
                  fontWeight: 100,
                  textAlign:"justify",
                  color: "#1C1814",
                  lineHeight: 1.5,
                  marginBottom: "2rem",
                }}
              >
                Everything is thoughtfully done — from how the fabric feels on
                your skin, to how the collar sits, to the neatness of every
                stitch.
              </p>

              <div
                style={{
                  width: 1,
                  height: 60,
                  background:
                    "linear-gradient(to bottom, #C4A882, transparent)",
                  margin: "0 auto",
                }}
              />
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
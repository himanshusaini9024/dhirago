"use client";

import { useState } from "react";
import Link from "next/link";

const COLLECTIONS = [
  {
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85&fit=crop",
    title: "In Linen",
    desc: "Breathe easy in handwoven linen",
    count: "24 pieces",
    href: "/collections/mens-fashion",
  },
  {
    img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=85&fit=crop",
    title: "Indigo Reserve",
    desc: "Ancient dye, modern silhouettes",
    count: "18 pieces",
    href: "/collections/indigo",
  },
  {
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85&fit=crop",
    title: "Between Tones",
    desc: "Earth neutrals for every season",
    count: "31 pieces",
    href: "/collections/earth-tones",
  },
];

export default function CollectionBanner() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ background: "var(--cream)" }}>
      {/* Header */}
      <div style={{ padding: "88px 56px 48px" }}>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 9,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "var(--clay)",
            marginBottom: 12,
          }}
        >
          Curated
        </p>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px, 3.6vw, 50px)",
            fontWeight: 300,
            color: "var(--ink)",
            lineHeight: 1.1,
          }}
        >
          Shop by <em style={{ fontStyle: "italic" }}>Collection</em>
        </h2>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {COLLECTIONS.map((col, i) => (
          <Link key={i} href={col.href}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                style={{
                  aspectRatio: "4/5",
                  position: "relative",
                }}
              >
                {/* IMAGE */}
                <img
                  src={col.img}
                  alt={col.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: hovered === i ? "scale(1.08)" : "scale(1)",
                    transition:
                      "transform 1.6s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />

                {/* OVERLAY */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      hovered === i
                        ? "rgba(28,24,20,0.45)"
                        : "rgba(28,24,20,0.2)",
                    transition: "0.6s ease",
                  }}
                />

                {/* TEXT */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "28px 28px 32px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(253,250,246,0.5)",
                      marginBottom: 8,
                    }}
                  >
                    {col.count}
                  </p>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(28px, 2.8vw, 40px)",
                      fontWeight: 300,
                      color: "#fdfaf6",
                    }}
                  >
                    {col.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 11,
                      color: "rgba(253,250,246,0.6)",
                      marginTop: 6,
                      opacity: hovered === i ? 1 : 0,
                      transform:
                        hovered === i
                          ? "translateY(0)"
                          : "translateY(8px)",
                      transition: "all 0.5s ease",
                    }}
                  >
                    {col.desc}
                  </p>

                  {/* CTA */}
                  <div
                    style={{
                      marginTop: 18,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      opacity: hovered === i ? 1 : 0,
                      transform:
                        hovered === i
                          ? "translateY(0)"
                          : "translateY(10px)",
                      transition: "all 0.5s ease 0.1s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(253,250,246,0.8)",
                      }}
                    >
                      Shop Now
                    </span>

                    <div
                      style={{
                        width: 28,
                        height: 1,
                        background: "#fdfaf6",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
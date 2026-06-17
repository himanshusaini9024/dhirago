"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import LoginDrawer from "../../header/logindashboard";

// ─── Ornamental SVG divider ───────────────────────────────────────────────────
function OrnamentDivider() {
  return (
    <svg
      width="220"
      height="20"
      viewBox="0 0 220 20"
      fill="none"
      style={{ display: "block", margin: "0 auto" }}
    >
      {/* Left arm */}
      <line x1="0" y1="10" x2="80" y2="10" stroke="#C4A882" strokeWidth="0.6" />
      <line x1="72" y1="10" x2="80" y2="5" stroke="#C4A882" strokeWidth="0.6" />
      <line
        x1="72"
        y1="10"
        x2="80"
        y2="15"
        stroke="#C4A882"
        strokeWidth="0.6"
      />
      {/* Centre diamond */}
      <rect
        x="106"
        y="6"
        width="8"
        height="8"
        stroke="#C4A882"
        strokeWidth="0.8"
        transform="rotate(45 110 10)"
        fill="none"
      />
      <rect
        x="108"
        y="8"
        width="4"
        height="4"
        fill="#C4A882"
        transform="rotate(45 110 10)"
      />
      {/* Right arm */}
      <line
        x1="140"
        y1="10"
        x2="220"
        y2="10"
        stroke="#C4A882"
        strokeWidth="0.6"
      />
      <line
        x1="140"
        y1="5"
        x2="148"
        y2="10"
        stroke="#C4A882"
        strokeWidth="0.6"
      />
      <line
        x1="140"
        y1="15"
        x2="148"
        y2="10"
        stroke="#C4A882"
        strokeWidth="0.6"
      />
    </svg>
  );
}

// ─── Corner ornament ──────────────────────────────────────────────────────────
function CornerMark({ flip = false }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      style={{ transform: flip ? "rotate(180deg)" : "none", opacity: 0.35 }}
    >
      <path
        d="M4 4 L4 20 M4 4 L20 4"
        stroke="#C4A882"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M8 8 L8 16 M8 8 L16 8"
        stroke="#C4A882"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Woven linen noise texture ────────────────────────────────────────────────
const noiseDataUri = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`;

export default function LuxurySection() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [loginOpen, setLoginOpen] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const pathname = usePathname();
  const sectionRef = useRef(null);

  const firstName = user?.first_name ?? "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');

        @keyframes shimmerGold {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        @keyframes breathe {
          0%,100% { opacity: 0.55; transform: scaleX(1); }
          50%      { opacity: 1;    transform: scaleX(1.04); }
        }
        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .dhirago-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.85rem 2.6rem;
          border: 1px solid rgba(196,168,130,0.55);
          letter-spacing: 0.38em;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          text-transform: uppercase;
          color: #1C1814;
          background: transparent;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.45s ease, border-color 0.45s ease;
          text-decoration: none;
        }
        .dhirago-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #1C1814;
          transform: translateY(101%);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .dhirago-cta:hover::before  { transform: translateY(0); }
        .dhirago-cta:hover           { color: #F5F0E8; border-color: #1C1814; }
        .dhirago-cta span            { position: relative; z-index: 1; }

        .dhirago-cta .arrow {
          position: relative; z-index: 1;
          width: 14px; height: 1px;
          background: currentColor;
          transition: width 0.4s ease;
          flex-shrink: 0;
        }
        .dhirago-cta .arrow::after {
          content: '';
          position: absolute;
          right: 0; top: -3px;
          width: 6px; height: 6px;
          border-top: 1px solid currentColor;
          border-right: 1px solid currentColor;
          transform: rotate(45deg);
        }
        .dhirago-cta:hover .arrow { width: 22px; }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          background: "#ffffff",
          backgroundImage: noiseDataUri,
          overflow: "hidden",
          borderTop: "1px solid rgba(196,168,130,0.2)",
        }}
      >
        {/* ── Subtle radial glow from centre ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,168,130,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Faint geometric background lines ── */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.04,
            pointerEvents: "none",
          }}
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 800 500"
        >
          {/* Concentric oval rings */}
          {[60, 110, 160, 210, 260].map((r, i) => (
            <ellipse
              key={i}
              cx="400"
              cy="250"
              rx={r * 2.2}
              ry={r}
              stroke="#C4A882"
              strokeWidth="0.5"
              fill="none"
            />
          ))}
          {/* Crossed diagonals */}
          <line
            x1="0"
            y1="0"
            x2="800"
            y2="500"
            stroke="#C4A882"
            strokeWidth="0.4"
          />
          <line
            x1="800"
            y1="0"
            x2="0"
            y2="500"
            stroke="#C4A882"
            strokeWidth="0.4"
          />
        </svg>

        {/* ── Corner ornaments ── */}
        <div style={{ position: "absolute", top: "2rem", left: "2rem" }}>
          <CornerMark />
        </div>
        <div style={{ position: "absolute", bottom: "2rem", right: "2rem" }}>
          <CornerMark flip />
        </div>

        {/* ── Main content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 810,
            margin: "0 auto",
            padding: "clamp(1.5rem, 5vw, 7.3rem) clamp(1.1rem, 4vw, 2rem)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* ─── Logo ─── */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/images/logo/3.svg"
              alt="Logo"
              className="w-[110px] md:w-[130px] opacity-90"
            />
          </motion.div>

          {/* ─── Headline ─── */}

          {/* ─── Ornamental divider ─── */}

          {/* ─── Body copy ─── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.58 }}
            viewport={{ once: true }}
            style={{ marginBottom: "1.75rem" }}
          >
            <p
              className="font-futura lg:font-light font-normal"
              style={{
                fontSize: "clamp(0.725rem, 1.6vw, 1.2rem)",
                lineHeight: 1.6,
                color: "#111111",
                letterSpacing: "0.02em",
                marginBottom: "0.4rem",
              }}
            >
              Label woven in stillness, defined by craftsmanship
            </p>
            <br /><br />
            <p
              className="font-futura"
              style={{
                fontWeight: 300,
                fontSize: "clamp(14px, 1.3vw, 1.1rem)",
                lineHeight: 1.75,
                color: "#111111",
                letterSpacing: "0.03em",
              }}
            >
              There is a certain beauty in slowing down, in noticing the texture
              of a fabric, the character of a handmade detail, the way something
              well-made becomes part of your life.{" "}
            </p>
            <br />
            {/* <p  className="font-futura"
              style={{
                fontWeight: 300,
                fontSize: "clamp(14px, 1.3vw, 1.1rem)",
                lineHeight: 1.75,
                color: "#111111",
                letterSpacing: "0.03em",
              }}>DHIRAGO was born from this way of seeing the world. More than menswear, it is an invitation to embrace simplicity, value craftsmanship, and find meaning in the details.</p> */}
          </motion.div>

          {/* ─── CTA ─── */}

          {/* ─── Bottom tag strip ─── */}
        </div>

        {/* ── Bottom border rule with shimmer ── */}
      </section>

      <LoginDrawer open={loginOpen} setOpen={setLoginOpen} />
    </>
  );
}

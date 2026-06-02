"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const sections = [
  {
    title: "Shopping",
    items: [
      { label: "Order Status",       href: "/order-status" },
      { label: "Shipping & Delivery",href: "/shipping" },
      { label: "Returns",            href: "/returns" },
      { label: "FAQ",                href: "/faq" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us",      href: "/about" },
      { label: "Contact Us",    href: "/contact" },
      { label: "Privacy Policy",href: "/privacy" },
      { label: "Our Office",    href: "/office" },
    ],
  },
];

export default function UltraPremiumFooter() {
  return (
    <>
      <style>{`
        .heading-font { font-family: ${josefin.style.fontFamily}; }
        .font-futura  { font-family: "Century Gothic", Futura, "Trebuchet MS", sans-serif; }

        /* ── Footer grid ──────────────────────────────────── */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem clamp(1.5rem, 4vw, 4rem) 4rem;
        }

        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2.5rem; padding-top: 3.5rem; }
        }

        /* ── Social icons ─────────────────────────────────── */
        .social-icon {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(28,24,20,0.18);
          color: #6B5B4E;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s, color 0.3s;
        }
        .social-icon:hover {
          background: #1C1814;
          border-color: #1C1814;
          color: #E8E0D0;
        }

        /* ── Nav links ────────────────────────────────────── */
        .footer-link {
          position: relative;
          display: inline-block;
          color: #6B5B4E;
          text-decoration: none;
          transition: color 0.3s;
          font-family: "Century Gothic", Futura, "Trebuchet MS", sans-serif;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.02em;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 0; height: 1px;
          background: #1C1814;
          transition: width 0.3s ease;
        }
        .footer-link:hover { color: #1C1814; }
        .footer-link:hover::after { width: 100%; }

        /* ── Divider ──────────────────────────────────────── */
        .footer-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(196,168,130,0.4), transparent);
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Bottom bar ───────────────────────────────────── */
        .footer-bottom {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem clamp(1.5rem, 4vw, 4rem);
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }

        /* ── Newsletter input ─────────────────────────────── */
        .email-input {
          width: 100%;
          border: none;
          border-bottom: 1px solid rgba(28,24,20,0.2);
          background: transparent;
          padding: 0.65rem 0;
          font-family: "Century Gothic", Futura, "Trebuchet MS", sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #1C1814;
          outline: none;
          transition: border-color 0.3s;
        }
        .email-input::placeholder { color: rgba(28,24,20,0.35); }
        .email-input:focus { border-bottom-color: #C4A882; }

        .join-btn {
          margin-top: 1rem;
          padding: 0.65rem 2rem;
          background: #1C1814;
          color: #E8E0D0;
          border: none;
          font-family: ${josefin.style.fontFamily};
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }
        .join-btn:hover { background: #C4A882; color: #1C1814; }
      `}</style>

      <footer style={{ background: "#f2f0ec", color: "#1C1814", position: "relative", overflow: "hidden" }}>

        {/* Subtle warm glow */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(196,168,130,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* ── MAIN GRID ─────────────────────────────────────── */}
        <div className="footer-grid">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Logo / wordmark */}
            <div style={{ marginBottom: "1.5rem" }}>
              <img
                src="/images/logo/3.svg"
                alt="Dhirago"
                style={{ width: 100, marginLeft: -8, opacity: 0.85, marginBottom: "0.75rem" }}
              />
              <p className="font-futura" style={{ fontSize: 12, letterSpacing: "0.55em", textTransform: "uppercase", color: "#111111" }}>
                Dhirago
              </p>
            </div>

            <p className="font-futura" style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.85, color: "#6B5B4E", maxWidth: 240, marginBottom: "2rem" }}>
              Built for dominance in fashion. Designed to stand above the noise.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {[Facebook, Twitter, Instagram, Youtube, MessageCircle].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="social-icon"
                >
                  <Icon size={15} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* NAV LINK COLUMNS */}
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 + 0.1 }}
              viewport={{ once: true }}
            >
              <h3
                className="heading-font"
                style={{
                  fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#1C1814",
                  marginBottom: "1.75rem",
                }}
              >
                {section.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="footer-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* NEWSLETTER + CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3
              className="heading-font"
              style={{
                fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
                fontWeight: 400,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#1C1814",
                marginBottom: "1.75rem",
              }}
            >
              Stay Connected
            </h3>

            <p className="font-futura" style={{ fontSize: 13, fontWeight: 300, color: "#6B5B4E", marginBottom: "1.5rem", lineHeight: 1.7 }}>
              Get exclusive drops, offers &amp; updates.
            </p>

            {/* Newsletter form */}
          
            <button className="join-btn">Subscribe</button>

            {/* Contact details */}
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p className="font-futura" style={{ fontSize: 12, fontWeight: 300, color: "#6B5B4E", letterSpacing: "0.02em" }}>
                contact@dhirago.com
              </p>
              <p className="font-futura" style={{ fontSize: 12, fontWeight: 300, color: "#6B5B4E", letterSpacing: "0.02em" }}>
                +91-8905524932
              </p>
            </div>
          </motion.div>

        </div>

        {/* ── DIVIDER ───────────────────────────────────────── */}
        <div style={{ padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>
          <div className="footer-divider" />
        </div>

        {/* ── BOTTOM BAR ────────────────────────────────────── */}
        <div className="footer-bottom">
          <p className="font-futura" style={{ fontSize: 11, fontWeight: 300, color: "rgba(28,24,20,0.4)", letterSpacing: "0.03em" }}>
            © 2026 Dhirago. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy", "Terms", "Cookies"].map((item, i) => (
              <span
                key={i}
                className="font-futura"
                style={{ fontSize: 11, fontWeight: 300, color: "rgba(28,24,20,0.4)", letterSpacing: "0.04em", cursor: "pointer", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#1C1814"}
                onMouseLeave={e => e.target.style.color = "rgba(28,24,20,0.4)"}
              >
                {item}
              </span>
            ))}
          </div>

          <p className="font-futura" style={{ fontSize: 11, fontWeight: 300, color: "rgba(28,24,20,0.4)", letterSpacing: "0.04em" }}>
            Design by Dhirago.CO
          </p>
        </div>

      </footer>
    </>
  );
}
"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Josefin_Sans } from "next/font/google";
import { useState } from "react";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping and Returns", href: "/shipping-and-return" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Track order", href: "/return/track-order" },
  { label: "Product Care", href: "/product-care" },
  { label: "Size Guide", href: "/size-guide.pdf", target: "_blank" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function UltraPremiumFooter() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage("Thank you for subscribing.");
        setEmail("");
      } else {
        alert(data.message || "Subscription failed");
      }
    } catch (error) {
      setSuccess(false);
      setMessage(data.message || "Subscription failed.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="w-full bg-white border-t border-stone-200">
      {/* ── MAIN 3-COLUMN GRID ─────────────────────────── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-100">
        {/* COL 1 — Newsletter */}
        <motion.div
          className="px-8 lg:py-14 py-5 lg:px-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div style={{ marginBottom: "0.271rem" }}>
            <img
              src="/images/logo/3.svg"
              alt="Dhirago"
              style={{ width: 80, marginLeft: -8, opacity: 0.85 }}
            />
            <p
              className="font-futura"
              style={{
                fontSize: 12,
                letterSpacing: "0.55em",
                textTransform: "uppercase",
                color: "#111111",
              }}
            >
              Dhirago
            </p>
          </div>

          <p
            className="font-futura text-[13px] md:text-[15px]   font-medium"
            style={{
              lineHeight: 1.85,
              color: "#111111",
              maxWidth: "100%",
              marginBottom: "2rem",
            }}
          >
            Built for dominance in fashion. Designed to stand above the noise.
          </p>

          {/* Email input row */}
          <div
            className={`flex items-stretch border border-solid border-black transition-colors duration-200 ${
              focused ? "border-stone-900" : "border-stone-300"
            }`}
          >
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 min-w-0 bg-transparent px-4 py-3 text-[13px] font-light text-stone-900 placeholder:text-stone-400 outline-none"
            />
           
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={loading}
              aria-label="Subscribe"
              className="border-l border-stone-300 px-4 flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white transition-colors duration-200 shrink-0"
            >
              <p>{loading ? "Please wait..." : "Subscribe"}</p>
            </button>
          </div>
           {message && (
              <p
                className={`mt-2 text-xs ${
                  success ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
        </motion.div>

        {/* COL 2 — Logo + Quote */}
        <motion.div
          className="px-8 lg:py-14 lg:px-12 md:order-first lg:order-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Logo + wordmark */}

          <p className="text-[13px] md:text-[15px] font-medium leading-[2.1] text-stone-700  font-futura">
            <em className={`text-[2xl] ${josefin.className}`}>““</em>Dhirago
            designs powerful clothing for those who refuse to blend in —
            statement pieces, bold silhouettes, and styles that invite a second
            glance.<em className={`text-[2xl] ${josefin.className}`}>““</em>
          </p>
        </motion.div>

        {/* COL 3 — Support links */}
        <motion.div
          className="px-8 lg:py-14 py-5 lg:px-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p
            className={`${josefin.className} text-[11px] font-normal tracking-[0.28em] uppercase text-stone-500 lg:text-stone-900 mb-6`}
          >
            Support
          </p>

          <nav aria-label="Support links" className="flex flex-col gap-3">
            {supportLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                target={link.target}
                style={{ color: "#111111" }}
                className="text-[13px] md:text-[15px]   hover:text-stone-700 hover:underline underline-offset-2 transition-colors duration-200 leading-snug"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* ── DIVIDER ────────────────────────────────────── */}
      <div className="px-10 lg:px-[5rem]">
        <hr className="border-t border-stone-800" />
      </div>
      {/* ── BOTTOM BAR ─────────────────────────────────── */}
      <div className="w-full px-8 lg:px-20 lg:py-20  py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-[12.5px] font-medium text-stone-400 tracking-wide">
          © All Rights Reserved 2026 · Dhirago Fashion Pvt Ltd
        </p>

        <div className="flex items-center gap-4 relative left-[70%] lg:left-[0%]">
          {[
            { Icon: Facebook, href: "#", label: "Facebook" },
            { Icon: Twitter, href: "#", label: "Twitter" },
            { Icon: Instagram, href: "#", label: "Instagram" },
          ].map(({ Icon, href, label }, i) => (
            <motion.a
              key={i}
              href={href}
              aria-label={label}
              className="text-stone-800 hover:text-stone-900 transition-colors duration-200"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}

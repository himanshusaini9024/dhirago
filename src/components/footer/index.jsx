"use client";

import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";
import Link from "next/link";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import { useState } from "react";


import { Josefin_Sans } from "next/font/google";

const display = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "300", "300"],
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
const body = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const storyLinks = [
  { label: "About-us", href: "/about" },
  { label: "Collections", href: "/collections/shirts" },

  // { label: "The Beauty of Time", href: "/our-story/philosophy" },
  // { label: "Journal", href: "/journal" },
];

const makingLinks = [
  { label: "Craft Traditions", href: "/pages/better-materials" },
  { label: "Handcrafted Details", href: "/embroidery" },
  { label: "Made to Endure", href: "/sustainability" },
];

const houseLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Care Guide", href: "/product-care" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Shipping & Returns", href: "/shipping-and-return" },
  { label: "FAQ", href: "/faq" },
  { label: "Track order", href: "/return/track-order" },
];


/* Minimal line-art flower mark, echoes the botanical branch below */
function FlowerMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke="#8a7f6d" strokeWidth="0.9">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="20"
            cy="12"
            rx="3.4"
            ry="7"
            transform={`rotate(${deg} 20 20)`}
          />
        ))}
        <circle cx="20" cy="20" r="2.1" fill="#8a7f6d" stroke="none" />
      </g>
    </svg>
  );
}

function PinterestIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path
        d="M9.5 18c.6-2.4 1.2-4.9 1.9-7.6M12 12c0-1.4 1.1-3 3.1-3 2.2 0 3.4 1.6 3.4 3.6 0 2.6-1.3 4.9-3.5 4.9-1 0-1.9-.6-2.2-1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
        setSuccess(false);
        setMessage(data.message || "Subscription failed.");
      }
    } catch (error) {
      setSuccess(false);
      setMessage("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className={`${body.className} w-full`}
      style={{ background: "#F6F2EA" }}
    >
      <div className="max-w-[1280px] mx-auto px-8 md:px-14 pt-[8rem] pb-10">
        {/* Flower mark */}
        {/* <FlowerMark className="w-8 h-8 mb-10" /> */}
        {/* <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/images/logo/3.svg"
              alt="Logo"
              className="relative right-[54px] bottom-[10px]  w-[120px] md:w-[110px] opacity-90"
            />
          </motion.div> */}

        {/* ── 4-COLUMN GRID ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {/* COL 1 — The Story */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <p
              className={`font-futura text-[12px] font-medium tracking-[0.25em] uppercase text-[#2b2620]`}
            >
              The House
            </p>
            <div className="w-6 h-px bg-[#2b2620] mt-3 mb-6" />

            <nav className="flex flex-col gap-4">
              {storyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${display.className} text-[16px] text-[#111111] hover:text-[#8a7f6d] transition-colors duration-200`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
                
            {/* <BranchSprig className="w-24 h-28 mt-8 hidden sm:block" /> */}
          </motion.div>

          {/* COL 2 — The Making */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <p
              className={`font-futura text-[12px]  tracking-[0.25em] uppercase text-[#2b2620]`}
            >
              The Making
            </p>
            <div className="w-6 h-px bg-[#2b2620] mt-3 mb-6" />

            <nav className="flex flex-col gap-4">
              {makingLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${display.className} text-[16px] text-[#111111] hover:text-[#8a7f6d] transition-colors duration-200`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* COL 3 — The House */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p
              className={`font-futura text-[12px] tracking-[0.25em] uppercase text-[#2b2620]`}
            >
              Important Links
            </p>
            <div className="w-6 h-px bg-[#2b2620] mt-3 mb-6" />

            <nav className="flex flex-col gap-4">
              {houseLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${display.className} text-[16px] text-[#111111] hover:text-[#8a7f6d] transition-colors duration-200`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* COL 4 — Stay Connected */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <p
              className={`font-futura text-[12px] tracking-[0.25em] uppercase text-[#2b2620]`}
            >
              Stay Connected
            </p>
            <div className="w-6 h-px bg-[#2b2620] mt-3 mb-6" />

            <p
              className={`${display.className} text-[16px] leading-[1.6] text-[#111111] mb-3`}
            >
              Thoughts on craft, material, and the beauty of time.
            </p>

            <div
              className={`flex items-stretch border border-solid  transition-colors duration-200 ${
                focused ? "border-[#2b2620]" : "border-[#c9c0af]"
              }`}
              style={{ background: "#F6F2EA" }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={`${display.className} flex-1 min-w-0 bg-transparent px-4 py-3 text-[15px] text-[#2b2620] placeholder:text-[#8a7f6d] `}
              />
              <button
                type="button"
                onClick={handleSubscribe}
                disabled={loading}
                aria-label="Subscribe"
                className="px-4 flex items-center justify-center text-[#2b2620] hover:text-[#8a7f6d] transition-colors duration-200 shrink-0"
              >
                {loading ? (
                  <span className={`${display.className} text-[13px]`}>
                    ···
                  </span>
                ) : (
                  <span aria-hidden="true">&#8594;</span>
                )}
              </button>
            </div>

            {message && (
              <p
                className={`mt-2 text-xs ${
                  success ? "text-green-700" : "text-red-700"
                }`}
              >
                {message}
              </p>
            )}

            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="text-[#2b2620] hover:text-[#8a7f6d] transition-colors duration-200"
              >
                <Instagram size={17} strokeWidth={1.4} />
              </a>
              <a
                href="#"
                aria-label="Pinterest"
                className="text-[#2b2620] hover:text-[#8a7f6d] transition-colors duration-200"
              >
                <PinterestIcon size={17} />
              </a>
              <a
                href="mailto:hello@dhirago.com"
                aria-label="Email"
                className="text-[#2b2620] hover:text-[#8a7f6d] transition-colors duration-200"
              >
                <Mail size={17} strokeWidth={1.4} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── DIVIDER ────────────────────────────────────── */}
      <div className="max-w-[1280px] mt-14 mx-auto px-8 md:px-14">
        <hr className="border-t border-[#dcd5c6]" />
      </div>

      {/* ── BOTTOM BAR ─────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-8 md:px-14 pt-6 pb-[6rem]  flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p 
          
            className={`${josefin.className} text-[21px] tracking-[0.2em] text-[#111111]`}
          >
            DHIRAGO
          </p>
          <p className={`${display.className} text-[15px] mt-3 text-[#111111]`}>
            The beauty of time, thoughtfully made.
          </p>
        </div>

       

        <p
          className={`${display.className} text-[13px] text-[#2b2620] order-2 md:order-3`}
        >
          © {new Date().getFullYear()} DHIRAGO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
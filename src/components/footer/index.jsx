"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, Facebook } from "lucide-react";
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

function WhatsAppIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.347-.4.52-.6.174-.198.232-.34.348-.566.116-.225.058-.42-.04-.599-.099-.198-.868-2.098-1.19-2.87-.316-.755-.638-.654-.876-.666-.226-.011-.485-.013-.744-.013-.26 0-.68.098-.923.362-.243.264-.923.902-.923 2.204 0 1.301.947 2.559 1.08 2.735.133.176 1.83 2.794 4.437 3.807 2.605 1.014 2.605.676 3.075.633.47-.043 1.517-.62 1.73-1.219.213-.598.213-1.111.15-1.219-.065-.107-.24-.17-.516-.316zM12.05 22c-1.734 0-3.435-.463-4.912-1.339l-.352-.204-3.66.955.978-3.564-.229-.365A9.918 9.918 0 0 1 2.05 12C2.05 6.51 6.559 2 12.05 2c2.657 0 5.156 1.036 7.032 2.913A9.9 9.9 0 0 1 22 12c0 5.49-4.51 10-9.95 10zm0-22C6.007 0 1.05 4.958 1.05 12c0 2.108.53 4.09 1.46 5.821L0 24l6.393-1.664A10.98 10.98 0 0 0 12.05 24C18.093 24 23 19.042 23 12 23 5.958 18.093 0 12.05 0z" />
    </svg>
  );
}

// function PinterestIcon({ size = 16 }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.6"
//     >
//       <circle cx="12" cy="12" r="9.5" />
//       <path
//         d="M9.5 18c.6-2.4 1.2-4.9 1.9-7.6M12 12c0-1.4 1.1-3 3.1-3 2.2 0 3.4 1.6 3.4 3.6 0 2.6-1.3 4.9-3.5 4.9-1 0-1.9-.6-2.2-1.3"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

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
      style={{ background: "rgba(255,255,255,1.0)" }}
    >
      <div className="max-w-[1280px] mx-auto px-8 md:px-14 md:pt-[8rem] pt-20 pb-10">
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
              className={`font-futura text-[12px] md:text-[12px] font-medium tracking-[0.25em] uppercase text-[#2b2620]`}
            >
              The House
            </p>
            <div className="w-6 h-px bg-[#2b2620] mt-3 mb-6" />

            <nav className="flex flex-col gap-4">
              {storyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${display.className} text-[14px] md:text-[16px] text-[#111111] hover:text-[#8a7f6d] transition-colors duration-200`}
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
                  className={`${display.className} text-[14px] md:text-[16px] text-[#111111] hover:text-[#8a7f6d] transition-colors duration-200`}
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
                  className={`${display.className} text-[14px] md:text-[16px] text-[#111111] hover:text-[#8a7f6d] transition-colors duration-200`}
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
              className={`${display.className} text-[14px] md:text-[16px] leading-[1.6] text-[#111111] mb-3`}
            >
              Thoughts on craft, material, and the beauty of time.
            </p>

            <div
              className={`flex items-stretch border border-solid  transition-colors duration-200 ${
                focused ? "border-[#2b2620]" : "border-[#c9c0af]"
              }`}
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
                href="https://instagram.com/dhirago"
                aria-label="Instagram"
                target="_blank"
                className="text-[#2b2620] hover:text-[#8a7f6d] transition-colors duration-200"
              >
                <Instagram size={17} strokeWidth={1.4} />
              </a>
              <a
                href="#"
                aria-label="Pinterest"
                className="text-[#2b2620] hover:text-[#8a7f6d] transition-colors duration-200"
              >
                <Facebook size={17} />
              </a>
              <a
                href="https://wa.me/918905524932"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2b2620] hover:text-[#8a7f6d] transition-colors duration-200"
              >
                <WhatsAppIcon size={17} />
              </a>
              <a
                href="mailto:contact@dhirago.com"
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
      <div className="max-w-[1280px] mt-1 mx-auto px-8 md:px-14">
        <hr className="border-t border-[#dcd5c6]" />
      </div>

      {/* ── BOTTOM BAR ─────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-8 md:px-14 pt-6 pb-[6rem]  flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p 
          
            className={`${josefin.className}  text-[14px] md:text-[21px] tracking-[0.2em] text-[#111111]`}
          >
            DHIRAGO
          </p>
          <p className={`${display.className} text-[14px] md:text-[15px] mt-3 text-[#111111]`}>
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
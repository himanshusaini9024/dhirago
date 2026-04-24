"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, MessageCircle } from "lucide-react";
import Logo from "../../assets/icons/logo";
import Link from "next/link";

export default function UltraPremiumFooter() {
  return (
    <footer className="relative bg-[rgb(23,23,23,1)] text-neutral-300 overflow-hidden">
      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/10 blur-[120px] rounded-full" />
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 pt-[4rem] md:py-20 grid gap-16 md:grid-cols-2 lg:grid-cols-4">
        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bottom-[3.5rem] md:bottom-[0rem]"
        >
          <div className="mb-6">
            <motion.img
              src="/images/logo/3.svg"
              alt="Logo"
              className="w-[100px] ml-[-36px] md:w-[120px] opacity-90"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[11px] tracking-[0.5em] text-gray-400 mb-4"
            >
              DHIRAGO
            </motion.p>
          </div>

          <p className="text-sm text-neutral-400 font-semibold max-w-sm">
            Built for dominance in fashion. Designed to stand above the noise.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-8">
            {[Facebook, Twitter, Instagram, Youtube,MessageCircle].map(
              (Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                >
                  <Icon size={18} />
                </motion.div>
              ),
            )}
          </div>

           
        </motion.div>

        {/* LINKS */}
        {/* LINKS WRAPPER */}
        <div className="grid grid-cols-2 gap-[6.5rem]  md:contents relative bottom-[5rem] md:bottom-[0rem]">
          {[
            {
              title: "Shopping",
              items: [
                { label: "Order Status", href: "/order-status" },
                { label: "Shipping & Delivery", href: "/shipping" },
                { label: "Returns", href: "/returns" },
                { label: "FAQ", href: "/faq" },
              ],
            },
            {
              title: "Company",
              items: [
                { label: "About us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy policy", href: "/privacy" },
                { label: "Our office", href: "/office" },
              ],
            },
          ].map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <h3 className="text-white font-light mb-4 md:mb-6 text-sm md:text-lg tracking-wide">
                {section.title}
              </h3>

              <ul className="space-y-2 md:space-y-4 text-xs md:text-sm">
                {section.items.map((item, i) => (
                  <li key={i} className="group">
                    <Link
                      href={item.href}
                      className="relative inline-block text-light-800 group-hover:text-white transition"
                    >
                      {item.label}
                      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CONTACT + NEWSLETTER */}
        <div className="grid grid-cols-1 gap-[0rem]  md:contents relative bottom-[5rem] md:bottom-[0rem]">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-white font-light mb-6 text-lg">Stay Connected</h3>

          <p className="text-sm text-neutral-400 mb-6">
            Get exclusive drops, offers & updates.
          </p>

          {/* PREMIUM INPUT */}
          {/* <div className="relative flex items-center border border-white/10 bg-white/5 backdrop-blur-md rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-5 py-3 text-sm outline-none w-full text-white placeholder:text-neutral-500"
            />
            <button className="bg-white text-black px-6 py-3 text-sm font-medium hover:bg-neutral-200 transition">
              Join
            </button>
          </div> */}

          {/* CONTACT */}
          <div className="mt-6 text-sm space-y-2 text-neutral-400">
            <p>store@dhirago.com</p>
            <p>Hotline: +91 9999999999</p>
          </div>
          
        </motion.div>
        </div>
      </div>

      {/* 🔥 DIVIDER WITH GRADIENT */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* 🔥 BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
        <p>© 2026 House My Brand. All rights reserved.</p>

        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map((item, i) => (
            <span
              key={i}
              className="hover:text-white cursor-pointer transition"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="hover:text-white transition">Design by Dhirago.CO</p>
      </div>
    </footer>
  );
}

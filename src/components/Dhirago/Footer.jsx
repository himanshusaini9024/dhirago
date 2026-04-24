"use client";
import { useState } from "react";

const quickLinks = ["HOME", "SEARCH", "COLLECTIONS", "ABOUT US", "NEWS"];
const supportLinks = ["PRIVACY POLICY", "REFUND POLICY", "SHIPPING POLICY", "CONTACT", "FAQ"];
const socialLinks = ["Facebook", "X (Twitter)", "Instagram", "YouTube", "Pinterest"];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand + newsletter */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-2xl font-black tracking-[0.2em] mb-4">MAYA</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Whether you're looking for chic essentials, statement outfits, or casual staples, we've got something to suit every style. Browse fresh arrivals and update your wardrobe today!
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-2.5 flex-1 min-w-0 outline-none focus:border-white/60 transition-colors rounded"
            />
            <button className="bg-white text-black text-xs font-black tracking-wide px-4 py-2.5 hover:bg-gray-100 transition-colors rounded whitespace-nowrap flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-black text-xs tracking-widest mb-5 text-gray-300 uppercase">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors tracking-wide">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-black text-xs tracking-widest mb-5 text-gray-300 uppercase">Support</h4>
          <ul className="space-y-3">
            {supportLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors tracking-wide">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-black text-xs tracking-widest mb-5 text-gray-300 uppercase">Follow Us</h4>
          <ul className="space-y-3">
            {socialLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors flex items-center gap-1.5 group">
                  {l}
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">© 2025 Maya. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Visa", "Mastercard", "UPI", "PayPal", "Stripe"].map((pay) => (
              <span key={pay} className="text-gray-500 text-xs border border-gray-700 px-2 py-1 rounded">
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

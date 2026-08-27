"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <div
      style={{ minHeight: "86vh" }}
      className={`min-h-screen bg-white ${josefin.className}`}
    >
      {/* ── PAGE TITLE BANNER ── */}

      <section className="w-full leading-none">
        <div className="relative w-full sm:h-[320px] md:h-[350px] overflow-hidden rounded-sm">
          <Image
            src={`https://images.dhirago.com/ecommerce/banner/co.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION}`}
            alt="A young man wearing a handwoven muslin shirt by a lakeside"
            width={2000}
            height={800}
            priority
            sizes="100vw"
            unoptimized
            className="block h-auto w-full object-contain object-center"
          />
          <div className="absolute inset-0  lg:top-[9rem] top-[4rem] flex items-center justify-center bg-black/1">
            <h1
              className="text-white  text-sm sm:text-2xl md:text-2xl font-medium tracking-[0.1em] drop-shadow-xl"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.35)" }}
            >
              CONTACT US
            </h1>
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
        <p className="text-[12px] text-stone-900 tracking-wide">
          Home &nbsp;›&nbsp; <span className="text-stone-900">Contact us</span>
        </p>
      </div>

      {/* ── MAIN CONTENT — capped width so it never stretches full-bleed ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 pb-24">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-24 items-start">
          {/* LEFT — Form (no labels, no heading, no border box) */}
          <div className="w-full lg:max-w-[440px] flex flex-col gap-5">
            <h2 className="text-[22px] font-normal text-stone-900 mb-2 tracking-tight">
              Drop Us a Message
            </h2>
            {/* Name + Email row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="flex-1 min-w-0 border border-solid border-stone-400 rounded-[2px] px-4 py-3 text-[13px] font-light text-stone-800 placeholder:text-stone-400 outline-none focus:border-stone-900 transition-colors duration-200 bg-white"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="flex-1 min-w-0 border border-solid border-stone-400 rounded-[2px] px-4 py-3 text-[13px] font-light text-stone-800 placeholder:text-stone-400 outline-none focus:border-stone-900 transition-colors duration-200 bg-white"
              />
            </div>

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-solid border-stone-400 rounded-[2px] px-4 py-3 text-[13px] font-light text-stone-800 placeholder:text-stone-400 outline-none focus:border-stone-900 transition-colors duration-200 bg-white"
            />

            {/* Message */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={7}
              className="w-full border border-solid border-stone-400 rounded-[2px] px-4 py-3 text-[13px] font-light text-stone-800 placeholder:text-stone-400 outline-none focus:border-stone-900 transition-colors duration-200 bg-white resize-none min-h-[180px]"
            />

            {status === "success" && (
              <p className="text-[11px] tracking-wide text-green-700">
                ✓ Message sent successfully
              </p>
            )}
            {status === "error" && (
              <p className="text-[11px] tracking-wide text-red-500">
                ✗ Something went wrong. Please try again.
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-stone-900 text-white py-3.5 text-[12px] font-normal tracking-[0.3em] uppercase hover:bg-stone-700 transition-colors duration-300 disabled:opacity-50 rounded-[2px]"
            >
              {loading ? "SENDING…" : "SEND"}
            </button>
          </div>

          {/* RIGHT — Info */}
          <motion.div
            className="w-full lg:max-w-[680px] shrink-0 flex flex-col gap-6 lg:pt-12"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h3 className="text-[13px] mb-2 font-bold text-stone-900 tracking-wide">
                FOR ORDER QUERIES:
              </h3>
              <a
                href="mailto:contact@dhirago.com"
                className="text-[13px] font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                contact@dhirago.com
              </a>
            </div>

            <div>
              <h3 className="text-[13px] mb-2 font-bold text-stone-900 tracking-wide">
                Social Contact:
              </h3>
              <a
                target="_blank"
                href="https://instagram.com/dhirago_"
                className="text-[13px] font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                @Dhirago_
              </a>
            </div>

            <div>
              <h3 className="text-[13px] mb-2 font-bold text-stone-900 tracking-wide">
                FOR A CHAT:
              </h3>
              <a
                href="tel:+918905524932"
                className="text-[13px] font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                +91 8905524932,
              </a>
              <p className="text-[13px] mt-2 font-medium text-stone-700">
                Monday – Saturday, [10am – 7pm]
              </p>
            </div>

            <div>
              <h3 className="text-[13px]  mb-2 font-bold text-stone-900 tracking-wide mb-1">
                BY APPOINTMENT:
              </h3>
              <p className="text-[13px] font-medium text-stone-700">
                DHIRAGO FASHION PRIVATE LIMITED
              </p>
              <p className="text-[13px] font-medium text-stone-600 leading-relaxed mt-2">
                FLAT NO.502 ARCHI THE DIVINE,Udaipur City
                <br />
                Udaipur, Rajasthan 313002 India
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Josefin_Sans } from "next/font/google";
import { Phone, Mail, AlertCircle } from "lucide-react";
import Image from "next/image";
const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else setStatus("error");
    } catch { setStatus("error"); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"86vh"}} className={`min-h-screen  lg:h-screen-[80vh] bg-white ${josefin.className}`}>

      {/* ── PAGE TITLE BANNER ── */}
      <div className="relative w-full h-[240px]   sm:h-[320px] md:h-[350px] overflow-hidden rounded-sm">
                 <Image
                   src="/images/european-linen.jpg"
                   alt="EUROPEAN LINEN"
                   fill
                   className="w-full h-full md:px-10  object-cover"
                   
                 />
                   <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-sky-100 to-blue-300" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/1">
              <h3
                className="text-white text-xl sm:text-2xl md:text-3xl font-medium tracking-[0.2em] drop-shadow-xl"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.35)" }}
              >
               CONTACT US
              </h3>
            </div>
      </div>
      

      {/* ── BREADCRUMB ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-4">
        <p className="text-[12px] text-stone-400 tracking-wide">
          Home &nbsp;›&nbsp; <span className="text-stone-600">Contact us</span>
        </p>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="lg:max-w-[76%] max-w-6px mx-auto px-6 md:px-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* LEFT — Info bar + Map */}
          <div className="flex-1 border border-stone-200">

            {/* Contact info bar */}
            <div className="flex flex-col sm:flex-row sm:divide-x divide-stone-200 border-b border-stone-200">
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center shrink-0">
                  <Phone size={13} className="text-stone-600" />
                </div>
                <p className="text-[12px] font-light text-stone-600">
                  +91-8905524932 Mon – Sat, 10 AM – 7 PM IST
                </p>
              </div>

              <div className="flex items-center gap-3 px-5 py-4">
                <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center shrink-0">
                  <Mail size={13} className="text-stone-600" />
                </div>
                <p className="text-[12px] font-light text-stone-600">
                  contact@dhirago.com
                </p>
              </div>

              <div className="flex items-center gap-3 px-5 py-4">
                <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center shrink-0">
                  <AlertCircle size={13} className="text-stone-600" />
                </div>
                <p className="text-[12px] font-light text-stone-600">
                  escalation@dhirago.com Typical response in 24 hours
                </p>
              </div>
            </div>

            {/* Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6063.807756469185!2d73.70282194750479!3d24.571471576492037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5000703e1d7%3A0x48989a03f4f52743!2sDHIRAGO%20FASHION%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1779878374563!5m2!1sen!2sin"
              className="w-full h-[400px] md:h-[460px] block border-none"
              title="Dhirago Location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* RIGHT — Form */}
          <motion.div
            className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col border border-stone-200"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-7 pt-8 pb-6 flex flex-col gap-5 flex-1">
              <h2 className="text-[22px] font-normal text-stone-900 mb-2 tracking-tight">
                Drop Us a Message
              </h2>

              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-normal text-stone-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="border border-solid border-stone-400 px-3 py-2.5 text-[13px] font-light text-stone-800 placeholder:text-stone-300 outline-none focus:border-stone-800 transition-colors duration-200 bg-white"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-normal text-stone-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="border border-solid border-stone-400 px-3 py-2.5 text-[13px] font-light text-stone-800 placeholder:text-stone-300 outline-none focus:border-stone-800 transition-colors duration-200 bg-white"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-normal text-stone-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="border border-solid border-stone-400 px-3 py-2.5 text-[13px] font-light text-stone-800 placeholder:text-stone-300 outline-none focus:border-stone-800 transition-colors duration-200 bg-white"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-normal text-stone-700">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message"
                  required
                  rows={6}
                  className="border border-solid border-stone-400 px-3 py-2.5 text-[13px] font-light text-stone-800 placeholder:text-stone-300 outline-none focus:border-stone-800 transition-colors duration-200 bg-white resize-none"
                />
              </div>

              {status === "success" && (
                <p className="text-[11px] tracking-wide text-green-700">✓ Message sent successfully</p>
              )}
              {status === "error" && (
                <p className="text-[11px] tracking-wide text-red-500">✗ Something went wrong. Please try again.</p>
              )}
            </div>

            {/* Send button — full width, dark, pinned bottom */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-stone-900 text-white py-4 text-[11px] font-normal tracking-[0.4em] uppercase hover:bg-stone-700 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "SENDING…" : "SEND MESSAGE"}
            </button>
          </motion.div>

        </div>
      </div>

    </div>
  );
}
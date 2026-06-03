"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const rotateX = useTransform(mouseY, [0, typeof window !== "undefined" ? window.innerHeight : 800], [3, -3]);
  const rotateY = useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1200], [-3, 3]);

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
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f5f2] font-[Montserrat,sans-serif] relative overflow-x-hidden">

      {/* ── AMBIENT ORBS ── */}
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(160,120,64,0.07)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-[-150px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(160,120,64,0.05)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />

      {/* ── GRID TEXTURE ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10">

        {/* ── HERO HEADER ── */}
        <motion.div
          className="text-center px-5 pt-24 pb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="block w-8 h-px bg-[#a07840] opacity-50" />
            <span className="text-[9px] font-semibold tracking-[0.5em] uppercase text-[#a07840]">Get in Touch</span>
            <span className="block w-8 h-px bg-[#a07840] opacity-50" />
          </div>

          <h1
            className="font-light leading-[0.92] tracking-tight text-[#1a1a1a] mb-7"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(52px, 9vw, 50px)" }}
          >
            Let&apos;s{" "}
            <em className="italic text-[#a07840]">Connect</em>
          </h1>

          <p className="text-[13px] font-light tracking-[0.06em] text-[#555] max-w-sm mx-auto leading-[1.8]">
            We&apos;d love to hear from you — let&apos;s build something remarkable together.
          </p>
        </motion.div>

        {/* ── DIVIDER ── */}
        <div className="max-w-6xl mx-auto px-5 md:px-16">
          <hr className="border-none border-t border-black/8 h-px bg-black/8" />
        </div>

        {/* ── MAIN GRID ── */}
        <div className="max-w-6xl mx-auto px-5 md:px-16 py-14  grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-20 items-start">

          {/* ── INFO CARD ── */}
          <motion.div
            className="bg-white border border-black/8 p-9 md:p-14 relative overflow-hidden"
            style={mounted ? { rotateX, rotateY, transformPerspective: 1200 } : {}}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gold top border */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#a07840] to-transparent" />

            <p className="text-[8px] font-semibold tracking-[0.5em] uppercase text-[#a07840] mb-6">Our Location</p>
            <h2
              className="font-light leading-[1.2] text-[#1a1a1a] mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(22px, 3vw, 34px)" }}
            >
              Visit Our Studio
            </h2>
            <p className="text-[11px] font-light tracking-[0.05em] text-[#555] leading-[1.7] mb-12">
              Open Monday – Saturday, 10am to 7pm IST
            </p>

            {[
              {
                label: "Address",
                value: "3rd Floor, New Electric Market\n120 ft Road, A.M Business Center\nMali Colony, Udaipur, Rajasthan 313002",
              },
              { label: "Phone",         value: "+91-8905524932" },
              { label: "Email",         value: "contact@dhirago.com" },
              { label: "Response Time", value: "Within 24 hours on working days" },
            ].map((item) => (
              <div key={item.label} className="py-5 border-t border-black/8 last:border-b last:border-black/8">
                <p className="text-[8px] font-semibold tracking-[0.45em] uppercase text-[#a07840] mb-2">{item.label}</p>
                <p className="text-[13px] font-light text-[#1a1a1a] leading-[1.65] tracking-[0.02em] whitespace-pre-line">{item.value}</p>
              </div>
            ))}

            {/* Watermark deco */}
            <span
              className="absolute bottom-[-20px] right-[-8px] text-[120px] font-light italic leading-none select-none pointer-events-none text-[#a07840]/[0.05]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >D</span>
          </motion.div>

          {/* ── FORM CARD ── */}
          <motion.div
            className="bg-white border border-black/8 p-9 md:p-14 relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gold top border */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#a07840] to-transparent" />

            <p className="text-[8px] font-semibold tracking-[0.5em] uppercase text-[#a07840] mb-6">Drop a Message</p>
            <h2
              className="font-light leading-[1.2] text-[#1a1a1a] mb-12"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(22px, 3vw, 34px)" }}
            >
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-9">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
                <Field name="name"  label="Full Name"      value={form.name}  onChange={handleChange} />
                <Field name="email" label="Email Address"  type="email" value={form.email} onChange={handleChange} />
              </div>

              <Field name="subject" label="Subject" value={form.subject} onChange={handleChange} />
              <TextareaField name="message" label="Your Message" value={form.message} onChange={handleChange} />

              <div className="flex items-center gap-6 flex-wrap pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative overflow-hidden border border-[#a07840] text-[#a07840] px-10 py-4 text-[10px] font-medium tracking-[0.4em] uppercase transition-colors duration-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-[#a07840] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                  <span className="relative z-10 flex items-center gap-3">
                    {loading ? "Sending..." : "Send Message"}
                    {!loading && <span className="text-sm">→</span>}
                  </span>
                </button>

                {status === "success" && (
                  <p className="text-[11px] tracking-[0.1em] text-green-700">✓ Message sent successfully</p>
                )}
                {status === "error" && (
                  <p className="text-[11px] tracking-[0.1em] text-red-600">✗ Something went wrong. Please try again.</p>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        {/* ── MAP — FULL WIDTH ── */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label bar */}
          <div className="max-w-6xl mx-auto px-5 md:px-16 mb-6 flex items-center gap-5">
            <p className="text-[8px] font-semibold tracking-[0.5em] uppercase text-[#a07840] whitespace-nowrap">Find Us</p>
            <div className="flex-1 h-px bg-gradient-to-r from-black/8 to-transparent" />
          </div>

          {/* Full-width map wrapper */}
          <div className="relative w-full border-y border-black/8">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#a07840] to-transparent z-10" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6063.807756469185!2d73.70282194750479!3d24.571471576492037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5000703e1d7%3A0x48989a03f4f52743!2sDHIRAGO%20FASHION%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1779878374563!5m2!1sen!2sin"
              className="w-full h-[420px] md:h-[500px] block border-none grayscale contrast-90"
              title="Dhirago Location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* ── FOOTER STRIP ── */}
        <div className="max-w-6xl mx-auto px-5 md:px-16 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-black/8">
          <p className="text-[10px] font-light tracking-[0.15em] text-[#999]">
            © 2026 Dhirago Fashion Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Instagram"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[9px] font-normal tracking-[0.3em] uppercase text-[#999] hover:text-[#a07840] transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Field components ── */
function Field({ label, type = "text", name, value, onChange }) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder=" "
        className="peer w-full bg-transparent border-b border-black/15 pb-3 pt-3 text-[13px] font-light text-[#1a1a1a] outline-none focus:border-[#a07840] transition-colors duration-300 tracking-[0.03em]"
      />
      <label className="absolute left-0 top-3 text-[10px] font-medium tracking-[0.35em] uppercase text-[#999] transition-all duration-250 pointer-events-none peer-focus:-top-3.5 peer-focus:text-[8px] peer-focus:text-[#a07840] peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#a07840]">
        {label}
      </label>
    </div>
  );
}

function TextareaField({ label, name, value, onChange }) {
  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required
        rows={4}
        placeholder=" "
        className="peer w-full bg-transparent border-b border-black/15 pb-3 pt-3 text-[13px] font-light text-[#1a1a1a] outline-none focus:border-[#a07840] transition-colors duration-300 tracking-[0.03em] resize-none"
      />
      <label className="absolute left-0 top-3 text-[10px] font-medium tracking-[0.35em] uppercase text-[#999] transition-all duration-250 pointer-events-none peer-focus:-top-3.5 peer-focus:text-[8px] peer-focus:text-[#a07840] peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#a07840]">
        {label}
      </label>
    </div>
  );
}
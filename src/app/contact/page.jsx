"use client";

import { Montserrat } from "next/font/google";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function UltraPremiumContactGodLevel() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const rotateX = useTransform(mouseY, [0, window.innerHeight], [6, -6]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-6, 6]);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Message sent successfully!");
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("❌ Failed to send message");
      }
    } catch (err) {
      setStatus("❌ Server error");
    }

    setLoading(false);
  };

  return (
    <div className={`${montserrat.className} min-h-screen relative overflow-hidden text-white`}>

      {/* HEADING */}
      <div className="relative z-10 text-center pt-16">
        <h1 className="text-5xl md:text-6xl font-light bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          We’d love to hear from you — let’s build something amazing.
        </p>
      </div>

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2070"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16">

        {/* LEFT */}
        <motion.div
          style={{ rotateX, rotateY }}
          className="bg-black/80 border border-white/10 rounded-3xl p-12"
        >
          <h2 className="text-3xl text-white font-bold mb-6">Build Something Legendary</h2>
          <p className="text-gray-300 mb-12">
            We craft elite digital experiences. Let’s connect.
          </p>

          <div className="space-y-6">
            <Info label="Address" value="Udaipur, Rajasthan" />
            <Info label="Phone" value="+91 12345 67890" />
            <Info label="Email" value="contact@email.com" />
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div className="bg-black/80 border border-white/10 rounded-3xl p-12">
          <h3 className="text-3xl text-white font-semibold mb-10">Send Message</h3>

          <form onSubmit={handleSubmit} className="space-y-8">

            <Input name="name" value={form.name} onChange={handleChange} label="Full Name" />
            <Input name="email" value={form.email} onChange={handleChange} label="Email Address" />
            <Input name="subject" value={form.subject} onChange={handleChange} label="Subject" />
            <Textarea name="message" value={form.message} onChange={handleChange} label="Your Message" />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold"
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>

            {/* STATUS */}
            {status && (
              <p className="text-center mt-4 text-sm text-gray-300">
                {status}
              </p>
            )}
          </form>
        </motion.div>
      </div>

      {/* MAP */}
      <div className="relative z-10 px-6 pb-24">
        <iframe
          src="https://www.google.com/maps?q=Udaipur,Rajasthan&output=embed"
          className="w-full h-[400px] rounded-3xl border border-white/10"
        />
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="relative">
      <input
        {...props}
        required
        className="peer w-full bg-transparent border-b border-gray-500 py-3 outline-none focus:border-cyan-400"
      />
      <label className="absolute left-0 top-3 text-gray-400 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-3 peer-valid:text-xs">
        {label}
      </label>
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="relative">
      <textarea
        {...props}
        required
        rows="4"
        className="peer w-full bg-transparent border-b border-gray-500 py-3 outline-none focus:border-cyan-400"
      />
      <label className="absolute left-0 top-3 text-gray-400 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-3 peer-valid:text-xs">
        {label}
      </label>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  );
}
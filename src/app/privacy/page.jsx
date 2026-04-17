"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function PrivacyPolicyPage() {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // cursor glow
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="bg-white text-black min-h-screen transition-colors duration-500">
      {/* Cursor Glow */}
      <div
        className="fixed w-[300px] h-[300px] pointer-events-none rounded-full blur-[120px] opacity-20 bg-purple-400 z-0"
        style={{ left: pos.x - 150, top: pos.y - 150 }}
      />

      {/* Progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 origin-left z-50"
      />

      <div className="flex max-w-7xl mx-auto px-6 md:px-12 py-16 gap-10 relative z-10">
        {/* Sidebar */}
        <div className="hidden xl:block w-1/4 sticky top-24 h-fit">
          <div className="space-y-4">
            {sections.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: "smooth" });
                  setActive(i);
                }}
                className={`block text-left w-full text-sm tracking-wide transition-all duration-300 ${
                  active === i
                    ? "text-black translate-x-2 font-medium"
                    : "text-gray-500 hover:text-black hover:translate-x-1"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 space-y-12">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-3xl font-light leading-tight bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="mt-6 text-gray-600 max-w-2xl text-lg">
              Built with transparency, security, and trust at its core.
            </p>
          </motion.div>

          {/* Sections */}
          {sections.map((section, index) => (
            <GlassCard key={index} index={index} title={section.title} content={section.content} />
          ))}

          {/* Footer */}
          <div className="text-sm text-gray-500 mt-20">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

function GlassCard({ title, content, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      id={`section-${index}`}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl border border-gray-200 bg-white/70 backdrop-blur-xl overflow-hidden group shadow-lg hover:shadow-xl"
    >
      {/* glow border */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-purple-200/40 via-pink-200/40 to-indigo-200/40 blur-xl" />

      <button
        onClick={() => setOpen(!open)}
        className="relative w-full flex justify-between items-center p-8 text-left z-10"
      >
        <h2 className="text-xl md:text-2xl font-semibold text-black">{title}</h2>
        <span className="text-gray-400 text-xl">{open ? "−" : "+"}</span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="px-8 overflow-hidden"
      >
        <p className="pb-8 text-gray-600 leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </motion.div>
    </motion.div>
  );
}

const sections = [
  { title: "Information We Collect", content: "We collect personal and technical data including name, email, IP, and usage patterns." },
  { title: "How We Use Data", content: "Used to improve services, enhance UX, and ensure platform security." },
  { title: "Cookies", content: "Cookies personalize and analyze traffic. Manage via browser." },
  { title: "Data Sharing", content: "No selling of data. Only trusted partners." },
  { title: "Security", content: "Advanced safeguards protect your data." },
  { title: "Your Rights", content: "Access, update, delete anytime." },
  { title: "Policy Updates", content: "We may update periodically." },
  { title: "Contact", content: "Reach us anytime." },
];

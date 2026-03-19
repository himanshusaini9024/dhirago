"use client";
import { useState } from "react";
import Image from "next/image";

export default function LoginPopup({ isOpen, onClose }) {
  const [mobile, setMobile] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
      {/* MAIN MODAL */}
      <div className="relative w-[950px] max-w-[95%] h-[520px] bg-white rounded-2xl overflow-hidden flex shadow-2xl">
        
        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl z-10"
        >
          ✕
        </button>

        {/* 🖼️ LEFT IMAGE SECTION */}
        <div className="w-1/2 hidden md:block relative">
          <Image
            src="/images/portrait.jpg"
            alt="Login Banner"
            fill
            className="object-cover"
          />

          {/* Overlay content */}
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-semibold tracking-wide">
              Timeless Living
            </h3>
            <p className="text-sm opacity-90">
              Crafted for modern homes
            </p>
          </div>
        </div>

        {/* 🔐 RIGHT FORM SECTION */}
        <div className="w-full md:w-1/2 px-10 py-8 flex flex-col justify-center">
          
          {/* 🏷️ BRAND */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-[3px]">
              DHIRAGO
            </h1>
            <p className="text-xs text-gray-400 tracking-widest">
              PREMIUM Craft
            </p>
          </div>

          {/* 🔐 TITLE */}
          <h2 className="text-xl font-semibold mb-4">
            Login or Signup
          </h2>

          {/* 📱 INPUT */}
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-black transition"
          />

          {/* 📄 TERMS */}
          <p className="text-xs text-gray-500 mb-5 leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="text-black underline cursor-pointer">
              Terms of Use
            </span>{" "}
            &{" "}
            <span className="text-black underline cursor-pointer">
              Privacy Policy
            </span>
          </p>

          {/* 🔘 BUTTON */}
          <button
            className={`w-full py-3 rounded-lg text-white tracking-wide transition ${
              mobile.length === 10
                ? "bg-black hover:bg-gray-900"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={mobile.length !== 10}
            onClick={() => {
              localStorage.setItem("isLoggedIn", "true");
              onClose();
            }}
          >
            CONTINUE
          </button>

          {/* 🔽 EXTRA */}
          <p className="text-xs text-gray-400 mt-4 text-center">
            Get exclusive offers & early access
          </p>
        </div>
      </div>
    </div>
  );
}
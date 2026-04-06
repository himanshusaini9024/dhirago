"use client";

import { useState, useRef, useEffect } from "react";

export default function FilterDropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="text-[13px] uppercase tracking-wide border-b border-transparent hover:border-black transition pb-1"
      >
        {label}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute left-0 mt-3 w-[200px] bg-white border border-gray-200 rounded-xl shadow-2xl p-4 transition-all duration-200 ease-out">
          {children}
        </div>
      )}
    </div>
  );
}

export function CheckboxItem({ label, checked, onChange }) {
  return (
    <label
      onClick={onChange}
      className="flex items-center gap-3 cursor-pointer py-2 text-[13px] text-gray-600 hover:text-black transition"
    >
      <div className="w-4 h-4 border border-gray-400 flex items-center justify-center">
        {checked && <div className="w-2 h-2 bg-black"></div>}
      </div>
      {label}
    </label>
  );
}
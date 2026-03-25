"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const LoginDropdown = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  // smooth hover handling (prevents flicker)
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150); // delay to avoid flicker
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Avatar */}
      <button>
        <i className="icon-avatar text-[18px]"></i>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border
            overflow-hidden z-[999]
            transition-all duration-200
          "
        >
          {/* USER INFO */}
          {/* <div className="px-4 py-3 border-b bg-gray-50">
            <p className="text-sm font-semibold">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || ""}
            </p>
          </div> */}

          {/* MENU */}
          <Link
            href="/account"
            className="block px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;
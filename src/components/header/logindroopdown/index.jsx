"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, User, Heart } from "lucide-react";

const TRANSPARENT_HERO_PAGES = ["/", "/pages/better-materials","/embroidery",
  "/sustainability"];
const LoginDropdown = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);

  const timeoutRef = useRef(null);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const isHeroPage = TRANSPARENT_HERO_PAGES.includes(pathname);

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
          className={`          
            absolute right-0 mt-3 w-56  rounded-xs shadow-2xl border
            overflow-hidden z-[999]
            transition-all duration-200

            ${isHeroPage && scrolled ? "bg-white" : "bg-white text-black"}

          `}
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
            className={`block px-4 py-2 text-sm transition-colors duration-200
            ${isHeroPage && scrolled ? "hover:bg-black hover:text-white" : "hover:bg-black hover:text-white"}
              
              `}
          >
            <span className="flex gap-[9px]">
          <LayoutDashboard size={18} />


            Dashboard
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200  ${isHeroPage && scrolled ? "hover:bg-black hover:text-white" : "hover:bg-black hover:text-white"}`}
          >
               <span className="flex gap-[9px]">
          <User size={18} />


            Logout
            </span>
            
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;

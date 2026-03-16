"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Logo from "../../assets/icons/logo";

const Header = () => {
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const [megaMenu, setMegaMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
  const timeoutRef = useRef(null);
  const searchRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // handle search close
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setMegaMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setMegaMenu(false), 200);
  };

    const closeSearch = () => {
    setSearchOpen(false);
  };

  
  return (
    <header
      className={`w-full absolute top-0 left-0 z-50 transition-all duration-300
        ${megaMenu ? "!bg-white !text-black shadow-md" : "text-white"}`}
    >
      <div className="w-full">
        <div className="max-w-[90%] mx-auto px-6 flex items-center h-20 justify-between">

          {/* LEFT MENU (Desktop Only) */}
          <nav className="!hidden lg:!flex flex-1 items-center justify-center gap-6 text-sm font-medium tracking-wide">
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-yellow-400 transition ">Men</button>
            </div>
            <Link href="#" className="hover:text-yellow-400 transition">Home</Link>
            <Link href="#" className="hover:text-yellow-400 transition">Beauty</Link>
          </nav>

          {/* CENTER LOGO */}
          <div className="flex justify-center flex-1">
            <Link href="/" className="flex items-center gap-2 site-logo">
              <Logo />
<span className="font-bold text-xl tracking-wider">
  Dhirago
</span>            </Link>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex flex-1 justify-end items-center gap-6">
            {/* SEARCH */}
           <button
            ref={searchRef}
            className={`search-form-wrapper ${searchOpen ? "search-form--active" : ""}`}
          >
            <form className="search-form">
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              />
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            />
          </button>

            {/* CART */}
            <Link href="/cart" className="relative">
              <button className="text-lg hover:text-yellow-400">
                <i className="icon-cart"></i>
              </button>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* USER */}
            <Link href="/login">
              <button className="text-lg hover:text-yellow-400">
                <i className="icon-avatar"></i>
              </button>
            </Link>

            {/* MOBILE HAMBURGER */}
            <button
              className="lg:hidden flex flex-col gap-1 p-2"
              onClick={() => setMenuOpen(true)}
            >
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP MEGA MENU */}
      {megaMenu && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-full !bg-white text-black shadow-lg font-sans"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-12 gap-12 relative left-[10%] top-[-5px]">

            {/* LEFT SIDE MENUS */}
            <div className="col-span-7 grid grid-cols-3 gap-8 text-sm font-medium">

              {/* FEATURED */}
              <div>
                <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-6 font-semibold">
                  Featured
                </h3>
              <ul className="text-gray-700 font-medium text-[15px]">
                  {[
                    "Special Prices",
                    "New Arrivals",
                    "Bestsellers",
                    "Back in Stock",
                    "Foundational Prices",
                    "Shop All"
                  ].map((item) => (
                    <li key={item} className="!py-3">
                      <Link
                        href="#"
                        className="hover:text-yellow-500 hover:underline transition duration-200"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CATEGORIES */}
              <div>
                <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-4 font-semibold">
                  Categories
                </h3>
                <ul className="space-y-3 text-gray-700 font-medium text-[15px]">
                  {["Shirts", "Polos", "Tees", "Bottomwear", "Winterwear", "Ethnicwear", "Denims"].map((cat) => (
                    <li key={cat} className="!py-3">
                      <Link href="#" className="hover:text-yellow-500 hover:underline transition duration-200">
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLLECTIONS */}
              <div>
                <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-4 font-semibold">
                  Collections
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {[{ name: "Rise", newTag: true }, { name: "New Hues" }, { name: "Shop all collection" }].map(col => (
                    <li key={col.name} className="!py-3">
                      <Link href="#" className="hover:text-yellow-500 hover:underline transition duration-200 flex items-center gap-1">
                        {col.name}{col.newTag && <span className="ml-1 bg-black text-white text-[10px] px-1 py-0.5 rounded">NEW</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* RIGHT SIDE IMAGES */}
            <div className="col-span-5 flex gap-6">
              {[{ src: "/images/featured-1.jpg", title: "Rise Collection" }, { src: "/images/featured-2.jpg", title: "New Hues" }].map(img => (
                <div key={img.title} className="w-1/2 cursor-pointer">
                  <img src={img.src} alt={img.title} className="w-full h-[220px] object-cover rounded-lg transition-transform duration-300 hover:scale-105" />
                  <p className="text-center mt-2 text-sm text-gray-700 font-medium">{img.title}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMenuOpen(false)}
          />

          {/* Slide-in Menu */}
          <div className="relative bg-white w-72 max-w-full h-full p-6 flex flex-col overflow-y-auto shadow-xl animate-slide-in-right">
            <button
              className="self-end mb-6 text-xl font-bold"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
            <Link href="#" className="py-3 text-lg font-semibold">Home</Link>
            <Link href="#" className="py-3 text-lg font-semibold">Beauty</Link>
            <Link href="#" className="py-3 text-lg font-semibold">Men</Link>
            <Link href="/cart" className="py-3 text-lg font-semibold">Cart ({cartItems.length})</Link>
            <Link href="/login" className="py-3 text-lg font-semibold">Login</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Logo from "../../assets/icons/logo";
import LoginDrawer from "./logindashboard";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  // Separate mega menus states
  const [megaMenuMen, setMegaMenuMen] = useState(false);
  const [megaMenuHome, setMegaMenuHome] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const timeoutRef = useRef(null);
  const searchRef = useRef(null);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // handle search close
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers for Men menu mega menu
  const handleMouseEnterMen = () => {
    clearTimeout(timeoutRef.current);
    setMegaMenuMen(true);
    setMegaMenuHome(false); // close other mega menu
  };
  const handleMouseLeaveMen = () => {
    timeoutRef.current = setTimeout(() => setMegaMenuMen(false), 200);
  };

  // Handlers for Home menu mega menu
  const handleMouseEnterHome = () => {
    clearTimeout(timeoutRef.current);
    setMegaMenuHome(true);
    setMegaMenuMen(false); // close other mega menu
  };
  const handleMouseLeaveHome = () => {
    timeoutRef.current = setTimeout(() => setMegaMenuHome(false), 200);
  };
  
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50); // change after 50px scroll
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
  <header
  className={`w-full z-50 transition-all duration-300
    ${
    "fixed top-0 left-0 w-full bg-white text-black transition-all duration-300 " +
(scrolled ? "shadow-md py-2" : "py-1")
    }
    ${megaMenuMen || megaMenuHome ? "!bg-white !text-black shadow-md" : ""}
  `}
>
      <div className="w-full">
        <div className="max-w-[90%] mx-auto px-6 flex items-center h-20 justify-between">
          {/* LEFT MENU (Desktop Only) */}
          <nav className="!hidden lg:!flex flex-1 items-center justify-center gap-6 text-sm font-medium tracking-wide">
            {/* MEN MENU */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterMen}
              onMouseLeave={handleMouseLeaveMen}
            >
              <button className="hover:text-yellow-400 transition">Men</button>
            </div>

            {/* HOME MENU */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterHome}
              onMouseLeave={handleMouseLeaveHome}
            >
              <button className="hover:text-yellow-400 transition">Home</button>
            </div>

            <Link href="#" className="hover:text-yellow-400 transition">
              Beauty
            </Link>
          </nav>

          {/* CENTER LOGO */}
          <div className="flex lg:flex-1 justify-start lg:justify-center">
            <Link href="/" className="flex items-center gap-2 site-logo">
              <div className="w-10 h-6 lg:w-10 lg:h-8">
                <Logo />
              </div>
              <span className="font-bold text-sm tracking-wider">Ｄｈｉｒａｇｏ</span>
            </Link>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex flex-1 justify-end items-center gap-6">
            {/* SEARCH */}
            <div className="hidden lg:flex items-center gap-6">
              <button
                ref={searchRef}
                className={`search-form-wrapper ${
                  searchOpen ? "search-form--active" : ""
                }`}
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
              <button
                onClick={() => setLoginOpen(true)}
                className="text-lg hover:text-yellow-400"
              >
                <i className="icon-avatar"></i>
              </button>
            </div>

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

      {/* MEN MEGA MENU */}
      {megaMenuMen && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-full !bg-white text-black shadow-lg font-sans"
          onMouseEnter={handleMouseEnterMen}
          onMouseLeave={handleMouseLeaveMen}
        >
          <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-12 gap-12 relative top-[-5px]">
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
                    "Shop All",
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
                  {[
                    "Shirts",
                    "Polos",
                    "Tees",
                    "Bottomwear",
                    "Winterwear",
                    "Ethnicwear",
                    "Denims",
                  ].map((cat) => (
                    <li key={cat} className="!py-3">
                      <Link
                        href="#"
                        className="hover:text-yellow-500 hover:underline transition duration-200"
                      >
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
                  {[
                    { name: "Rise", newTag: true },
                    { name: "New Hues" },
                    { name: "Shop all collection" },
                  ].map((col) => (
                    <li key={col.name} className="!py-3">
                      <Link
                        href="#"
                        className="hover:text-yellow-500 hover:underline transition duration-200 flex items-center gap-1"
                      >
                        {col.name}
                        {col.newTag && (
                          <span className="ml-1 bg-black text-white text-[10px] px-1 py-0.5 rounded">
                            NEW
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT SIDE IMAGES */}
            <div className="col-span-5 flex gap-6">
              {[
                {
                  src: "/images/featured-1.jpg",
                  title: "Rise Collection",
                },
                {
                  src: "/images/featured-2.jpg",
                  title: "New Hues",
                },
              ].map((img) => (
                <div
                  key={img.title}
                  className="w-1/2 cursor-pointer"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-[220px] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                  <p className="text-center mt-2 text-sm text-gray-700 font-medium">
                    {img.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HOME MEGA MENU */}
      {/* HOME MEGA MENU */}
{megaMenuHome && (
  <div
    className="absolute top-full left-1/2 -translate-x-1/2 w-full bg-white text-black shadow-lg"
    onMouseEnter={handleMouseEnterHome}
    onMouseLeave={handleMouseLeaveHome}
  >
    <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-12 gap-12">

      {/* LEFT CONTENT */}
      <div className="col-span-7 grid grid-cols-3 gap-10 text-sm">

        {/* FEATURED */}
        <div>
          <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-6 font-semibold">
            Featured
          </h3>
          <ul className="text-gray-700 text-[15px] font-medium">
            {[
              "Latest Trends",
              "New Arrivals",
              "Top Picks",
              "Best Deals",
              "Editor's Choice",
              "Shop All",
            ].map((item) => (
              <li key={item} className="py-3">
                <Link
                  href="#"
                  className="hover:text-yellow-500 hover:underline transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-6 font-semibold">
            Shop
          </h3>
          <ul className="text-gray-700 text-[15px] font-medium">
            {[
              "Living Room",
              "Bedroom",
              "Kitchen",
              "Decor",
              "Lighting",
              "Outdoor",
            ].map((item) => (
              <li key={item} className="py-3">
                <Link
                  href="#"
                  className="hover:text-yellow-500 hover:underline transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-6 font-semibold">
            Support
          </h3>
          <ul className="text-gray-700 text-[15px] font-medium">
            {[
              "Contact Us",
              "FAQs",
              "Shipping Info",
              "Returns",
              "Track Order",
            ].map((item) => (
              <li key={item} className="py-3">
                <Link
                  href="#"
                  className="hover:text-yellow-500 hover:underline transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* RIGHT IMAGES */}
      <div className="col-span-5 flex gap-6">
        {[
          {
            src: "/images/home-1.jpg",
            title: "Modern Living",
          },
          {
            src: "/images/home-2.jpg",
            title: "Cozy Spaces",
          },
        ].map((item) => (
          <div key={item.title} className="w-1/2 cursor-pointer">
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-[220px] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
            <p className="text-center mt-2 text-sm text-gray-700 font-medium">
              {item.title}
            </p>
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
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          {/* Slide drawer */}
          <div
            className={`
              relative bg-white text-black
              w-[320px] max-w-full h-full flex flex-col
              shadow-xl overflow-hidden
              transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
              ${menuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            {/* Top banner */}
            <div className="relative">
              <img
                src="/images/login/loginbanner.jpeg"
                alt="menu banner"
                className="w-full h-40 object-cover"
              />
              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow"
              >
                ✕
              </button>
            </div>

            {/* Menu content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <MobileAccordion title="Topwear" defaultOpen={true}>
                <Link href="#" className="block py-2 pl-4 text-sm">
                  T-Shirts
                </Link>
                <Link href="#" className="block py-2 pl-4 text-sm">
                  Shirts
                </Link>
                <Link href="#" className="block py-2 pl-4 text-sm">
                  Polos
                </Link>
              </MobileAccordion>

              <MobileAccordion title="Bottomwear" defaultOpen={true}>
                <Link href="#" className="block py-2 pl-4 text-sm">
                  Joggers
                </Link>
                <Link href="#" className="block py-2 pl-4 text-sm">
                  Jeans
                </Link>
                <Link href="#" className="block py-2 pl-4 text-sm">
                  Shorts
                </Link>
              </MobileAccordion>

              <MobileAccordion title="More" defaultOpen={true}>
                <Link href="#" className="block py-2 pl-4 text-sm">
                  Contact
                </Link>
                <Link href="#" className="block py-2 pl-4 text-sm">
                  FAQ
                </Link>
              </MobileAccordion>

              <Link href="/cart" className="block py-3 font-medium border-t">
                Cart ({cartItems.length})
              </Link>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setLoginOpen(true);
                }}
                className="w-full text-left py-3 font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      <LoginDrawer open={loginOpen} setOpen={setLoginOpen} />
    </header>
  );
};

const MobileAccordion = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-3 font-medium"
      >
        {title}
        <span
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-2">{children}</div>
      </div>
    </div>
  );
};

export default Header;
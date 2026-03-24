"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Logo from "../../assets/icons/logo";
import LoginDrawer from "./logindashboard";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const [megaMenuMen, setMegaMenuMen] = useState(false);
  const [megaMenuHome, setMegaMenuHome] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const timeoutRef = useRef(null);
  const searchRef = useRef(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnterMen = () => {
    clearTimeout(timeoutRef.current);
    setMegaMenuMen(true);
    setMegaMenuHome(false);
  };

  const handleMouseLeaveMen = () => {
    timeoutRef.current = setTimeout(() => setMegaMenuMen(false), 200);
  };

  const handleMouseEnterHome = () => {
    clearTimeout(timeoutRef.current);
    setMegaMenuHome(true);
    setMegaMenuMen(false);
  };

  const handleMouseLeaveHome = () => {
    timeoutRef.current = setTimeout(() => setMegaMenuHome(false), 200);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white text-black transition-all duration-300 overflow-visible
  ${scrolled ? "shadow-md py-1" : "py-2"}
  ${megaMenuMen || megaMenuHome ? "shadow-md" : ""}
`}
    >
      <div className="w-full">
        <div
          className={`relative max-w-[92%] mx-auto px-4 lg:px-6 flex items-center
  ${scrolled ? "h-12 lg:h-14" : "h-14 lg:h-16"}
`}
        >
          {/* LEFT */}
          <div className="flex items-center gap-3 lg:gap-6 justify-start">
            {/* HAMBURGER */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 relative"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className={`absolute w-5 h-0.5 bg-black ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              />
              <span
                className={`absolute w-5 h-0.5 bg-black ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute w-5 h-0.5 bg-black ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              />
            </button>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              <div
                onMouseEnter={handleMouseEnterMen}
                onMouseLeave={handleMouseLeaveMen}
              >
                <button className="hover:text-yellow-400">Men</button>
              </div>

              <div
                onMouseEnter={handleMouseEnterHome}
                onMouseLeave={handleMouseLeaveHome}
              >
                <button className="hover:text-yellow-400">Home</button>
              </div>

              <Link href="#" className="hover:text-yellow-400">
                Beauty
              </Link>
            </nav>
          </div>

          {/* DESKTOP MENU */}

          {/* CENTER LOGO */}
        <div
  className="
    flex-1 flex justify-center items-center
    lg:absolute lg:left-1/2 
    lg:-translate-x-1/2 lg:-translate-y-1/2
  "
>
  <Link href="/" className="flex items-center">
    <div
      className={`
        relative transition-all duration-300

        w-[120px] h-[40px]        /* mobile */

        lg:w-[220px] lg:h-[70px]  /* desktop normal */

        ${scrolled ? "lg:w-[180px] lg:h-[55px]" : ""}
      `}
    >
      <Logo />
    </div>
  </Link>
</div>

          {/* RIGHT */}
          <div className="flex items-center justify-end gap-3 lg:gap-5 flex-1">
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

            <Link href="/cart" className="relative">
              <i className="icon-cart text-[18px]"></i>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <button onClick={() => setLoginOpen(true)}>
              <i className="icon-avatar text-[18px]"></i>
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
                    { name: "Special Prices", href: "/special-prices" },
                    { name: "New Arrivals", href: "/shop/new-arrivals" },
                    { name: "Bestsellers", href: "/collections/bestsellers" },
                    { name: "Back in Stock", href: "/back-in-stock" },
                    {
                      name: "Foundational Prices",
                      href: "/foundational-prices",
                    },
                    { name: "Shop All", href: "/shop" },
                  ].map((item) => (
                    <li key={item.name} className="!py-3">
                      <Link
                        href={item.href}
                        className="hover:text-yellow-500 hover:underline transition duration-200"
                      >
                        {item.name}
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
                <div key={img.title} className="w-1/2 cursor-pointer">
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
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
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

"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/icons/logo";
import Cookies from "js-cookie";
import SearchModal from "../../components/searchmodal";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import LoginDrawer from "./logindashboard";
import { usePathname } from "next/navigation";
import LoginDropdown from "./logindroopdown";
import { logout } from "../../store/authslice";
import { Montserrat } from "next/font/google";
import API from "../../lib/api"; 

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// ✅ All pages where the navbar should be transparent over a hero video/image
const TRANSPARENT_HERO_PAGES = [
  "/",
  "/pages/better-materials",
  // Add more hero pages here as needed, e.g.:
  // "/pages/better-materials",
  // "/about",
];

const Header = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const router = useRouter();
  const [megaMenuMen, setMegaMenuMen] = useState(false);
  const [megaMenuHome, setMegaMenuHome] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const timeoutRef = useRef(null);
  const searchRef = useRef(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  console.log('isLoggedIn',isLoggedIn)

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("user_email");
  //   localStorage.removeItem("isLoggedIn");
  //   localStorage.removeItem("popupCount");
  //   Cookies.remove("token");
  //   dispatch(logout());
  //   router.replace("/");
  //   setMenuOpen(false);
  // };

 const handleLogout = async () => {
  try {
    await API.post("/logout");
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    // ✅ clear any frontend cookies too
    Cookies.remove("token");
    Cookies.remove("XSRF-TOKEN");
    
    dispatch(logout());
    setMenuOpen(false);
    router.replace("/");
  }
};
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => prev + 1);
    }
    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const mobileMenu = [
    {
      title: "Shop",
      children: [
        {
          name: "Shirts",
          href: "/collections/mens-fashion",
        },
      ],
    },
    {
      title: "About",
      children: [
        {
          name: "Our Story",
          href: "/about",
        },
      ],
    },
    {
      title: "Why Dhirago",
      children: [
        { name: "The Essence of Fine Garment", href: "/pages/better-materials" },
        { name: "A Touch of Embroidery", href: "/embroidery" },
        { name: "Sustainability Fashion", href: "/sustainability" },
      ],
    },
  ];

  return (
    <>
      <header
        className={`
          fixed left-0 w-full z-50
          transition-all duration-300
          ${
            isHeroPage
              ? scrolled
                ? "top-0 bg-white/80 backdrop-blur-lg shadow-sm text-black"
                : "top-12 bg-transparent text-white"
              : "top-0 bg-white shadow-sm text-black"
          }
        `}
      >
        {/* 
          ── KEY CHANGE ──────────────────────────────────────────────────────────
          Previously: pathname === "/" ? (scrolled ? white : transparent) : white
          Now:        isHeroPage  ? (scrolled ? white : transparent) : white

          This means ANY page in TRANSPARENT_HERO_PAGES gets the see-through
          navbar over its full-screen hero video/image, and turns white on scroll.
          All other pages keep their solid white navbar as before.
          ────────────────────────────────────────────────────────────────────── 
        */}
        <div className="w-full">
          <div
            className={`
              relative max-w-[92%] mx-auto px-3 lg:px-6 
              flex items-center justify-between
              h-[60px] lg:h-[80px]
            `}
          >
            {/* LEFT */}
            <div className="flex items-center gap-2 lg:gap-6">
              {/* HAMBURGER */}
              <button
                className="lg:hidden flex flex-col justify-center items-center w-9 h-9 relative z-10"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span
                  className={`
                    w-5 h-[2px] absolute transition-all duration-300
                    ${menuOpen ? "rotate-45" : "-translate-y-1.5"}
                    ${isHeroPage && !scrolled ? "bg-white" : "bg-black"}
                  `}
                />
                <span
                  className={`
                    w-5 h-[2px] absolute transition-all duration-300
                    ${menuOpen ? "opacity-0" : ""}
                    ${isHeroPage && !scrolled ? "bg-white" : "bg-black"}
                  `}
                />
                <span
                  className={`
                    w-5 h-[2px] absolute transition-all duration-300
                    ${menuOpen ? "-rotate-45" : "translate-y-1.5"}
                    ${isHeroPage && !scrolled ? "bg-white" : "bg-black"}
                  `}
                />
              </button>

              <nav
                className={`${josefin.className} uppercase tracking-[0.2em] hidden lg:flex items-center gap-8 text-base lg:text-sm tracking-wider text-sm uppercase`}
              >
                <div>
                  <Link href={"/collections/mens-fashion"}>
                    <button className="hover:text-yellow-400 transition duration-300">
                      Shop
                    </button>
                  </Link>
                </div>

                <div
                  onMouseEnter={handleMouseEnterHome}
                  onMouseLeave={handleMouseLeaveHome}
                >
                  <button className="hover:text-yellow-400">About</button>
                </div>
              </nav>
            </div>

            {/* LOGO CENTER */}
            <div
              className={`
                absolute left-1/2 transform -translate-x-[74%] sm:-translate-x-1/2
                text-[1.6rem] sm:text-[2rem] lg:text-[3rem]
                tracking-[0.25em] uppercase z-10
                transition-all duration-500
                ${isHeroPage ? (scrolled ? "text-black" : "text-white") : "text-black"}
              `}
            >
              <Link className={`font-futura  ${pathname  == "/pages/better-materials" ? (scrolled ? "text-black block" : "hidden") :"block"}`} href={"/"}>
              
                Dhirago
              </Link>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              {/* SEARCH */}
              <button onClick={() => setSearchOpen(true)}>
                <i
                  className={`icon-search text-[18px] ${isHeroPage && !scrolled ? "text-white" : "text-black"}`}
                />
              </button>

              {/* CART */}
              <Link href="/cart" className="relative">
                <i
                  className={`icon-cart text-[18px] ${
                    isHeroPage && !scrolled ? "text-white" : "text-black"
                  }`}
                ></i>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* USER */}
              {!isLoggedIn ? (
                <button
                  onClick={() => setLoginOpen(true)}
                  className={`text-[18px] ${
                    isHeroPage && !scrolled ? "text-white" : "text-black"
                  }`}
                >
                  <i className="icon-avatar"></i>
                </button>
              ) : (
                <LoginDropdown user={user} handleLogout={handleLogout} />
              )}
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
            <div className="max-w-[108rem] mx-auto px-10 py-6 grid grid-cols-12">
              <div className="col-span-7 grid grid-cols-3 gap-8 font-medium">
                <div>
                  <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-6 font-medium">
                    Featured
                  </h3>
                  <ul className="text-gray-700 space-y-3 font-light text-[15px]">
                    {[
                      { name: "Mens Fashion", href: "/collections/mens-fashion" },
                      { name: "New Arrivals", href: "/shop/new-arrivals" },
                      { name: "Bestsellers", href: "/collections/bestsellers" },
                      { name: "Back in Stock", href: "/back-in-stock" },
                      { name: "Foundational Prices", href: "/foundational-prices" },
                      { name: "Shop All", href: "/shop" },
                    ].map((item) => (
                      <li key={item.name} className="!py-1">
                        <Link href={item.href} className="hover:text-yellow-500 hover:underline transition duration-200">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-4 font-medium">
                    Categories
                  </h3>
                  <ul className="space-y-3 text-gray-700 font-light text-[15px]">
                    {["Shirts", "Polos", "Tees", "Bottomwear", "Winterwear", "Ethnicwear", "Denims"].map((cat) => (
                      <li key={cat} className="!py-1">
                        <Link href="#" className="hover:text-yellow-500 hover:underline transition duration-200">
                          {cat}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-4 font-medium">
                    Collections
                  </h3>
                  <ul className="space-y-3 font-light text-gray-700">
                    {[
                      { name: "Rise", newTag: true },
                      { name: "New Hues" },
                      { name: "Shop all collection" },
                    ].map((col) => (
                      <li key={col.name} className="!py-1">
                        <Link href="#" className="hover:text-yellow-500 hover:underline transition duration-200 flex items-center gap-1">
                          {col.name}
                          {col.newTag && (
                            <span className="ml-1 bg-black text-white text-[10px] px-1 py-0.5 rounded">NEW</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-span-5 flex gap-6">
                {[
                  { src: "/images/featured-1.jpg", title: "Rise Collection" },
                  { src: "/images/featured-2.jpg", title: "New Hues" },
                ].map((img) => (
                  <div key={img.title} className="w-1/2 cursor-pointer">
                    <img src={img.src} alt={img.title} className="w-full h-[220px] object-cover rounded-lg transition-transform duration-300 hover:scale-105" />
                    <p className="text-center mt-2 text-sm text-gray-700 font-medium">{img.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HOME MEGA MENU */}
        {megaMenuHome && (
          <div
            className="absolute top-full left-[30%] -translate-x-1/2 w-[60%] bg-white text-black shadow-lg"
            onMouseEnter={handleMouseEnterHome}
            onMouseLeave={handleMouseLeaveHome}
          >
            <div className="max-w-[103rem] mx-auto py-6 grid grid-cols-12 gap-12 pl-20">
              <div className="col-span-12 grid md:grid-cols-3 gap-10">
                <div>
                  <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-4 font-medium">
                    About Dhirago
                  </h3>
                  <ul className="text-gray-700 text-[15px] font-light">
                    {[
                      { name: "Our Story", href: "/about" },
                      { name: "Contact Us", href: "/contact" },
                      { name: "Free Shipping", href: "/shipping&returns" },
                      { name: "Return", href: "/shipping&returns" },
                      { name: "Shop All", href: "/" },
                    ].map((item) => (
                      <li key={item.name} className="py-2">
                        <Link href={item.href} className="hover:text-yellow-500 hover:underline transition duration-200">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-4 font-medium">
                    Why Dhirago
                  </h3>
                  <ul className="text-gray-700 text-[15px] font-light">
                    {[
                      { name: "The Essence of Fine Garment", href: "/pages/better-materials" },
                      { name: "A Touch of Embroidery", href: "/embroidery" },
                      { name: "Sustainable Fashion", href: "/sustainability" },
                    ].map((item) => (
                      <li key={item.name} className="py-3">
                        <Link href={item.href} className="hover:text-yellow-500 hover:underline transition duration-200">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <LoginDrawer open={loginOpen} setOpen={setLoginOpen} />
      </header>

      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <AnimatePresence>
          {menuOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9998]"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                  className="fixed top-0 left-0 h-full w-[320px] sm:w-[360px] bg-white z-[9999] flex flex-col shadow-2xl"
                >
                  <Dialog.Title></Dialog.Title>
                  <div className="relative">
                    <img src="/images/login/loginbanner.jpeg" alt="menu banner" className="w-full h-40 object-cover" />
                    <button onClick={() => setMenuOpen(false)} className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
                      ✕
                    </button>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 overflow-y-auto px-4 py-4"
                  >
                    {mobileMenu.map((section, i) => (
                      <AccordionItem key={i} item={section} setMenuOpen={setMenuOpen} />
                    ))}
                    <Link href="/cart" className="block py-4 mt-4 border-t text-sm font-medium">
                      Cart ({cartItems.length})
                    </Link>
                    <div className="pt-3">
                      {!isLoggedIn ? (
                        <button onClick={() => setLoginOpen(true)} className="flex items-center gap-2 text-sm">
                          Login
                        </button>
                      ) : (
                        <div className="space-y-2 text-sm">
                          <Link href="/account">My Profile</Link>
                          <br /><br />
                          <button onClick={handleLogout}>Logout</button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

function AccordionItem({ item, setMenuOpen }) {
  const [open, setOpen] = useState(false);

  if (item.href) {
    return (
      <Link
        href={item.href}
        onClick={() => setMenuOpen(false)}
        className="flex items-center justify-between py-3 text-sm hover:text-black"
      >
        <span className="text-sm font-medium">{item.title || item.name}</span>
        {item.tag && (
          <span className="text-[10px] bg-black text-white px-2 py-[2px] ml-2">{item.tag}</span>
        )}
      </Link>
    );
  }

  return (
    <div className="border-b">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-3 text-left">
        <span className="text-sm font-medium">{item.title || item.name}</span>
        <span className="text-xs">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-3"
          >
            {item.children?.map((child, i) => (
              <AccordionItem key={i} item={child} setMenuOpen={setMenuOpen} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import SearchModal from "../../components/searchmodal";
import { useRouter, usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import LoginDrawer from "./logindashboard";
import LoginDropdown from "./logindroopdown";
import { logout } from "../../store/authslice";
import API from "../../lib/api";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/collections/shirts" },
  { label: "About", href: "/about" },
  { label: "Craft Tradition", href: "/pages/better-materials" },
  { label: "Handcrafted", href: "/embroidery" },
  { label: "Sustainability", href: "/sustainability" },
];

const Header = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    try {
      await API.post("/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      Cookies.remove("token");
      Cookies.remove("XSRF-TOKEN");
      dispatch(logout());
      setMenuOpen(false);
      router.replace("/");
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenu = [
    {
      title: "Shop",
      children: [{ name: "Shirts", href: "/collections/shirts" }],
    },
    {
      title: "About",
      children: [{ name: "Our Story", href: "/about" }],
    },
    {
      title: "Why Dhirago",
      children: [
        {
          name: "The Essence of Fine Garment",
          href: "/pages/better-materials",
        },
        { name: "A Touch of Embroidery", href: "/embroidery" },
        { name: "Sustainability Fashion", href: "/sustainability" },
      ],
    },
  ];

  const iconBtn =
    "inline-flex items-center justify-center w-9 h-9 text-black hover:opacity-60 transition-opacity";

  return (
    <>
      {/* Announcement — 11-11 style top strip */}
      <div className="fixed top-0 left-0 w-full z-[60] bg-black text-white">
        <p
          className={`${josefin.className} text-center text-[10px] sm:text-[11px] tracking-[0.22em] uppercase py-2.5 px-4`}
        >
          The Beauty of Time — Collection Now Live
        </p>
      </div>

      <header
        className={`
          fixed left-0 w-full z-50 top-[36px]
          bg-white text-black
          transition-shadow duration-300 p-2
          ${scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.08)]" : ""}
        `}
      >
        <div className="relative w-full">
          {/* Top row: menu | logo | icons */}
          <div className="relative flex items-center justify-between h-[56px] lg:h-[64px] px-4 sm:px-6 lg:px-10">
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="lg:invisible lg:pointer-events-none flex flex-col justify-center items-center w-9 h-9 relative z-10"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className={`w-5 h-[1.5px] absolute bg-black transition-all duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`w-5 h-[1.5px] absolute bg-black transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-[1.5px] absolute bg-black transition-all duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>

            <Link
              href="/"
              className={`${josefin.className} absolute left-[8rem] lg:left-1/2 -translate-x-1/2 text-[1.35rem] sm:text-[1.65rem] lg:text-[1.85rem] tracking-[0.28em] uppercase font-normal text-black hover:opacity-70 transition-opacity`}
            >
              Dhirago
            </Link>

            <div className="flex items-center gap-0.5 sm:gap-1 z-10">
              {!isLoggedIn ? (
                <button
                  aria-label="Login"
                  title="Login"
                  onClick={() => setLoginOpen(true)}
                  className={iconBtn}
                >
                  <i aria-hidden="true" className="icon-avatar text-[17px]" />
                </button>
              ) : (
                <LoginDropdown user={user} handleLogout={handleLogout} />
              )}

              <button
                aria-label="Search products"
                title="Search products"
                onClick={() => setSearchOpen(true)}
                className={iconBtn}
              >
                <i aria-hidden="true" className="icon-search text-[17px]" />
              </button>

              <Link
                href="/cart"
                className={`${iconBtn} relative`}
                aria-label={`Shopping cart (${cartItems.length} items)`}
                title="Shopping Cart"
              >
                <i aria-hidden="true" className="icon-cart text-[17px]" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[14px] h-[14px] flex items-center justify-center bg-black text-white text-[9px] px-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop nav — centered under logo */}
          <nav
            className={`${josefin.className} hidden lg:flex items-center justify-center gap-7 xl:gap-9 p-3.5 text-[11px] xl:text-[12px] tracking-[0.22em] uppercase`}
          >
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-opacity duration-200 ${
                    active ? "opacity-100" : "opacity-100 hover:opacity-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

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
                  <Dialog.Title className="sr-only">Menu</Dialog.Title>
                  <div className="relative">
                    <img
                      src="/images/login/loginbanner.jpeg"
                      alt=""
                      className="w-full h-40 object-cover"
                    />
                    <button
                      aria-label="Close menu"
                      title="Close menu"
                      onClick={() => setMenuOpen(false)}
                      className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
                    >
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
                      <AccordionItem
                        key={i}
                        item={section}
                        setMenuOpen={setMenuOpen}
                      />
                    ))}
                    <Link
                      href="/cart"
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 mt-4 border-t text-sm font-medium"
                    >
                      Cart ({cartItems.length})
                    </Link>
                    <div className="pt-3">
                      {!isLoggedIn ? (
                        <button
                          onClick={() => {
                            setLoginOpen(true);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 text-sm"
                        >
                          Login
                        </button>
                      ) : (
                        <div className="space-y-2 text-sm">
                          <Link
                            onClick={() => setMenuOpen(false)}
                            href="/account"
                          >
                            My Profile
                          </Link>
                          <br />
                          <br />
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
          <span className="text-[10px] bg-black text-white px-2 py-[2px] ml-2">
            {item.tag}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div className="border-b">
      <button
        aria-expanded={open}
        aria-label={`${open ? "Collapse" : "Expand"} ${item.title || item.name}`}
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-3 text-left"
      >
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

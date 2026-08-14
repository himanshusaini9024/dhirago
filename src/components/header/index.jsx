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
  { label: "Materials", href: "/pages/better-materials" },
  { label: "Handwork", href: "/embroidery" },
  { label: "Sustainability", href: "/sustainability" },
];

const MOBILE_NAV_LINKS = [
  { label: "Shop", href: "/collections/shirts" },
  { label: "About", href: "/about" },
  { label: "Materials", href: "/pages/better-materials" },
  { label: "Handwork", href: "/embroidery" },
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

  const iconBtn =
    "inline-flex items-center justify-center w-9 h-9 text-black hover:opacity-60 transition-opacity";

  return (
    <>
      {/* Announcement — 11-11 style top strip */}
      {/* <div className="fixed top-0 left-0 w-full z-[60] bg-black text-white">
        <p
          className={`${josefin.className} text-center text-[10px] sm:text-[11px] tracking-[0.22em] uppercase py-2.5 px-4`}
        >
          The Beauty of Time — Collection Now Live
        </p>
      </div> */}

      <header
        className={`
          fixed left-0 w-full z-50 top-[0px]
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
                      src="/images/DSC06480.jpg"
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
                    className={`flex-1 overflow-y-auto px-6 py-6 ${josefin.className}`}
                  >
                    <nav className="flex flex-col">
                      {MOBILE_NAV_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="py-4 text-[13px] tracking-[0.18em] uppercase text-black border-b border-[#ece8e2]"
                        >
                          {link.label}
                        </Link>
                      ))}

                      <Link
                        href="/cart"
                        onClick={() => setMenuOpen(false)}
                        className="py-4 text-[13px] tracking-[0.18em] uppercase text-black border-b border-[#ece8e2]"
                      >
                        Cart ({cartItems.length})
                      </Link>

                      {!isLoggedIn ? (
                        <button
                          type="button"
                          onClick={() => {
                            setLoginOpen(true);
                            setMenuOpen(false);
                          }}
                          className="py-4 text-left text-[13px] tracking-[0.18em] uppercase text-black border-b border-[#ece8e2]"
                        >
                          Login
                        </button>
                      ) : (
                        <>
                          <Link
                            href="/account"
                            onClick={() => setMenuOpen(false)}
                            className="py-4 text-[13px] tracking-[0.18em] uppercase text-black border-b border-[#ece8e2]"
                          >
                            My Profile
                          </Link>
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="py-4 text-left text-[13px] tracking-[0.18em] uppercase text-black border-b border-[#ece8e2]"
                          >
                            Logout
                          </button>
                        </>
                      )}
                    </nav>
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

export default Header;

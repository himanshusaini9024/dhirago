"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Josefin_Sans } from "next/font/google";
import LoginPopup from "../loginpopup";
import { removeProduct, setCount } from "../../store/reducers/cart";
import { formatINR, getItemSellingPrice, summarizeCart } from "../../lib/cartPricing";
import { CART_DRAWER_EVENT } from "../../lib/cartDrawer";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

const baseURL = process.env.NEXT_PUBLIC_IMG_URL;

function thumbUrl(thumb) {
  const url = typeof thumb === "string" ? thumb : thumb?.url;
  if (!url) return "/images/placeholder.png";
  return url.startsWith("http") ? url : `${baseURL || ""}${url}`;
}

export default function CartDrawer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const user = useSelector((state) => state.auth?.user);
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { payableTotal } = useMemo(() => summarizeCart(cartItems), [cartItems]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(CART_DRAWER_EVENT, onOpen);
    return () => window.removeEventListener(CART_DRAWER_EVENT, onOpen);
  }, []);

  const [openedOn, setOpenedOn] = useState(pathname);
  if (openedOn !== pathname) {
    setOpenedOn(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const updateQty = (item, quantity) => {
    const key = { id: item.id, color: item.color, size: item.size };
    if (quantity <= 0) dispatch(removeProduct(key));
    else dispatch(setCount({ product: key, quantity }));
  };

  const goToBag = () => {
    setOpen(false);
    router.push("/cart");
  };

  const goToCheckout = () => {
    if (user || localStorage.getItem("isLoggedIn")) {
      setOpen(false);
      router.push("/checkout");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className={`${josefin.className} fixed inset-0 z-[75]`} role="dialog" aria-modal="true" aria-label="Your shopping bag">
            <motion.button
              type="button"
              aria-label="Close bag"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-white/60 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />

            <motion.aside
              className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-[#fbfaf7] text-[#1a1a1a] shadow-[-12px_0_40px_-20px_rgba(0,0,0,0.25)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-6 flex items-center justify-between border-b border-[#1a1a1a] py-5">
                <h2 className="text-[12px] uppercase tracking-[0.18em] text-[#1a1a1a]">
                  Your shopping bag ({cartItems.length})
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close bag"
                  className="flex h-8 w-8 items-center justify-center text-[#1a1a1a] transition-opacity hover:opacity-60"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6">
                {cartItems.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                    <p className="text-[13px] uppercase tracking-[0.14em] text-[#777]">Your bag is empty</p>
                    <Link
                      href="/collections/shirts"
                      onClick={() => setOpen(false)}
                      className="border border-[#1a1a1a] px-6 py-3 text-[11px] uppercase tracking-[0.16em] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                    >
                      Continue shopping
                    </Link>
                  </div>
                ) : (
                  <ul>
                    {cartItems.map((item, i) => (
                      <motion.li
                        key={`${item.id}-${item.color}-${item.size}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                        className="flex gap-4 border-b border-[#e6e3dc] py-5"
                      >
                        <Link
                          href={item.slug ? `/product/${item.slug}` : "/cart"}
                          onClick={() => setOpen(false)}
                          className="block h-[120px] w-[90px] shrink-0 overflow-hidden bg-[#efece6]"
                        >
                          <img src={thumbUrl(item.thumb)} alt={item.name} className="h-full w-full object-cover" />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="text-[12px] uppercase leading-snug tracking-[0.1em]">{item.name}</p>
                          <p className="mt-2 text-[13px]">
                            {formatINR(getItemSellingPrice(item) * (Number(item.quantity) || 1))}
                          </p>

                          <div className="mt-auto flex items-end justify-between gap-3 pt-3 text-[11px] uppercase tracking-[0.12em]">
                            <div className="flex flex-col gap-2">
                              {item.size && <span>Size {item.size}</span>}
                              <div className="flex items-center border border-[#d8d4cc]">
                                <button
                                  type="button"
                                  aria-label="Decrease quantity"
                                  onClick={() => updateQty(item, (Number(item.quantity) || 1) - 1)}
                                  className="h-7 w-7 transition-colors hover:bg-[#efece6]"
                                >
                                  −
                                </button>
                                <span className="w-6 text-center">{item.quantity}</span>
                                <button
                                  type="button"
                                  aria-label="Increase quantity"
                                  onClick={() => updateQty(item, (Number(item.quantity) || 1) + 1)}
                                  className="h-7 w-7 transition-colors hover:bg-[#efece6]"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => updateQty(item, 0)}
                              className="underline-offset-4 transition-opacity hover:underline hover:opacity-70"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mx-6 border-t border-[#1a1a1a] pb-6 pt-5">
                  <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.14em]">
                    <span>Subtotal</span>
                    <span className="text-[14px]">{formatINR(payableTotal)}</span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={goToBag}
                      className="border border-[#1a1a1a] py-3.5 text-[11px] uppercase tracking-[0.16em] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                    >
                      View bag
                    </button>
                    <button
                      type="button"
                      onClick={goToCheckout}
                      className="border border-[#1a1a1a] bg-[#1a1a1a] py-3.5 text-[11px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-black"
                    >
                      Checkout
                    </button>
                  </div>

                  <p className="mt-4 text-center text-[11px] tracking-[0.06em] text-[#777]">
                    Inclusive of taxes · Free shipping across India
                  </p>
                </div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {showLogin && <LoginPopup isOpen={showLogin} onClose={() => setShowLogin(false)} />}
    </>
  );
}

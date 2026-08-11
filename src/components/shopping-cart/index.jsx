"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import Item from "./item";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import LoginPopup from "../../components/loginpopup/index";
import RelatedProduct from "./relatedproduct";

function formatINR(value) {
  const amount = Number(value) || 0;
  return `₹ ${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

export default function ShoppingCart() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const productTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0),
        0,
      ),
    [cartItems],
  );

  const savings = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const mrp = Number(item.mrp || item.originalPrice || item.price) || 0;
        const price = Number(item.price) || 0;
        const qty = item.quantity || 0;
        return sum + Math.max(0, (mrp - price) * qty);
      }, 0),
    [cartItems],
  );

  const total = productTotal;

  const handleCheckout = () => {
    if (user || localStorage.getItem("isLoggedIn")) {
      router.push("/checkout");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <section className="bg-white min-h-screen px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8 md:py-12 pb-24">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] gap-8 lg:gap-10 xl:gap-14 items-start">
        {/* LEFT — bag items */}
        <div className="min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
            <h1 className="text-[28px] md:text-[34px] leading-none font-normal text-[#1a1a1a] tracking-[-0.01em]">
              Your Bag
            </h1>

            <Link
              href="/collections/shirts"
              className="inline-flex items-center justify-center self-start sm:self-auto border border-[#1a1a1a] px-5 py-2.5 text-[11px] md:text-[12px] tracking-[0.14em] uppercase text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {cartItems.length === 0 ? (
            <div className="border-t border-[#e8e8e8] pt-12 text-center">
              <p className="text-[#777] text-base md:text-xl mb-6">
                Your bag is empty
              </p>
              <Link
                href="/collections/shirts"
                className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-3 text-[11px] tracking-[0.16em] uppercase"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop table header */}
              <div className="hidden md:grid grid-cols-[minmax(0,2.2fr)_1fr_1fr_1fr] gap-4 text-[11px] tracking-[0.12em] uppercase text-[#9a9a9a] border-y border-[#e8e8e8] py-3">
                <span>Products</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
              </div>

              <div>
                {cartItems.map((item) => (
                  <Item
                    key={`${item.id}-${item.color}-${item.size}`}
                    {...item}
                    formatINR={formatINR}
                  />
                ))}
              </div>

              {/* Promo strip */}
              <div className="mt-2 md:mt-4 bg-[#f3f3f3] px-4 py-3.5 flex items-center gap-3 text-[13px] md:text-[14px] text-[#333]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="shrink-0"
                >
                  <path
                    d="M6 8h12l-1 12H7L6 8z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 8V7a3 3 0 0 1 6 0v1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="leading-snug">
                  Free Shipping on across India
                </p>
              </div>
            </>
          )}
        </div>

        {/* RIGHT — summary */}
        <aside className="bg-[#f5f5f5] p-5 sm:p-6 lg:p-7 h-fit lg:sticky lg:top-24 w-full">
          <div className="space-y-3.5 text-[14px] text-[#333]">
            <div className="flex justify-between gap-4">
              <span>Product Total</span>
              <span>{formatINR(productTotal)}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span>Your Savings</span>
              <span className="text-[#1f8a4c]">{formatINR(savings)}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span>Shipping</span>
              <span className="text-[#1f8a4c] font-medium tracking-[0.04em]">
                FREE
              </span>
            </div>
          </div>

          <div className="border-t border-[#ddd] mt-5 pt-5">
            <div className="flex justify-between items-baseline gap-4">
              <span className="text-[18px] md:text-[20px] font-semibold text-[#1a1a1a]">
                Total
              </span>
              <span className="text-[18px] md:text-[20px] font-semibold text-[#1a1a1a]">
                {formatINR(total)}
              </span>
            </div>
            <p className="text-[11px] text-[#888] mt-1">(MRP inclusive of taxes)</p>
          </div>

          <button
            type="button"
            onClick={() => setGiftWrap((v) => !v)}
            className={`mt-5 w-full flex items-center justify-between gap-3 px-4 py-3.5 text-[11px] tracking-[0.12em] uppercase border transition-colors ${
              giftWrap
                ? "bg-white border-[#1a1a1a] text-[#1a1a1a]"
                : "bg-[#white] border-transparent text-[#444]"
            }`}
          >
            {/* <span>Gift Wrap This Order</span> */}
            {/* <span
              className={`w-4 h-4 border flex items-center justify-center text-[10px] ${
                giftWrap
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                  : "border-[#999] bg-white"
              }`}
              aria-hidden
            >
              {giftWrap ? "✓" : ""}
            </span> */}
          </button>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-4 w-full bg-[#1a1a1a] text-white py-3.5 text-[12px] tracking-[0.14em] uppercase hover:bg-black transition-colors"
            >
              Checkout - {formatINR(total)}
            </button>
          )}

          <p className="mt-4 text-center text-[11px] text-[#666]">
            FREE Shipping |  Free Returns
          </p>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-[12px] text-[#555]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
                  stroke="#3b82f6"
                  strokeWidth="1.6"
                  fill="rgba(59,130,246,0.12)"
                />
                <path
                  d="M9.5 12l1.8 1.8L15 10"
                  stroke="#3b82f6"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Secured & Encrypted Payments</span>
            </div>

            <img
              src="/images/payment-options.png"
              alt="Accepted payment methods"
              className="mx-auto mt-4 w-full max-w-[220px] opacity-90"
            />
          </div>
        </aside>
      </div>

      {showLogin && (
        <LoginPopup isOpen={showLogin} onClose={() => setShowLogin(false)} />
      )}

      {cartItems.length > 0 && <RelatedProduct />}
    </section>
  );
}

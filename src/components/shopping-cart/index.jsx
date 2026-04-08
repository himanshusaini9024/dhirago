"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import CheckoutStatus from "../checkout-status";
import Item from "./item";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginPopup from "../../components/loginpopup/index";

export default function ShoppingCart() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );



 const handleCheckout = () => {
  if (user || localStorage.getItem("isLoggedIn")) {
    router.push("/checkout");
  } else {
    setShowLogin(true);
  }
};

  return (
    <section className="px-4 md:px-10 lg:px-20 py-10 pb-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-12">
        {/* LEFT */}
        <div>
          <h1 className="text-xl tracking-widest mb-6">YOUR BAG</h1>

          <CheckoutStatus step="cart" />

          {/* TABLE HEADER */}
          {cartItems.length > 0 && (
            <div className="hidden md:grid grid-cols-5 text-xs text-gray-500 border-b pb-3 mt-6">
              <span className="col-span-2">PRODUCT(S)</span>
              <span className="text-center">PRICE</span>
              <span className="text-center">QUANTITY</span>
              <span className="text-right">TOTAL</span>
            </div>
          )}

          {/* ITEMS */}
          <div className="mt-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <Item key={`${item.id}-${item.color}-${item.size}`} {...item} />
              ))
            )}
          </div>

          <Link
            href="/products"
            className="inline-block mt-8 text-sm underline hover:opacity-60"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-gray-50 p-6 h-fit sticky top-24">
          <h2 className="text-xs tracking-widest mb-6 text-gray-600">
            PRICE DETAILS
          </h2>

          <div className="flex justify-between text-sm mb-3">
            <span>Product Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm mb-3">
            <span>Shipping</span>
            <span className="text-green-600">FREE</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-medium">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          {/* <Link
            href="/checkout"
            className="block mt-6 text-center bg-black text-white py-3 text-xs tracking-widest"
          >
            CHECKOUT • ₹{total.toFixed(2)}
          </Link> */}

          <button
            onClick={handleCheckout}
            className="block mt-6 w-full text-center bg-black text-white py-3 text-xs tracking-widest"
          >
            CHECKOUT • ₹{total.toFixed(2)}
          </button>

          <div className="mt-6 text-center">
            {/* ICON */}
            <img
              src="https://cdn.shopify.com/s/files/1/0618/3183/9957/files/payment.png?v=1710320605"
              alt="secure payment"
              className="mx-auto w-[3rem] opacity-80"
            />

            {/* TEXT */}
            <p className="text-xs text-gray-500 mt-2">
              Secured & Encrypted Payments
            </p>

            {/* PAYMENT METHODS */}
            <img
              src="https://cdn.shopify.com/s/files/1/0618/3183/9957/files/payment-options.png"
              alt="payment methods"
              className="mx-auto mt-7 w-[14rem] opacity-90"
            />
          </div>
        </div>
      </div>

      {/* MOBILE BAR */}
      {/* {cartItems.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center z-50">
          <p className="text-sm font-medium">
            ₹{total.toFixed(2)}
          </p>

          <Link
            href="/cart/checkout"
            className="bg-black text-white px-6 py-2 text-xs tracking-widest"
          >
            CHECKOUT
          </Link>
        </div>
      )} */}

      {showLogin && (
        <LoginPopup isOpen={showLogin} onClose={() => setShowLogin(false)} />
      )}
    </section>
  );
}

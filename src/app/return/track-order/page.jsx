"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Josefin_Sans } from "next/font/google";
import { useSelector } from "react-redux";
import API from "../../../lib/api";
import OrderDetailsUI from "../../../components/orders";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const trackOrder = async (e) => {
    e?.preventDefault();
    const value = query.trim();
    if (!value) {
      setError("Please enter your order ID or tracking / AWB number.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await API.post("/orders/track", { query: value });
      if (!res.data?.success || !res.data?.order) {
        setError(res.data?.message || "Order not found.");
        setOrder(null);
        return;
      }
      setOrder(res.data.order);
    } catch (err) {
      setOrder(null);
      setError(
        err.response?.data?.message ||
          "No order found for this tracking number or order ID.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${josefin.className} min-h-[70vh] bg-[#f5f5f3]`}>
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16">
        <AnimatePresence mode="wait">
          {!order ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="lg:max-w-[32em] lg:mx-auto"
            >
              <div className="bg-white border border-gray-200 p-6 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
                <h1 className="text-[17px] md:text-[18px] text-center font-medium tracking-[0.02em] text-[#1a1a1a] mb-8 uppercase">
                  Track Your Order
                </h1>

                <p className="text-base text-gray-500 mb-7 leading-relaxed">
                  Need your tracking or return info? Find your order here.
                </p>

                <form onSubmit={trackOrder} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter your Order ID"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setError("");
                    }}
                    className="w-full h-[60px] px-5 border border-solid border-gray-300 bg-white text-sm text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-black transition-all"
                  />

                  {error && <p className="text-red-500 text-xs">{error}</p>}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-[60px] rounded-full bg-[#1f232b] text-white text-sm font-semibold tracking-[0.2em] uppercase hover:bg-black active:scale-[0.99] transition-all disabled:opacity-60"
                    >
                      {loading ? "Tracking..." : "Track Order"}
                    </button>
                  </div>
                </form>

                <p className="text-xs text-gray-400 mt-6">
                  <em className="font-semibold text-[#1a1a1a] not-italic">
                    Note:
                  </em>{" "}
                  Use your Order ID (e.g. 1001).
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-between mb-5 md:mb-6 px-1">
                <h2 className="text-lg md:text-xl font-semibold text-[#1a1a1a]">
                  Order #{order.order_number}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setOrder(null);
                    setError("");
                  }}
                  aria-label="Close order details"
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black transition-colors text-sm"
                >
                  ✕
                </button>
              </div>

              <OrderDetailsUI
                order={order}
                allowAddressEdit={Boolean(isLoggedIn)}
                onOrderUpdated={setOrder}
              />

              {order.awb_code && (
                <p className="text-xs text-gray-500 mt-4 px-1">
                  AWB / Tracking ID:{" "}
                  <span className="font-medium text-[#1a1a1a]">
                    {order.awb_code}
                  </span>
                  {order.courier_name ? ` · ${order.courier_name}` : ""}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

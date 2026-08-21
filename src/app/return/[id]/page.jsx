"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Josefin_Sans } from "next/font/google";
import API from "../../../lib/api";
import { useSearchParams } from "next/navigation";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function ReturnPage() {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const requestType = searchParams.get("type") || "return";
  const orderItemId = searchParams.get("item");
  const isExchange = requestType === "exchange";
  const [exchangeSize, setExchangeSize] = useState("");

  const submitReturn = async () => {
    if (!orderItemId) {
      setError(
        "Missing item reference — please go back and try again from your orders page.",
      );
      return;
    }

    if (!reason) {
      setError("Please select a reason.");
      return;
    }

    if (isExchange && !exchangeSize) {
      setError("Please select a new size.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await API.post("/returns/create", {
        order_id: params.id,
        order_item_id: orderItemId,
        type: requestType,
        reason,
        comment,
        exchange_size: isExchange ? exchangeSize : undefined,
      });

      router.push("/account");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.reason?.[0] ||
        err.response?.data?.errors?.comment?.[0] ||
        err.response?.data?.errors?.order_item_id?.[0] ||
        "Something went wrong";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${josefin.className} min-h-screen bg-[#f5f5f3] relative overflow-hidden`}
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-black/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gray-300/30 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-20 relative z-10">
        <div className="lg:max-w-[32em] lg:mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-2xl border border-gray-200 p-6 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.06)]"
          >
            <div className="max-w-2xl">
              <h1 className="text-[17px] md:text-[18px] text-center font-medium tracking-[0.02em] text-[#1a1a1a] mb-10 uppercase">
                {isExchange ? "Request Exchange" : "Request Return"}
              </h1>

              <p className="text-base text-gray-500 mb-7 leading-relaxed">
                {isExchange
                  ? "Submit your exchange request. Once approved, we will arrange a reverse pickup and ship the replacement product."
                  : "Submit your return request. Once approved, we will arrange a reverse pickup."}
              </p>

              <div className="mb-4">
                <input
                  type="text"
                  value={`Order #${params.id}`}
                  disabled
                  className="w-full h-[60px] px-5 border border-solid bg-gray-50 text-sm text-[#1a1a1a]"
                />
              </div>

              {orderItemId && (
                <div className="mb-4">
                  <input
                    type="text"
                    value={`Item #${orderItemId}`}
                    disabled
                    className="w-full h-[60px] px-5 border border-solid bg-gray-50 text-sm text-[#1a1a1a]"
                  />
                </div>
              )}

              {isExchange ? (
                <>
                  <div className="mb-4">
                    <select
                      value={exchangeSize}
                      onChange={(e) => setExchangeSize(e.target.value)}
                      className="w-full h-[60px] px-5 border border-solid bg-white text-sm text-[#1a1a1a] outline-none focus:border-black transition-all"
                    >
                      <option value="">Select New Size</option>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full h-[60px] px-5 border border-solid bg-white text-sm text-[#1a1a1a] outline-none focus:border-black transition-all"
                    >
                      <option value="">Select Return Reason</option>
                      <option>Wrong Size</option>
                    </select>
                  </div>
                </>
              ) : (
                <div className="mb-4">
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full h-[60px] px-5 border border-solid bg-white text-sm text-[#1a1a1a] outline-none focus:border-black transition-all"
                  >
                    <option value="">Select Return Reason</option>
                    <option>Wrong Size</option>
                    <option>Damaged Product</option>
                    <option>Wrong Item</option>
                    <option>Defective Product</option>
                    <option>Quality Not As Expected</option>
                  </select>
                </div>
              )}

              <div className="mb-4">
                <textarea
                  rows={6}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us more about the issue..."
                  className="w-full p-5 border border-solid bg-white text-sm outline-none resize-none focus:border-black transition-all"
                />
              </div>

              {Error && <p className="text-red-500 text-xs mb-4">{Error}</p>}

              <div className="pt-2">
                <button
                  onClick={submitReturn}
                  disabled={loading}
                  className="w-full h-[60px] rounded-full bg-[#1f232b] text-white text-sm font-semibold tracking-[0.2em] uppercase hover:bg-black active:scale-[0.99] transition-all"
                >
                  {loading
                    ? isExchange
                      ? "Submitting Exchange..."
                      : "Submitting Return..."
                    : isExchange
                      ? "Submit Exchange Request"
                      : "Submit Return Request"}
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-6">
                <em className="font-semibold text-[#1a1a1a]">Note:</em>{" "}
                {isExchange
                  ? "Exchange requests are accepted within 7 days of delivery."
                  : "Return requests are accepted within 7 days of delivery."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

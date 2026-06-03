"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter, useParams, usePathname } from "next/navigation";

import {
  RefreshCcw,
  ShieldCheck,
  PackageCheck,
  ChevronRight,
  Truck,
} from "lucide-react";

export default function ReturnPage() {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [awb, setAwb] = useState("");
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  // ✅ CHECK ROUTE
  const isTrackPage = pathname === "/return/track-order";

  // RETURN REQUEST
  const submitReturn = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/returns/create`,
        {
          order_id: params.id,
          reason,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      router.push("/account");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // TRACK ORDER
  const trackOrder = () => {
    if (!awb) {
      setError("Please enter Your Tracking Id");

      return;
    }
    setError("");

    window.open(`https://shiprocket.co/tracking/${awb}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f3] relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-black/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gray-300/30 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-20 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="uppercase tracking-[6px] text-xs text-gray-500 mb-4">
            {isTrackPage ? "Track Shipment" : "Returns & Exchange"}
          </p>

          <h1 className="text-2xl md:text-4xl font-light tracking-tight leading-tight text-black">
            {isTrackPage ? "Track Your Order" : "Request a Return"}
          </h1>

          <p className="text-gray-500 mt-5 max-w-2xl text-sm md:text-base leading-7">
            {isTrackPage
              ? "Enter your tracking Id below to track your shipment in real time."
              : "Submit your return request below and our team will arrange a secure reverse pickup for your order."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-2xl border border-gray-200 rounded-[40px] p-6 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.06)]"
          >
            {/* RETURN PAGE */}
            {!isTrackPage ? (
              <>
                <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                  <div>
                    <p className="text-xs tracking-[4px] uppercase text-gray-400 mb-2">
                      Order ID
                    </p>

                    <h2 className="text-2xl md:text-3xl font-light">
                      #{params.id}
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center">
                    <RefreshCcw size={20} />
                  </div>
                </div>

                {/* REASON */}
                <div className="mb-8">
                  <label className="text-xs uppercase tracking-[4px] text-gray-500 block mb-4">
                    Select Return Reason
                  </label>

                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full h-16 rounded-2xl border border-gray-200 bg-[#fafafa] px-5 outline-none text-sm focus:border-black transition-all"
                  >
                    <option value="">Choose Reason</option>
                    <option>Wrong Size</option>
                    <option>Damaged Product</option>
                    <option>Wrong Item</option>
                    <option>Defective Product</option>
                    <option>Quality Not As Expected</option>
                  </select>
                </div>

                {/* COMMENT */}
                <div className="mb-10">
                  <label className="text-xs uppercase tracking-[4px] text-gray-500 block mb-4">
                    Additional Details
                  </label>

                  <textarea
                    rows={7}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the issue with your order..."
                    className="w-full rounded-3xl border border-gray-200 bg-[#fafafa] p-5 outline-none text-sm resize-none focus:border-black transition-all"
                  />
                </div>

                {/* BUTTON */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={submitReturn}
                  disabled={loading}
                  className="group w-full md:w-auto bg-black text-white px-10 h-16 rounded-full uppercase tracking-[4px] text-xs flex items-center justify-center gap-3 hover:bg-neutral-900 transition-all"
                >
                  {loading ? "Submitting..." : "Submit Return Request"}

                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-all"
                  />
                </motion.button>
              </>
            ) : (
              <>
                {/* TRACK ORDER FORM */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                  <div>
                    <p className="text-xs tracking-[4px] uppercase text-gray-400 mb-2">
                      Track Order
                    </p>

                    <h2 className="text-2xl md:text-2xl font-light">
                      Track Your order with Your Tracking id
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center">
                    <Truck size={20} />
                  </div>
                </div>

                <div className="mb-10">
                  <label className="text-xs uppercase tracking-[4px] text-gray-500 block mb-4">
                    Enter Tracking Id
                  </label>

                  <input
                    type="text"
                    value={awb}
                    placeholder="Enter tracking Id"
                    onChange={(e) => {
                      setAwb(e.target.value);
                      setError("");
                    }}
                    className="w-full h-16 rounded-2xl border border-gray-200 bg-[#fafafa] px-5 outline-none text-sm focus:border-black transition-all"
                  />
                  {Error && (
                    <p className="text-red-500 text-xs mt-2">{Error}</p>
                  )}
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={trackOrder}
                  className="group w-full md:w-auto bg-black text-white px-10 h-16 rounded-full uppercase tracking-[4px] text-xs flex items-center justify-center gap-3 hover:bg-neutral-900 transition-all"
                >
                  Track Order
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-all"
                  />
                </motion.button>
              </>
            )}
            <pre className="text-xs relative top-[53%]">
              Note:- Awb id is your tracking id
            </pre>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative overflow-hidden rounded-[38px] bg-gradient-to-br from-[#f1ebe3] to-[#e7ddd0] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
              <div className="absolute top-0 right-0 w-52 h-52 bg-white/30 blur-3xl rounded-full" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-xl flex items-center justify-center mb-7 shadow-md">
                  <PackageCheck size={24} className="text-[#927d67]" />
                </div>

                <h3 className="text-3xl font-light text-[#2a2a2a] leading-snug mb-5">
                  {isTrackPage
                    ? "Live Shipment Tracking"
                    : "Secure Reverse Pickup Service"}
                </h3>

                <p className="text-[#6b6b6b] leading-8 text-sm">
                  {isTrackPage
                    ? "Track your shipment status, courier updates and estimated delivery in real time."
                    : "Our logistics partner will securely collect your return from your doorstep once your request is approved."}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-gray-200 p-8 md:p-10 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>

              <h3 className="text-2xl font-light mb-5">
                {isTrackPage ? "Tracking Information" : "Return Policy"}
              </h3>

              <ul className="space-y-4 text-sm text-gray-600 leading-7">
                {isTrackPage ? (
                  <>
                    <li>• Use your AWB tracking code</li>
                    <li>• Real-time courier updates</li>
                    <li>• Live shipment movement</li>
                    <li>• Estimated delivery tracking</li>
                  </>
                ) : (
                  <>
                    <li>• Returns accepted within 7 days</li>
                    <li>• Product must be unused</li>
                    <li>• Refunds after inspection</li>
                    <li>• Reverse pickup depends on area</li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

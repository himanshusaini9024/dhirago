"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Josefin_Sans } from "next/font/google";
import API from "../../../lib/api";

import {
  RefreshCcw,
  ShieldCheck,
  PackageCheck,
  ChevronRight,
  Truck,
} from "lucide-react";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

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
  const userdata = useSelector((state) => state.auth.user);
  const customer_id = userdata?.customer_id;

  // RETURN REQUEST
  const submitReturn = async () => {
    try {
      setLoading(true);
      await API.post("/returns/create", {
        order_id: params.id,
        customer_id,
        reason,
        comment,
      });
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
    <div
      className={` ${josefin.className} ${isTrackPage ? " bg-[#f5f5f3] relative overflow-hidden" : "min-h-screen bg-[#f5f5f3] relative overflow-hidden"}`}
    >
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-black/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gray-300/30 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-20 relative z-10">
      

        <div className="lg:max-w-[32em] lg:mx-auto">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-2xl border border-gray-200  p-6 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.06)]"
          >
            {/* ── RETURN FORM ── */}
            {!isTrackPage ? (
              <>
                <div className="max-w-2xl">
                  {/* Title */}
                  <h1 className="text-[17px] md:text-[18px] text-center font-medium tracking-[0.02em] text-[#1a1a1a] mb-10 uppercase">
                    Request Return
                  </h1>

                  {/* Description */}
                  <p className="text-base text-gray-500 mb-7 leading-relaxed">
                    Submit your return request below. Once approved, our team
                    will arrange a reverse pickup from your address.
                  </p>

                  {/* Order Number */}
                  <div className="mb-4">
                    <input
                      type="text"
                      value={`Order #${params.id}`}
                      disabled
                      className="w-full h-[60px] px-5 border border-solid bg-gray-50 text-sm text-[#1a1a1a]"
                    />
                  </div>

                  {/* Reason */}
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

                  {/* Comment */}
                  <div className="mb-4">
                    <textarea
                      rows={6}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us more about the issue..."
                      className="w-full p-5 border border-solid bg-white text-sm outline-none resize-none focus:border-black transition-all"
                    />
                  </div>

                  {Error && (
                    <p className="text-red-500 text-xs mb-4">{Error}</p>
                  )}

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      onClick={submitReturn}
                      disabled={loading}
                      className="w-full h-[60px] rounded-full bg-[#1f232b] text-white text-sm font-semibold tracking-[0.2em] uppercase hover:bg-black active:scale-[0.99] transition-all"
                    >
                      {loading ? "Submitting..." : "Submit Return Request"}
                    </button>
                  </div>

                  {/* Note */}
                  <p className="text-xs text-gray-400 mt-6">
                    <em className="font-semibold text-[#1a1a1a]">Note:</em>{" "}
                    Return requests can only be submitted within 15 days of
                    delivery.
                  </p>
                </div>
              </>
            ) : (
              /* ── TRACK ORDER FORM (updated UI) ── */
              <div className="max-w-2xl">
                {/* Title */}
                <h1 className="text-[17px] md:text-[18px] text-center font-medium tracking-[0.02em] text-[#1a1a1a] mb-10 uppercase">
                  Track Your Order
                </h1>

                {/* Sign in row */}

                {/* Sub-heading */}
                <p className="text-base text-gray-500 mb-7 leading-relaxed">
                  Need your tracking or return info? Find your order here.
                </p>

                {/* Inputs + Button */}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Tacking number/awb"
                    value={awb}
                    onChange={(e) => {
                      setAwb(e.target.value);
                      setError("");
                    }}
                    className="w-full h-[60px] px-5 border border-solid border-gray-300  bg-white text-sm text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-black transition-all"
                  />

                  {Error && <p className="text-red-500 text-xs">{Error}</p>}

                  <div className="pt-2">
                    <button
                      onClick={trackOrder}
                      className="w-full h-[60px] rounded-full bg-[#1f232b] text-white text-sm font-semibold tracking-[0.2em] uppercase hover:bg-black active:scale-[0.99] transition-all"
                    >
                      Track Order
                    </button>
                  </div>
                </div>

                {/* Note */}
                <p className="text-xs text-gray-400 mt-6 ">
                  <em className="font-semibold text-[#1a1a1a] ">Note:</em> AWB
                  ID is your tracking ID
                </p>
              </div>
            )}
          </motion.div>

          {/* RIGHT SIDE */}
        </div>
      </div>
    </div>
  );
}

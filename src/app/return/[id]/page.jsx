"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Josefin_Sans } from "next/font/google";

import {
  RefreshCcw,
  ShieldCheck,
  PackageCheck,
  ChevronRight,
  Truck,
} from "lucide-react";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

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
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/returns/create`,
        { order_id: params.id, customer_id, reason, comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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
    if (!awb) { setError("Please enter Your Tracking Id"); return; }
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
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="uppercase tracking-[6px] text-xs text-gray-500 mb-4">
            {isTrackPage ? "" : "Returns & Exchange"}
          </p>
          <h1 className="text-2xl md:text-4xl font-light tracking-tight leading-tight text-black">
            {isTrackPage ? "" : "Request a Return"}
          </h1>
          <p className="text-gray-500 mt-5 max-w-2xl text-sm md:text-base leading-7">
            {isTrackPage
              ? ""
              : "Submit your return request below and our team will arrange a secure reverse pickup for your order."}
          </p>
        </motion.div>

        <div className={` ${isTrackPage ? "lg:max-w-[32em] lg:relative lg:left-[28%]" : "grid lg:grid-cols-[1.2fr_0.8fr] gap-8"}`}>
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
                <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                  <div>
                    <p className="text-xs tracking-[4px] uppercase text-gray-400 mb-2">Order ID</p>
                    <h2 className="text-2xl md:text-3xl font-light">#{params.id}</h2>
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
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-all" />
                </motion.button>
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
                    onChange={(e) => { setAwb(e.target.value); setError(""); }}
                    className="w-full h-[60px] px-5 border border-solid border-gray-300  bg-white text-sm text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-black transition-all"
                  />

               

                  {Error && (
                    <p className="text-red-500 text-xs">{Error}</p>
                  )}

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
                  <em className="font-semibold text-[#1a1a1a] ">Note:</em> AWB ID is your tracking ID
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
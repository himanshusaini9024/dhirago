"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { loginSuccess } from "../../store/authslice";
 // adjust path

export default function LoginPopup({ isOpen, onClose }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
const API = process.env.NEXT_PUBLIC_API_URL;

// Helper: fetch CSRF token from Sanctum before any state-changing request
const fetchCsrf = async () => {
  await fetch(`${API}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
};

// Helper: read XSRF-TOKEN cookie (Sanctum sets it after csrf-cookie call)
const getXsrfToken = () => {
  return decodeURIComponent(
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1] || ""
  );
};

  if (!isOpen) return null;

  // ✅ SEND OTP
  const handleSendOtp = async () => {
    if (mobile.length !== 10) return;

    setLoading(true);

    try {
     await fetchCsrf();

        const res = await fetch(`${API}/api/send-otp`, {
          method: "POST",
          credentials: "include",           // ✅ added
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": getXsrfToken(), // ✅ added
          },
          body: JSON.stringify({ mobile }),
        });

        const data = await res.json().catch(async () => {
          throw new Error("Server error");
        });

        if (!res.ok) throw new Error(data.message);

      setStep("otp");
    } catch (err) {
      alert("Error sending OTP");
      console.error(err);
    }

    setLoading(false);
  };

  // ✅ VERIFY OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;

    setLoading(true);

    try {
     await fetchCsrf();

        const res = await fetch(`${API}/api/verify-otp`, {
          method: "POST",
          credentials: "include",           // ✅ already had this
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": getXsrfToken(), // ✅ added
          },
          body: JSON.stringify({ mobile, otp }),
        });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Invalid OTP");

      // // ✅ Save login
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("isLoggedIn", true);
      // localStorage.setItem("user", JSON.stringify(data.user));

      // Cookies.set("token", data.token);
  
      dispatch(
        loginSuccess({
          user: data.user
        })
      );

      // ✅ Close popup
      onClose();

    } catch (err) {
      alert(err.message);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[500px] max-w-[95%] bg-white rounded-xl shadow-xl p-6">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 text-xl"
        >
          ✕
        </button>

        <h2 className="text-center text-lg font-semibold text-yellow-600 tracking-widest">
          LOG IN / SIGN UP
        </h2>

        <p className="text-center text-sm text-gray-500 mt-1 mb-4">
          Join Now for Seamless Shopping Experience
        </p>

        <ul className="text-sm text-gray-600 mb-6 space-y-1">
          <li>✔ Easy order tracking</li>
          <li>✔ Manage return within 15-days</li>
          <li>✔ Exclusive deals</li>
        </ul>

        {/* MOBILE STEP */}
        {step === "mobile" && (
          <>
            <label className="text-xs text-gray-500">MOBILE NUMBER*</label>

            <div className="flex items-center border p-3 rounded mt-1 mb-4">
              <span className="mr-2">+91</span>
              <input
                type="tel"
                value={mobile}
                maxLength={10}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={mobile.length !== 10 || loading}
              className={`w-full py-3 text-white ${
                mobile.length === 10 ? "bg-black" : "bg-gray-300"
              }`}
            >
              {loading ? "Sending..." : "GET OTP"}
            </button>
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <label className="text-xs text-gray-500">ENTER OTP</label>

            <input
              type="text"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-3 rounded mt-1 mb-4"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6 || loading}
              className={`w-full py-3 text-white ${
                otp.length === 6 ? "bg-black" : "bg-gray-300"
              }`}
            >
              {loading ? "Verifying..." : "VERIFY OTP"}
            </button>

            <p
              onClick={() => setStep("mobile")}
              className="text-xs text-blue-500 mt-3 cursor-pointer"
            >
              Change Number
            </p>
          </>
        )}
      </div>
    </div>
  );
}
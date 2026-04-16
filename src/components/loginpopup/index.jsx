"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { auth } from "../../lib/firebase";
import { loginSuccess } from "../../store/authslice";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// adjust path

export default function LoginPopup({ isOpen, onClose }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);

  const [step, setStep] = useState("mobile");
  const [loading, setLoading] = useState(false);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        },
      );
    }
  };

  const dispatch = useDispatch();

  if (!isOpen) return null;

  // ✅ SEND OTP

 const handleSendOtp = async () => {
  if (mobile.length !== 10 || loading) return;

  setLoading(true);

  try {
    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;

    const result = await signInWithPhoneNumber(
      auth,
      `+91${mobile}`,
      appVerifier
    );

    setConfirmObj(result);
    setStep("otp");

  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    alert(err.message || "Failed to send OTP");
  }

  setLoading(false);
};

  // ✅ VERIFY OTP
 const handleVerifyOtp = async () => {
   if (!confirmObj) {
      alert("Please request OTP first");
      return;
    }
  if (otp.length !== 6) return;

  setLoading(true);

  try {
       const res = await confirmObj.confirm(otp);
      console.log('user',res);
      const user = res.user;

    // ✅ OPTIONAL: send to backend
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/firebase-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: user.phoneNumber,
          uid: user.uid,
        }),
      }
    );

    const data = await backendRes.json();

    // ✅ Save login
    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user", JSON.stringify(data.user));

    Cookies.set("token", data.token);

    dispatch(loginSuccess({ user: data.user, token: data.token }));

    onClose();

  } catch (err) {
    console.error(err);
    alert("Invalid OTP ❌");
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
      <div id="recaptcha-container"></div>
    </div>
  );
}

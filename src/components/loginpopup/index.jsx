"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authslice";
import { toast } from "react-hot-toast";
import { CheckCircle2, XCircle } from "lucide-react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const successToast = (msg) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } bg-white border border-green-100 shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-4 min-w-[320px]`}
      >
        <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="text-green-600 w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Success</p>
          <p className="text-xs text-gray-500 mt-1">{msg}</p>
        </div>
      </div>
    ),
    { duration: 3000 },
  );
};

const errorToast = (msg) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } bg-white border border-red-100 shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-4 min-w-[320px]`}
      >
        <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle className="text-red-600 w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Error</p>
          <p className="text-xs text-gray-500 mt-1">{msg}</p>
        </div>
      </div>
    ),
    { duration: 3000 },
  );
};

const PERKS = [
  {
    title: "Clothing & Accessories",
    body: "Designed for  men.",
  },
  {
    title: "All Natural Fabrics",
    body: "Sourced and handcrafted in India.",
  },
  {
    title: "Shop From Anywhere",
    body: "Safe payments, global shipping.",
  },
];

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#E8C56A" aria-hidden>
      <path d="M12 2.5l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.5 6.6 19.3l1-6.1L3.2 8.9l6.1-.9L12 2.5z" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 12a8 8 0 1 1-2.2-5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M20 4v5h-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LoginPopup({ isOpen, onClose }) {
  const [mobile, setMobile] = useState("");
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [step, setStep] = useState("mobile");
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [perkIndex, setPerkIndex] = useState(0);
  const [resendIn, setResendIn] = useState(0);
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const API = process.env.NEXT_PUBLIC_API_URL;
  const otp = otpDigits.join("");

  const fetchCsrf = async () => {
    await fetch(`${API}/sanctum/csrf-cookie`, {
      credentials: "include",
    });
  };

  const getXsrfToken = () => {
    return decodeURIComponent(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1] || "",
    );
  };

  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
  }, [step]);

  useEffect(() => {
    if (resendIn <= 0) return undefined;
    const timer = setInterval(() => {
      setResendIn((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendIn]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const timer = setInterval(() => {
      setPerkIndex((i) => (i + 1) % PERKS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = async ({ isResend = false } = {}) => {
    if (mobile.length !== 10) return;
    if (isResend && resendIn > 0) return;
    setLoading(true);

    try {
      await fetchCsrf();

      const res = await fetch(`${API}/api/send-otp`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": getXsrfToken(),
        },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json().catch(async () => {
        throw new Error("Server error");
      });

      if (!res.ok) throw new Error(data.message);

      setOtpDigits(Array(OTP_LENGTH).fill(""));
      setActiveIndex(0);
      setResendIn(RESEND_SECONDS);
      setStep("otp");
      successToast(
        isResend
          ? "OTP resent to your mobile number"
          : "OTP successfully sent to your mobile number",
      );
    } catch (err) {
      errorToast(err.message || "Error sending OTP");
      console.error(err);
    }

    setLoading(false);
  };

  const handleVerifyOtp = async (code = otp) => {
    if (code.length !== OTP_LENGTH) return;
    setLoading(true);

    try {
      await fetchCsrf();

      const res = await fetch(`${API}/api/verify-otp`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": getXsrfToken(),
        },
        body: JSON.stringify({ mobile, otp: code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");

      dispatch(
        loginSuccess({
          user: data.user,
        }),
      );

      onClose();
      successToast("OTP successfully verified");
    } catch (err) {
      errorToast(err.message || "Error verifying OTP");
      console.error(err);
    }

    setLoading(false);
  };

  const updateDigit = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otpDigits];
    next[index] = digit;
    setOtpDigits(next);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }

    const code = next.join("");
    if (code.length === OTP_LENGTH && next.every(Boolean)) {
      handleVerifyOtp(code);
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...otpDigits];
      if (next[index]) {
        next[index] = "";
        setOtpDigits(next);
      } else if (index > 0) {
        next[index - 1] = "";
        setOtpDigits(next);
        inputRefs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
      }
      return;
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }

    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    const next = Array(OTP_LENGTH)
      .fill("")
      .map((_, i) => pasted[i] || "");
    setOtpDigits(next);

    const focusAt = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusAt]?.focus();
    setActiveIndex(focusAt);

    if (pasted.length === OTP_LENGTH) {
      handleVerifyOtp(pasted);
    }
  };

  const goToMobileStep = () => {
    setStep("mobile");
    setOtpDigits(Array(OTP_LENGTH).fill(""));
    setActiveIndex(0);
    setResendIn(0);
  };

  const canSubmitMobile = mobile.length === 10 && !loading;
  const canSubmitOtp = otp.length === OTP_LENGTH && !loading;
  const activePerk = PERKS[perkIndex];

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-3 sm:p-4 ${josefin.className}`}
    >
      <div
        className="relative w-full max-w-[400px] md:max-w-[860px] rounded-2xl bg-[#b39572] shadow-2xl overflow-hidden
                   md:p-5 md:flex md:flex-row md:items-stretch md:gap-4"
        role="dialog"
        aria-modal="true"
        aria-label={step === "otp" ? "OTP Verification" : "Login or Signup"}
      >
        {/* Close — mobile sits on tan shell; desktop sits on white card */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/90 md:bg-[#f3f3f3] text-[#555] hover:text-black text-lg leading-none md:hidden"
          aria-label="Close"
        >
          ×
        </button>

        {/* LEFT / TOP — brand + perks */}
        <div className="relative text-white px-5 pt-5 pb-4 md:px-5 md:py-5 md:w-[55%] flex flex-col">
          <div className="shrink-0">
            <p
              className={`text-[18px] md:text-[24px] tracking-[0.28em] uppercase font-medium ${josefin.className}`}
            >
              Dhirago
            </p>
            <p className="mt-0.5 md:mt-1 text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-white/75">
              The beauty of time
            </p>
          </div>

          {/* Mobile: capsule carousel */}
          <div className="mt-5 flex flex-col items-center md:hidden">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 px-4 py-2.5 bg-white/5 min-w-[220px] justify-center">
              <StarIcon />
              <span className="text-[13px] font-medium text-white whitespace-nowrap">
                {activePerk.title}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {PERKS.map((perk, i) => (
                <button
                  key={perk.title}
                  type="button"
                  onClick={() => setPerkIndex(i)}
                  aria-label={`Show ${perk.title}`}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    i === perkIndex ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: 3 perk cards */}
          <div className="hidden md:flex md:flex-1 md:items-center">
            <div className="w-full grid grid-cols-3 gap-3">
              {PERKS.map((perk) => (
                <div
                  key={perk.title}
                  className="rounded-xl bg-[#9d8060]/80 px-2.5 py-4 text-center border border-white/10 flex flex-col items-center justify-center min-h-[150px]"
                >
                  <div className="flex justify-center mb-2">
                    <StarIcon />
                  </div>
                  <p className="text-[13px] font-semibold leading-snug">
                    {perk.title}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-[1.4] text-white/85">
                    {perk.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT / BOTTOM — white form card */}
        <div className="relative bg-white rounded-2xl shadow-md mx-3 mb-3 md:mx-0 md:mb-0 md:w-[45%] flex flex-col justify-center px-5 py-7 sm:px-7 sm:py-8 md:px-8 md:py-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#f3f3f3] text-[#555] hover:text-black text-lg leading-none hidden md:block"
            aria-label="Close"
          >
            ×
          </button>

          {step === "mobile" ? (
            <div className="w-full max-w-[320px] mx-auto">
              <h3 className="text-[22px] sm:text-[24px] font-medium text-[#1a1a1a] text-center">
                Login / Sign up
              </h3>

              <div className="mt-6  border border-solid flex items-center rounded-xl border border-[#d7d7d7] overflow-hidden focus-within:border-[#b39572] bg-white">
                <div className="flex items-center gap-2 px-3 py-3.5 bg-[#fafafa] border-r border-[#e5e5e5] shrink-0">
                  <span
                    className="inline-block w-[18px] h-[12px] rounded-[1px] overflow-hidden border border-[#ddd] shrink-0"
                    aria-hidden
                  >
                    <span className="block h-1/3 bg-[#FF9933]" />
                    <span className="block h-1/3 bg-white relative">
                      <span className="absolute inset-0 m-auto w-[5px] h-[5px] rounded-full border border-[#000080]" />
                    </span>
                    <span className="block h-1/3 bg-[#138808]" />
                  </span>
                  <span className="text-[14px] text-[#333] font-medium">+91</span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={mobile}
                  maxLength={10}
                  placeholder="Enter Mobile Number"
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  className="w-full px-3 py-3.5 outline-none text-[14px] text-[#222] placeholder:text-[#999]"
                />
              </div>

              <label className="mt-4 flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notify}
                  onChange={(e) => setNotify(e.target.checked)}
                  className="w-4 h-4 rounded border border-[#ccc] accent-[#1a1a1a]"
                />
                <span className="text-[12px] sm:text-[13px] text-[#777]">
                  Notify me with offers & updates
                </span>
              </label>

              <button
                type="button"
                onClick={() => handleSendOtp()}
                disabled={!canSubmitMobile}
                className={`mt-5 w-full rounded-xl py-3.5 text-[15px] font-semibold text-white transition-colors ${
                  canSubmitMobile
                    ? "bg-[#111] hover:bg-black"
                    : "bg-[#cfcfcf] cursor-not-allowed"
                }`}
              >
                {loading ? "Sending..." : "Submit"}
              </button>

              <p className="mt-6 text-[11px] leading-[1.55] text-[#888] text-center">
                I accept that I have read & understood your{" "}
                <a href="/privacy-policy" className="underline underline-offset-2">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/shipping-and-return"
                  className="underline underline-offset-2"
                >
                  T&amp;Cs
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="w-full max-w-[320px] mx-auto">
              <h3 className="text-[22px] sm:text-[20px] font-medium text-[#1a1a1a] text-center">
                OTP Verification
              </h3>

              <p className="mt-3 text-[13px] sm:text-[14px] text-[#888] text-center">
                Verification code sent to
              </p>

              <div className="mt-2 flex items-center justify-center gap-2.5 flex-wrap">
                <span className="text-[15px] text-[#333] font-semibold">
                  +91 {mobile}
                </span>
                <button
                  type="button"
                  onClick={goToMobileStep}
                  className="inline-flex items-center rounded-full border border-[#3cb371] px-3 py-0.5 text-[12px] font-medium text-[#3cb371] hover:bg-[#3cb371]/5 transition-colors"
                >
                  Edit
                </button>
              </div>

              <div
                className="mt-7 flex items-center justify-center gap-2 sm:gap-2.5"
                onPaste={handleOtpPaste}
              >
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => updateDigit(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onFocus={() => setActiveIndex(index)}
                    className={`w-10 h-11 sm:w-11 sm:h-12 rounded-lg text-center text-[18px] font-semibold text-[#1a1a1a] outline-none transition-colors ${
                      activeIndex === index || digit
                        ? "border border-[#b39572] shadow-[0_0_0_2px_rgba(179,149,114,0.15)]"
                        : "border border-[#d9d9d9] shadow-[0_0_0_2px_rgba(179,149,114,0.15)]"
                    }`}
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </div>

              <div className="mt-5 flex justify-center">
                {resendIn > 0 ? (
                  <p className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#b39572]">
                    <RefreshIcon />
                    Resend OTP in {resendIn} Sec
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp({ isResend: true })}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#b39572] hover:opacity-80 disabled:opacity-50"
                  >
                    <RefreshIcon />
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleVerifyOtp()}
                disabled={!canSubmitOtp}
                className={`mt-6 w-full rounded-xl py-3.5 text-[15px] font-semibold text-white transition-colors ${
                  canSubmitOtp
                    ? "bg-[#b39572] hover:bg-[#a38462]"
                    : "bg-[#d8d8d8] cursor-not-allowed"
                }`}
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

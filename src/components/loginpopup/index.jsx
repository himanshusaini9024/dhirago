"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authslice";
import { toast } from "react-hot-toast";
import { CheckCircle2, XCircle, Timer } from "lucide-react";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";

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

export default function LoginPopup({ isOpen, onClose }) {
  const [mobile, setMobile] = useState("");
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [step, setStep] = useState("mobile");
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [resendIn, setResendIn] = useState(0);
  const [otpError, setOtpError] = useState("");
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

  if (!isOpen) return null;

  const handleSendOtp = async ({ isResend = false } = {}) => {
    if (mobile.length !== 10) return;
    if (isResend && resendIn > 0) return;
    setOtpError("");
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

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.message ||
            data.errors?.otp?.[0] ||
            "Incorrect OTP. Please check the code and try again.",
        );
      }

      dispatch(
        loginSuccess({
          user: data.user,
        }),
      );
      setOtpError("");

      onClose();
      successToast("OTP successfully verified");
    } catch (err) {
      const message =
        err.message || "Incorrect OTP. Please check the code and try again.";
      setOtpError(message);
      errorToast(message);
      console.error(err);
    }

    setLoading(false);
  };

  const updateDigit = (index, value) => {
    setOtpError("");
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
    setOtpError("");
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
    setOtpError("");
  };

  const canSubmitMobile = mobile.length === 10 && !loading;
  const canSubmitOtp = otp.length === OTP_LENGTH && !loading;

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-3 sm:p-4 ${josefin.className}`}
    >
      <div
        className="relative grid w-full max-w-[780px] grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-[42%_58%]"
        role="dialog"
        aria-modal="true"
        aria-label={step === "otp" ? "OTP Verification" : "Login or Signup"}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 border-0 bg-transparent text-2xl leading-none text-[#111] hover:opacity-70"
          aria-label="Close"
        >
          ×
        </button>

        {/* Left banner column: stretches to match the right column's natural height */}
        <div className="relative hidden bg-[#1a1a1a] md:block">
          <Image
            src="/images/aboutfooter.jpg"
            alt="Dhirago promotional banner"
            fill
            sizes="(min-width: 768px) 42vw, 0px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/25" />
          <div className="absolute inset-0 p-6 text-white">
            <h3 className="max-w-[220px] text-[26px] leading-[1.2] font-normal text-white">
              Register &amp; Be A Part Of The Dhirago Circle!
            </h3>
           
            <p className="absolute bottom-4 right-4 text-[10px] text-white/90">
              T&amp;C Apply
            </p>
          </div>
        </div>

        {/* Right form column: content drives the row height, left column stretches to match */}
        <div className="flex flex-col justify-center px-6 py-8 sm:px-8 md:py-10">
          {step === "mobile" ? (
            <div className="mx-auto w-full max-w-[320px]">
              <p className="text-center text-[26px] leading-none tracking-[0.28em] text-[#111]">
                DHIRAGO
              </p>
              {/* <p className="mt-1 text-center text-[10px] tracking-[0.4em] text-[#111]">
                THE BEAUTY OF TIME
              </p> */}

              <h3 className="mt-6 text-center text-lg font-bold text-[#111]">
                Login / Sign up
              </h3>
              <p className="mt-1 text-center text-sm text-[#111]">
                Enter your log in details
              </p>

              <p className="mt-6 text-sm font-semibold text-[#111]">Phone</p>
              <div className="mt-2 flex items-center overflow-hidden rounded-md border border-[#d2d8e2] bg-[#ecf2fd]">
                <div className="flex shrink-0 items-center gap-2 border-r border-[#d0d7e2] bg-white px-3 py-2.5">
                  <span
                    className="inline-block h-[10px] w-[15px] shrink-0 overflow-hidden rounded-[1px] border border-[#ddd]"
                    aria-hidden
                  >
                    <span className="block h-1/3 bg-[#FF9933]" />
                    <span className="relative block h-1/3 bg-white">
                      <span className="absolute inset-0 m-auto w-[4px] h-[4px] rounded-full border border-[#000080]" />
                    </span>
                    <span className="block h-1/3 bg-[#138808]" />
                  </span>
                  <span className="text-sm text-[#333]">+91</span>
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
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-[#111] outline-none placeholder:text-[#8a95a8]"
                />
              </div>

              <button
                type="button"
                onClick={() => handleSendOtp()}
                disabled={!canSubmitMobile}
                className={`mt-4 w-full rounded-md py-2.5 text-sm font-medium text-white transition-colors ${
                  canSubmitMobile
                    ? "bg-black hover:bg-[#111]"
                    : "cursor-not-allowed bg-[#bcbcbc]"
                }`}
              >
                {loading ? "Sending..." : "Request OTP"}
              </button>

              <p className="mt-6 text-center text-xs leading-[1.5] text-[#9a9a9a]">
                I accept that I have read & understood your{" "}
                <a href="/privacy-policy" className="underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/shipping-and-return" className="underline">
                  T&amp;Cs
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-[340px]">
              <p className="text-center text-[26px] leading-none tracking-[0.28em] text-[#111]">
                DHIRAGO
              </p>

              <div className="mt-8 flex items-center justify-center gap-2.5">
                <p className="text-[15px] font-medium tracking-wide text-[#1a1a1a]">
                  +91 {mobile}
                </p>
                <button
                  type="button"
                  onClick={goToMobileStep}
                  className="rounded-full border border-[#22c55e] px-3 py-[3px] text-[11px] font-medium leading-none text-[#16a34a] transition-colors hover:bg-[#22c55e] hover:text-white"
                >
                  Edit
                </button>
              </div>

              <div
                className="mt-7 flex items-center justify-center gap-2.5 sm:gap-3"
                onPaste={handleOtpPaste}
              >
                {otpDigits.map((digit, index) => {
                  const isActive = activeIndex === index;
                  return (
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
                      aria-invalid={Boolean(otpError)}
                      className={`h-[48px] w-[48px] rounded-[12px] bg-white text-center text-[20px] font-semibold text-[#111] outline-none transition-all duration-150 sm:h-[52px] sm:w-[52px] ${
                        otpError
                          ? "border-[1.5px] border-red-500 shadow-[0_0_0_3px_rgba(248,113,113,0.18)]"
                          : isActive
                          ? "border-[1.5px] border-black shadow-[0_0_0_3px_rgba(147,197,253,0.55)]"
                          : "border border-[#d8dde6]"
                      }`}
                      aria-label={`OTP digit ${index + 1}`}
                    />
                  );
                })}
              </div>

              {otpError && (
                <p
                  role="alert"
                  className="mt-3 text-center text-xs leading-relaxed text-red-600"
                >
                  {otpError}
                </p>
              )}

              <div className="mt-5 flex items-center justify-center gap-1.5 text-[#4b5568]">
                {resendIn > 0 ? (
                  <>
                    <Timer className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                    <p className="text-[12px] font-medium">
                      Resend OTP in {resendIn} Sec
                    </p>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp({ isResend: true })}
                    disabled={loading}
                    className="text-[12px] font-medium text-[#111] underline underline-offset-2 disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleVerifyOtp()}
                disabled={!canSubmitOtp}
                className={`mt-6 w-full rounded-[12px] py-3.5 text-[15px] font-medium text-white transition-colors ${
                  canSubmitOtp
                    ? "bg-black hover:bg-[#111]"
                    : "cursor-not-allowed bg-[#d1d5db]"
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
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../../assets/icons/logo";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Phone } from "lucide-react";
 import { useDispatch } from "react-redux";
          import { loginSuccess } from "../../../store/authslice";
export default function LoginDrawer({ open, setOpen }) {
          const dispatch = useDispatch();

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const [loginType, setLoginType] = useState("mobile");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ================= OTP FLOW =================
      if (loginType === "mobile") {
        if (!otpSent) {
          // 👉 SEND OTP
          const res = await fetch("http://127.0.0.1:8000/api/send-otp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ mobile }),
          });

          let data;

          try {
            data = await res.json();
          } catch (e) {
            const text = await res.text();
            console.error("Invalid JSON:", text);
            throw new Error("Server error");
          }

          if (!res.ok) throw new Error(data.message);

          setOtpSent(true);
        } else {
          // 👉 VERIFY OTP
          const res = await fetch("http://127.0.0.1:8000/api/verify-otp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mobile, otp }),
          });

          const data = await res.json();

          if (!res.ok) throw new Error(data.message);

         


          // after success
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          dispatch(
            loginSuccess({
              user: data.user,
              token: data.token,
            }),
          );
          setOpen(false);
        }
      }

      // ================= EMAIL LOGIN =================
      else {
        const res = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        localStorage.setItem("token", data.token);
        setOpen(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>

            {/* Drawer */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#f4f4f5] z-50 flex flex-col"
              >
                {/* ✅ HEADER (KEEP THIS) */}
                <div className="flex items-center justify-between px-6 py-5 bg-white border-b">
                  <button
                    onClick={() => setOpen(false)}
                    className="text-2xl hover:text-red-500 transition"
                  >
                    ✕
                  </button>
                </div>

                {/* CENTER */}
                <div className="flex-1 flex items-center justify-center px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-xl border overflow-hidden"
                  >
                    {/* 🔥 TOP BANNER (NOW BELOW HEADER) */}
                    <div className="relative h-32 w-full overflow-hidden">
                      {/* Background Image */}
                      <Image
                        src="/images/login/loginbanner.jpeg"
                        alt="Login Banner"
                        fill
                        className="absolute inset-0 object-cover"
                      />

                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/50" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      {/* TITLE */}
                      <h2 className="text-center text-xl font-semibold mb-4">
                        Login
                      </h2>

                      {/* TOGGLE */}
                      <div className="flex bg-gray-100 rounded-lg p-1 mb-5">
                        <button
                          onClick={() => setLoginType("mobile")}
                          className={`flex-1 py-2 rounded-md text-sm ${
                            loginType === "mobile"
                              ? "bg-white shadow font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          Login with OTP
                        </button>

                        <button
                          onClick={() => setLoginType("email")}
                          className={`flex-1 py-2 rounded-md text-sm ${
                            loginType === "email"
                              ? "bg-white shadow font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          Email
                        </button>
                      </div>

                      {/* FORM */}
                      <form onSubmit={handleLogin} className="space-y-4">
                        <AnimatePresence mode="wait">
                          {/* MOBILE */}
                          {loginType === "mobile" && (
                            <motion.div key="mobile">
                              {!otpSent ? (
                                <>
                                  <div className="relative">
                                    <Phone
                                      className="absolute left-3 top-2.5 text-gray-400"
                                      size={18}
                                    />
                                    <input
                                      type="tel"
                                      placeholder="Enter mobile number"
                                      value={mobile}
                                      maxLength={10}
                                      onChange={(e) =>
                                        setMobile(e.target.value)
                                      }
                                      className="w-full border rounded-lg pl-10 pr-4 py-2"
                                      required
                                    />
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    We will send OTP to your phone
                                  </p>
                                </>
                              ) : (
                                <input
                                  type="text"
                                  placeholder="Enter OTP"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                  className="w-full border rounded-lg px-4 py-2"
                                  required
                                />
                              )}
                            </motion.div>
                          )}

                          {/* EMAIL */}
                          {loginType === "email" && (
                            <motion.div
                              key="email"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="space-y-4"
                            >
                              <div className="relative">
                                <Mail
                                  className="absolute left-3 top-2.5 text-gray-400"
                                  size={18}
                                />
                                <input
                                  type="email"
                                  placeholder="Email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="w-full border rounded-lg pl-10 pr-4 py-2"
                                  required
                                />
                              </div>

                              <div className="relative">
                                <Lock
                                  className="absolute left-3 top-2.5 text-gray-400"
                                  size={18}
                                />
                                <input
                                  type="password"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="w-full border rounded-lg pl-10 pr-4 py-2"
                                  required
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {error && (
                          <p className="text-red-500 text-sm">{error}</p>
                        )}

                        {/* BUTTON */}
                        <button
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-2.5 rounded-lg"
                        >
                          {loading
                            ? "Processing..."
                            : loginType === "mobile"
                              ? otpSent
                                ? "Verify OTP"
                                : "Send OTP"
                              : "Login"}
                        </button>
                      </form>

                      {/* FOOTER */}
                      <div className="border-t mt-6 pt-4 text-center text-sm text-gray-500">
                        Don’t have an account?{" "}
                        <Link href="/signup">
                          <span className="text-black font-medium cursor-pointer hover:underline">
                            Sign up
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

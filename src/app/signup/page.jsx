"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../../assets/icons/logo";
import { Toaster, toast } from "react-hot-toast";
import { CheckCircle2, XCircle } from "lucide-react";


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
    { duration: 3000 }
  );
};

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }
      successToast("Account successfully created 🎉");

      window.location.href = "/";

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT IMAGE (Desktop only) */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="/images/portrait.jpg"
          className="w-full h-full object-cover"
          alt="signup"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-10 text-white">
          <h2 className="text-3xl font-semibold mb-2">
            Join Dhirago
          </h2>
          <p className="text-sm opacity-80">
            Discover premium fashion crafted with simplicity & elegance.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex flex-1 items-center justify-center bg-[#f8f8f8] px-4 py-10">

        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">

          {/* LOGO */}
        

          {/* TITLE */}
          <h2 className="text-center text-2xl font-semibold mb-1">
            Create Account
          </h2>

          <p className="text-center text-gray-500 text-sm mb-6">
            Start your journey with us
          </p>

          {/* FORM */}
          <form onSubmit={handleSignup} className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
              required
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
              required
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          {/* SOCIAL LOGIN (optional UI) */}
          <button className="w-full border py-3 rounded-lg hover:bg-gray-50 transition">
            Continue with Google
          </button>

          {/* FOOTER */}
          <div className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/">
              <span className="text-black font-medium hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../../assets/icons/logo";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Laravel Register API
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
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

      alert("Account created 🎉");

      // redirect to login page or home
      window.location.href = "/";

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-[#f4f4f5] px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border p-6">

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        {/* TITLE */}
        <h2 className="text-center text-2xl font-semibold mb-1">
          Create Account
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Join us and start shopping
        </p>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            required
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="border-t mt-6 pt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/">
            <span className="text-black font-medium cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
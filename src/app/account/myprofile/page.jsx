"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { Toaster, toast } from "react-hot-toast";
import { CheckCircle2, XCircle } from "lucide-react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/* ---------------- PREMIUM TOAST ---------------- */
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
    { duration: 3000 }
  );
};

/* ---------------- INPUT COMPONENT ---------------- */
function InputField({ label, name, value, onChange, type = "text" }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative group">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-transparent border-b py-3 text-sm transition-all duration-300
        ${focused ? "border-black scale-[1.01]" : "border-gray-300"}
        focus:outline-none`}
      />

      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none
        ${
          focused || value
            ? "-top-2 text-xs text-black"
            : "top-3 text-sm text-gray-400"
        }`}
      >
        {label}
      </label>

      <span
        className={`absolute left-0 bottom-0 h-[2px] w-full bg-black origin-left transition-transform duration-300
        ${focused ? "scale-x-100" : "scale-x-0"}`}
      />
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */
export default function MyProfilePage() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState({
    password: "",
    password_confirmation: "",
  });

  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH USER ---------------- */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user");

        localStorage.setItem("user_email", res.data.email);

        setProfile({
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
        });

        if (res.data.address) {
          setAddress(res.data.address);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleProfile = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleAddress = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  /* ---------------- SAVE PROFILE ---------------- */
  const saveProfile = async () => {
    setLoading(true);

    try {
      await api.post("/user/update-profile", profile);

      successToast("Profile updated successfully");
    } catch (e) {
      errorToast(e.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  /* ---------------- UPDATE PASSWORD ---------------- */
  const updatePassword = async () => {
    setLoading(true);

    try {
      await api.post("/user/update-password", password);

      successToast("Password updated successfully");

      setPassword({
        password: "",
        password_confirmation: "",
      });
    } catch (e) {
      errorToast("Error updating password");
    }

    setLoading(false);
  };

  /* ---------------- SAVE ADDRESS ---------------- */
  const saveAddress = async () => {
    setLoading(true);

    try {
      await api.post("/user/update-address", address);

      successToast("Address saved successfully");
    } catch (e) {
      errorToast("Error saving address");
    }

    setLoading(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className={` ${josefin.className} min-h-screen  bg-gradient-to-br  px-4 md:px-12 py-12`}>
      
      {/* PREMIUM TOASTER */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* HEADER */}
      <div className="mb-14">
        <h1 className="text-2xl font-medium tracking-tight">My Profile</h1>

        <p className="text-sm text-gray-500 mt-2 tracking-wide">
          Manage your personal details & address
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* PROFILE */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow border">
          <h3 className="text-normal tracking-[1px] font-semibold text-gray-800 mb-8">
            PROFILE DETAILS
          </h3>

          <div className="space-y-8">
            <InputField
              label="First Name"
              name="first_name"
              value={profile.first_name}
              onChange={handleProfile}
            />

            <InputField
              label="Last Name"
              name="last_name"
              value={profile.last_name}
              onChange={handleProfile}
            />

            <InputField
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleProfile}
            />

            <input
              name="phone"
              value={profile.phone}
              onChange={handleProfile}
              maxLength={10}
              placeholder="Contact Number"
              className="w-full border-b py-3 text-sm bg-transparent focus:outline-none focus:border-black"
            />

            <button
              onClick={saveProfile}
              className="mt-4 px-10 py-3 text-xs tracking-[2px] border rounded-xs hover:bg-black hover:text-white transition"
            >
              {loading ? "Saving..." : "SAVE CHANGES"}
            </button>
          </div>
        </div>

        {/* PASSWORD */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow border">
          {/* <h3 className="text-xs tracking-[3px] text-gray-400 mb-8"> */}
          <h3 className="text-normal tracking-[1px] font-semibold text-gray-800 mb-8">

            CHANGE PASSWORD
          </h3>

          <div className="space-y-8">
            <InputField
              label="New Password"
              name="password"
              type="password"
              value={password.password}
              onChange={handlePassword}
            />

            <InputField
              label="Confirm Password"
              name="password_confirmation"
              type="password"
              value={password.password_confirmation}
              onChange={handlePassword}
            />

            <button
              onClick={updatePassword}
              className="mt-4 px-10 py-3 text-xs tracking-[2px] border rounded-xs hover:bg-black hover:text-white transition"
            >
              {loading ? "Updating..." : "UPDATE PASSWORD"}
            </button>
          </div>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="mt-16 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow border">
          <h3 className="text-normal tracking-[1px] font-semibold text-gray-800 mb-8">
        Add New Address</h3>

        <div className="space-y-6">
          <InputField
            label="Address Line 1"
            name="line1"
            type="text"
            value={address.line1}
            onChange={handleAddress}
          />

          <InputField
            label="Address Line 2"
            name="line2"
            type="text"
            value={address.line2}
            onChange={handleAddress}
          />

          <input
            name="city"
            value={address.city}
            onChange={handleAddress}
            placeholder="City"
            className="w-full border-b py-3 text-sm"
          />

          <input
            name="state"
            value={address.state}
            onChange={handleAddress}
            placeholder="State"
            className="w-full border-b py-3 text-sm"
          />

          <input
            name="zip"
            value={address.zip}
            onChange={handleAddress}
            placeholder="Zip Code"
            className="w-full border-b py-3 text-sm"
          />

          <button
            onClick={saveAddress}
            className="px-6 py-2 text-xs border rounded-xs hover:bg-black hover:text-white transition"
          >
            {loading ? "Saving..." : "SAVE"}
          </button>
        </div>
      </div>
    </div>
  );
}
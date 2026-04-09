"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";

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
  /* ---------------- STATES ---------------- */
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
    zip: ""
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH USER ---------------- */
  useEffect(() => {
    const fetchUser = async () => {
      try {
      const res = await api.get("/user");

    localStorage.setItem("user_email", res.data.email); // ✅ save instantly
   

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

  /* ---------------- API CALLS ---------------- */
  const saveProfile = async () => {
    setLoading(true);
    try {
      console.log("PROFILE DATA SENT:", profile);
      const res = await api.post("/user/update-profile", profile);
      console.log("RESPONSE:", res.data);
      alert("✅ Profile updated");
    } catch (e) {
      console.log(e.response?.data);
      alert(e.response?.data?.message || "Error");
    }
    setLoading(false);
  };

  const updatePassword = async () => {
    setLoading(true);
    try {
      const res = await api.post("/user/update-password", password);

      
      alert("✅ Password updated");
      setPassword({ password: "", password_confirmation: "" });
    } catch (e) {
      alert("❌ Error updating password");
    }
    setLoading(false);
  };

  const saveAddress = async () => {
    setLoading(true);
    try {
      await api.post("/user/update-address", address);
      alert("✅ Address saved");
    } catch (e) {
      alert("❌ Error saving address");
    }
    setLoading(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#eeeeee] px-4 md:px-12 py-12 font-[Inter]">
      {/* HEADER */}
      <div className="mb-14">
        <h1 className="text-2xl font-light tracking-tight">My Profile</h1>
        <p className="text-sm text-gray-500 mt-2 tracking-wide">
          Manage your personal details & address
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* PROFILE */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow border">
          <h3 className="text-xs tracking-[3px] text-gray-400 mb-8">
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
              placeholder="Contact Number"
              className="w-full border-b py-3 text-sm bg-transparent focus:outline-none focus:border-black"
            />

            <button
              onClick={saveProfile}
              className="mt-4 px-10 py-3 text-xs tracking-[2px] border rounded-full hover:bg-black hover:text-white transition"
            >
              {loading ? "Saving..." : "SAVE CHANGES"}
            </button>
          </div>
        </div>

        {/* PASSWORD */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow border">
          <h3 className="text-xs tracking-[3px] text-gray-400 mb-8">
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
              className="mt-4 px-10 py-3 text-xs tracking-[2px] border rounded-full hover:bg-black hover:text-white transition"
            >
              {loading ? "Updating..." : "UPDATE PASSWORD"}
            </button>
          </div>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="mt-16 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow border">
        <h2 className="text-xl font-medium mb-8">Add New Address</h2>

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
            className="px-6 py-2 text-xs border rounded-full hover:bg-black hover:text-white transition"
          >
            {loading ? "Saving..." : "SAVE"}
          </button>
        </div>
      </div>
    </div>
  );
}

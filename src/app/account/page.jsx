"use client";

import { LayoutDashboard, ShoppingBag, User, Heart } from "lucide-react";
import MyProfilePage from "./myprofile/page";
import { useState } from "react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <div className="bg-[#f6f6f6] min-h-screen w-full">
      {/* MOBILE MENU */}
      <div className="lg:hidden flex justify-between bg-white px-4 py-3 border-b text-xs">
        <span
          onClick={() => setActiveTab("dashboard")}
          className="flex flex-col items-center"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </span>
        <span
          onClick={() => setActiveTab("orders")}
          className="flex flex-col items-center"
        >
          <ShoppingBag size={18} />
          Orders
        </span>
        <span
          onClick={() => setActiveTab("profile")}
          className="flex flex-col items-center"
        >
          <User size={18} />
          Profile
        </span>
        <span
          onClick={() => setActiveTab("wishlist")}
          className="flex flex-col items-center"
        >
          <Heart size={18} />
          Wishlist
        </span>
      </div>

      <div className="flex">
        {/* SIDEBAR (DESKTOP ONLY) */}
        <aside className="hidden lg:block w-[260px] bg-white border-r min-h-screen p-6">
          <ul className="space-y-2 text-sm">
            {[
              {
                name: "Dashboard",
                key: "dashboard",
                icon: <LayoutDashboard size={18} />,
              },
              {
                name: "Orders",
                key: "orders",
                icon: <ShoppingBag size={18} />,
              },
              { name: "My Profile", key: "profile", icon: <User size={18} /> },
              { name: "Wishlist", key: "wishlist", icon: <Heart size={18} /> },
            ].map((item) => (
              <li
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
      ${activeTab === item.key ? "bg-black text-white" : "hover:bg-black hover:text-white"}
    `}
              >
                {item.icon}
                {item.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN CONTENT */}

        <div className="flex-1 p-4 lg:p-10">
          {activeTab === "dashboard" && (
            <>
              {/* YOUR DASHBOARD UI HERE */}
              <div className="mb-6">
                <h2 className="text-2xl lg:text-4xl font-light">Hello,</h2>

                <p className="text-xs text-gray-500 mt-1">
                  Thanks For Being A Customer Since
                </p>

                <p className="text-xs font-semibold text-gray-700">
                  March 14, 2026
                </p>

                <div className="flex gap-4 mt-3 text-xs font-semibold tracking-widest">
                  <button className="hover:underline">EDIT PROFILE</button>
                  <button className="hover:underline">LOG OUT</button>
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-6">
                <div className="bg-white border p-6 text-center">
                  <p className="text-3xl lg:text-4xl font-light">₹ 0</p>
                  <p className="text-xs tracking-widest mt-2 text-gray-500">
                    STORE CREDITS
                  </p>
                </div>

                <div className="bg-white border p-6 text-center">
                  <p className="text-3xl lg:text-4xl font-light">0</p>
                  <p className="text-xs tracking-widest mt-2 text-gray-500">
                    TOTAL ORDERS
                  </p>
                </div>
              </div>

              {/* BAG SECTION */}
              <div className="flex flex-col sm:flex-row w-full">
                <div className="bg-[#a97c3d] text-white p-6 lg:p-10 flex flex-col items-center justify-center w-full sm:w-[220px]">
                  <p className="text-4xl lg:text-6xl font-light">0</p>

                  <p className="text-xs tracking-widest mt-2">ITEMS IN BAG</p>

                  <button className="mt-4 border border-white px-4 py-2 text-xs tracking-widest hover:bg-white hover:text-black transition">
                    VIEW BAG
                  </button>
                </div>

                <div className="flex-1 bg-[#eae7e2] min-h-[120px] sm:min-h-[180px]"></div>
              </div>
            </>
          )}

          {activeTab === "profile" && <MyProfilePage />}

          {activeTab === "orders" && <div>Orders Page (Coming Soon)</div>}

          {activeTab === "wishlist" && <div>Wishlist Page (Coming Soon)</div>}
        </div>
      </div>
    </div>
  );
}

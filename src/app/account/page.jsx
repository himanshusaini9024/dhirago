"use client";

import { LayoutDashboard, ShoppingBag, User, Heart } from "lucide-react";
import MyProfilePage from "./myprofile/page";
import Dashboard from "./dashboard/page";
import Orders from "./orders/page";
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
          {activeTab === "dashboard" && <Dashboard setActiveTab={setActiveTab}/>}

          {activeTab === "profile" && <MyProfilePage />}

          {activeTab === "orders" && <Orders/>}

          {activeTab === "wishlist" && <div>Wishlist Page (Coming Soon)</div>}
        </div>
      </div>
    </div>
  );
}

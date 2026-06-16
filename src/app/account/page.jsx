"use client";

import { LayoutDashboard, ShoppingBag, User, Heart } from "lucide-react";
import MyProfilePage from "./myprofile/page";
import Dashboard from "./dashboard/page";
import Orders from "./orders/page";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const userdata = useSelector((state) => state.auth.user);

  // Redirect if logged out
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  // Prevent page flash
  if (!isLoggedIn || !userdata) {
    return null;
  }

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
        <aside className="hidden lg:flex flex-col w-[320px] min-h-screen bg-white border-r border-gray-200 sticky top-0">
          {/* PROFILE CARD */}
          <div className="p-3 border-b">
            <div className="flex items-center gap-4"></div>
          </div>

          {/* MENU */}
          <div className="p-6 flex-1">
            <p className="uppercase text-xs tracking-widest text-gray-400 mb-5 px-3">
              Account Settings
            </p>

            <ul className="space-y-3">
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
                {
                  name: "My Profile",
                  key: "profile",
                  icon: <User size={18} />,
                },
                {
                  name: "Wishlist",
                  key: "wishlist",
                  icon: <Heart size={18} />,
                },
              ].map((item) => (
                <li
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={` group cursor-pointer flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300
                  
                  ${
                    activeTab === item.key
                      ? "bg-black text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  `}
                >
                  <span>{item.icon}</span>

                  <span className="font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FOOTER */}
        </aside>

        {/* MAIN CONTENT */}

        <div className="flex-1 p-4 lg:p-10">
          {activeTab === "dashboard" && (
            <Dashboard setActiveTab={setActiveTab} />
          )}

          {activeTab === "profile" && <MyProfilePage />}

          {activeTab === "orders" && <Orders />}

          {activeTab === "wishlist" && <div>Wishlist Page (Coming Soon)</div>}
        </div>
      </div>
    </div>
  );
}

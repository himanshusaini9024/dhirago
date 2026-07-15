"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/authslice";
import { useRouter } from "next/navigation";
import API from "../../../lib/api";

import { motion } from "framer-motion";

export default function Dashboard({ setActiveTab }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const { cartItems } = useSelector((state) => state.cart);
  // const userdata = JSON.parse(localStorage.getItem("user") || "{}");
  const userdata = useSelector((state) => state.auth.user);
  const customer_id = userdata?.customer_id;

  const user = {
    name: userdata?.first_name || '',
    joined: "March 14, 2026",
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get("/orders");

        setOrders(res.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrder();
  }, [router]);
  const latestOrder = [...orders].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  )[0];
  const handleLogout = () => {
    dispatch(logout());

    setTimeout(() => {
      localStorage.clear();
      router.replace("/");
    }, 300);
  };

  // 🔥 replace with API later
  const wishlist = []; // 🔥 replace with API later

  return (
    <div className="space-y-10 font-futura">
      {/* 🔐 HEADER */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl lg:text-3xl font-light">
            Hello {" "}
            <span className="font-light bg-gradient-to-r from-black to-gray-500 bg-clip-text ">
              {user.name}👋
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
          </p>
        </div>

     
      </div>

      {/* ACTIONS */}
      <div className="flex gap-6 text-xs tracking-[0.25em]">
        <button
          onClick={() => setActiveTab("profile")}
          className="relative text-xs tracking-[0.25em] group"
        >
          EDIT PROFILE
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
        </button>
        <button onClick={handleLogout} className="hover:text-red-500">
          LOG OUT
        </button>
      </div>

      {/* 📊 STATS */}
      <div className="grid sm:grid-cols-3 gap-6">
        {/* Orders */}
        <Card title="TOTAL ORDERS" value={orders.length} />

        {/* Cart */}
        <Card title="ITEMS IN BAG" value={cartItems.length} dark />

        {/* Wishlist */}
        <Card title="WISHLIST" value={wishlist.length} />
      </div>

      {/* 📦 ORDERS TIMELINE */}
      <Section title="RECENT ORDERS" link="/orders">
        {orders.length === 0 ? (
          <Empty text="No orders yet" action="Start Shopping" link="/shop" />
        ) : (
          <div className="space-y-3">
            <div
              key={latestOrder.order_number}
              className="flex justify-between items-center bg-white p-4 rounded-lg border"
            >
              <div>
                <p className="text-sm font-medium">
                  Order-ID #{latestOrder.order_number}
                </p>
                <p className="text-xs text-gray-500">
                  Order Date -{" "}
                  {new Date(latestOrder.created_at).toLocaleDateString()}
                </p>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
                {latestOrder.status || "Placed"}
              </span>
            </div>
          </div>
        )}
      </Section>

      {/* 🎯 RECOMMENDATIONS */}
      {/* <Section title="RECOMMENDED FOR YOU">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white border rounded-xl p-4 text-center"
            >
              <div className="h-24 bg-gray-100 rounded mb-2" />
              <p className="text-sm">Product {i}</p>
            </motion.div>
          ))}
        </div>
      </Section> */}
    </div>
  );
}

/* 🔥 COMPONENTS */

function Card({ title, value, dark }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-2xl border ${
        dark ? "bg-[#a97c3d] text-white" : "bg-white text-black"
      }`}
    >
      <p className="text-3xl font-light">{value}</p>
      <p className="text-xs tracking-widest mt-2 opacity-70">{title}</p>
    </motion.div>
  );
}

function Section({ title, link, children }) {
  return (
    <div className="bg-white/60 backdrop-blur border rounded-2xl p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-xs tracking-[0.25em] text-gray-600">{title}</h3>
          
      </div>
      {children}
    </div>
  );
}

function Empty({ text, action, link }) {
  return (
    <div className="text-center py-10">
      <p className="text-gray-400">{text}</p>
      <Link href={link}>
        <button className="mt-4 border px-4 py-2 text-xs hover:bg-black hover:text-white">
          {action}
        </button>
      </Link>
    </div>
  );
}

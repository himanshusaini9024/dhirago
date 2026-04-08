"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";
import {
  CheckCircle,
  Package,
  Truck,
  Home,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
    const [order, setOrder] = useState(null);

  // 🔥 Dynamic Order State (replace with API)
  useEffect(() => {
    confetti({ particleCount: 120, spread: 70 });

    const fetchOrder = async () => {
      try {
        const res = await API.get("/orders/latest");
        const data = await res.json();
        setOrder(data.order);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrder();

    // setTimeout(() => {
    //   router.push("/orders");
    // }, 8000);
  }, [router]);

    if (!order) return <p className="text-center mt-20">Loading...</p>;
  // 📊 Progress Calculation
  const steps = ["confirmed", "packed", "shipped", "delivered"];
  const currentStepIndex = steps.indexOf(order.status);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  // 💬 WhatsApp Message
  const whatsappLink = `https://wa.me/${order.phone}?text=Your order ${order.id} is confirmed!`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black px-4">

      <div className="w-full max-w-lg backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-8 text-center transition">

        {/* ✅ Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full animate-bounce">
            <CheckCircle className="text-green-600 w-12 h-12" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Order Confirmed 🎉
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Your order has been placed successfully.
        </p>

        {/* 📦 Order Summary */}
        <div className="bg-white dark:bg-gray-800 border rounded-xl p-4 mb-6 text-left shadow-sm">
          <h2 className="font-semibold mb-2 dark:text-white">
            Order Summary
          </h2>

          <div className="flex justify-between text-sm">
            <span>Order ID</span>
            <span>{order.id}</span>
          </div>

          <div className="flex justify-between text-sm mt-1">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>

          <div className="flex justify-between text-sm mt-1">
            <span>Payment</span>
            <span>{order.payment}</span>
          </div>
        </div>

        {/* 📊 Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-xs mt-2 text-gray-500 dark:text-gray-400">
            <span>Confirmed</span>
            <span>Packed</span>
            <span>Shipped</span>
            <span>Delivered</span>
          </div>
        </div>

        {/* 🚚 Timeline */}
        <div className="bg-white dark:bg-gray-800 border rounded-xl p-4 mb-6 text-left shadow-sm space-y-3">

          <StatusItem
            icon={<CheckCircle />}
            label="Order Confirmed"
            active={currentStepIndex >= 0}
          />

          <StatusItem
            icon={<Package />}
            label="Packed"
            active={currentStepIndex >= 1}
          />

          <StatusItem
            icon={<Truck />}
            label="Out for Delivery"
            active={currentStepIndex >= 2}
          />

          <StatusItem
            icon={<Home />}
            label="Delivered"
            active={currentStepIndex >= 3}
          />
        </div>

        {/* 🔘 Actions */}
        <div className="space-y-3">

          <Link
            href="/orders"
            className="block w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
          >
            Track Order
          </Link>

          <a
            href={whatsappLink}
            target="_blank"
            className="block w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition"
          >
            WhatsApp Update
          </a>

          <Link
            href="/"
            className="block w-full border py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Redirect text */}
        <p className="text-xs text-gray-400 mt-4">
          Redirecting automatically...
        </p>
      </div>
    </div>
  );
}

// 🔹 Timeline Item Component
function StatusItem({ icon, label, active }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 ${
          active ? "text-green-500" : "text-gray-400"
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-sm ${
          active ? "text-gray-700 dark:text-white" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
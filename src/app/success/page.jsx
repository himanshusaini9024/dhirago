"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";
import { CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import {
  readPendingPurchase,
  trackPurchase,
} from "../../lib/trackPurchase";

export default function SuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    confetti({ particleCount: 120, spread: 70 });

    const fetchOrder = async () => {
      const pending = readPendingPurchase();

      try {
        const res = await API.get("/orders/latest");
        const latest = res.data?.order || null;
        const merged = latest
          ? {
              ...pending,
              ...latest,
              items: latest.items || pending?.items || [],
            }
          : pending;

        if (merged) {
          setOrder(merged);
          await trackPurchase(merged);
        }
      } catch (err) {
        console.log(err);
        if (pending) {
          setOrder(pending);
          await trackPurchase(pending);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  useEffect(() => {
    if (loading || !order) return;
    const timer = setTimeout(() => {
      router.replace("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router, loading, order]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <p className="text-gray-500 text-sm">Confirming your order…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center mt-20">
        <p>No recent order found</p>
        <Link href="/" className="text-blue-500 underline">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full">
            <CheckCircle className="text-green-600 w-14 h-14" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Thank You for Your Order
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          Your order has been placed successfully
        </p>

        <div className="border rounded-2xl p-5 shadow-sm text-left mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">
              {order.order_number || order.id}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium">₹{order.total_amount}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Payment</span>
            <span className="font-medium capitalize">
              {order.payment_method}
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="block w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-900 transition"
        >
          Continue Shopping
        </Link>

        <p className="text-xs text-gray-400 mt-4">
          Redirecting to home in 5 seconds...
        </p>
      </div>
    </div>
  );
}

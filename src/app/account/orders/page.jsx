"use client";
import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, ChevronDown } from "lucide-react";
import OrderDetailsUI from "../../../components/orders";
import Link from "next/link";
import { useRouter } from "next/navigation";
const IMGURL = "https://res.cloudinary.com/ds48lk80f/";

const getSteps = (status) => {
  const steps = [
    { key: "new", label: "Order Placed" },
    { key: "process", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "out_for_delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered" },
  ];

  const currentIndex = steps.findIndex((s) => s.key === status);

  return steps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex,
  }));
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userdata = JSON.parse(localStorage.getItem("user") || "{}");
  const customer_id = userdata?.customer_id;
  const router = useRouter();
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders", {
        params: { customer_id },
      });
      setOrders(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (order) => {
    try {
      await API.post("/reorder", { order_id: order.id });
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2f7] py-12 px-4 md:px-10 ">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}

        {/* Heading */}
        <div className="mb-16 flex items-center justify-between">
          <h1 className="text-3xl font-light tracking-tight">My Orders</h1>

          {/* RIGHT BUTTONS */}
          <div className="flex gap-4">
            {/* TRACK ORDER */}
            <Link href="/return/track-order">
              <button className="border border-black px-8 py-4 uppercase tracking-[3px]  text-xs hover:bg-black hover:text-white transition-all duration-300">
                Track Order
              </button>
            </Link>

            {/* RETURN / EXCHANGE */}
          </div>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="space-y-6 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
                <div className="h-20 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Orders */}
        <div className="space-y-10">
          {!loading &&
            orders.map((order, i) => {
              const steps = getSteps(order.status);
              const isOpen = openId === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-sm hover:shadow-2xl overflow-hidden"
                  >
                    {/* Header */}
                    <div
                      onClick={() => setOpenId(isOpen ? null : order.id)}
                      className="cursor-pointer p-8 flex justify-between items-center hover:bg-gray-50"
                    >
                      <div>
                        <p className="text-xs text-gray-400">ORDER</p>
                        <p className="text-lg font-medium">
                          #{order.order_number}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">TOTAL</p>
                        <p className="text-xl font-semibold">
                          ₹{order.total_amount}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Estimated Delivery: {order.expected_delivery_date}
                        </p>
                      </div>

                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                        <ChevronDown />
                      </motion.div>
                    </div>

                    {/* Expand */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t"
                        >
                          {/* Timeline */}
                          <div className="px-8 py-6 flex justify-between">
                            {steps.map((step, idx) => (
                              <div key={idx} className="text-center flex-1">
                                {step.completed ? (
                                  <CheckCircle className="mx-auto text-blue-600" />
                                ) : (
                                  <Circle className="mx-auto text-gray-300" />
                                )}
                                <p className="text-xs mt-1">{step.label}</p>
                              </div>
                            ))}
                          </div>

                          {/* Items */}
                          <div className="px-8 pb-8 grid md:grid-cols-2 gap-6">
                            {order.items.map((item) => (
                              <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.03 }}
                                className="flex gap-4 bg-white border rounded-2xl p-4 shadow-sm"
                              >
                                <img
                                  src={`${IMGURL}${item.image}`}
                                  className="w-24 h-28 object-cover rounded-xl"
                                />

                                <div className="flex-1">
                                  <p className="text-sm font-medium">
                                    Product #{item.product_id}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Qty: {item.quantity}
                                  </p>
                                </div>

                                <p className="font-semibold">₹{item.price}</p>
                              </motion.div>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="px-8 py-6 border-t flex flex-col md:flex-row md:items-center justify-between gap-5">
                            {/* DATE */}
                            <p className="text-xs text-gray-400">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>

                            {/* RIGHT ACTIONS */}
                            <div className="flex flex-wrap items-center gap-3">
                              {/* ORDER NOT DELIVERED */}

                              {/* RETURN REQUEST EXISTS */}
                              {order.return_request && (
                                <>
                                  {/* PENDING */}
                                  {order.return_request.status ===
                                    "pending" && (
                                    <div className="px-5 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center gap-3">
                                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />

                                      <span className="text-xs uppercase tracking-[2px] text-amber-700 font-medium">
                                        Return Request Sent
                                      </span>
                                    </div>
                                  )}

                                  {/* APPROVED */}
                                  {order.return_request.status ===
                                    "approved" && (
                                    <div className="px-5 h-12 rounded-full bg-sky-50 border border-sky-200 flex items-center gap-3">
                                      <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />

                                      <span className="text-xs uppercase tracking-[2px] text-sky-700 font-medium">
                                        Return Approved
                                      </span>
                                    </div>
                                  )}

                                  {/* PICKUP SCHEDULED */}
                                  {order.return_request?.status ===
                                    "pickup_scheduled" && (
                                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                                      <p className="text-emerald-700 font-medium">
                                        Reverse pickup scheduled successfully
                                      </p>

                                      <p className="text-sm text-emerald-600 mt-2">
                                        Our courier partner will pick up your
                                        order shortly.
                                      </p>
                                    </div>
                                  )}

                                  {/* PICKED UP */}
                                  {order.return_request.status ===
                                    "picked_up" && (
                                    <div className="px-5 h-12 rounded-full bg-purple-50 border border-purple-200 flex items-center gap-3">
                                      <div className="w-2 h-2 rounded-full bg-purple-500" />

                                      <span className="text-xs uppercase tracking-[2px] text-purple-700 font-medium">
                                        Return Picked Up
                                      </span>
                                    </div>
                                  )}

                                  {/* DELIVERED */}
                                  {order.return_request.status ===
                                    "delivered" && (
                                    <div className="px-5 h-12 rounded-full bg-indigo-50 border border-indigo-200 flex items-center gap-3">
                                      <div className="w-2 h-2 rounded-full bg-indigo-500" />

                                      <span className="text-xs uppercase tracking-[2px] text-indigo-700 font-medium">
                                        Return Delivered
                                      </span>
                                    </div>
                                  )}

                                  {/* REFUNDED */}
                                  {order.return_request.status ===
                                    "refunded" && (
                                    <div className="px-5 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                                      <div className="w-2 h-2 rounded-full bg-emerald-500" />

                                      <span className="text-xs uppercase tracking-[2px] text-emerald-700 font-medium">
                                        Refund Completed
                                      </span>
                                    </div>
                                  )}

                                  {/* REJECTED */}
                                  {order.return_request.status ===
                                    "rejected" && (
                                    <div className="px-5 h-12 rounded-full bg-red-50 border border-red-200 flex items-center gap-3">
                                      <div className="w-2 h-2 rounded-full bg-red-500" />

                                      <span className="text-xs uppercase tracking-[2px] text-red-700 font-medium">
                                        Return Rejected
                                      </span>
                                    </div>
                                  )}
                                </>
                              )}

                              {/* SHOW RETURN BUTTON */}
                              {order.status === "delivered" &&
                                !order.return_request && (
                                  <button
                                    onClick={() =>
                                      router.push(
                                        `/return/${order.order_number}`,
                                      )
                                    }
                                    className="h-12 px-7 rounded-full border border-black uppercase tracking-[3px] text-xs hover:bg-black hover:text-white transition-all duration-300"
                                  >
                                    Return Order
                                  </button>
                                )}

                              {/* DETAILS */}
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="h-12 px-7 rounded-full bg-black text-white uppercase tracking-[3px] text-xs"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
        </div>

        {/* Empty */}
        {!loading && orders.length === 0 && (
          <div className="text-center py-32">
            <p className="text-gray-500">No orders yet</p>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              className="fixed inset-0 bg-black/40 flex items-end justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={() => setSelectedOrder(null)}
            >
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                // 🔥 THIS IS THE MAGIC
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 18,
                  mass: 0.8,
                }}
                className="bg-white md:mb-[8rem]  w-full max-w-5xl rounded-t-3xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-semibold mb-4">
                  Order #{selectedOrder.order_number}
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="ml-[50rem] w-1/2  md:w-[3rem] py-1 rounded-full text-black"
                  >
                    X
                  </button>
                </h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <OrderDetailsUI order={selectedOrder} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

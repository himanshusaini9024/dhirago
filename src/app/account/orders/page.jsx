"use client";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, ChevronDown } from "lucide-react";
import OrderDetailsUI from "../../../components/orders";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const IMGURL = "https://res.cloudinary.com/ds48lk80f/";

// Statuses that come *after* delivery but should still render the timeline
// as fully complete (otherwise findIndex returns -1 and every step shows
// as incomplete even though the order was delivered before being exchanged
// or refunded).
const TERMINAL_AFTER_DELIVERY = ["exchanged", "refunded", "delivered"];

const getSteps = (status) => {
  const steps = [
    { key: "new", label: "Order Placed" },
    { key: "process", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "out_for_delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered" },
  ];

  const effectiveStatus = TERMINAL_AFTER_DELIVERY.includes(status)
    ? "delivered"
    : status;

  const currentIndex = steps.findIndex((s) => s.key === effectiveStatus);

  return steps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex,
  }));
};

// Eligibility is based on the ACTUAL delivery date (delivered_at) whenever
// the backend has recorded one. expected_delivery_date is only an estimate
// and is used as a fallback for older orders that predate this field.
const canReturnOrder = (order) => {
  return true
  if (order.status !== "delivered") return false;
  if (order.return_request) return false;

  const deliveredDateRaw = order.delivered_at || order.expected_delivery_date;
  if (!deliveredDateRaw) return false;

  const deliveredDate = new Date(deliveredDateRaw);
  const today = new Date();

  const diffDays = Math.floor(
    (today - deliveredDate) / (1000 * 60 * 60 * 24),
  );

  return diffDays >= 0 && diffDays <= 7;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userdata = useSelector((state) => state.auth.user);

  const customer_id = userdata?.customer_id;
  const router = useRouter();

  useEffect(() => {
    if (customer_id) {
      fetchOrders();
    }
  }, [customer_id]);

  const fetchOrders = async () => {
    if (!customer_id) return;

    try {
      setLoading(true);
      // customer_id is derived server-side from the authenticated session —
      // it no longer needs to (and shouldn't) be sent as a query param.
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
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

  const goToReturnFlow = (order, item, type) => {
    router.push(
      `/return/${order.order_number}?type=${type}&item=${item.id}`,
    );
  };

  return (
    <div
      className={`min-h-screen font-futura bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2f7] py-8 md:py-12 px-4 md:px-10 ${josefin.className} `}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-10 md:mb-16 flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-2xl  font-medium tracking-tight">
            My Orders
          </h1>

          <Link href="/return/track-order">
            <button className="border border-black px-4 md:px-8 py-3 md:py-4 uppercase tracking-[2px] md:tracking-[3px] text-xs hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap">
              Track Order
            </button>
          </Link>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="space-y-6 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-sm"
              >
                <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
                <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
                <div className="h-20 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Orders */}
        <div className="space-y-6 md:space-y-10">
          {!loading &&
            orders.map((order, i) => {
              const steps = getSteps(order.status);
              const isOpen = openId === order.id;
              const requestType =
                order.return_request?.type === "exchange"
                  ? "Exchange"
                  : "Return";
              const deliveredLabel = order.delivered_at
                ? new Date(order.delivered_at)
                : order.expected_delivery_date
                  ? new Date(order.expected_delivery_date)
                  : null;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-sm hover:shadow-2xl overflow-hidden"
                  >
                    {/* Header */}
                    <div
                      onClick={() => setOpenId(isOpen ? null : order.id)}
                      className="cursor-pointer p-5 md:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between hover:bg-gray-50"
                    >
                      <div className="flex justify-between sm:block">
                        <div>
                          <p className="text-xs text-gray-400">ORDER-ID</p>
                          <p className="text-base md:text-lg font-medium">
                            #{order.order_number}
                          </p>
                        </div>
                        <div className="sm:hidden text-right">
                          <p className="text-xs text-gray-400">TOTAL</p>
                          <p className="text-lg font-semibold">
                            ₹{order.total_amount}
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:block">
                        <p className="text-xs text-gray-400">TOTAL</p>
                        <p className="text-xl font-medium">
                          ₹{order.total_amount}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {order.status === "delivered" && deliveredLabel ? (
                          <div className="inline-flex items-center gap-2 md:gap-3 rounded-2xl border border-green-200 bg-green-50 px-3 md:px-4 py-2 md:py-3">
                            <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-green-100 shrink-0">
                              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">
                                Order Delivered
                              </p>
                              <p className="text-xs text-green-600">
                                Delivered on{" "}
                                <span className="font-medium">
                                  {deliveredLabel.toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </span>
                              </p>
                            </div>
                          </div>
                        ) : order.status === "delivered" ? (
                          <div className="inline-flex items-center gap-2 md:gap-3 rounded-2xl border border-green-200 bg-green-50 px-3 md:px-4 py-2 md:py-3">
                            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">
                              Order Delivered
                            </p>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 md:gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-3 md:px-4 py-2 md:py-3">
                            <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-black text-white shrink-0 text-base">
                              🚚
                            </div>
                            <div>
                              <p className="text-xs font-medium text-black uppercase tracking-wide">
                                Estimated Delivery
                              </p>
                              <p className="text-xs text-gray-600">
                                {(() => {
                                  let deliveryDate =
                                    order.expected_delivery_date
                                      ? new Date(order.expected_delivery_date)
                                      : new Date(
                                          new Date(order.created_at).setDate(
                                            new Date(
                                              order.created_at,
                                            ).getDate() + 5,
                                          ),
                                        );
                                  return (
                                    <>
                                      Expected by{" "}
                                      <span className="font-medium text-black">
                                        {deliveryDate.toLocaleDateString(
                                          "en-IN",
                                          {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                          },
                                        )}
                                      </span>
                                    </>
                                  );
                                })()}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="hidden sm:block"
                      >
                        <ChevronDown />
                      </motion.div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="sm:hidden self-end"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Expand */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t overflow-hidden"
                        >
                          {/* Timeline */}
                          <div className="px-4 md:px-8 py-5 md:py-6 flex justify-between items-start overflow-x-auto">
                            {steps.map((step, idx) => (
                              <div
                                key={idx}
                                className="text-center flex-1 min-w-0 px-1"
                              >
                                {step.completed ? (
                                  <CheckCircle className="mx-auto text-blue-600 w-5 h-5" />
                                ) : (
                                  <Circle className="mx-auto text-gray-300 w-5 h-5" />
                                )}
                                <p className="text-[10px] md:text-xs mt-1 leading-tight hidden sm:block">
                                  {step.label}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Items — each item gets its own return/exchange
                              action since a return request applies to a
                              single line item, not the whole order. */}
                          <div className="px-4 md:px-8 pb-6 md:pb-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {order.items?.map((item) => {
                              const itemHasReturn =
                                order.return_request?.order_item_id ===
                                item.id;

                              return (
                                <motion.div
                                  key={item.id}
                                  whileHover={{ scale: 1.02 }}
                                  className="flex flex-col gap-3 bg-white border rounded-2xl p-3 md:p-4 shadow-sm"
                                >
                                  <div className="flex gap-3 md:gap-4">
                                    <img
                                      src={
                                        item.image
                                          ? `${IMGURL}${item.image}`
                                          : "/images/placeholder.png"
                                      }
                                      className="w-20 h-24 md:w-24 md:h-28 object-cover rounded-xl shrink-0"
                                      alt={`Product ${item.product_id}`}
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium truncate">
                                        Product #{item.product_id}
                                      </p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>
                                    <p className="font-medium text-sm shrink-0">
                                      ₹{item.price}
                                    </p>
                                  </div>

                                  {canReturnOrder(order) && !itemHasReturn && (
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() =>
                                          goToReturnFlow(order, item, "return")
                                        }
                                        className="flex-1 h-9 rounded-full border border-black uppercase tracking-[1.5px] text-[10px] hover:bg-black hover:text-white transition-all duration-300"
                                      >
                                        Return
                                      </button>
                                      <button
                                        onClick={() =>
                                          goToReturnFlow(
                                            order,
                                            item,
                                            "exchange",
                                          )
                                        }
                                        className="flex-1 h-9 rounded-full border border-black uppercase tracking-[1.5px] text-[10px] hover:bg-yellow-500 hover:text-white transition-all duration-300"
                                      >
                                        Exchange
                                      </button>
                                    </div>
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Footer */}
                          <div className="px-4 md:px-8 py-5 md:py-6 border-t flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <p className="text-xs text-gray-400">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>

                            <div className="flex flex-wrap items-center gap-3">
                              {order.return_request && (
                                <>
                                  {order.return_request.status ===
                                    "pending" && (
                                    <div className="px-4 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                      <span className="text-xs uppercase tracking-[2px] text-amber-700 font-medium">
                                        {requestType} Request Sent
                                      </span>
                                    </div>
                                  )}
                                  {order.return_request.status ===
                                    "approved" && (
                                    <div className="px-4 h-10 rounded-full bg-sky-50 border border-sky-200 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                                      <span className="text-xs uppercase tracking-[2px] text-sky-700 font-medium">
                                        {requestType} Approved
                                      </span>
                                    </div>
                                  )}
                                  {order.return_request.status ===
                                    "pickup_scheduled" && (
                                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                                      <p className="text-emerald-700 font-medium text-sm">
                                        Reverse pickup scheduled
                                      </p>
                                      <p className="text-xs text-emerald-600 mt-1">
                                        Our courier partner will pick up
                                        shortly.
                                      </p>
                                    </div>
                                  )}
                                  {order.return_request.status ===
                                    "picked_up" && (
                                    <div className="px-4 h-10 rounded-full bg-purple-50 border border-purple-200 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                                      <span className="text-xs uppercase tracking-[2px] text-purple-700 font-medium">
                                        {requestType} Picked Up
                                      </span>
                                    </div>
                                  )}
                                  {order.return_request.status ===
                                    "delivered" && (
                                    <div className="px-4 h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                      <span className="text-xs uppercase tracking-[2px] text-indigo-700 font-medium">
                                        {requestType} Received by Warehouse
                                      </span>
                                    </div>
                                  )}
                                  {order.return_request.status ===
                                    "replacement_created" && (
                                    <div className="px-4 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-teal-500" />
                                      <span className="text-xs uppercase tracking-[2px] text-teal-700 font-medium">
                                        Replacement Order Created
                                      </span>
                                    </div>
                                  )}
                                  {order.return_request.status ===
                                    "refunded" && (
                                    <div className="px-4 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                      <span className="text-xs uppercase tracking-[2px] text-emerald-700 font-medium">
                                        Refund Processed
                                      </span>
                                    </div>
                                  )}
                                  {order.return_request.status ===
                                    "rejected" && (
                                    <div className="px-4 h-10 rounded-full bg-red-50 border border-red-200 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-red-500" />
                                      <span className="text-xs uppercase tracking-[2px] text-red-700 font-medium">
                                        {requestType} Rejected
                                      </span>
                                    </div>
                                  )}
                                  {order.return_request.status ===
                                    "pickup_failed" && (
                                    <div className="px-4 h-10 rounded-full bg-red-50 border border-red-200 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-red-500" />
                                      <span className="text-xs uppercase tracking-[2px] text-red-700 font-medium">
                                        {requestType} Failed
                                      </span>
                                    </div>
                                  )}
                                </>
                              )}

                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="h-10 md:h-12 px-5 md:px-7 rounded-full bg-black text-white uppercase tracking-[2px] md:tracking-[3px] text-xs"
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
          <div className="text-center py-24 md:py-32">
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
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 18,
                  mass: 0.8,
                }}
                className="bg-white w-full max-w-5xl rounded-t-3xl p-5 md:p-6 md:mb-[8rem] max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base md:text-lg font-semibold">
                    Order #{selectedOrder.order_number}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-sm font-medium"
                  >
                    ✕
                  </button>
                </div>

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
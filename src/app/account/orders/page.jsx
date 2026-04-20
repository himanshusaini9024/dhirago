"use client";
import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, ChevronDown } from "lucide-react";
import OrderDetailsUI from "../../../components/orders";
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
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
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2f7] py-12 px-4 md:px-10 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-16">
          <h1 className="text-4xl tracking-tight text-gray-900">My Orders</h1>
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
                          <div className="px-8 py-6 border-t flex justify-between items-center">
                            <p className="text-xs text-gray-400">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>

                            <div className="flex gap-3">
                           

                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="px-5 py-2 text-sm bg-black text-white rounded-full"
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

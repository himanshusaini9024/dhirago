"use client";
import { CheckCircle, Circle } from "lucide-react";

const IMGURL = "https://res.cloudinary.com/ds48lk80f/";

const getDeliveryDate = (createdAt) => {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + 4); // +4 days delivery
  return date.toDateString();
};

export default function OrderDetailsUI({ order }) {
  const steps = [
    { key: "new", label: "Order confirmed" },
    { key: "process", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "out_for_delivery", label: "Out for delivery" },
    { key: "delivered", label: "Delivered" },
  ];

  const currentIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <div className="bg-[#f5f5f5] p-4 md:p-6 rounded-2xl">
      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          {/* Timeline with line */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm font-semibold mb-6 flex items-center justify-between">
              Items Ordered & Delivery Details
              {(order.status === "new" || order.status === "process") && (
                <button className="text-xs text-red-500 hover:underline">
                  Cancel order
                </button>
              )}
            </p>

            <div className="flex items-center justify-between relative">
              {/* LINE */}
              <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-200 z-0" />

              {/* ACTIVE LINE */}
              <div
                className="absolute top-4 left-0 h-[2px] bg-green-500 z-0 transition-all duration-500"
                style={{
                  width: `${(currentIndex / (steps.length - 1)) * 100}%`,
                }}
              />

              {steps.map((step, i) => (
                <div key={i} className="flex-1 text-center z-10">
                  {i <= currentIndex ? (
                    <CheckCircle className="mx-auto text-green-600 bg-white" />
                  ) : (
                    <Circle className="mx-auto text-gray-300 bg-white" />
                  )}

                  <p className="text-xs mt-2 text-gray-600">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          {order.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center"
            >
              <div className="flex gap-4">
                <img
                  src={`${IMGURL}${item.image}`}
                  className="w-20 h-24 rounded-lg object-cover"
                />

                <div>
                  <p className="text-sm font-medium">
                    Product #{item.product_id}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Size: {item.size} | Qty: {item.quantity}
                  </p>

                  <p className="text-sm font-semibold mt-2">₹{item.price}</p>
                </div>
              </div>

              {/* Status + Delivery */}
              <div className="text-right">
                <p className="text-orange-500 text-xs font-medium">
                  {order.status === "delivered" ? "Delivered" : "In progress"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Arriving by {getDeliveryDate(order.created_at)}
                </p>

                {/* Cancel button */}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Address */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm font-semibold mb-4">Delivery Address</p>

            <p className="text-sm">
              {order.first_name} {order.last_name}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              {order.address1}, {order.address2}
            </p>

            <p className="text-xs text-gray-500">
              {order.country} - {order.post_code}
            </p>

            <p className="text-xs text-gray-500 mt-1">Phone: {order.phone}</p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm font-semibold mb-4">Payment Details</p>

            <div className="space-y-2 text-sm">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>Product #{item.product_id}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}

              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{order.total_amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

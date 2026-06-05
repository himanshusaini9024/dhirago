"use client";
import { CheckCircle, Circle } from "lucide-react";

const IMGURL = "https://res.cloudinary.com/ds48lk80f/";

const getDeliveryDate = (createdAt) => {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + 4);
  return date.toDateString();
};

export default function OrderDetailsUI({ order }) {
  const steps = [
    { key: "new", label: "Confirmed" },
    { key: "process", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "out_for_delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered" },
  ];

  const currentIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <div className="bg-[#f5f5f5] p-3 md:p-6 rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-4 md:space-y-6">

          {/* Timeline */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <p className="text-sm font-light mb-5 md:mb-6">
              Items Ordered &amp; Delivery Details
            </p>

            {/* Desktop timeline */}
            <div className="hidden sm:flex items-center justify-between relative">
              <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-200 z-0" />
              <div
                className="absolute top-4 left-0 h-[2px] bg-green-500 z-0 transition-all duration-500"
                style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
              />
              {steps.map((step, i) => (
                <div key={i} className="flex-1 text-center z-10">
                  {i <= currentIndex ? (
                    <CheckCircle className="mx-auto text-green-600 bg-white w-5 h-5" />
                  ) : (
                    <Circle className="mx-auto text-gray-300 bg-white w-5 h-5" />
                  )}
                  <p className="text-xs mt-2 text-gray-600 leading-tight">{step.label}</p>
                </div>
              ))}
            </div>

            {/* Mobile timeline — vertical */}
            <div className="sm:hidden flex flex-col gap-0">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  {/* Icon + vertical line */}
                  <div className="flex flex-col items-center">
                    {i <= currentIndex ? (
                      <CheckCircle className="text-green-600 w-5 h-5 shrink-0" />
                    ) : (
                      <Circle className="text-gray-300 w-5 h-5 shrink-0" />
                    )}
                    {i < steps.length - 1 && (
                      <div
                        className={`w-[2px] h-6 mt-1 ${
                          i < currentIndex ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                  <p className={`text-xs pt-0.5 ${i <= currentIndex ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          {order.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 md:p-5 shadow-sm flex gap-4 items-start"
            >
              <img
                src={`${IMGURL}${item.image}`}
                className="w-16 h-20 md:w-20 md:h-24 rounded-lg object-cover shrink-0"
                alt={`Product ${item.product_id}`}
              />

              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <p className="text-sm font-medium">Product #{item.product_id}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Size: {item.size} | Qty: {item.quantity}
                  </p>
                  <p className="text-sm font-semibold mt-2">₹{item.price}</p>
                </div>

                <div className="sm:text-right shrink-0">
                  <p className="text-orange-500 text-xs font-medium">
                    {order.status === "delivered" ? "Delivered" : "In progress"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Arriving by {getDeliveryDate(order.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="space-y-4 md:space-y-6">

          {/* Address */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <p className="text-sm font-medium mb-3 md:mb-4">Delivery Address</p>
            <p className="text-sm font-medium">
              <label htmlFor="">Customer Name:-</label> {order.first_name} 
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {order.address1}{order.address2 ? `, ${order.address2}` : ""}
            </p>
            <p className="text-xs text-gray-500">
              {order.country} - {order.post_code}
            </p>
            <p className="text-xs text-gray-500 mt-1">Phone: {order.phone}</p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <p className="text-sm font-light mb-3 md:mb-4">Payment Details</p>
            <div className="space-y-2 text-sm">
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
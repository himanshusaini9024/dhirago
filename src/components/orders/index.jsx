"use client";
import { useMemo, useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import UpdateOrderAddress from "./UpdateOrderAddress";

const IMGURL = process.env.NEXT_PUBLIC_IMG_URL;

const STATUS_STEPS = [
  { key: "new", label: "Confirmed" },
  { key: "process", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

const TERMINAL_AFTER_DELIVERY = ["exchanged", "refunded", "delivered"];

const getCurrentIndex = (status) => {
  const effective = TERMINAL_AFTER_DELIVERY.includes(status)
    ? "delivered"
    : status;
  const idx = STATUS_STEPS.findIndex((s) => s.key === effective);
  return idx < 0 ? 0 : idx;
};

const getArrivalLabel = (order) => {
  if (order.delivered_at) {
    return `Delivered on ${new Date(order.delivered_at).toDateString()}`;
  }
  if (order.expected_delivery_date) {
    return `Arriving by ${new Date(order.expected_delivery_date).toDateString()}`;
  }
  const date = new Date(order.created_at);
  date.setDate(date.getDate() + 4);
  return `Arriving by ${date.toDateString()}`;
};

const formatAddress = (order) => {
  const line1 = [order.address1, order.address2].filter(Boolean).join(", ");
  const line2 = [order.city, order.state, order.country, order.post_code]
    .filter(Boolean)
    .join(", ")
    .replace(/, (?=\d)/, " - ");
  return [line1, line2].filter(Boolean).join(", ");
};

const canEditAddress = (order) => {
  if (typeof order?.can_update_address === "boolean") {
    return order.can_update_address;
  }
  if (!order?.created_at) return false;
  if (!["new", "process"].includes(order.status)) return false;
  const ageMs = Date.now() - new Date(order.created_at).getTime();
  return ageMs >= 0 && ageMs <= 24 * 60 * 60 * 1000;
};

export default function OrderDetailsUI({
  order,
  allowAddressEdit = false,
  onOrderUpdated,
}) {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const currentIndex = getCurrentIndex(order.status);
  const customerName = [order.first_name]
    .filter(Boolean)
    .join(" ");
  const editable = useMemo(
    () => allowAddressEdit && canEditAddress(order),
    [allowAddressEdit, order],
  );

  return (
    <>
      <div className="bg-[#f5f5f5] p-3 md:p-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
              <p className="text-sm font-light text-gray-500 mb-5 md:mb-6">
                Items Ordered &amp; Delivery Details
              </p>

              {/* Desktop timeline */}
              <div className="hidden sm:flex items-center justify-between relative">
                <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-200 z-0" />
                <div
                  className="absolute top-4 left-0 h-[2px] bg-green-500 z-0 transition-all duration-500"
                  style={{
                    width: `${(currentIndex / (STATUS_STEPS.length - 1)) * 100}%`,
                  }}
                />
                {STATUS_STEPS.map((step, i) => (
                  <div key={step.key} className="flex-1 text-center z-10">
                    {i <= currentIndex ? (
                      <CheckCircle className="mx-auto text-green-600 bg-white w-5 h-5" />
                    ) : (
                      <Circle className="mx-auto text-gray-300 bg-white w-5 h-5" />
                    )}
                    <p className="text-xs mt-2 text-gray-600 leading-tight">
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile timeline */}
              <div className="sm:hidden flex flex-col gap-0">
                {STATUS_STEPS.map((step, i) => (
                  <div key={step.key} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      {i <= currentIndex ? (
                        <CheckCircle className="text-green-600 w-5 h-5 shrink-0" />
                      ) : (
                        <Circle className="text-gray-300 w-5 h-5 shrink-0" />
                      )}
                      {i < STATUS_STEPS.length - 1 && (
                        <div
                          className={`w-[2px] h-6 mt-1 ${
                            i < currentIndex ? "bg-green-500" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                    <p
                      className={`text-xs pt-0.5 ${
                        i <= currentIndex
                          ? "text-gray-800 font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            {(order.items || []).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 md:p-5 shadow-sm flex gap-4 items-start"
              >
                <img
                  src={
                    item.image
                      ? `${IMGURL}${item.image}`
                      : "/images/placeholder.png"
                  }
                  className="w-16 h-20 md:w-20 md:h-24 rounded-lg object-cover shrink-0"
                  alt={item.name || `Product ${item.product_id}`}
                />

                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <p className="text-sm font-medium">
                      {item.name || `Product #${item.product_id}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Size: {item.size || "—"} | Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold mt-2">₹{item.price}</p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <p
                      className={`text-xs font-medium ${
                        order.status === "delivered"
                          ? "text-green-600"
                          : "text-orange-500"
                      }`}
                    >
                      {order.status === "delivered"
                        ? "Delivered"
                        : "In progress"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {getArrivalLabel(order)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
                <p className="text-sm font-medium text-gray-600">
                  Delivery Address
                </p>
                {editable && (
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(true)}
                    className="text-[10px] uppercase tracking-[0.14em] text-[#1a1a1a] border border-black/20 px-2.5 py-1.5 hover:bg-black hover:text-white transition-colors"
                  >
                    Change
                  </button>
                )}
              </div>
              <p className="text-sm font-medium text-[#1a1a1a]">
                Customer Name:- {customerName || "—"}
              </p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {formatAddress(order) || "Address not available"}
              </p>
              {order.phone && (
                <p className="text-xs text-gray-500 mt-2">
                  Phone: {order.phone}
                </p>
              )}
              {editable && (
                <p className="text-[11px] text-amber-700 mt-3 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  You can update this address within 24 hours of placing the
                  order.
                </p>
              )}
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
              <p className="text-sm font-light text-gray-600 mb-3 md:mb-4">
                Payment Details
              </p>
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

      <UpdateOrderAddress
        order={order}
        open={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onUpdated={onOrderUpdated}
      />
    </>
  );
}

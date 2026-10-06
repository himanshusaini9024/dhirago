export const ORDER_STEPS = [
  { key: "new", label: "Order Placed" },
  { key: "process", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

// Statuses outside the normal forward flow, mapped to the last step the
// parcel actually reached so the timeline stops there instead of resetting.
const STEP_FOR_STATUS = {
  exchanged: "delivered",
  refunded: "delivered",
  undelivered: "out_for_delivery",
  rto: "shipped",
  rto_delivered: "shipped",
  lost: "shipped",
  cancel: "new",
};

export const getStepIndex = (status) => {
  const key = STEP_FOR_STATUS[status] || status;
  const idx = ORDER_STEPS.findIndex((s) => s.key === key);
  return idx < 0 ? 0 : idx;
};

const isPrepaid = (order) =>
  order?.payment_status === "paid" &&
  String(order?.payment_method || "").toLowerCase() !== "cod";

export const getOrderException = (order) => {
  const remark = order?.courier_remark;

  switch (order?.status) {
    case "undelivered":
      return {
        tone: "amber",
        title: "Delivery attempt failed",
        message:
          "Our courier partner couldn't deliver your order and will try again. Please keep your phone reachable, or contact us on WhatsApp to update your address or delivery date.",
        remark,
      };
    case "rto":
      return {
        tone: "red",
        title: "Returning to our warehouse",
        message:
          "After unsuccessful delivery attempts, your parcel is on its way back to us. Contact us on WhatsApp if you'd still like to receive it.",
        remark,
      };
    case "rto_delivered":
      return {
        tone: "red",
        title: "Returned to our warehouse",
        message: isPrepaid(order)
          ? "Your parcel has been returned to us. Our team will contact you to re-ship the order or process your refund."
          : "Your parcel has been returned to us. Contact us on WhatsApp if you'd like us to ship it again.",
        remark,
      };
    case "lost":
      return {
        tone: "red",
        title: "Issue with your shipment",
        message:
          "Your parcel was lost or damaged in transit. Our team will contact you about a replacement or refund.",
      };
    case "cancel":
      return {
        tone: "gray",
        title: "Order cancelled",
        message: "This order has been cancelled.",
      };
    default:
      return null;
  }
};

export const EXCEPTION_TONE_CLASSES = {
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  red: "border-red-200 bg-red-50 text-red-800",
  gray: "border-gray-200 bg-gray-50 text-gray-700",
};

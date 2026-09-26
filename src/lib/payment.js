// lib/payment.js
import API from "./api";
import { event } from "./gtag";

export const handleOnlinePayment = async ({
  priceTotal,
  selectedAddress,
  cartItems,
  createOrder,
  email,
  couponCode = null,
}) => {
  if (!selectedAddress) return alert("Select address");
  if (!cartItems?.length) {
    return alert("Your cart is empty. Please add items before checkout.");
  }

  // Snapshot at click time so Razorpay handler never posts an emptied cart.
  const itemsSnapshot = cartItems;

  try {
    const { data } = await API.post("/razorpay/create-order", {
      amount: priceTotal,
      coupon_code: couponCode || undefined,
      items: itemsSnapshot.map((item) => ({
        price: item.price,
        quantity: item.quantity,
      })),
    });
    const rzpkey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    event({
      action: "checkout",
      category: "online",
      label: email,
      value: priceTotal,
    });

    const options = {
      key: rzpkey,
      amount: data.amount,
      currency: "INR",
      order_id: data.id,

      handler: async function (response) {
        try {
          const verify = await API.post("/razorpay/verify", response);

          if (verify.data.status) {
            await createOrder(
              "paid",
              response.razorpay_payment_id,
              response.razorpay_order_id,
              itemsSnapshot,
            );
          } else {
            alert("Payment verification failed");
          }
        } catch (err) {
          const message =
            err?.response?.data?.message ||
            "Payment succeeded but order could not be saved. Contact support.";
          alert(message);
        }
      },

      prefill: {
        name: selectedAddress.name,
        email: email,
        contact: selectedAddress.phone,
      },

      theme: {
        color: "#6a99f0",
      },
    };

    if (typeof window.Razorpay !== "function") {
      alert("Payment gateway is still loading. Please try again in a moment.");
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      const desc =
        response?.error?.description ||
        response?.error?.reason ||
        "Payment failed. Please try again.";
      alert(desc);
    });
    rzp.open();
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      "Unable to start payment. Please try again.";
    alert(message);
  }
};

export const handleCOD = async ({
  createOrder,
  email,
  priceTotal,
  cartItems,
}) => {
  if (!cartItems?.length) {
    return alert("Your cart is empty. Please add items before checkout.");
  }

  event({
    action: "checkout",
    category: "unpaid",
    label: email,
    value: priceTotal,
  });
  await createOrder("unpaid", null, null, cartItems);
};

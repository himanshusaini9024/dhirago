// lib/payment.js
import API from "./api";

export const handleOnlinePayment = async ({
  priceTotal,
  selectedAddress,
  cartItems,
  checkoutData,
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
      // Saved on the server so Razorpay webhook can still create the order
      // if this browser never gets the payment result back.
      checkout: checkoutData,
    });
    const rzpkey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    const options = {
      key: rzpkey,
      amount: data.amount,
      currency: "INR",
      order_id: data.id,

      // Server verifies signature when saving the order (and via webhook).
      handler: async function (response) {
        try {
          await createOrder(
            "paid",
            response.razorpay_payment_id,
            response.razorpay_order_id,
            itemsSnapshot,
            response.razorpay_signature,
          );
        } catch (err) {
          const message =
            err?.response?.data?.message ||
            `Your payment was received (payment ID ${response.razorpay_payment_id}). We're confirming your order — please don't pay again. Contact support with this payment ID if you don't get confirmation.`;
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
    return alert("Your cart is empty. Please add items before placing an order.");
  }

  await createOrder("unpaid", null, null, cartItems);
};

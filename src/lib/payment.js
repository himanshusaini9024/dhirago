// lib/payment.js
import API from "./api";

export const handleOnlinePayment = async ({
  priceTotal,
  selectedAddress,
  cartItems,
  createOrder,
}) => {
  if (!selectedAddress) return alert("Select address");

  const { data } = await API.post("/razorpay/create-order", {
    amount: priceTotal,
  });
   console.log("ORDER DATA:", data); 

  const options = {
    key: "rzp_test_Saui0g7QNWR2e4",
    amount: data.amount,
    currency: "INR",
    order_id: data.id,

    handler: async function (response) {
      console.log(response);
      const verify = await API.post("/razorpay/verify", response);

      if (verify.data.status) {
        await createOrder("paid", response.razorpay_payment_id);
      } else {
        alert("Payment verification failed");
      }
    },

    prefill: {
      name: selectedAddress.name,
      contact: selectedAddress.phone,
    },

    theme: {
      color: "#000",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

export const handleCOD = async ({ createOrder }) => {
  await createOrder("unpaid", null);
};
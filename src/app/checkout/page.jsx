"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import API from "../../lib/api";
import { handleOnlinePayment, handleCOD } from "../../lib/payment";
import CheckoutItems from "../../components/checkout/items";
import CheckoutStatus from "../../components/checkout-status";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/reducers/cart";
import { useRouter } from "next/navigation";
const FloatInput = ({ label, value, onChange, error }) => {
  return (
    <div>
      <div className="relative border rounded-md px-3 py-2">
        <input
          value={value}
          onChange={onChange}
          className="w-full outline-none text-sm bg-transparent"
        />
        <label
          className={`absolute left-3 transition-all text-gray-500 text-sm 
          ${value ? "-top-2 text-xs bg-white px-1" : "top-2"}
        `}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter valid email");
      return false;
    }

    setEmailError("");
    return true;
  };
  const router = useRouter();
  const priceTotal = useSelector((state) => {
    const { cartItems } = state.cart;
    let totalPrice = 0;

    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.price * item.quantity));
    }

    return totalPrice;
  });

  const cartItems = useSelector((state) => state.cart.cartItems);

  const createOrder = async (payment_status, payment_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
      console.log('usernew',user.customer_id);
      

    if (!validateEmail()) return;
    const orderData = {
      sub_total: priceTotal,
      customer_id: user.customer_id,
      total_amount: priceTotal,
      quantity: cartItems.reduce((a, c) => a + c.quantity, 0),

      payment_method: payment_status === "paid" ? "online" : "cod",
      payment_status: payment_status,
      payment_id,
      name: selectedAddress.name,
      email: email,
      phone: selectedAddress.phone,
      address1: selectedAddress.address1,
      address2: selectedAddress.address2,
      state: selectedAddress.state,
      pincode: selectedAddress.pincode,

      items: cartItems,
    };

    try {
      const res = await API.post("/orders", orderData);

      // 👉 clear cart (important)
      localStorage.removeItem("cartItems");

      // 👉 redirect
      // window.location.replace = "/success";
      router.replace("/success");
      setTimeout(() => {
        dispatch(clearCart());
        localStorage.removeItem("cartItems");
      }, 1000);
    } catch (err) {
      console.log(err.response?.data);
    }
  };
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    type: "home",
    is_default: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchAddresses = async () => {
    const res = await API.get("/addresses");
    setAddresses(res.data);
    if (res.data.length > 0) setSelectedAddress(res.data[0]);
  };

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      fetchAddresses();
    }
  }, []);

  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.phone) {
      newErrors.phone = "Phone is required";
    } else if (form.phone.length > 10) {
      newErrors.phone = "Enter valid 10-digit number";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter valid 10-digit number";
    }

    if (!form.address1.trim()) newErrors.address1 = "Address is required";

    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";

    if (!form.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Enter valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAddress = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await API.post("/addresses", form);
      await fetchAddresses();
      setSelectedAddress(res.data);
      setShowAddModal(false);

      setForm({
        name: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        type: "home",
        is_default: false,
      });

      setErrors({});
    } catch (e) {
      console.log(e.response?.data);
    } finally {
      setLoading(false);
    }
  };
  const [paymentMethod, setPaymentMethod] = useState("online");
  // default = online
  useEffect(() => {
    const lastPayment = localStorage.getItem("paymentMethod");

    if (lastPayment) {
      setPaymentMethod(lastPayment);
    } else {
      setPaymentMethod("online"); // default
    }
  }, []);
  const [processing, setProcessing] = useState(false);
  return (
    <>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Shipping and Payment</h3>
            <CheckoutStatus step="checkout" />
          </div>

          <div className="checkout-content">
            <div className="checkout__col-6">
              <div className="block">
                <h3 className="block__title">Shipping information</h3>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold tracking-wide">
                      DELIVERY ADDRESS
                    </h2>

                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="text-pink-600 text-sm font-semibold hover:text-pink-700 transition"
                    >
                      CHANGE
                    </button>
                  </div>

                  {selectedAddress ? (
                    <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sm text-gray-800">
                            {selectedAddress.name}
                          </p>

                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            {selectedAddress.address1},{" "}
                            {selectedAddress.address2}, {selectedAddress.city},{" "}
                            {selectedAddress.state} - {selectedAddress.pincode}
                          </p>

                          <p className="text-xs mt-1 text-gray-700">
                            📞 {selectedAddress.phone}
                          </p>
                        </div>

                        {/* {selectedAddress.is_default && (
                          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            DEFAULT
                          </span>
                        )} */}
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setShowAddModal(true);

                          setAddressError("");
                        }}
                        className="mt-4 w-full border border-dashed py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
                      >
                        + Add Address
                      </button>

                      {addressError && (
                        <p className="text-xs text-red-500 mt-2">
                          {addressError}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="block mt-6">
                <h3 className="block__title">Contact Information</h3>

                <div className="mt-3">
                  <FloatInput
                    label="Email Address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      localStorage.setItem("user_email", e.target.value); // ✅ save instantly
                    }}
                  />
                  <>
                    {emailError && (
                      <p className="text-xs text-red-500 mt-2">{emailError}</p>
                    )}
                  </>
                </div>
              </div>

              <div className="block mt-6">
                <h3 className="block__title">Payment Method</h3>

                <div className="flex gap-4 mt-3">
                  {/* ONLINE */}
                  <button
                    onClick={() => setPaymentMethod("online")}
                    className={`flex-1 border rounded-xl p-4 transition ${
                      paymentMethod === "online"
                        ? "border-black bg-gray-100"
                        : "hover:border-gray-400"
                    }`}
                  >
                    <p className="font-semibold text-sm mb-2">Online Payment</p>

                    {/* Logos */}
                    <div className="flex items-center gap-2">
                      <ul className="round-options round-options--three">
                        <li className="round-item">
                          <img src="/images/logos/razorpay.png" alt="Paypal" />
                        </li>
                        <li className="round-item">
                          <img src="/images/logos/visa.png" alt="Visa" />
                        </li>
                        <li className="round-item">
                          <img
                            src="/images/logos/mastercard.png"
                            alt="Mastercard"
                          />
                        </li>
                        <li className="round-item">
                          <img src="/images/logos/maestro.png" alt="Maestro" />
                        </li>
                        <li className="round-item">
                          <img
                            src="/images/logos/discover.png"
                            alt="Discover"
                          />
                        </li>
                        <li className="round-item">
                          <img src="/images/logos/ideal-logo.svg" alt="Ideal" />
                        </li>
                      </ul>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      UPI, Cards, Wallets
                    </p>
                  </button>

                  {/* COD */}
                  <button
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex-1 border rounded-xl p-4 transition ${
                      paymentMethod === "cod"
                        ? "border-black bg-gray-100"
                        : "hover:border-gray-400"
                    }`}
                  >
                    <img src="/images/logos/cod.avif" alt="Ideal" />

                    <p className="font-semibold text-sm">Cash on Delivery</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Pay when product arrives
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <div className="checkout__col-6">
              <div className="block">
                <h3 className="block__title">Your cart</h3>
                <CheckoutItems />

                <div className="bg-gray-50 p-6 h-fit sticky top-24">
                  <h2 className="text-xs tracking-widest mb-6 text-gray-600">
                    PRICE DETAILS
                  </h2>

                  <div className="flex justify-between text-sm mb-3">
                    <span>Product Total</span>
                    <span>₹{priceTotal}</span>
                  </div>

                  <div className="flex justify-between text-sm mb-3">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>

                  <div className="border-t pt-4 flex justify-between font-medium">
                    <p className="text-sm text-gray-600">Total Amount</p>

                    <h3 className="text-lg font-semibold text-black">
                      ₹{priceTotal}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-actions cart-actions--checkout">
            <Link href="/cart" className="cart__btn-back">
              <i className="icon-left" /> Back
            </Link>

            <div className="cart-actions__items-wrapper">
              <button type="button" className="btn btn--rounded btn--border">
                <Link href="/" className="cart__btn-back">
                  Continue shopping
                </Link>
              </button>
              {paymentMethod === "online" ? (
                <button
                  disabled={processing || !selectedAddress}
                  onClick={async () => {
                    if (!selectedAddress) {
                      setAddressError("Please add/select a delivery address");
                      return;
                    }
                    if (!email) {
                      setEmailError("Please add a email");
                      return;
                    }

                    setProcessing(true);

                    await handleOnlinePayment({
                      priceTotal,
                      selectedAddress,
                      cartItems,
                      createOrder,
                      email,
                    });

                    setProcessing(false);
                  }}
                  className={`btn btn--rounded btn--yellow ${
                    processing ? "opacity-70" : ""
                  }`}
                >
                  {processing ? "Processing Payment..." : "Proceed to Payment"}
                </button>
              ) : (
                <button
                  disabled={processing || !selectedAddress}
                  onClick={async () => {
                    if (!selectedAddress) {
                      setAddressError("Please add/select a delivery address");
                      return;
                    }
                    setProcessing(true);

                    await handleCOD({
                      createOrder,
                    });

                    setProcessing(false);
                  }}
                  className="btn btn--rounded btn--yellow"
                >
                  {processing ? "Placing Order..." : "Place Order (COD)"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 🔥 ADDRESS MODAL */}
        {showAddressModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center">
            {/* <div className="bg-white w-full rounded-t-2xl p-5 animate-slideUp"> */}
            <div className="bg-white w-full md:w-[500px] rounded-t-2xl md:rounded-2xl p-6 shadow-2xl animate-slideUp">
              <h2 className="font-semibold mb-4">Select Delivery Address</h2>
              <button
                onClick={() => setShowAddressModal(false)}
                className="text-gray-500 hover:text-black text-lg"
              >
                ✕
              </button>
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowAddressModal(false);
                  }}
                  className={`border p-4 rounded-xl cursor-pointer transition 
                ${
                  selectedAddress?.id === addr.id
                    ? "border-pink-500 bg-pink-50"
                    : "hover:border-gray-400"
                }`}
                >
                  <p className="font-semibold text-sm">{addr.name}</p>

                  <p className="text-xs text-gray-500 mt-1">
                    {addr.address1}, {addr.city}
                  </p>

                  <p className="text-xs mt-1">{addr.phone}</p>
                </div>
              ))}

              <button
                onClick={() => {
                  setShowAddressModal(false);
                  setShowAddModal(true);
                }}
                className="w-full mt-3 border py-2 rounded-lg"
              >
                + Add New Address
              </button>
            </div>
          </div>
        )}

        {/* 🔥 ADD MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
            <div className="bg-white w-full md:max-w-lg rounded-t-2xl md:rounded-2xl p-6 shadow-xl animate-slideUp">
              {/* HEADER */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg tracking-wide">
                  Add New Address
                </h2>

                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>

              {/* RECEIVER */}
              <div className="bg-gradient-to-r from-pink-100 to-yellow-100 p-4 rounded-lg mb-4 flex justify-between">
                <div>
                  <p className="font-semibold text-sm">{form.name}</p>
                  <p className="text-xs">{form.phone}</p>
                </div>
              </div>

              {/* FORM */}
              <div className="space-y-4">
                <FloatInput
                  label="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  error={errors.name}
                />

                <FloatInput
                  label="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  error={errors.phone}
                />

                <FloatInput
                  label="House No / Building"
                  value={form.address1}
                  onChange={(e) =>
                    setForm({ ...form, address1: e.target.value })
                  }
                  error={errors.address1}
                />

                <FloatInput
                  label="Street / Landmark"
                  value={form.address2}
                  onChange={(e) =>
                    setForm({ ...form, address2: e.target.value })
                  }
                />

                <div className="grid grid-cols-2 gap-3">
                  <FloatInput
                    label="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    error={errors.city}
                  />
                  <FloatInput
                    label="State"
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                    error={errors.state}
                  />
                </div>

                <FloatInput
                  label="Pincode"
                  value={form.pincode}
                  onChange={(e) =>
                    setForm({ ...form, pincode: e.target.value })
                  }
                  error={errors.pincode}
                />

                {/* TYPE */}
                <div className="flex gap-4 text-sm">
                  {["home", "office"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, type: t })}
                      className={`px-4 py-1 border rounded-full ${
                        form.type === t ? "border-black font-semibold" : ""
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* DEFAULT */}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setForm({ ...form, is_default: e.target.checked })
                    }
                  />
                  Make this default
                </label>

                {/* BUTTON */}
                <button
                  onClick={handleSaveAddress}
                  className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  {loading ? "Saving..." : "SAVE ADDRESS"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default CheckoutPage;

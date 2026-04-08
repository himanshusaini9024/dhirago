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
  const priceTotal = useSelector((state) => {
    const { cartItems } = state.cart;
    let totalPrice = 0;

    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  });

  const cartItems = useSelector((state) => state.cart.cartItems);


const createOrder = async (payment_status, payment_id) => {
  const orderData = {
    sub_total: priceTotal,
    total_amount: priceTotal,
    quantity: cartItems.reduce((a, c) => a + c.count, 0),

    payment_method: payment_status === "paid" ? "online" : "cod",
    payment_status : payment_status,
    payment_id,

    name: selectedAddress.name,
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
      dispatch(clearCart());
    localStorage.removeItem("cartItems");

    // 👉 redirect
    window.location.href = "/success";
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
    fetchAddresses();
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
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="mt-4 w-full border border-dashed py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
                    >
                      + Add Address
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Payment method</h3>
                <ul className="round-options round-options--three">
                  <li className="round-item">
                    <img src="/images/logos/paypal.png" alt="Paypal" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/visa.png" alt="Visa" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/mastercard.png" alt="Mastercard" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/maestro.png" alt="Maestro" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/discover.png" alt="Discover" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/ideal-logo.svg" alt="Ideal" />
                  </li>
                </ul>
              </div>

              <div className="block">
                <h3 className="block__title">Delivery method</h3>
                <ul className="round-options round-options--two">
                  <li className="round-item round-item--bg">
                    <img src="/images/logos/inpost.svg" alt="Inpost" />
                    <p>$20.00</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <img src="/images/logos/dpd.svg" alt="DPD" />
                    <p>$12.00</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <img src="/images/logos/dhl.svg" alt="DHL" />
                    <p>$15.00</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <img src="/images/logos/maestro.png" alt="Maestro" />
                    <p>$10.00</p>
                  </li>
                </ul>
              </div>
            </div> */}

            <div className="checkout__col-6">
              <div className="block">
                <h3 className="block__title">Your cart</h3>
                <CheckoutItems />

                <div className="mt-6 border-t pt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <h3 className="text-lg font-semibold text-black">
                    ₹{priceTotal}
                  </h3>
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
              <button
                onClick={() =>
                  handleOnlinePayment({
                    priceTotal,
                    selectedAddress,
                    cartItems,
                    createOrder,
                  })
                }
                type="button"
                className="btn btn--rounded btn--yellow"
              >
                Proceed to payment
              </button>

              <button className="btn btn--rounded btn--black"
                onClick={() =>
                  handleCOD({
                    createOrder,
                  })
                }
              >
                Cash on Delivery
              </button>
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

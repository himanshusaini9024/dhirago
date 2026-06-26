"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import API from "../../lib/api";
import { handleOnlinePayment, handleCOD } from "../../lib/payment";
import CheckoutItems from "../../components/checkout/items";
import { clearCart } from "../../store/reducers/cart";
import { useRouter } from "next/navigation";
// import "@/assets/css/checkout.scss";
import "../../assets/css/checkout.scss";

/* ─────────────────────────────────────────────
   FloatInput — premium labeled input
   ───────────────────────────────────────────── */
const FloatInput = ({ label, value, onChange, error, type = "text", maxLength }) => (
  <div>
    <div className="fi-wrap">
      <input
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={value ? "fi-has-val" : ""}
      />
      <label>{label}</label>
    </div>
    {error && <p className="fi-error">{error}</p>}
  </div>
);

/* ─────────────────────────────────────────────
   CheckoutPage
   ───────────────────────────────────────────── */
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // ── email ──────────────────────────────────
  const [email, setEmail] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("user_email") || "" : ""
  );
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("user_email");
    if (saved) setEmail(saved);
  }, []);

  const validateEmail = () => {
    if (!email) { setEmailError("Email is required"); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError("Enter a valid email address"); return false; }
    setEmailError(""); return true;
  };

  // ── cart ───────────────────────────────────
  const priceTotal = useSelector((state) => {
    const { cartItems } = state.cart;
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userdata = useSelector((state) => state.auth.user);
  const customer_id = userdata?.customer_id;

  // ── create order ───────────────────────────
  const createOrder = async (payment_status, payment_id,razorpay_order_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!validateEmail()) return;
    const orderData = {
      sub_total: priceTotal,
      customer_id: customer_id,
      total_amount: priceTotal,
      quantity: cartItems.reduce((a, c) => a + c.quantity, 0),
      payment_method: payment_status === "paid" ? "online" : "cod",
      payment_status,
      payment_id,
      razorpay_order_id,
      name: selectedAddress.name,
      email,
      phone: selectedAddress.phone,
      address1: selectedAddress.address1,
      address2: selectedAddress.address2,
      state: selectedAddress.state,
      city: selectedAddress.city,
      pincode: selectedAddress.pincode,
      items: cartItems,
    };
    try {
      await API.post("/orders", orderData);
      localStorage.removeItem("cartItems");
      router.replace("/success");
      setTimeout(() => { dispatch(clearCart()); localStorage.removeItem("cartItems"); }, 100);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // ── addresses ─────────────────────────────
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressError, setAddressError] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchAddresses = async () => {
    const res = await API.get("/addresses");
    setAddresses(res.data);
    if (res.data.length > 0) setSelectedAddress(res.data[0]);
  };

  useEffect(() => {
    if (cartItems?.length > 0) fetchAddresses();
  }, []);

  // ── address form ──────────────────────────
  const emptyForm = { name: "", phone: "", address1: "", address2: "", city: "", state: "", pincode: "", type: "home", is_default: false };
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone) e.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter valid 10-digit number";
    if (!form.address1.trim()) e.address1 = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    if (!form.pincode) e.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveAddress = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await API.post("/addresses", form);
      await fetchAddresses();
      setSelectedAddress(res.data);
      setShowAddModal(false);
      setForm(emptyForm);
      setErrors({});
    } catch (e) {
      console.log(e.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // ── payment ───────────────────────────────
  const [paymentMethod, setPaymentMethod] = useState("online");
  useEffect(() => {
    const last = localStorage.getItem("paymentMethod");
    setPaymentMethod(last || "online");
  }, []);

  const [processing, setProcessing] = useState(false);


  // ── helpers ───────────────────────────────
  const RadioDot = ({ active }) => (
    <div className={`pay-radio${active ? " active" : ""}`}>
      {active && <div className="pay-radio-dot" />}
    </div>
  );

  return (
    <div className="checkout-page ">
      <div className="co-container">

        {/* TOPBAR */}
        <div className="co-topbar">
          <Link href="/" className="co-logo font-futura">DHIRAGO</Link>
          <div className="co-steps">
            <span>Cart</span>
            <span className="co-step-dot" />
            <span className="co-step-active">Checkout</span>
            <span className="co-step-dot active" />
            <span>Confirmation</span>
          </div>
        </div>

        <div className="co-grid">

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* 1 — SHIPPING */}
            <div className="co-section">
              <div className="co-section-label">
                <span className="co-section-num">1</span>
                Delivery Address
              </div>

              {selectedAddress ? (
                <div className="addr-display-card">
                  <p className="addr-display-name">{selectedAddress.name}</p>
                  <p className="addr-display-line">
                    {selectedAddress.address1}{selectedAddress.address2 ? `, ${selectedAddress.address2}` : ""},{" "}
                    {selectedAddress.city}, {selectedAddress.state} – {selectedAddress.pincode}
                  </p>
                  <p className="addr-display-line" style={{ marginTop: 6 }}>
                    📞 {selectedAddress.phone}
                  </p>
                  <button className="addr-change-btn" onClick={() => setShowAddressModal(true)}>
                    Change
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="add-addr-btn"
                    onClick={() => { setShowAddModal(true); setAddressError(""); }}
                  >
                    + Add Delivery Address
                  </button>
                  {addressError && <p className="fi-error" style={{ marginTop: 8 }}>{addressError}</p>}
                </>
              )}
            </div>

            {/* 2 — CONTACT */}
            <div className="co-section">
              <div className="co-section-label">
                <span className="co-section-num">2</span>
                Contact Information
              </div>
              <FloatInput
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  const v = e.target.value;
                  setEmail(v);
                  v ? localStorage.setItem("user_email", v) : localStorage.removeItem("user_email");
                  if (!v) setEmailError("Email is required");
                  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) setEmailError("Enter a valid email address");
                  else setEmailError("");
                }}
                error={emailError}
              />
            </div>

            {/* 3 — PAYMENT */}
            <div className="co-section">
              <div className="co-section-label">
                <span className="co-section-num">3</span>
                Payment Method
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16, letterSpacing: ".3px" }}>
                All transactions are secured with 256-bit SSL encryption.
              </p>

              <div className="pay-block">
                {/* Online */}
                <button
                  className={`pay-row${paymentMethod === "online" ? " active" : ""}`}
                  onClick={() => { setPaymentMethod("online"); localStorage.setItem("paymentMethod", "online"); }}
                >
                  <RadioDot active={paymentMethod === "online"} />
                  <span className="pay-label">Razorpay — UPI, Cards</span>
                  <div className="pay-logos">
                    {["UPI", "VISA", "MC", "+12"].map((l) => (
                      <span key={l} className="pay-logo-tag">{l}</span>
                    ))}
                  </div>
                </button>
                {paymentMethod === "online" && (
                  <div className="pay-desc">
                    You will be redirected to Razorpay's secure gateway to complete your purchase.
                  </div>
                )}

                <div className="pay-divider" />

                {/* COD */}
                <button
                  className={`pay-row${paymentMethod === "cod" ? " active" : ""}`}
                  onClick={() => { setPaymentMethod("cod"); localStorage.setItem("paymentMethod", "cod"); }}
                >
                  <RadioDot active={paymentMethod === "cod"} />
                  <span className="pay-label">Cash on Delivery</span>
                </button>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN (SUMMARY) ── */}
          <div className="summary-box">
            <div className="summary-header">
              <h2 className="summary-title">Order Summary</h2>
            </div>

            <div className="summary-items">
              <CheckoutItems />
            </div>

            <div className="price-details">
              <div className="price-row">
                <span>Product total</span>
                <span style={{ color: "var(--ink)" }}>₹{priceTotal}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span className="free-badge">Free</span>
              </div>
              <div className="price-row-total">
                <span>Total</span>
                <span className="total-figure">₹{priceTotal}</span>
              </div>
            </div>

            <div className="cta-area">
              {paymentMethod === "online" ? (
                <button
                  className="btn-primary"
                  disabled={processing || !selectedAddress}
                  onClick={async () => {
                    if (!selectedAddress) { setAddressError("Please add a delivery address to continue"); return; }
                    if (!validateEmail()) return;
                    if (processing) return;
                    setProcessing(true);
                    await handleOnlinePayment({ priceTotal, selectedAddress, cartItems, createOrder, email });
                    setProcessing(false);
                  }}
                >
                  {processing ? (
                    <span className="co-processing">
                      <span className="co-spinner" />
                      <span>Redirecting to Payment...</span>
                    </span>
                  ) : "Proceed to Payment"}
                </button>
              ) : (
                <button
                  className="btn-primary"
                  disabled={processing || !selectedAddress}
                  onClick={async () => {
                    if (!selectedAddress) { setAddressError("Please add a delivery address to continue"); return; }
                    if (!validateEmail()) return;
                    if (processing) return;
                    setProcessing(true);
                    await new Promise((r) => setTimeout(r, 1200));
                    await handleCOD({ createOrder,email ,priceTotal});
                    setProcessing(false);
                  }}
                >
                  {processing ? (
                    <span className="co-processing">
                      <span className="co-spinner" />
                      <span>Placing Your Order...</span>
                    </span>
                  ) : "Place Order "}
                </button>
              )}

              <Link href="/" className="btn-secondary">Continue Shopping</Link>

              <div className="secure-note">
                <svg width="10" height="13" viewBox="0 0 10 13" fill="none" aria-hidden="true">
                  <rect x="0.75" y="5" width="8.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1"/>
                  <path d="M3.5 5V3.5a1.5 1.5 0 0 1 3 0V5" stroke="currentColor" strokeWidth="1"/>
                </svg>
                Secured by SSL encryption
              </div>
            </div>
          </div>
        </div>

        {/* BACK LINK */}
        <Link href="/cart" className="co-back">
          ← Back to Cart
        </Link>
      </div>

      {/* ── ADDRESS SELECT MODAL ── */}
      {showAddressModal && (
        <div
          className="co-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setShowAddressModal(false); }}
        >
          <div className="co-modal">
            <div className="co-modal-head">
              <h2 className="co-modal-title">Select Address</h2>
              <button className="co-close-btn" onClick={() => setShowAddressModal(false)}>✕</button>
            </div>

            <div className="addr-list">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`addr-option${selectedAddress?.id === addr.id ? " selected" : ""}`}
                  onClick={() => { setSelectedAddress(addr); setShowAddressModal(false); }}
                >
                  <p className="addr-option-name">{addr.name}</p>
                  <p className="addr-option-line">{addr.address1}, {addr.city} – {addr.pincode}</p>
                  <p className="addr-option-line" style={{ marginTop: 4 }}>📞 {addr.phone}</p>
                </div>
              ))}
            </div>

            <button
              className="add-addr-btn"
              onClick={() => { setShowAddressModal(false); setShowAddModal(true); }}
            >
              + Add New Address
            </button>
          </div>
        </div>
      )}

      {/* ── ADD ADDRESS MODAL ── */}
      {showAddModal && (
        <div
          className="co-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setShowAddModal(false); }}
        >
          <div className="co-modal">
            <div className="co-modal-head">
              <h2 className="co-modal-title">New Address</h2>
              <button className="co-close-btn" onClick={() => setShowAddModal(false)}>✕</button>
            </div>

            <div className="co-form-grid">
              <FloatInput label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
              <FloatInput label="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} maxLength={10} />
              <FloatInput label="House / Flat / Building" value={form.address1} onChange={(e) => setForm({ ...form, address1: e.target.value })} error={errors.address1} />
              <FloatInput label="Street / Landmark (optional)" value={form.address2} onChange={(e) => setForm({ ...form, address2: e.target.value })} />

              <div className="co-form-row">
                <FloatInput label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} error={errors.city} />
                <FloatInput label="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} error={errors.state} />
              </div>

              <FloatInput label="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} error={errors.pincode} maxLength={6} />

              <div>
                <p style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>Save As</p>
                <div className="co-type-btns">
                  {["home", "office"].map((t) => (
                    <button
                      key={t}
                      className={`co-type-btn${form.type === t ? " active" : ""}`}
                      onClick={() => setForm({ ...form, type: t })}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <label className="co-checkbox-row">
                <input
                  type="checkbox"
                  checked={form.is_default}
                  onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
                />
                Set as default address
              </label>

              <button className="co-save-btn" disabled={loading} onClick={handleSaveAddress}>
                {loading ? "Saving…" : "Save Address"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
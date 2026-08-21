"use client";

import { useEffect, useMemo, useState } from "react";
import API from "../../lib/api";

const emptyForm = {
  first_name: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  post_code: "",
  country: "IND",
};

function hoursLeft(createdAt) {
  if (!createdAt) return 0;
  const end = new Date(createdAt).getTime() + 24 * 60 * 60 * 1000;
  const left = end - Date.now();
  return Math.max(0, Math.ceil(left / (60 * 60 * 1000)));
}

function sameAsOrder(addr, order) {
  if (!addr || !order) return false;
  return (
    (addr.address1 || "").trim() === (order.address1 || "").trim() &&
    (addr.pincode || "").trim() === (order.post_code || "").trim() &&
    (addr.phone || "").trim() === (order.phone || "").trim()
  );
}

export default function UpdateOrderAddress({
  order,
  open,
  onClose,
  onUpdated,
}) {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("pick"); // pick | form
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  const remainingHours = useMemo(
    () => hoursLeft(order?.created_at),
    [order?.created_at],
  );

  useEffect(() => {
    if (!open || !order) return;

    setError("");
    setMode("pick");
    setForm({
      first_name: order.first_name || "",
      phone: order.phone || "",
      address1: order.address1 || "",
      address2: order.address2 || "",
      city: order.city || "",
      state: order.state || "",
      post_code: order.post_code || "",
      country: order.country || "IND",
    });
    setFormErrors({});

    const load = async () => {
      try {
        setLoadingList(true);
        const res = await API.get("/addresses");
        setSavedAddresses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setSavedAddresses([]);
      } finally {
        setLoadingList(false);
      }
    };

    load();
  }, [open, order]);

  if (!open || !order) return null;

  const validate = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = "Name is required";
    if (!form.phone) e.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(String(form.phone).replace(/\D/g, "").slice(-10)))
      e.phone = "Enter a valid 10-digit mobile number";
    if (!form.address1.trim()) e.address1 = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    if (!form.post_code) e.post_code = "Pincode is required";
    else if (!/^\d{6}$/.test(String(form.post_code)))
      e.post_code = "Enter a valid 6-digit pincode";
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitPayload = async (payload) => {
    try {
      setSaving(true);
      setError("");
      const res = await API.put(`/orders/${order.order_number}/address`, payload);
      if (!res.data?.success) {
        setError(res.data?.message || "Could not update address.");
        return;
      }
      onUpdated?.(res.data.order);
      onClose?.();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not update address. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const applySavedAddress = async (addr) => {
    await submitPayload({
      first_name: addr.name,
      phone: addr.phone,
      address1: addr.address1,
      address2: addr.address2 || "",
      city: addr.city,
      state: addr.state,
      post_code: addr.pincode,
      country: addr.country || order.country || "IND",
    });
  };

  const submitForm = async (e) => {
    e?.preventDefault();
    if (!validate()) return;
    await submitPayload({
      ...form,
      phone: String(form.phone).replace(/\D/g, "").slice(-10),
    });
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/40 flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#1a1a1a]">
              Update Delivery Address
            </h3>
            <p className="text-[11px] text-gray-500 mt-1">
              Order #{order.order_number} · {remainingHours}h left to edit
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Current order address */}
          <section>
            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-2">
              Address on this order
            </p>
            <div className="rounded-xl border border-[#1a1a1a]/15 bg-[#fafafa] p-4">
              <p className="text-sm font-medium">{order.first_name}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {[order.address1, order.address2, order.city, order.state]
                  .filter(Boolean)
                  .join(", ")}
                {order.post_code ? ` - ${order.post_code}` : ""}
              </p>
              {order.phone && (
                <p className="text-xs text-gray-500 mt-1">Phone: {order.phone}</p>
              )}
            </div>
          </section>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {mode === "pick" ? (
            <>
              <section>
                <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-2">
                  Saved addresses
                </p>
                {loadingList ? (
                  <p className="text-xs text-gray-400">Loading saved addresses…</p>
                ) : savedAddresses.length === 0 ? (
                  <p className="text-xs text-gray-400">
                    No saved addresses in your profile yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {savedAddresses.map((addr) => {
                      const isCurrent = sameAsOrder(addr, order);
                      return (
                        <button
                          key={addr.id}
                          type="button"
                          disabled={saving || isCurrent}
                          onClick={() => applySavedAddress(addr)}
                          className={`w-full text-left rounded-xl border p-4 transition-colors ${
                            isCurrent
                              ? "border-green-500/40 bg-green-50"
                              : "border-gray-200 hover:border-black hover:bg-gray-50"
                          } disabled:opacity-60`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-medium">{addr.name}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {addr.address1}
                                {addr.address2 ? `, ${addr.address2}` : ""}
                              </p>
                              <p className="text-xs text-gray-500">
                                {addr.city}, {addr.state} – {addr.pincode}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                📞 {addr.phone}
                              </p>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 shrink-0">
                              {isCurrent ? "Current" : addr.type || "Saved"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>

              <button
                type="button"
                onClick={() => setMode("form")}
                className="w-full h-12 rounded-full border border-black text-xs uppercase tracking-[0.18em] hover:bg-black hover:text-white transition-colors"
              >
                Enter a different address
              </button>
            </>
          ) : (
            <form onSubmit={submitForm} className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
                New delivery address
              </p>

              {[
                ["first_name", "Full name"],
                ["phone", "Phone"],
                ["address1", "Address line 1"],
                ["address2", "Address line 2 (optional)"],
                ["city", "City"],
                ["state", "State"],
                ["post_code", "Pincode"],
              ].map(([key, label]) => (
                <div key={key}>
                  <input
                    type="text"
                    placeholder={label}
                    value={form[key]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className="w-full h-12 px-4 border border-gray-300 text-sm outline-none focus:border-black"
                  />
                  {formErrors[key] && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {formErrors[key]}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMode("pick")}
                  className="flex-1 h-12 rounded-full border border-gray-300 text-xs uppercase tracking-[0.15em]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-[2] h-12 rounded-full bg-[#1f232b] text-white text-xs uppercase tracking-[0.18em] disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Update Address"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import API from "./api";

/**
 * Apply / preview a coupon against the current cart via checkout quote API.
 */
export async function fetchCouponQuote(cartItems = [], couponCode = "") {
  const subTotal = (cartItems || []).reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0),
    0,
  );

  const code = String(couponCode || "").trim().toUpperCase();

  if (!code) {
    return {
      valid: false,
      code: null,
      label: null,
      discount: 0,
      total: subTotal,
      message: null,
      sub_total: subTotal,
    };
  }

  try {
    const { data } = await API.post("/checkout/quote", {
      sub_total: subTotal,
      coupon_code: code,
      items: (cartItems || []).map((item) => ({
        price: item.price,
        quantity: item.quantity,
      })),
    });

    const coupon = data?.coupon || {};

    return {
      valid: Boolean(coupon.valid),
      code: coupon.code || code,
      label: coupon.label || null,
      discount: Number(coupon.discount ?? data?.coupon_discount ?? 0) || 0,
      total: Number(data?.total ?? subTotal) || subTotal,
      message: coupon.message || data?.message || null,
      sub_total: Number(data?.sub_total ?? subTotal) || subTotal,
      first_order_discount: Number(data?.discount ?? 0) || 0,
    };
  } catch (err) {
    return {
      valid: false,
      code,
      label: null,
      discount: 0,
      total: subTotal,
      message:
        err?.response?.data?.message ||
        "Unable to apply coupon. Please try again.",
      sub_total: subTotal,
    };
  }
}

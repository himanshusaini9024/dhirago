import API from "./api";

/**
 * First-order 10% off — keep code, toggle with env.
 * Enable: NEXT_PUBLIC_FIRST_ORDER_DISCOUNT_ENABLED=true
 * (and matching FIRST_ORDER_DISCOUNT_ENABLED=true on the API)
 */
export const FIRST_ORDER_DISCOUNT_ENABLED =
  process.env.NEXT_PUBLIC_FIRST_ORDER_DISCOUNT_ENABLED === "true";

export const FIRST_ORDER_PERCENT = 10;
export const FIRST_ORDER_LABEL = "First order 10% off";

/**
 * Fetch server quote for first-order 10% off.
 * When the feature flag is off, always returns no discount.
 */
export async function fetchFirstOrderQuote(cartItems = []) {
  const subTotal = (cartItems || []).reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0),
    0,
  );

  if (!FIRST_ORDER_DISCOUNT_ENABLED) {
    return {
      eligible: false,
      percent: FIRST_ORDER_PERCENT,
      label: null,
      subTotal,
      discount: 0,
      total: subTotal,
      message: null,
    };
  }

  try {
    const { data } = await API.post("/checkout/quote", {
      sub_total: subTotal,
      items: (cartItems || []).map((item) => ({
        price: item.price,
        quantity: item.quantity,
      })),
    });

    return {
      eligible: Boolean(data?.eligible),
      percent: data?.percent ?? FIRST_ORDER_PERCENT,
      label: data?.label || FIRST_ORDER_LABEL,
      subTotal: Number(data?.sub_total ?? subTotal) || 0,
      discount: Number(data?.discount ?? 0) || 0,
      total: Number(data?.total ?? subTotal) || 0,
      message: data?.message || null,
    };
  } catch {
    return {
      eligible: false,
      percent: FIRST_ORDER_PERCENT,
      label: null,
      subTotal,
      discount: 0,
      total: subTotal,
      message: null,
    };
  }
}

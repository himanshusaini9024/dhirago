import API from "./api";

export const FIRST_ORDER_PERCENT = 10;

/**
 * Fetch server quote for first-order 10% off.
 * Falls back to local math only for display if the API fails.
 */
export async function fetchFirstOrderQuote(cartItems = []) {
  const subTotal = (cartItems || []).reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0),
    0,
  );

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
      label: data?.label || "First order 10% off",
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

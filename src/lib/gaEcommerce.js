/**
 * GA4 ecommerce helpers (dataLayer + gtag).
 * Monetization overview can show purchase revenue from value alone;
 * Ecommerce purchases / journeys need proper event names + items[].
 */

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

/** Normalize cart/order/product rows into GA4 item objects. */
export function toGaItems(items = []) {
  return (items || []).map((item, index) => ({
    item_id: String(
      item.product_id || item.id || item.sku || item.item_id || index,
    ),
    item_name: String(item.name || item.item_name || "Product"),
    item_brand: "Dhirago",
    item_category: String(item.category || item.item_category || "shirts"),
    item_variant: item.size || item.item_variant || item.color || undefined,
    price: toNumber(item.price ?? item.currentPrice ?? item.item_price),
    quantity: toNumber(item.quantity) || 1,
  }));
}

/**
 * Push a GA4 ecommerce event. Clears previous ecommerce object first (GA4/GTM pattern).
 * Also mirrors via gtag when available so events still fire if GTM mapping is incomplete.
 */
export function pushGaEcommerce(eventName, { currency = "INR", value, items = [], ...rest } = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    currency,
    value: toNumber(value),
    items: toGaItems(items),
    ...rest,
  };

  // Drop undefined keys (coupon, payment_type, etc.)
  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined) delete payload[key];
  });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: eventName,
    ecommerce: payload,
    // Root copies help GTM variables that do not read ecommerce.*
    currency: payload.currency,
    value: payload.value,
    items: payload.items,
    ...(payload.transaction_id
      ? { transaction_id: payload.transaction_id }
      : {}),
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
}

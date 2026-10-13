import { fbEvent } from "./facebookPixel";

const PURCHASE_KEY = "dhirago_purchase_tracked";
const PENDING_KEY = "dhirago_pending_purchase";

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function normalizeItems(items = []) {
  return (items || []).map((item, index) => ({
    item_id: String(item.id || item.product_id || item.sku || index),
    item_name: item.name || "Product",
    item_brand: "Dhirago",
    item_category: item.category || "shirts",
    price: toNumber(item.price ?? item.currentPrice),
    quantity: toNumber(item.quantity) || 1,
  }));
}

function metaContents(items = []) {
  return (items || []).map((item, index) => ({
    id: String(item.id || item.product_id || item.sku || index),
    quantity: toNumber(item.quantity) || 1,
    item_price: toNumber(item.price ?? item.currentPrice),
  }));
}

export function savePendingPurchase(payload) {
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

export function readPendingPurchase() {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function markTracked(orderId) {
  try {
    sessionStorage.setItem(PURCHASE_KEY, String(orderId));
    sessionStorage.removeItem(PENDING_KEY);
  } catch {
    /* ignore */
  }
}

function alreadyTracked(orderId) {
  try {
    return sessionStorage.getItem(PURCHASE_KEY) === String(orderId);
  } catch {
    return false;
  }
}

/**
 * Fire Purchase once for GTM/GA4 (dataLayer) + Meta Pixel.
 * Google Ads should import the GA4 purchase key event — no AW- snippet needed.
 */
export async function trackPurchase(order) {
  if (typeof window === "undefined" || !order) return false;

  const orderId =
    order.order_number ||
    order.id ||
    order.transaction_id ||
    order.razorpay_order_id;

  if (!orderId || alreadyTracked(orderId)) return false;

  const value = toNumber(order.total_amount ?? order.value ?? order.priceTotal);
  const currency = "INR";
  const items = normalizeItems(order.items || order.cartItems || []);
  const contents = metaContents(order.items || order.cartItems || []);
  const numItems = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  // Same id the backend uses for its server-side Purchase, so Meta counts it once.
  const eventID = `purchase_${orderId}`;

  // GTM → GA4 - purchase tag
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "purchase",
    ecommerce: {
      transaction_id: String(orderId),
      value,
      currency,
      items,
    },
  });

  // Meta Pixel. The Conversions API copy is sent by the backend when the order is saved.
  fbEvent(
    "Purchase",
    {
      value,
      currency,
      contents,
      content_type: "product",
      num_items: numItems,
      order_id: String(orderId),
    },
    eventID,
  );

  markTracked(orderId);
  return true;
}

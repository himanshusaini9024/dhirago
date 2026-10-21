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

/**
 * Same value Laravel uses: purchase_<order_number>.
 * Never fall back to DB id / Razorpay id — that breaks Meta dedupe.
 */
export function purchaseOrderNumber(order) {
  if (!order) return null;
  const n = order.order_number;
  if (n === null || n === undefined || n === "") return null;
  const s = String(n).trim();
  if (!s || s.startsWith("tmp_")) return null;
  return s;
}

export function savePendingPurchase(payload) {
  try {
    if (!purchaseOrderNumber(payload)) return;
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

function markTracked(orderNumber) {
  try {
    sessionStorage.setItem(PURCHASE_KEY, String(orderNumber));
    sessionStorage.removeItem(PENDING_KEY);
  } catch {
    /* ignore */
  }
}

function alreadyTracked(orderNumber) {
  try {
    return sessionStorage.getItem(PURCHASE_KEY) === String(orderNumber);
  } catch {
    return false;
  }
}

/**
 * Fire Purchase once for GTM/GA4 (dataLayer) + Meta Pixel.
 * Requires order_number so event_id matches Laravel MetaPurchaseJob.
 */
export async function trackPurchase(order) {
  if (typeof window === "undefined" || !order) return false;

  const orderNumber = purchaseOrderNumber(order);
  if (!orderNumber || alreadyTracked(orderNumber)) return false;

  const value = toNumber(order.total_amount ?? order.value ?? order.priceTotal);
  const currency = "INR";
  const items = normalizeItems(order.items || order.cartItems || []);
  const contents = metaContents(order.items || order.cartItems || []);
  const numItems = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const eventID = `purchase_${orderNumber}`;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "purchase",
    ecommerce: {
      transaction_id: String(orderNumber),
      value,
      currency,
      items,
    },
  });

  fbEvent(
    "Purchase",
    {
      value,
      currency,
      contents,
      content_type: "product",
      num_items: numItems,
      order_id: String(orderNumber),
    },
    eventID,
  );

  markTracked(orderNumber);
  return true;
}

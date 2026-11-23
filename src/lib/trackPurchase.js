import { fbEvent } from "./facebookPixel";
import { pushGaEcommerce, toGaItems } from "./gaEcommerce";

const PURCHASE_KEY = "dhirago_purchase_tracked";
const PENDING_KEY = "dhirago_pending_purchase";

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
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
 * Always includes transaction_id at root + ecommerce so GTM/GA4 can map it.
 */
export async function trackPurchase(order) {
  if (typeof window === "undefined" || !order) return false;

  const orderNumber = purchaseOrderNumber(order);
  if (!orderNumber || alreadyTracked(orderNumber)) return false;

  const value = toNumber(order.total_amount ?? order.value ?? order.priceTotal);
  const currency = "INR";
  const rawItems = order.items || order.cartItems || [];
  const items = toGaItems(rawItems);
  // Incomplete payload → skip. Prevents "purchase" with revenue but no transaction_id/items.
  if (!value || !items.length) return false;

  const contents = metaContents(rawItems);
  const numItems = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const eventID = `purchase_${orderNumber}`;
  const transactionId = String(orderNumber);

  // GA4 needs items[] for Ecommerce purchases; value alone only fills Monetization overview.
  pushGaEcommerce("purchase", {
    transaction_id: transactionId,
    value,
    currency,
    items: rawItems,
  });

  fbEvent(
    "Purchase",
    {
      value,
      currency,
      contents,
      content_type: "product",
      num_items: numItems,
      order_id: transactionId,
    },
    eventID,
  );

  markTracked(orderNumber);
  return true;
}

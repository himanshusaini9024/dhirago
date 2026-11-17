import { resolveProductPrice } from "./festiveSale";

/**
 * Cart line helpers for MRP / special (selling) price display.
 * Cart items store: price = selling, mrp|originalPrice = MRP.
 * When festive sale is off, selling is forced to MRP via resolveProductPrice.
 */
export function getItemMrp(item) {
  return resolveProductPrice(item).mrp;
}

export function getItemSellingPrice(item) {
  return resolveProductPrice(item).selling;
}

export function getItemLineMrp(item) {
  return getItemMrp(item) * (Number(item?.quantity) || 0);
}

export function getItemLineSelling(item) {
  return getItemSellingPrice(item) * (Number(item?.quantity) || 0);
}

export function getItemLineSavings(item) {
  return Math.max(0, getItemLineMrp(item) - getItemLineSelling(item));
}

export function summarizeCart(cartItems = []) {
  return cartItems.reduce(
    (acc, item) => {
      const mrp = getItemLineMrp(item);
      const selling = getItemLineSelling(item);
      acc.originalTotal += mrp;
      acc.payableTotal += selling;
      acc.savings += Math.max(0, mrp - selling);
      return acc;
    },
    { originalTotal: 0, payableTotal: 0, savings: 0 },
  );
}

export function formatINR(value) {
  const amount = Number(value) || 0;
  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

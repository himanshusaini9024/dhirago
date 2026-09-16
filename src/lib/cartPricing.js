/**
 * Cart line helpers for MRP / special (selling) price display.
 * Cart items store: price = selling, mrp|originalPrice = MRP.
 */
export function getItemMrp(item) {
  return (
    Number(item?.mrp ?? item?.originalPrice ?? item?.price) || 0
  );
}

export function getItemSellingPrice(item) {
  // Prefer explicit selling fields; fall back to price
  const selling = Number(
    item?.special_price ?? item?.currentPrice ?? item?.price,
  );
  if (selling > 0) return selling;
  return getItemMrp(item);
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
  return `₹ ${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

/**
 * Sitewide festive / Flat 15% sale toggle.
 *
 * Off by default. To resume later, set in .env.local (and Vercel):
 *   NEXT_PUBLIC_FESTIVE_SALE_ENABLED=true
 *
 * Also turn off special_price / discount=15 on the API when pausing
 * so cart/checkout totals match the storefront.
 */
export const FESTIVE_SALE_ENABLED =
  process.env.NEXT_PUBLIC_FESTIVE_SALE_ENABLED === "true";

/**
 * Resolve display / cart selling price from a product-like object.
 * When the sale is off, always charge/show MRP (ignore special_price).
 */
export function resolveProductPrice(product = {}) {
  const mrp =
    Number(product.mrp ?? product.price ?? product.originalPrice) || 0;
  const salePrice =
    Number(
      product.currentPrice ??
        product.special_price ??
        product.price ??
        product.mrp,
    ) || 0;

  if (!FESTIVE_SALE_ENABLED) {
    const selling = mrp || salePrice;
    return { selling, mrp: selling, discount: 0 };
  }

  const discount = Number(product.discount) || 0;
  return {
    selling: salePrice || mrp,
    mrp: mrp || salePrice,
    discount,
  };
}

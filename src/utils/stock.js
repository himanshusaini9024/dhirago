import productsSizes from "./data/products-sizes";

// sizeStock from the API: [{ size: "M", stock: 3, inStock: true }]; size "" = one-size product.

export function hasSizeStock(sizeStock) {
  return Array.isArray(sizeStock) && sizeStock.length > 0;
}

export function isOneSize(sizeStock) {
  return (
    hasSizeStock(sizeStock) && sizeStock.length === 1 && sizeStock[0].size === ""
  );
}

export function sizeOptions(sizeStock) {
  if (!hasSizeStock(sizeStock)) {
    return productsSizes.map((s) => ({ id: s.id, label: s.label, inStock: true }));
  }

  return sizeStock
    .filter((s) => s.size !== "")
    .map((s, i) => ({
      id: String(i + 1),
      label: s.size,
      inStock: Boolean(s.inStock),
      stock: Number(s.stock) || 0,
    }));
}

export function isOutOfStock({ inStock, sizeStock } = {}) {
  if (inStock === false) return true;
  if (hasSizeStock(sizeStock)) return !sizeStock.some((s) => s.inStock);
  return false;
}

export function isSizeInStock(sizeStock, size) {
  if (!hasSizeStock(sizeStock)) return true;
  if (isOneSize(sizeStock)) return Boolean(sizeStock[0].inStock);
  const match = sizeStock.find(
    (s) => s.size.toLowerCase() === String(size || "").toLowerCase(),
  );
  return Boolean(match?.inStock);
}

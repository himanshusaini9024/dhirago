/**
 * Sort product images by API `sort_order` (asc).
 * Null/empty sort_order values keep relative order at the end.
 */
export function sortProductImages(images) {
  if (!Array.isArray(images) || images.length === 0) return [];

  return images
    .map((img, index) => ({ img, index }))
    .sort((a, b) => {
      const ao = a.img?.sort_order;
      const bo = b.img?.sort_order;
      const aNull = ao === null || ao === undefined || ao === "";
      const bNull = bo === null || bo === undefined || bo === "";

      if (aNull && bNull) return a.index - b.index;
      if (aNull) return 1;
      if (bNull) return -1;

      const diff = Number(ao) - Number(bo);
      return Number.isNaN(diff) ? a.index - b.index : diff || a.index - b.index;
    })
    .map(({ img }) => img);
}

export default sortProductImages;

export const mergeCartItems = (guestCart, dbCart) => {
  const merged = [...dbCart];

  guestCart.forEach((guestItem) => {
    const index = merged.findIndex(
      (item) =>
        item.id === guestItem.id &&
        item.color === guestItem.color &&
        item.size === guestItem.size
    );

    if (index !== -1) {
      // ✅ FIX: take max instead of adding (prevents doubling bug)
      merged[index].count = Math.max(
        merged[index].count,
        guestItem.count
      );
    } else {
      // ✅ New product
      merged.push(guestItem);
    }
  });

  return merged;
};